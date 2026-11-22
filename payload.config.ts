import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob';
import path from 'path';
import { buildConfig } from 'payload';
import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { blobToken as getBlobToken } from './lib/blob-token';

import { Events } from './cms/collections/Events';
import { MAX_UPLOAD_MB, Media } from './cms/collections/Media';
import { Pages } from './cms/collections/Pages';
import { Users } from './cms/collections/Users';
import { About } from './cms/globals/About';
import { Donate } from './cms/globals/Donate';
import { EventsPage } from './cms/globals/EventsPage';
import { Home } from './cms/globals/Home';
import { InOffice } from './cms/globals/InOffice';
import { SiteSettings } from './cms/globals/SiteSettings';

const dirname = path.dirname(fileURLToPath(import.meta.url));

const blobToken = getBlobToken();

const serverURL = (process.env.NEXT_PUBLIC_SERVER_URL || '').replace(/\/$/, '');
/** The only origins allowed to use a CMS login cookie or call the API from a browser. */
const siteOrigins = [...new Set([serverURL, 'https://weisburnforsheriff.com', 'https://www.weisburnforsheriff.com'].filter(Boolean))];


export default buildConfig({
  serverURL,
  cors: siteOrigins,
  csrf: siteOrigins,
  upload: { limits: { fileSize: MAX_UPLOAD_MB * 1024 * 1024 } },
  admin: {
    user: Users.slug,
    meta: { titleSuffix: ' — Weisburn for Sheriff CMS', robots: 'noindex, nofollow' },
    importMap: { baseDir: path.resolve(dirname) },
    // Side-by-side preview while editing (collections/globals opt in with a url).
    livePreview: {
      openByDefault: true,
      breakpoints: [
        { name: 'mobile', label: 'Phone', width: 390, height: 844 },
        { name: 'desktop', label: 'Desktop', width: 1440, height: 900 },
      ],
    },
  },
  collections: [Pages, Events, Media, Users],
  globals: [SiteSettings, Home, About, Donate, InOffice, EventsPage],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  // Public site reads through the Local API only; GraphQL is unused.
  graphQL: { disable: true },
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URL || '' },
    // Schema changes only through committed migrations, in every environment.
    push: false,
    migrationDir: path.resolve(dirname, 'migrations'),
  }),
  plugins: [
    vercelBlobStorage({
      // Local development stores uploads on disk; deployed envs use Vercel Blob.
      enabled: Boolean(blobToken),
      // Add the storage columns even when disabled (local dev), so the database
      // schema — and therefore the migrations — are identical in every environment.
      alwaysInsertFields: true,
      token: blobToken,
      // Unique object names per upload, so a replaced file never serves stale cached bytes.
      addRandomSuffix: true,
      // Browser uploads straight to Blob (avoids Vercel's 4.5 MB function body limit).
      clientUploads: true,
      // Media files are public: link straight to Blob instead of proxying through /api.
      collections: { media: { disablePayloadAccessControl: true } },
    }),
  ],
  sharp,
});
