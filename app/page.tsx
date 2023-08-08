'use client';

import { HeroSlide } from '@/components/hero-slide';
import { MainNav } from '@/components/main-nav'
import { CallToAction } from '@/components/call-to-action';
import { MainAccordion } from '@/components/main-accordion';

export default function Home() {
  return (
      <main className="flex flex-col md:mx-auto md:max-w-7xl">
        <MainNav />
        <HeroSlide />
        <CallToAction />
        <MainAccordion />
      </main>
  )
}
