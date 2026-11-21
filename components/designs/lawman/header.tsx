'use client';

import Link from 'next/link';
import { Logo } from '../logo';
import { ThemedMobileNav } from '../mobile-nav';
import { LAWMAN } from './theme';

const { BLACK, NEAR_BLACK, COAL_LIFT, GOLD, GOLD_BRIGHT, GOLD_LIGHT, CREAM } = LAWMAN;

export type NavLink = { label: string; href: string };

export type LawmanHeaderProps = {
  tagline: string;
  nav: NavLink[];
  cta: NavLink;
  mobileCta: NavLink;
};

export const LawmanHeader = ({ tagline, nav, cta, mobileCta }: LawmanHeaderProps) => (
  <header
    className="sticky top-0 z-30"
    style={{ background: BLACK, borderBottom: `1px solid ${COAL_LIFT}` }}
  >
    <div
      className="text-[10px] font-bold tracking-[0.35em] text-center uppercase py-1.5"
      style={{ background: NEAR_BLACK, color: GOLD_BRIGHT }}
    >
      ★ {tagline} ★
    </div>
    <div className="flex items-center justify-between max-w-6xl px-5 py-3 mx-auto">
      <Logo height={44} primary={CREAM} accent={GOLD_BRIGHT} />
      <nav
        className="hidden gap-7 text-[11px] font-bold tracking-[0.3em] uppercase md:flex"
        style={{ color: GOLD_LIGHT }}
      >
        {nav.map((item) => (
          <Link key={`${item.href}-${item.label}`} href={item.href} className="hover:text-white">
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="flex items-center gap-2">
        <Link
          href={cta.href}
          className="hidden px-4 py-2 text-[11px] font-bold tracking-[0.3em] uppercase md:inline-block"
          style={{ background: GOLD, color: BLACK }}
        >
          {cta.label}
        </Link>
        <ThemedMobileNav
          items={nav}
          cta={mobileCta}
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
