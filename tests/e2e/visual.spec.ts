import { expect, test } from '@playwright/test';
import { dynamicRegions, ROUTES, settle } from './routes';

/**
 * Visual regression: every route must look identical (mobile + desktop) to the
 * Phase 0 baselines through the framework upgrade and CMS migration.
 * Never update baselines to make a test pass.
 */
for (const route of ROUTES) {
  test(`${route.name}: matches visual baseline`, async ({ page }) => {
    await page.goto(route.path);
    await settle(page);
    await expect(page).toHaveScreenshot(`${route.name}.png`, {
      fullPage: true,
      mask: dynamicRegions(page),
    });
  });
}
