'use client';

import Image from 'next/image';
import Link from 'next/link';
import { EmailSignupForm } from '@/components/ui/email-signup';
import { VolunteerSignupForm } from '@/components/ui/volunteer-signup';
import { ThemedMobileNav } from './mobile-nav';
import { Logo } from './logo';

const SLATE = '#221f1c';
const SLATE_DEEP = '#15130f';
const SLATE_LIFT = '#2c2925';
const CREAM = '#ece6d8';
const CREAM_DIM = '#cdc6b6';
const BODY = '#a39d92';
const RED = '#c4302b';
const RED_TEXT = '#e8746e';
const RED_DEEP = '#9c241f';
const TRIM = '#d4a843';

const Wordmark = ({ height = 44, variant = 'horizontal' as const }: { height?: number; variant?: 'horizontal' | 'stacked' }) => (
  <Logo height={height} variant={variant} primary={CREAM} accent={RED_TEXT} />
);

const Header = () => (
  <header
    className="sticky top-0 z-30 backdrop-blur-md"
    style={{ background: 'rgba(15,17,20,0.85)', borderBottom: `1px solid ${SLATE_LIFT}` }}
  >
    <div className="flex items-center justify-between max-w-6xl px-5 py-4 mx-auto">
      <Wordmark />
      <nav
        className="hidden gap-7 text-[11px] font-bold tracking-[0.3em] uppercase md:flex"
        style={{ color: CREAM_DIM }}
      >
        <Link href="/" className="hover:text-white">Home</Link>
        <Link href="/about" className="hover:text-white">About</Link>
        <Link href="/events" className="hover:text-white">Events</Link>
        <Link href="/donate" className="hover:text-white">Contribute</Link>
      </nav>
      <div className="flex items-center gap-2">
        <Link
          href="/donate"
          className="hidden px-4 py-2 text-[11px] font-bold tracking-[0.3em] uppercase md:inline-block"
          style={{ background: RED, color: CREAM }}
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
          bg={SLATE_DEEP}
          fg={CREAM}
          accent={RED}
          ctaBg={RED}
          ctaFg={CREAM}
          buttonFg={CREAM}
        />
      </div>
    </div>
  </header>
);

