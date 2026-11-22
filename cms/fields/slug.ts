import type { CollectionBeforeChangeHook, Field } from 'payload';
import { ValidationError } from 'payload';
import { isAdminReq } from '../access/roles';
import { slugify, validateSlug } from './validators';

/** `slug` + hidden `firstPublishedAt`. Pair with `lockSlugAfterPublish` in beforeChange. */
export const slugFields = (sourceField = 'title'): Field[] => [
  {
    name: 'slug',
    label: 'Web address',
    type: 'text',
    required: true,
    unique: true,
    index: true,
    admin: {
      position: 'sidebar',
      description:
        'The page address, e.g. "summer-picnic" → /events/summer-picnic. Leave blank to fill in from the title. Can’t be changed after first publish.',
    },
    validate: (value: unknown) => validateSlug(value),
    hooks: {
      beforeValidate: [
        ({ value, siblingData }) => {
          if (typeof value === 'string' && value.trim()) return slugify(value);
          const source = siblingData?.[sourceField];
          return typeof source === 'string' ? slugify(source) : value;
        },
      ],
    },
  },
  {
    name: 'firstPublishedAt',
    type: 'date',
    admin: { hidden: true },
  },
];

/**
 * Records the first publish time and stops editors changing a slug after it,
 * so published links don't break. Admins may still change it.
 */
export const lockSlugAfterPublish: CollectionBeforeChangeHook = ({ data, originalDoc, req }) => {
  const publishing = data._status === 'published';
  const firstPublishedAt = originalDoc?.firstPublishedAt ?? data.firstPublishedAt;

  if (firstPublishedAt && originalDoc?.slug && data.slug && data.slug !== originalDoc.slug) {
    if (!isAdminReq(req)) {
      throw new ValidationError({
        errors: [
          {
            message: 'This page has been published, so its address can’t be changed. Ask an admin if it must change.',
            path: 'slug',
          },
        ],
      });
    }
  }

  if (publishing && !firstPublishedAt) {
    data.firstPublishedAt = new Date().toISOString();
  } else if (firstPublishedAt) {
    data.firstPublishedAt = firstPublishedAt;
  }
  return data;
};
