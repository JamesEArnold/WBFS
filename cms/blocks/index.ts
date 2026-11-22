import type { Block, Field, UploadField } from 'payload';
import { buttonsField, headingFields } from '../fields/link';
import { validateEmbedUrl } from '../fields/validators';

/**
 * Design-locked section blocks. Editors choose content and a few Lawman style
 * options; layout, fonts and colours come from the site design.
 * Renderers: components/blocks/render-blocks.tsx.
 */

const HIGHLIGHT_HINT = 'Wrap words in **double stars** to highlight them.';

const overline: Field = {
  name: 'overline',
  type: 'text',
  admin: { description: 'Small gold line. Stars are added automatically.' },
};

const background: Field = {
  name: 'background',
  type: 'select',
  defaultValue: 'black',
  options: [
    { label: 'Black', value: 'black' },
    { label: 'Charcoal', value: 'nearBlack' },
  ],
  admin: { description: 'Alternate backgrounds between sections to separate them.' },
};

const image = (name = 'image', required = true): UploadField => ({ name, type: 'upload', relationTo: 'media', required });

export const HeroBanner: Block = {
  slug: 'heroBanner',
  labels: { singular: 'Page heading', plural: 'Page headings' },
  fields: [
    overline,
    ...headingFields(true),
    { name: 'intro', type: 'textarea' },
    { ...image('image', false), admin: { description: 'Optional photo beside the heading.' } },
    { name: 'imageCaption', type: 'text', admin: { description: 'Gold strip across the bottom of the photo.' } },
    buttonsField('buttons', 'Buttons'),
  ],
};

export const RichTextBlock: Block = {
  slug: 'richText',
  labels: { singular: 'Text', plural: 'Text sections' },
  fields: [overline, { name: 'heading', type: 'text' }, { name: 'body', type: 'richText', required: true }, background],
};

export const ImageWithText: Block = {
  slug: 'imageWithText',
  labels: { singular: 'Photo with text', plural: 'Photos with text' },
  fields: [
    image(),
    { name: 'imageCaption', type: 'text', admin: { description: 'Gold strip across the bottom of the photo.' } },
    {
      name: 'imagePosition',
      type: 'radio',
      defaultValue: 'left',
      options: [
        { label: 'Photo on the left', value: 'left' },
        { label: 'Photo on the right', value: 'right' },
      ],
      admin: { layout: 'horizontal' },
    },
    overline,
    { name: 'heading', type: 'text', required: true },
    { name: 'body', type: 'textarea', admin: { description: HIGHLIGHT_HINT } },
    buttonsField('buttons', 'Buttons'),
    background,
  ],
};

export const PhotoGallery: Block = {
  slug: 'photoGallery',
  labels: { singular: 'Photo gallery', plural: 'Photo galleries' },
  fields: [
    overline,
    { name: 'heading', type: 'text' },
    {
      name: 'photos',
      type: 'array',
      minRows: 1,
      fields: [image(), { name: 'caption', type: 'text' }],
    },
    background,
  ],
};

export const FactsList: Block = {
  slug: 'factsList',
  labels: { singular: 'Starred list', plural: 'Starred lists' },
  fields: [
    overline,
    { name: 'heading', type: 'text' },
    { name: 'items', type: 'array', minRows: 1, fields: [{ name: 'text', type: 'text', required: true }] },
    background,
  ],
};

export const CtaButtons: Block = {
  slug: 'ctaButtons',
  labels: { singular: 'Call to action', plural: 'Calls to action' },
  fields: [
    overline,
    { name: 'heading', type: 'text', required: true },
    { name: 'body', type: 'textarea' },
    { ...buttonsField('buttons', 'Buttons'), minRows: 1 },
    background,
  ],
};

export const Timeline: Block = {
  slug: 'timeline',
  labels: { singular: 'Timeline', plural: 'Timelines' },
  fields: [
    overline,
    { name: 'heading', type: 'text' },
    {
      name: 'entries',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'label', type: 'text', required: true, admin: { description: 'e.g. a year: "2025".' } },
        { name: 'text', type: 'textarea', required: true, admin: { description: HIGHLIGHT_HINT } },
      ],
    },
    background,
  ],
};

export const QuoteBand: Block = {
  slug: 'quoteBand',
  labels: { singular: 'Quote', plural: 'Quotes' },
  fields: [
    { name: 'quote', type: 'text', required: true, admin: { description: 'Shown in italics on a cream band.' } },
    { name: 'attribution', type: 'text' },
  ],
};

export const Embed: Block = {
  slug: 'embed',
  labels: { singular: 'Embed (Donorbox, YouTube, Facebook)', plural: 'Embeds' },
  fields: [
    overline,
    { name: 'heading', type: 'text' },
    {
      name: 'url',
      label: 'Embed address',
      type: 'text',
      required: true,
      admin: { description: 'The embed address from Donorbox, YouTube (…/embed/…) or Facebook.' },
      validate: (value: unknown) => validateEmbedUrl(value),
    },
    { name: 'title', type: 'text', required: true, admin: { description: 'Describes the embed for screen readers.' } },
    { name: 'height', type: 'number', defaultValue: 600, min: 200, max: 2000, admin: { description: 'Height in pixels.' } },
    background,
  ],
};

export const SoldOutBanner: Block = {
  slug: 'soldOutBanner',
  labels: { singular: 'Gold notice banner', plural: 'Gold notice banners' },
  fields: [
    { name: 'heading', type: 'text', required: true },
    { name: 'body', type: 'textarea' },
  ],
};

export const SECTION_BLOCKS: Block[] = [
  HeroBanner,
  RichTextBlock,
  ImageWithText,
  PhotoGallery,
  FactsList,
  CtaButtons,
  Timeline,
  QuoteBand,
  Embed,
  SoldOutBanner,
];

/** Where blocks can reference Media, relative to the blocks field (see cms/hooks/mediaRefs.ts). */
export const BLOCK_MEDIA_PATHS = ['image', 'photos.image', 'buttons.file'];

export const sectionsField = (name: string, label: string, description: string): Field => ({
  name,
  label,
  type: 'blocks',
  blocks: SECTION_BLOCKS,
  admin: { description, initCollapsed: false },
});

/** Optional sections added after a page's own content. */
export const extraSectionsField = (): Field =>
  sectionsField('extraSections', 'Extra sections', 'Optional sections added at the bottom of the page, before the footer.');
