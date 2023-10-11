'use client';

import { globalMeta } from '@/components/seo/globalMeta';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const structuredSeo = JSON.stringify({
  "@context": globalMeta.siteUrl,
  "description": "The Website of Stark County Sheriff Representative Eric Weisburn."
});


export default function Home() {

  return (
    <>
      {/* <main className="relative flex flex-col max-w-full mt-3 md:mx-auto md:max-w-7xl">
        <script src="https://cdn.donately.com/dntly-core/1.8/core.min.js" type="text/javascript"></script>
        <div id="donation-form"></div>
      </main> */}
      <main>
      <script src="https://donorbox.org/widget.js" data-paypalExpress="false"></script>
      <div className="flex justify-center mb-10 md:mt-10 md:mb-10">
        <iframe src="https://donorbox.org/embed/weisburn-for-sheriff" name="donorbox" data-allowpaymentrequest="allowpaymentrequest" data-seamless="seamless" data-frameborder="0" scrolling="no" height="900px" width="100%" className="max-w-[500px] min-w-[250px] max-h-none"></iframe>
        <div className="relative hidden w-1/3 my-auto mr-3 overflow-hidden md:inline-block">
          <Image
            src="/ElectWeisburnForSheriff.png"
            width="0"
            height="0"
            sizes="100vw"
            className="w-full bg-yellow-400"
            alt="Weisburn for Sheriff Hero Image" />
        </div>
      </div>
      <div className="flex flex-col mb-4 text-center">
        <div className="p-4 mx-auto bg-gray-300 rounded shadow-md w-fit">
          <span>Checks are accepted and can be made payable to:</span>
          <br />
          <blockquote className="font-bold">
            Weisburn For Sheriff 
            <br />
            1102 Park Village
            <br />
            Louisville, OH 44641
            <br />
            <span className="text-xs font-normal">*Can not accept corporate checks</span>
          </blockquote>
        </div>
      </div>
      </main>
      {/* { toggleRefresh && <div>Please refresh the page. This is only broken for development purposes.</div>} */}
    </>
  )
}