const Hero = () => (
  <section className="relative overflow-hidden" style={{ background: SLATE_DEEP }}>
    <div
      aria-hidden
      className="absolute inset-0 opacity-30"
      style={{
        backgroundImage: `radial-gradient(ellipse at 90% 50%, rgba(196,48,43,0.25) 0%, transparent 55%)`,
      }}
    />
    <div className="relative grid items-stretch max-w-6xl gap-10 px-5 pt-12 pb-16 mx-auto md:grid-cols-12 md:gap-12 md:pt-20 md:pb-24">
      <div className="md:col-span-7 md:py-6">
        <div className="flex items-center gap-3">
          <span className="block w-8 h-px" style={{ background: RED }} />
          <p className="text-[10px] font-bold tracking-[0.4em] uppercase" style={{ color: RED_TEXT }}>
            File · 2028 · Stark County
          </p>
        </div>
        <h1
          className="mt-6 font-serif font-black"
          style={{
            color: CREAM,
            fontSize: 'clamp(3rem, 9vw, 6.25rem)',
            lineHeight: 0.95,
            letterSpacing: '-0.01em',
          }}
        >
          <span className="block">Sheriff</span>
          <span className="block italic font-light" style={{ color: CREAM_DIM }}>
            Eric Weisburn.
          </span>
        </h1>
        <p
          className="max-w-xl mt-7 text-base leading-[1.7] md:text-lg"
          style={{ color: BODY }}
        >
          Thirty-one years of service to Stark County. A career built on the frontline — corrections, patrol, investigations, command. A Sheriff's Office led from the front, by a Sheriff who answers to{' '}
          <span className="font-semibold" style={{ color: CREAM }}>you</span>.
        </p>
        <div className="flex flex-col gap-3 mt-9 sm:flex-row">
          <Link
            href="/donate"
            className="inline-flex items-center justify-center px-7 py-4 text-xs font-bold tracking-[0.3em] uppercase"
            style={{ background: RED, color: CREAM }}
          >
            Contribute
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center justify-center gap-2 px-7 py-4 text-xs font-bold tracking-[0.3em] uppercase border"
            style={{ borderColor: SLATE_LIFT, color: CREAM }}
          >
            Service Record
            <span aria-hidden style={{ color: RED_TEXT }}>&rarr;</span>
          </Link>
        </div>
      </div>
      <div className="relative md:col-span-5">
        <div
          className="absolute -inset-px"
          aria-hidden
          style={{ borderTop: `1px solid ${RED}` }}
        />
        <div
          className="relative h-[26rem] md:h-full overflow-hidden"
          style={{ filter: 'contrast(1.05) saturate(0.9)' }}
        >
          <Image
            src="/post-election/head-shot-with-hat.jpg"
            alt="Sheriff Eric Weisburn"
            fill
            sizes="(max-width: 768px) 100vw, 480px"
            className="object-cover object-top"
            priority
          />
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(180deg, transparent 40%, rgba(15,17,20,0.85) 100%), linear-gradient(90deg, ${SLATE_DEEP} 0%, transparent 25%)`,
            }}
          />
        </div>
        <p
          className="absolute bottom-3 left-3 text-[10px] tracking-[0.3em] uppercase"
          style={{ color: CREAM_DIM }}
        >
          Photograph · Stark County, OH
        </p>
        <div
          className="absolute top-3 right-3 px-2 py-1 text-[9px] font-bold tracking-[0.3em] uppercase"
          style={{ background: RED, color: CREAM }}
        >
          On Record
        </div>
      </div>
    </div>
  </section>
);

const StatBar = () => (
  <section style={{ background: SLATE, borderTop: `1px solid ${SLATE_LIFT}`, borderBottom: `1px solid ${SLATE_LIFT}` }}>
    <div className="grid max-w-6xl grid-cols-3 mx-auto divide-x" style={{ borderColor: SLATE_LIFT }}>
      {[
        { k: '31', v: 'Years of Service', sub: '1991 — 2022' },
        { k: '01.06.25', v: 'Sworn In', sub: 'Sheriff of Stark Co.' },
        { k: 'Stark', v: 'County, Ohio', sub: 'Frontline command' },
      ].map((s, i) => (
        <div
          key={s.v}
          className="px-3 py-6 text-center sm:px-5 sm:py-8"
          style={{ borderColor: SLATE_LIFT, borderLeftWidth: i === 0 ? 0 : 1 }}
        >
          <p
            className="font-serif text-xl font-black sm:text-3xl md:text-4xl"
            style={{ color: CREAM }}
          >
            {s.k}
          </p>
          <p
            className="mt-1 text-[9px] sm:text-[10px] font-bold tracking-[0.25em] sm:tracking-[0.35em] uppercase"
            style={{ color: RED_TEXT }}
          >
            {s.v}
          </p>
          <p
            className="hidden sm:block mt-1 text-[10px] tracking-[0.15em]"
            style={{ color: BODY }}
          >
            {s.sub}
          </p>
        </div>
      ))}
    </div>
  </section>
);

const GolfBanner = () => (
  <Link
    href="/events/golf-fundraiser-3"
    className="block transition-colors group"
  >
    <section className="px-5 py-12" style={{ background: SLATE }}>
      <div
        className="flex flex-col items-start justify-between max-w-6xl gap-6 px-6 py-8 mx-auto md:flex-row md:items-center"
        style={{ background: SLATE_LIFT, borderLeft: `3px solid ${RED}` }}
      >
        <div>
          <p
            className="text-[10px] font-bold tracking-[0.4em] uppercase"
            style={{ color: RED_TEXT }}
          >
            Dispatch · Save The Date
          </p>
          <h3
            className="mt-2 font-serif text-2xl font-bold md:text-3xl"
            style={{ color: CREAM }}
          >
            Annual Golf Fundraiser
          </h3>
          <p className="mt-1 text-sm" style={{ color: BODY }}>
            Friday, September 18th
          </p>
        </div>
        <span
          className="inline-flex items-center gap-3 text-xs font-bold tracking-[0.3em] uppercase group-hover:gap-4 transition-all"
          style={{ color: CREAM }}
        >
          View Details <span style={{ color: RED_TEXT }}>&rarr;</span>
        </span>
      </div>
    </section>
  </Link>
);

const Pillars = () => {
  const items = [
    {
      n: '01',
      label: 'Field',
      title: 'Events & Appearances',
      body:
        'Parades, rallies, and community gatherings across Stark County. Check back here for our latest scheduled appearances and how to attend.',
      cta: 'See the calendar',
      href: '/events',
    },
    {
      n: '02',
      label: 'Service',
      title: 'Volunteer With The Campaign',
      body:
        "I need boots on the ground. Stand by my side as I fight for a better Stark County. Yard signs, parades, phone banks — every action moves the needle.",
      cta: 'Sign up below',
      href: '#volunteer',
    },
    {
      n: '03',
      label: 'Support',
      title: 'Contribute To The Mission',
      body:
        'Your donation will make a huge impact. The fight to keep Stark County safe is far from over. Thank you for your support.',
      cta: 'Donate now',
      href: '/donate',
    },
  ];

  return (
    <section className="px-5 py-24" style={{ background: SLATE }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p
              className="text-[10px] font-bold tracking-[0.4em] uppercase"
              style={{ color: RED_TEXT }}
            >
              · Three Ways Forward
            </p>
            <h2
              className="mt-3 font-serif font-black"
              style={{
                color: CREAM,
                fontSize: 'clamp(2.25rem, 5.5vw, 4rem)',
                lineHeight: 1,
              }}
            >
              Stand with the Sheriff.
            </h2>
          </div>
        </div>
        <div className="space-y-px">
          {items.map((it) => (
            <Link
              key={it.n}
              href={it.href}
              className="grid grid-cols-1 transition-colors md:grid-cols-12 group hover:bg-[#272a2f]"
              style={{ background: SLATE_LIFT }}
            >
              <div
                className="flex items-center gap-4 px-6 py-8 md:col-span-3"
                style={{ borderRight: `1px solid ${SLATE}` }}
              >
                <span className="font-serif text-4xl font-black md:text-5xl" style={{ color: RED_TEXT }}>
                  {it.n}
                </span>
                <span
                  className="text-[10px] font-bold tracking-[0.4em] uppercase"
                  style={{ color: BODY }}
                >
                  / {it.label}
                </span>
              </div>
              <div className="px-6 py-8 md:col-span-7">
                <h3
                  className="font-serif text-2xl font-bold md:text-3xl"
                  style={{ color: CREAM }}
                >
                  {it.title}
                </h3>
                <p className="mt-3 text-[15px] leading-[1.7]" style={{ color: BODY }}>
                  {it.body}
                </p>
              </div>
              <div className="flex items-center px-6 pb-8 md:col-span-2 md:py-8 md:justify-end">
                <span
                  className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.3em] uppercase group-hover:gap-3 transition-all"
                  style={{ color: CREAM }}
                >
                  {it.cta} <span style={{ color: RED_TEXT }}>&rarr;</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

const QuoteBlock = () => (
  <section className="relative px-5 overflow-hidden" style={{ background: SLATE_DEEP }}>
    <div className="absolute inset-0">
      <Image
        src="/photos/parade-group-2.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-25"
        style={{ filter: 'grayscale(0.7)' }}
        aria-hidden
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, ${SLATE_DEEP}EE 0%, ${SLATE_DEEP}CC 50%, ${SLATE_DEEP}EE 100%)`,
        }}
      />
    </div>
    <div className="relative max-w-4xl py-24 mx-auto text-center md:py-32">
      <p className="text-[10px] font-bold tracking-[0.4em] uppercase" style={{ color: RED_TEXT }}>
        On The Record
      </p>
      <p
        className="mt-6 font-serif italic"
        style={{
          color: CREAM,
          fontSize: 'clamp(2rem, 6vw, 4rem)',
          lineHeight: 1.1,
        }}
      >
        “Action starts <span className="not-italic font-bold">now.</span>”
      </p>
      <div className="flex items-center justify-center gap-4 mt-8">
        <span className="block w-12 h-px" style={{ background: RED }} />
        <p className="text-[11px] font-bold tracking-[0.4em] uppercase" style={{ color: CREAM_DIM }}>
          Sheriff Eric Weisburn
        </p>
        <span className="block w-12 h-px" style={{ background: RED }} />
      </div>
    </div>
  </section>
);

