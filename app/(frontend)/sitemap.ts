import type { MetadataRoute } from 'next';
import { globalMeta } from '@/components/seo/globalMeta';
import { listEventSlugs, listPageSlugs } from '@/lib/cms/public';

/** Fixed site pages (code-owned routes). */
const STATIC_PATHS = ['/', '/about', '/time-in-office', '/events', '/donate'];

/**
 * Generated at runtime from published CMS content and cached under the `cms`
 * tag, so new/removed pages and events appear without a redeploy.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = globalMeta.siteUrl;
  const [events, pages] = await Promise.all([listEventSlugs(), listPageSlugs()]);
  return [
    ...STATIC_PATHS.map((path) => ({ url: `${base}${path === '/' ? '' : path}` })),
    ...pages.map(({ slug, updatedAt }) => ({ url: `${base}/${slug}`, lastModified: updatedAt })),
    ...events.map(({ slug, updatedAt }) => ({ url: `${base}/events/${slug}`, lastModified: updatedAt })),
  ];
}
