'use client';

import { HeroSlide } from '@/components/hero-slide';
import { MainNav } from '@/components/main-nav'
import { CallToActionBottom, CallToActionTop } from '@/components/call-to-action';
import { MainAccordion } from '@/components/main-accordion';
import { AboutMe } from '@/components/about-me';
import { Carousel } from '@/components/carousel';
import { Footer } from '@/components/footer';
import Head from 'next/head';
import { Meta } from '@/components/seo/meta';
import { globalMeta } from '@/components/seo/globalMeta';

const structuredSeo = JSON.stringify({
  "@context": globalMeta.siteUrl,
  "description": "The Website of Stark County Sheriff Representative Eric Weisburn."
});

export default function Home() {
  return (
    <>
      <main className="relative flex flex-col max-w-full md:mx-auto md:max-w-7xl">
        <HeroSlide />
        <CallToActionTop />
        <MainAccordion />
        <AboutMe />
        <Carousel />
        <CallToActionBottom />
      </main>
    </>
  )
}
