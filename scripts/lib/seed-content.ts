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
import { fileURLToPath } from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const context = { disableInvalidate: true };

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
    context,
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
    context,
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
    context,
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
    context,
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
  await seedGolfEvent(payload, log);
  return log;
}
