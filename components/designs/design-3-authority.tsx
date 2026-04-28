'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { EmailSignupForm } from '@/components/ui/email-signup';
import { VolunteerSignupForm } from '@/components/ui/volunteer-signup';
import { ThemedMobileNav } from './mobile-nav';
import { Logo } from './logo';

const NAVY = '#5a1818';
const NAVY_DEEP = '#3a0e0e';
const GOLD = '#c8a96a';
const GOLD_LIGHT = '#e6d4a3';
const PAPER = '#f7f2e7';
const INK = '#180806';

const Shield = ({ size = 28, color = GOLD }: { size?: number; color?: string }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill={color} aria-hidden>
    <path d="M12 2L4 5v6c0 5 3.4 9.5 8 11 4.6-1.5 8-6 8-11V5l-8-3zm0 4l4.5 1.7v3.6c0 3.5-2.3 6.6-4.5 7.7-2.2-1.1-4.5-4.2-4.5-7.7V7.7L12 6z" />
  </svg>
);

const StarRow = () => (
  <div className="flex items-center justify-center gap-3" aria-hidden>
    {[0, 1, 2, 3, 4].map((i) => (
      <svg key={i} viewBox="0 0 24 24" width="10" height="10" fill={GOLD}>
        <path d="M12 2.5l2.6 6.4 6.9.5-5.3 4.5 1.7 6.7L12 17l-5.9 3.6 1.7-6.7L2.5 9.4l6.9-.5z" />
      </svg>
    ))}
  </div>
);

const Header = () => (
  <header style={{ background: NAVY_DEEP }} className="sticky top-0 z-30">
    <div
      className="text-[10px] font-bold tracking-[0.3em] text-center uppercase"
      style={{ background: '#260808', color: GOLD, padding: '4px 0' }}
    >
      Office of the Sheriff · Stark County, Ohio
    </div>
    <div className="flex items-center justify-between max-w-6xl px-5 py-3 mx-auto">
      <div className="flex items-center gap-3">
        <Shield size={32} />
        <Logo height={44} primary={GOLD_LIGHT} accent={GOLD} />
      </div>
      <nav className="hidden gap-8 text-xs font-bold tracking-[0.25em] uppercase md:flex" style={{ color: GOLD_LIGHT }}>
        <Link href="/" className="hover:text-white">Home</Link>
        <Link href="/about" className="hover:text-white">About</Link>
        <Link href="/events" className="hover:text-white">Events</Link>
        <Link href="/donate" className="hover:text-white">Contribute</Link>
      </nav>
      <div className="flex items-center gap-2">
        <Link
          href="/donate"
          className="hidden px-4 py-2 text-[11px] font-bold tracking-[0.25em] uppercase md:inline-block"
          style={{ background: GOLD, color: NAVY_DEEP }}
        >
          Donate
        </Link>
        <ThemedMobileNav
          items={[
            { href: '/', label: 'Home' },
            { href: '/about', label: 'About' },
            { href: '/events', label: 'Events' },
            { href: '/donate', label: 'Contribute' },
          ]}
          bg={NAVY_DEEP}
          fg={'#ffffff'}
          accent={GOLD}
          ctaBg={GOLD}
          ctaFg={NAVY_DEEP}
          buttonFg={GOLD_LIGHT}
        />
      </div>
    </div>
  </header>
);

