import 'server-only';
import { headers } from 'next/headers';
import type { Event, EventsPage } from '@/payload-types';
import { getPayloadClient } from './payload';

/**
 * Uncached draft reads for logged-in editors in Next draft mode. Access control
 * stays on (`overrideAccess: false` + the logged-in user), so a draft-mode
 * cookie without a valid CMS login sees nothing.
 */
async function currentUser() {
  const payload = await getPayloadClient();
  const { user } = await payload.auth({ headers: await headers() });
  return { payload, user };
}

export async function previewEventsPage(): Promise<EventsPage | null> {
  const { payload, user } = await currentUser();
  if (!user) return null;
  return payload.findGlobal({ slug: 'eventsPage', depth: 1, draft: true, overrideAccess: false, user });
}

export async function previewEventBySlug(slug: string): Promise<Event | null> {
  const { payload, user } = await currentUser();
  if (!user) return null;
  const result = await payload.find({
    collection: 'events',
    where: { slug: { equals: slug } },
    depth: 1,
    limit: 1,
    draft: true,
    overrideAccess: false,
    user,
  });
  return result.docs[0] ?? null;
}

export async function previewListedEvents(): Promise<Event[]> {
  const { payload, user } = await currentUser();
  if (!user) return [];
  const result = await payload.find({
    collection: 'events',
    where: { status: { in: ['upcoming', 'soldOut'] } },
    sort: 'date',
    depth: 0,
    limit: 100,
    draft: true,
    overrideAccess: false,
    user,
  });
  return result.docs;
}
