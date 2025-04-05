'use client';

import { HeroSlide } from '@/components/hero-slide';
import { MainNav } from '@/components/main-nav'
import { CallToActionBottom, CallToActionTop } from '@/components/call-to-action';
import { MainAccordion } from '@/components/main-accordion';
import { AboutMe } from '@/components/about-me';
import { Carousel } from '@/components/carousel';
import Head from 'next/head';
import { Meta } from '@/components/seo/meta';
import { globalMeta } from '@/components/seo/globalMeta';
import PrioritiesSection from '@/components/sections/PrioritiesSection';
import EventsPreviewSection from '@/components/sections/EventsPreviewSection';

const structuredSeo = JSON.stringify({
  "@context": globalMeta.siteUrl,
  "description": "The Website of Stark County Sheriff Representative Eric Weisburn."
});

export default function Home() {
  return (
    <>
      {/* Hero section outside the main container for full-width display */}
      <HeroSlide />
      
      <main className="relative flex flex-col max-w-full md:mx-auto">
        <CallToActionTop />
        <PrioritiesSection />
        <EventsPreviewSection />
        {/* <AboutMe /> */}
        {/* <Carousel /> */}
        <CallToActionBottom />
      </main>
    </>
  )
}
