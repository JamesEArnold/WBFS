import 'server-only';
import { unstable_cache } from 'next/cache';
import type { Config, Event, Page, SiteSetting } from '@/payload-types';
import { CMS_TAG } from '@/cms/hooks/invalidate';
import { getPayloadClient } from './payload';

/**
 * Cached, published-only reads for the public site.
 *
 * This is the one audited place that reads without a user (`overrideAccess:
 * true`) — every collection/global has API read access restricted to staff,
 * so each function here must enforce "published only" itself.
 * Everything is cached under the `cms` tag and invalidated on publish
 * (cms/hooks/invalidate.ts).
 */

const cached = <A extends unknown[], R>(fn: (...args: A) => Promise<R>, key: string) =>
  unstable_cache(fn, [key], { tags: [CMS_TAG] });

export const LISTED_EVENT_STATUSES: Event['status'][] = ['upcoming', 'soldOut'];

export const getSiteSettings = cached(async (): Promise<SiteSetting | null> => {
  const payload = await getPayloadClient();
  try {
    // siteSettings has no drafts, so the stored document is always the live one.
    return await payload.findGlobal({ slug: 'siteSettings', depth: 0, overrideAccess: true });
  } catch (error) {
    console.error('[cms] siteSettings unavailable:', (error as Error).message);
    return null;
  }
}, 'siteSettings');

/** Globals that are pages of the site (drafts + publish): every global except Site Settings. */
export type PageGlobalSlug = Exclude<keyof Config['globals'], 'siteSettings'>;
export type PageGlobal<S extends PageGlobalSlug> = Config['globals'][S];

const publishedPageGlobal = cached(async (slug: PageGlobalSlug) => {
  const payload = await getPayloadClient();
  const doc = await payload.findGlobal({ slug, depth: 1, draft: false, overrideAccess: true });
  // Never published (or unpublished) → the page 404s.
  return doc?._status === 'published' ? doc : null;
}, 'pageGlobal');

/** The published version of a page global, or null if it isn't published. */
export const getPageGlobal = <S extends PageGlobalSlug>(slug: S) =>
  publishedPageGlobal(slug) as Promise<PageGlobal<S> | null>;

/** Published events shown on /events (upcoming + sold out), soonest first. */
export const listListedEvents = cached(async (): Promise<Event[]> => {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: 'events',
    where: {
      and: [{ _status: { equals: 'published' } }, { status: { in: LISTED_EVENT_STATUSES } }],
    },
    sort: 'date',
    depth: 0,
    limit: 100,
    draft: false,
    overrideAccess: true,
  });
  return result.docs;
}, 'listListedEvents');

/** A published, non-hidden event by slug (past events stay reachable). */
export const getEventBySlug = cached(async (slug: string): Promise<Event | null> => {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: 'events',
    where: {
      and: [
        { slug: { equals: slug } },
        { _status: { equals: 'published' } },
        { status: { not_equals: 'hidden' } },
      ],
    },
    depth: 1,
    limit: 1,
    draft: false,
    overrideAccess: true,
  });
  return result.docs[0] ?? null;
}, 'getEventBySlug');

/** Slugs of every published, non-hidden event (static params + sitemap). */
export const listEventSlugs = cached(async (): Promise<{ slug: string; updatedAt: string }[]> => {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: 'events',
    where: { and: [{ _status: { equals: 'published' } }, { status: { not_equals: 'hidden' } }] },
    depth: 0,
    limit: 500,
    pagination: false,
    draft: false,
    overrideAccess: true,
    select: { slug: true, updatedAt: true },
  });
  return result.docs.map((doc) => ({ slug: doc.slug, updatedAt: doc.updatedAt }));
}, 'listEventSlugs');

/** A published CMS page by slug. */
export const getPageBySlug = cached(async (slug: string): Promise<Page | null> => {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: 'pages',
    where: { and: [{ slug: { equals: slug } }, { _status: { equals: 'published' } }] },
    depth: 1,
    limit: 1,
    draft: false,
    overrideAccess: true,
  });
  return result.docs[0] ?? null;
}, 'getPageBySlug');

/** Slugs of every published CMS page (static params + sitemap). */
export const listPageSlugs = cached(async (): Promise<{ slug: string; updatedAt: string }[]> => {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: 'pages',
    where: { _status: { equals: 'published' } },
    depth: 0,
    limit: 500,
    pagination: false,
    draft: false,
    overrideAccess: true,
    select: { slug: true, updatedAt: true },
  });
  return result.docs.map((doc) => ({ slug: doc.slug, updatedAt: doc.updatedAt }));
}, 'listPageSlugs');
