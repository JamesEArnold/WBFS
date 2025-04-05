"use client";

import React from 'react';
import Link from 'next/link';
import { SheriffStar } from '../ui/icons';

// This is a placeholder for the HeroSection component that will be implemented in Phase 2.3
const HeroSection = () => {
  return (
    <section className="bg-gradient-to-b from-[#fcd34b] to-[#fcd34b]/70 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Text column */}
          <div>
            <div className="flex items-center mb-4">
              <SheriffStar size={28} />
              <SheriffStar size={28} className="ml-2" />
              <span className="ml-3 text-xl font-bold">RE-ELECT</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Sheriff Eric Weisburn</h1>
            <p className="text-xl mb-6">Dedicated to serving and protecting Stark County with integrity and experience.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/donate" 
                className="bg-black text-[#fcd34b] font-bold py-3 px-6 rounded-md hover:bg-gray-800 transition-colors duration-200 text-center"
              >
                Contribute
              </Link>
              <Link 
                href="/about" 
                className="bg-transparent text-black border-2 border-black font-bold py-3 px-6 rounded-md hover:bg-black hover:text-[#fcd34b] transition-colors duration-200 text-center"
              >
                Learn More
              </Link>
            </div>
          </div>
          
          {/* Image column - will be implemented with actual sheriff image */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-64 h-64 md:w-96 md:h-96 bg-gray-300 rounded-md">
                {/* Placeholder for sheriff image */}
                <div className="flex items-center justify-center h-full">
                  <span className="text-gray-500">Sheriff Image</span>
                </div>
              </div>
              {/* Stylized border to be implemented */}
              <div className="absolute -bottom-4 -right-4 w-64 h-64 md:w-96 md:h-96 border-4 border-black rounded-md"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 
