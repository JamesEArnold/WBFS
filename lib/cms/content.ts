import { draftMode } from 'next/headers';
import type { Event, Page } from '@/payload-types';
import { withoutExpired } from './expiry';
import { previewEventBySlug, previewListedEvents, previewPageBySlug, previewPageGlobal } from './preview';
import { getEventBySlug, getPageBySlug, getPageGlobal, listListedEvents, type PageGlobal, type PageGlobalSlug } from './public';

/**
 * Page-facing data access: published content normally, drafts when an editor
 * is previewing (Next draft mode + valid CMS login).
 */
async function isPreview(): Promise<boolean> {
  return (await draftMode()).isEnabled;
}

/** A page global: the published version, or the latest draft while previewing. */
export async function loadPageGlobal<S extends PageGlobalSlug>(slug: S): Promise<PageGlobal<S> | null> {
  return (await isPreview()) ? previewPageGlobal(slug) : getPageGlobal(slug);
}

/** Events on the /events list: listed statuses, minus any whose listing has expired (checked at render time). */
export async function loadListedEvents(): Promise<Event[]> {
  return withoutExpired((await isPreview()) ? await previewListedEvents() : await listListedEvents());
}

export async function loadEvent(slug: string): Promise<Event | null> {
  return (await isPreview()) ? previewEventBySlug(slug) : getEventBySlug(slug);
}

export async function loadPage(slug: string): Promise<Page | null> {
  return (await isPreview()) ? previewPageBySlug(slug) : getPageBySlug(slug);
}

// File and button helpers are plain functions, also used in the browser (lib/cms/media.ts).
export { asMedia, buttonHref, eventFlyer, sameSiteUrl, type Button, type EventFlyer } from './media';
