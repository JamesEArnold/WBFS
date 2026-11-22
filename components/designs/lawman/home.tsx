import Image from 'next/image';
import { RenderBlocks } from '@/components/blocks/render-blocks';
import Link from 'next/link';
import { CmsButton } from '@/components/ui/cms-button';
import { EmailSignupForm } from '@/components/ui/email-signup';
import { Highlighted } from '@/components/ui/highlighted';
import { VolunteerSignupForm } from '@/components/ui/volunteer-signup';
import { asMedia } from '@/lib/cms/content';
import type { Event, Home } from '@/payload-types';
import { LAWMAN } from './theme';

type Props = { page: Home };

const { BLACK, NEAR_BLACK, COAL, COAL_LIFT, GOLD, GOLD_BRIGHT, CREAM, BODY } = LAWMAN;

const SheriffBadge = ({ size = 200, priority = false }: { size?: number; priority?: boolean }) => (
  <Image
    src="/SheriffStar.PNG"
    alt="Sheriff Eric Weisburn campaign badge"
    width={size}
    height={size}
    priority={priority}
    className="block mx-auto"
    style={{ width: size, height: 'auto' }}
  />
);

const Hero = ({ page }: Props) => (
  <section className="relative overflow-hidden" style={{ background: BLACK }}>
    <div
      aria-hidden
      className="absolute inset-0"
      style={{
        backgroundImage: `radial-gradient(circle at 50% 30%, rgba(200,155,60,0.18) 0%, transparent 55%)`,
      }}
    />
    <div className="relative grid items-center max-w-6xl gap-10 px-5 pt-14 pb-20 mx-auto md:grid-cols-12 md:pt-20">
      <div className="text-center md:col-span-7 md:text-left">
        <div className="flex items-center justify-center gap-3 md:justify-start">
          <span className="block w-10 h-px" style={{ background: GOLD_BRIGHT }} />
          <p className="text-[11px] font-bold tracking-[0.4em] uppercase" style={{ color: GOLD_BRIGHT }}>
            {page.overline}
          </p>
          <span className="block w-10 h-px md:hidden" style={{ background: GOLD_BRIGHT }} />
        </div>
        <h1
          className="mt-6 font-serif font-black uppercase"
          style={{
            color: CREAM,
            fontSize: 'clamp(3rem, 8.5vw, 6rem)',
            lineHeight: 0.92,
            letterSpacing: '0.01em',
          }}
        >
          {page.heading}
          {page.headingAccent && (
            <span
              className="block"
              style={{
                color: GOLD_BRIGHT,
                WebkitTextStroke: `1px ${GOLD}`,
              }}
            >
              {page.headingAccent}
            </span>
          )}
        </h1>
        {page.intro && (
          <p
            className="max-w-xl mt-6 text-base leading-[1.7] md:text-lg"
            style={{ color: BODY }}
          >
            {page.intro}
          </p>
        )}
        <div className="flex flex-col items-center gap-3 mt-8 sm:flex-row md:justify-start">
          {(page.heroButtons ?? []).map((button, i) => (
            <CmsButton key={button.id ?? i} button={button} size="raised" />
          ))}
        </div>
      </div>
      <div className="relative md:col-span-5">
        <div className="relative mx-auto" style={{ width: 'min(100%, 360px)' }}>
          <SheriffBadge size={360} priority />
        </div>
      </div>
    </div>
    <div
      aria-hidden
      className="h-1"
      style={{ background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)` }}
    />
  </section>
);

const PortraitBlock = ({ page }: Props) => {
  const photo = asMedia(page.portraitImage);
  return (
  <section className="relative overflow-hidden" style={{ background: NEAR_BLACK }}>
    <div className="grid max-w-6xl gap-10 px-5 py-20 mx-auto md:grid-cols-12">
      <div className="relative md:col-span-7">
        <div className="relative" style={{ border: `4px solid ${GOLD}` }}>
          {photo?.url && (
          <Image
            src={photo.url}
            alt={photo.alt}
            width={1200}
            height={1500}
            sizes="(max-width: 768px) 100vw, 700px"
            className="w-full h-[28rem] md:h-[32rem] object-cover object-top"
            style={{ filter: 'contrast(1.05) brightness(0.95)' }}
            priority
          />
          )}
          {page.portraitCaption && (
          <div
            className="absolute bottom-0 left-0 right-0 px-5 py-3 text-[11px] font-bold tracking-[0.35em] uppercase"
            style={{ background: 'rgba(10,10,10,0.85)', color: GOLD_BRIGHT, borderTop: `1px solid ${GOLD}` }}
          >
            ★ {page.portraitCaption} ★
          </div>
          )}
        </div>
      </div>
      <div className="md:col-span-5 md:py-6">
        <p className="text-[11px] font-bold tracking-[0.4em] uppercase" style={{ color: GOLD_BRIGHT }}>
          {page.portraitOverline}
        </p>
        <h2
          className="mt-3 font-serif font-black"
          style={{
            color: CREAM,
            fontSize: 'clamp(2rem, 5vw, 3.25rem)',
            lineHeight: 1,
          }}
        >
          {page.portraitHeading}
        </h2>
        {page.portraitBody && (
          <p className="mt-5 text-base leading-relaxed" style={{ color: BODY }}>
            {page.portraitBody}
          </p>
        )}
        {page.portraitLinkLabel && page.portraitLinkUrl && (
        <Link
          href={page.portraitLinkUrl}
          className="inline-flex items-center gap-3 mt-7 text-xs font-bold tracking-[0.3em] uppercase"
          style={{ color: GOLD_BRIGHT, borderBottom: `2px solid ${GOLD}`, paddingBottom: 4 }}
        >
          {page.portraitLinkLabel} &rarr;
        </Link>
        )}
      </div>
    </div>
  </section>
  );
};

/** The featured event, when one is chosen and it is published and not hidden. */
function featuredEvent(page: Home): Event | null {
  const event = page.featuredEvent;
  if (!event || typeof event !== 'object') return null;
  return event._status === 'published' && event.status !== 'hidden' ? event : null;
}

const FeaturedEvent = ({ page, event }: Props & { event: Event }) => (
  <section className="px-5 py-20" style={{ background: BLACK }}>
    <div className="max-w-6xl mx-auto">
      <div className="text-center">
        <p
          className="text-[11px] font-bold tracking-[0.4em] uppercase"
          style={{ color: GOLD_BRIGHT }}
        >
          ★ {page.eventsOverline} ★
        </p>
        <h2
          className="mt-3 font-serif font-black"
          style={{
            color: CREAM,
            fontSize: 'clamp(2.25rem, 5vw, 3.75rem)',
            lineHeight: 1,
          }}
        >
          {page.eventsHeading}
        </h2>
        <div
          aria-hidden
          className="w-16 mx-auto mt-5"
          style={{ borderTop: `2px solid ${GOLD}` }}
        />
      </div>
      <Link
        href={`/events/${event.slug}`}
        className="block mt-12 transition-colors group"
      >
        <div
          className="flex flex-col items-start justify-between gap-5 px-6 py-7 md:flex-row md:items-center md:px-10 md:py-8"
          style={{
            background: COAL,
            borderTop: `2px solid ${GOLD}`,
            borderBottom: `2px solid ${GOLD}`,
          }}
        >
          <div className="flex items-center gap-5">
            <SheriffBadge size={64} />
            <div>
              <p className="text-[10px] font-bold tracking-[0.4em] uppercase" style={{ color: GOLD_BRIGHT }}>
                {event.overline}
              </p>
              <h3
                className="mt-1 font-serif text-2xl font-bold md:text-3xl"
                style={{ color: CREAM }}
              >
                {event.title}
              </h3>
              <p className="text-sm" style={{ color: BODY }}>{event.subtitle}</p>
            </div>
          </div>
          <span
            className="inline-flex items-center gap-3 text-xs font-bold tracking-[0.3em] uppercase group-hover:gap-4 transition-all"
            style={{ color: GOLD_BRIGHT }}
          >
            {page.featuredEventCtaLabel} &rarr;
          </span>
        </div>
      </Link>
    </div>
  </section>
);

const Pillars = ({ page }: Props) => {
  return (
    <section className="px-5 py-24" style={{ background: BLACK }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center">
          <p className="text-[11px] font-bold tracking-[0.4em] uppercase" style={{ color: GOLD_BRIGHT }}>
            ★ {page.pillarsOverline} ★
          </p>
        </div>
        <div className="grid gap-5 mt-12 md:grid-cols-3">
          {(page.pillars ?? []).map((it, i) => (
            <Link
              key={it.id ?? i}
              href={it.ctaUrl ?? '#'}
              className="relative flex flex-col p-7 transition-colors group"
              style={{
                background: COAL,
                border: `1px solid ${COAL_LIFT}`,
                borderTop: `3px solid ${GOLD}`,
              }}
            >
              <span
                className="absolute -top-px left-0 w-12 h-[3px]"
                style={{ background: GOLD_BRIGHT }}
                aria-hidden
              />
              <h3
                className="font-serif text-2xl font-bold uppercase tracking-wide"
                style={{ color: CREAM }}
              >
                {it.title}
              </h3>
              {it.body && (
                <p className="mt-4 text-sm leading-relaxed" style={{ color: BODY }}>
                  {it.body}
                </p>
              )}
              <span
                className="inline-flex items-center self-start gap-2 mt-6 text-[11px] font-bold tracking-[0.3em] uppercase group-hover:gap-3 transition-all"
                style={{ color: GOLD_BRIGHT }}
              >
                {it.ctaLabel} &rarr;
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

const Quote = ({ page }: Props) => (
  <section className="px-5 py-20" style={{ background: CREAM }}>
    <div className="max-w-3xl mx-auto text-center">
      <p
        className="font-serif font-bold italic"
        style={{
          color: BLACK,
          fontSize: 'clamp(1.75rem, 5vw, 3rem)',
          lineHeight: 1.15,
        }}
      >
        <Highlighted text={page.quote ?? ''} className="not-italic" />
      </p>
      <div className="flex items-center justify-center gap-4 mt-7">
        <span className="block w-12 h-px" style={{ background: BLACK }} />
        <p className="text-[11px] font-bold tracking-[0.4em] uppercase" style={{ color: BLACK }}>
          {page.quoteAttribution}
        </p>
        <span className="block w-12 h-px" style={{ background: BLACK }} />
      </div>
      <div className="mt-10">
        <SheriffBadge size={160} />
      </div>
    </div>
  </section>
);

/** Crop focus options (literal class names so Tailwind keeps them). */
const FOCUS: Record<string, string> = {
  center: 'object-center',
  upper: 'object-center md:object-[center_38%]',
};

const Gallery = ({ page }: Props) => (
  <section className="px-5 py-24" style={{ background: NEAR_BLACK }}>
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <p className="text-[11px] font-bold tracking-[0.4em] uppercase" style={{ color: GOLD_BRIGHT }}>
          ★ {page.galleryOverline} ★
        </p>
        <h2
          className="mt-3 font-serif font-black"
          style={{
            color: CREAM,
            fontSize: 'clamp(2rem, 4.5vw, 3rem)',
          }}
        >
          {page.galleryHeading}
        </h2>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {(page.gallery ?? []).map((item, i) => {
          const photo = asMedia(item.image);
          if (!photo?.url) return null;
          const p = { src: photo.url, alt: photo.alt, cap: item.caption, cls: FOCUS[item.focus ?? 'center'] ?? FOCUS.center };
          return (
          <figure key={item.id ?? i} className="relative" style={{ border: `1px solid ${GOLD}` }}>
            <div
              className="relative h-[22rem] overflow-hidden"
              style={{ filter: 'contrast(1.08) brightness(0.95)' }}
            >
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes="(max-width: 768px) 100vw, 600px"
                className={`object-cover ${p.cls}`}
              />
            </div>
            <figcaption
              className="absolute bottom-3 left-3 px-3 py-1 text-[10px] font-bold tracking-[0.35em] uppercase"
              style={{ background: 'rgba(10,10,10,0.9)', color: GOLD_BRIGHT, borderLeft: `2px solid ${GOLD}` }}
            >
              {p.cap}
            </figcaption>
          </figure>
          );
        })}
      </div>
    </div>
  </section>
);

const VolunteerSection = ({ page }: Props) => (
  <section id="volunteer" className="px-5 py-24" style={{ background: BLACK }}>
    <div className="grid max-w-6xl gap-10 mx-auto md:grid-cols-12">
      <div className="md:col-span-5">
        <p className="text-[11px] font-bold tracking-[0.4em] uppercase" style={{ color: GOLD_BRIGHT }}>
          ★ {page.volunteerOverline} ★
        </p>
        <h2
          className="mt-3 font-serif font-black"
          style={{
            color: CREAM,
            fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
            lineHeight: 1,
          }}
        >
          {page.volunteerHeading}
        </h2>
        {page.volunteerBody && (
          <p className="mt-5 text-base leading-relaxed" style={{ color: BODY }}>
            <Highlighted text={page.volunteerBody} className="font-semibold" style={{ color: CREAM }} />
          </p>
        )}
        <ul className="mt-6 space-y-2 text-sm" style={{ color: CREAM }}>
          {(page.volunteerTasks ?? []).map((x, i) => (
            <li key={x.id ?? i} className="flex items-start gap-3">
              <span style={{ color: GOLD_BRIGHT }}>★</span> {x.text}
            </li>
          ))}
        </ul>
      </div>
      <div className="md:col-span-7">
        <div
          className="relative p-3 md:p-4"
          style={{
            background: CREAM,
            color: BLACK,
            borderTop: `4px solid ${GOLD}`,
            backgroundImage: `radial-gradient(circle at 100% 0%, rgba(200,155,60,0.18) 0%, transparent 45%)`,
          }}
        >
          <div
            className="relative px-5 py-7 md:px-8 md:py-9"
            style={{ border: `1px solid ${GOLD}` }}
          >
            <div className="mb-6 text-center">
              <p
                className="text-[10px] font-bold tracking-[0.4em] uppercase"
                style={{ color: GOLD }}
              >
                ★ {page.volunteerFormOverline} ★
              </p>
              <h3
                className="mt-2 font-serif text-2xl font-black uppercase md:text-3xl"
                style={{ color: BLACK, letterSpacing: '0.04em' }}
              >
                {page.volunteerFormHeading}
              </h3>
              <div
                aria-hidden
                className="w-16 mx-auto mt-3"
                style={{ borderTop: `2px solid ${GOLD}` }}
              />
            </div>
            <VolunteerSignupForm />
          </div>
        </div>
      </div>
    </div>
  </section>
);

type Social = { facebookUrl?: string | null; instagramUrl?: string | null };

const GetInvolved = ({ page, social }: Props & { social: Social }) => (
  <section className="relative px-5 py-24 overflow-hidden" style={{ background: NEAR_BLACK }}>
    <div
      aria-hidden
      className="absolute inset-0"
      style={{
        backgroundImage: `radial-gradient(circle at 50% 50%, rgba(200,155,60,0.08) 0%, transparent 60%)`,
      }}
    />
    <div className="relative max-w-2xl mx-auto text-center">
      <SheriffBadge size={140} />
      <p className="mt-4 text-[11px] font-bold tracking-[0.4em] uppercase" style={{ color: GOLD_BRIGHT }}>
        ★ {page.updatesOverline} ★
      </p>
      <h2
        className="mt-3 font-serif font-black"
        style={{
          color: CREAM,
          fontSize: 'clamp(2.25rem, 5vw, 3.75rem)',
          lineHeight: 1,
        }}
      >
        {page.updatesHeading}
      </h2>
      {page.updatesBody && (
        <p className="mt-4" style={{ color: BODY }}>
          {page.updatesBody}
        </p>
      )}
      <div className="mt-8">
        <EmailSignupForm />
      </div>
      <div className="flex justify-center gap-3 mt-8">
        {social.facebookUrl && (
        <a
          href={social.facebookUrl}
          aria-label="Facebook"
          className="flex items-center justify-center w-11 h-11 rounded-full transition-colors hover:opacity-90"
          style={{ background: GOLD_BRIGHT }}
        >
          <Image src="/icon-facebook.svg" width={26} height={26} alt="Facebook" />
        </a>
        )}
        {social.instagramUrl && (
        <a
          href={social.instagramUrl}
          aria-label="Instagram"
          className="flex items-center justify-center w-11 h-11 rounded-full transition-colors hover:opacity-90"
          style={{ background: GOLD_BRIGHT }}
        >
          <Image src="/icon-instagram.svg" width={24} height={24} alt="Instagram" />
        </a>
        )}
      </div>
    </div>
  </section>
);

export const LawmanHome = ({ page, social }: Props & { social: Social }) => {
  const event = featuredEvent(page);
  return (
    <main style={{ background: BLACK, color: CREAM }}>
      <Hero page={page} />
      <PortraitBlock page={page} />
      {event && <FeaturedEvent page={page} event={event} />}
      <Pillars page={page} />
      <Quote page={page} />
      <Gallery page={page} />
      <VolunteerSection page={page} />
      <GetInvolved page={page} social={social} />
      <RenderBlocks blocks={page.extraSections} />
    </main>
  );
};
