import { withPayload } from '@payloadcms/next/withPayload';
import type { NextConfig } from 'next';
import path from 'path';
import { fileURLToPath } from 'url';
import { blobToken } from './lib/blob-token';

const dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Vercel Blob public host for this environment, derived from the store token the
 * same way Payload's Blob adapter does (vercel_blob_rw_<storeId>_<random>).
 * Absent locally, where uploads are stored on disk.
 */
const blobStoreId = blobToken()?.match(/^vercel_blob_rw_([a-z\d]+)_[a-z\d]+$/i)?.[1]?.toLowerCase();
const blobHost = blobStoreId ? `${blobStoreId}.public.blob.vercel-storage.com` : undefined;

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
