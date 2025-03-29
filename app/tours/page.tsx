"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Search, Filter } from 'lucide-react';

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
  const [sortBy, setSortBy] = useState('recommended');
  const [showBackToTop, setShowBackToTop] = useState(false);
  
  // Sample tour data
  const allTours: Tour[] = [
    {
      id: 1,
      title: "California Sunset/Twilight Boat Cruise",
      tag: "Historical",
      rating: 4.96,
      reviews: 672,
      days: 2,
      nights: 3,
      guests: "4-6",
      price: 4014.40,
      image: "/images/boating.jpg",
      location: "San Francisco, California"
    },
    {
      id: 2,
      title: "NYC: Food Tastings and Culture Tour",
      tag: "Cultural",
      rating: 4.96,
      reviews: 672,
      days: 3,
      nights: 3,
      guests: "4-6",
      price: 1441.02,
      image: "/images/santorini.jpg",
      location: "New York City, New York"
    },
    {
      id: 3,
      title: "Grand Canyon Horseshoe Bend 2 days",
      tag: "Nature",
      rating: 4.96,
      reviews: 672,
      days: 7,
      nights: 6,
      guests: "4-6",
      price: 1300.42,
      image: "/images/maldives.jpg",
      location: "Grand Canyon, Arizona"
    },
    {
      id: 4,
      title: "California Sunset/Twilight Boat Cruise",
      tag: "Beach",
      rating: 4.96,
      reviews: 672,
      days: 2,
      nights: 3,
      guests: "4-6",
      price: 4014.40,
      image: "/images/boating.jpg",
      location: "San Francisco, California"
    },
    {
      id: 5,
      title: "NYC: Food Tastings and Culture Tour",
      tag: "Temple",
      rating: 4.96,
      reviews: 672,
      days: 3,
      nights: 3,
      guests: "4-6",
      price: 1441.02,
      image: "/images/santorini.jpg",
      location: "New York City, New York"
    },
    {
      id: 6,
      title: "Grand Canyon Horseshoe Bend 2 days",
      tag: "Adventure",
      rating: 4.96,
      reviews: 672,
      days: 7,
      nights: 6,
      guests: "4-6",
      price: 1300.42,
      image: "/images/maldives.jpg",
      location: "Grand Canyon, Arizona"
    },
    {
      id: 7,
      title: "Hawaii Island Volcano Tour",
      tag: "Nature",
      rating: 4.88,
      reviews: 524,
      days: 4,
      nights: 3,
      guests: "2-8",
      price: 6654.77,
      image: "/images/ocean-wave.jpg",
      location: "Hilo, Hawaii"
    },
    {
      id: 8,
      title: "Seattle Coffee & Market Tour",
      tag: "Cultural",
      rating: 4.92,
      reviews: 315,
      days: 1,
      nights: 0,
      guests: "2-10",
      price: 2953.60,
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
      if (selectedPriceRange === 'Under ₹2000' && tour.price >= 2000) {
        return false;
      } else if (selectedPriceRange === '₹2000-₹5000' && (tour.price < 2000 || tour.price > 5000)) {
        return false;
      } else if (selectedPriceRange === '₹5000-₹10000' && (tour.price < 5000 || tour.price > 10000)) {
        return false;
      } else if (selectedPriceRange === '₹10000+' && tour.price < 10000) {
        return false;
      }
    }
    
    return true;
  });

  // Sort tours based on selected sort option
  const sortedTours = [...filteredTours].sort((a, b) => {
    if (sortBy === 'price_low') {
      return a.price - b.price;
    } else if (sortBy === 'price_high') {
      return b.price - a.price;
    } else if (sortBy === 'rating') {
      return b.rating - a.rating;
    }
    // Default: recommended (no specific sort)
    return 0;
  });
  
  const handleTourClick = (tourId: number) => {
    router.push(`/tour/${tourId}`);
  };
  
  const categories = ['All', 'Historical', 'Cultural', 'Temple', 'Nature', 'Beach', 'Adventure'];
  const durations = ['All', '1-3 days', '4-7 days', '8+ days'];
  const priceRanges = ['All', 'Under ₹2000', '₹2000-₹5000', '₹5000-₹10000', '₹10000+'];
  
  // Handle scroll to show back to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle back to top button click
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="relative h-[300px] md:h-[400px] bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Explore Our Tours</h1>
            <p className="text-white/90 text-lg max-w-2xl mx-auto">
              Discover incredible destinations and experiences tailored for mindful travelers
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
                aria-label="Filter tours by category"
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
                aria-label="Filter tours by duration"
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
                aria-label="Filter tours by price range"
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
          <select 
            className="p-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            aria-label="Sort tours by"
          >
            <option value="recommended">Sort by: Recommended</option>
            <option value="price_low">Price: Low to High</option>
            <option value="price_high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>

        {/* Display our featured tour tool if there are filtered results */}
        {filteredTours.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedTours.map((tour) => (
              <div 
                key={tour.id} 
                className="bg-white rounded-lg overflow-hidden shadow-md cursor-pointer transition-transform hover:-translate-y-1 hover:shadow-lg"
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
                      tour.tag === 'Historical' ? 'bg-amber-100 text-amber-800' : 
                      tour.tag === 'Cultural' ? 'bg-green-100 text-green-800' : 
                      tour.tag === 'Temple' ? 'bg-purple-100 text-purple-800' :
                      tour.tag === 'Nature' ? 'bg-blue-100 text-blue-800' :
                      tour.tag === 'Beach' ? 'bg-cyan-100 text-cyan-800' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {tour.tag}
                    </span>
                  </div>
                </div>
                
                <div className="p-5">
                  <div className="flex items-center mb-3">
                    <div className="flex items-center text-amber-400">
                      <span className="mr-1">★</span>
                      <span className="font-semibold text-sm">{tour.rating.toFixed(2)}</span>
                    </div>
                    <span className="text-sm text-gray-500 ml-1">({tour.reviews} reviews)</span>
                  </div>
                  
                  <h3 className="font-bold text-xl mb-2 hover:text-blue-600 transition-colors">
                    {tour.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-3">{tour.location}</p>
                  
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
                      <span className="font-bold text-xl">₹{tour.price.toFixed(2)}</span>
                      <span className="text-gray-500 text-sm"> / person</span>
                    </div>
                    <button 
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-medium"
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/booking/${tour.id}`);
                      }}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
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

      {/* Back to top button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 z-50"
          aria-label="Back to top"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default ToursPage; 