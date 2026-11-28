import { expect, test, type Locator, type Page } from '@playwright/test';
import { TEST_ADMIN } from '../../../playwright.config';

/**
 * Screenshots for the in-admin how-to guides (cms/help/guides.ts), taken by
 * actually doing each guide's steps in a real admin on the seeded test
 * database. The thing to click is outlined in red. If a guide names a button
 * that doesn't exist, this fails, which keeps the guides honest.
 *
 * Run: npm run docs:help-screenshots   (runs the CMS tests first; writes public/admin-help/*.jpg)
 */
test.describe.configure({ mode: 'serial' });
test.use({ viewport: { width: 1280, height: 800 } });

const OUT = 'public/admin-help';

async function settle(page: Page) {
  await page.waitForLoadState('networkidle', { timeout: 15_000 }).catch(() => undefined);
  await page.waitForTimeout(600);
}

/** Draw a red box over the element (as an overlay, so menus and scroll areas can't clip it). */
async function mark(target: Locator) {
  await target.scrollIntoViewIfNeeded();
  await target.page().waitForTimeout(200);
  await target.evaluate((el: HTMLElement) => {
    const r = el.getBoundingClientRect();
    const box = document.createElement('div');
    box.setAttribute('data-help-mark', '');
    Object.assign(box.style, {
      position: 'fixed',
      left: `${r.left - 6}px`,
      top: `${r.top - 6}px`,
      width: `${r.width + 12}px`,
      height: `${r.height + 12}px`,
      border: '4px solid #e11d48',
      borderRadius: '10px',
      pointerEvents: 'none',
      zIndex: '2147483647',
      boxSizing: 'border-box',
    });
    document.body.appendChild(box);
  });
}

async function shot(page: Page, name: string) {
  await settle(page);
  await page.screenshot({ path: `${OUT}/${name}.jpg`, type: 'jpeg', quality: 80 });
  await page.evaluate(() => document.querySelectorAll('[data-help-mark]').forEach((el) => el.remove()));
}

const card = (page: Page, name: string) => page.locator('.card').filter({ hasText: new RegExp(`^${name}$`) }).first();
const button = (page: Page, name: string | RegExp) => page.getByRole('button', { name, exact: typeof name === 'string' }).first();
const preview = (page: Page) => page.frameLocator('iframe').first();
const docMenu = (page: Page) => page.locator('.doc-controls__dots').first();
const tabButton = (page: Page, name: string) => page.locator('.tabs-field__tab-button').filter({ hasText: new RegExp(`^${name}$`) }).first();
async function openTab(page: Page, name: string) {
  await tabButton(page, name).click();
  await expect(tabButton(page, name)).toHaveClass(/--active/);
}

