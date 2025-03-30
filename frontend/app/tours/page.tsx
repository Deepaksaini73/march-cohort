"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Search, Filter, Star, MapPin, Users, Sun, Moon, ChevronRight, Heart, ArrowUpCircle } from 'lucide-react';

interface Tour {
  id?: number;
  name: string;
  address: string;
  rating: number;
  total_ratings: number;
  place_id: string;
  photo_reference: string;
  days?: number;
  nights?: number;
  guests?: string;
  price?: number;
}

const ToursPage = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('heritage');
  const [selectedDuration, setSelectedDuration] = useState('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState('All');
  const [sortBy, setSortBy] = useState('recommended');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [animatedItems, setAnimatedItems] = useState<string[]>([]);
  const [tours, setTours] = useState<Tour[]>([]);
  
  // Load favorites from localStorage on client side
  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
    
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Save favorites to localStorage when they change
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);
  
  // Add staggered animation to tour cards
  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        const ids = tours.map(tour => tour.place_id);
        setAnimatedItems(ids);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isLoading, tours]);
  
  // Toggle favorite status
  const toggleFavorite = (e: React.MouseEvent, placeId: string) => {
    e.stopPropagation();
    setFavorites(prev => 
      prev.includes(placeId) 
        ? prev.filter(id => id !== placeId)
        : [...prev, placeId]
    );
  };
  
  // Function to fetch tours from the backend
  const fetchTours = async (location: string, category: string = 'heritage') => {
    try {
      setIsLoading(true);
      const response = await fetch(`http://localhost:5000/api/places/tours?category=${category}&location=${location}&limit=10`);
      const data = await response.json();
      // Add default values to each tour
      const toursWithDefaults = (data.tours || []).map((tour: Tour) => ({
        ...tour,
        days: 2,
        nights: 3,
        guests: "4-6",
        price: Math.floor(Math.random() * (500 - 100 + 1)) + 100 // Random price between 100-500
      }));
      setTours(toursWithDefaults);
    } catch (error) {
      console.error('Error fetching tours:', error);
      setTours([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle search submit
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      fetchTours(searchQuery, selectedCategory);
    }
  };

  // Initial load
  useEffect(() => {
    fetchTours('Jaipur', 'heritage');
  }, []);
  
  // Sort tours based on selected sort option
  const sortedTours = [...tours].sort((a, b) => {
    if (sortBy === 'rating') {
      return b.rating - a.rating;
    }
    // Default: recommended (no specific sort)
    return 0;
  });
  
  const handleTourClick = (tourId: string) => {
    router.push(`/tour/${tourId}`);
  };
  
  const categories = ['heritage', 'cultural', 'temple', 'nature', 'beach', 'adventure'];
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

  // Formatting price with comma separator
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  // Animated scroll indicator
  const scrollDown = () => {
    window.scrollTo({
      top: window.innerHeight - 80,
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Hero Section with Parallax Effect */}
      <div className="relative h-[80vh] overflow-hidden">
        {/* Background overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-purple-900/70 z-10"></div>
        
        {/* Background image with optimized quality */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(/images/santorini.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(1.1) contrast(1.1)',
            transform: 'scale(1.05)',
            transition: 'transform 0.5s ease-out',
          }}
        ></div>
        
        {/* Floating decorative elements */}
        <div className="absolute inset-0 z-10 overflow-hidden">
          <div className="absolute top-[20%] left-[5%] w-24 h-24 bg-yellow-300/20 rounded-full blur-xl"></div>
          <div className="absolute bottom-[30%] right-[10%] w-32 h-32 bg-blue-400/20 rounded-full blur-xl"></div>
          <div className="absolute top-[50%] right-[20%] w-16 h-16 bg-purple-500/20 rounded-full blur-xl"></div>
        </div>
        
        {/* Content */}
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="text-center px-4 max-w-4xl">
            <div className="mb-3 flex justify-center">
              <span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white/90 text-sm font-medium tracking-wider inline-flex items-center">
                <span className="w-2 h-2 bg-yellow-300 rounded-full mr-2 animate-pulse"></span>
                MEANINGFUL JOURNEYS
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in-up leading-tight drop-shadow-md">
              Explore <span className="text-yellow-300 relative inline-block">
                Mindful 
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 120 8" preserveAspectRatio="none">
                  <path d="M0,5 Q30,2 60,5 T120,5" stroke="currentColor" strokeWidth="3" fill="none" className="text-yellow-400/60" />
                </svg>
              </span> Tours
            </h1>
            <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto mb-10 animate-fade-in-up animation-delay-200 leading-relaxed">
              Discover incredible destinations and experiences that nourish your body, mind, and spirit on a journey of self-discovery
            </p>
            <div className="animate-fade-in-up animation-delay-400 flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={scrollDown}
                className="bg-white text-blue-800 px-8 py-4 rounded-full font-medium hover:bg-yellow-300 hover:text-blue-900 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center"
              >
                Explore Tours
                <ChevronRight className="w-5 h-5 ml-2" />
              </button>
              <button className="bg-transparent border-2 border-white/60 text-white px-8 py-4 rounded-full font-medium hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
                Popular Destinations
              </button>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 cursor-pointer z-20 animate-bounce" onClick={scrollDown}>
          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors duration-300">
            <ChevronRight className="w-6 h-6 text-white transform rotate-90" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 py-12">
        {/* Search and filters */}
        <div className="mb-8 bg-white rounded-2xl shadow-xl p-6 animate-fade-in-up border border-gray-200">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 mb-6">
            {/* Search bar */}
            <div className="md:flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter location name (e.g., Jaipur)"
                  className="w-full p-4 pl-12 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all duration-300"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>
            
            <button 
              type="submit"
              className="px-6 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center gap-2"
            >
              <Search className="w-5 h-5" />
              Search Tours
            </button>
          </form>
        </div>
        
        {/* Results count */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-gray-600">
            Showing <span className="font-medium">{sortedTours.length}</span> {sortedTours.length === 1 ? 'tour' : 'tours'}
          </div>
        </div>
        
        {/* Loading state */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-md overflow-hidden">
                <div className="h-52 bg-gray-200 animate-pulse"></div>
                <div className="p-5 space-y-3">
                  <div className="h-5 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-4/5 animate-pulse"></div>
                  <div className="flex justify-between items-center">
                    <div className="h-6 bg-gray-200 rounded w-1/3 animate-pulse"></div>
                    <div className="h-10 bg-gray-200 rounded w-1/4 animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* Tour cards */}
            {sortedTours.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {sortedTours.map((tour, index) => (
                  <div
                    key={tour.place_id}
                    className={`bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl border border-gray-100 group ${
                      animatedItems.includes(tour.place_id) ? 'animate-fade-in-up' : 'opacity-0'
                    }`}
                    style={{ animationDelay: `${200 + index * 100}ms` }}
                    onClick={() => handleTourClick(tour.place_id)}
                  >
                    {/* Image container */}
                    <div className="relative h-64 overflow-hidden">
                      {tour.photo_reference ? (
                        <Image
                          src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${tour.photo_reference}&key=AIzaSyB4Pk-oT_sJ7u2XmcDmSeFcTLM08Ukkpv0`}
                          alt={tour.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          priority={index < 3}
                          style={{ objectFit: 'cover' }}
                          className="transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <MapPin className="w-12 h-12 text-gray-400" />
                        </div>
                      )}
                      
                      {/* Category tag */}
                      <div className="absolute top-4 left-4 bg-white/95 rounded-full px-4 py-1.5 text-sm font-medium shadow-sm">
                        {selectedCategory}
                      </div>

                      {/* Favorite button */}
                      <button
                        onClick={(e) => toggleFavorite(e, tour.place_id)}
                        className="absolute top-4 right-4 p-2 rounded-full bg-white/95 hover:bg-white transition-colors duration-200 shadow-sm"
                        aria-label="Add to favorites"
                      >
                        <Heart
                          className={`w-5 h-5 ${
                            favorites.includes(tour.place_id)
                              ? 'fill-red-500 text-red-500'
                              : 'text-gray-600'
                          }`}
                        />
                      </button>
                      
                      {/* Quick info overlay */}
                      <div className="absolute bottom-4 left-4 flex space-x-2">
                        <div className="bg-white/95 shadow-sm backdrop-blur-sm px-3 py-1.5 rounded-md text-xs font-medium text-gray-800 flex items-center">
                          <Sun className="w-3 h-3 text-orange-500 mr-1.5" />
                          {tour.days}d
                        </div>
                        <div className="bg-white/95 shadow-sm backdrop-blur-sm px-3 py-1.5 rounded-md text-xs font-medium text-gray-800 flex items-center">
                          <Moon className="w-3 h-3 text-indigo-500 mr-1.5" />
                          {tour.nights}n
                        </div>
                        <div className="bg-white/95 shadow-sm backdrop-blur-sm px-3 py-1.5 rounded-md text-xs font-medium text-gray-800 flex items-center">
                          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400 mr-1.5" />
                          {tour.rating}
                        </div>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-5">
                      <h3 className="font-bold text-lg mb-2 text-gray-800 line-clamp-2 group-hover:text-blue-700 transition-colors duration-300">
                        {tour.name}
                      </h3>
                      
                      <div className="flex items-center text-gray-600 mb-4">
                        <div className="bg-blue-50 rounded-full p-1.5 mr-2">
                          <MapPin className="w-4 h-4 text-blue-500" />
                        </div>
                        <span className="text-sm text-gray-500">{tour.address}</span>
                      </div>

                      {/* Guest capacity */}
                      <div className="bg-gray-50 rounded-lg p-3 flex items-center text-sm text-gray-600 mb-4">
                        <Users className="w-4 h-4 mr-2 text-blue-500" />
                        <span className="font-medium">{tour.guests} guests</span>
                      </div>
                      
                      {/* Price and CTA */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div>
                          <span className="font-bold text-xl text-blue-700">
                            ₹{tour.price?.toLocaleString()}
                          </span>
                          <span className="text-gray-500 text-sm ml-1">Entry Fee</span>
                        </div>
                        <button 
                          className="bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center font-medium"
                          onClick={() => handleTourClick(tour.place_id)}
                        >
                          View Details
                          <ChevronRight className="w-4 h-4 ml-1.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-gray-50 rounded-xl">
                <div className="text-gray-400 mb-4">
                  <Search className="w-12 h-12 mx-auto" />
                </div>
                <h3 className="text-xl font-medium text-gray-700 mb-2">No tours found</h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  We couldn't find any tours matching your criteria. Try adjusting your filters or search term.
                </p>
                <button
                  className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('heritage');
                    setSelectedDuration('All');
                    setSelectedPriceRange('All');
                  }}
                >
                  Clear filters
                </button>
              </div>
            )}
          </>
        )}
      </div>
      
      {/* Back to top button */}
      {showBackToTop && (
        <button
          aria-label="Scroll back to top"
          title="Back to top"
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 z-50 transform transition-transform hover:scale-110"
          onClick={scrollToTop}
        >
          <ArrowUpCircle className="w-6 h-6" />
        </button>
      )}
      
      {/* CSS animations */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.8;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse 3s ease-in-out infinite;
        }
        
        .animation-delay-200 {
          animation-delay: 200ms;
        }
        
        .animation-delay-400 {
          animation-delay: 400ms;
        }
        
        .animation-delay-600 {
          animation-delay: 600ms;
        }
      `}</style>
    </div>
  );
};

export default ToursPage; 