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
      <section className="campaign-hero py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">SUPPORT THE CAMPAIGN</h1>
          <p className="text-xl max-w-3xl mx-auto">Your contribution helps Sheriff Weisburn continue serving our community.</p>
        </div>
      </section>

      {/* Contribution Form */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="section-title text-center">MAKE A CONTRIBUTION</h2>
            
            <div className="bg-gray-100 p-8 rounded-lg shadow-md mt-8">
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

            <div className="mt-8 text-center text-sm text-gray-600">
              <p>Contributions to the Sheriff Weisburn Campaign are not tax deductible.</p>
              <p className="mt-2">Paid for by the Committee to Re-Elect Sheriff Weisburn</p>
            </div>

            <div className="p-4 mx-auto bg-gray-200 rounded-md shadow-md mt-8 max-w-xl">
              <p className="font-semibold mb-2">Checks are accepted and can be made payable to:</p>
              <p className="font-bold">
                Weisburn For Sheriff<br />
                1102 Park Village<br />
                Louisville, OH 44641
              </p>
              <p className="text-xs mt-2">*Cannot accept corporate checks</p>
            </div>
          </div>
        </div>
      </section>

      {/* Other Ways to Help */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="section-title inline-block">OTHER WAYS TO HELP</h2>
          <p className="max-w-3xl mx-auto mb-8 mt-4">
            Financial contributions are important, but there are many other ways you can support Sheriff Weisburn's campaign.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div className="campaign-card">
              <h3 className="text-xl font-bold mb-4">Volunteer</h3>
              <p className="mb-4">Join our team of dedicated volunteers who help with events, phone banking, and door-to-door outreach.</p>
              <Link href="/volunteer" className="campaign-button inline-block">
                Sign Up
              </Link>
            </div>
            <div className="campaign-card">
              <h3 className="text-xl font-bold mb-4">Host an Event</h3>
              <p className="mb-4">Open your home or business for a campaign event or fundraiser to help spread Sheriff Weisburn's message.</p>
              <Link href="/contact" className="campaign-button inline-block">
                Contact Us
              </Link>
            </div>
            <div className="campaign-card">
              <h3 className="text-xl font-bold mb-4">Spread the Word</h3>
              <p className="mb-4">Share Sheriff Weisburn's campaign with friends, family, and neighbors. Request yard signs or campaign materials.</p>
              <Link href="/contact" className="campaign-button inline-block">
                Get Materials
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