test('how-to guide screenshots', async ({ page }) => {
  test.setTimeout(300_000);

  // ── Start here ─────────────────────────────────────────────
  await page.goto('/admin/login');
  await settle(page);
  await page.getByLabel('Email').fill(TEST_ADMIN.email);
  await page.getByLabel('Password').fill('••••••••••');
  await mark(button(page, 'Login'));
  await shot(page, 'getting-started-1');
  await page.getByLabel('Password').fill(TEST_ADMIN.password);
  await button(page, 'Login').click();
  await expect(page.getByTestId('howto-dashboard')).toBeVisible({ timeout: 20_000 });
  await mark(page.getByTestId('howto-dashboard'));
  await shot(page, 'getting-started-2');

  await page.goto('/admin/globals/home');
  await expect(preview(page).locator('h1')).toContainText('Sheriff', { timeout: 30_000 });
  await mark(page.locator('iframe').first());
  await shot(page, 'getting-started-3');
  await page.getByText('Responsive', { exact: true }).first().click();
  await expect(page.getByText('Phone', { exact: true }).first()).toBeVisible();
  await mark(page.getByText('Phone', { exact: true }).first());
  await shot(page, 'getting-started-4');
  await page.keyboard.press('Escape');
  await mark(page.locator('.tabs-field__tabs').first());
  await shot(page, 'getting-started-tabs');
  // Click the gallery heading in the preview: the form opens the Photo gallery tab at that box.
  await preview(page).locator('[data-cms-field="galleryHeading"]').click();
  await expect(page.locator('#field-galleryHeading')).toBeFocused({ timeout: 10_000 });
  await page.waitForTimeout(300);
  await mark(page.locator('#field-galleryHeading'));
  await mark(preview(page).locator('[data-cms-field="galleryHeading"]').first());
  await shot(page, 'getting-started-click');
  await mark(button(page, 'Publish changes'));
  await shot(page, 'getting-started-5');

  // ── Change words ───────────────────────────────────────────
  await page.goto('/admin');
  await mark(card(page, 'About'));
  await shot(page, 'change-words-1');
  await card(page, 'About').click();
  await expect(preview(page).locator('h1')).toContainText('Meet Sheriff', { timeout: 30_000 });
  await preview(page).locator('[data-cms-field="intro"]').click();
  await expect(page.locator('#field-intro')).toBeFocused({ timeout: 10_000 });
  await mark(preview(page).locator('[data-cms-field="intro"]').first());
  await mark(page.locator('#field-intro'));
  await shot(page, 'change-words-2');

  await page.goto('/admin/globals/inOffice');
  await settle(page);
  await openTab(page, 'Year by year');
  await mark(button(page, 'Add Line'));
  await shot(page, 'change-words-3');

  // ── Change a button (In Office closing buttons) ─────────────
  await openTab(page, 'Closing call to action');
  const ctaButtons = page.locator('#field-ctaButtons');
  await mark(ctaButtons);
  await shot(page, 'change-button-1');
  await mark(ctaButtons.getByText('Web address / site path').first());
  await shot(page, 'change-button-2');

  // ── Change a photo (About hero) ─────────────────────────────
  await page.goto('/admin/globals/about');
  await settle(page);
  await openTab(page, 'Top of page');
  const heroImage = page.locator('#field-heroImage');
  const remove = heroImage.locator('.upload-relationship-details__remove').first();
  await mark(remove);
  await shot(page, 'change-photo-1');
  await remove.click();
  await mark(heroImage.getByRole('button', { name: 'Choose from existing' }));
  await shot(page, 'change-photo-2');
  await heroImage.getByRole('button', { name: 'Create New' }).click();
  await expect(page.getByText('Select a file').first()).toBeVisible();
  await mark(page.getByText('Select a file').first());
  await shot(page, 'change-photo-3');
  await page.keyboard.press('Escape');

  // ── Add an event (quick form) ───────────────────────────────
  await page.goto('/admin');
  await settle(page);
  const quickLink = page.getByTestId('quick-actions').getByRole('link', { name: /Post a new event/ });
  await mark(quickLink);
  await shot(page, 'add-event-1');
  await quickLink.click();
  const form = page.getByTestId('new-event-form');
  await expect(form).toBeVisible({ timeout: 20_000 });
  await form.getByLabel('Event name').fill('Summer Picnic');
  await form.getByLabel('Day of the event').fill('2027-06-05');
  await form.getByLabel(/Time and place/).fill('1 PM · North Canton Park');
  await form.getByLabel(/About the event/).fill('Food, games and a chance to meet the Sheriff. Bring the whole family.');
  const quickPreview = page.frameLocator('[data-testid="new-event-preview"]').getByTestId('quick-event-preview');
  await expect(quickPreview.getByRole('heading', { level: 1 })).toContainText('Summer Picnic', { timeout: 20_000 });
  await mark(page.getByTestId('new-event-preview'));
  await shot(page, 'add-event-2');
  await form.getByRole('button', { name: 'Publish now' }).click();
  await expect(page).toHaveURL(/\/admin\/collections\/events\/\d+/, { timeout: 20_000 });
  await expect(preview(page).locator('h1')).toContainText('Summer Picnic', { timeout: 30_000 });
  await openTab(page, 'Flyer');
  await mark(tabButton(page, 'Flyer'));
  await mark(page.locator('#field-flyerPdf'));
  await shot(page, 'add-event-3');

  // ── Update an event ─────────────────────────────────────────
  await page.goto('/admin/collections/events');
  await settle(page);
  const row = page.getByRole('link', { name: 'Summer Picnic' }).first();
  await mark(row);
  await shot(page, 'update-event-1');
  await row.click();
  await settle(page);
  await page.locator('#field-status').click();
  await expect(page.getByText('Sold out — listed', { exact: false }).first()).toBeVisible();
  await shot(page, 'update-event-2');
  await page.keyboard.press('Escape');
  await page.locator('#field-title').click();
  const unpublish = page.getByRole('button', { name: 'Unpublish', exact: true }).first();
  // The menu only lists Unpublish once the page knows the event is published.
  await expect(async () => {
    await page.keyboard.press('Escape');
    await docMenu(page).click();
    await expect(unpublish).toBeVisible({ timeout: 2_000 });
  }).toPass({ timeout: 30_000 });
  await mark(unpublish);
  await shot(page, 'update-event-3');
  await page.keyboard.press('Escape');

  // ── Feature an event on Home ────────────────────────────────
  await page.goto('/admin/globals/home');
  await settle(page);
  await openTab(page, 'Featured event');
  await mark(tabButton(page, 'Featured event'));
  await mark(page.locator('#field-featuredEvent'));
  await shot(page, 'feature-event-1');

  // ── Banner, menu, footer ────────────────────────────────────
  await page.goto('/admin/globals/siteSettings');
  await settle(page);
  await mark(page.getByText('Show the announcement banner').first());
  await shot(page, 'announcement-banner-1');
  await mark(button(page, 'Save'));
  await shot(page, 'announcement-banner-2');
  await page.getByRole('button', { name: 'Header', exact: true }).click();
  await mark(button(page, 'Add Menu link'));
  await shot(page, 'menu-header-footer-1');
  await page.getByRole('button', { name: 'Footer', exact: true }).click();
  await shot(page, 'menu-header-footer-2');

  // ── Add a section ───────────────────────────────────────────
  await page.goto('/admin/globals/inOffice');
  await settle(page);
  await openTab(page, 'Add more sections');
  const addSection = button(page, 'Add Section');
  await mark(addSection);
  await shot(page, 'add-section-1');
  await addSection.click();
  await expect(page.getByText('Starred list', { exact: true }).first()).toBeVisible();
  await shot(page, 'add-section-2');
  await page.getByText('Starred list', { exact: true }).first().click();
  await page.locator('#field-extraSections__0__heading').fill('Community Partners');
  await mark(page.locator('#extraSections-row-0, [id^="extraSections-row-0"]').first());
  await shot(page, 'add-section-3');

  // ── New page ────────────────────────────────────────────────
  await page.goto('/admin/collections/pages');
  await settle(page);
  await mark(page.getByRole('link', { name: 'Create New' }).first());
  await shot(page, 'new-page-1');
  await page.getByRole('link', { name: 'Create New' }).first().click();
  await page.locator('#field-title').fill('Meet the Team');
  await mark(page.locator('#field-title'));
  await shot(page, 'new-page-2');
  await button(page, 'Add Section').click();
  await page.getByText('Page heading', { exact: true }).first().click();
  await page.locator('#field-sections__0__heading').fill('Meet the');
  await page.locator('#field-sections__0__headingAccent').fill('Team');
  await mark(page.locator('#field-sections__0__heading'));
  await shot(page, 'new-page-3');

  // ── Photos & files ──────────────────────────────────────────
  await page.goto('/admin/collections/media');
  await settle(page);
  await mark(page.getByRole('link', { name: 'Create New' }).first());
  await shot(page, 'photos-and-files-1');
  await page.getByRole('link', { name: 'Create New' }).first().click();
  await settle(page);
  await mark(page.locator('#field-alt'));
  await shot(page, 'photos-and-files-2');

  // ── Undo a mistake ──────────────────────────────────────────
  await page.goto('/admin/globals/about');
  await settle(page);
  const versions = page.getByRole('link', { name: /Versions/ }).first();
  await mark(versions);
  await shot(page, 'undo-a-mistake-1');
  await versions.click();
  await settle(page);
  await page.locator('table tbody tr a').first().click();
  await expect(button(page, /Restore/)).toBeVisible({ timeout: 20_000 });
  await mark(button(page, /Restore/));
  await shot(page, 'undo-a-mistake-2');

  // ── People ──────────────────────────────────────────────────
  await page.goto('/admin/collections/users');
  await expect(page.getByTestId('invite-user')).toBeVisible();
  await mark(page.getByTestId('invite-user'));
  await shot(page, 'people-1');
  await page.getByRole('link', { name: TEST_ADMIN.name }).first().click();
  await mark(button(page, 'Copy setup / reset link'));
  await shot(page, 'people-2');

  // The guides themselves (for docs/review): index + one guide, light and dark.
  for (const scheme of ['light', 'dark'] as const) {
    await page.emulateMedia({ colorScheme: scheme });
    await page.goto('/admin');
    await expect(page.getByTestId('howto-dashboard')).toBeVisible();
    await settle(page);
    await page.screenshot({ path: `docs/cms/screenshots/help-dashboard-${scheme}.png` });
    await page.goto('/admin/help');
    await settle(page);
    await page.screenshot({ path: `docs/cms/screenshots/help-index-${scheme}.png`, fullPage: true });
    await page.goto('/admin/help/change-photo');
    await settle(page);
    await page.screenshot({ path: `docs/cms/screenshots/help-guide-${scheme}.png`, fullPage: true });
  }
});