const Hero = () => (
  <section className="relative overflow-hidden" style={{ background: NAVY }}>
    <div
      aria-hidden
      className="absolute inset-0 opacity-20"
      style={{
        backgroundImage: `radial-gradient(circle at 80% 20%, ${GOLD} 0%, transparent 40%), radial-gradient(circle at 20% 80%, ${GOLD} 0%, transparent 35%)`,
      }}
    />
    <div className="relative grid items-center max-w-6xl gap-10 px-5 pt-16 pb-20 mx-auto md:grid-cols-12">
      <div className="md:col-span-7">
        <div className="flex items-center gap-3">
          <span className="h-px w-8" style={{ background: GOLD }} />
          <p className="text-[11px] font-bold tracking-[0.4em] uppercase" style={{ color: GOLD }}>
            Sheriff of Stark County
          </p>
        </div>
        <h1
          className="mt-6 font-serif text-white"
          style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', lineHeight: 1, letterSpacing: '-0.01em' }}
        >
          <span className="block font-black">Eric</span>
          <span className="block font-light italic">Weisburn</span>
        </h1>
        <div className="flex items-center gap-3 mt-5">
          <span className="h-px w-12" style={{ background: GOLD }} />
          <p className="text-sm tracking-[0.25em] uppercase" style={{ color: GOLD_LIGHT }}>
            A career in service · 31 years
          </p>
        </div>
        <p className="max-w-xl mt-6 text-base leading-relaxed text-white/85 md:text-lg">
          Sworn to protect and serve. A proven leader committed to the citizens of Stark County. The fight to keep our county safe is far from over.
        </p>
        <div className="flex flex-wrap gap-4 mt-8">
          <Link
            href="/donate"
            className="px-7 py-3 text-xs font-bold tracking-[0.3em] uppercase"
            style={{ background: GOLD, color: NAVY_DEEP }}
          >
            Contribute
          </Link>
          <Link
            href="/about"
            className="px-7 py-3 text-xs font-bold tracking-[0.3em] uppercase border"
            style={{ borderColor: GOLD, color: GOLD }}
          >
            Service Record
          </Link>
        </div>
      </div>
      <div className="relative md:col-span-5">
        <div
          className="absolute -inset-2 rounded-sm"
          aria-hidden
          style={{ border: `1px solid ${GOLD}` }}
        />
        <div className="relative overflow-hidden rounded-sm" style={{ border: `4px solid ${GOLD}` }}>
          <Image
            src="/post-election/head-shot-with-hat.jpg"
            alt="Sheriff Eric Weisburn"
            width={900}
            height={1100}
            sizes="(max-width: 768px) 100vw, 480px"
            className="w-full h-auto"
            priority
          />
          <div
            className="absolute bottom-0 left-0 right-0 px-4 py-3 text-[11px] font-bold tracking-[0.3em] uppercase"
            style={{ background: 'rgba(58,14,14,0.88)', color: GOLD }}
          >
            ★ Sheriff Eric Weisburn ★
          </div>
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

const StatBar = () => (
  <div className="grid grid-cols-3 max-w-6xl gap-px mx-auto" style={{ background: GOLD }}>
    {[
      { k: '31', v: 'Years of Service' },
      { k: '01.06.25', v: 'Sworn In' },
      { k: 'Stark Co.', v: 'Sheriff' },
    ].map((s) => (
      <div
        key={s.v}
        className="px-2 py-5 text-center sm:px-5 sm:py-6"
        style={{ background: NAVY }}
      >
        <p className="font-serif text-lg font-black text-white sm:text-2xl md:text-4xl">{s.k}</p>
        <p className="text-[9px] sm:text-[10px] font-bold tracking-[0.2em] sm:tracking-[0.3em] uppercase mt-1" style={{ color: GOLD }}>
          {s.v}
        </p>
      </div>
    ))}
  </div>
);

const GolfBanner = () => (
  <Link
    href="/events/golf-fundraiser-3"
    className="block transition-transform hover:-translate-y-0.5"
  >
    <section className="px-5 mx-auto max-w-6xl my-12">
      <div
        className="flex flex-col items-center justify-between gap-4 px-6 py-6 md:flex-row"
        style={{ background: PAPER, borderTop: `4px solid ${GOLD}`, borderBottom: `1px solid ${NAVY}` }}
      >
        <div>
          <p className="text-[10px] font-bold tracking-[0.4em] uppercase" style={{ color: NAVY }}>
            Notice · Save The Date
          </p>
          <h3 className="mt-2 font-serif text-2xl font-bold md:text-3xl" style={{ color: NAVY }}>
            Annual Golf Fundraiser — Friday, September 18th
          </h3>
        </div>
        <span
          className="inline-flex items-center gap-3 px-5 py-2 text-[11px] font-bold tracking-[0.3em] uppercase"
          style={{ background: NAVY, color: GOLD }}
        >
          View Details &rarr;
        </span>
      </div>
    </section>
  </Link>
);

const Pillars = () => {
  const tabs = [
    {
      id: 'events',
      label: 'Events',
      title: 'Upcoming Appearances',
      body:
        'Parades, rallies, and community gatherings across Stark County. Check back here for our latest scheduled appearances and how you can attend.',
      cta: 'See full calendar',
      href: '/events',
    },
    {
      id: 'volunteer',
      label: 'Volunteer',
      title: 'Boots On The Ground',
      body:
        'I need boots on the ground. Stand by my side as I fight for a better Stark County. Yard signs, parades, doors. Every action matters.',
      cta: 'Volunteer below',
      href: '#volunteer',
    },
    {
      id: 'contribute',
      label: 'Contribute',
      title: 'Fund The Mission',
      body:
        'Your donation will make a huge impact. The fight to keep Stark County safe is far from over. Thank you for your support.',
      cta: 'Donate now',
      href: '/donate',
    },
  ];
  const [active, setActive] = useState(tabs[0].id);
  const current = tabs.find((t) => t.id === active)!;

  return (
    <section className="px-5 py-24" style={{ background: PAPER }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center">
          <StarRow />
          <p className="mt-3 text-[11px] font-bold tracking-[0.4em] uppercase" style={{ color: NAVY }}>
            Three Ways To Support The Mission
          </p>
          <h2
            className="mt-3 font-serif font-black"
            style={{ color: NAVY, fontSize: 'clamp(2.25rem, 5vw, 3.75rem)', lineHeight: 1 }}
          >
            Stand With The Sheriff
          </h2>
        </div>
        <div className="flex flex-wrap justify-center gap-2 mt-12">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className="px-6 py-3 text-xs font-bold tracking-[0.3em] uppercase transition-colors"
              style={{
                background: active === t.id ? NAVY : 'transparent',
                color: active === t.id ? GOLD : NAVY,
                border: `1px solid ${NAVY}`,
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div
          className="mt-8 p-8 md:p-12"
          style={{ background: 'white', border: `1px solid ${NAVY}` }}
        >
          <div className="grid items-start gap-8 md:grid-cols-12">
            <div className="md:col-span-1">
              <Shield size={48} color={NAVY} />
            </div>
            <div className="md:col-span-11">
              <h3 className="font-serif text-3xl font-bold md:text-4xl" style={{ color: NAVY }}>
                {current.title}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-neutral-800 md:text-lg">
                {current.body}
              </p>
              <Link
                href={current.href}
                className="inline-flex items-center gap-2 mt-6 px-5 py-3 text-xs font-bold tracking-[0.3em] uppercase"
                style={{ background: NAVY, color: GOLD }}
              >
                {current.cta} &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const About = () => (
  <section className="relative px-5 py-24" style={{ background: NAVY }}>
    <div
      aria-hidden
      className="absolute inset-x-0 top-0 h-px"
      style={{ background: GOLD }}
    />
    <div className="grid items-center max-w-6xl gap-12 mx-auto md:grid-cols-12">
      <div className="md:col-span-5">
        <div className="relative" style={{ border: `1px solid ${GOLD}` }}>
          <div className="p-2" style={{ border: `1px solid ${GOLD}` }}>
            <Image
              src="/photos/weisburn-parade-1.jpg"
              alt="Sheriff Weisburn at parade"
              width={800}
              height={1000}
              sizes="(max-width: 768px) 100vw, 480px"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
      <div className="md:col-span-7" style={{ color: 'white' }}>
        <p className="text-[11px] font-bold tracking-[0.4em] uppercase" style={{ color: GOLD }}>
          About The Sheriff
        </p>
        <h2
          className="mt-3 font-serif"
          style={{ fontSize: 'clamp(2.25rem, 5vw, 3.75rem)', lineHeight: 1 }}
        >
          <span className="block font-black">Meet</span>
          <span className="block italic font-light" style={{ color: GOLD }}>
            Sheriff Weisburn
          </span>
        </h2>
        <p className="mt-6 text-base leading-relaxed text-white/85 md:text-lg">
          Sheriff Weisburn has proven experience and commitment to the citizens of Stark County. With his strong sense of duty, he leads the Sheriff's Office from the frontline. Place your trust in Sheriff Weisburn — a Sheriff who works for{' '}
          <span className="px-1 font-bold" style={{ background: GOLD, color: NAVY }}>YOU</span>.
        </p>
        <p
          className="mt-6 font-serif text-2xl italic md:text-3xl"
          style={{ color: GOLD }}
        >
          Action starts now.
        </p>
        <Link
          href="/about"
          className="inline-block px-7 py-3 mt-8 text-xs font-bold tracking-[0.3em] uppercase"
          style={{ background: GOLD, color: NAVY_DEEP }}
        >
          Read His Story
        </Link>
      </div>
    </div>
    <div
      aria-hidden
      className="absolute inset-x-0 bottom-0 h-px"
      style={{ background: GOLD }}
    />
  </section>
);

const Gallery = () => (
  <section className="px-5 py-24" style={{ background: PAPER }}>
    <div className="max-w-6xl mx-auto">
      <div className="text-center">
        <StarRow />
        <h2
          className="mt-4 font-serif font-black"
          style={{ color: NAVY, fontSize: 'clamp(2.25rem, 5vw, 3.5rem)' }}
        >
          In The Community
        </h2>
      </div>
      <div className="grid gap-3 mt-12 md:grid-cols-2">
        {[
          { src: '/photos/parade-group-2.jpg', cap: 'Stark County Parade' },
          { src: '/flag.jpg', cap: 'Service & Country' },
        ].map((p) => (
          <figure key={p.src} style={{ border: `1px solid ${NAVY}` }}>
            <div className="p-2" style={{ background: 'white' }}>
              <Image
                src={p.src}
                alt={p.cap}
                width={1400}
                height={900}
                sizes="(max-width: 768px) 100vw, 600px"
                className="w-full h-[22rem] object-cover"
              />
            </div>
            <figcaption
              className="px-4 py-3 text-[11px] font-bold tracking-[0.3em] uppercase"
              style={{ background: NAVY, color: GOLD }}
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
  <section id="volunteer" className="px-5 py-24" style={{ background: 'white' }}>
    <div className="max-w-3xl mx-auto text-center">
      <Shield size={48} color={NAVY} />
      <p className="mt-4 text-[11px] font-bold tracking-[0.4em] uppercase" style={{ color: NAVY }}>
        Volunteer Application
      </p>
      <h2
        className="mt-2 font-serif font-black"
        style={{ color: NAVY, fontSize: 'clamp(2rem, 4.5vw, 3rem)' }}
      >
        Join The Effort
      </h2>
      <p className="mt-4 text-base text-neutral-700">
        Stand by my side as I fight for a better Stark County. Are <span className="font-bold">YOU</span> with me?
      </p>
      <div
        className="p-8 mt-10 text-left"
        style={{ background: PAPER, border: `1px solid ${NAVY}` }}
      >
        <VolunteerSignupForm />
      </div>
    </div>
  </section>
);

const GetInvolved = () => (
  <section className="px-5 py-24" style={{ background: NAVY_DEEP }}>
    <div className="max-w-2xl mx-auto text-center" style={{ color: 'white' }}>
      <StarRow />
      <p className="mt-4 text-[11px] font-bold tracking-[0.4em] uppercase" style={{ color: GOLD }}>
        Stay Updated
      </p>
      <h2
        className="mt-2 font-serif font-black"
        style={{ fontSize: 'clamp(2.25rem, 5vw, 3.75rem)' }}
      >
        Receive The Latest
      </h2>
      <p className="mt-4 text-white/80">News from the campaign, delivered to your inbox.</p>
      <div className="mt-8">
        <EmailSignupForm />
      </div>
      <div className="flex justify-center gap-3 mt-8">
        <a href="https://www.facebook.com/profile.php?id=61552050077933" aria-label="Facebook">
          <Image src="/icon-facebook.svg" width={40} height={40} alt="Facebook" />
        </a>
        <a href="https://instagram.com/weisburnforsheriff" aria-label="Instagram">
          <Image src="/icon-instagram.svg" width={38} height={38} alt="Instagram" className="mt-[1px]" />
        </a>
      </div>
    </div>
  </section>
);

const FooterDesign = () => (
  <footer style={{ background: NAVY }}>
    <div className="grid max-w-6xl gap-10 px-5 py-16 mx-auto md:grid-cols-12" style={{ color: 'white' }}>
      <div className="md:col-span-5">
        <div className="flex items-center gap-4">
          <Shield size={48} />
          <Logo height={76} variant="stacked" primary={GOLD_LIGHT} accent={GOLD} />
        </div>
        <p className="max-w-sm mt-5 text-sm text-white/75">
          A proven Sheriff. A trusted leader. A career in service to Stark County.
        </p>
      </div>
      <div className="md:col-span-3 text-sm">
        <p className="text-[11px] font-bold tracking-[0.3em] uppercase" style={{ color: GOLD }}>
          Headquarters
        </p>
        <p className="mt-2 text-white/85">4849 Tree Line Circle NW</p>
        <p className="text-white/85">North Canton, OH 44720</p>
        <p className="mt-3 text-white/85">weisburnforsheriff@gmail.com</p>
      </div>
      <div className="md:col-span-4">
        <p className="text-[11px] font-bold tracking-[0.3em] uppercase" style={{ color: GOLD }}>
          Take Action
        </p>
        <Link
          href="/donate"
          className="block px-5 py-3 mt-3 text-xs font-bold tracking-[0.3em] text-center uppercase"
          style={{ background: GOLD, color: NAVY_DEEP }}
        >
          Contribute
        </Link>
        <div className="flex gap-3 mt-4">
          <a href="https://www.facebook.com/profile.php?id=61552050077933" aria-label="Facebook">
            <Image src="/icon-facebook.svg" width={36} height={36} alt="Facebook" />
          </a>
          <a href="https://instagram.com/weisburnforsheriff" aria-label="Instagram">
            <Image src="/icon-instagram.svg" width={34} height={34} alt="Instagram" className="mt-[1px]" />
          </a>
        </div>
      </div>
    </div>
    <div className="px-5 py-3 text-[10px] font-bold text-center tracking-[0.3em] uppercase" style={{ background: NAVY_DEEP, color: GOLD }}>
      Paid for by Weisburn for Sheriff
    </div>
  </footer>
);

export const Design3Authority = () => {
  return (
    <div className="min-h-screen" style={{ background: PAPER, color: INK }}>
      <Header />
      <Hero />
      <StatBar />
      <GolfBanner />
      <Pillars />
      <About />
      <Gallery />
      <VolunteerSection />
      <GetInvolved />
      <FooterDesign />
    </div>
  );
};
