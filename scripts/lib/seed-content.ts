/**
 * Insert-only content seed: copies the site's current (previously hardcoded)
 * content into the CMS, verbatim. Anything that already exists — matched by
 * `importKey`, or a global that has been saved before — is skipped, so
 * re-running never overwrites an editor's changes.
 *
 * Run: npm run seed   (runner: scripts/seed.ts, env-guarded)
 */
import path from 'path';
import type { Payload } from 'payload';
import type { PageGlobalSlug } from '../../lib/cms/public';
import { fileURLToPath } from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
/**
 * A fresh context object per operation: Payload's cloud-storage plugin stashes the
 * uploaded file on `req.context` (only if absent), so sharing one object across
 * creates makes later uploads reuse the first file's data and never reach Blob.
 */
const ctx = () => ({ disableInvalidate: true });

type Seeded = { created: string[]; skipped: string[] };

async function seedMedia(payload: Payload, log: Seeded, importKey: string, file: string, alt: string): Promise<number> {
  const existing = await payload.find({
    collection: 'media',
    where: { importKey: { equals: importKey } },
    limit: 1,
    overrideAccess: true,
  });
  if (existing.docs[0]) {
    log.skipped.push(importKey);
    return existing.docs[0].id;
  }
  const doc = await payload.create({
    collection: 'media',
    data: { alt, importKey },
    filePath: path.join(root, 'public', file),
    overrideAccess: true,
    context: ctx(),
  });
  log.created.push(importKey);
  return doc.id;
}

async function seedSiteSettings(payload: Payload, log: Seeded) {
  const current = await payload.findGlobal({ slug: 'siteSettings', overrideAccess: true });
  if (current?.updatedAt) {
    log.skipped.push('global:siteSettings');
    return;
  }
  await payload.updateGlobal({
    slug: 'siteSettings',
    overrideAccess: true,
    context: ctx(),
    data: {
      banner: { enabled: false },
      tagline: 'SWORN TO PROTECT — STARK COUNTY, OHIO',
      nav: [
        { label: 'Home', href: '/' },
        { label: 'About', href: '/about' },
        { label: 'In Office', href: '/time-in-office' },
        { label: 'Events', href: '/events' },
        { label: 'Contribute', href: '/donate' },
      ],
      headerCta: { label: 'Donate', href: '/donate' },
      mobileCta: { label: 'Contribute', href: '/donate' },
      footerBlurb: 'A proven Sheriff. A career in service. Sworn to protect Stark County.',
      hqHeading: 'Headquarters',
      addressLine1: '4849 Tree Line Circle NW',
      addressLine2: 'North Canton, OH 44720',
      contactEmail: 'weisburnforsheriff@gmail.com',
      actionHeading: 'Take Action',
      footerCta: { label: 'Contribute', href: '/donate' },
      facebookUrl: 'https://www.facebook.com/profile.php?id=61552050077933',
      instagramUrl: 'https://instagram.com/weisburnforsheriff',
      disclaimer: 'Paid for by Weisburn for Sheriff',
    },
  });
  log.created.push('global:siteSettings');
}

async function seedEventsPage(payload: Payload, log: Seeded) {
  const current = await payload.findGlobal({ slug: 'eventsPage', draft: true, overrideAccess: true });
  if (current?.updatedAt) {
    log.skipped.push('global:eventsPage');
    return;
  }
  await payload.updateGlobal({
    slug: 'eventsPage',
    overrideAccess: true,
    context: ctx(),
    data: {
      _status: 'published',
      overline: 'Support The Campaign',
      heading: 'Upcoming',
      headingAccent: 'Events',
      intro:
        'Parades, fundraisers, and community gatherings across Stark County. Join the team — every appearance moves the campaign forward.',
      listHeading: 'On The Calendar',
      emptyState: {
        overline: 'Stand By',
        heading: 'More events coming soon',
        body: 'We’re scheduling appearances across Stark County. Check back soon, or sign up for updates from the campaign trail.',
        buttons: [
          { label: 'Contribute', linkType: 'url', url: '/donate', style: 'primary', newTab: false },
          { label: 'Service Record', linkType: 'url', url: '/about', style: 'secondary', newTab: false },
        ],
      },
    },
  });
  log.created.push('global:eventsPage');
}

