import type { CollectionBeforeValidateHook, CollectionConfig } from 'payload';
import { ValidationError } from 'payload';
import { anyone, isStaff } from '../access/roles';
import { invalidateAfterChange, invalidateAfterDelete } from '../hooks/invalidate';
import { preventDeletingUsedMedia } from '../hooks/mediaRefs';

export const MAX_UPLOAD_MB = 25;

/**
 * Browser uploads go straight to Vercel Blob (no server body limit), so the
 * size cap is checked when the Media record is saved.
 */
export const limitFileSize: CollectionBeforeValidateHook = ({ data }) => {
  const size = Number(data?.filesize ?? 0);
  if (size > MAX_UPLOAD_MB * 1024 * 1024) {
    throw new ValidationError({
      errors: [
        {
          path: 'file',
          message: `This file is ${(size / 1024 / 1024).toFixed(1)} MB. The limit is ${MAX_UPLOAD_MB} MB: resize the photo or compress the PDF and try again.`,
        },
      ],
    });
  }
  return data;
};

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
    beforeValidate: [limitFileSize],
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
