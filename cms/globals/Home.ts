import { TAB } from '../tabs';
import type { Field } from 'payload';
import { buttonsField, headingFields } from '../fields/link';
import { validateLinkUrl } from '../fields/validators';
import { linesField, moreOptions, overlineField, pageGlobal, tab } from './pageGlobal';

const HIGHLIGHT_HINT = 'Wrap words in **double stars** to highlight them.';

const linkFields = (prefix: string, labelHint: string): Field[] => [
  { name: `${prefix}Label`, type: 'text', admin: { description: labelHint } },
  {
    name: `${prefix}Url`,
    type: 'text',
    admin: { description: 'e.g. /about, #volunteer, or https://…' },
    validate: (value: unknown) => validateLinkUrl(value),
  },
];

/** / — the home page. The sheriff star badge and the sign-up forms are part of the design. */
export const Home = pageGlobal({
  slug: 'home',
  label: 'Home',
  path: '/',
  description: 'The home page (/). The sign-up forms themselves are built in and not edited here.',
  tabs: [
    tab(TAB.top, [
      { name: 'overline', type: 'text', required: true, admin: { description: 'Small gold line above the headline.' } },
      ...headingFields(true),
      { name: 'intro', type: 'textarea' },
      buttonsField('heroButtons', 'Buttons'),
    ]),
    tab(TAB.portrait, [
      { name: 'portraitImage', label: 'Photo', type: 'upload', relationTo: 'media', required: true },
      overlineField('portraitCaption', 'Gold strip across the bottom of the photo. Stars are added automatically.'),
      { name: 'portraitHeading', type: 'text', required: true },
      { name: 'portraitBody', type: 'textarea' },
      ...linkFields('portraitLink', 'Underlined link text, e.g. "Read His Record". The arrow is added automatically.'),
      moreOptions([{ name: 'portraitOverline', type: 'text', admin: { description: 'Small gold line above the heading.' } }]),
    ]),
    tab(
      TAB.featuredEvent,
      [
        {
          name: 'featuredEvent',
          label: 'Event to feature',
          type: 'relationship',
          relationTo: 'events',
          admin: { description: 'Shows the event’s name and its date and place line, and links to its page.' },
        },
        { name: 'eventsHeading', type: 'text' },
        moreOptions([
          overlineField('eventsOverline'),
          { name: 'featuredEventCtaLabel', type: 'text', defaultValue: 'View Details', admin: { description: 'The arrow is added automatically.' } },
        ]),
      ],
      'A strip linking to one event. Hidden when no event is chosen, or the event is not published.',
    ),
    tab(TAB.waysToHelp, [
      {
        name: 'pillars',
        type: 'array',
        maxRows: 3,
        fields: [
          { name: 'title', type: 'text', required: true },
          { name: 'body', type: 'textarea' },
          ...linkFields('cta', 'e.g. "Sign Up". The arrow is added automatically.'),
        ],
      },
      moreOptions([overlineField('pillarsOverline')]),
    ]),
    tab(TAB.quote, [
      {
        name: 'quote',
        type: 'text',
        admin: { description: 'Shown in italics. Wrap words in **double stars** to show them upright.' },
      },
      { name: 'quoteAttribution', type: 'text' },
    ]),
    tab(TAB.gallery, [
      { name: 'galleryHeading', type: 'text' },
      {
        name: 'gallery',
        type: 'array',
        admin: { description: 'Shown two per row on desktop. The caption appears on the photo.' },
        fields: [
          { name: 'image', type: 'upload', relationTo: 'media', required: true },
          { name: 'caption', type: 'text', required: true },
          {
            name: 'focus',
            type: 'select',
            defaultValue: 'center',
            options: [
              { label: 'Centre', value: 'center' },
              { label: 'Slightly above centre (desktop)', value: 'upper' },
            ],
            admin: { description: 'Which part of the photo to keep when it is cropped.' },
          },
        ],
      },
      moreOptions([overlineField('galleryOverline')]),
    ]),
    tab(TAB.volunteer, [
      { name: 'volunteerHeading', type: 'text', required: true },
      { name: 'volunteerBody', type: 'textarea', admin: { description: HIGHLIGHT_HINT } },
      linesField('volunteerTasks', 'Starred list'),
      { name: 'volunteerFormHeading', type: 'text', required: true },
      moreOptions([
        overlineField('volunteerOverline'),
        overlineField('volunteerFormOverline', 'Small gold line above the form title. Stars are added automatically.'),
      ]),
    ]),
    tab(
      TAB.updates,
      [
        { name: 'updatesHeading', type: 'text', required: true },
        { name: 'updatesBody', type: 'textarea' },
        moreOptions([overlineField('updatesOverline')]),
      ],
      'The Facebook and Instagram links come from Site Settings → Footer.',
    ),
  ],
});