/** Insert-only: a page global that has never been saved gets its original content, published. */
async function seedPageGlobal(
  payload: Payload,
  log: Seeded,
  slug: PageGlobalSlug,
  data: Record<string, unknown>,
) {
  const current = await payload.findGlobal({ slug, draft: true, overrideAccess: true });
  if (current?.updatedAt) {
    log.skipped.push(`global:${slug}`);
    return;
  }
  await payload.updateGlobal({
    slug,
    overrideAccess: true,
    context: ctx(),
    data: { _status: 'published', ...data } as never,
  });
  log.created.push(`global:${slug}`);
}

const button = (label: string, url: string, style: 'primary' | 'secondary' = 'primary') => ({
  label,
  linkType: 'url' as const,
  url,
  style,
  newTab: false,
});
const lines = (items: string[]) => items.map((text) => ({ text }));

const seedInOffice = (payload: Payload, log: Seeded) =>
  seedPageGlobal(payload, log, 'inOffice', {
    overline: 'On Duty · In The Community',
    heading: 'My Time',
    headingAccent: 'In Office',
    intro: 'A record of events, training, and community engagement since Sheriff Weisburn was sworn in on January 6, 2025.',
    timelineOverline: 'By The Year',
    timelineHeading: 'In Office.',
    outreachHeading: 'Supporting Non-Profit Organizations and Community Outreach',
    years: [
      {
        year: '2026',
        events: lines([
          'Presenter at Ohio Traffic Safety Summit',
          'Hosted Annual Peace Officers Memorial Day Ceremony',
          'Citizens Academy – class graduation',
          'Stark County Motorcycle Ohio Training Site – Collaborative Endeavor with KSU Stark and Motorcycle Ohio',
          'OOCIC Human Trafficking Task Force',
          'Leadership Training at National Sheriffs’ Institute in Quantico, Virginia',
          'Stark County Citizen’s Connect App',
          'National Sheriffs’ Association – Washington, D.C.',
          'Ohio Counterterrorism & Homeland Security Conference',
        ]),
        outreach: lines([
          '“Recovery & Resilience” – Annual Symposium',
          'Red Cross Blood Drive',
          'Eyes Forward Distracted Driving',
          '“Wear Blue” National Child Abuse Prevention Month',
          'Student Sobriety',
          'COMPASS Sexual Assault and Prevention',
          'Seatbelt Safety Awareness',
        ]),
      },
      {
        year: '2025',
        events: lines([
          'Rededication McDonald Garden at Stark County Sheriff’s Office',
          'Buckeye State Sheriffs’ Association – Annual Meeting',
          'Honor Court Graduation',
          'U.S. Marshal Awards – Cleveland',
          'Tour of State House',
          'Stark County Fair',
          'New Jail Groundbreaking Ceremony',
          'Crypto Task Force established',
          'Dog Warden No Kill Award',
          'FBI National Conference',
          'Attorney General Press Conference – Cold Case Solved – Anthony Gulley',
          'Sheriff’s Mounted Division',
          'National Child Safety Campaign',
          'Ohio Attorney General’s Office',
        ]),
        outreach: lines([
          'Hannah House',
          'Greek Hellenic Organization',
          'Patriot Project',
          'Sheriff’s Truck or Treat',
          'Heartland Behavioral Health',
          '48th Annual Victim/Witness Dinner',
          'Keep Seniors Driving',
          'Habitat for Humanity – Sheriff’s Office House Build',
          'Ohio Heros',
          'Legacy of Honor Gala',
          'Greater Stark County Urban League',
          'National Night Out',
          'HOF Events',
          'Italian American Festival Breakfast',
          'Honor Home Food Drive',
          'St. Haralabos Greek Festival',
          'Domestic Violence Project',
          'Veterans Service Commission',
          'Crime Prevention Breakfast',
        ]),
      },
    ],
    ctaOverline: 'The Fight Continues',
    ctaHeading: 'Stand with the Sheriff.',
    ctaBody: 'The fight to keep Stark County safe is far from over. Your support keeps this work moving forward.',
    ctaButtons: [button('Contribute', '/donate'), button('Service Record', '/about', 'secondary')],
  });

