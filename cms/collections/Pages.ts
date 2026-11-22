import type { CollectionConfig } from 'payload';
import { isStaff } from '../access/roles';
import { sectionsField } from '../blocks';
import { withPlainLabels } from '../fields/plainLabels';
import { lockSlugAfterPublish, slugFields } from '../fields/slug';
import { invalidateAfterChange, invalidateAfterDelete } from '../hooks/invalidate';
import { livePreviewUrl, previewPath } from '../livePreview';

/**
 * New pages built from ready-made sections, published at /<slug>.
 * Not added to the menu automatically (Site Settings → Header → navigation).
 */
export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: { singular: 'Custom Page', plural: 'Custom Pages' },
  admin: {
    group: 'Pages',
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', '_status', 'updatedAt'],
    description: 'New pages built from sections. Publish to put a page on the site at weisburnforsheriff.com/<address>.',
    preview: (doc) => (doc?.slug ? previewPath(`/${doc.slug}`) : null),
    livePreview: {
      url: ({ data }) => (data?.slug ? livePreviewUrl(`/${data.slug}`) : null),
    },
  },
  versions: {
    drafts: { autosave: { interval: 500 } },
    maxPerDoc: 20,
  },
  access: {
    // No anonymous API reads: the public site reads through lib/cms/public.ts.
    read: isStaff,
    create: isStaff,
    update: isStaff,
    delete: isStaff,
    readVersions: isStaff,
  },
  hooks: {
    beforeChange: [lockSlugAfterPublish],
    afterChange: [invalidateAfterChange],
    afterDelete: [invalidateAfterDelete],
  },
  fields: withPlainLabels([
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: { description: 'Shown in the browser tab and search results.' },
    },
    ...slugFields('title'),
    {
      name: 'description',
      type: 'textarea',
      admin: { position: 'sidebar', description: 'One or two sentences for search results and link previews.' },
    },
    sectionsField(
      'sections',
      'Sections',
      'Build the page top to bottom. Start with a "Page heading" section; it becomes the page title on the site.',
    ),
    { name: 'importKey', type: 'text', unique: true, index: true, admin: { hidden: true } },
  ]),
};
