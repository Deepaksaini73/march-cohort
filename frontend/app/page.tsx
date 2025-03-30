"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Star, MapPin, Users, Calendar, ChevronDown, Search } from 'lucide-react';
import TravelExperience from './components/TravelExperience';
import WhyTravelWithUs from './components/whyus/WhyTravelWithUs';
import TestimonialSlider from './components/testimonials/TestimonialSlider';
import SearchBar from './components/SearchBar';

interface CategoryTour {
  name: string;
  address: string;
  rating: number;
  total_ratings: number;
  photo_reference: string;
  place_id: string;
  price: number;
  duration: string;
}

const categories = [
  {
    id: 'mountain',
    name: 'Mountain',
    image: 'https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?auto=format&fit=crop&q=80',
    tours: '356 Tours',
    activities: '264 Activities',
    defaultLocation: 'Himachal Pradesh'
  },
  {
    id: 'safari',
    name: 'Safari',
    image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80',
    tours: '356 Tours',
    activities: '264 Activities',
    defaultLocation: 'Rajasthan'
  },
  {
    id: 'desert',
    name: 'Desert',
    image: 'https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?auto=format&fit=crop&q=80',
    tours: '356 Tours',
    activities: '264 Activities',
    defaultLocation: 'Rajasthan'
  },
  {
    id: 'flower',
    name: 'Flower',
    image: 'https://images.unsplash.com/photo-1530092285049-1c42085fd395?auto=format&fit=crop&q=80',
    tours: '356 Tours',
    activities: '264 Activities',
    defaultLocation: 'Kerala'
  },
  {
    id: 'beach',
    name: 'Beach',
    image: 'https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?auto=format&fit=crop&q=80',
    tours: '356 Tours',
    activities: '264 Activities',
    defaultLocation: 'Goa'
  },
  {
    id: 'temple',
    name: 'Temples',
    image: 'https://images.unsplash.com/photo-1570458436416-b8fcccfe883f?auto=format&fit=crop&q=80',
    tours: '356 Tours',
    activities: '264 Activities',
    defaultLocation: 'Tamil Nadu'
  },
  {
    id: 'yacht',
    name: 'Yacht',
    image: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&q=80',
    tours: '356 Tours',
    activities: '264 Activities',
    defaultLocation: 'Mumbai'
  },
  {
    id: 'valley',
    name: 'Valley',
    image: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&q=80',
    tours: '356 Tours',
    activities: '264 Activities',
    defaultLocation: 'Uttarakhand'
  }
];

export default function HomePage() {
  const [selectedTab, setSelectedTab] = useState('Tours');
  const [location, setLocation] = useState('Mumbai, India');
  const [guests, setGuests] = useState(4);
  const [days, setDays] = useState(3);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categoryTours, setCategoryTours] = useState<CategoryTour[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCategoryTours = async (category: string, location: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5000/api/places/tours?category=${category}&location=${location}&limit=10`
      );
      const data = await response.json();
      setCategoryTours(data.tours || []);
      setSelectedCategory(category);
    } catch (error) {
      console.error('Error fetching tours:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section with Background */}
      <div 
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center" 
        style={{ 
          backgroundImage: 'url(https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=80&w=2070&auto=format&fit=crop)',
          backgroundPosition: 'center 40%'
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 w-full px-4 py-20">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Discover Your Next Adventure
            </h1>
            <p className="text-xl text-white/90 mb-12">
              Plan your perfect trip with our expert recommendations
            </p>
          </div>

          {/* Search Bar */}
          <SearchBar />
        </div>
      </div>

      {/* Top Categories Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Top Categories of Tours</h2>
            <p className="text-gray-600 mt-2">Favorite destinations based on customer reviews</p>
          </div>
          <Link
            href="/tours"
            className="flex items-center gap-2 bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-colors"
          >
            View More
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/home/categories-selected?category=${category.id}&location=${category.defaultLocation}`}
              className="group"
            >
              <div className="relative h-64 rounded-2xl overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{category.name}</h3>
                  <p className="text-white/80 text-sm">
                    {category.tours}, {category.activities}
                  </p>
                </div>
                <div className="absolute top-4 right-4">
                  <ChevronRight className="w-6 h-6 text-white" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Selected Category Tours */}
      {selectedCategory && (
        <section className="max-w-7xl mx-auto px-4 pb-16">
          <div className="relative h-[40vh] rounded-3xl overflow-hidden mb-12">
            <Image
              src={categories.find(c => c.id === selectedCategory)?.image || ''}
              alt={selectedCategory}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 p-12 text-white">
              <h2 className="text-5xl font-bold mb-4">{selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Tours</h2>
              <p className="text-lg">356 Tours, 264 Activities</p>
            </div>
          </div>

          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-4">About {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Tours</h3>
            <p className="text-gray-600">
              Explore majestic {selectedCategory} destinations, challenging experiences, and breathtaking views with our {selectedCategory} tours and activities.
            </p>
          </div>

          <h3 className="text-2xl font-bold mb-8">Popular {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Tours</h3>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((n) => (
                <div key={n} className="bg-white rounded-2xl overflow-hidden shadow-lg animate-pulse">
                  <div className="h-48 bg-gray-200" />
                  <div className="p-6 space-y-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                    <div className="h-4 bg-gray-200 rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categoryTours.map((tour) => (
                <div
                  key={tour.place_id}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="relative h-48">
                    <Image
                      src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${tour.photo_reference}&key=AIzaSyB4Pk-oT_sJ7u2XmcDmSeFcTLM08Ukkpv0`}
                      alt={tour.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-bold mb-2">{tour.name}</h4>
                    <div className="flex items-center mb-4">
                      <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                      <span className="ml-2 text-gray-600">
                        {tour.rating.toFixed(1)} ({tour.total_ratings} reviews)
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-gray-600">{tour.address}</div>
                      <div className="text-xl font-bold text-blue-600">₹{tour.price}</div>
                    </div>
                    <Link
                      href={`/tour/${tour.place_id}`}
                      className="block w-full mt-4"
                    >
                      <button className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors">
                        View Details
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Why Travel With Us Section */}
      <WhyTravelWithUs />

      {/* Testimonials Section */}
      <TestimonialSlider />
    </main>
  );
}
