'use client';

import { usePathname } from 'next/navigation';
import { MainNav } from './main-nav';
import { Footer } from './footer';

export const SiteHeader = () => {
  const pathname = usePathname();
  if (pathname === '/') return null;
  return <MainNav />;
};

export const SiteFooter = () => {
  const pathname = usePathname();
  if (pathname === '/') return null;
  return <Footer />;
};
