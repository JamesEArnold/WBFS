import { defineConfig, devices } from '@playwright/test';

/**
 * E2E / visual-regression config.
 *
 * By default this builds and starts a local production server. Set
 * PLAYWRIGHT_BASE_URL to run the same specs against a Vercel preview or
 * production URL instead (no local server is started then).
 */
const PORT = Number(process.env.PLAYWRIGHT_PORT ?? 3100);
const externalBaseURL = process.env.PLAYWRIGHT_BASE_URL;
const baseURL = externalBaseURL ?? `http://localhost:${PORT}`;

const desktop = { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } };
const mobile = {
  ...devices['Desktop Chrome'],
  viewport: { width: 390, height: 844 },
  isMobile: true,
  hasTouch: true,
  deviceScaleFactor: 1,
};

export default defineConfig({
  testDir: './tests/e2e',
  snapshotPathTemplate: '{testDir}/__snapshots__/{projectName}/{arg}{ext}',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: [['list']],
  use: {
    baseURL,
    trace: 'retain-on-failure',
  },
  expect: {
    toHaveScreenshot: {
      animations: 'disabled',
      caret: 'hide',
      // Small tolerance for anti-aliasing differences between runs.
      maxDiffPixelRatio: 0.002,
    },
  },
  projects: [
    { name: 'smoke', testMatch: /smoke\.spec\.ts/, use: desktop },
    { name: 'text', testMatch: /text\.spec\.ts/, use: desktop },
    { name: 'visual-desktop', testMatch: /visual\.spec\.ts/, use: desktop },
    { name: 'visual-mobile', testMatch: /visual\.spec\.ts/, use: mobile },
  ],
  webServer: externalBaseURL
    ? undefined
    : {
        command: `npm run build && npm run start -- -p ${PORT}`,
        url: baseURL,
        timeout: 300_000,
        reuseExistingServer: !process.env.CI,
      },
});
