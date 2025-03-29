"use client";

import { useState } from 'react';
import Image from 'next/image';
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
    <Link href={href} className="navbar-item px-3 md:px-4 py-2 text-gray-800 hover:text-blue-600 text-sm md:text-base">
      {title}
      {hasDropdown && (
        <svg 
          className="dropdown-icon" 
          width="10" 
          height="10" 
          viewBox="0 0 12 12" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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
      <div className="bg-black text-white py-2 px-4">
        <div className="container mx-auto flex flex-wrap justify-between items-center">
          <div className="flex items-center flex-grow">
            <svg className="w-4 h-4 mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-xs md:text-sm truncate">Unlock the Magic of Travel with Travila - Your Gateway to Extraordinary Experiences</span>
          </div>
          <a href="#" className="text-yellow-400 text-xs md:text-sm font-medium flex items-center ml-2 flex-shrink-0">
            Get This Now
            <svg className="w-3 h-3 md:w-4 md:h-4 ml-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>

      {/* Main Navbar */}
      <header className="navbar bg-white">
        <div className="container mx-auto h-full px-4 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="navbar-logo flex items-center">
              <Logo />
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center space-x-1 overflow-x-auto">
            <NavItem title="Home" href="/" hasDropdown />
            <NavItem title="Tours" href="/tours" hasDropdown />
            <NavItem title="Destinations" href="/destinations" hasDropdown />
            <NavItem title="Activities" href="/activities" hasDropdown />
            <NavItem title="Hotel" href="/hotel" hasDropdown />
            <NavItem title="Rental" href="/rental" hasDropdown />
            <NavItem title="Tickets" href="/tickets" hasDropdown />
            <NavItem title="Pages" href="/pages" hasDropdown />
            <NavItem title="Blog" href="/blog" hasDropdown />
            <NavItem title="Contact" href="/contact" />
          </nav>
          
          <div className="flex items-center space-x-2 md:space-x-4">
            <div className="hidden md:flex items-center text-sm">
              <div className="flex items-center space-x-1 border rounded-full px-2 py-1">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" 
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 3C14.5013 5.25576 15.9228 8.50679 16 12C15.9228 15.4932 14.5013 18.7442 12 21C9.49872 18.7442 8.07725 15.4932 8 12C8.07725 8.50679 9.49872 5.25576 12 3Z" 
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>EN</span>
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            
            <div className="hidden md:flex items-center text-sm">
              <div className="flex items-center space-x-1">
                <span>USD</span>
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            
            <ThemeToggle />
            
            <button className="text-sm font-medium hidden md:block">
              Signin
            </button>
            
            <button className="bg-yellow-400 p-2 rounded-md">
              <svg width="16" height="16" className="md:w-20 md:h-20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden absolute top-20 inset-x-0 bg-white shadow-lg z-50 py-4">
            <div className="px-4 space-y-3">
              <Link href="/" className="block py-2 text-gray-800">Home</Link>
              <Link href="/tours" className="block py-2 text-gray-800">Tours</Link>
              <Link href="/destinations" className="block py-2 text-gray-800">Destinations</Link>
              <Link href="/activities" className="block py-2 text-gray-800">Activities</Link>
              <Link href="/hotel" className="block py-2 text-gray-800">Hotel</Link>
              <Link href="/rental" className="block py-2 text-gray-800">Rental</Link>
              <Link href="/tickets" className="block py-2 text-gray-800">Tickets</Link>
              <Link href="/pages" className="block py-2 text-gray-800">Pages</Link>
              <Link href="/blog" className="block py-2 text-gray-800">Blog</Link>
              <Link href="/contact" className="block py-2 text-gray-800">Contact</Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar; 