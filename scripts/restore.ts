/**
 * Restores a backup made by scripts/backup.ts into the CURRENT environment's
 * database and file storage, which must both be empty (a fresh Neon branch +
 * new Blob store for a real recovery, or a scratch local DB for a drill).
 * Files go back to their exact original paths, so Payload regenerates correct
 * URLs for the new storage without rewriting any records.
 *
 * Run: RESTORE_FROM=/path/to/backup-folder npm run restore
 * Requires Docker Desktop running (pg_restore runs in a container).
 */
import { list, put } from '@vercel/blob';
import fs from 'node:fs';
import path from 'node:path';
import pg from 'pg';
import { assertEnv } from './lib/env';
import { LOCAL_MEDIA_DIR, type Manifest, sha256 } from './lib/media-files';
import { pgRestore } from './lib/pg-docker';

const appEnv = assertEnv();
const from = process.env.RESTORE_FROM ? path.resolve(process.env.RESTORE_FROM) : '';
if (!from || !fs.existsSync(path.join(from, 'COMPLETE'))) {
  console.error('[restore] Set RESTORE_FROM to a COMPLETE backup folder.');
  process.exit(1);
}
const manifest = JSON.parse(fs.readFileSync(path.join(from, 'manifest.json'), 'utf8')) as Manifest;
const token = process.env.BLOB_READ_WRITE_TOKEN;
const mediaDir = process.env.RESTORE_MEDIA_DIR ? path.resolve(process.env.RESTORE_MEDIA_DIR) : LOCAL_MEDIA_DIR;

// 1. Targets must be empty — restore never overwrites live data.
const db = new pg.Client({ connectionString: process.env.DATABASE_URI });
await db.connect();
const tables = await db.query("select count(*)::int as n from information_schema.tables where table_schema = 'public'");
await db.end();
if (tables.rows[0].n > 0) {
  console.error(`[restore] Refusing: the ${appEnv} database already has tables. Restore into a new, empty database.`);
  process.exit(1);
}
if (token) {
  const existing = await list({ token, limit: 1 });
  if (existing.blobs.length > 0) {
    console.error('[restore] Refusing: the Blob store is not empty. Restore into a new, empty store.');
    process.exit(1);
  }
} else if (fs.existsSync(mediaDir) && fs.readdirSync(mediaDir).length > 0) {
  console.error(`[restore] Refusing: ${mediaDir} is not empty. Set RESTORE_MEDIA_DIR to an empty folder.`);
  process.exit(1);
}

// 2. Database.
console.log(`[restore] ${from} → ${appEnv}`);
await pgRestore(process.env.DATABASE_URI!, path.join(from, 'db.dump'));
console.log('[restore] database restored');

// 3. Files, at their original paths, verified against the manifest.
fs.mkdirSync(mediaDir, { recursive: true });
for (const f of manifest.files) {
  const data = fs.readFileSync(path.join(from, 'files', f.pathname));
  if (sha256(data) !== f.sha256) throw new Error(`Backup file corrupted: ${f.pathname}`);
  if (token) {
    await put(f.pathname, data, {
      access: 'public',
      addRandomSuffix: false,
      allowOverwrite: false,
      contentType: f.mimeType ?? undefined,
      token,
    });
  } else {
    fs.writeFileSync(path.join(mediaDir, f.pathname), data);
  }
}
console.log(`[restore] ${manifest.files.length} files restored to ${token ? 'Vercel Blob' : mediaDir}`);
console.log('[restore] Done. Next: point the environment at these resources, redeploy, and run the smoke tests.');
process.exit(0);
