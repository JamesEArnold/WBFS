/** Insert-only content seed runner. See scripts/lib/seed-content.ts. */
import config from '@payload-config';
import { getPayload } from 'payload';
import { assertEnv } from './lib/env';
import { seed } from './lib/seed-content';

assertEnv();
const payload = await getPayload({ config });
const log = await seed(payload);
console.log(`[seed] created: ${log.created.join(', ') || '—'}`);
console.log(`[seed] skipped (already present): ${log.skipped.join(', ') || '—'}`);
process.exit(0);
