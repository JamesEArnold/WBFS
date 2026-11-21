/**
 * Shared, pure validators. Kept free of Payload imports so they are trivially
 * unit-testable (tests/unit/validators.test.ts).
 */

/** Paths owned by the app or Payload — a CMS page/event can never take these slugs. */
export const RESERVED_SLUGS = new Set([
  'admin',
  'api',
  'events',
  'about',
  'donate',
  'time-in-office',
  'mailinglist',
  'volunteerlist',
  'preview',
  'sitemap.xml',
  'robots.txt',
  '_next',
]);

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Returns true when valid, otherwise an editor-facing error message. */
export function validateSlug(value: unknown, { reserved = true } = {}): true | string {
  if (typeof value !== 'string' || value.length === 0) return 'A URL slug is required.';
  if (!SLUG_PATTERN.test(value)) {
    return 'Use lowercase letters, numbers and single dashes only (e.g. "summer-picnic").';
  }
  if (reserved && RESERVED_SLUGS.has(value.toLowerCase())) {
    return `"${value}" is reserved by the site. Please choose a different slug.`;
  }
  return true;
}

const BLOB_HOST = /(^|\.)blob\.vercel-storage\.com$/i;

/**
 * Links typed into content may not point at raw Vercel Blob URLs — files must be
 * linked through a Media item ("Link to file") so backups and deletes stay correct.
 */
export function validateLinkUrl(value: unknown, { required = false } = {}): true | string {
  if (value === undefined || value === null || value === '') {
    return required ? 'A link is required.' : true;
  }
  if (typeof value !== 'string') return 'Enter a link.';
  const trimmed = value.trim();
  if (trimmed.startsWith('/') && !trimmed.startsWith('//')) return true;
  if (/^(mailto|tel):/i.test(trimmed)) return true;
  let url: URL;
  try {
    url = new URL(trimmed);
  } catch {
    return 'Enter a full link (https://…), a site path (/events), or a mailto: address.';
  }
  if (url.protocol !== 'https:' && url.protocol !== 'http:') {
    return 'Only https://, site paths (/…), mailto: and tel: links are allowed.';
  }
  if (BLOB_HOST.test(url.hostname)) {
    return 'To link to an uploaded file, choose "Link to file" instead of pasting its address.';
  }
  return true;
}

/** Hosts an editor may embed (iframes). */
export const EMBED_HOSTS = ['donorbox.org', 'youtube.com', 'www.youtube.com', 'facebook.com', 'www.facebook.com'];

export function validateEmbedUrl(value: unknown): true | string {
  if (typeof value !== 'string' || value.length === 0) return 'An embed address is required.';
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    return 'Enter a full https:// address.';
  }
  if (url.protocol !== 'https:') return 'Embeds must use https://.';
  if (!EMBED_HOSTS.includes(url.hostname.toLowerCase())) {
    return `Embeds are limited to: ${EMBED_HOSTS.filter((h) => !h.startsWith('www.')).join(', ')}.`;
  }
  return true;
}
