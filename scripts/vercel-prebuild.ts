/**
 * Runs before `next build` on Vercel (npm run vercel-build).
 * - preview:    apply pending migrations, then the insert-only seed (so a fresh
 *               preview database has the site's content before pages prerender).
 * - production: never migrate automatically — fail the build if migrations are
 *               pending (apply them deliberately: npm run backup, then
 *               npm run payload:migrate with production credentials).
 */
import config from '@payload-config';
import { getPayload, type Migration } from 'payload';
import { migrations } from '../migrations';
import { assertEnv } from './lib/env';
import { seed } from './lib/seed-content';

const appEnv = assertEnv();
const payload = await getPayload({ config });

if (appEnv === 'preview') {
  // Generated migration functions are typed with their adapter's args; Payload's API takes `unknown`.
  await payload.db.migrate({ migrations: migrations as unknown as Migration[] });
  console.log('[vercel-prebuild] preview migrations applied');
  const log = await seed(payload);
  console.log(`[vercel-prebuild] seed created: ${log.created.join(', ') || '—'}; skipped: ${log.skipped.length}`);
} else {
  const applied = await payload.find({
    collection: 'payload-migrations',
    limit: 1000,
    pagination: false,
    overrideAccess: true,
  });
  const appliedNames = new Set(applied.docs.map((doc) => doc.name));
  const pending = migrations.map((m) => m.name).filter((name) => !appliedNames.has(name));
  if (pending.length > 0) {
    console.error(`[vercel-prebuild] ${pending.length} migration(s) not applied to ${appEnv}: ${pending.join(', ')}`);
    console.error('Apply them first: npm run backup, then npm run payload:migrate (see docs/cms/OPERATIONS.md).');
    process.exit(1);
  }
  console.log(`[vercel-prebuild] ${appEnv} schema is up to date`);
}
process.exit(0);
