import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';

/**
 * Flat config (Next 16 removed `next lint`). The previous .eslintrc.js never ran
 * (its @typescript-eslint plugin was not installed), so this starts from Next's
 * recommended rules rather than the old style-only ruleset.
 */
const config = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    files: ['*.config.js'],
    rules: { '@typescript-eslint/no-require-imports': 'off' },
  },
  {
    ignores: ['.next/**', 'node_modules/**', '_archive/**', 'test-results/**', 'playwright-report/**', 'next-env.d.ts'],
  },
];

export default config;