const About = () => (
  <section className="px-5 py-24" style={{ background: SLATE }}>
    <div className="grid max-w-6xl gap-12 mx-auto md:grid-cols-12">
      <div className="md:col-span-5">
        <div
          className="relative overflow-hidden"
          style={{ borderTop: `2px solid ${RED}` }}
        >
          <Image
            src="/photos/weisburn-parade-1.jpg"
            alt="Sheriff Weisburn at parade"
            width={900}
            height={1100}
            sizes="(max-width: 768px) 100vw, 480px"
            className="w-full h-auto"
            style={{ filter: 'contrast(1.05) saturate(0.95)' }}
          />
        </div>
        <p className="mt-3 text-[10px] tracking-[0.3em] uppercase" style={{ color: BODY }}>
          Photograph · On the trail
        </p>
      </div>
      <div className="md:col-span-7">
        <p className="text-[10px] font-bold tracking-[0.4em] uppercase" style={{ color: RED_TEXT }}>
          The Profile
        </p>
        <h2
          className="mt-3 font-serif"
          style={{
            color: CREAM,
            fontSize: 'clamp(2.25rem, 5vw, 3.75rem)',
            lineHeight: 1,
          }}
        >
          <span className="block font-black">Meet</span>
          <span className="block italic font-light" style={{ color: CREAM_DIM }}>
            Sheriff Weisburn.
          </span>
        </h2>
        <div className="mt-7 space-y-5 text-[15px] leading-[1.8]" style={{ color: BODY }}>
          <p>
            Sheriff Weisburn has proven experience and commitment to the citizens of Stark County. With his strong sense of duty, he leads the Sheriff's Office from the frontline.
          </p>
          <p>
            Place your trust in Sheriff Weisburn. He is the right choice — a Sheriff who works for{' '}
            <span className="font-semibold" style={{ color: CREAM }}>YOU</span>. A career built on service. A future built on action.
          </p>
        </div>
        <div
          className="grid grid-cols-3 gap-4 mt-10 pt-8"
          style={{ borderTop: `1px solid ${SLATE_LIFT}` }}
        >
          {[
            { k: '1991', v: 'Corrections' },
            { k: '1998', v: 'Patrol & SRO' },
            { k: '2025', v: 'Sheriff' },
          ].map((m) => (
            <div key={m.k}>
              <p className="font-serif text-lg font-bold sm:text-2xl" style={{ color: CREAM }}>
                {m.k}
              </p>
              <p className="text-[9px] sm:text-[10px] font-bold tracking-[0.25em] uppercase mt-1" style={{ color: RED_TEXT }}>
                {m.v}
              </p>
            </div>
          ))}
        </div>
        <Link
          href="/about"
          className="inline-flex items-center gap-3 mt-10 text-xs font-bold tracking-[0.3em] uppercase"
          style={{ color: CREAM, borderBottom: `2px solid ${RED}`, paddingBottom: 4 }}
        >
          Read the full record &rarr;
        </Link>
      </div>
    </div>
  </section>
);

