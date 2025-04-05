"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SheriffStar } from '../ui/icons';

// This is a placeholder for the Header component that will be implemented in Phase 2.1
const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <header className="bg-[#fcd34b] py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <SheriffStar size={32} />
            <span className="ml-2 text-xl font-bold">Weisburn for Sheriff</span>
          </Link>
        </div>
        
        {/* Desktop navigation - will be fully implemented in Phase 2.1 */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className={`font-medium ${isActive('/') ? 'text-black' : 'text-gray-800 hover:text-black'}`}>
            Home
          </Link>
          <Link href="/about" className={`font-medium ${isActive('/about') ? 'text-black' : 'text-gray-800 hover:text-black'}`}>
            About
          </Link>
          <Link href="/events" className={`font-medium ${isActive('/events') ? 'text-black' : 'text-gray-800 hover:text-black'}`}>
            Events
          </Link>
          <Link 
            href="/donate" 
            className="bg-black text-[#fcd34b] font-bold py-2 px-4 rounded-md hover:bg-gray-800 transition-colors duration-200"
          >
            Contribute
          </Link>
        </nav>
        
        {/* Mobile menu button - will be fully implemented in Phase 2.1 */}
        <div className="md:hidden">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-black"
          >
            Menu
          </button>
        </div>
      </div>
      
      {/* Mobile menu - will be fully implemented in Phase 2.1 */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <Link href="/" className={`font-medium ${isActive('/') ? 'text-black' : 'text-gray-800'}`}>
                Home
              </Link>
              <Link href="/about" className={`font-medium ${isActive('/about') ? 'text-black' : 'text-gray-800'}`}>
                About
              </Link>
              <Link href="/events" className={`font-medium ${isActive('/events') ? 'text-black' : 'text-gray-800'}`}>
                Events
              </Link>
              <Link 
                href="/donate" 
                className="bg-black text-[#fcd34b] font-bold py-2 px-4 rounded-md w-full text-center"
              >
                Contribute
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header; 
