import fs from 'node:fs';
import { expect, test } from '@playwright/test';

/**
 * One-off upload check against a deployed preview (PLAN §2.5): files larger
 * than Vercel's 4.5 MB request limit must upload through the admin UI (browser
 * → Blob directly), get resized, and be served from Blob.
 *
 * Needs: PLAYWRIGHT_BASE_URL=<preview>, a temporary admin created with
 * SETUP_LINK_FILE=tests/e2e/.state/spike-admin.json, and the large files in
 * tests/e2e/.state/. Run: npm run test:upload-check. Cleans up after itself.
 */
test.describe.configure({ mode: 'serial' });

const STATE = 'tests/e2e/.state';
const PASSWORD = `Upload-check-${Date.now()}!`;
const created: number[] = [];

test('large photo and PDF upload through the admin and are served from Blob', async ({ page, baseURL }) => {
  test.setTimeout(240_000);
  const { email, link } = JSON.parse(fs.readFileSync(`${STATE}/spike-admin.json`, 'utf8')) as { email: string; link: string };
  const headers = { Origin: baseURL! };

  // Set the temporary admin's password with its setup link, then log in.
  const token = link.split('/admin/reset/')[1];
  expect((await page.request.post('/api/users/reset-password', { headers, data: { token, password: PASSWORD } })).status()).toBe(200);
  expect((await page.request.post('/api/users/login', { headers, data: { email, password: PASSWORD } })).status()).toBe(200);

  for (const file of [
    { path: `${STATE}/large-photo.jpg`, alt: 'Upload check photo', image: true },
    { path: `${STATE}/large-flyer.pdf`, alt: 'Upload check flyer', image: false },
  ]) {
    const bytes = fs.statSync(file.path).size;
    expect(bytes).toBeGreaterThan(4.5 * 1024 * 1024);

    await page.goto('/admin/collections/media/create');
    await page.waitForLoadState('networkidle');
    await page.locator('input[type="file"]').setInputFiles(file.path);
    await page.locator('#field-alt').fill(file.alt);
    await page.locator('#action-save').click();
    await page.waitForURL(/\/admin\/collections\/media\/\d+/, { timeout: 180_000 });
    const id = Number(page.url().match(/media\/(\d+)/)![1]);
    created.push(id);

    const doc = await (await page.request.get(`/api/media/${id}`, { headers })).json();
    expect(doc.filesize).toBe(bytes);
    expect(new URL(doc.url).hostname).toMatch(/\.public\.blob\.vercel-storage\.com$/);
    const original = await page.request.get(doc.url);
    expect(original.status()).toBe(200);
    expect(Number(original.headers()['content-length'] ?? (await original.body()).length)).toBe(bytes);

    if (file.image) {
      for (const size of ['small', 'medium', 'large']) {
        expect(doc.sizes?.[size]?.url, `${size} size generated`).toBeTruthy();
        expect((await page.request.get(doc.sizes[size].url)).status(), `${size} size served`).toBe(200);
      }
    }
  }
});

test.afterAll(async ({ request, baseURL }) => {
  const headers = { Origin: baseURL! };
  const { email } = JSON.parse(fs.readFileSync(`${STATE}/spike-admin.json`, 'utf8')) as { email: string };
  const login = await request.post('/api/users/login', { headers, data: { email, password: PASSWORD } });
  if (!login.ok()) return;
  for (const id of created) await request.delete(`/api/media/${id}`, { headers });
  const me = (await (await request.get('/api/users/me', { headers })).json()).user as { id: number };
  await request.delete(`/api/users/${me.id}`, { headers });
});
