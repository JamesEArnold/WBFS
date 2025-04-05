"use client";

import React from 'react';
import Link from 'next/link';

// This is a placeholder for the Footer component that will be implemented in Phase 2.2
const Footer = () => {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Campaign Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold text-[#fcd34b] mb-4">Weisburn for Sheriff</h3>
            <p className="mb-4">The official campaign to re-elect Sheriff Eric Weisburn.</p>
            <p className="text-sm text-gray-400">
              Paid for by the Committee to Elect Eric Weisburn.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/" className="hover:text-[#fcd34b] transition-colors duration-200">
                Home
              </Link>
              <Link href="/about" className="hover:text-[#fcd34b] transition-colors duration-200">
                About
              </Link>
              <Link href="/events" className="hover:text-[#fcd34b] transition-colors duration-200">
                Events
              </Link>
              <Link href="/donate" className="hover:text-[#fcd34b] transition-colors duration-200">
                Contribute
              </Link>
            </nav>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <address className="not-italic">
              <p className="mb-2">campaign@weisburnforsheriff.com</p>
              <p className="mb-2">123 Main Street</p>
              <p>Stark County, OH 44718</p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} Committee to Elect Eric Weisburn. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link href="#" className="text-gray-400 hover:text-[#fcd34b]">
                Privacy Policy
              </Link>
              <Link href="#" className="text-gray-400 hover:text-[#fcd34b]">
                Terms of Use
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 
