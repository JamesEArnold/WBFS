/**
 * Form tab names, shared by the CMS forms and the site's click-to-edit
 * markers (lib/cms/editable.ts), so clicking a part of the live preview can
 * open the right tab. Kept free of imports so the public site can use it.
 */
export const TAB = {
  top: 'Top of page',
  extraSections: 'Add more sections',
  // Home
  portrait: 'Portrait',
  featuredEvent: 'Featured event',
  waysToHelp: 'Ways to help',
  quote: 'Quote',
  gallery: 'Photo gallery',
  volunteer: 'Volunteer',
  updates: 'Email updates',
  // About
  origins: 'Origins',
  serviceRecord: 'Service record',
  signOff: 'Sign-off',
  // Donate
  donationForm: 'Donation form',
  mailIn: 'Mail-in contributions',
  smallPrint: 'Small print',
  // In Office
  yearByYear: 'Year by year',
  closing: 'Closing call to action',
  // Events page
  eventsList: 'Events list',
  noEvents: 'When there are no events',
  // An event
  basics: 'Basics',
  flyer: 'Flyer',
  soldOut: 'Sold out',
} as const;
