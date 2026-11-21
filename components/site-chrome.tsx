import type { SiteSetting } from '@/payload-types';
import { LawmanFooter, type LawmanFooterProps } from './designs/lawman/footer';
import { LawmanHeader, type LawmanHeaderProps } from './designs/lawman/header';
import { SiteBanner } from './ui/site-banner';

/**
 * Fallbacks used only if Site Settings can't be read (e.g. database outage),
 * so the site chrome never renders empty. Mirrors the seeded content.
 */
const FALLBACK_HEADER: LawmanHeaderProps = {
  tagline: 'SWORN TO PROTECT — STARK COUNTY, OHIO',
  nav: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'In Office', href: '/time-in-office' },
    { label: 'Events', href: '/events' },
    { label: 'Contribute', href: '/donate' },
  ],
  cta: { label: 'Donate', href: '/donate' },
  mobileCta: { label: 'Contribute', href: '/donate' },
};

const FALLBACK_FOOTER: LawmanFooterProps = {
  blurb: 'A proven Sheriff. A career in service. Sworn to protect Stark County.',
  hqHeading: 'Headquarters',
  addressLines: ['4849 Tree Line Circle NW', 'North Canton, OH 44720'],
  email: 'weisburnforsheriff@gmail.com',
  actionHeading: 'Take Action',
  cta: { label: 'Contribute', href: '/donate' },
  facebookUrl: 'https://www.facebook.com/profile.php?id=61552050077933',
  instagramUrl: 'https://instagram.com/weisburnforsheriff',
  disclaimer: 'Paid for by Weisburn for Sheriff',
};

export function headerProps(settings: SiteSetting | null): LawmanHeaderProps {
  if (!settings) return FALLBACK_HEADER;
  return {
    tagline: settings.tagline,
    nav: (settings.nav ?? []).map(({ label, href }) => ({ label, href: href ?? '/' })),
    cta: { label: settings.headerCta.label, href: settings.headerCta.href ?? '/donate' },
    mobileCta: { label: settings.mobileCta.label, href: settings.mobileCta.href ?? '/donate' },
  };
}

export function footerProps(settings: SiteSetting | null): LawmanFooterProps {
  if (!settings) return FALLBACK_FOOTER;
  return {
    blurb: settings.footerBlurb,
    hqHeading: settings.hqHeading,
    addressLines: [settings.addressLine1, settings.addressLine2].filter((line): line is string => Boolean(line)),
    email: settings.contactEmail,
    actionHeading: settings.actionHeading,
    cta: { label: settings.footerCta.label, href: settings.footerCta.href ?? '/donate' },
    facebookUrl: settings.facebookUrl,
    instagramUrl: settings.instagramUrl,
    disclaimer: settings.disclaimer,
  };
}

export const SiteHeader = ({ settings }: { settings: SiteSetting | null }) => (
  <LawmanHeader {...headerProps(settings)} />
);

export const SiteAnnouncement = ({ settings }: { settings: SiteSetting | null }) => {
  const banner = settings?.banner;
  if (!banner?.enabled || !banner.text) return null;
  return <SiteBanner text={banner.text} linkLabel={banner.linkLabel} linkUrl={banner.linkUrl} />;
};

export const SiteFooter = ({ settings }: { settings: SiteSetting | null }) => (
  <LawmanFooter {...footerProps(settings)} />
);
