/**
 * Backs up the CMS database and every uploaded file into
 *   $BACKUP_DIR/<APP_ENV>-<timestamp>/{db.dump, files/…, manifest.json, COMPLETE}
 * keeping the newest 8 complete backups per environment.
 *
 * Run (production, from 1Password-injected env):
 *   BACKUP_DIR=/path/outside/repo npm run backup
 * Requires Docker Desktop running (pg_dump runs in a container).
 */
import config from '@payload-config';
import fs from 'node:fs';
import path from 'node:path';
import { getPayload } from 'payload';
import type { Media } from '@/payload-types';
import { assertEnv, describeDbTarget } from './lib/env';
import { blobPathname, LOCAL_MEDIA_DIR, type Manifest, mediaFiles, sha256 } from './lib/media-files';
import { pgDump } from './lib/pg-docker';

const KEEP = 8;
const appEnv = assertEnv();

const backupRoot = process.env.BACKUP_DIR ? path.resolve(process.env.BACKUP_DIR) : '';
if (!backupRoot) {
  console.error('[backup] Set BACKUP_DIR to a folder outside the repository (e.g. an encrypted drive).');
  process.exit(1);
}
if (backupRoot.startsWith(process.cwd())) {
  console.error('[backup] BACKUP_DIR must be outside the repository so backups are never committed.');
  process.exit(1);
}

const stamp = new Date().toISOString().replace(/[:.]/g, '-');
const dir = path.join(backupRoot, `${appEnv}-${stamp}`);
fs.mkdirSync(path.join(dir, 'files'), { recursive: true });

const usingBlob = Boolean(process.env.BLOB_READ_WRITE_TOKEN);
console.log(`[backup] ${appEnv} → ${dir}`);

// 1. Database.
await pgDump(process.env.DATABASE_URL!, path.join(dir, 'db.dump'));
console.log('[backup] database dumped');

// 2. Files referenced by Media documents.
const payload = await getPayload({ config });
const media = await payload.find({ collection: 'media', limit: 10_000, pagination: false, depth: 0, overrideAccess: true });
const manifest: Manifest = {
  createdAt: new Date().toISOString(),
  appEnv,
  database: describeDbTarget(process.env.DATABASE_URL!),
  storage: usingBlob ? 'blob' : 'local',
  files: [],
};

for (const doc of media.docs as Media[]) {
  for (const file of mediaFiles(doc)) {
    let data: Buffer;
    let pathname: string;
    if (usingBlob) {
      if (!file.url) throw new Error(`Media ${doc.id} (${file.variant}) has no URL`);
      pathname = blobPathname(file.url);
      const res = await fetch(file.url);
      if (!res.ok) throw new Error(`Download failed (${res.status}) for ${file.url}`);
      data = Buffer.from(await res.arrayBuffer());
    } else {
      pathname = file.filename;
      data = fs.readFileSync(path.join(LOCAL_MEDIA_DIR, file.filename));
    }
    const target = path.join(dir, 'files', pathname);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, data);
    manifest.files.push({ mediaId: doc.id, variant: file.variant, pathname, mimeType: file.mimeType, bytes: data.length, sha256: sha256(data) });
  }
}

// 3. Verify what was written, then mark complete.
for (const f of manifest.files) {
  const onDisk = fs.readFileSync(path.join(dir, 'files', f.pathname));
  if (sha256(onDisk) !== f.sha256) throw new Error(`Checksum mismatch for ${f.pathname}`);
}
fs.writeFileSync(path.join(dir, 'manifest.json'), JSON.stringify(manifest, null, 2));
fs.writeFileSync(path.join(dir, 'COMPLETE'), manifest.createdAt);
console.log(`[backup] ${manifest.files.length} files from ${media.docs.length} media items — COMPLETE`);

// 4. Retention: keep the newest KEEP complete backups for this environment.
const complete = fs
  .readdirSync(backupRoot)
  .filter((name) => name.startsWith(`${appEnv}-`) && fs.existsSync(path.join(backupRoot, name, 'COMPLETE')))
  .sort()
  .reverse();
for (const old of complete.slice(KEEP)) {
  fs.rmSync(path.join(backupRoot, old), { recursive: true, force: true });
  console.log(`[backup] removed old backup ${old}`);
}
process.exit(0);
