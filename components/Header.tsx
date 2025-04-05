'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';

export const Header = () => {
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

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <header className={`sticky top-0 z-50 bg-white text-black transition-shadow duration-300 ${
      scrolled ? 'shadow-md' : 'border-b border-gray-200'
    }`}>
      <div className={`container mx-auto px-4 ${scrolled ? 'py-2' : 'py-4'} flex flex-col md:flex-row items-center justify-between transition-all duration-300`}>
        <div className="flex flex-col items-center md:flex-row">
          <Link href="/" className="mb-2 md:mb-0">
            <div className="flex flex-col items-center md:items-start">
              <div className={`text-sm flex items-center justify-center mb-1 ${scrolled ? 'text-xs' : 'text-sm'} transition-all duration-300`}>
                <span className="mx-1 text-yellow-400">★</span>
                <span className="mx-1 text-yellow-400">★</span>
                <span className="mx-1 text-yellow-400">★</span>
                <span className="italic font-bold">Re-Elect</span>
                <span className="mx-1 text-yellow-400">★</span>
                <span className="mx-1 text-yellow-400">★</span>
                <span className="mx-1 text-yellow-400">★</span>
              </div>
              <div className={`transition-all duration-300 ease-in-out font-black tracking-wide ${
                scrolled ? 'text-lg md:text-xl' : 'text-3xl md:text-4xl'
              }`}>
                SHERIFF
              </div>
              <div className={`transition-all duration-300 ease-in-out font-black tracking-wide ${
                scrolled ? 'text-lg md:text-xl' : 'text-3xl md:text-4xl'
              }`}>
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
                className={`block py-2 px-4 rounded-md ${isActive('/') ? 'bg-black text-yellow-400' : 'hover:bg-gray-100'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className={`block py-2 px-4 rounded-md ${isActive('/about') ? 'bg-black text-yellow-400' : 'hover:bg-gray-100'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/events"
                className={`block py-2 px-4 rounded-md ${isActive('/events') ? 'bg-black text-yellow-400' : 'hover:bg-gray-100'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Events
              </Link>
            </li>
            <li className="md:ml-4">
              <Link
                href="/donate"
                className="block px-6 py-2 font-bold text-yellow-400 transition bg-black rounded-md hover:bg-gray-800"
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
