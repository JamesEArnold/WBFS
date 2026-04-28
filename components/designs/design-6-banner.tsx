'use client';

import Image from 'next/image';
import Link from 'next/link';
import { EmailSignupForm } from '@/components/ui/email-signup';
import { VolunteerSignupForm } from '@/components/ui/volunteer-signup';
import { ThemedMobileNav } from './mobile-nav';
import { Logo } from './logo';

const RED = '#c1272d';
const RED_DEEP = '#8a1c20';
const RED_DARK = '#6a1316';
const CREAM = '#fffaf0';
const PAPER = '#f5ede0';
const INK = '#0a0a0a';
const INK_SOFT = '#1a1a1a';
const GOLD = '#d4a843';
const GOLD_BRIGHT = '#ffe999';

const Star = ({ size, color }: { size: number; color: string }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill={color} aria-hidden>
    <path d="M12 2.5l2.6 6.4 6.9.5-5.3 4.5 1.7 6.7L12 17l-5.9 3.6 1.7-6.7L2.5 9.4l6.9-.5z" />
  </svg>
);

const StarRow = ({ count = 5, size = 12, color = CREAM }: { count?: number; size?: number; color?: string }) => (
  <div className="flex items-center justify-center gap-2" aria-hidden>
    {Array.from({ length: count }).map((_, i) => (
      <Star key={i} size={size} color={color} />
    ))}
  </div>
);

const Header = () => (
  <header className="relative z-30">
    <div
      className="text-[10px] font-bold tracking-[0.35em] text-center uppercase py-1"
      style={{ background: INK, color: GOLD }}
    >
      ★ A SHERIFF WHO WORKS FOR YOU ★ STARK COUNTY ★
    </div>
    <div className="sticky top-0 z-30" style={{ background: RED, borderBottom: `4px solid ${INK}` }}>
      <div className="flex items-center justify-between max-w-6xl px-5 py-3 mx-auto">
        <Logo height={50} primary={CREAM} accent={GOLD} />
        <nav
          className="hidden gap-7 text-[11px] font-black tracking-[0.3em] uppercase md:flex"
          style={{ color: CREAM }}
        >
          <Link href="/" className="hover:text-yellow-200">Home</Link>
          <Link href="/about" className="hover:text-yellow-200">About</Link>
          <Link href="/events" className="hover:text-yellow-200">Events</Link>
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="/donate"
            className="hidden px-4 py-2 text-[11px] font-black tracking-[0.3em] uppercase md:inline-block"
            style={{ background: CREAM, color: INK, border: `2px solid ${INK}` }}
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
            bg={RED_DEEP}
            fg={CREAM}
            accent={GOLD}
            ctaBg={CREAM}
            ctaFg={INK}
            buttonFg={CREAM}
          />
        </div>
      </div>
    </div>
  </header>
);

