'use client';

import Image from 'next/image';
import Link from 'next/link';
import { EmailSignupForm } from '@/components/ui/email-signup';
import { VolunteerSignupForm } from '@/components/ui/volunteer-signup';
import { ThemedMobileNav } from './mobile-nav';
import { Logo } from './logo';

const NAVY = '#2a0c0c';
const RED = '#b91c1c';
const RED_DEEP = '#7a1212';
const GOLD = '#d4a843';
const CREAM = '#fffaf0';

const Star = ({ size = 14, color = GOLD }: { size?: number; color?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill={color}
    width={size}
    height={size}
    aria-hidden
    className="inline-block"
  >
    <path d="M12 2.5l2.6 6.4 6.9.5-5.3 4.5 1.7 6.7L12 17l-5.9 3.6 1.7-6.7L2.5 9.4l6.9-.5z" />
  </svg>
);

const Stripes = () => (
  <div
    aria-hidden
    className="absolute inset-x-0 bottom-0 h-3"
    style={{
      backgroundImage:
        'repeating-linear-gradient(90deg, #b91c1c 0 32px, #ffffff 32px 64px)',
    }}
  />
);

const Header = () => (
  <header className="relative" style={{ background: NAVY }}>
    <div
      className="flex items-center justify-center gap-2 py-1 text-[11px] font-bold tracking-[0.25em] uppercase"
      style={{ background: RED, color: CREAM }}
    >
      <Star size={10} color={GOLD} />
      Stark County, Ohio
      <Star size={10} color={GOLD} />
    </div>
    <nav className="flex items-center justify-between max-w-6xl px-5 py-3 mx-auto">
      <Logo height={44} primary={CREAM} accent={GOLD} />
      <div className="hidden gap-7 text-sm font-bold tracking-widest text-white uppercase md:flex">
        <Link href="/" className="hover:text-yellow-300">Home</Link>
        <Link href="/about" className="hover:text-yellow-300">About</Link>
        <Link href="/events" className="hover:text-yellow-300">Events</Link>
      </div>
      <div className="flex items-center gap-2">
        <Link
          href="/donate"
          className="hidden px-4 py-2 text-xs font-bold tracking-widest uppercase rounded-md md:inline-block"
          style={{ background: RED, color: CREAM, boxShadow: `0 0 0 2px ${GOLD}` }}
        >
          Contribute
        </Link>
        <ThemedMobileNav
          items={[
            { href: '/', label: 'Home' },
            { href: '/about', label: 'About' },
            { href: '/events', label: 'Events' },
            { href: '/donate', label: 'Contribute' },
          ]}
          bg={NAVY}
          fg={CREAM}
          accent={GOLD}
          ctaBg={RED}
          ctaFg={CREAM}
          buttonFg={CREAM}
        />
      </div>
    </nav>
  </header>
);

const Hero = () => (
  <section className="relative overflow-hidden" style={{ background: NAVY }}>
    <div
      aria-hidden
      className="absolute inset-0 opacity-[0.07]"
      style={{
        backgroundImage:
          'radial-gradient(circle, #ffffff 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}
    />
    <div className="relative grid items-center max-w-6xl gap-8 px-5 pt-12 pb-20 mx-auto md:grid-cols-2 md:pt-16">
      <div className="text-center md:text-left">
        <div className="flex items-center justify-center gap-3 mb-5 md:justify-start">
          <span className="h-px w-10" style={{ background: GOLD }} />
          <span className="text-xs font-bold tracking-[0.4em] uppercase" style={{ color: GOLD }}>
            Re-Elect 2028
          </span>
          <span className="h-px w-10" style={{ background: GOLD }} />
        </div>
        <h1
          className="font-serif font-black uppercase leading-[0.9] text-white"
          style={{ fontSize: 'clamp(3rem, 8vw, 5.5rem)', letterSpacing: '0.01em' }}
        >
          Sheriff
          <span className="block" style={{ color: GOLD }}>
            Eric Weisburn
          </span>
        </h1>
        <p className="mt-5 text-base text-white/80 md:text-lg">
          A proven leader. 31 years of service. A Sheriff who works for{' '}
          <span className="font-bold" style={{ color: GOLD }}>YOU</span>.
        </p>
        <div className="flex flex-col items-center justify-center gap-3 mt-8 md:flex-row md:justify-start">
          <Link
            href="/donate"
            className="px-8 py-4 text-sm font-bold tracking-widest uppercase rounded-md"
            style={{ background: RED, color: CREAM, boxShadow: `0 4px 0 ${GOLD}` }}
          >
            Contribute Today
          </Link>
          <Link
            href="/about"
            className="px-8 py-4 text-sm font-bold tracking-widest uppercase rounded-md border-2"
            style={{ borderColor: GOLD, color: CREAM }}
          >
            Meet The Sheriff
          </Link>
        </div>
      </div>
      <div className="relative mx-auto w-[280px] md:w-full md:max-w-[420px]">
        <div
          className="absolute -inset-3 rounded-full"
          style={{ background: `conic-gradient(${GOLD}, ${RED}, ${GOLD}, ${RED}, ${GOLD})` }}
          aria-hidden
        />
        <div
          className="relative aspect-square overflow-hidden rounded-full border-[6px]"
          style={{ borderColor: NAVY }}
        >
          <Image
            src="/post-election/head-shot-with-hat.jpg"
            alt="Sheriff Eric Weisburn"
            fill
            sizes="420px"
            className="object-cover object-top"
            priority
          />
        </div>
        <div
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-4 py-2 text-[10px] md:text-xs font-bold tracking-[0.2em] md:tracking-[0.25em] uppercase rounded-full whitespace-nowrap"
          style={{ background: GOLD, color: NAVY }}
        >
          ★ Stark County Sheriff ★
        </div>
      </div>
    </div>
    <Stripes />
  </section>
);

const GolfBanner = () => (
  <Link
    href="/events/golf-fundraiser-3"
    className="block transition-transform hover:-translate-y-0.5"
  >
    <div
      className="relative max-w-5xl px-5 py-5 mx-auto -mt-6 overflow-hidden text-center rounded-md md:mt-10"
      style={{ background: CREAM, border: `3px solid ${NAVY}` }}
    >
      <div
        className="absolute inset-y-0 left-0 w-3"
        style={{ background: RED }}
      />
      <div
        className="absolute inset-y-0 right-0 w-3"
        style={{ background: RED }}
      />
      <p className="text-xs font-bold tracking-[0.3em] uppercase" style={{ color: RED }}>
        ★ Save The Date ★
      </p>
      <h3
        className="mt-1 font-serif text-2xl font-black uppercase md:text-3xl"
        style={{ color: NAVY }}
      >
        Annual Golf Fundraiser
      </h3>
      <p className="mt-1 text-sm font-semibold" style={{ color: NAVY }}>
        Friday, September 18th &nbsp;·&nbsp; View Event Details &rarr;
      </p>
    </div>
  </Link>
);

const Pillars = () => {
  const cards = [
    {
      tag: 'Get Involved',
      title: 'Upcoming Events',
      body: 'Join us at parades, rallies, and community gatherings across Stark County. Check back for our latest scheduled appearances.',
      href: '/events',
      cta: 'See Events',
    },
    {
      tag: 'Boots on the Ground',
      title: 'Volunteer With Us',
      body: 'Stand by my side as we fight for a better Stark County. Yard signs, parades, phone banks — every action matters.',
      href: '#volunteer',
      cta: 'Sign Up',
    },
    {
      tag: 'Fund the Fight',
      title: 'Contribute',
      body: 'Your donation will make a huge impact. Thank you for your support of a Sheriff who works for you.',
      href: '/donate',
      cta: 'Donate',
    },
  ];
  return (
    <section className="px-5 py-20" style={{ background: CREAM }}>
      <div className="max-w-6xl mx-auto">
        <p className="text-xs font-bold tracking-[0.3em] text-center uppercase" style={{ color: RED }}>
          ★ Three Ways To Help ★
        </p>
        <h2
          className="mt-2 font-serif text-4xl font-black text-center uppercase md:text-5xl"
          style={{ color: NAVY }}
        >
          Stand With The Sheriff
        </h2>
        <div className="grid gap-6 mt-12 md:grid-cols-3">
          {cards.map((c) => (
            <div
              key={c.title}
              className="relative flex flex-col p-7 rounded-lg shadow-md"
              style={{ background: 'white', border: `2px solid ${NAVY}` }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-2"
                style={{ background: RED }}
              />
              <Star color={GOLD} size={20} />
              <p
                className="mt-3 text-[10px] font-bold tracking-[0.3em] uppercase"
                style={{ color: RED }}
              >
                {c.tag}
              </p>
              <h3
                className="mt-1 font-serif text-2xl font-bold uppercase"
                style={{ color: NAVY }}
              >
                {c.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-700">{c.body}</p>
              <Link
                href={c.href}
                className="inline-flex items-center self-start gap-2 mt-6 text-xs font-bold tracking-widest uppercase"
                style={{ color: NAVY }}
              >
                {c.cta} <span style={{ color: RED }}>&rarr;</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const About = () => (
  <section className="px-5 py-20" style={{ background: 'white' }}>
    <div className="grid items-center max-w-6xl gap-10 mx-auto md:grid-cols-2">
      <div className="relative">
        <div
          className="absolute -top-3 -left-3 w-20 h-20"
          aria-hidden
          style={{ background: RED }}
        />
        <div
          className="absolute -bottom-3 -right-3 w-20 h-20"
          aria-hidden
          style={{ background: GOLD }}
        />
        <div className="relative overflow-hidden">
          <Image
            src="/photos/weisburn-parade-1.jpg"
            alt="Sheriff Weisburn at parade"
            width={800}
            height={1000}
            sizes="(max-width: 768px) 100vw, 600px"
            className="w-full h-auto"
          />
        </div>
      </div>
      <div>
        <p className="text-xs font-bold tracking-[0.3em] uppercase" style={{ color: RED }}>
          ★ About The Sheriff ★
        </p>
        <h2
          className="mt-2 font-serif text-4xl font-black uppercase md:text-5xl"
          style={{ color: NAVY }}
        >
          Meet Sheriff Weisburn
        </h2>
        <p className="mt-5 text-lg leading-relaxed text-gray-800">
          Sheriff Weisburn has proven experience and commitment to the citizens of Stark County. With his strong sense of duty, he will always lead the Sheriff's Office from the frontline. Place your trust in Sheriff Weisburn — a Sheriff who works for{' '}
          <span
            className="px-2 font-bold"
            style={{ background: GOLD, color: NAVY }}
          >
            YOU!
          </span>
        </p>
        <div
          className="p-5 mt-6 border-l-4"
          style={{ borderColor: RED, background: CREAM }}
        >
          <p className="font-serif text-2xl font-bold italic md:text-3xl" style={{ color: NAVY }}>
            “Action starts <span style={{ color: RED }}>NOW.</span>”
          </p>
        </div>
        <Link
          href="/about"
          className="inline-block px-7 py-3 mt-8 text-xs font-bold tracking-widest uppercase rounded-md"
          style={{ background: NAVY, color: CREAM }}
        >
          Read His Story
        </Link>
      </div>
    </div>
  </section>
);

const Gallery = () => (
  <section className="px-5 py-16" style={{ background: NAVY }}>
    <div className="max-w-6xl mx-auto">
      <p className="text-xs font-bold tracking-[0.3em] text-center uppercase" style={{ color: GOLD }}>
        ★ Out In The Community ★
      </p>
      <h2 className="mt-2 font-serif text-4xl font-black text-center text-white uppercase">
        On The Trail
      </h2>
      <div className="grid gap-4 mt-10 md:grid-cols-2">
        {[
          { src: '/photos/parade-group-2.jpg', cap: 'Stark County Parade' },
          { src: '/flag.jpg', cap: 'Service & Country' },
        ].map((p) => (
          <div
            key={p.src}
            className="relative overflow-hidden border-4"
            style={{ borderColor: GOLD }}
          >
            <Image
              src={p.src}
              alt={p.cap}
              width={1200}
              height={800}
              sizes="(max-width: 768px) 100vw, 600px"
              className="w-full h-[20rem] object-cover"
            />
            <div
              className="absolute bottom-0 left-0 px-4 py-2 text-xs font-bold tracking-widest uppercase"
              style={{ background: RED, color: CREAM }}
            >
              {p.cap}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const VolunteerSection = () => (
  <section id="volunteer" className="px-5 py-20" style={{ background: CREAM }}>
    <div className="max-w-2xl mx-auto text-center">
      <p className="text-xs font-bold tracking-[0.3em] uppercase" style={{ color: RED }}>
        ★ Boots On The Ground ★
      </p>
      <h2 className="mt-2 font-serif text-4xl font-black uppercase" style={{ color: NAVY }}>
        Volunteer
      </h2>
      <p className="mt-4 text-lg text-gray-700">
        I need boots on the ground. Stand by my side as I fight for a better Stark County. Are <span className="font-bold">YOU</span> with me?
      </p>
      <div
        className="p-6 mt-8 text-left bg-white rounded-lg shadow-md"
        style={{ border: `2px solid ${NAVY}` }}
      >
        <VolunteerSignupForm />
      </div>
    </div>
  </section>
);

const GetInvolved = () => (
  <section className="px-5 py-20" style={{ background: RED }}>
    <div className="max-w-2xl mx-auto text-center" style={{ color: CREAM }}>
      <p className="text-xs font-bold tracking-[0.3em] uppercase" style={{ color: CREAM }}>
        ★ Stay Updated ★
      </p>
      <h2 className="mt-2 font-serif text-4xl font-black text-white uppercase md:text-5xl">
        Join Our Effort
      </h2>
      <p className="mt-3 text-white/90">
        Sign up to receive updates on the campaign and upcoming events.
      </p>
      <div className="mt-6">
        <EmailSignupForm />
      </div>
      <div className="flex justify-center gap-3 mt-6">
        <a href="https://www.facebook.com/profile.php?id=61552050077933" aria-label="Facebook">
          <Image src="/icon-facebook.svg" width={44} height={44} alt="Facebook" />
        </a>
        <a href="https://instagram.com/weisburnforsheriff" aria-label="Instagram">
          <Image src="/icon-instagram.svg" width={42} height={42} alt="Instagram" className="mt-[2px]" />
        </a>
      </div>
    </div>
  </section>
);

const FooterDesign = () => (
  <footer style={{ background: NAVY, color: CREAM }}>
    <div
      aria-hidden
      className="h-2"
      style={{
        backgroundImage: 'repeating-linear-gradient(90deg, #b91c1c 0 32px, #ffffff 32px 64px)',
      }}
    />
    <div className="grid max-w-6xl gap-8 px-5 py-14 mx-auto md:grid-cols-3">
      <div>
        <Logo height={80} variant="stacked" primary={CREAM} accent={GOLD} />
        <p className="mt-5 text-sm text-white/75">
          A proven Sheriff. A trusted leader. A Sheriff who works for you.
        </p>
      </div>
      <div className="text-sm">
        <p className="text-[11px] font-bold tracking-[0.3em] uppercase" style={{ color: GOLD }}>
          Headquarters
        </p>
        <p className="mt-2 text-white/80">4849 Tree Line Circle NW</p>
        <p className="text-white/80">North Canton, OH 44720</p>
        <p className="mt-3 text-white/80">weisburnforsheriff@gmail.com</p>
      </div>
      <div>
        <p className="text-[11px] font-bold tracking-[0.3em] uppercase" style={{ color: GOLD }}>
          Take Action
        </p>
        <Link
          href="/donate"
          className="block px-5 py-3 mt-3 text-xs font-bold tracking-widest text-center uppercase rounded-md"
          style={{ background: RED, color: CREAM, boxShadow: `0 0 0 2px ${GOLD}` }}
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
    <div className="px-5 py-3 text-[11px] text-center tracking-[0.2em] uppercase" style={{ background: '#061735', color: GOLD }}>
      Paid for by Weisburn for Sheriff
    </div>
  </footer>
);

export const Design1OldGlory = () => {
  return (
    <div className="min-h-screen" style={{ background: CREAM }}>
      <Header />
      <Hero />
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
