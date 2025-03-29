'use client'

import React, { useEffect, useState, useRef } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeft, MapPin, Calendar, Star, Users, Clock, Sun, Thermometer, DollarSign, Globe, Heart, Leaf, Wind, Waves } from 'lucide-react';
import Link from 'next/link';

interface DestinationDetails {
  id: number;
  name: string;
  country: string;
  description: string;
  longDescription: string;
  images: string[];
  rating: number;
  reviews: number;
  bestTimeToVisit: string;
  weather: string;
  averageTemperature: string;
  currency: string;
  language: string;
  attractions: { name: string; description: string }[];
  activities: string[];
  localCuisine: string[];
  travelTips: string[];
  mindfulExperiences: string[];
  sustainabilityScore: number;
}

export default function DestinationPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const title = searchParams?.get('title') || 'Destination';
  const id = params?.id;
  
  const [destination, setDestination] = useState<DestinationDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const hasMounted = useRef(false);
  
  // Safely get country info without causing hydration mismatch
  const getCountryForDestination = (destName: string): string => {
    // Simple mapping logic - would be replaced by real data in production
    if (destName.includes('California') || destName.includes('NYC') || destName.includes('Canyon')) {
      return 'United States';
    } else if (destName.includes('Maldives')) {
      return 'Maldives';
    } else if (destName.includes('Santorini')) {
      return 'Greece';
    } else {
      return 'International';
    }
  };
  
  useEffect(() => {
    hasMounted.current = true;
    
    // For demo purposes, simulate API call
    const fetchTimeout = setTimeout(() => {
      if (!hasMounted.current) return;
      
      // Mock API response
      const mockDestination: DestinationDetails = {
        id: Number(id),
        name: title,
        country: getCountryForDestination(title),
        description: `Experience the beauty and mindfulness in ${title}`,
        longDescription: `${title} offers a unique opportunity to connect with yourself and nature. This mindful travel destination allows visitors to slow down, breathe deeply, and experience the present moment fully. From meditation spaces to natural healing experiences, this journey will transform your perspective on travel.`,
        images: [
          "/images/santorini.jpg",
          "/images/boating.jpg",
          "/images/maldives.jpg",
          "/images/santorini.jpg",
          "/images/boating.jpg",
        ],
        rating: 4.8,
        reviews: 425,
        bestTimeToVisit: "April to October",
        weather: "Mediterranean",
        averageTemperature: "75°F (24°C)",
        currency: "Local Currency",
        language: "Local Language and English",
        attractions: [
          {
            name: "Mindfulness Garden",
            description: "A peaceful garden designed for meditation and reflection."
          },
          {
            name: "Sacred Natural Spaces",
            description: "Ancient forests and stunning landscapes that inspire awe and connection."
          },
          {
            name: "Local Wellness Center",
            description: "Experience traditional healing practices and modern wellness techniques."
          }
        ],
        activities: [
          "Guided meditation sessions",
          "Mindful hiking experiences",
          "Local yoga retreats",
          "Sustainable farm visits",
          "Cultural immersion workshops"
        ],
        localCuisine: [
          "Farm-to-table organic meals",
          "Plant-based local specialties",
          "Mindful eating experiences",
          "Traditional healing teas"
        ],
        travelTips: [
          "Pack comfortable clothing for meditation sessions",
          "Bring a reusable water bottle to reduce plastic waste",
          "Respect local customs at sacred sites",
          "Consider a digital detox during your stay"
        ],
        mindfulExperiences: [
          "Sunrise meditation on the beach",
          "Forest bathing with local guides",
          "Traditional tea ceremonies",
          "Sound healing sessions in natural acoustics"
        ],
        sustainabilityScore: 8.5
      };
      
      setDestination(mockDestination);
      setLoading(false);
      
      // Check if destination is in favorites
      if (typeof window !== 'undefined') {
        const favorites = JSON.parse(localStorage.getItem('destinationFavorites') || '[]');
        setIsFavorite(favorites.includes(Number(id)));
      }
    }, 1000);
    
    return () => {
      hasMounted.current = false;
      clearTimeout(fetchTimeout);
    };
  }, [id, title]);
  
  const showToast = (message: string) => {
    if (typeof window === 'undefined') return;
    
    const toast = document.createElement('div');
    toast.className = 'fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in-out';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      if (!document.body.contains(toast)) return;
      toast.classList.add('opacity-0');
      setTimeout(() => {
        if (document.body.contains(toast)) {
          document.body.removeChild(toast);
        }
      }, 300);
    }, 3000);
  };
  
  const handleToggleFavorite = () => {
    if (!hasMounted.current || typeof window === 'undefined') return;
    
    const favorites = JSON.parse(localStorage.getItem('destinationFavorites') || '[]');
    
    let newFavorites;
    if (isFavorite) {
      newFavorites = favorites.filter((destId: number) => destId !== Number(id));
      showToast(`${destination?.name} removed from favorites`);
    } else {
      newFavorites = [...favorites, Number(id)];
      showToast(`${destination?.name} added to favorites!`);
    }
    
    localStorage.setItem('destinationFavorites', JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700">Finding your zen destination...</h2>
        </div>
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md px-4">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Destination Not Found</h2>
          <p className="text-gray-600 mb-6">We couldn't find the destination you're looking for. It may have been removed or the link is incorrect.</p>
          <Link href="/tours" className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full">
            Browse All Om Tour Destinations
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      {/* Hero Section with Image Gallery */}
      <div className="relative h-[70vh] bg-gray-900">
        <Image 
          src={destination.images[activeImageIndex]}
          alt={destination.name}
          fill
          priority
          className="object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 flex flex-col justify-end p-6 md:p-10">
          <div className="container mx-auto">
            <div className="text-center text-white mb-4">
              <span className="px-4 py-1 rounded-full text-xs font-medium bg-blue-600/50 backdrop-blur-sm">Om Tour Experience</span>
            </div>
            <div className="flex items-center justify-center mb-2">
              <MapPin className="h-5 w-5 text-white mr-2" />
              <span className="text-white font-medium">{destination.country}</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 text-center">{destination.name}</h1>
            <div className="flex items-center justify-center gap-4 text-white mb-6">
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-400 mr-1 fill-current" />
                <span>{destination.rating.toFixed(1)}</span>
                <span className="text-gray-300 ml-1">({destination.reviews} reviews)</span>
              </div>
            </div>
            <div className="flex justify-center space-x-3 md:space-x-4 mt-4">
              {destination.images.slice(0, 5).map((image, index) => (
                <button 
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`relative h-16 w-24 md:h-20 md:w-32 rounded overflow-hidden ${index === activeImageIndex ? 'ring-2 ring-white' : 'opacity-70'}`}
                >
                  <Image 
                    src={image} 
                    alt={`${destination.name} ${index + 1}`} 
                    fill 
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
        <Link href="/tours" className="absolute top-6 left-6 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 rounded-full transition duration-200">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <button 
          onClick={handleToggleFavorite}
          className={`absolute top-6 right-6 p-3 rounded-full transition-colors ${isFavorite ? 'bg-pink-500 text-white' : 'bg-white/20 text-white hover:bg-white/30'} backdrop-blur-sm`}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart className={`h-6 w-6 ${isFavorite ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Sustainability Score */}
      <div className="container mx-auto px-4 -mt-10 relative z-10 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-4 max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Leaf className="h-6 w-6 text-green-500 mr-3" />
            <div>
              <h3 className="font-semibold text-gray-700">Sustainability Score</h3>
              <p className="text-green-600 font-medium">{destination.sustainabilityScore}/10</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden md:inline text-sm text-gray-500">This destination practices:</span>
            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Eco-friendly</span>
            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">Local Economy</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column: Main Info */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-2xl font-bold mb-4 text-blue-600">About {destination.name}</h2>
              <p className="text-gray-600 mb-4">{destination.description}</p>
              <p className="text-gray-600 mb-6">{destination.longDescription}</p>
              
              <div className="border-t border-gray-100 pt-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Why This is an Om Tour Destination:</h3>
                <p className="text-gray-600 mb-4">
                  We've selected {destination.name} as an Om Tour destination because it provides the perfect balance of natural beauty, mindful experiences, and opportunities for personal growth. Here, you can reconnect with yourself while experiencing the local culture in an authentic and sustainable way.
                </p>
              </div>
            </div>

            {/* Mindful Experiences */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex items-center mb-4">
                <Wind className="h-6 w-6 text-blue-600 mr-2" />
                <h2 className="text-2xl font-bold text-blue-600">Mindful Experiences</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {destination.mindfulExperiences.map((experience, index) => (
                  <div key={index} className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-400">
                    <p className="text-gray-700">{experience}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Attractions */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-2xl font-bold mb-4 text-blue-600">Sacred Places & Attractions</h2>
              <div className="space-y-4">
                {destination.attractions.map((attraction, index) => (
                  <div key={index} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                    <h3 className="text-lg font-semibold text-gray-800">{attraction.name}</h3>
                    <p className="text-gray-600">{attraction.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Activities */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex items-center mb-4">
                <Waves className="h-6 w-6 text-blue-600 mr-2" />
                <h2 className="text-2xl font-bold text-blue-600">Mindful Activities</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {destination.activities.map((activity, index) => (
                  <div key={index} className="flex items-start">
                    <div className="bg-blue-100 rounded-full p-2 mr-3 mt-1">
                      <Sun className="h-4 w-4 text-blue-600" />
                    </div>
                    <span className="text-gray-700">{activity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Local Cuisine */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold mb-4 text-blue-600">Nurturing Local Cuisine</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {destination.localCuisine.map((cuisine, index) => (
                  <div key={index} className="flex items-start">
                    <div className="bg-orange-100 rounded-full p-2 mr-3 mt-1">
                      <span className="h-4 w-4 text-orange-600 flex items-center justify-center text-sm">🍽️</span>
                    </div>
                    <span className="text-gray-700">{cuisine}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Details & Tips */}
          <div className="lg:w-1/3">
            {/* Travel Info Card */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold mb-4 text-blue-600">Travel Information</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Calendar className="h-5 w-5 text-blue-600 mr-3 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900">Best Time to Visit</h3>
                    <p className="text-gray-600">{destination.bestTimeToVisit}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Thermometer className="h-5 w-5 text-blue-600 mr-3 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900">Weather & Temperature</h3>
                    <p className="text-gray-600">{destination.weather}, avg. {destination.averageTemperature}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <DollarSign className="h-5 w-5 text-blue-600 mr-3 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900">Currency</h3>
                    <p className="text-gray-600">{destination.currency}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Globe className="h-5 w-5 text-blue-600 mr-3 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900">Languages</h3>
                    <p className="text-gray-600">{destination.language}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Travel Tips Card */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold mb-4 text-blue-600">Mindful Travel Tips</h2>
              <ul className="space-y-3">
                {destination.travelTips.map((tip, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span className="text-gray-700">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Book Tours Card */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4 text-blue-600">Begin Your Journey</h2>
              <p className="text-gray-700 mb-6">Experience the serenity and mindfulness of {destination.name} with our curated Om Tour packages.</p>
              <Link href={`/tours?destination=${encodeURIComponent(destination.name)}`} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white w-full py-3 rounded-lg flex justify-center items-center font-medium transition duration-200">
                View Om Tour Packages
              </Link>
              <p className="text-xs text-center text-gray-500 mt-4">10% of your booking supports local sustainability initiatives</p>
            </div>
          </div>
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
      `}</style>
    </div>
  );
} 