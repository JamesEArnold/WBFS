'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Logo } from '../logo';
import { LAWMAN } from './theme';

const { BLACK, NEAR_BLACK, GOLD, GOLD_BRIGHT, CREAM, BODY } = LAWMAN;

export const LawmanFooter = () => (
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
          A proven Sheriff. A career in service. Sworn to protect Stark County.
        </p>
      </div>
      <div className="md:col-span-3 text-sm" style={{ color: CREAM }}>
        <p className="text-[11px] font-bold tracking-[0.35em] uppercase" style={{ color: GOLD_BRIGHT }}>
          Headquarters
        </p>
        <p className="mt-2">4849 Tree Line Circle NW</p>
        <p>North Canton, OH 44720</p>
        <p className="mt-3">weisburnforsheriff@gmail.com</p>
      </div>
      <div className="md:col-span-4">
        <p className="text-[11px] font-bold tracking-[0.35em] uppercase" style={{ color: GOLD_BRIGHT }}>
          Take Action
        </p>
        <Link
          href="/donate"
          className="block px-5 py-3 mt-3 text-xs font-bold tracking-[0.3em] text-center uppercase"
          style={{ background: GOLD, color: BLACK }}
        >
          Contribute
        </Link>
        <div className="flex gap-3 mt-4">
          <a
            href="https://www.facebook.com/profile.php?id=61552050077933"
            aria-label="Facebook"
            className="flex items-center justify-center w-10 h-10 rounded-full transition-colors hover:opacity-90"
            style={{ background: GOLD_BRIGHT }}
          >
            <Image src="/icon-facebook.svg" width={22} height={22} alt="Facebook" />
          </a>
          <a
            href="https://instagram.com/weisburnforsheriff"
            aria-label="Instagram"
            className="flex items-center justify-center w-10 h-10 rounded-full transition-colors hover:opacity-90"
            style={{ background: GOLD_BRIGHT }}
          >
            <Image src="/icon-instagram.svg" width={20} height={20} alt="Instagram" />
          </a>
        </div>
      </div>
    </div>
    <div
      className="px-5 py-3 text-[10px] font-bold text-center tracking-[0.4em] uppercase"
      style={{ background: NEAR_BLACK, color: GOLD_BRIGHT }}
    >
      ★ Paid for by Weisburn for Sheriff ★
    </div>
  </footer>
);
