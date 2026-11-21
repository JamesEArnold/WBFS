import type { MetadataRoute } from 'next';
import { globalMeta } from '@/components/seo/globalMeta';
import { listEventSlugs } from '@/lib/cms/public';

/** Fixed site pages (code-owned routes). */
const STATIC_PATHS = ['/', '/about', '/time-in-office', '/events', '/donate'];

/**
 * Generated at runtime from published CMS content and cached under the `cms`
 * tag, so new/removed events appear without a redeploy.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = globalMeta.siteUrl;
  const events = await listEventSlugs();
  return [
    ...STATIC_PATHS.map((path) => ({ url: `${base}${path === '/' ? '' : path}` })),
    ...events.map(({ slug, updatedAt }) => ({ url: `${base}/events/${slug}`, lastModified: updatedAt })),
  ];
}
