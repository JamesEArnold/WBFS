'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Logo } from '../logo';
import { LAWMAN } from './theme';

const { BLACK, NEAR_BLACK, GOLD, GOLD_BRIGHT, CREAM, BODY } = LAWMAN;

export type LawmanFooterProps = {
  blurb: string;
  hqHeading: string;
  addressLines: string[];
  email?: string | null;
  actionHeading: string;
  cta: { label: string; href: string };
  facebookUrl?: string | null;
  instagramUrl?: string | null;
  disclaimer: string;
};

export const LawmanFooter = ({
  blurb,
  hqHeading,
  addressLines,
  email,
  actionHeading,
  cta,
  facebookUrl,
  instagramUrl,
  disclaimer,
}: LawmanFooterProps) => (
  <footer style={{ background: BLACK }}>
    <div
      aria-hidden
      className="h-1"
      style={{ background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)` }}
    />
    <div className="grid max-w-6xl gap-10 px-5 py-16 mx-auto md:grid-cols-12">
      <div className="md:col-span-5">
        <Logo height={84} variant="stacked" primary={CREAM} accent={GOLD_BRIGHT} />
        <p className="max-w-sm mt-5 text-sm leading-relaxed" style={{ color: BODY }}>
          {blurb}
        </p>
      </div>
      <div className="md:col-span-3 text-sm" style={{ color: CREAM }}>
        <p className="text-[11px] font-bold tracking-[0.35em] uppercase" style={{ color: GOLD_BRIGHT }}>
          {hqHeading}
        </p>
        {addressLines.map((line, i) => (
          <p key={line} className={i === 0 ? 'mt-2' : undefined}>
            {line}
          </p>
        ))}
        {email && <p className="mt-3">{email}</p>}
      </div>
      <div className="md:col-span-4">
        <p className="text-[11px] font-bold tracking-[0.35em] uppercase" style={{ color: GOLD_BRIGHT }}>
          {actionHeading}
        </p>
        <Link
          href={cta.href}
          className="block px-5 py-3 mt-3 text-xs font-bold tracking-[0.3em] text-center uppercase"
          style={{ background: GOLD, color: BLACK }}
        >
          {cta.label}
        </Link>
        <div className="flex gap-3 mt-4">
          {facebookUrl && (
          <a
            href={facebookUrl}
            aria-label="Facebook"
            className="flex items-center justify-center w-10 h-10 rounded-full transition-colors hover:opacity-90"
            style={{ background: GOLD_BRIGHT }}
          >
            <Image src="/icon-facebook.svg" width={22} height={22} alt="Facebook" />
          </a>
          )}
          {instagramUrl && (
          <a
            href={instagramUrl}
            aria-label="Instagram"
            className="flex items-center justify-center w-10 h-10 rounded-full transition-colors hover:opacity-90"
            style={{ background: GOLD_BRIGHT }}
          >
            <Image src="/icon-instagram.svg" width={20} height={20} alt="Instagram" />
          </a>
          )}
        </div>
      </div>
    </div>
    <div
      className="px-5 py-3 text-[10px] font-bold text-center tracking-[0.4em] uppercase"
      style={{ background: NEAR_BLACK, color: GOLD_BRIGHT }}
    >
      ★ {disclaimer} ★
    </div>
  </footer>
);
