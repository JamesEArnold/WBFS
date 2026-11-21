/**
 * Creates an admin account and prints a one-time setup link for it.
 * This is the only way to create the first user outside local development
 * (public first-user signup is blocked).
 *
 * Run: ADMIN_NAME="Jane Doe" ADMIN_EMAIL=jane@example.com npm run users:bootstrap-admin
 */
import config from '@payload-config';
import crypto from 'node:crypto';
import { getPayload } from 'payload';
import { assertEnv } from './lib/env';

assertEnv();

const name = process.env.ADMIN_NAME?.trim();
const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
if (!name || !email) {
  console.error('Set ADMIN_NAME and ADMIN_EMAIL, e.g. ADMIN_NAME="Jane Doe" ADMIN_EMAIL=jane@example.com npm run users:bootstrap-admin');
  process.exit(1);
}

const payload = await getPayload({ config });

const existing = await payload.find({
  collection: 'users',
  where: { email: { equals: email } },
  limit: 1,
  overrideAccess: true,
});

if (existing.docs[0]) {
  console.log(`[bootstrap] ${email} already exists (role: ${existing.docs[0].role}); issuing a new setup link.`);
} else {
  await payload.create({
    collection: 'users',
    data: { name, email, role: 'admin', password: crypto.randomBytes(32).toString('base64url') },
    overrideAccess: true,
    context: { trustedBootstrap: true },
  });
  console.log(`[bootstrap] created admin ${email}`);
}

const token = await payload.forgotPassword({
  collection: 'users',
  data: { email },
  disableEmail: true,
  overrideAccess: true,
  context: { allowSetupLink: true },
});

const base = (process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000').replace(/\/$/, '');
const link = `${base}/admin/reset/${token}`;
console.log(`[bootstrap] setup link (valid 72 hours, single use):\n${link}`);
// Test harness hook: write the link where Playwright can read it.
if (process.env.SETUP_LINK_FILE) {
  const fs = await import('node:fs');
  const path = await import('node:path');
  fs.mkdirSync(path.dirname(process.env.SETUP_LINK_FILE), { recursive: true });
  fs.writeFileSync(process.env.SETUP_LINK_FILE, JSON.stringify({ email, link }));
}
process.exit(0);
