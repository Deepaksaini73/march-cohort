"use client";

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Eye } from 'lucide-react';

const Navbar = () => {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
              <Eye className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-blue-600">OmTour</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`${
                isActive('/') 
                  ? 'text-blue-600 font-medium'
                  : 'text-gray-600 hover:text-blue-600'
              } transition-colors duration-200`}
            >
              Home
            </Link>
            <Link
              href="/tours"
              className={`${
                isActive('/tours')
                  ? 'text-blue-600 font-medium'
                  : 'text-gray-600 hover:text-blue-600'
              } transition-colors duration-200`}
            >
              Tours
            </Link>
            <Link
              href="/about"
              className={`${
                isActive('/about')
                  ? 'text-blue-600 font-medium'
                  : 'text-gray-600 hover:text-blue-600'
              } transition-colors duration-200`}
            >
              About
            </Link>
            <Link
              href="/faq"
              className={`${
                isActive('/faq')
                  ? 'text-blue-600 font-medium'
                  : 'text-gray-600 hover:text-blue-600'
              } transition-colors duration-200`}
            >
              FAQ
            </Link>
            <Link
              href="/contact"
              className={`${
                isActive('/contact')
                  ? 'text-blue-600 font-medium'
                  : 'text-gray-600 hover:text-blue-600'
              } transition-colors duration-200`}
            >
              Contact
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <Link
              href="/login"
              className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200"
            >
              Sign In
            </Link>
            <Link
              href="/login"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 