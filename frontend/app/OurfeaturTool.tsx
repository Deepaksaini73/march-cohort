'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { Heart } from 'lucide-react';

// Dynamically import TourCard to avoid hydration issues
const TourCard = dynamic(() => import('./components/TourCard'), { 
  ssr: false,
  loading: () => (
    <div className="bg-white rounded-lg overflow-hidden shadow-md relative p-4 h-[26rem] animate-pulse">
      <div className="h-56 w-full bg-gray-200 rounded"></div>
      <div className="p-5 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-6 bg-gray-200 rounded w-4/5"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-10 bg-gray-200 rounded w-full"></div>
      </div>
    </div>
  )
});

const OurFeatureTool = () => {
  const router = useRouter();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const hasMounted = useRef(false);
  
  const tours = [
    {
      id: 1,
      title: "California Sunset/Twilight Boat Cruise",
      tag: "Top Rated",
      rating: 4.96,
      reviews: 672,
      days: 2,
      nights: 3,
      guests: "4-6",
      price: 48.25,
      image: "/images/boating.jpg"
    },
    {
      id: 2,
      title: "NYC: Food Tastings and Culture Tour",
      tag: "Best Sale",
      rating: 4.96,
      reviews: 672,
      days: 3,
      nights: 3,
      guests: "4-6",
      price: 17.32,
      image: "/images/santorini.jpg"
    },
    {
      id: 3,
      title: "Grand Canyon Horseshoe Bend 2 days",
      tag: "25% Off",
      rating: 4.96,
      reviews: 672,
      days: 7,
      nights: 6,
      guests: "4-6",
      price: 15.63,
      image: "/images/maldives.jpg"
    },
    {
      id: 4,
      title: "California Sunset/Twilight Boat Cruise",
      tag: "Top Rated",
      rating: 4.96,
      reviews: 672,
      days: 2,
      nights: 3,
      guests: "4-6",
      price: 48.25,
      image: "/images/boating.jpg"
    },
    {
      id: 5,
      title: "NYC: Food Tastings and Culture Tour",
      tag: "Best Sale",
      rating: 4.96,
      reviews: 672,
      days: 3,
      nights: 3,
      guests: "4-6",
      price: 17.32,
      image: "/images/santorini.jpg"
    },
    {
      id: 6,
      title: "Grand Canyon Horseshoe Bend 2 days",
      tag: "25% Off",
      rating: 4.96,
      reviews: 672,
      days: 7,
      nights: 6,
      guests: "4-6",
      price: 15.63,
      image: "/images/maldives.jpg"
    },
  ];

  const toggleDropdown = (dropdown: string, e: React.MouseEvent) => {
    if (!hasMounted.current) return;
    
    e.stopPropagation();
    if (activeDropdown === dropdown) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(dropdown);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    hasMounted.current = true;
    
    if (typeof window === 'undefined') return;
    
    const handleClickOutside = () => {
      setActiveDropdown(null);
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <section className="py-12 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold mb-3 text-blue-600">Om Tour</h1>
          <p className="text-gray-600 text-lg">Discover Inner Peace Through Travel</p>
        </div>
        
        <h2 className="text-4xl font-bold mb-2">Our Featured Tours</h2>
        <p className="text-gray-600 mb-8">Mindful travel experiences selected just for you</p>
        
        <div className="flex flex-wrap gap-4 mb-8">
          <div className="relative">
            <button 
              className={`bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-full text-sm font-medium flex items-center ${activeDropdown === 'categories' ? 'bg-gray-200' : ''}`}
              onClick={(e) => toggleDropdown('categories', e)}
            >
              Categories
              <svg className={`w-4 h-4 ml-2 transition-transform duration-200 ${activeDropdown === 'categories' ? 'transform rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {activeDropdown === 'categories' && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10 py-2 animate-fadeIn">
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm">All Categories</button>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm">City Tours</button>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm">Beach Destinations</button>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm">Mountain Adventures</button>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm">Cultural Experiences</button>
              </div>
            )}
          </div>
          
          <div className="relative">
            <button 
              className={`bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-full text-sm font-medium flex items-center ${activeDropdown === 'duration' ? 'bg-gray-200' : ''}`}
              onClick={(e) => toggleDropdown('duration', e)}
            >
              Duration
              <svg className={`w-4 h-4 ml-2 transition-transform duration-200 ${activeDropdown === 'duration' ? 'transform rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {activeDropdown === 'duration' && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10 py-2 animate-fadeIn">
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm">Any Duration</button>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm">1-3 Days</button>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm">4-7 Days</button>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm">8-14 Days</button>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm">15+ Days</button>
              </div>
            )}
          </div>
          
          <div className="relative">
            <button 
              className={`bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-full text-sm font-medium flex items-center ${activeDropdown === 'rating' ? 'bg-gray-200' : ''}`}
              onClick={(e) => toggleDropdown('rating', e)}
            >
              Review / Rating
              <svg className={`w-4 h-4 ml-2 transition-transform duration-200 ${activeDropdown === 'rating' ? 'transform rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {activeDropdown === 'rating' && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10 py-2 animate-fadeIn">
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm flex items-center">
                  <span className="text-amber-400 mr-2">★★★★★</span> 5.0 only
                </button>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm flex items-center">
                  <span className="text-amber-400 mr-2">★★★★</span> 4.0 & above
                </button>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm flex items-center">
                  <span className="text-amber-400 mr-2">★★★</span> 3.0 & above
                </button>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm">Any Rating</button>
              </div>
            )}
          </div>
          
          <div className="relative">
            <button 
              className={`bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-full text-sm font-medium flex items-center ${activeDropdown === 'price' ? 'bg-gray-200' : ''}`}
              onClick={(e) => toggleDropdown('price', e)}
            >
              Price range
              <svg className={`w-4 h-4 ml-2 transition-transform duration-200 ${activeDropdown === 'price' ? 'transform rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {activeDropdown === 'price' && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10 py-2 animate-fadeIn">
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm">Any Price</button>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm">Under $50</button>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm">$50 - $100</button>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm">$100 - $200</button>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm">$200+</button>
              </div>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tours.map((tour) => (
            <TourCard
              key={tour.id}
              id={tour.id}
              title={tour.title}
              tag={tour.tag}
              rating={tour.rating}
              reviews={tour.reviews}
              days={tour.days}
              nights={tour.nights}
              guests={tour.guests}
              price={tour.price}
              image={tour.image}
            />
          ))}
        </div>
        
        <div className="flex justify-center mt-10">
          <button 
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-md font-medium"
            onClick={() => router.push('/tours')}
          >
            SEE ALL TOURS
          </button>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeInOut {
          0% { opacity: 0; transform: translateY(-10px); }
          10% { opacity: 1; transform: translateY(0); }
          90% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-10px); }
        }
        
        .animate-fade-in-out {
          animation: fadeInOut 3s ease-in-out;
          transition: opacity 0.3s ease-out;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </section>
  );
};

export default OurFeatureTool; 