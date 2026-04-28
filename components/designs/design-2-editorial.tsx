'use client';

import Image from 'next/image';
import Link from 'next/link';
import { EmailSignupForm } from '@/components/ui/email-signup';
import { VolunteerSignupForm } from '@/components/ui/volunteer-signup';
import { ThemedMobileNav } from './mobile-nav';
import { Logo } from './logo';

const CREAM = '#f5f0e6';
const PAPER = '#fbf8f1';
const INK = '#0e0e0e';
const RULE = '#1f1f1f';
const ACCENT = '#6b5325';
const ACCENT_LIGHT = '#c9a361';

const Header = () => (
  <header
    className="sticky top-0 z-30 backdrop-blur"
    style={{ background: 'rgba(245,240,230,0.85)', borderBottom: `1px solid ${RULE}` }}
  >
    <div className="flex items-center justify-between max-w-6xl px-6 py-4 mx-auto">
      <Logo height={44} primary={INK} accent={ACCENT} />
      <nav className="hidden gap-8 text-xs font-medium tracking-[0.2em] uppercase md:flex" style={{ color: INK }}>
        <Link href="/" className="hover:opacity-60">Home</Link>
        <Link href="/about" className="hover:opacity-60">About</Link>
        <Link href="/events" className="hover:opacity-60">Events</Link>
        <Link href="/donate" className="hover:opacity-60">Contribute</Link>
      </nav>
      <div className="flex items-center gap-2">
        <Link
          href="/donate"
          className="hidden px-4 py-2 text-[10px] font-bold tracking-[0.3em] uppercase border md:inline-block"
          style={{ background: INK, color: PAPER, borderColor: INK }}
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
          bg={CREAM}
          fg={INK}
          accent={ACCENT}
          ctaBg={INK}
          ctaFg={PAPER}
          buttonFg={INK}
        />
      </div>
    </div>
  </header>
);