const Gallery = () => (
  <section className="px-5 py-24" style={{ background: SLATE_DEEP }}>
    <div className="max-w-6xl mx-auto">
      <div className="flex items-end justify-between mb-10">
        <div>
          <p className="text-[10px] font-bold tracking-[0.4em] uppercase" style={{ color: RED_TEXT }}>
            · Field Notes
          </p>
          <h2
            className="mt-3 font-serif font-black"
            style={{
              color: CREAM,
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              lineHeight: 1,
            }}
          >
            On the trail.
          </h2>
        </div>
      </div>
      <div className="grid gap-3 md:grid-cols-12">
        <figure className="relative md:col-span-7">
          <div
            className="relative h-[20rem] md:h-[26rem] overflow-hidden"
            style={{ filter: 'contrast(1.05) saturate(0.95)' }}
          >
            <Image
              src="/photos/parade-group-2.jpg"
              alt="Stark County Parade"
              fill
              sizes="(max-width: 768px) 100vw, 700px"
              className="object-cover"
            />
          </div>
          <figcaption
            className="absolute bottom-3 left-3 px-3 py-1 text-[10px] font-bold tracking-[0.3em] uppercase"
            style={{ background: SLATE_DEEP, color: CREAM, borderLeft: `2px solid ${RED}` }}
          >
            Parade · Stark County
          </figcaption>
        </figure>
        <figure className="relative md:col-span-5">
          <div
            className="relative h-[20rem] md:h-[26rem] overflow-hidden"
            style={{ filter: 'contrast(1.05) saturate(0.95)' }}
          >
            <Image
              src="/flag.jpg"
              alt="American flag"
              fill
              sizes="(max-width: 768px) 100vw, 480px"
              className="object-cover"
            />
          </div>
          <figcaption
            className="absolute bottom-3 left-3 px-3 py-1 text-[10px] font-bold tracking-[0.3em] uppercase"
            style={{ background: SLATE_DEEP, color: CREAM, borderLeft: `2px solid ${RED}` }}
          >
            Service & Country
          </figcaption>
        </figure>
      </div>
    </div>
  </section>
);

