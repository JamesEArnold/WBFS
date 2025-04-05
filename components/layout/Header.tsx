"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SheriffStar } from '../ui/icons';
import { Menu, X } from 'lucide-react';

// This is a placeholder for the Header component that will be implemented in Phase 2.1
const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const isActive = (path: string) => pathname === path;

  return (
    <header className={`sticky top-0 z-50 bg-[#fcd34b] text-black transition-shadow duration-300 ${
      scrolled ? 'shadow-md' : ''
    }`}>
      <div className={`container mx-auto px-4 ${scrolled ? 'py-2' : 'py-4'} flex justify-between items-center transition-all duration-300`}>
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <SheriffStar size={scrolled ? 24 : 32} className="transition-all duration-300" />
            <span className={`ml-2 font-bold transition-all duration-300 ${
              scrolled ? 'text-xl' : 'text-2xl'
            }`}>Weisburn for Sheriff</span>
          </Link>
        </div>
        
        {/* Desktop navigation - will be fully implemented in Phase 2.1 */}
        <nav className="items-center hidden space-x-6 md:flex">
          <Link href="/" className={`font-medium ${isActive('/') ? 'bg-black text-[#fcd34b] px-4 py-2 rounded-md' : 'hover:bg-black/10 px-4 py-2 rounded-md'}`}>
            Home
          </Link>
          <Link href="/about" className={`font-medium ${isActive('/about') ? 'bg-black text-[#fcd34b] px-4 py-2 rounded-md' : 'hover:bg-black/10 px-4 py-2 rounded-md'}`}>
            About
          </Link>
          <Link href="/events" className={`font-medium ${isActive('/events') ? 'bg-black text-[#fcd34b] px-4 py-2 rounded-md' : 'hover:bg-black/10 px-4 py-2 rounded-md'}`}>
            Events
          </Link>
          <Link 
            href="/donate" 
            className="bg-black text-[#fcd34b] font-bold py-2 px-6 rounded-md hover:bg-gray-800 transition-colors duration-200"
          >
            CONTRIBUTE
          </Link>
        </nav>
        
        {/* Mobile menu button - will be fully implemented in Phase 2.1 */}
        <div className="md:hidden">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 focus:outline-none"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile menu - will be fully implemented in Phase 2.1 */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#fcd34b]">
          <div className="container px-4 py-4 mx-auto">
            <nav className="flex flex-col space-y-2">
              <Link 
                href="/" 
                className={`font-medium py-2 px-4 rounded-md ${isActive('/') ? 'bg-black text-[#fcd34b]' : 'hover:bg-black/10'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/about" 
                className={`font-medium py-2 px-4 rounded-md ${isActive('/about') ? 'bg-black text-[#fcd34b]' : 'hover:bg-black/10'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/events" 
                className={`font-medium py-2 px-4 rounded-md ${isActive('/events') ? 'bg-black text-[#fcd34b]' : 'hover:bg-black/10'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Events
              </Link>
              <Link 
                href="/donate" 
                className="bg-black text-[#fcd34b] font-bold py-2 px-6 rounded-md w-full text-center hover:bg-gray-800 transition-colors duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                CONTRIBUTE
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header; 
