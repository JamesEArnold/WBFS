import type { MetadataRoute } from 'next';
import { globalMeta } from '@/components/seo/globalMeta';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/admin', '/api/', '/preview/'] },
    sitemap: `${globalMeta.siteUrl}/sitemap.xml`,
    host: globalMeta.siteUrl,
  };
}
