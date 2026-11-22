import type { Payload } from 'payload';
import type { PageGlobalSlug } from '../../lib/cms/public';

/** Every page global must be published, or its page 404s. */
export const PAGE_GLOBALS: PageGlobalSlug[] = ['home', 'about', 'donate', 'inOffice', 'eventsPage'];

/**
 * Go-live readiness: what the public site needs before the domain points at
 * a CMS build. Returns a list of problems (empty = ready).
 */
export async function verifyContent(payload: Payload): Promise<string[]> {
  const problems: string[] = [];

  for (const slug of PAGE_GLOBALS) {
    const doc = await payload.findGlobal({ slug, draft: false, depth: 0, overrideAccess: true });
    if (doc?._status !== 'published') problems.push(`Page "${slug}" is not published (its page would 404).`);
  }

  const settings = await payload.findGlobal({ slug: 'siteSettings', depth: 0, overrideAccess: true });
  if (!settings?.updatedAt) problems.push('Site Settings have never been saved (header/footer would use fallbacks).');

  const golf = await payload.find({
    collection: 'events',
    where: { and: [{ slug: { equals: 'golf-fundraiser-3' } }, { _status: { equals: 'published' } }] },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  });
  if (golf.totalDocs === 0) problems.push('The golf event (/events/golf-fundraiser-3) is missing or unpublished.');

  const admins = await payload.find({
    collection: 'users',
    where: { role: { equals: 'admin' } },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  });
  if (admins.totalDocs === 0) problems.push('There is no admin user (run npm run users:bootstrap-admin).');

  return problems;
}
