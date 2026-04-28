'use client';

import { useEffect, useState } from 'react';

export type Design = 1 | 2 | 3 | 4 | 5 | 6;

const STORAGE_KEY = 'wbfs-design';

export const designLabels: Record<Design, { name: string; tagline: string }> = {
  1: { name: 'Old Glory', tagline: 'Patriotic red & gold' },
  2: { name: 'Editorial', tagline: 'Magazine-style serif' },
  3: { name: 'Authority', tagline: 'Maroon & gold civic' },
  4: { name: 'Documentary', tagline: 'Cinematic charcoal & red' },
  5: { name: 'Lawman', tagline: 'Black & gold sheriff badge' },
  6: { name: 'Banner', tagline: 'Classic campaign poster' },
};

const isDesign = (n: number): n is Design => [1, 2, 3, 4, 5, 6].includes(n);

export const useDesign = () => {
  const [design, setDesignState] = useState<Design>(1);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let next: Design = 1;
    try {
      const url = new URLSearchParams(window.location.search).get('d');
      const stored = localStorage.getItem(STORAGE_KEY);
      const raw = url ?? stored;
      const parsed = raw ? Number(raw) : NaN;
      if (!Number.isNaN(parsed) && isDesign(parsed)) next = parsed;
    } catch {}
    setDesignState(next);
    setHydrated(true);
  }, []);

  const setDesign = (d: Design) => {
    setDesignState(d);
    try {
      localStorage.setItem(STORAGE_KEY, String(d));
      const url = new URL(window.location.href);
      url.searchParams.set('d', String(d));
      window.history.replaceState({}, '', url.toString());
    } catch {}
  };

  return { design, setDesign, hydrated };
};
