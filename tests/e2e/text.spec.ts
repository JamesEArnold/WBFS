import { expect, test } from '@playwright/test';
import { normalizeText, ROUTES, settle } from './routes';

/**
 * Content parity: the visible text of every route must stay identical while
 * content moves from hardcoded TSX into the CMS. Baselines were captured on the
 * pre-CMS site (Phase 0) and must never be updated to make a test pass.
 */
for (const route of ROUTES) {
  test(`${route.name}: visible text matches baseline`, async ({ page }) => {
    await page.goto(route.path);
    await settle(page);
    const text = normalizeText(await page.locator('body').innerText());
    expect(text).toMatchSnapshot(`${route.name}.txt`);
  });
}
