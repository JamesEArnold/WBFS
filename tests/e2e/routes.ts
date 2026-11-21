import type { Locator, Page } from '@playwright/test';

/** Every public route on the live site. Visual/text baselines are captured for each. */
export const ROUTES = [
  { name: 'home', path: '/' },
  { name: 'about', path: '/about' },
  { name: 'donate', path: '/donate' },
  { name: 'events', path: '/events' },
  { name: 'golf-fundraiser-3', path: '/events/golf-fundraiser-3' },
  { name: 'time-in-office', path: '/time-in-office' },
] as const;

/**
 * Regions whose content legitimately varies between runs:
 * - /events renders "★ {Month} {Year} ★" from the build/render date.
 * - /donate embeds a live third-party Donorbox iframe.
 */
const MONTH_YEAR = /★\s+[A-Za-z]+\s+\d{4}\s+★/;

export function dynamicRegions(page: Page): Locator[] {
  return [page.getByText(MONTH_YEAR), page.locator('iframe[src*="donorbox"]')];
}

export function normalizeText(text: string): string {
  return text
    .replace(new RegExp(MONTH_YEAR.source, 'g'), '★ <MONTH YEAR> ★')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/** Wait until web fonts and lazy images have settled so screenshots are stable. */
async function quietNetwork(page: Page): Promise<void> {
  // Third-party embeds (Donorbox) keep the network busy, so cap the wait.
  await page.waitForLoadState('networkidle', { timeout: 5_000 }).catch(() => undefined);
}

export async function settle(page: Page): Promise<void> {
  await page.waitForLoadState('load');
  await quietNetwork(page);
  await page.evaluate(async () => {
    await document.fonts.ready;
    // Force lazy images to load by scrolling through the page, then return to top.
    const step = window.innerHeight;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 50));
    }
    window.scrollTo(0, 0);
    const imgs = Array.from(document.images).filter((img) => !img.complete);
    await Promise.all(
      imgs.map(
        (img) =>
          new Promise((resolve) => {
            img.addEventListener('load', resolve, { once: true });
            img.addEventListener('error', resolve, { once: true });
          }),
      ),
    );
  });
  await quietNetwork(page);
}
