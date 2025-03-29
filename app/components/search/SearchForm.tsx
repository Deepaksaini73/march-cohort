"use client";
import { useState } from 'react';

export default function SearchForm() {
  const [activeTab, setActiveTab] = useState('Tours');
  const [location, setLocation] = useState('New York, USA');
  const [guests, setGuests] = useState(4);
  
  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };
  
  const handleGuestChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGuests(parseInt(e.target.value));
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-3 max-w-5xl mx-auto relative border border-gray-100 z-20">
      {/* Tabs */}
      <div className="flex space-x-4 mb-3 border-b border-gray-100 pb-2">
        <button 
          className={`${activeTab === 'Tours' ? 'bg-black text-white' : 'text-gray-700 hover:bg-gray-100'} px-3 py-1.5 rounded-full text-xs font-medium transition-colors`}
          onClick={() => setActiveTab('Tours')}
        >
          Tours
        </button>
        <button 
          className={`${activeTab === 'Hotels' ? 'bg-black text-white' : 'text-gray-700 hover:bg-gray-100'} px-3 py-1.5 rounded-full text-xs font-medium transition-colors`}
          onClick={() => setActiveTab('Hotels')}
        >
          Hotels
        </button>
        <button 
          className={`${activeTab === 'Rental' ? 'bg-black text-white' : 'text-gray-700 hover:bg-gray-100'} px-3 py-1.5 rounded-full text-xs font-medium transition-colors`}
          onClick={() => setActiveTab('Rental')}
        >
          Rental
        </button>
        <button 
          className={`${activeTab === 'Activities' ? 'bg-black text-white' : 'text-gray-700 hover:bg-gray-100'} px-3 py-1.5 rounded-full text-xs font-medium transition-colors`}
          onClick={() => setActiveTab('Activities')}
        >
          Activities
        </button>
      </div>
      
      {/* Form */}
      <div className="flex flex-wrap items-center">
        <div className="w-full md:w-[60%] mr-2 mb-2 md:mb-0">
          <div className="flex items-center border border-gray-200 rounded-lg p-2 bg-gray-50">
            <label htmlFor="location" className="sr-only">Location</label>
            <svg className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="none">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 7a3 3 0 100 6 3 3 0 000-6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <input 
              id="location"
              type="text" 
              className="text-xs font-medium bg-transparent outline-none flex-1 min-w-0"
              placeholder="Enter location" 
              value={location}
              onChange={handleLocationChange}
            />
          </div>
        </div>
        
        <div className="w-full md:w-[25%] mr-2 mb-2 md:mb-0">
          <div className="flex items-center border border-gray-200 rounded-lg p-2 bg-gray-50">
            <label htmlFor="guests" className="sr-only">Number of guests</label>
            <svg className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="none">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <input 
              id="guests"
              type="number" 
              className="text-xs font-medium bg-transparent outline-none flex-1 min-w-0"
              min="1" 
              max="20"
              value={guests}
              onChange={handleGuestChange}
              aria-label="Number of guests"
            />
            <span className="text-xs text-gray-500 ml-1">guests</span>
          </div>
        </div>
        
        <div className="w-full md:w-[10%]">
          <button className="w-full bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-full text-xs font-medium flex items-center justify-center">
            <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Search
          </button>
        </div>
      </div>
      
      <div className="flex justify-end mt-2">
        <button className="text-gray-500 hover:text-gray-900 flex items-center text-[10px]">
          <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 8v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Need some help?
        </button>
      </div>
    </div>
  );
} 