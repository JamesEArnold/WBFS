import fs from 'node:fs';
import { expect, request as playwrightRequest, test, type APIRequestContext } from '@playwright/test';
import { SETUP_LINK_FILE, TEST_ADMIN } from '../../../playwright.config';

/**
 * CMS behaviour against a production build backed by a freshly reset + seeded
 * test database, with production-like guards (APP_ENV=preview).
 * Runs serially: later steps use accounts created by earlier ones.
 */
test.describe.configure({ mode: 'serial' });

const ADMIN_PASSWORD = 'Admin-e2e-password-1!';
const EDITOR = { name: 'Test Editor', email: 'editor@e2e.test', password: 'Editor-e2e-password-1!' };
const FRESHNESS_MS = 10_000;

let baseURL: string;
let admin: APIRequestContext;
let editor: APIRequestContext;
let anon: APIRequestContext;
let eventId: number;

/** Like a browser on the site: Payload only honours cookie logins from its own Origin (CSRF protection). */
const newContext = () => playwrightRequest.newContext({ baseURL, extraHTTPHeaders: { Origin: baseURL } });

async function login(email: string, password: string): Promise<APIRequestContext> {
  const ctx = await newContext();
  const res = await ctx.post('/api/users/login', { data: { email, password } });
  expect(res.status(), `login ${email}`).toBe(200);
  return ctx;
}

function tokenFrom(link: string): string {
  return link.split('/admin/reset/')[1];
}

/** Poll an anonymous page until `check` passes (publish → visible within the freshness target). */
async function eventually(fn: () => Promise<boolean>, timeout = FRESHNESS_MS): Promise<void> {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    if (await fn()) return;
    await new Promise((r) => setTimeout(r, 500));
  }
  expect(await fn(), `condition not met within ${timeout}ms`).toBe(true);
}

const DOT_PNG = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
  'base64',
);

type Doc = Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any

/**
 * Edit a page global as the editor, publish, check the change is live on the
 * page, then put the original back and check it is gone again.
 * `edit` mutates a copy of the published content and returns strings the page HTML must now contain.
 */
async function editAndRestoreGlobal(slug: string, path: string, edit: (doc: Doc) => string[]): Promise<void> {
  const original = (await (await editor.get(`/api/globals/${slug}?depth=0`)).json()) as Doc;
  const changed = structuredClone(original);
  const expected = edit(changed);
  const publish = async (data: Doc) => {
    const res = await editor.post(`/api/globals/${slug}`, { data: { ...data, _status: 'published' } });
    expect(res.status(), await res.text()).toBe(200);
  };

  await publish(changed);
  await eventually(async () => {
    const { text } = await pageText(path);
    return expected.every((s) => text.includes(s));
  });

  await publish(original);
  await eventually(async () => {
    const { text } = await pageText(path);
    return expected.every((s) => !text.includes(s));
  });
}

async function pageText(path: string): Promise<{ status: number; text: string }> {
  const res = await anon.get(path, { headers: { 'cache-control': 'no-cache' } });
  return { status: res.status(), text: await res.text() };
}

test.beforeAll(async ({}, info) => {
  baseURL = info.project.use.baseURL!;
  anon = await newContext();
});

test.afterAll(async () => {
  await Promise.all([admin?.dispose(), editor?.dispose(), anon?.dispose()]);
});

test('public signup and self-serve password reset are closed', async () => {
  expect((await anon.get('/admin/create-first-user')).status()).toBe(404);
  expect((await anon.post('/api/users/first-register', { data: { email: 'x@y.z', password: 'x' } })).status()).toBe(404);
  expect((await anon.post('/api/users/forgot-password', { data: { email: TEST_ADMIN.email } })).status()).toBe(403);
  const forgot = await anon.get('/admin/forgot');
  expect(await forgot.text()).toContain('Ask a site admin for a reset link');
});

