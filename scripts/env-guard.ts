/** Fails (exit 1) unless DATABASE_URI matches the expected endpoint for APP_ENV. */
import { assertEnv } from './lib/env';

try {
  assertEnv();
} catch (error) {
  console.error((error as Error).message);
  process.exit(1);
}
