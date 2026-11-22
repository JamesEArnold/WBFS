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

const seedAbout = async (payload: Payload, log: Seeded) => {
  const heroImage = await seedMedia(
    payload,
    log,
    'asset:/new-may-2026/Sheriff_Weisburn_First_to_Serve_Star1.JPG',
    'new-may-2026/Sheriff_Weisburn_First_to_Serve_Star1.JPG',
    'Sheriff Eric Weisburn beside the Stark County sheriff star',
  );
  const signature = await seedMedia(payload, log, 'asset:/signature.png', 'signature.png', 'Eric Weisburn signature');
  const signOffImage = await seedMedia(
    payload,
    log,
    'asset:/new-may-2026/2025_Greek_Festival.jpg',
    'new-may-2026/2025_Greek_Festival.jpg',
    'Sheriff Weisburn serving at the Stark County Greek Festival',
  );
  await seedPageGlobal(payload, log, 'about', {
    overline: 'On Oath · Service Record',
    heading: 'Meet Sheriff',
    headingAccent: 'Eric Weisburn',
    intro: "Thank you for taking the time to learn more about me and my career with the Stark County Sheriff’s Office. A career built on service to my community — from the firehouse, to the patrol car, to serve as YOUR Sheriff.",
    heroImage,
    heroImageCaption: 'First To Serve — Stark County',
    originsOverline: 'Origins',
    originsBody: "I am a lifetime resident of Stark County. Growing up in a small town, my parents Jack and Maxine instilled upon me at a young age the importance of service to our community. At 16 years old, I started my career of service as a firefighter for the Waynesburg Volunteer Fire Department…eventually rising to the rank of Fire Chief as my father and brother had done before me. I also aided my community as an EMT with Quad ambulance.",
    timelineOverline: 'Career In Service',
    timelineHeading: 'Service Record.',
    timeline: [
      { year: "1991", text: "My career in law enforcement started when I was hired as a Corrections Officer for the Stark County Sheriff’s Office. In that position, I was responsible for the safety and security of the inmates held within the jail. I was often assigned to the mental health wing of the jail, where I saw first-hand the mental health struggles so many inmates deal with and the devastating effects it has on them and our community. I strongly believe early intervention with mental health services is crucial for the betterment of both the inmate and society." },
      { year: "1998", text: "I completed the police officer academy and was assigned to the patrol division. While in this division, I traveled throughout Stark County responding to every type of call imaginable. I had several specialized assignments, including being the first SRO (School Resource Officer) for Plain Local School District, where I served for three years. I was then selected to be the Investigator for child sexual and physical abuse cases, working closely with case workers, prosecutors and other police agencies to successfully arrest and incarcerate the monsters who abuse children. Our mission was to always bring any resemblance of justice to the victims and families." },
      { year: "2005", text: "I was promoted to Sergeant where I continued to serve the citizens of Stark County as a shift supervisor. I was responsible for the safety of not only the citizens of the county, but for the deputies who served under my command. It was a true honor to supervise professional and dedicated deputies, who worked together to protect and serve the citizens of Stark County." },
      { year: "2007", text: "I was the lead investigator in the missing person case of Jessie Marie Davis, who was in her final month of pregnancy when she was murdered. Her body was taken to another location and her two-year-old son was left at home alone for two days forced to survive on his own. I worked closely with deputies and countless other federal, state and local agencies to find the suspects responsible for the deaths of Jessie and her unborn daughter, Chloe. So many lives were destroyed in this incident and the pain will last forever for those affected. But someone had to go to prison, I had no problem putting him there." },
      { year: "2016", text: "I was promoted to Lieutenant and was transferred to the corrections division and served as an Assistant Jail Commander. I was involved in all aspects of jail management and the daily operations of the correction division. Furthermore, in this position I ensured the Sheriff’s Office was compliant with the minimum jail standards for Ohio set by the Department of Rehabilitation and Corrections, along with local fire and health codes." },
      { year: "2022", text: "After a rewarding 31 years, I retired from the Stark County Sheriff’s Office." },
      { year: "2024", text: "Team Weisburn for Sheriff worked tirelessly all summer to share Eric Weisburn’s vision and why he was the right choice for Sheriff. From parades and festivals to community events, we connected with voters across Stark County. On November 5th, the people spoke — choosing Eric Weisburn to lead the Sheriff’s Office in a new direction." },
      { year: "Currently", text: "Sheriff Eric Weisburn began his term January 6, 2025. Sheriff Weisburn is honored to serve as **YOUR** Sheriff of Stark County. Thank you for your trust and support. We won the election in November 2024, but the fight to keep Stark County safe is far from over. Please consider contributing today to support Weisburn For Sheriff." },
    ],
    signOffGreeting: 'Respectfully,',
    signature,
    signOffName: 'Sheriff Eric Weisburn',
    signOffButtons: [button('Contribute', '/donate'), button('Upcoming Events', '/events', 'secondary')],
    signOffImage,
    signOffImageCaption: 'Serving The Community',
  });
};

