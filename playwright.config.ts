import nextEnv from '@next/env';
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

// Local runs use a throwaway "wbfs_e2e" database on the local Docker Postgres
// (start it first with `npm run db:local:up`). Every run resets, migrates and
// seeds it, bootstraps a test admin, then builds and starts the site with
// production-like guards (APP_ENV=preview).
if (!externalBaseURL) nextEnv.loadEnvConfig(process.cwd(), true);

export const SETUP_LINK_FILE = 'tests/e2e/.state/admin-setup.json';
export const TEST_ADMIN = { name: 'Test Admin', email: 'admin@e2e.test' };

const testDbUri = (process.env.DATABASE_URI ?? '').replace(/\/[^/?]+(\?|$)/, '/wbfs_e2e$1');
const serverEnv: Record<string, string> = {
  ...(process.env as Record<string, string>),
  APP_ENV: 'preview',
  DATABASE_URI: testDbUri,
  NEXT_PUBLIC_SERVER_URL: baseURL,
  SETUP_LINK_FILE,
  ADMIN_NAME: TEST_ADMIN.name,
  ADMIN_EMAIL: TEST_ADMIN.email,
};

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
    { name: 'smoke', testMatch: /(smoke|forms)\.spec\.ts/, use: desktop },
    { name: 'text', testMatch: /text\.spec\.ts/, use: desktop },
    { name: 'visual-desktop', testMatch: /visual\.spec\.ts/, use: desktop },
    { name: 'visual-mobile', testMatch: /visual\.spec\.ts/, use: mobile },
    // CMS behaviour tests change content, so they run after the parity checks.
    {
      name: 'cms',
      testMatch: /cms\/.*\.spec\.ts/,
      use: desktop,
      dependencies: ['smoke', 'text', 'visual-desktop', 'visual-mobile'],
      fullyParallel: false,
    },
  ],
  webServer: externalBaseURL
    ? undefined
    : {
        command: [
          `node -e "require('fs').rmSync('.next',{recursive:true,force:true})"`,
          'npm run db:reset:test',
          'npm run users:bootstrap-admin',
          'npm run build',
          `npm run start -- -p ${PORT}`,
        ].join(' && '),
        url: baseURL,
        timeout: 300_000,
        reuseExistingServer: false,
        env: serverEnv,
      },
});
