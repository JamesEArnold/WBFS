/**
 * Wipes and recreates a throwaway test database (name must end in "_e2e" or
 * "_test"), creating it first if needed. Used by the Playwright test server
 * before migrating + seeding. Refuses to touch anything else.
 *
 * Run: npm run db:reset:test   (with DATABASE_URI pointing at the test DB)
 */
import pg from 'pg';
import { assertEnv } from './lib/env';

const appEnv = assertEnv({ refuseProduction: true });
const uri = new URL(process.env.DATABASE_URI!);
const dbName = uri.pathname.replace(/^\//, '');

if (!/_(e2e|test)$/.test(dbName)) {
  console.error(`[reset-test-db] Refusing: database "${dbName}" is not a test database (must end in _e2e or _test).`);
  process.exit(1);
}
if (!['127.0.0.1', 'localhost'].includes(uri.hostname)) {
  console.error(`[reset-test-db] Refusing: test databases must be local (got ${uri.hostname}).`);
  process.exit(1);
}

// Create the database if it doesn't exist (connect to the default DB to do so).
const adminUri = new URL(uri);
adminUri.pathname = '/postgres';
const admin = new pg.Client({ connectionString: adminUri.toString() });
await admin.connect();
const exists = await admin.query('select 1 from pg_database where datname = $1', [dbName]);
if (exists.rowCount === 0) await admin.query(`create database "${dbName}"`);
await admin.end();

const client = new pg.Client({ connectionString: uri.toString() });
await client.connect();
await client.query('drop schema if exists public cascade; create schema public;');
await client.end();

console.log(`[reset-test-db] reset ${dbName} (APP_ENV=${appEnv})`);
process.exit(0);
