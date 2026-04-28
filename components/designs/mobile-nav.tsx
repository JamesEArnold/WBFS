'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

interface NavItem {
  href: string;
  label: string;
}

interface ThemedMobileNavProps {
  items: NavItem[];
  bg: string;
  fg: string;
  accent: string;
  ctaBg: string;
  ctaFg: string;
  buttonBg?: string;
  buttonFg?: string;
}

export const ThemedMobileNav = ({
  items,
  bg,
  fg,
  accent,
  ctaBg,
  ctaFg,
  buttonBg = 'transparent',
  buttonFg,
}: ThemedMobileNavProps) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <button
        aria-label="Open menu"
        onClick={() => setOpen(true)}
        className="flex items-center justify-center w-10 h-10 rounded md:hidden"
        style={{ background: buttonBg, color: buttonFg ?? fg }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
          <line x1="4" y1="7" x2="20" y2="7" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="17" x2="20" y2="17" />
        </svg>
      </button>
      {open && (
        <div
          className="fixed inset-0 z-[80] flex flex-col md:hidden"
          style={{ background: bg, color: fg }}
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-center justify-end px-5 py-5">
            <button
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center w-10 h-10 rounded"
              style={{ color: fg }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="18" y1="6" x2="6" y2="18" />
              </svg>
            </button>
          </div>
          <nav className="flex flex-col gap-2 px-7 py-6">
            {items.map((it) => (
              <Link
                key={it.href}
                href={it.href}
                onClick={() => setOpen(false)}
                className="py-3 text-3xl font-serif font-bold tracking-wide uppercase border-b"
                style={{ borderColor: accent, color: fg }}
              >
                {it.label}
              </Link>
            ))}
          </nav>
          <div className="px-7 mt-6">
            <Link
              href="/donate"
              onClick={() => setOpen(false)}
              className="block w-full px-6 py-4 text-center text-sm font-bold tracking-[0.3em] uppercase rounded-md"
              style={{ background: ctaBg, color: ctaFg }}
            >
              Contribute
            </Link>
          </div>
        </div>
      )}
    </>
  );
};
