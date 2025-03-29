"use client";

import { useState } from 'react';
import Link from 'next/link';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';

interface NavItemProps {
  title: string;
  href: string;
  hasDropdown?: boolean;
}

const NavItem = ({ title, href, hasDropdown = false }: NavItemProps) => {
  return (
    <Link href={href} className="navbar-item px-3 text-gray-700 hover:text-gray-900 text-sm font-medium flex items-center">
      {title}
      {hasDropdown && (
        <svg 
          className="dropdown-icon ml-1" 
          width="10" 
          height="6" 
          viewBox="0 0 10 6" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
    </Link>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-black text-white py-2 px-4 text-center">
        <div className="container mx-auto flex justify-between items-center">
          <div className="hidden sm:block"></div>
          <div className="flex items-center justify-center flex-grow">
            <svg className="w-4 h-4 mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-xs md:text-sm">Unlock the Magic of Travel with Travila - Your Gateway to Extraordinary Experiences</span>
          </div>
          <a href="#" className="text-primary text-xs md:text-sm font-medium flex items-center ml-2 flex-shrink-0 hidden sm:flex">
            Get This Now
            <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>

      {/* Main Navbar */}
      <header className="navbar bg-white border-b border-gray-100">
        <div className="container mx-auto h-full px-4 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="navbar-logo flex items-center">
              <Logo />
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center space-x-1">
            <NavItem title="Home" href="/" hasDropdown />
            <NavItem title="Tours" href="/tours" hasDropdown />
            <NavItem title="About" href="/about" />
            <NavItem title="Destinations" href="/destinations" hasDropdown />
            <NavItem title="Activities" href="/activities" hasDropdown />
            <NavItem title="Pages" href="/pages" hasDropdown />
            <NavItem title="Blog" href="/blog" hasDropdown />
            <NavItem title="Contact" href="/contact" />
          </nav>
          
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center text-sm">
              <div className="flex items-center space-x-1 rounded-full border border-gray-200 px-2 py-1">
                <span className="text-xs font-medium">EN</span>
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            
            <div className="hidden md:flex items-center text-sm">
              <div className="flex items-center space-x-1">
                <span className="text-xs font-medium">USD</span>
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            
            <ThemeToggle />
            
            <button className="text-xs font-medium hidden md:block" title="Sign in">
              SignIn
            </button>
            
            <button className="bg-primary p-1.5 rounded" title="Menu">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2" title="Toggle menu">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
              <Link href="/destinations" className="block py-2 text-sm font-medium text-gray-700">Destinations</Link>
              <Link href="/activities" className="block py-2 text-sm font-medium text-gray-700">Activities</Link>
              <Link href="/hotel" className="block py-2 text-sm font-medium text-gray-700">Hotel</Link>
              <Link href="/blog" className="block py-2 text-sm font-medium text-gray-700">Blog</Link>
              <Link href="/contact" className="block py-2 text-sm font-medium text-gray-700">Contact</Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar; 