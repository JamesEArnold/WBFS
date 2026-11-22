import { draftMode } from 'next/headers';
import type { Event, Media, Page } from '@/payload-types';
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

export async function loadListedEvents(): Promise<Event[]> {
  return (await isPreview()) ? previewListedEvents() : listListedEvents();
}

export async function loadEvent(slug: string): Promise<Event | null> {
  return (await isPreview()) ? previewEventBySlug(slug) : getEventBySlug(slug);
}

export async function loadPage(slug: string): Promise<Page | null> {
  return (await isPreview()) ? previewPageBySlug(slug) : getPageBySlug(slug);
}

/**
 * Payload prefixes locally stored files with the configured server URL. Make
 * same-site media URLs relative so they work on any host (and with next/image);
 * Vercel Blob URLs are absolute and left as-is.
 */
export function sameSiteUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    // Locally stored Payload files: keep only the path.
    if (parsed.pathname.startsWith('/api/media/file/')) return `${parsed.pathname}${parsed.search}`;
  } catch {
    // Already relative.
  }
  return url;
}

/** Resolve an upload field (id or populated doc) to its media document, with a usable URL. */
export function asMedia(value: number | Media | null | undefined): Media | null {
  if (!value || typeof value !== 'object') return null;
  return { ...value, url: sameSiteUrl(value.url) };
}

export type Button = NonNullable<Event['buttons']>[number];

/** Where a CMS button points: a typed URL/path, or an uploaded file. */
export function buttonHref(button: Button): string | null {
  if (button.linkType === 'file') return asMedia(button.file)?.url ?? null;
  return button.url ?? null;
}
