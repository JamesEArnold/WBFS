import { buttonsField, headingFields } from '../fields/link';
import { pageGlobal } from './pageGlobal';

/** Copy on the /events page around the list of events. */
export const EventsPage = pageGlobal({
  slug: 'eventsPage',
  label: 'Events Page',
  path: '/events',
  description: 'The words around the list of events on /events. The events themselves are under Events.',
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
});
