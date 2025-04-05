"use client";

import React from 'react';
import Link from 'next/link';

const ContributeBanner = () => {
  return (
    <section className="py-16 bg-black text-white text-center">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Support Sheriff Weisburn's Campaign</h2>
        <p className="text-xl mb-8 max-w-3xl mx-auto">Help us continue building a safer community with your contribution to our campaign.</p>
        <Link href="/donate" className="inline-block bg-[#fcd34b] text-black font-bold py-3 px-8 rounded-md text-xl hover:bg-[#f7c948] transition duration-200">
          CONTRIBUTE TODAY
        </Link>
      </div>
    </section>
  );
};

export default ContributeBanner; 
