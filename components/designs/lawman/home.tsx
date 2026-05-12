'use client';

import Image from 'next/image';
import Link from 'next/link';
import { EmailSignupForm } from '@/components/ui/email-signup';
import { VolunteerSignupForm } from '@/components/ui/volunteer-signup';
import { LAWMAN } from './theme';
import { WeisburnStar } from '../weisburn-star';

const { BLACK, NEAR_BLACK, COAL, COAL_LIFT, GOLD, GOLD_BRIGHT, CREAM, BODY } = LAWMAN;

const SheriffBadge = ({ size = 200 }: { size?: number }) => (
  <WeisburnStar
    size={size}
    goldDeep={GOLD}
    goldBright={GOLD_BRIGHT}
    goldShadow="#7a5818"
    cream={CREAM}
    ink={BLACK}
    outline="#1a1208"
  />
);

const Hero = () => (
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
            Sworn In · January 6, 2025
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
          Sheriff
          <span
            className="block"
            style={{
              color: GOLD_BRIGHT,
              WebkitTextStroke: `1px ${GOLD}`,
            }}
          >
            Eric Weisburn
          </span>
        </h1>
        <p
          className="max-w-xl mt-6 text-base leading-[1.7] md:text-lg"
          style={{ color: BODY }}
        >
          Thirty-one years of service. A Sheriff's Office led from the frontline. Sworn to protect every citizen of Stark County.
        </p>
        <div className="flex flex-col items-center gap-3 mt-8 sm:flex-row md:justify-start">
          <Link
            href="/donate"
            className="px-7 py-4 text-xs font-bold tracking-[0.3em] uppercase"
            style={{ background: GOLD, color: BLACK, boxShadow: `0 4px 0 ${COAL_LIFT}` }}
          >
            Contribute
          </Link>
          <Link
            href="/about"
            className="px-7 py-4 text-xs font-bold tracking-[0.3em] uppercase border-2"
            style={{ borderColor: GOLD, color: GOLD_BRIGHT }}
          >
            Service Record
          </Link>
        </div>
      </div>
      <div className="relative md:col-span-5">
        <div className="relative mx-auto" style={{ width: 'min(100%, 360px)' }}>
          <SheriffBadge size={360} />
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

const PortraitBlock = () => (
  <section className="relative overflow-hidden" style={{ background: NEAR_BLACK }}>
    <div className="grid max-w-6xl gap-10 px-5 py-20 mx-auto md:grid-cols-12">
      <div className="relative md:col-span-7">
        <div className="relative" style={{ border: `4px solid ${GOLD}` }}>
          <Image
            src="/post-election/head-shot-with-hat.jpg"
            alt="Sheriff Eric Weisburn"
            width={1200}
            height={1500}
            sizes="(max-width: 768px) 100vw, 700px"
            className="w-full h-[28rem] md:h-[32rem] object-cover object-top"
            style={{ filter: 'contrast(1.05) brightness(0.95)' }}
            priority
          />
          <div
            className="absolute bottom-0 left-0 right-0 px-5 py-3 text-[11px] font-bold tracking-[0.35em] uppercase"
            style={{ background: 'rgba(10,10,10,0.85)', color: GOLD_BRIGHT, borderTop: `1px solid ${GOLD}` }}
          >
            ★ Eric Weisburn — Sheriff of Stark County ★
          </div>
        </div>
      </div>
      <div className="md:col-span-5 md:py-6">
        <p className="text-[11px] font-bold tracking-[0.4em] uppercase" style={{ color: GOLD_BRIGHT }}>
          On Oath
        </p>
        <h2
          className="mt-3 font-serif font-black"
          style={{
            color: CREAM,
            fontSize: 'clamp(2rem, 5vw, 3.25rem)',
            lineHeight: 1,
          }}
        >
          A Sheriff sworn to serve Stark County.
        </h2>
        <p className="mt-5 text-base leading-relaxed" style={{ color: BODY }}>
          From Corrections Officer in 1991 to Sheriff in 2025. Thirty-one years on the job — patrol, investigations, command. The fight to keep Stark County safe is far from over.
        </p>
        <Link
          href="/about"
          className="inline-flex items-center gap-3 mt-7 text-xs font-bold tracking-[0.3em] uppercase"
          style={{ color: GOLD_BRIGHT, borderBottom: `2px solid ${GOLD}`, paddingBottom: 4 }}
        >
          Read His Record &rarr;
        </Link>
      </div>
    </div>
  </section>
);

const GolfBanner = () => (
  <Link
    href="/events/golf-fundraiser-3"
    className="block transition-colors group"
  >
    <section className="px-5 py-12" style={{ background: BLACK }}>
      <div
        className="flex flex-col items-start justify-between max-w-6xl gap-5 px-6 py-7 mx-auto md:flex-row md:items-center"
        style={{
          background: COAL,
          borderTop: `2px solid ${GOLD}`,
          borderBottom: `2px solid ${GOLD}`,
        }}
      >
        <div className="flex items-center gap-4">
          <SheriffBadge size={56} />
          <div>
            <p className="text-[10px] font-bold tracking-[0.4em] uppercase" style={{ color: GOLD_BRIGHT }}>
              Save The Date
            </p>
            <h3
              className="mt-1 font-serif text-2xl font-bold md:text-3xl"
              style={{ color: CREAM }}
            >
              Annual Golf Fundraiser
            </h3>
            <p className="text-sm" style={{ color: BODY }}>Friday, September 18th</p>
          </div>
        </div>
        <span
          className="inline-flex items-center gap-3 text-xs font-bold tracking-[0.3em] uppercase group-hover:gap-4 transition-all"
          style={{ color: GOLD_BRIGHT }}
        >
          View Details &rarr;
        </span>
      </div>
    </section>
  </Link>
);

const Pillars = () => {
  const items = [
    {
      title: 'Events',
      body:
        'Parades, rallies, and community gatherings across Stark County. Check back here for our latest scheduled appearances.',
      cta: 'See Calendar',
      href: '/events',
    },
    {
      title: 'Volunteer',
      body:
        "I need boots on the ground. Stand by my side as we fight for a better Stark County. Yard signs, parades, doors — every action counts.",
      cta: 'Sign Up',
      href: '#volunteer',
    },
    {
      title: 'Contribute',
      body:
        'Your donation will make a huge impact. The fight to keep Stark County safe is far from over. Thank you for your support.',
      cta: 'Donate',
      href: '/donate',
    },
  ];

  return (
    <section className="px-5 py-24" style={{ background: BLACK }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center">
          <p className="text-[11px] font-bold tracking-[0.4em] uppercase" style={{ color: GOLD_BRIGHT }}>
            ★ Three Ways To Stand With The Sheriff ★
          </p>
          <h2
            className="mt-3 font-serif font-black"
            style={{
              color: CREAM,
              fontSize: 'clamp(2.25rem, 5vw, 3.75rem)',
              lineHeight: 1,
            }}
          >
            Take Your Post.
          </h2>
        </div>
        <div className="grid gap-5 mt-12 md:grid-cols-3">
          {items.map((it) => (
            <Link
              key={it.title}
              href={it.href}
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
              <p className="mt-4 text-sm leading-relaxed" style={{ color: BODY }}>
                {it.body}
              </p>
              <span
                className="inline-flex items-center self-start gap-2 mt-6 text-[11px] font-bold tracking-[0.3em] uppercase group-hover:gap-3 transition-all"
                style={{ color: GOLD_BRIGHT }}
              >
                {it.cta} &rarr;
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

const Quote = () => (
  <section className="px-5 py-20" style={{ background: CREAM }}>
    <div className="max-w-3xl mx-auto text-center">
      <SheriffBadge size={64} />
      <p
        className="mt-6 font-serif font-bold italic"
        style={{
          color: BLACK,
          fontSize: 'clamp(1.75rem, 5vw, 3rem)',
          lineHeight: 1.15,
        }}
      >
        “Action starts <span className="not-italic">now.</span>”
      </p>
      <div className="flex items-center justify-center gap-4 mt-7">
        <span className="block w-12 h-px" style={{ background: BLACK }} />
        <p className="text-[11px] font-bold tracking-[0.4em] uppercase" style={{ color: BLACK }}>
          Sheriff Eric Weisburn
        </p>
        <span className="block w-12 h-px" style={{ background: BLACK }} />
      </div>
    </div>
  </section>
);

const Gallery = () => (
  <section className="px-5 py-24" style={{ background: NEAR_BLACK }}>
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <p className="text-[11px] font-bold tracking-[0.4em] uppercase" style={{ color: GOLD_BRIGHT }}>
          ★ In The Community ★
        </p>
        <h2
          className="mt-3 font-serif font-black"
          style={{
            color: CREAM,
            fontSize: 'clamp(2rem, 4.5vw, 3rem)',
          }}
        >
          On The Trail.
        </h2>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {[
          { src: '/photos/parade-group-2.jpg', cap: 'Stark County Parade' },
          { src: '/flag.jpg', cap: 'Service & Country' },
        ].map((p) => (
          <figure key={p.src} className="relative" style={{ border: `1px solid ${GOLD}` }}>
            <div
              className="relative h-[22rem] overflow-hidden"
              style={{ filter: 'contrast(1.08) brightness(0.95)' }}
            >
              <Image
                src={p.src}
                alt={p.cap}
                fill
                sizes="(max-width: 768px) 100vw, 600px"
                className="object-cover"
              />
            </div>
            <figcaption
              className="absolute bottom-3 left-3 px-3 py-1 text-[10px] font-bold tracking-[0.35em] uppercase"
              style={{ background: 'rgba(10,10,10,0.9)', color: GOLD_BRIGHT, borderLeft: `2px solid ${GOLD}` }}
            >
              {p.cap}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  </section>
);

const VolunteerSection = () => (
  <section id="volunteer" className="px-5 py-24" style={{ background: BLACK }}>
    <div className="grid max-w-6xl gap-10 mx-auto md:grid-cols-12">
      <div className="md:col-span-5">
        <p className="text-[11px] font-bold tracking-[0.4em] uppercase" style={{ color: GOLD_BRIGHT }}>
          ★ Boots On The Ground ★
        </p>
        <h2
          className="mt-3 font-serif font-black"
          style={{
            color: CREAM,
            fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
            lineHeight: 1,
          }}
        >
          Join the team.
        </h2>
        <p className="mt-5 text-base leading-relaxed" style={{ color: BODY }}>
          Stand by my side as I fight for a better Stark County. Are{' '}
          <span className="font-semibold" style={{ color: CREAM }}>YOU</span> with me?
        </p>
        <ul className="mt-6 space-y-2 text-sm" style={{ color: CREAM }}>
          {['Walk in parades and rallies', 'Display a yard sign', 'Knock on doors', 'Make calls to fellow voters'].map((x) => (
            <li key={x} className="flex items-start gap-3">
              <span style={{ color: GOLD_BRIGHT }}>★</span> {x}
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
                ★ Enlist Here ★
              </p>
              <h3
                className="mt-2 font-serif text-2xl font-black uppercase md:text-3xl"
                style={{ color: BLACK, letterSpacing: '0.04em' }}
              >
                Volunteer Sign-Up
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

const GetInvolved = () => (
  <section className="relative px-5 py-24 overflow-hidden" style={{ background: NEAR_BLACK }}>
    <div
      aria-hidden
      className="absolute inset-0"
      style={{
        backgroundImage: `radial-gradient(circle at 50% 50%, rgba(200,155,60,0.08) 0%, transparent 60%)`,
      }}
    />
    <div className="relative max-w-2xl mx-auto text-center">
      <SheriffBadge size={80} />
      <p className="mt-4 text-[11px] font-bold tracking-[0.4em] uppercase" style={{ color: GOLD_BRIGHT }}>
        ★ Stay Updated ★
      </p>
      <h2
        className="mt-3 font-serif font-black"
        style={{
          color: CREAM,
          fontSize: 'clamp(2.25rem, 5vw, 3.75rem)',
          lineHeight: 1,
        }}
      >
        Join the effort.
      </h2>
      <p className="mt-4" style={{ color: BODY }}>
        News from the campaign, delivered straight to your inbox.
      </p>
      <div className="mt-8">
        <EmailSignupForm />
      </div>
      <div className="flex justify-center gap-3 mt-8">
        <a
          href="https://www.facebook.com/profile.php?id=61552050077933"
          aria-label="Facebook"
          className="flex items-center justify-center w-11 h-11 rounded-full transition-colors hover:opacity-90"
          style={{ background: GOLD_BRIGHT }}
        >
          <Image src="/icon-facebook.svg" width={26} height={26} alt="Facebook" />
        </a>
        <a
          href="https://instagram.com/weisburnforsheriff"
          aria-label="Instagram"
          className="flex items-center justify-center w-11 h-11 rounded-full transition-colors hover:opacity-90"
          style={{ background: GOLD_BRIGHT }}
        >
          <Image src="/icon-instagram.svg" width={24} height={24} alt="Instagram" />
        </a>
      </div>
    </div>
  </section>
);

export const LawmanHome = () => (
  <main style={{ background: BLACK, color: CREAM }}>
    <Hero />
    <PortraitBlock />
    <GolfBanner />
    <Pillars />
    <Quote />
    <Gallery />
    <VolunteerSection />
    <GetInvolved />
  </main>
);
