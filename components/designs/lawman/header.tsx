'use client';

import Link from 'next/link';
import { Logo } from '../logo';
import { ThemedMobileNav } from '../mobile-nav';
import { LAWMAN } from './theme';

const { BLACK, NEAR_BLACK, COAL_LIFT, GOLD, GOLD_BRIGHT, GOLD_LIGHT, CREAM } = LAWMAN;

export const LawmanHeader = () => (
  <header
    className="sticky top-0 z-30"
    style={{ background: BLACK, borderBottom: `1px solid ${COAL_LIFT}` }}
  >
    <div
      className="text-[10px] font-bold tracking-[0.35em] text-center uppercase py-1.5"
      style={{ background: NEAR_BLACK, color: GOLD_BRIGHT }}
    >
      ★ SWORN TO PROTECT — STARK COUNTY, OHIO ★
    </div>
    <div className="flex items-center justify-between max-w-6xl px-5 py-3 mx-auto">
      <Logo height={44} primary={CREAM} accent={GOLD_BRIGHT} />
      <nav
        className="hidden gap-7 text-[11px] font-bold tracking-[0.3em] uppercase md:flex"
        style={{ color: GOLD_LIGHT }}
      >
        <Link href="/" className="hover:text-white">Home</Link>
        <Link href="/about" className="hover:text-white">About</Link>
        <Link href="/time-in-office" className="hover:text-white">In Office</Link>
        <Link href="/events" className="hover:text-white">Events</Link>
        <Link href="/donate" className="hover:text-white">Contribute</Link>
      </nav>
      <div className="flex items-center gap-2">
        <Link
          href="/donate"
          className="hidden px-4 py-2 text-[11px] font-bold tracking-[0.3em] uppercase md:inline-block"
          style={{ background: GOLD, color: BLACK }}
        >
          Donate
        </Link>
        <ThemedMobileNav
          items={[
            { href: '/', label: 'Home' },
            { href: '/about', label: 'About' },
            { href: '/time-in-office', label: 'In Office' },
            { href: '/events', label: 'Events' },
            { href: '/donate', label: 'Contribute' },
          ]}
          bg={BLACK}
          fg={CREAM}
          accent={GOLD}
          ctaBg={GOLD}
          ctaFg={BLACK}
          buttonFg={GOLD_BRIGHT}
        />
      </div>
    </div>
  </header>
);
