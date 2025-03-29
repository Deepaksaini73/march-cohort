"use client";

import { useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-4">
        <div className="flex items-center">
          <Link href="/" className="font-bold text-2xl text-blue-600">Om<span className="text-purple-600">Tour</span></Link>
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
            className="md:hidden p-2"
            aria-label="Toggle mobile menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-16 inset-x-0 bg-white shadow-lg z-50 py-4 border-b">
          <div className="px-4 space-y-2">
            <Link href="/" className="block py-2 text-sm font-medium text-gray-700">Home</Link>
            <Link href="/tours" className="block py-2 text-sm font-medium text-gray-700">Tours</Link>
            <Link href="/about" className="block py-2 text-sm font-medium text-gray-700">About</Link>
            <Link href="/faq" className="block py-2 text-sm font-medium text-gray-700">FAQ</Link>
            <Link href="/contact" className="block py-2 text-sm font-medium text-gray-700">Contact</Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar; 