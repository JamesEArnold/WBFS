import { TAB } from '../tabs';
import { buttonsField, headingFields } from '../fields/link';
import { linesField, moreOptions, overlineField, pageGlobal, tab } from './pageGlobal';

/** /time-in-office — "My Time In Office" record, year by year. */
export const InOffice = pageGlobal({
  slug: 'inOffice',
  label: 'In Office',
  path: '/time-in-office',
  description: 'The "My Time In Office" page (/time-in-office).',
  tabs: [
    tab(TAB.top, [
      { name: 'overline', type: 'text', required: true, admin: { description: 'Small gold line above the headline.' } },
      ...headingFields(true),
      { name: 'intro', type: 'textarea' },
    ]),
    tab(TAB.yearByYear, [
      { name: 'timelineHeading', type: 'text', required: true },
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
      moreOptions([
        overlineField('timelineOverline'),
        {
          name: 'outreachHeading',
          type: 'text',
          required: true,
          admin: { description: 'Small heading above each year’s second list.' },
        },
      ]),
    ]),
    tab(TAB.closing, [
      { name: 'ctaHeading', type: 'text', required: true },
      { name: 'ctaBody', type: 'textarea' },
      buttonsField('ctaButtons', 'Buttons'),
      moreOptions([overlineField('ctaOverline')]),
    ]),
  ],
});
