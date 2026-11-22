/** Go-live readiness check (PLAN §5 Phase 7). Env-guarded; read-only. Exit 1 if not ready. */
import config from '@payload-config';
import { getPayload } from 'payload';
import { assertEnv } from './lib/env';
import { verifyContent } from './lib/verify-content';

const appEnv = assertEnv();
const payload = await getPayload({ config });
const problems = await verifyContent(payload);
if (problems.length > 0) {
  console.error(`[cms:verify] ${appEnv}: NOT ready`);
  for (const problem of problems) console.error(`  - ${problem}`);
  process.exit(1);
}
console.log(`[cms:verify] ${appEnv}: ready — all pages published, golf event live, admin present`);
process.exit(0);
