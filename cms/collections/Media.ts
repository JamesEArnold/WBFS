import type { CollectionConfig } from 'payload';
import { anyone, isStaff } from '../access/roles';
import { invalidateAfterChange, invalidateAfterDelete } from '../hooks/invalidate';
import { preventDeletingUsedMedia } from '../hooks/mediaRefs';

/**
 * Uploaded images and PDFs. Files are public (served from Vercel Blob in
 * deployed environments), so Media records are readable by anyone; only
 * staff can upload, change or delete.
 */
export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    useAsTitle: 'alt',
    defaultColumns: ['filename', 'alt', 'mimeType', 'updatedAt'],
  },
  access: {
    read: anyone,
    create: isStaff,
    update: isStaff,
    delete: isStaff,
  },
  hooks: {
    beforeDelete: [preventDeletingUsedMedia],
    afterChange: [invalidateAfterChange],
    afterDelete: [invalidateAfterDelete],
  },
  upload: {
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif', 'application/pdf'],
    imageSizes: [
      { name: 'small', width: 640 },
      { name: 'medium', width: 1280 },
      { name: 'large', width: 1920 },
    ],
    adminThumbnail: 'small',
    focalPoint: true,
  },
  fields: [
    {
      name: 'alt',
      label: 'Description (alt text)',
      type: 'text',
      required: true,
      admin: {
        description: 'Describe the image for people using screen readers, e.g. "Sheriff Weisburn at the 2025 parade". For PDFs, describe the document.',
      },
    },
    { name: 'caption', type: 'text' },
    { name: 'importKey', type: 'text', unique: true, index: true, admin: { hidden: true } },
  ],
};
