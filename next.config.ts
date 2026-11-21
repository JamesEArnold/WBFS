import { withPayload } from '@payloadcms/next/withPayload';
import type { NextConfig } from 'next';
import path from 'path';
import { fileURLToPath } from 'url';

const dirname = path.dirname(fileURLToPath(import.meta.url));

/** Vercel Blob public host for this environment (set per Vercel environment; absent locally). */
const blobHost = process.env.BLOB_PUBLIC_HOST;

const nextConfig: NextConfig = {
  images: {
    localPatterns: [
      // Existing site images in public/ (any path, no query string).
      { pathname: '/**', search: '' },
      // Payload media served from local disk in development.
      { pathname: '/api/media/file/**' },
    ],
    remotePatterns: blobHost ? [{ protocol: 'https', hostname: blobHost, pathname: '/**' }] : [],
  },
  // Keep the CMS and API out of search engines.
  async headers() {
    const noindex = [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }];
    return [
      { source: '/admin/:path*', headers: noindex },
      { source: '/api/:path*', headers: noindex },
      { source: '/preview/:path*', headers: noindex },
    ];
  },
  turbopack: {
    root: path.resolve(dirname),
  },
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
