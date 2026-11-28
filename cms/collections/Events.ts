import { TAB } from '../tabs';
import type { CollectionConfig, Endpoint } from 'payload';
import { addDataAndFileToRequest, APIError, Forbidden, ValidationError } from 'payload';
import { isStaff, isStaffReq } from '../access/roles';
import { quickEventData, quickEventErrors } from '../quickEvent';
import { withPlainLabels } from '../fields/plainLabels';
import { moreOptions, pageTabs, tab } from '../globals/pageGlobal';
import { buttonsField } from '../fields/link';
import { lockSlugAfterPublish, slugFields } from '../fields/slug';
import { slugify } from '../fields/validators';
import { invalidateAfterChange, invalidateAfterDelete } from '../hooks/invalidate';
import { livePreviewUrl, previewPath } from '../livePreview';

export const EVENT_STATUSES = ['upcoming', 'soldOut', 'past', 'hidden'] as const;
export type EventStatus = (typeof EVENT_STATUSES)[number];

/** POST /api/events/quick-create — the "Post a new event" quick form. Returns the new event's id. */
const quickCreateEndpoint: Endpoint = {
  path: '/quick-create',
  method: 'post',
  handler: async (req) => {
    if (!isStaffReq(req)) throw new Forbidden(req.t);
    await addDataAndFileToRequest(req);
    const input = (req.data ?? {}) as Record<string, unknown>;
    const errors = quickEventErrors(input);
    if (errors.length) throw new APIError(errors.join(' '), 400);
    const data = quickEventData(input);
    try {
      const event =
        data._status === 'published'
          ? await req.payload.create({ collection: 'events', data: { ...data, slug: slugify(data.title) }, overrideAccess: false, req })
          : await req.payload.create({ collection: 'events', data, draft: true, overrideAccess: false, req });
      return Response.json({ id: event.id });
    } catch (error) {
      if (error instanceof ValidationError && error.data?.errors?.some((e) => e.path === 'slug')) {
        throw new APIError('There’s already an event with that name. Add something to make it different, like the year.', 400);
      }
      throw error;
    }
  },
};

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
    components: {
      beforeListTable: ['/cms/components/quick/NewEventCallout#NewEventCallout'],
    },
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
  endpoints: [quickCreateEndpoint],
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
      label: 'Event name',
      admin: { description: 'e.g. "Annual Golf Fundraiser". Shown on the Events list, and as the headline on its page.' },
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
      admin: { position: 'sidebar', description: 'The day of the event. Sorts the Events list.' },
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
    pageTabs([
      tab(TAB.basics, [
        {
          name: 'subtitle',
          label: 'Date and place',
          type: 'text',
          admin: {
            description:
              'Shown under the name on the Events list and the Home page, e.g. "Friday, September 18 · Sable Creek Golf Course". Leave blank to show just the date.',
          },
        },
        {
          name: 'heroBlurb',
          label: 'About the event',
          type: 'textarea',
          admin: { description: 'A sentence or two on the event’s own page, under the headline.' },
        },
        buttonsField('buttons', 'Buttons'),
        moreOptions([
          { name: 'overline', type: 'text', admin: { description: 'Small gold text above the name on the Events list, e.g. "Save The Date".' } },
          {
            name: 'facts',
            label: 'Starred lines on the Events list',
            type: 'array',
            admin: { description: 'Short starred lines on the event’s box on the Events list.' },
            fields: [{ name: 'text', type: 'text', required: true }],
          },
          { name: 'listingCtaLabel', type: 'text', defaultValue: 'View Details', label: 'Link text on the Events list' },
          {
            name: 'dateLabel',
            label: 'Date line',
            type: 'text',
            admin: { description: 'Gold line above the headline on the event’s page. Leave blank to show the date, e.g. "Friday · September 18, 2026".' },
          },
          {
            name: 'heading',
            type: 'text',
            admin: { description: 'Big headline on the event’s page. Leave blank to use the event name.' },
          },
          { name: 'headingAccent', type: 'text', admin: { description: 'Optional second line of the headline, shown in gold.' } },
        ]),
      ]),
      tab(
        TAB.flyer,
        [
          {
            name: 'flyerPdf',
            label: 'Flyer PDF',
            type: 'upload',
            relationTo: 'media',
            filterOptions: { mimeType: { equals: 'application/pdf' } },
            admin: {
              description:
                'The printable flyer. On its own, the event’s page shows a gold “View the printable flyer” button. Add Flyer pictures below to show the flyer itself; they open the PDF when clicked.',
            },
          },
          {
            name: 'flyerImages',
            label: 'Flyer pictures',
            type: 'array',
            admin: { description: 'Optional. A photo or picture (JPG or PNG) of each page of the flyer, not the PDF itself.' },
            fields: [
              {
                name: 'image',
                type: 'upload',
                relationTo: 'media',
                required: true,
                // Pictures only: a PDF can't be shown as a picture (it goes in Flyer PDF above).
                filterOptions: { mimeType: { contains: 'image/' } },
              },
              {
                name: 'linkLabel',
                label: 'Description for screen readers',
                type: 'text',
                admin: { description: 'Optional. Read aloud by screen readers, e.g. "Open the printable flyer PDF — outside".' },
              },
            ],
          },
          { name: 'flyerCaption', type: 'text', admin: { description: 'e.g. "Tap either page to open the printable PDF".' } },
        ],
        'Optional. Add the printable flyer PDF. Pictures of its pages are optional too: with them, visitors see the flyer and click it to open the PDF.',
      ),
      tab(
        TAB.soldOut,
        [
          {
            name: 'soldOutBanner',
            type: 'group',
            label: 'Sold-out banner',
            fields: [
              { name: 'heading', type: 'text' },
              { name: 'body', type: 'textarea' },
            ],
          },
        ],
        'Gold banner across the top of the event’s page, shown while the Status (on the right) is "Sold out".',
      ),
    ]),
    { name: 'importKey', type: 'text', unique: true, index: true, admin: { hidden: true } },
  ]),
};
