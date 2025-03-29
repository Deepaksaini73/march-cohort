"use client";

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface Tour {
  id: number;
  title: string;
  tag: string;
  rating: number;
  reviews: number;
  days: number;
  nights: number;
  guests: string;
  price: number;
  image: string;
  location: string;
}

const ToursPage = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDuration, setSelectedDuration] = useState('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState('All');
  
  // Sample tour data
  const allTours: Tour[] = [
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
      image: "/images/boating.jpg",
      location: "San Francisco, California"
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
      image: "/images/santorini.jpg",
      location: "New York City, New York"
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
      image: "/images/maldives.jpg",
      location: "Grand Canyon, Arizona"
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
      image: "/images/boating.jpg",
      location: "San Francisco, California"
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
      image: "/images/santorini.jpg",
      location: "New York City, New York"
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
      image: "/images/maldives.jpg",
      location: "Grand Canyon, Arizona"
    },
    {
      id: 7,
      title: "Hawaii Island Volcano Tour",
      tag: "Hot Deal",
      rating: 4.88,
      reviews: 524,
      days: 4,
      nights: 3,
      guests: "2-8",
      price: 79.99,
      image: "/images/ocean-wave.jpg",
      location: "Hilo, Hawaii"
    },
    {
      id: 8,
      title: "Seattle Coffee & Market Tour",
      tag: "New",
      rating: 4.92,
      reviews: 315,
      days: 1,
      nights: 0,
      guests: "2-10",
      price: 35.50,
      image: "/images/santorini.jpg",
      location: "Seattle, Washington"
    },
  ];
  
  // Filter tours based on search and filters
  const filteredTours = allTours.filter(tour => {
    // Search filter
    if (searchQuery && !tour.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !tour.location.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Category filter
    if (selectedCategory !== 'All' && tour.tag !== selectedCategory) {
      return false;
    }
    
    // Duration filter
    if (selectedDuration !== 'All') {
      if (selectedDuration === '1-3 days' && (tour.days < 1 || tour.days > 3)) {
        return false;
      } else if (selectedDuration === '4-7 days' && (tour.days < 4 || tour.days > 7)) {
        return false;
      } else if (selectedDuration === '8+ days' && tour.days < 8) {
        return false;
      }
    }
    
    // Price range filter
    if (selectedPriceRange !== 'All') {
      if (selectedPriceRange === 'Under $20' && tour.price >= 20) {
        return false;
      } else if (selectedPriceRange === '$20-$50' && (tour.price < 20 || tour.price > 50)) {
        return false;
      } else if (selectedPriceRange === '$50-$100' && (tour.price < 50 || tour.price > 100)) {
        return false;
      } else if (selectedPriceRange === '$100+' && tour.price < 100) {
        return false;
      }
    }
    
    return true;
  });
  
  const handleTourClick = (tourId: number) => {
    router.push(`/tour/${tourId}`);
  };
  
  const categories = ['All', 'Top Rated', 'Best Sale', '25% Off', 'Hot Deal', 'New'];
  const durations = ['All', '1-3 days', '4-7 days', '8+ days'];
  const priceRanges = ['All', 'Under $20', '$20-$50', '$50-$100', '$100+'];
  
  return (
    <main className="min-h-screen bg-white">
      {/* Hero section */}
      <div className="relative h-[40vh] w-full">
        <Image 
          src="/images/ocean-wave.jpg" 
          alt="Explore amazing tours"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Explore Amazing Tours</h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Discover unforgettable experiences and adventures around the world.
            </p>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto p-4 py-8">
        {/* Search and filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            {/* Search bar */}
            <div className="md:flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for tours or destinations..."
                  className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <svg 
                  className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            
            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              {/* Category filter */}
              <select 
                className="p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="" disabled>Category</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              
              {/* Duration filter */}
              <select 
                className="p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedDuration}
                onChange={(e) => setSelectedDuration(e.target.value)}
              >
                <option value="" disabled>Duration</option>
                {durations.map(duration => (
                  <option key={duration} value={duration}>{duration}</option>
                ))}
              </select>
              
              {/* Price range filter */}
              <select 
                className="p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedPriceRange}
                onChange={(e) => setSelectedPriceRange(e.target.value)}
              >
                <option value="" disabled>Price Range</option>
                {priceRanges.map(range => (
                  <option key={range} value={range}>{range}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        {/* Results count */}
        <div className="mb-6 flex justify-between items-center">
          <p className="text-gray-600">Showing {filteredTours.length} tours</p>
          
          {/* Sort by dropdown */}
          <select className="p-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="recommended">Sort by: Recommended</option>
            <option value="price_low">Price: Low to High</option>
            <option value="price_high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
        
        {/* Tours grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {filteredTours.map(tour => (
            <div 
              key={tour.id} 
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => handleTourClick(tour.id)}
            >
              <div className="relative h-56 w-full">
                <Image
                  src={tour.image}
                  alt={tour.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    tour.tag === 'Top Rated' ? 'bg-amber-100 text-amber-800' : 
                    tour.tag === 'Best Sale' ? 'bg-green-100 text-green-800' : 
                    tour.tag === 'Hot Deal' ? 'bg-red-100 text-red-800' : 
                    tour.tag === 'New' ? 'bg-blue-100 text-blue-800' : 
                    'bg-orange-100 text-orange-800'
                  }`}>
                    {tour.tag}
                  </span>
                </div>
              </div>
              
              <div className="p-5">
                <div className="flex items-center mb-2">
                  <div className="flex items-center text-amber-400">
                    <span className="mr-1">★</span>
                    <span className="font-semibold text-sm">{tour.rating.toFixed(2)}</span>
                  </div>
                  <span className="text-sm text-gray-500 ml-1">({tour.reviews} reviews)</span>
                </div>
                
                <h3 className="font-bold text-xl mb-2">{tour.title}</h3>
                
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{tour.location}</span>
                </div>
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="mr-1">◯</span>
                    <span>{tour.days} days {tour.nights} nights</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="mr-1">◯</span>
                    <span>{tour.guests} guest</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-bold text-xl">${tour.price.toFixed(2)}</span>
                    <span className="text-gray-500 text-sm"> / person</span>
                  </div>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-medium">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* No results message */}
        {filteredTours.length === 0 && (
          <div className="text-center py-12">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-bold text-gray-700 mb-2">No tours found</h3>
            <p className="text-gray-500">
              Try adjusting your search or filter criteria to find what you're looking for.
            </p>
            <button 
              className="mt-4 text-blue-600 font-medium"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedDuration('All');
                setSelectedPriceRange('All');
              }}
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </main>
  );
};

export default ToursPage; 