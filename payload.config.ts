import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob';
import path from 'path';
import { buildConfig } from 'payload';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

import { Events } from './cms/collections/Events';
import { Media } from './cms/collections/Media';
import { Users } from './cms/collections/Users';
import { EventsPage } from './cms/globals/EventsPage';
import { SiteSettings } from './cms/globals/SiteSettings';

const dirname = path.dirname(fileURLToPath(import.meta.url));

const blobToken = process.env.BLOB_READ_WRITE_TOKEN;

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || '',
  admin: {
    user: Users.slug,
    meta: { titleSuffix: ' — Weisburn for Sheriff CMS' },
    importMap: { baseDir: path.resolve(dirname) },
  },
  collections: [Events, Media, Users],
  globals: [SiteSettings, EventsPage],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  // Public site reads through the Local API only; GraphQL is unused.
  graphQL: { disable: true },
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URI || '' },
    // Schema changes only through committed migrations, in every environment.
    push: false,
    migrationDir: path.resolve(dirname, 'migrations'),
  }),
  plugins: [
    vercelBlobStorage({
      // Local development stores uploads on disk; deployed envs use Vercel Blob.
      enabled: Boolean(blobToken),
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
