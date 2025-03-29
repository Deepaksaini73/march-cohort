"use client";

import { useState } from 'react';
import Image from 'next/image';
import Navbar from './components/Navbar';

export default function Home() {
  const [activeTab, setActiveTab] = useState('Tours');
  
  return (
    <div className="min-h-screen overflow-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative w-full">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/ocean-wave.jpg" 
            alt="Ocean waves" 
            fill 
            style={{ objectFit: 'cover' }} 
            priority
          />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 py-12 md:py-20">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-3/5 text-white mb-12 md:mb-0">
              <div className="inline-block bg-yellow-300 text-black font-medium px-6 py-2 rounded-full mb-6">
                Discovery the World
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                Unleash Your Wanderlust<br />
                Book Your Next Journey
              </h1>
              
              <p className="text-base md:text-lg mb-8 max-w-2xl">
                Crafting Exceptional Journeys: Your Global Escape Planner. Unleash Your Wanderlust: 
                Seamless Travel, Extraordinary Adventures
              </p>
              
              <div className="flex space-x-2">
                <button className="bg-gray-200 w-10 h-10 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button className="bg-gray-200 w-10 h-10 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="md:w-2/5 md:pl-4 lg:pl-8 destination-images">
              <div className="grid grid-cols-1 gap-3 md:gap-4">
                <div className="relative rounded-xl overflow-hidden">
                  <Image 
                    src="/images/maldives.jpg" 
                    alt="Maldives" 
                    width={300}
                    height={200}
                    className="w-full h-auto rounded-xl"
                  />
                </div>
                <div className="relative rounded-xl overflow-hidden">
                  <Image 
                    src="/images/santorini.jpg" 
                    alt="Santorini" 
                    width={300}
                    height={200}
                    className="w-full h-auto rounded-xl"
                  />
                </div>
                <div className="relative rounded-xl overflow-hidden">
                  <Image 
                    src="/images/boating.jpg" 
                    alt="Boating" 
                    width={300}
                    height={200}
                    className="w-full h-auto rounded-xl"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Search Form */}
          <div className="mt-6 md:mt-8 lg:mt-12 bg-white p-4 md:p-6 rounded-xl shadow-lg max-w-5xl mx-auto search-form-container">
            <div className="flex overflow-x-auto mb-4 md:mb-6 space-x-2 md:space-x-4 pb-2">
              {['Tours', 'Hotels', 'Tickets', 'Rental', 'Activities'].map((tab) => (
                <button
                  key={tab}
                  className={`whitespace-nowrap px-3 md:px-6 py-2 rounded-full ${
                    activeTab === tab 
                      ? 'bg-black text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              <div>
                <label className="block text-gray-600 mb-1 md:mb-2 text-sm md:text-base">Location</label>
                <div className="relative">
                  <div className="flex items-center border border-gray-200 rounded-lg p-2 md:p-3 bg-gray-50">
                    <span className="mr-2 text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </span>
                    <span className="text-sm md:text-base">New York, USA</span>
                    <span className="ml-auto">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-gray-600 mb-1 md:mb-2 text-sm md:text-base">Check In</label>
                <div className="relative">
                  <div className="flex items-center border border-gray-200 rounded-lg p-2 md:p-3 bg-gray-50">
                    <span className="mr-2 text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </span>
                    <span className="text-sm md:text-base">02 January 2024</span>
                    <span className="ml-auto">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-gray-600 mb-1 md:mb-2 text-sm md:text-base">Check Out</label>
                <div className="relative">
                  <div className="flex items-center border border-gray-200 rounded-lg p-2 md:p-3 bg-gray-50">
                    <span className="mr-2 text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </span>
                    <span className="text-sm md:text-base">02 January 2024</span>
                    <span className="ml-auto">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-gray-600 mb-1 md:mb-2 text-sm md:text-base">Guest</label>
                <div className="relative">
                  <div className="flex items-center border border-gray-200 rounded-lg p-2 md:p-3 bg-gray-50">
                    <span className="mr-2 text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </span>
                    <span className="text-sm md:text-base">2 adults, 2 children</span>
                    <span className="ml-auto">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 md:mt-6 flex flex-col md:flex-row items-center justify-between gap-3">
              <button className="w-full md:w-auto bg-black text-white px-6 md:px-8 py-2 md:py-3 rounded-full flex items-center justify-center font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Search
              </button>
              
              <button className="w-full md:w-auto text-gray-600 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Need some help?
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