const VolunteerSection = () => (
  <section id="volunteer" className="px-5 py-24" style={{ background: SLATE }}>
    <div className="grid max-w-6xl gap-10 mx-auto md:grid-cols-12">
      <div className="md:col-span-5">
        <p className="text-[10px] font-bold tracking-[0.4em] uppercase" style={{ color: RED_TEXT }}>
          · Field Recruitment
        </p>
        <h2
          className="mt-3 font-serif font-black"
          style={{
            color: CREAM,
            fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
            lineHeight: 1,
          }}
        >
          Boots on the ground.
        </h2>
        <p className="mt-5 text-[15px] leading-[1.7]" style={{ color: BODY }}>
          Stand by my side as I fight for a better Stark County. Let our voices be heard. Are{' '}
          <span className="font-semibold" style={{ color: CREAM }}>you</span> with me?
        </p>
        <ul className="mt-6 space-y-2 text-sm" style={{ color: CREAM_DIM }}>
          <li className="flex items-start gap-3">
            <span style={{ color: RED_TEXT }}>—</span> Walk in parades and rallies
          </li>
          <li className="flex items-start gap-3">
            <span style={{ color: RED_TEXT }}>—</span> Display a yard sign
          </li>
          <li className="flex items-start gap-3">
            <span style={{ color: RED_TEXT }}>—</span> Knock on doors with the team
          </li>
          <li className="flex items-start gap-3">
            <span style={{ color: RED_TEXT }}>—</span> Make calls to fellow voters
          </li>
        </ul>
      </div>
      <div className="md:col-span-7">
        <div
          className="p-6 md:p-10"
          style={{ background: CREAM, borderTop: `3px solid ${RED}` }}
        >
          <VolunteerSignupForm />
        </div>
      </div>
    </div>
  </section>
);

const GetInvolved = () => (
  <section className="relative px-5 overflow-hidden" style={{ background: SLATE_DEEP }}>
    <div className="absolute inset-0">
      <Image
        src="/flag.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-15"
        style={{ filter: 'grayscale(0.5)' }}
        aria-hidden
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, ${SLATE_DEEP}F2 0%, ${SLATE_DEEP}E6 100%)`,
        }}
      />
    </div>
    <div className="relative max-w-2xl py-24 mx-auto text-center">
      <p className="text-[10px] font-bold tracking-[0.4em] uppercase" style={{ color: RED_TEXT }}>
        · Stay Updated
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
      <p className="mt-4" style={{ color: CREAM_DIM }}>
        News from the campaign, delivered to your inbox.
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
  <footer style={{ background: SLATE_DEEP }}>
    <div className="grid max-w-6xl gap-10 px-5 py-16 mx-auto md:grid-cols-12" style={{ borderTop: `1px solid ${SLATE_LIFT}` }}>
      <div className="md:col-span-5">
        <Wordmark height={76} variant="stacked" />
        <p className="max-w-sm mt-5 text-sm leading-relaxed" style={{ color: BODY }}>
          A proven Sheriff. A career in service. A Sheriff's Office led from the frontline — for the citizens of Stark County.
        </p>
      </div>
      <div className="md:col-span-3 text-sm" style={{ color: CREAM_DIM }}>
        <p className="text-[10px] font-bold tracking-[0.3em] uppercase" style={{ color: RED_TEXT }}>
          Headquarters
        </p>
        <p className="mt-3">4849 Tree Line Circle NW</p>
        <p>North Canton, OH 44720</p>
        <p className="mt-3">weisburnforsheriff@gmail.com</p>
      </div>
      <div className="md:col-span-4">
        <p className="text-[10px] font-bold tracking-[0.3em] uppercase" style={{ color: RED_TEXT }}>
          Take Action
        </p>
        <Link
          href="/donate"
          className="block px-5 py-3 mt-3 text-xs font-bold tracking-[0.3em] text-center uppercase"
          style={{ background: RED, color: CREAM }}
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
      className="px-5 py-3 text-[10px] text-center font-bold tracking-[0.4em] uppercase"
      style={{ background: '#070809', color: BODY }}
    >
      Paid for by Weisburn for Sheriff
    </div>
  </footer>
);

export const Design4Documentary = () => {
  return (
    <div className="min-h-screen" style={{ background: SLATE, color: CREAM }}>
      <Header />
      <Hero />
      <StatBar />
      <GolfBanner />
      <Pillars />
      <QuoteBlock />
      <About />
      <Gallery />
      <VolunteerSection />
      <GetInvolved />
      <FooterDesign />
    </div>
  );
};
