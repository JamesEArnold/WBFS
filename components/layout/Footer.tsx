"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-8 text-white bg-black">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Campaign Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-[#fcd34b]">Re-Elect Sheriff Weisburn</h3>
            <p className="mb-4">Working for a safer community.</p>
            <p className="text-sm">© {currentYear} Sheriff Weisburn Campaign. All Rights Reserved.</p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-[#fcd34b]">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-[#fcd34b] transition">Home</Link></li>
              <li><Link href="/about" className="hover:text-[#fcd34b] transition">About</Link></li>
              <li><Link href="/events" className="hover:text-[#fcd34b] transition">Events</Link></li>
              <li><Link href="/donate" className="hover:text-[#fcd34b] transition">Contribute</Link></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-[#fcd34b]">Contact</h3>
            <p className="mb-2">1102 Park Village</p>
            <p className="mb-2">Louisville, OH 44641</p>
            <p className="mb-4">weisburnforsheriff@gmail.com</p>
            
            {/* Social Media Links */}
            <div className="flex mt-2 space-x-4">
              <a 
                href="https://www.facebook.com/profile.php?id=61552050077933" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-[#fcd34b] p-2 rounded-full"
              >
                <Image
                  src="/icon-facebook.svg"
                  width="24"
                  height="24"
                  alt="Weisburn for Sheriff Facebook"
                />
              </a>
              <a 
                href="https://instagram.com/weisburnforsheriff" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-[#fcd34b] p-2 rounded-full"
              >
                <Image
                  src="/icon-instagram.svg"
                  width="24"
                  height="24"
                  alt="Weisburn for Sheriff Instagram"
                />
              </a>
            </div>
          </div>
        </div>
        
        <div className="pt-6 mt-8 text-center border-t border-gray-800">
          <p className="text-sm">Paid for by Weisburn for Sheriff</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 