const Hero = () => (
  <section className="relative" style={{ background: CREAM }}>
    {/* Star strip */}
    <div className="py-3" style={{ background: INK }}>
      <div className="flex items-center justify-center gap-3 max-w-6xl mx-auto px-5" aria-hidden>
        {Array.from({ length: 13 }).map((_, i) => (
          <Star key={i} size={14} color={GOLD} />
        ))}
      </div>
    </div>
    <div className="grid items-end max-w-6xl gap-10 px-5 py-12 mx-auto md:grid-cols-12 md:py-16">
      <div className="md:col-span-7">
        <p
          className="px-3 py-1 text-[11px] font-black tracking-[0.4em] uppercase inline-block"
          style={{ background: INK, color: GOLD }}
        >
          ★ RE-ELECT 2028 ★
        </p>
        <h1
          className="mt-4 font-black uppercase"
          style={{
            color: INK,
            fontSize: 'clamp(3.25rem, 10vw, 6.5rem)',
            lineHeight: 0.88,
            letterSpacing: '-0.01em',
          }}
        >
          SHERIFF
          <span
            className="block mt-1"
            style={{ color: RED }}
          >
            WEISBURN
          </span>
        </h1>
        <div className="flex items-center gap-3 mt-5">
          <span className="block w-12 h-1" style={{ background: INK }} />
          <p className="text-sm font-black tracking-[0.3em] uppercase" style={{ color: INK }}>
            For Stark County, Ohio
          </p>
        </div>
        <p
          className="max-w-lg mt-6 text-base font-medium leading-relaxed md:text-lg"
          style={{ color: INK_SOFT }}
        >
          Thirty-one years of service. A proven leader. A Sheriff who works for{' '}
          <span
            className="px-2 font-black"
            style={{ background: GOLD, color: INK }}
          >
            YOU
          </span>
          .
        </p>
        <div className="flex flex-col items-stretch gap-3 mt-8 sm:flex-row">
          <Link
            href="/donate"
            className="px-7 py-4 text-xs font-black tracking-[0.3em] text-center uppercase"
            style={{
              background: RED,
              color: CREAM,
              border: `3px solid ${INK}`,
              boxShadow: `4px 4px 0 ${INK}`,
            }}
          >
            Contribute Today
          </Link>
          <Link
            href="/about"
            className="px-7 py-4 text-xs font-black tracking-[0.3em] text-center uppercase"
            style={{
              background: CREAM,
              color: INK,
              border: `3px solid ${INK}`,
              boxShadow: `4px 4px 0 ${INK}`,
            }}
          >
            Meet The Sheriff
          </Link>
        </div>
      </div>
      <div className="md:col-span-5">
        <div className="relative">
          <div
            className="absolute -inset-3"
            aria-hidden
            style={{ background: RED, transform: 'rotate(-1deg)' }}
          />
          <div className="relative" style={{ border: `4px solid ${INK}` }}>
            <Image
              src="/post-election/head-shot-with-hat.jpg"
              alt="Sheriff Eric Weisburn"
              width={900}
              height={1200}
              sizes="(max-width: 768px) 100vw, 480px"
              className="w-full h-auto"
              priority
            />
            <div
              className="absolute bottom-0 left-0 right-0 px-4 py-2 text-[11px] font-black tracking-[0.3em] text-center uppercase"
              style={{ background: INK, color: CREAM, borderTop: `2px solid ${GOLD}` }}
            >
              ★ Sheriff Eric Weisburn ★
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="py-3" style={{ background: RED }}>
      <StarRow count={13} size={14} color={CREAM} />
    </div>
  </section>
);

const StatBanner = () => (
  <section style={{ background: INK, color: CREAM }}>
    <div className="grid max-w-6xl grid-cols-3 mx-auto">
      {[
        { k: '31', v: 'Years of Service' },
        { k: '01.06.25', v: 'Sworn In' },
        { k: 'Stark', v: 'County, Ohio' },
      ].map((s, i) => (
        <div
          key={s.v}
          className="px-3 py-6 text-center sm:px-5 sm:py-7"
          style={{ borderLeft: i === 0 ? 'none' : `1px solid ${RED}` }}
        >
          <p className="font-black text-xl sm:text-3xl md:text-4xl" style={{ color: GOLD }}>
            {s.k}
          </p>
          <p className="text-[9px] sm:text-[10px] font-black tracking-[0.25em] sm:tracking-[0.35em] uppercase mt-1" style={{ color: CREAM }}>
            {s.v}
          </p>
        </div>
      ))}
    </div>
  </section>
);

