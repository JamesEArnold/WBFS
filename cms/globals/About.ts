import { TAB } from '../tabs';
import { buttonsField, headingFields } from '../fields/link';
import { moreOptions, overlineField, pageGlobal, tab } from './pageGlobal';

const HIGHLIGHT_HINT = 'Wrap words in **double stars** to highlight them.';

/** /about — "Meet Sheriff Eric Weisburn": intro, service record timeline and sign-off. */
export const About = pageGlobal({
  slug: 'about',
  label: 'About',
  path: '/about',
  description: 'The About page (/about).',
  tabs: [
    tab(TAB.top, [
      { name: 'overline', type: 'text', required: true, admin: { description: 'Small gold line above the headline.' } },
      ...headingFields(true),
      { name: 'intro', type: 'textarea' },
      { name: 'heroImage', label: 'Photo', type: 'upload', relationTo: 'media', required: true },
      overlineField('heroImageCaption', 'Gold strip across the bottom of the photo. Stars are added automatically.'),
    ]),
    tab(TAB.origins, [{ name: 'originsBody', type: 'textarea' }, moreOptions([overlineField('originsOverline')])]),
    tab(TAB.serviceRecord, [
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
      moreOptions([overlineField('timelineOverline')]),
    ]),
    tab(TAB.signOff, [
      { name: 'signature', type: 'upload', relationTo: 'media' },
      { name: 'signOffName', type: 'text', required: true },
      buttonsField('signOffButtons', 'Buttons'),
      { name: 'signOffImage', label: 'Photo', type: 'upload', relationTo: 'media' },
      overlineField('signOffImageCaption', 'Small line under the photo. Stars are added automatically.'),
      moreOptions([{ name: 'signOffGreeting', type: 'text', defaultValue: 'Respectfully,' }]),
    ]),
  ],
});
