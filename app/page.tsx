'use client';

import { HeroSlide } from '@/components/hero-slide';
import { MainNav } from '@/components/main-nav'
import { CallToActionBottom, CallToActionTop } from '@/components/call-to-action';
import { MainAccordion } from '@/components/main-accordion';
import { AboutMe } from '@/components/about-me';
import { Carousel } from '@/components/carousel';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <>
      <header className="top-0 sticky z-50 shadow-md">
        <MainNav />
      </header>
      <main className="relative flex flex-col md:mx-auto md:max-w-7xl">
        <HeroSlide />
        <CallToActionTop />
        <MainAccordion />
        <AboutMe />
        <Carousel />
        <CallToActionBottom />
        <Footer />
      </main>
    </>
  )
}