const seedHome = async (payload: Payload, log: Seeded) => {
  const media = (file: string, alt: string) => seedMedia(payload, log, `asset:/${file}`, file, alt);
  const portraitImage = await media('post-election/head-shot-with-hat.jpg', 'Sheriff Eric Weisburn');
  // Gallery photos keep their caption as the description, as on the original page.
  const gallery = [
    { image: await media('new-may-2026/Sheriff_Weisburn_High_Fiving_Child.jpg', 'Stark County Parade'), caption: 'Stark County Parade', focus: 'upper' },
    { image: await media('honor-guard.jpg', 'Service & Country'), caption: 'Service & Country', focus: 'center' },
    { image: await media('new-may-2026/Sheriff_Weisburn_OVI_Taskforce_trailer.JPG', 'OVI Taskforce'), caption: 'OVI Taskforce', focus: 'center' },
    {
      image: await media('new-may-2026/Operation_Spring_Cleaning.JPG', 'Operation Spring Cleaning'),
      caption: 'Operation Spring Cleaning',
      focus: 'center',
    },
  ];
  const golf = await payload.find({
    collection: 'events',
    where: { importKey: { equals: 'event:golf-2026' } },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  });

  await seedPageGlobal(payload, log, 'home', {
    overline: 'Sworn In · January 6, 2025',
    heading: 'Sheriff',
    headingAccent: 'Eric Weisburn',
    intro: 'With over 30 years of service, Sheriff Weisburn leads from the frontline. Sworn to protect every citizen of Stark County.',
    heroButtons: [button('Contribute', '/donate'), button('Service Record', '/about', 'secondary')],
    portraitImage,
    portraitCaption: 'Eric Weisburn — Sheriff of Stark County',
    portraitOverline: 'On Oath',
    portraitHeading: 'A Sheriff sworn to serve Stark County.',
    portraitBody:
      'From Corrections Officer in 1991 to Sheriff in 2025. With over 30 years on the job — patrol, investigations, command. The fight to keep Stark County safe is far from over.',
    portraitLinkLabel: 'Read His Record',
    portraitLinkUrl: '/about',
    eventsOverline: 'Upcoming Events',
    eventsHeading: 'On The Calendar.',
    featuredEvent: golf.docs[0]?.id ?? null,
    featuredEventCtaLabel: 'View Details',
    pillarsOverline: 'Three Ways To Stand With The Sheriff',
    pillars: [
      {
        title: 'Events',
        body: 'Parades, rallies, and community gatherings across Stark County. Check back here for our latest scheduled appearances.',
        ctaLabel: 'See Calendar',
        ctaUrl: '/events',
      },
      {
        title: 'Volunteer',
        body: 'I need boots on the ground. Stand by my side as we fight for a better Stark County. Yard signs, parades, doors — every action counts.',
        ctaLabel: 'Sign Up',
        ctaUrl: '#volunteer',
      },
      {
        title: 'Contribute',
        body: 'Your donation will make a huge impact. The fight to keep Stark County safe is far from over. Thank you for your support.',
        ctaLabel: 'Donate',
        ctaUrl: '/donate',
      },
    ],
    quote: '“Action starts **now.**”',
    quoteAttribution: 'Sheriff Eric Weisburn',
    galleryOverline: 'In The Community',
    galleryHeading: 'On The Trail.',
    gallery,
    volunteerOverline: 'Boots On The Ground',
    volunteerHeading: 'Join the team.',
    volunteerBody: 'Stand by my side as I fight for a better Stark County. Are **YOU** with me?',
    volunteerTasks: lines(['Walk in parades and rallies', 'Display a yard sign', 'Knock on doors', 'Make calls to fellow voters']),
    volunteerFormOverline: 'Enlist Here',
    volunteerFormHeading: 'Volunteer Sign-Up',
    updatesOverline: 'Stay Updated',
    updatesHeading: 'Join the effort.',
    updatesBody: 'News from the campaign, delivered straight to your inbox.',
  });
};

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
  await seedAbout(payload, log);
  await seedGolfEvent(payload, log);
  // After the golf event: the home page features it.
  await seedHome(payload, log);
  return log;
}
