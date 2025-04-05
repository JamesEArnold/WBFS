'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <header className="bg-[#fcd34b] text-black shadow-md sticky z-10 top-0">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center flex-col md:flex-row">
          <Link href="/" className="mb-4 md:mb-0">
            <div className="flex flex-col items-center md:items-start">
              <div className="text-sm flex items-center justify-center mb-1">
                <span className="mx-1">★</span>
                <span className="mx-1">★</span>
                <span className="mx-1">★</span>
                <span className="italic font-bold">Re-Elect</span>
                <span className="mx-1">★</span>
                <span className="mx-1">★</span>
                <span className="mx-1">★</span>
              </div>
              <div className="text-3xl md:text-4xl font-black tracking-wide">
                SHERIFF
              </div>
              <div className="text-3xl md:text-4xl font-black tracking-wide">
                WEISBURN
              </div>
            </div>
          </Link>
        </div>
        
        <div className="md:hidden">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 focus:outline-none"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        <nav className={`${mobileMenuOpen ? 'block' : 'hidden'} md:block w-full md:w-auto`}>
          <ul className="flex flex-col md:flex-row md:items-center md:gap-1">
            <li>
              <Link
                href="/"
                className={`block py-2 px-4 rounded-md ${isActive('/') ? 'bg-black text-[#fcd34b]' : 'hover:bg-black/10'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className={`block py-2 px-4 rounded-md ${isActive('/about') ? 'bg-black text-[#fcd34b]' : 'hover:bg-black/10'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/events"
                className={`block py-2 px-4 rounded-md ${isActive('/events') ? 'bg-black text-[#fcd34b]' : 'hover:bg-black/10'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Events
              </Link>
            </li>
            <li className="md:ml-4">
              <Link
                href="/donate"
                className="block py-2 px-6 bg-black text-[#fcd34b] rounded-md font-bold hover:bg-gray-800 transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                CONTRIBUTE
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header; 
