"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Search, Filter, Star, MapPin, Users, Sun, Moon, ChevronRight, Heart, ArrowUpCircle } from 'lucide-react';

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
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [animatedItems, setAnimatedItems] = useState<number[]>([]);
  
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
        const ids = allTours.map(tour => tour.id);
        setAnimatedItems(ids);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);
  
  // Toggle favorite status
  const toggleFavorite = (e: React.MouseEvent, tourId: number) => {
    e.stopPropagation();
    setFavorites(prev => 
      prev.includes(tourId) 
        ? prev.filter(id => id !== tourId)
        : [...prev, tourId]
    );
  };
  
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
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            {/* Search bar */}
            <div className="md:flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for tours or destinations..."
                  className="w-full p-4 pl-12 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all duration-300"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>
            
            {/* Filter button (mobile) */}
            <div className="md:hidden">
              <button 
                className="w-full flex items-center justify-center gap-2 p-4 bg-blue-600 text-white rounded-xl"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="w-5 h-5" />
                Filters
              </button>
            </div>
            
            {/* Filters (desktop) */}
            <div className="hidden md:flex gap-3">
              {/* Category filter */}
              <div className="relative">
                <select
                  className="appearance-none bg-white border border-gray-200 p-4 pl-4 pr-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="" disabled>Category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <ChevronRight className="w-5 h-5 text-gray-400 transform rotate-90" />
                </div>
              </div>
              
              {/* Duration filter */}
              <div className="relative">
                <select
                  className="appearance-none bg-white border border-gray-200 p-4 pl-4 pr-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                  value={selectedDuration}
                  onChange={(e) => setSelectedDuration(e.target.value)}
                >
                  <option value="" disabled>Duration</option>
                  {durations.map(duration => (
                    <option key={duration} value={duration}>{duration}</option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <ChevronRight className="w-5 h-5 text-gray-400 transform rotate-90" />
                </div>
              </div>
              
              {/* Price range filter */}
              <div className="relative">
                <select
                  className="appearance-none bg-white border border-gray-200 p-4 pl-4 pr-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                  value={selectedPriceRange}
                  onChange={(e) => setSelectedPriceRange(e.target.value)}
                >
                  <option value="" disabled>Price Range</option>
                  {priceRanges.map(range => (
                    <option key={range} value={range}>{range}</option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <ChevronRight className="w-5 h-5 text-gray-400 transform rotate-90" />
                </div>
              </div>
              
              {/* Sort by */}
              <div className="relative">
                <select
                  className="appearance-none bg-white border border-gray-200 p-4 pl-4 pr-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="recommended">Recommended</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <ChevronRight className="w-5 h-5 text-gray-400 transform rotate-90" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Mobile filters (collapsible) */}
          {showFilters && (
            <div className="md:hidden space-y-4 mt-4 p-4 bg-gray-50 rounded-xl animate-fade-in">
              {/* Category filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => (
                    <button
                      key={category}
                      className={`px-3 py-2 rounded-lg text-sm ${
                        selectedCategory === category
                          ? 'bg-blue-600 text-white'
                          : 'bg-white border border-gray-200 text-gray-700'
                      }`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Duration filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                <div className="flex flex-wrap gap-2">
                  {durations.map(duration => (
                    <button
                      key={duration}
                      className={`px-3 py-2 rounded-lg text-sm ${
                        selectedDuration === duration
                          ? 'bg-blue-600 text-white'
                          : 'bg-white border border-gray-200 text-gray-700'
                      }`}
                      onClick={() => setSelectedDuration(duration)}
                    >
                      {duration}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Price range filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
                <div className="flex flex-wrap gap-2">
                  {priceRanges.map(range => (
                    <button
                      key={range}
                      className={`px-3 py-2 rounded-lg text-sm ${
                        selectedPriceRange === range
                          ? 'bg-blue-600 text-white'
                          : 'bg-white border border-gray-200 text-gray-700'
                      }`}
                      onClick={() => setSelectedPriceRange(range)}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Sort by */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
                <select
                  className="block w-full bg-white border border-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="recommended">Recommended</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>
            </div>
          )}
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
                {sortedTours.map((tour) => (
                  <div
                    key={tour.id}
                    className={`bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl border border-gray-100 group ${
                      animatedItems.includes(tour.id) ? 'animate-fade-in-up' : 'opacity-0'
                    }`}
                    style={{ animationDelay: `${200 + sortedTours.indexOf(tour) * 100}ms` }}
                    onClick={() => handleTourClick(tour.id)}
                  >
                    {/* Image container */}
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={tour.image}
                        alt={tour.title}
                        fill
                        style={{ objectFit: 'cover' }}
                        className="transition-transform duration-700 group-hover:scale-110 filter saturate-100 group-hover:saturate-125"
                        priority={sortedTours.indexOf(tour) < 3}
                      />
                      
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                      
                      {/* Category tag */}
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-medium text-blue-800 shadow-sm transform transition-transform group-hover:scale-105">
                        {tour.tag}
                      </div>
                      
                      {/* Favorite button with animation */}
                      <button
                        className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm transition-transform hover:scale-110 shadow-sm"
                        onClick={(e) => toggleFavorite(e, tour.id)}
                      >
                        <Heart
                          className={`w-4 h-4 transition-all duration-300 ${
                            favorites.includes(tour.id) 
                              ? 'fill-red-500 text-red-500 scale-110' 
                              : 'text-gray-600 group-hover:text-red-400'
                          }`}
                        />
                      </button>
                      
                      {/* Quick info on image */}
                      <div className="absolute bottom-4 left-4 flex space-x-2">
                        <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-medium text-gray-800 flex items-center">
                          <Sun className="w-3 h-3 text-orange-500 mr-1" />
                          {tour.days}d
                        </div>
                        <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-medium text-gray-800 flex items-center">
                          <Moon className="w-3 h-3 text-indigo-500 mr-1" />
                          {tour.nights}n
                        </div>
                        <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-medium text-gray-800 flex items-center">
                          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400 mr-1" />
                          {tour.rating}
                        </div>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-5">
                      {/* Title with highlight effect on hover */}
                      <h3 className="font-bold text-lg mb-2 text-gray-800 line-clamp-2 group-hover:text-blue-700 transition-colors duration-300">
                        {tour.title}
                      </h3>
                      
                      {/* Location with icon animation */}
                      <div className="flex items-center text-gray-600 mb-4">
                        <div className="bg-blue-50 rounded-full p-1 mr-2 group-hover:bg-blue-100 transition-colors">
                          <MapPin className="w-3.5 h-3.5 text-blue-500 group-hover:scale-110 transition-transform" />
                        </div>
                        <span className="text-sm font-medium">{tour.location}</span>
                      </div>
                      
                      {/* Capacity with subtle background */}
                      <div className="bg-gray-50 rounded-lg p-2.5 flex items-center text-sm text-gray-600 mb-4 group-hover:bg-gray-100 transition-colors">
                        <Users className="w-4 h-4 mr-2 text-blue-500" />
                        <span className="font-medium">{tour.guests} guests</span>
                      </div>
                      
                      {/* Price and CTA */}
                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <div>
                          <span className="font-bold text-xl text-blue-700 group-hover:text-blue-800 transition-colors">
                            {formatPrice(tour.price)}
                          </span>
                          <span className="text-gray-500 text-sm ml-1">per person</span>
                        </div>
                        <div className="relative overflow-hidden rounded-lg">
                          <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-2.5 px-5 rounded-lg font-medium flex items-center transform transition-all duration-300 group-hover:shadow-md relative z-10">
                            View Details
                            <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                          </button>
                          <div className="absolute inset-0 bg-blue-500 rounded-lg scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></div>
                        </div>
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
                    setSelectedCategory('All');
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