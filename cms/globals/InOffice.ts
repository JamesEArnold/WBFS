import { buttonsField, headingFields } from '../fields/link';
import { linesField, overlineField, pageGlobal } from './pageGlobal';

/** /time-in-office — "My Time In Office" record, year by year. */
export const InOffice = pageGlobal({
  slug: 'inOffice',
  label: 'In Office',
  path: '/time-in-office',
  description: 'The "My Time In Office" page (/time-in-office).',
  fields: [
    {
      type: 'collapsible',
      label: 'Top of page',
      fields: [
        { name: 'overline', type: 'text', required: true, admin: { description: 'Small gold line above the headline.' } },
        ...headingFields(true),
        { name: 'intro', type: 'textarea' },
      ],
    },
    {
      type: 'collapsible',
      label: 'Year by year',
      fields: [
        overlineField('timelineOverline'),
        { name: 'timelineHeading', type: 'text', required: true },
        {
          name: 'outreachHeading',
          type: 'text',
          required: true,
          admin: { description: 'Small heading above each year’s second list.' },
        },
        {
          name: 'years',
          type: 'array',
          admin: { description: 'Newest year first.' },
          fields: [
            { name: 'year', type: 'text', required: true },
            linesField('events', 'Events, training and engagements'),
            linesField('outreach', 'Non-profit organizations and community outreach'),
          ],
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Closing call to action',
      fields: [
        overlineField('ctaOverline'),
        { name: 'ctaHeading', type: 'text', required: true },
        { name: 'ctaBody', type: 'textarea' },
        buttonsField('ctaButtons', 'Buttons'),
      ],
    },
  ],
});
