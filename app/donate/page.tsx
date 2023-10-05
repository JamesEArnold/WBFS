'use client';

import { globalMeta } from '@/components/seo/globalMeta';
import { useEffect, useState } from 'react';

const structuredSeo = JSON.stringify({
  "@context": globalMeta.siteUrl,
  "description": "The Website of Stark County Sheriff Representative Eric Weisburn."
});


export default function Home() {
  const [toggleRefresh, setToggleRefresh] = useState(false);

  useEffect(() => {
    const donately = window.Donately;

    if (donately) {
      donately.init({
        // Make sure selector exists on page
        selector: '#donation-form',
        options: {
          'donately-id': "act_ba7d12ab27bb",
          'stripe-publishable-key': "pk_test_d3yr4pprarMlwNJjQmlF2eGD"
        },
        afterFormLoad: function() {
          console.log('Loaded')
        },
        onSuccess: function() {
          console.log('Success')  
        } 
      });

      setToggleRefresh(false);
    } else {
      setToggleRefresh(true);
    }
  })
  return (
    <>
      <main className="relative flex flex-col max-w-full md:mx-auto md:max-w-7xl">
        <script src="https://cdn.donately.com/dntly-core/1.8/core.min.js" type="text/javascript"></script>
        <div id="donation-form"></div>
      </main>
      { toggleRefresh && <div>Please refresh the page. This is only broken for development purposes.</div>}
    </>
  )
}
