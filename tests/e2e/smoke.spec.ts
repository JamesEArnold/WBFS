import { expect, test } from '@playwright/test';
import { ROUTES } from './routes';

for (const route of ROUTES) {
  test(`${route.name}: serves the page with site chrome`, async ({ page }) => {
    const response = await page.goto(route.path);
    expect(response?.status(), `${route.path} status`).toBe(200);

    // Exactly one visible page heading.
    await expect(page.locator('h1:visible')).toHaveCount(1);

    // Header and footer chrome render on every page.
    await expect(page.locator('header').first()).toBeVisible();
    await expect(page.getByText(/Paid for by Weisburn for Sheriff/i).first()).toBeVisible();
  });
}

test('home: email and volunteer signup forms render', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('form')).toHaveCount(2);
  await expect(page.locator('#volunteer form')).toBeVisible();
});

test('unknown route returns 404', async ({ page }) => {
  const response = await page.goto('/this-page-does-not-exist');
  expect(response?.status()).toBe(404);
});
