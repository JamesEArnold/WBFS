import { expect, test, type Page } from '@playwright/test';
import { TEST_ADMIN } from '../../../playwright.config';

/**
 * Screenshots for docs/cms/EDITOR-GUIDE.md, taken from a real admin session on
 * the seeded test database. Run: npm run docs:screenshots (runs the CMS tests first).
 */
test.describe.configure({ mode: 'serial' });

const OUT = 'docs/cms/screenshots';

async function settle(page: Page) {
  await page.waitForLoadState('networkidle', { timeout: 15_000 }).catch(() => undefined);
  await page.waitForTimeout(500);
}

async function shot(page: Page, name: string) {
  await settle(page);
  await page.screenshot({ path: `${OUT}/${name}.png` });
}

test('editor guide screenshots', async ({ page }) => {
  test.setTimeout(180_000);

  await page.goto('/admin/login');
  await settle(page);
  await page.locator('#field-email').fill(TEST_ADMIN.email);
  await shot(page, '01-login');
  await page.locator('#field-password').fill(TEST_ADMIN.password);
  await page.locator('button[type="submit"]').click();
  await expect(page).toHaveURL(/\/admin\/?$/, { timeout: 20_000 });
  await shot(page, '02-dashboard');

  // Editing a page with the live preview beside the form.
  await page.goto('/admin/globals/home');
  await expect(page.frameLocator('iframe').first().locator('h1')).toContainText('Sheriff', { timeout: 30_000 });
  await shot(page, '03-page-live-preview');

  // Events list and an event.
  await page.goto('/admin/collections/events');
  await shot(page, '04-events-list');
  await page.getByRole('link', { name: 'Annual Golf Fundraiser' }).first().click();
  await expect(page.frameLocator('iframe').first().locator('h1')).toContainText('Annual Golf', { timeout: 30_000 });
  await shot(page, '05-event-edit');

  // Adding an extra section: the section picker.
  await page.goto('/admin/globals/inOffice');
  await settle(page);
  const add = page.getByRole('button', { name: /Add Extra section/i });
  await add.scrollIntoViewIfNeeded();
  await add.click();
  await settle(page);
  await shot(page, '06-section-picker');

  // A new page.
  await page.goto('/admin/collections/pages/create');
  await shot(page, '07-new-page');

  // Site Settings (banner, menu, footer).
  await page.goto('/admin/globals/siteSettings');
  await shot(page, '08-site-settings');

  // Users with the invite form (admins only).
  await page.goto('/admin/collections/users');
  await expect(page.getByTestId('invite-user')).toBeVisible();
  await shot(page, '09-users-invite');

  // Media library.
  await page.goto('/admin/collections/media');
  await shot(page, '10-media');
});
