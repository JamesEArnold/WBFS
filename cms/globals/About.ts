import { buttonsField, headingFields } from '../fields/link';
import { overlineField, pageGlobal } from './pageGlobal';

const HIGHLIGHT_HINT = 'Wrap words in **double stars** to highlight them.';

/** /about — "Meet Sheriff Eric Weisburn": intro, service record timeline and sign-off. */
export const About = pageGlobal({
  slug: 'about',
  label: 'About',
  path: '/about',
  description: 'The About page (/about).',
  fields: [
    {
      type: 'collapsible',
      label: 'Top of page',
      fields: [
        { name: 'overline', type: 'text', required: true, admin: { description: 'Small gold line above the headline.' } },
        ...headingFields(true),
        { name: 'intro', type: 'textarea' },
        { name: 'heroImage', label: 'Photo', type: 'upload', relationTo: 'media', required: true },
        overlineField('heroImageCaption', 'Gold strip across the bottom of the photo. Stars are added automatically.'),
      ],
    },
    {
      type: 'collapsible',
      label: 'Origins',
      fields: [overlineField('originsOverline'), { name: 'originsBody', type: 'textarea' }],
    },
    {
      type: 'collapsible',
      label: 'Service record',
      fields: [
        overlineField('timelineOverline'),
        { name: 'timelineHeading', type: 'text', required: true },
        {
          name: 'timeline',
          type: 'array',
          admin: { description: 'Oldest first.' },
          fields: [
            { name: 'year', type: 'text', required: true, admin: { description: 'e.g. "1991" or "Currently".' } },
            { name: 'text', type: 'textarea', required: true, admin: { description: HIGHLIGHT_HINT } },
          ],
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Sign-off',
      fields: [
        { name: 'signOffGreeting', type: 'text', defaultValue: 'Respectfully,' },
        { name: 'signature', type: 'upload', relationTo: 'media' },
        { name: 'signOffName', type: 'text', required: true },
        buttonsField('signOffButtons', 'Buttons'),
        { name: 'signOffImage', label: 'Photo', type: 'upload', relationTo: 'media' },
        overlineField('signOffImageCaption', 'Small line under the photo. Stars are added automatically.'),
      ],
    },
  ],
});
