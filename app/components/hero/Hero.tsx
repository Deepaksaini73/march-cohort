"use client";
import { useState } from 'react';
import Image from 'next/image';

export default function hero() {
  const [activeTab, setActiveTab] = useState('Tours');
  
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section with Banner */}
      <section className="relative w-full">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 bg-gray-900">
          <Image 
            src="/images/ocean-wave.jpg" 
            alt="Ocean waves" 
            fill 
            style={{ objectFit: 'cover', opacity: '0.6' }} 
            priority
          />
        </div>
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 pt-8 pb-20 md:pt-16 md:pb-28">
          <div className="flex flex-col items-start">
            <div className="w-full md:w-3/5 lg:w-1/2 text-white mb-12">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                Book premium travel experiences, hotels, and tours with Travila
              </h1>
              
              <p className="text-base md:text-lg mb-8 text-gray-100 max-w-lg">
                Your gateway to extraordinary experiences across the globe
              </p>
              
              {/* Search Tabs */}
              <div className="bg-white rounded-t-lg p-2 mt-8 flex space-x-1 overflow-x-auto">
                {['Tours', 'Destinations', 'Activities', 'Hotel', 'Rental', 'Tickets'].map((tab) => (
                  <button
                    key={tab}
                    className={`px-4 py-2 text-sm rounded-md font-medium ${
                      activeTab === tab 
                        ? 'bg-primary text-black' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              
              {/* Search Form */}
              <div className="bg-white p-4 rounded-b-lg shadow-md">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="flex flex-col">
                    <label className="text-gray-500 text-xs mb-1">Destination</label>
                    <div className="border border-gray-200 rounded p-2 flex items-center bg-gray-50">
                      <svg className="w-4 h-4 text-gray-400 mr-2" viewBox="0 0 24 24" fill="none">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 7a3 3 0 100 6 3 3 0 000-6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className="text-sm text-gray-700">Where are you going?</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col">
                    <label className="text-gray-500 text-xs mb-1">Check in</label>
                    <div className="border border-gray-200 rounded p-2 flex items-center bg-gray-50">
                      <svg className="w-4 h-4 text-gray-400 mr-2" viewBox="0 0 24 24" fill="none">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className="text-sm text-gray-700">Add date</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col">
                    <label className="text-gray-500 text-xs mb-1">Check out</label>
                    <div className="border border-gray-200 rounded p-2 flex items-center bg-gray-50">
                      <svg className="w-4 h-4 text-gray-400 mr-2" viewBox="0 0 24 24" fill="none">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className="text-sm text-gray-700">Add date</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col">
                    <label className="text-gray-500 text-xs mb-1">Travelers</label>
                    <div className="border border-gray-200 rounded p-2 flex items-center bg-gray-50">
                      <svg className="w-4 h-4 text-gray-400 mr-2" viewBox="0 0 24 24" fill="none">
                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className="text-sm text-gray-700">Add guests</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-4">
                  <button className="bg-black text-white px-6 py-2 rounded-full flex items-center text-sm font-medium">
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none">
                      <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Search
                  </button>
                  
                  <button className="text-gray-600 flex items-center text-sm">
                    <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 8v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Need Help?
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
