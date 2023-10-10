'use client';

import { globalMeta } from '@/components/seo/globalMeta';
import { useEffect, useState } from 'react';

const structuredSeo = JSON.stringify({
  "@context": globalMeta.siteUrl,
  "description": "The Website of Stark County Sheriff Representative Eric Weisburn."
});


export default function Home() {

  return (
    <>
    <div className="flex justify-center py-10 h-1/2">
      <span className="py-6 text-2xl text-center">Donations will be live as soon as possible. <br /> Please check back soon.</span>
    </div>
      {/* <main className="relative flex flex-col max-w-full mt-3 md:mx-auto md:max-w-7xl">
        <script src="https://cdn.donately.com/dntly-core/1.8/core.min.js" type="text/javascript"></script>
        <div id="donation-form"></div>
      </main> */}
      {/* { toggleRefresh && <div>Please refresh the page. This is only broken for development purposes.</div>} */}
    </>
  )
}