test('sitemap and robots come from live content; the CMS is not indexed', async () => {
  const sitemap = await pageText('/sitemap.xml');
  expect(sitemap.status).toBe(200);
  for (const path of ['/about', '/time-in-office', '/events', '/donate', '/events/golf-fundraiser-3']) {
    expect(sitemap.text).toContain(`https://weisburnforsheriff.com${path}<`);
  }
  const robots = await pageText('/robots.txt');
  expect(robots.text).toContain('Disallow: /admin');
  expect(robots.text).toContain('Sitemap: https://weisburnforsheriff.com/sitemap.xml');
  const adminLogin = await anon.get('/admin/login');
  expect(adminLogin.headers()['x-robots-tag']).toContain('noindex');
});

test('anonymous visitors cannot read or write anything through the API', async () => {
  for (const path of [
    '/api/events',
    '/api/events?draft=true',
    '/api/events/versions',
    '/api/users',
    '/api/globals/siteSettings',
    '/api/globals/eventsPage?draft=true',
    '/api/globals/inOffice',
    '/api/globals/donate',
    '/api/globals/about',
    '/api/globals/home',
  ]) {
    expect((await anon.get(path)).status(), path).toBe(403);
  }
  expect((await anon.post('/api/events', { data: { title: 'x' } })).status()).toBe(403);
  expect((await anon.post('/api/graphql', { data: { query: '{ __typename }' } })).status()).toBe(404);
});

