import type { CollectionConfig } from 'payload';
import { isStaff } from '../access/roles';
import { extraSectionsField } from '../blocks';
import { withPlainLabels } from '../fields/plainLabels';
import { buttonsField, headingFields } from '../fields/link';
import { lockSlugAfterPublish, slugFields } from '../fields/slug';
import { invalidateAfterChange, invalidateAfterDelete } from '../hooks/invalidate';
import { livePreviewUrl, previewPath } from '../livePreview';

export const EVENT_STATUSES = ['upcoming', 'soldOut', 'past', 'hidden'] as const;
export type EventStatus = (typeof EVENT_STATUSES)[number];

/**
 * Campaign events. Each published event gets a page at /events/<slug> using the
 * golf-fundraiser design; "upcoming" and "sold out" events are listed on /events.
 */
export const Events: CollectionConfig = {
  slug: 'events',
  labels: { singular: 'Event', plural: 'Events' },
  admin: {
    group: 'Events & Photos',
    useAsTitle: 'title',
    defaultColumns: ['title', 'status', 'date', 'expiresAt', '_status', 'updatedAt'],
    description: 'Fundraisers, parades and other appearances. Publish to put an event on the site.',
    preview: (doc) => (doc?.slug ? previewPath(`/events/${doc.slug}`) : null),
    livePreview: {
      url: ({ data }) => (data?.slug ? livePreviewUrl(`/events/${data.slug}`) : null),
    },
  },
  versions: {
    // Autosave keeps the draft (and the live preview beside the form) up to date as you type.
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
      admin: { description: 'Shown on the Events list, e.g. "Annual Golf Fundraiser".' },
    },
    ...slugFields('title'),
    {
      name: 'status',
      type: 'select',
      // Distinct DB enum name: Payload's own draft `_status` would otherwise share "enum_events_status".
      enumName: 'enum_events_event_status',
      required: true,
      defaultValue: 'upcoming',
      options: [
        { label: 'Upcoming — listed on the Events page', value: 'upcoming' },
        { label: 'Sold out — listed, with sold-out banner on its page', value: 'soldOut' },
        { label: 'Past — page stays up, not listed', value: 'past' },
        { label: 'Hidden — page removed from the site', value: 'hidden' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'date',
      type: 'date',
      required: true,
      admin: { position: 'sidebar', description: 'Used to sort the Events list.' },
    },
    {
      name: 'expiresAt',
      label: 'Remove from listings after',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: { pickerAppearance: 'dayOnly', displayFormat: 'MMM d, yyyy' },
        description:
          'Optional. The event stays on the Events list (and the Home page strip) through this day, then drops off automatically. Its own page stays up for anyone with the link; set Status to "Hidden" to remove it completely.',
      },
    },
    {
      type: 'collapsible',
      label: 'Events list card',
      fields: [
        { name: 'overline', type: 'text', admin: { description: 'Small gold text above the title, e.g. "Save The Date".' } },
        { name: 'subtitle', type: 'text', admin: { description: 'e.g. "Friday, September 18, 2026 · Sable Creek Golf Course".' } },
        {
          name: 'facts',
          type: 'array',
          admin: { description: 'Short starred lines on the card.' },
          fields: [{ name: 'text', type: 'text', required: true }],
        },
        { name: 'listingCtaLabel', type: 'text', defaultValue: 'View Details', label: 'Card link text' },
      ],
    },
    {
      type: 'collapsible',
      label: 'Event page',
      fields: [
        {
          name: 'soldOutBanner',
          type: 'group',
          label: 'Sold-out banner',
          admin: { description: 'Gold banner across the top of the event page, shown while the status is "Sold out".' },
          fields: [
            { name: 'heading', type: 'text' },
            { name: 'body', type: 'textarea' },
          ],
        },
        { name: 'dateLabel', label: 'Date line', type: 'text', admin: { description: 'Gold line above the headline, e.g. "Friday · September 18, 2026".' } },
        ...headingFields(true),
        { name: 'heroBlurb', label: 'Paragraph under the headline', type: 'textarea', admin: { description: 'Paragraph under the headline.' } },
        buttonsField('buttons', 'Buttons'),
        {
          name: 'flyerPdf',
          label: 'Flyer PDF',
          type: 'upload',
          relationTo: 'media',
          filterOptions: { mimeType: { equals: 'application/pdf' } },
          admin: { description: 'Printable flyer. The flyer images below link to it.' },
        },
        {
          name: 'flyerImages',
          label: 'Flyer pictures',
          type: 'array',
          fields: [
            { name: 'image', type: 'upload', relationTo: 'media', required: true },
            { name: 'linkLabel', label: 'Description for screen readers', type: 'text', admin: { description: 'Read aloud by screen readers for the link, e.g. "Open the printable flyer PDF — outside".' } },
          ],
        },
        { name: 'flyerCaption', type: 'text', admin: { description: 'e.g. "Tap either page to open the printable PDF".' } },
      ],
    },
    extraSectionsField(),
    { name: 'importKey', type: 'text', unique: true, index: true, admin: { hidden: true } },
  ]),
};
