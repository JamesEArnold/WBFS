import type { Field } from 'payload';
import { buttonsField, headingFields } from '../fields/link';
import { validateLinkUrl } from '../fields/validators';
import { linesField, overlineField, pageGlobal } from './pageGlobal';

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
  fields: [
    {
      type: 'collapsible',
      label: 'Top of page',
      fields: [
        { name: 'overline', type: 'text', required: true, admin: { description: 'Small gold line above the headline.' } },
        ...headingFields(true),
        { name: 'intro', type: 'textarea' },
        buttonsField('heroButtons', 'Buttons'),
      ],
    },
    {
      type: 'collapsible',
      label: 'Portrait',
      fields: [
        { name: 'portraitImage', label: 'Photo', type: 'upload', relationTo: 'media', required: true },
        overlineField('portraitCaption', 'Gold strip across the bottom of the photo. Stars are added automatically.'),
        { name: 'portraitOverline', type: 'text', admin: { description: 'Small gold line above the heading.' } },
        { name: 'portraitHeading', type: 'text', required: true },
        { name: 'portraitBody', type: 'textarea' },
        ...linkFields('portraitLink', 'Underlined link text, e.g. "Read His Record". The arrow is added automatically.'),
      ],
    },
    {
      type: 'collapsible',
      label: 'Featured event',
      admin: { description: 'Hidden when no event is chosen, or the event is not published.' },
      fields: [
        overlineField('eventsOverline'),
        { name: 'eventsHeading', type: 'text' },
        {
          name: 'featuredEvent',
          type: 'relationship',
          relationTo: 'events',
          admin: { description: 'Shows the event’s small gold line, title and subtitle from its Events list card.' },
        },
        { name: 'featuredEventCtaLabel', type: 'text', defaultValue: 'View Details', admin: { description: 'The arrow is added automatically.' } },
      ],
    },
    {
      type: 'collapsible',
      label: 'Ways to help',
      fields: [
        overlineField('pillarsOverline'),
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
      ],
    },
    {
      type: 'collapsible',
      label: 'Quote',
      fields: [
        {
          name: 'quote',
          type: 'text',
          admin: { description: 'Shown in italics. Wrap words in **double stars** to show them upright.' },
        },
        { name: 'quoteAttribution', type: 'text' },
      ],
    },
    {
      type: 'collapsible',
      label: 'Photo gallery',
      fields: [
        overlineField('galleryOverline'),
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
      ],
    },
    {
      type: 'collapsible',
      label: 'Volunteer',
      fields: [
        overlineField('volunteerOverline'),
        { name: 'volunteerHeading', type: 'text', required: true },
        { name: 'volunteerBody', type: 'textarea', admin: { description: HIGHLIGHT_HINT } },
        linesField('volunteerTasks', 'Starred list'),
        overlineField('volunteerFormOverline', 'Small gold line above the form title. Stars are added automatically.'),
        { name: 'volunteerFormHeading', type: 'text', required: true },
      ],
    },
    {
      type: 'collapsible',
      label: 'Email updates',
      admin: { description: 'Facebook/Instagram links come from Site Settings → Footer.' },
      fields: [
        overlineField('updatesOverline'),
        { name: 'updatesHeading', type: 'text', required: true },
        { name: 'updatesBody', type: 'textarea' },
      ],
    },
  ],
});
