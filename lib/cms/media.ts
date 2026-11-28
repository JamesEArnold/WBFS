import type { Event, Media } from '@/payload-types';

/**
 * Plain helpers for uploaded files and buttons, safe to use in the browser
 * (the "Post a new event" preview) as well as on the server. Re-exported by
 * lib/cms/content.ts.
 */

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

const isPdf = (media: Media | null): media is Media => Boolean(media?.url && media.mimeType === 'application/pdf');
const isImage = (media: Media | null): media is Media => Boolean(media?.url && media.mimeType?.startsWith('image/'));

export type EventFlyer = {
  /** The printable PDF, if any. */
  pdf: Media | null;
  /** Pictures of the flyer's pages (photos only), each linking to the PDF. */
  pictures: { id?: string | null; media: Media; linkLabel?: string | null }[];
};

/**
 * An event's flyer, forgiving of where the editor put things: a PDF added
 * under "Flyer pictures" (which can't be shown as a picture) is used as the
 * PDF instead of breaking the page.
 */
export function eventFlyer(event: Pick<Event, 'flyerPdf' | 'flyerImages'>): EventFlyer {
  const items = (event.flyerImages ?? []).map((item) => ({ id: item.id, media: asMedia(item.image), linkLabel: item.linkLabel }));
  const declared = asMedia(event.flyerPdf);
  const pdf = isPdf(declared) ? declared : (items.find((item) => isPdf(item.media))?.media ?? null);
  const pictures = items.flatMap(({ media, ...item }) => (isImage(media) ? [{ ...item, media }] : []));
  return { pdf, pictures };
}

export type Button = NonNullable<Event['buttons']>[number];

/** Where a CMS button points: a typed URL/path, or an uploaded file. */
export function buttonHref(button: Button): string | null {
  if (button.linkType === 'file') return asMedia(button.file)?.url ?? null;
  return button.url ?? null;
}
