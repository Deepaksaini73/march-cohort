"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AlignRight, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-4">
        <div className="flex items-center">
          <Link href="/" className="flex items-center" onClick={closeMenu}>
            <Image 
              src="/images/logos/omtour-logo.jpg" 
              alt="OmTour Logo" 
              width={45} 
              height={45} 
              className="mr-2 rounded-full object-cover"
            />
            <span className="font-bold text-2xl text-blue-600">Om<span className="text-purple-600">Tour</span></span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors">Home</Link>
          <Link href="/tours" className="text-gray-600 hover:text-blue-600 transition-colors">Tours</Link>
          <Link href="/about" className="text-gray-600 hover:text-blue-600 transition-colors">About</Link>
          <Link href="/faq" className="text-gray-600 hover:text-blue-600 transition-colors">FAQ</Link>
          <Link href="/contact" className="text-gray-600 hover:text-blue-600 transition-colors">Contact</Link>
        </nav>
        <div className="flex items-center space-x-3">
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-full text-sm font-medium hidden md:block">Sign In</button>
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors">Book Now</button>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="block md:hidden p-2 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
            aria-label="Toggle mobile menu"
          >
            {isOpen ? <X size={24} /> : <AlignRight size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div 
        className={`
          md:hidden fixed inset-0 z-40 transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Backdrop */}
        <div 
          className={`
            absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300
            ${isOpen ? 'opacity-100' : 'opacity-0'}
          `}
          onClick={closeMenu}
        />
        
        {/* Menu Content */}
        <div className="relative w-4/5 max-w-sm bg-white h-full shadow-xl overflow-y-auto">
          <div className="px-4 py-6 space-y-4">
            <Link 
              href="/" 
              className="block py-3 px-4 text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link 
              href="/tours" 
              className="block py-3 px-4 text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
              onClick={closeMenu}
            >
              Tours
            </Link>
            <Link 
              href="/about" 
              className="block py-3 px-4 text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
              onClick={closeMenu}
            >
              About
            </Link>
            <Link 
              href="/faq" 
              className="block py-3 px-4 text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
              onClick={closeMenu}
            >
              FAQ
            </Link>
            <Link 
              href="/contact" 
              className="block py-3 px-4 text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
              onClick={closeMenu}
            >
              Contact
            </Link>
            
            <div className="pt-4 border-t border-gray-200">
              <button className="w-full py-3 px-4 text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
                Sign In
              </button>
              <button className="w-full mt-2 py-3 px-4 text-base font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg transition-colors">
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;