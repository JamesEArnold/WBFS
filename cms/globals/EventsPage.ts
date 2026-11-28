import { TAB } from '../tabs';
import { buttonsField, headingFields } from '../fields/link';
import { pageGlobal, tab } from './pageGlobal';

/** Copy on the /events page around the list of events. */
export const EventsPage = pageGlobal({
  slug: 'eventsPage',
  label: 'Events Page',
  path: '/events',
  description: 'The words around the list of events on /events. The events themselves are under Events.',
  tabs: [
    tab(TAB.top, [
      { name: 'overline', type: 'text', required: true },
      ...headingFields(true),
      { name: 'intro', type: 'textarea' },
    ]),
    tab(TAB.eventsList, [
      { name: 'listHeading', type: 'text', required: true, admin: { description: 'Heading above the events list, e.g. "On The Calendar". The month line above it is automatic.' } },
    ]),
    tab(
      TAB.noEvents,
      [
        {
          name: 'emptyState',
          type: 'group',
          label: false,
          fields: [
            { name: 'overline', type: 'text', admin: { description: 'Stars are added automatically.' } },
            { name: 'heading', type: 'text', required: true },
            { name: 'body', type: 'textarea' },
            buttonsField('buttons', 'Buttons'),
          ],
        },
      ],
      'Shown instead of the list when no events are listed.',
    ),
  ],
});
