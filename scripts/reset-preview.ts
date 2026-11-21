/**
 * Empties the PREVIEW database and PREVIEW Blob store so the next preview
 * deploy migrates and seeds from scratch. Refuses to run anywhere but preview.
 *
 * Run (with preview credentials injected): npm run db:preview:reset
 */
import { del, list } from '@vercel/blob';
import pg from 'pg';
import { blobToken } from '../lib/blob-token';
import { assertEnv } from './lib/env';

const appEnv = assertEnv({ refuseProduction: true });
if (appEnv !== 'preview') {
  console.error(`[reset-preview] Refusing: APP_ENV is "${appEnv}", not "preview".`);
  process.exit(1);
}

const db = new pg.Client({ connectionString: process.env.DATABASE_URL });
await db.connect();
await db.query('drop schema if exists public cascade; create schema public;');
await db.end();
console.log('[reset-preview] preview database emptied');

const token = blobToken();
if (token) {
  let removed = 0;
  let cursor: string | undefined;
  do {
    const page = await list({ token, cursor, limit: 1000 });
    if (page.blobs.length) await del(page.blobs.map((b) => b.url), { token });
    removed += page.blobs.length;
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);
  console.log(`[reset-preview] removed ${removed} preview Blob objects`);
}
console.log('[reset-preview] Done. Redeploy the preview to migrate and seed.');
process.exit(0);