const Hero = () => (
  <section className="relative" style={{ background: CREAM }}>
    <div className="grid max-w-6xl gap-10 px-6 pt-12 pb-20 mx-auto md:grid-cols-12 md:pt-20">
      <div className="md:col-span-7">
        <p
          className="text-[11px] font-bold tracking-[0.4em] uppercase"
          style={{ color: ACCENT }}
        >
          ISSUE No. 28 — Stark County, Ohio
        </p>
        <h1
          className="mt-6 font-serif font-black leading-[0.95]"
          style={{ color: INK, fontSize: 'clamp(3rem, 9vw, 7rem)' }}
        >
          Eric
          <span className="block italic font-light">Weisburn</span>
          <span className="block">
            <span style={{ color: ACCENT }}>for</span> Sheriff.
          </span>
        </h1>
        <div className="flex items-center gap-4 mt-8">
          <div className="h-px w-14" style={{ background: RULE }} />
          <p className="font-serif text-base italic md:text-lg" style={{ color: INK }}>
            A profile in service.
          </p>
        </div>
        <p className="mt-6 max-w-md text-[15px] leading-[1.7] text-neutral-800">
          Thirty-one years on the job. A career built at the frontline of Stark County's most consequential cases. A Sheriff who answers, simply, to{' '}
          <span className="italic">you</span>.
        </p>
        <div className="flex flex-wrap items-center gap-6 mt-10">
          <Link
            href="/about"
            className="inline-flex items-center gap-3 text-sm font-bold tracking-[0.2em] uppercase border-b-2 pb-1"
            style={{ color: INK, borderColor: INK }}
          >
            Read the profile <span aria-hidden>&rarr;</span>
          </Link>
          <Link
            href="/donate"
            className="inline-flex items-center gap-3 px-5 py-3 text-xs font-bold tracking-[0.3em] uppercase"
            style={{ background: INK, color: PAPER }}
          >
            Contribute
          </Link>
        </div>
      </div>
      <div className="relative md:col-span-5">
        <div
          className="overflow-hidden"
          style={{ filter: 'grayscale(15%) contrast(1.05)' }}
        >
          <Image
            src="/post-election/head-shot-with-hat.jpg"
            alt="Sheriff Eric Weisburn"
            width={900}
            height={1100}
            sizes="(max-width: 768px) 100vw, 480px"
            className="w-full h-auto"
            priority
          />
        </div>
        <p
          className="mt-3 text-[11px] tracking-[0.25em] uppercase"
          style={{ color: ACCENT }}
        >
          Photograph — Stark County
        </p>
      </div>
    </div>
    <div className="px-6 pb-12 mx-auto max-w-6xl">
      <div className="grid grid-cols-3 gap-3 pt-8 sm:gap-6" style={{ borderTop: `1px solid ${RULE}` }}>
        {[
          { k: '31', v: 'Years of Service' },
          { k: '01.06.25', v: 'Took Office' },
          { k: 'Stark', v: 'County, Ohio' },
        ].map((s) => (
          <div key={s.v}>
            <p className="font-serif text-lg font-bold sm:text-2xl md:text-4xl" style={{ color: INK }}>
              {s.k}
            </p>
            <p className="text-[9px] sm:text-[10px] font-bold tracking-[0.2em] sm:tracking-[0.3em] uppercase mt-1" style={{ color: ACCENT }}>
              {s.v}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const GolfBanner = () => (
  <Link
    href="/events/golf-fundraiser-3"
    className="block transition-opacity hover:opacity-80"
  >
    <section className="px-6 py-10 mx-auto max-w-6xl">
      <div
        className="flex flex-col items-center justify-between gap-5 px-6 py-8 md:flex-row"
        style={{ background: PAPER, border: `1px solid ${RULE}` }}
      >
        <div>
          <p className="text-[10px] font-bold tracking-[0.4em] uppercase" style={{ color: ACCENT }}>
            Save The Date
          </p>
          <h3 className="mt-2 font-serif text-3xl font-bold md:text-4xl" style={{ color: INK }}>
            Annual Golf Fundraiser
          </h3>
          <p className="mt-1 text-sm text-neutral-700">Friday, September 18th</p>
        </div>
        <span
          className="inline-flex items-center gap-3 text-xs font-bold tracking-[0.3em] uppercase border-b-2 pb-1"
          style={{ color: INK, borderColor: INK }}
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
      n: '01',
      title: 'Events',
      body:
        'Parades, rallies, and community gatherings across the county. Check back here for our latest scheduled appearances.',
      cta: 'See events',
      href: '/events',
    },
    {
      n: '02',
      title: 'Volunteer',
      body:
        'Boots on the ground. Yard signs. Phone banks. The campaign runs on the people who show up. Are you with us?',
      cta: 'Sign up',
      href: '#volunteer',
    },
    {
      n: '03',
      title: 'Contribute',
      body:
        'Your donation will make a huge impact. The fight to keep Stark County safe is far from over. Thank you for your support.',
      cta: 'Donate',
      href: '/donate',
    },
  ];

  return (
    <section className="px-6 py-24" style={{ background: PAPER }}>
      <div className="max-w-6xl mx-auto">
        <p className="text-[11px] font-bold tracking-[0.4em] uppercase" style={{ color: ACCENT }}>
          / Three ways forward
        </p>
        <h2
          className="mt-3 font-serif font-black leading-[0.95]"
          style={{ color: INK, fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
        >
          Stand with the Sheriff.
        </h2>
        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {items.map((it) => (
            <article
              key={it.n}
              className="flex flex-col pt-8"
              style={{ borderTop: `1px solid ${RULE}` }}
            >
              <p className="font-serif text-5xl font-light" style={{ color: ACCENT }}>
                {it.n}
              </p>
              <h3 className="mt-3 font-serif text-3xl font-bold" style={{ color: INK }}>
                {it.title}
              </h3>
              <p className="mt-4 text-[15px] leading-[1.7] text-neutral-700">{it.body}</p>
              <Link
                href={it.href}
                className="self-start inline-flex items-center gap-2 mt-6 text-xs font-bold tracking-[0.3em] uppercase border-b pb-1"
                style={{ color: INK, borderColor: INK }}
              >
                {it.cta} <span aria-hidden>&rarr;</span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

const PullQuote = () => (
  <section className="px-6 py-24" style={{ background: CREAM }}>
    <div className="max-w-3xl mx-auto text-center">
      <p
        className="font-serif italic"
        style={{ color: INK, fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.1 }}
      >
        “Action starts <span className="not-italic font-bold">now.</span>”
      </p>
      <p className="mt-6 text-[10px] font-bold tracking-[0.4em] uppercase" style={{ color: ACCENT }}>
        — Sheriff Eric Weisburn
      </p>
    </div>
  </section>
);

const About = () => (
  <section className="px-6 py-24" style={{ background: PAPER }}>
    <div className="grid max-w-6xl gap-12 mx-auto md:grid-cols-12">
      <div className="md:col-span-5">
        <div className="overflow-hidden" style={{ filter: 'grayscale(20%)' }}>
          <Image
            src="/photos/weisburn-parade-1.jpg"
            alt="Sheriff Weisburn at parade"
            width={900}
            height={1200}
            sizes="(max-width: 768px) 100vw, 480px"
            className="w-full h-auto"
          />
        </div>
        <p className="mt-3 text-[11px] tracking-[0.25em] uppercase" style={{ color: ACCENT }}>
          Photograph — On the trail
        </p>
      </div>
      <div className="md:col-span-7">
        <p className="text-[11px] font-bold tracking-[0.4em] uppercase" style={{ color: ACCENT }}>
          The Profile
        </p>
        <h2
          className="mt-3 font-serif font-black leading-[0.95]"
          style={{ color: INK, fontSize: 'clamp(2.5rem, 5.5vw, 4rem)' }}
        >
          Meet Sheriff
          <br />
          <span className="italic font-light">Weisburn.</span>
        </h2>
        <div className="mt-8 columns-1 md:columns-2 gap-8 text-[15px] leading-[1.75] text-neutral-800">
          <p className="mb-4">
            Sheriff Weisburn has proven experience and commitment to the citizens of Stark County. With his strong sense of duty, he leads the Sheriff's Office from the frontline.
          </p>
          <p>
            Place your trust in Sheriff Weisburn. He is the right choice — a Sheriff who works for{' '}
            <span className="font-bold">YOU</span>. A career built on service. A future built on action.
          </p>
        </div>
        <Link
          href="/about"
          className="inline-flex items-center gap-3 mt-10 text-xs font-bold tracking-[0.3em] uppercase border-b-2 pb-1"
          style={{ color: INK, borderColor: INK }}
        >
          Read the full profile &rarr;
        </Link>
      </div>
    </div>
  </section>
);

const Gallery = () => (
  <section className="px-6 py-24" style={{ background: CREAM }}>
    <div className="max-w-6xl mx-auto">
      <div className="flex items-end justify-between mb-10">
        <div>
          <p className="text-[11px] font-bold tracking-[0.4em] uppercase" style={{ color: ACCENT }}>
            Photo Essay
          </p>
          <h2 className="mt-2 font-serif text-4xl font-bold md:text-5xl" style={{ color: INK }}>
            On the trail.
          </h2>
        </div>
      </div>
      <div className="grid gap-3 md:grid-cols-12">
        <div className="md:col-span-7" style={{ filter: 'grayscale(15%)' }}>
          <Image
            src="/photos/parade-group-2.jpg"
            alt="Stark County Parade"
            width={1400}
            height={900}
            sizes="(max-width: 768px) 100vw, 700px"
            className="w-full h-[24rem] object-cover"
          />
        </div>
        <div className="md:col-span-5" style={{ filter: 'grayscale(15%)' }}>
          <Image
            src="/flag.jpg"
            alt="American flag"
            width={1000}
            height={1200}
            sizes="(max-width: 768px) 100vw, 480px"
            className="w-full h-[24rem] object-cover"
          />
        </div>
      </div>
    </div>
  </section>
);

const VolunteerSection = () => (
  <section id="volunteer" className="px-6 py-24" style={{ background: PAPER }}>
    <div className="grid max-w-6xl gap-10 mx-auto md:grid-cols-12">
      <div className="md:col-span-5">
        <p className="text-[11px] font-bold tracking-[0.4em] uppercase" style={{ color: ACCENT }}>
          / Field Notes
        </p>
        <h2
          className="mt-3 font-serif font-black leading-[0.95]"
          style={{ color: INK, fontSize: 'clamp(2.25rem, 5vw, 3.75rem)' }}
        >
          Boots on the ground.
        </h2>
        <p className="mt-6 text-[15px] leading-[1.7] text-neutral-700">
          Stand by my side as I fight for a better Stark County. Let our voices be heard. Are <span className="font-bold">you</span> with me?
        </p>
      </div>
      <div className="md:col-span-7">
        <div
          className="p-6 md:p-10 bg-white"
          style={{ border: `1px solid ${RULE}` }}
        >
          <VolunteerSignupForm />
        </div>
      </div>
    </div>
  </section>
);

const GetInvolved = () => (
  <section className="px-6 py-24" style={{ background: '#1d1812', color: PAPER }}>
    <div className="max-w-2xl mx-auto text-center">
      <p className="text-[11px] font-bold tracking-[0.4em] uppercase" style={{ color: ACCENT_LIGHT }}>
        / Stay Updated
      </p>
      <h2
        className="mt-3 font-serif italic"
        style={{ fontSize: 'clamp(2.25rem, 5vw, 3.75rem)', lineHeight: 1 }}
      >
        Join the effort.
      </h2>
      <p className="mt-4 text-neutral-300">
        One letter, occasionally. News from the campaign, delivered to your inbox.
      </p>
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
  <footer style={{ background: CREAM }}>
    <div className="grid max-w-6xl gap-10 px-6 py-16 mx-auto md:grid-cols-12" style={{ borderTop: `1px solid ${RULE}` }}>
      <div className="md:col-span-5">
        <Logo height={76} variant="stacked" primary={INK} accent={ACCENT} />
        <p className="max-w-sm mt-5 text-sm text-neutral-700">
          A Sheriff who works for you. Built on service. Driven by action.
        </p>
      </div>
      <div className="md:col-span-3 text-sm text-neutral-700">
        <p className="text-[10px] font-bold tracking-[0.3em] uppercase" style={{ color: ACCENT }}>
          Headquarters
        </p>
        <p className="mt-2">4849 Tree Line Circle NW</p>
        <p>North Canton, OH 44720</p>
        <p className="mt-3">weisburnforsheriff@gmail.com</p>
      </div>
      <div className="md:col-span-4">
        <Link
          href="/donate"
          className="inline-block px-6 py-3 text-xs font-bold tracking-[0.3em] uppercase"
          style={{ background: INK, color: PAPER }}
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
    <div
      className="px-6 py-4 text-[10px] font-bold tracking-[0.4em] text-center uppercase"
      style={{ background: PAPER, color: ACCENT, borderTop: `1px solid ${RULE}` }}
    >
      Paid for by Weisburn for Sheriff
    </div>
  </footer>
);

export const Design2Editorial = () => {
  return (
    <div className="min-h-screen font-serif" style={{ background: CREAM }}>
      <Header />
      <Hero />
      <GolfBanner />
      <Pillars />
      <PullQuote />
      <About />
      <Gallery />
      <VolunteerSection />
      <GetInvolved />
      <FooterDesign />
    </div>
  );
};