const seedDonate = (payload: Payload, log: Seeded) =>
  seedPageGlobal(payload, log, 'donate', {
    overline: 'Fund The Mission',
    heading: 'Contribute to',
    headingAccent: 'Sheriff Weisburn',
    intro: 'Your donation will make a huge impact. The fight to keep Stark County safe is far from over. Thank you for your support.',
    donorboxUrl: 'https://donorbox.org/embed/weisburn-for-sheriff',
    mailOverline: 'Mail-in Contributions',
    mailHeading: 'Prefer to pay by check?',
    mailBody:
      'Checks are accepted. Please make payable to **Weisburn For Sheriff** and mail to the campaign headquarters listed below.',
    mailToLabel: 'Mail To',
    mailToName: 'Weisburn For Sheriff',
    mailToLine1: '4849 Tree Line Circle NW',
    mailToLine2: 'North Canton, OH 44720',
    mailNote: '* Cannot accept corporate checks',
    stats: [
      { value: '31', label: 'Years Service' },
      { value: '01.06.25', label: 'Sworn In' },
      { value: 'Stark Co.', label: 'Sheriff' },
    ],
    disclaimer:
      'Contributions or gifts to Weisburn for Sheriff are not tax deductible. The maximum amount an individual may contribute is governed by Ohio campaign finance law. Federal law prohibits contributions from foreign nationals and from any corporation.',
  });

async function seedGolfEvent(payload: Payload, log: Seeded) {
  const importKey = 'event:golf-2026';
  const existing = await payload.find({
    collection: 'events',
    where: { importKey: { equals: importKey } },
    draft: true,
    limit: 1,
    overrideAccess: true,
  });
  if (existing.docs[0]) {
    log.skipped.push(importKey);
    return;
  }

  const pdf = await seedMedia(
    payload,
    log,
    'asset:/250-SheriffWeisburn_GolfOuting_TriFold.pdf',
    '250-SheriffWeisburn_GolfOuting_TriFold.pdf',
    'Printable Sheriff Weisburn Golf Outing tri-fold flyer (PDF)',
  );
  const outside = await seedMedia(
    payload,
    log,
    'asset:/golf-trifold-outside.jpg',
    'golf-trifold-outside.jpg',
    'Sheriff Weisburn Golf Outing flyer — cover, sponsor thank-you, and registration form',
  );
  const inside = await seedMedia(
    payload,
    log,
    'asset:/golf-trifold-inside.jpg',
    'golf-trifold-inside.jpg',
    'Sheriff Weisburn Golf Outing flyer — sponsorship tiers, $10,000 hole-in-one, and registration form details',
  );

  await payload.create({
    collection: 'events',
    overrideAccess: true,
    context: ctx(),
    data: {
      _status: 'published',
      importKey,
      title: 'Annual Golf Fundraiser',
      slug: 'golf-fundraiser-3',
      status: 'soldOut',
      date: '2026-09-18T12:00:00.000Z',
      overline: 'Save The Date',
      subtitle: 'Friday, September 18, 2026 · Sable Creek Golf Course',
      facts: [
        { text: '9:00 a.m. shotgun start · $500 per team' },
        { text: 'Donuts, lunch & dinner provided' },
        { text: '$10,000 hole-in-one · sponsorships available' },
      ],
      listingCtaLabel: 'View The Flyer',
      soldOutBanner: {
        heading: 'Golf Spots — Sold Out',
        body: "Thank you to everyone who registered — we're excited for a great event. If you didn't secure a golf spot, there are still meaningful ways to support: become an event sponsor, a meal sponsor, or join us for the post-outing meal and silent auction.",
      },
      dateLabel: 'Friday · September 18, 2026',
      heading: 'Annual Golf',
      headingAccent: 'Fundraiser',
      heroBlurb:
        'Sable Creek Golf Course · 9:00 a.m. shotgun start · $500 per team. Sponsorship opportunities, $10,000 hole-in-one, donuts, lunch and dinner provided.',
      buttons: [
        { label: 'View / Print Flyer', linkType: 'file', file: pdf, style: 'primary', newTab: true },
        {
          label: 'Inquire About Sponsorship',
          linkType: 'url',
          url: 'mailto:weisburnforsheriff@gmail.com?subject=2026%20Golf%20Outing%20Sponsorship',
          style: 'secondary',
          newTab: false,
        },
      ],
      flyerPdf: pdf,
      flyerImages: [
        { image: outside, linkLabel: 'Open the printable golf outing flyer PDF — outside' },
        { image: inside, linkLabel: 'Open the printable golf outing flyer PDF — inside' },
      ],
      flyerCaption: 'Tap either page to open the printable PDF',
    },
  });
  log.created.push(importKey);
}

export async function seed(payload: Payload): Promise<Seeded> {
  const log: Seeded = { created: [], skipped: [] };
  await seedSiteSettings(payload, log);
  await seedEventsPage(payload, log);
  await seedInOffice(payload, log);
  await seedDonate(payload, log);
  await seedGolfEvent(payload, log);
  return log;
}