const GolfBanner = () => (
  <Link
    href="/events/golf-fundraiser-3"
    className="block transition-transform hover:-translate-y-0.5"
  >
    <section className="px-5 py-12" style={{ background: PAPER }}>
      <div
        className="flex flex-col items-start justify-between max-w-6xl gap-5 px-6 py-7 mx-auto md:flex-row md:items-center"
        style={{
          background: CREAM,
          border: `3px solid ${INK}`,
          boxShadow: `5px 5px 0 ${RED}`,
        }}
      >
        <div>
          <p className="text-[11px] font-black tracking-[0.4em] uppercase" style={{ color: RED }}>
            ★ Save The Date ★
          </p>
          <h3 className="mt-2 font-black uppercase text-2xl md:text-3xl" style={{ color: INK }}>
            Annual Golf Fundraiser
          </h3>
          <p className="mt-1 text-sm font-bold" style={{ color: INK_SOFT }}>
            Friday, September 18th
          </p>
        </div>
        <span
          className="inline-flex items-center gap-3 px-5 py-3 text-[11px] font-black tracking-[0.3em] uppercase"
          style={{ background: INK, color: CREAM }}
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
        "I need boots on the ground. Stand by my side as I fight for a better Stark County. Yard signs, parades, doors — every action counts.",
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
    <section className="px-5 py-20" style={{ background: PAPER }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center">
          <StarRow count={5} size={14} color={RED} />
          <h2
            className="mt-4 font-black uppercase"
            style={{
              color: INK,
              fontSize: 'clamp(2.25rem, 5.5vw, 4rem)',
              lineHeight: 0.95,
            }}
          >
            Stand With <span style={{ color: RED }}>The Sheriff.</span>
          </h2>
          <p className="mt-3 text-sm font-bold tracking-[0.3em] uppercase" style={{ color: INK_SOFT }}>
            Three ways to help re-elect Sheriff Weisburn
          </p>
        </div>
        <div className="grid gap-6 mt-12 md:grid-cols-3">
          {items.map((it, idx) => (
            <Link
              key={it.title}
              href={it.href}
              className="flex flex-col p-7 transition-transform hover:-translate-y-1"
              style={{
                background: CREAM,
                border: `3px solid ${INK}`,
                boxShadow: `5px 5px 0 ${RED}`,
              }}
            >
              <span
                className="px-3 py-1 text-[10px] font-black tracking-[0.4em] uppercase self-start"
                style={{ background: INK, color: GOLD }}
              >
                ★ Plank {String(idx + 1).padStart(2, '0')}
              </span>
              <h3
                className="mt-4 font-black uppercase"
                style={{ color: INK, fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', lineHeight: 1 }}
              >
                {it.title}
              </h3>
              <p className="mt-4 text-sm font-medium leading-relaxed" style={{ color: INK_SOFT }}>
                {it.body}
              </p>
              <span
                className="inline-flex items-center self-start gap-3 mt-6 px-4 py-2 text-[11px] font-black tracking-[0.3em] uppercase"
                style={{ background: RED, color: CREAM, border: `2px solid ${INK}` }}
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

const About = () => (
  <section className="relative px-5 py-20" style={{ background: CREAM }}>
    <div className="grid items-center max-w-6xl gap-12 mx-auto md:grid-cols-12">
      <div className="md:col-span-5">
        <div className="relative">
          <div
            className="absolute -inset-3"
            aria-hidden
            style={{ background: GOLD }}
          />
          <div className="relative" style={{ border: `3px solid ${INK}` }}>
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
      <div className="md:col-span-7">
        <p
          className="px-3 py-1 text-[11px] font-black tracking-[0.4em] uppercase inline-block"
          style={{ background: INK, color: GOLD }}
        >
          ★ ABOUT THE SHERIFF ★
        </p>
        <h2
          className="mt-4 font-black uppercase"
          style={{
            color: INK,
            fontSize: 'clamp(2.25rem, 5.5vw, 4rem)',
            lineHeight: 0.95,
          }}
        >
          Meet <span style={{ color: RED }}>Sheriff Weisburn.</span>
        </h2>
        <p className="mt-6 text-base leading-relaxed md:text-lg" style={{ color: INK_SOFT }}>
          Sheriff Weisburn has proven experience and commitment to the citizens of Stark County. With his strong sense of duty, he leads the Sheriff's Office from the frontline. Place your trust in Sheriff Weisburn — a Sheriff who works for{' '}
          <span className="px-2 font-black" style={{ background: GOLD, color: INK }}>YOU!</span>
        </p>
        <div
          className="p-5 mt-6"
          style={{ background: PAPER, borderLeft: `6px solid ${RED}` }}
        >
          <p className="font-black uppercase italic text-2xl md:text-3xl" style={{ color: INK }}>
            “Action starts <span style={{ color: RED }}>NOW.</span>”
          </p>
        </div>
        <Link
          href="/about"
          className="inline-block px-7 py-3 mt-8 text-xs font-black tracking-[0.3em] uppercase"
          style={{
            background: INK,
            color: CREAM,
            border: `3px solid ${INK}`,
            boxShadow: `4px 4px 0 ${RED}`,
          }}
        >
          Read His Story
        </Link>
      </div>
    </div>
  </section>
);

const Gallery = () => (
  <section style={{ background: RED }}>
    <div className="py-3" style={{ background: INK }}>
      <StarRow count={13} size={14} color={GOLD} />
    </div>
    <div className="px-5 py-20">
      <div className="max-w-6xl mx-auto">
        <h2
          className="font-black text-center uppercase"
          style={{
            color: CREAM,
            fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
            lineHeight: 1,
          }}
        >
          On The <span style={{ color: GOLD_BRIGHT }}>Trail</span>
        </h2>
        <div className="grid gap-5 mt-12 md:grid-cols-2">
          {[
            { src: '/photos/parade-group-2.jpg', cap: 'Stark County Parade' },
            { src: '/flag.jpg', cap: 'Service & Country' },
          ].map((p) => (
            <figure
              key={p.src}
              className="relative"
              style={{ background: CREAM, padding: 8, border: `3px solid ${INK}`, boxShadow: `5px 5px 0 ${INK}` }}
            >
              <div className="overflow-hidden">
                <Image
                  src={p.src}
                  alt={p.cap}
                  width={1200}
                  height={800}
                  sizes="(max-width: 768px) 100vw, 600px"
                  className="w-full h-[20rem] object-cover"
                />
              </div>
              <figcaption
                className="mt-2 text-center text-[11px] font-black tracking-[0.3em] uppercase"
                style={{ color: INK }}
              >
                ★ {p.cap} ★
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </div>
    <div className="py-3" style={{ background: INK }}>
      <StarRow count={13} size={14} color={GOLD} />
    </div>
  </section>
);

const VolunteerSection = () => (
  <section id="volunteer" className="px-5 py-20" style={{ background: PAPER }}>
    <div className="max-w-3xl mx-auto text-center">
      <p
        className="px-3 py-1 text-[11px] font-black tracking-[0.4em] uppercase inline-block"
        style={{ background: INK, color: GOLD }}
      >
        ★ BOOTS ON THE GROUND ★
      </p>
      <h2
        className="mt-4 font-black uppercase"
        style={{
          color: INK,
          fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
          lineHeight: 0.95,
        }}
      >
        Volunteer With <span style={{ color: RED }}>The Campaign.</span>
      </h2>
      <p className="mt-4 text-base font-medium" style={{ color: INK_SOFT }}>
        I need boots on the ground. Are <span className="font-black" style={{ color: RED }}>YOU</span> with me?
      </p>
      <div
        className="p-6 mt-10 text-left md:p-10"
        style={{
          background: CREAM,
          border: `3px solid ${INK}`,
          boxShadow: `6px 6px 0 ${RED}`,
        }}
      >
        <VolunteerSignupForm />
      </div>
    </div>
  </section>
);

const GetInvolved = () => (
  <section style={{ background: RED }}>
    <div className="py-3" style={{ background: INK }}>
      <StarRow count={13} size={14} color={GOLD} />
    </div>
    <div className="px-5 py-20">
      <div className="max-w-2xl mx-auto text-center" style={{ color: CREAM }}>
        <p
          className="px-3 py-1 text-[11px] font-black tracking-[0.4em] uppercase inline-block"
          style={{ background: INK, color: GOLD }}
        >
          ★ STAY UPDATED ★
        </p>
        <h2
          className="mt-4 font-black uppercase"
          style={{
            color: CREAM,
            fontSize: 'clamp(2.25rem, 5.5vw, 4rem)',
            lineHeight: 0.95,
          }}
        >
          Join Our <span style={{ color: GOLD_BRIGHT }}>Effort.</span>
        </h2>
        <p className="mt-4" style={{ color: CREAM }}>
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
    </div>
  </section>
);

const FooterDesign = () => (
  <footer style={{ background: INK }}>
    <div className="py-3" style={{ background: RED }}>
      <StarRow count={11} size={14} color={CREAM} />
    </div>
    <div className="grid max-w-6xl gap-10 px-5 py-14 mx-auto md:grid-cols-12" style={{ color: CREAM }}>
      <div className="md:col-span-5">
        <Logo height={84} variant="stacked" primary={CREAM} accent={GOLD} />
        <p className="max-w-sm mt-5 text-sm" style={{ color: '#cdc6b6' }}>
          A proven Sheriff. A trusted leader. A Sheriff who works for you.
        </p>
      </div>
      <div className="md:col-span-3 text-sm">
        <p className="text-[11px] font-black tracking-[0.35em] uppercase" style={{ color: GOLD }}>
          Headquarters
        </p>
        <p className="mt-2">4849 Tree Line Circle NW</p>
        <p>North Canton, OH 44720</p>
        <p className="mt-3">weisburnforsheriff@gmail.com</p>
      </div>
      <div className="md:col-span-4">
        <p className="text-[11px] font-black tracking-[0.35em] uppercase" style={{ color: GOLD }}>
          Take Action
        </p>
        <Link
          href="/donate"
          className="block px-5 py-3 mt-3 text-xs font-black tracking-[0.3em] text-center uppercase"
          style={{
            background: RED,
            color: CREAM,
            border: `2px solid ${CREAM}`,
            boxShadow: `4px 4px 0 ${GOLD}`,
          }}
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
      className="px-5 py-3 text-[10px] font-black text-center tracking-[0.4em] uppercase"
      style={{ background: RED_DARK, color: GOLD }}
    >
      ★ Paid for by Weisburn for Sheriff ★
    </div>
  </footer>
);

export const Design6Banner = () => {
  return (
    <div className="min-h-screen" style={{ background: CREAM, color: INK }}>
      <Header />
      <Hero />
      <StatBanner />
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
