'use client';

import React from 'react';
import { globalMeta } from '@/components/seo/globalMeta';
import Image from 'next/image';
import Link from 'next/link';
import DonationForm from '@/components/forms/DonationForm';

const structuredSeo = JSON.stringify({
  "@context": globalMeta.siteUrl,
  "description": "The Website of Stark County Sheriff Representative Eric Weisburn."
});

export default function DonatePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-16 bg-white">
        <div className="container relative z-10 px-4 mx-auto text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-wider text-black uppercase md:text-5xl">SUPPORT THE CAMPAIGN</h1>
          <div className="h-1 w-32 bg-[#fcd34b] mx-auto mb-4"></div>
          <p className="max-w-3xl mx-auto text-xl">Your contribution helps Sheriff Weisburn continue serving our community.</p>
        </div>
      </section>

      {/* Contribution Form */}
      <section className="py-16 bg-white">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-center section-title">MAKE A CONTRIBUTION</h2>
            
            <div className="p-8 mt-8 bg-gray-100 rounded-lg shadow-md">
              {/* Integration with existing Donorbox */}
              <script src="https://donorbox.org/widget.js" data-paypalExpress="false"></script>
              <iframe 
                src="https://donorbox.org/embed/weisburn-for-sheriff" 
                name="donorbox" 
                data-allowpaymentrequest="allowpaymentrequest" 
                data-seamless="seamless" 
                data-frameborder="0" 
                scrolling="no" 
                height="900px" 
                width="100%" 
                className="max-w-[500px] min-w-[250px] max-h-none mx-auto"
              ></iframe>
            </div>

            <div className="mt-8 text-sm text-center text-gray-600">
              <p>Contributions to the Sheriff Weisburn Campaign are not tax deductible.</p>
              <p className="mt-2">Paid for by the Committee to Re-Elect Sheriff Weisburn</p>
            </div>

            <div className="max-w-xl p-4 mx-auto mt-8 bg-gray-200 rounded-md shadow-md">
              <p className="mb-2 font-semibold">Checks are accepted and can be made payable to:</p>
              <p className="font-bold">
                Weisburn For Sheriff<br />
                1102 Park Village<br />
                Louisville, OH 44641
              </p>
              <p className="mt-2 text-xs">*Cannot accept corporate checks</p>
            </div>
          </div>
        </div>
      </section>

      {/* Other Ways to Help */}
      <section className="py-16 bg-gray-100">
        <div className="container px-4 mx-auto text-center">
          <h2 className="inline-block section-title">OTHER WAYS TO HELP</h2>
          <p className="max-w-3xl mx-auto mt-4 mb-8">
            Financial contributions are important, but there are many other ways you can support Sheriff Weisburn's campaign.
          </p>
          
          <div className="grid grid-cols-1 gap-8 mt-8 md:grid-cols-3">
            <div className="campaign-card">
              <h3 className="mb-4 text-xl font-bold">Volunteer</h3>
              <p className="mb-4">Join our team of dedicated volunteers who help with events, phone banking, and door-to-door outreach.</p>
              <Link href="/volunteer" className="inline-block campaign-button">
                Sign Up
              </Link>
            </div>
            <div className="campaign-card">
              <h3 className="mb-4 text-xl font-bold">Host an Event</h3>
              <p className="mb-4">Open your home or business for a campaign event or fundraiser to help spread Sheriff Weisburn's message.</p>
              <Link href="/contact" className="inline-block campaign-button">
                Contact Us
              </Link>
            </div>
            <div className="campaign-card">
              <h3 className="mb-4 text-xl font-bold">Spread the Word</h3>
              <p className="mb-4">Share Sheriff Weisburn's campaign with friends, family, and neighbors. Request yard signs or campaign materials.</p>
              <Link href="/contact" className="inline-block campaign-button">
                Get Materials
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