test('bootstrap setup link lets the admin set a password and log in (once)', async ({ page }) => {
  const { link } = JSON.parse(fs.readFileSync(SETUP_LINK_FILE, 'utf8')) as { link: string };

  await page.goto(link);
  // Wait for the admin app to hydrate before typing, or the form state is lost.
  await page.waitForLoadState('networkidle');
  await page.locator('input[name="password"]').fill(ADMIN_PASSWORD);
  await page.locator('input[name="confirm-password"]').fill(ADMIN_PASSWORD);
  await page.locator('button[type="submit"]').click();
  await expect(page).not.toHaveURL(/\/admin\/reset\//, { timeout: 20_000 });

  // The admin-only invite form is on the Users list.
  await page.goto('/admin/collections/users');
  await expect(page.getByTestId('invite-user')).toBeVisible();

  // The same link can't be used again.
  const reuse = await anon.post('/api/users/reset-password', {
    data: { token: tokenFrom(link), password: 'Another-password-1!' },
  });
  expect(reuse.ok()).toBe(false);

  admin = await login(TEST_ADMIN.email, ADMIN_PASSWORD);
});

test('admin invites an editor who sets their own password', async () => {
  const res = await admin.post('/api/users/invite', { data: { name: EDITOR.name, email: EDITOR.email, role: 'editor' } });
  expect(res.status()).toBe(200);
  const { link } = (await res.json()) as { link: string };
  expect(link).toContain('/admin/reset/');

  const setPassword = await anon.post('/api/users/reset-password', {
    data: { token: tokenFrom(link), password: EDITOR.password },
  });
  expect(setPassword.status()).toBe(200);
  editor = await login(EDITOR.email, EDITOR.password);
});

test('editors cannot manage users or raise their own role', async () => {
  expect((await editor.post('/api/users/invite', { data: { name: 'X', email: 'x@e2e.test' } })).status()).toBe(403);

  const me = (await (await editor.get('/api/users/me')).json()).user as { id: number; role: string };
  const users = (await (await editor.get('/api/users')).json()) as { docs: { id: number }[] };
  expect(users.docs.map((u) => u.id)).toEqual([me.id]);

  expect((await editor.post(`/api/users/${me.id}/setup-link`)).status()).toBe(403);

  await editor.patch(`/api/users/${me.id}`, { data: { role: 'admin' } });
  const after = (await (await editor.get('/api/users/me')).json()).user as { role: string };
  expect(after.role).toBe('editor');
});

test('a draft event is private, previewable by editors, and goes live when published', async () => {
  const create = await editor.post('/api/events?draft=true', {
    data: {
      _status: 'draft',
      title: 'E2E Summer Picnic',
      date: '2026-12-01T12:00:00.000Z',
      status: 'upcoming',
      overline: 'Join Us',
      subtitle: 'Saturday · North Canton',
      facts: [{ text: 'Free hot dogs' }],
      listingCtaLabel: 'See Details',
      dateLabel: 'Saturday · December 1',
      heading: 'Summer',
      headingAccent: 'Picnic',
      heroBlurb: 'Bring the family.',
    },
  });
  expect(create.status()).toBe(201);
  const created = (await create.json()).doc as { id: number; slug: string };
  eventId = created.id;
  expect(created.slug).toBe('e2e-summer-picnic');

  // Draft: not public.
  expect((await pageText('/events/e2e-summer-picnic')).status).toBe(404);
  expect((await pageText('/events')).text).not.toContain('E2E Summer Picnic');

  // Editors can preview it.
  const preview = await editor.get(`/preview/enter?path=${encodeURIComponent('/events/e2e-summer-picnic')}`);
  expect(preview.status()).toBe(200);
  const previewHtml = await preview.text();
  expect(previewHtml).toContain('Bring the family.');
  expect(previewHtml).toContain('data-testid="preview-bar"');
  // ...and anonymous visitors still can't.
  expect((await pageText('/events/e2e-summer-picnic')).status).toBe(404);

  // Publish → live within the freshness target, and listed.
  expect((await editor.patch(`/api/events/${eventId}`, { data: { _status: 'published' } })).status()).toBe(200);
  await eventually(async () => {
    const { status, text } = await pageText('/events/e2e-summer-picnic');
    return status === 200 && text.includes('Bring the family.');
  });
  await eventually(async () => (await pageText('/events')).text.includes('E2E Summer Picnic'));
  await eventually(async () => (await pageText('/sitemap.xml')).text.includes('/events/e2e-summer-picnic'));

  // A newer unpublished draft doesn't leak: visitors keep seeing the published version.
  const draftEdit = await editor.patch(`/api/events/${eventId}?draft=true`, {
    data: { _status: 'draft', heroBlurb: 'Unpublished draft wording.' },
  });
  expect(draftEdit.status()).toBe(200);
  await new Promise((r) => setTimeout(r, 1_500));
  const live = await pageText('/events/e2e-summer-picnic');
  expect(live.text).toContain('Bring the family.');
  expect(live.text).not.toContain('Unpublished draft wording.');
});

test('live preview beside the editor updates as the editor types', async ({ page }) => {
  test.setTimeout(90_000);
  // Log the browser in as the editor (cookie session, same Origin as the site).
  const login = await page.request.post('/api/users/login', {
    headers: { Origin: baseURL },
    data: { email: EDITOR.email, password: EDITOR.password },
  });
  expect(login.status()).toBe(200);

  await page.goto(`/admin/collections/events/${eventId}`);
  await page.waitForLoadState('networkidle');

  // Live Preview opens by default, showing the event page in draft mode
  // (with the newer unpublished draft wording from the previous test).
  const frame = page.frameLocator('iframe[src*="/preview/enter"]');
  await expect(frame.getByRole('heading', { level: 1 })).toContainText('Summer', { timeout: 30_000 });
  await expect(frame.getByText('Unpublished draft wording.')).toBeVisible();

  // Type a new headline: autosave + refresh shows it in the preview without saving manually.
  await page.locator('#field-heading').fill('Live Preview Works');
  await expect(frame.getByRole('heading', { level: 1 })).toContainText('Live Preview Works', { timeout: 20_000 });

  // ...while the public page is unchanged until publish.
  expect((await pageText('/events/e2e-summer-picnic')).text).not.toContain('Live Preview Works');
});

test('sold out shows the banner; published slugs are locked for editors', async () => {
  const soldOut = await editor.patch(`/api/events/${eventId}`, {
    data: { _status: 'published', status: 'soldOut', soldOutBanner: { heading: 'All Booked Up' } },
  });
  expect(soldOut.status()).toBe(200);
  await eventually(async () => (await pageText('/events/e2e-summer-picnic')).text.includes('All Booked Up'));

  const rename = await editor.patch(`/api/events/${eventId}`, { data: { slug: 'renamed-picnic' } });
  expect(rename.status()).toBe(400);
});

test('raw storage links are rejected; files must be linked via Media', async () => {
  const res = await editor.patch(`/api/events/${eventId}`, {
    data: {
      buttons: [{ label: 'Flyer', linkType: 'url', url: 'https://abc123.public.blob.vercel-storage.com/flyer.pdf' }],
    },
  });
  expect(res.status()).toBe(400);
});

test('past events keep their page but leave the Events list', async () => {
  expect((await editor.patch(`/api/events/${eventId}`, { data: { _status: 'published', status: 'past' } })).status()).toBe(200);
  await eventually(async () => !(await pageText('/events')).text.includes('E2E Summer Picnic'));
  expect((await pageText('/events/e2e-summer-picnic')).status).toBe(200);
});

test('hiding or unpublishing removes the event from the public site', async () => {
  expect((await editor.patch(`/api/events/${eventId}`, { data: { _status: 'published', status: 'hidden' } })).status()).toBe(200);
  await eventually(async () => (await pageText('/events/e2e-summer-picnic')).status === 404);
  await eventually(async () => !(await pageText('/events')).text.includes('E2E Summer Picnic'));

  expect((await editor.patch(`/api/events/${eventId}`, { data: { _status: 'published', status: 'upcoming' } })).status()).toBe(200);
  await eventually(async () => (await pageText('/events/e2e-summer-picnic')).status === 200);

  expect((await editor.patch(`/api/events/${eventId}`, { data: { _status: 'draft' } })).status()).toBe(200);
  await eventually(async () => (await pageText('/events/e2e-summer-picnic')).status === 404);
  await eventually(async () => !(await pageText('/sitemap.xml')).text.includes('/events/e2e-summer-picnic'));

  expect((await editor.delete(`/api/events/${eventId}`)).status()).toBe(200);
});

test('the announcement banner can be turned on and off from Site Settings', async () => {
  const on = await editor.post('/api/globals/siteSettings', {
    data: { banner: { enabled: true, text: 'E2E Rally Saturday', linkLabel: 'Details', linkUrl: '/events' } },
  });
  expect(on.status()).toBe(200);
  await eventually(async () => (await pageText('/about')).text.includes('E2E Rally Saturday'));

  await editor.post('/api/globals/siteSettings', { data: { banner: { enabled: false } } });
  await eventually(async () => !(await pageText('/about')).text.includes('E2E Rally Saturday'));
});

test('In Office: text and links are editable and go live', async () => {
  await editAndRestoreGlobal('inOffice', '/time-in-office', (doc) => {
    doc.ctaHeading = 'E2E Stand Together';
    doc.years[0].events[0].text = 'E2E Timeline Entry';
    doc.ctaButtons[0].url = '/e2e-in-office-link';
    return ['E2E Stand Together', 'E2E Timeline Entry', 'href="/e2e-in-office-link"'];
  });
});

test('Donate: text and the Donorbox form are editable; only Donorbox can be embedded', async () => {
  await editAndRestoreGlobal('donate', '/donate', (doc) => {
    doc.mailHeading = 'E2E Pay By Check';
    doc.mailBody = 'Payable to **E2E Payee** please.';
    doc.donorboxUrl = 'https://donorbox.org/embed/e2e-form';
    return ['E2E Pay By Check', '>E2E Payee</span>', 'src="https://donorbox.org/embed/e2e-form"'];
  });
  const bad = await editor.post('/api/globals/donate', { data: { donorboxUrl: 'https://evil.example/embed' } });
  expect(bad.status()).toBe(400);
});

test('About: text, photo and links are editable; a photo in use cannot be deleted', async () => {
  const upload = await editor.post('/api/media', {
    multipart: {
      file: { name: 'e2e-photo.png', mimeType: 'image/png', buffer: DOT_PNG },
      _payload: JSON.stringify({ alt: 'E2E replacement photo' }),
    },
  });
  expect(upload.status()).toBe(201);
  const photoId = (await upload.json()).doc.id as number;

  await editAndRestoreGlobal('about', '/about', (doc) => {
    doc.heading = 'E2E Meet The Sheriff';
    doc.timeline[0].text = 'E2E served with **PRIDE** daily.';
    doc.heroImage = photoId;
    doc.signOffButtons[1].url = '/e2e-about-link';
    return ['E2E Meet The Sheriff', '>PRIDE</span>', 'alt="E2E replacement photo"', 'href="/e2e-about-link"'];
  });

  // The original hero photo is in use by the About page, so it can't be deleted.
  const about = (await (await editor.get('/api/globals/about?depth=0')).json()) as Doc;
  const inUse = await editor.delete(`/api/media/${about.heroImage}`);
  expect(inUse.ok()).toBe(false);
  expect(await inUse.text()).toContain('About page');

  // The replacement is no longer used after the restore, so it can be.
  expect((await editor.delete(`/api/media/${photoId}`)).status()).toBe(200);
});

test('Home: text, gallery photos, links and the featured event are editable', async () => {
  const upload = await editor.post('/api/media', {
    multipart: {
      file: { name: 'e2e-gallery.png', mimeType: 'image/png', buffer: DOT_PNG },
      _payload: JSON.stringify({ alt: 'E2E gallery photo' }),
    },
  });
  expect(upload.status()).toBe(201);
  const photoId = (await upload.json()).doc.id as number;

  await editAndRestoreGlobal('home', '/', (doc) => {
    doc.intro = 'E2E leads from the front.';
    doc.gallery[1].image = photoId;
    doc.gallery[1].caption = 'E2E Gallery Caption';
    doc.pillars[2].ctaUrl = '/e2e-home-link';
    doc.eventsHeading = 'E2E On The Calendar';
    return ['E2E leads from the front.', 'alt="E2E gallery photo"', 'E2E Gallery Caption', 'href="/e2e-home-link"', 'E2E On The Calendar'];
  });
  expect((await editor.delete(`/api/media/${photoId}`)).status()).toBe(200);

  // With no featured event, the events strip disappears; choosing it again brings it back.
  const golfLink = 'href="/events/golf-fundraiser-3"';
  const original = (await (await editor.get('/api/globals/home?depth=0')).json()) as Doc;
  expect(original.featuredEvent).toBeTruthy();
  const publishHome = (data: Doc) => editor.post('/api/globals/home', { data: { ...data, _status: 'published' } });
  expect((await publishHome({ ...original, featuredEvent: null })).status()).toBe(200);
  await eventually(async () => !(await pageText('/')).text.includes(golfLink));
  expect((await publishHome(original)).status()).toBe(200);
  await eventually(async () => (await pageText('/')).text.includes(golfLink));
});

test('media in use cannot be deleted; uploads require alt text', async () => {
  const pdfs = (await (
    await editor.get('/api/media?where[importKey][equals]=asset:/250-SheriffWeisburn_GolfOuting_TriFold.pdf')
  ).json()) as { docs: { id: number }[] };
  const del = await editor.delete(`/api/media/${pdfs.docs[0].id}`);
  expect(del.ok()).toBe(false);
  expect(await del.text()).toContain('still used');

  const png = DOT_PNG;
  const noAlt = await editor.post('/api/media', {
    multipart: { file: { name: 'dot.png', mimeType: 'image/png', buffer: png } },
  });
  expect(noAlt.status()).toBe(400);

  const ok = await editor.post('/api/media', {
    multipart: { file: { name: 'dot.png', mimeType: 'image/png', buffer: png }, _payload: JSON.stringify({ alt: 'A gold dot' }) },
  });
  expect(ok.status()).toBe(201);
  const id = (await ok.json()).doc.id as number;
  expect((await editor.delete(`/api/media/${id}`)).status()).toBe(200);
});

test('accounts lock after 5 failed logins', async () => {
  const ctx = await newContext();
  for (let i = 0; i < 5; i++) {
    await ctx.post('/api/users/login', { data: { email: EDITOR.email, password: 'wrong-password' } });
  }
  const locked = await ctx.post('/api/users/login', { data: { email: EDITOR.email, password: EDITOR.password } });
  expect(locked.ok()).toBe(false);
  await ctx.dispose();
});
