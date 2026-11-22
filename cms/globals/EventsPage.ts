import type { GlobalConfig } from 'payload';
import { isStaff } from '../access/roles';
import { buttonsField, headingFields } from '../fields/link';
import { invalidateGlobalAfterChange } from '../hooks/invalidate';
import { livePreviewUrl, previewPath } from '../livePreview';

/** Copy on the /events page around the list of events. */
export const EventsPage: GlobalConfig = {
  slug: 'eventsPage',
  label: 'Events Page',
  versions: { drafts: { autosave: { interval: 500 } }, max: 20 },
  access: {
    read: isStaff,
    update: isStaff,
    readVersions: isStaff,
  },
  admin: {
    preview: () => previewPath('/events'),
    livePreview: { url: () => livePreviewUrl('/events') },
  },
  hooks: {
    afterChange: [invalidateGlobalAfterChange],
  },
  fields: [
    {
      type: 'collapsible',
      label: 'Top of page',
      fields: [
        { name: 'overline', type: 'text', required: true },
        ...headingFields(true),
        { name: 'intro', type: 'textarea' },
      ],
    },
    { name: 'listHeading', type: 'text', required: true, admin: { description: 'Heading above the events list, e.g. "On The Calendar".' } },
    {
      name: 'emptyState',
      type: 'group',
      admin: { description: 'Shown when no events are listed.' },
      fields: [
        { name: 'overline', type: 'text', admin: { description: 'Stars are added automatically.' } },
        { name: 'heading', type: 'text', required: true },
        { name: 'body', type: 'textarea' },
        buttonsField('buttons', 'Buttons'),
      ],
    },
  ],
};
