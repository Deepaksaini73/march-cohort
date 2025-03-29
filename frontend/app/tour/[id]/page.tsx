"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';

interface TourDetails {
  id: number;
  title: string;
  description: string;
  images: string[];
  price: number;
  rating: number;
  reviews: number;
  days: number;
  nights: number;
  guests: string;
  location: string;
  itinerary: { day: number; title: string; description: string }[];
  included: string[];
  notIncluded: string[];
  highlights: string[];
}

export default function TourDetailPage() {
  const params = useParams();
  const id = params.id;
  
  const [tour, setTour] = useState<TourDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    async function fetchTourData() {
      setLoading(true);
      try {
        // In a real app, fetch from your API here
        // const response = await fetch(`/api/tours/${id}`);
        // if (!response.ok) throw new Error('Failed to fetch tour data');
        // const data = await response.json();
        
        // For demo purposes, we'll simulate an API response with mock data
        setTimeout(() => {
          const mockData: TourDetails = {
            id: Number(id),
            title: id === "1" || id === "4" 
              ? "California Sunset/Twilight Boat Cruise" 
              : id === "2" || id === "5"
              ? "NYC: Food Tastings and Culture Tour"
              : "Grand Canyon Horseshoe Bend 2 days",
            description: "Experience the beauty and wonder of this amazing destination with our expertly guided tour. This comprehensive tour offers a perfect blend of adventure, relaxation, and cultural immersion. Join us for an unforgettable journey through some of the most breathtaking landscapes and vibrant local scenes.",
            images: [
              id === "1" || id === "4" ? "/images/boating.jpg" : 
              id === "2" || id === "5" ? "/images/santorini.jpg" : 
              "/images/maldives.jpg",
              "/images/ocean-wave.jpg"
            ],
            price: id === "1" || id === "4" 
              ? 48.25 
              : id === "2" || id === "5"
              ? 17.32
              : 15.63,
            rating: 4.96,
            reviews: 672,
            days: id === "1" || id === "4" 
              ? 2 
              : id === "2" || id === "5"
              ? 3
              : 7,
            nights: id === "1" || id === "4" 
              ? 3 
              : id === "2" || id === "5"
              ? 3
              : 6,
            guests: "4-6",
            location: id === "1" || id === "4" 
              ? "San Francisco, California" 
              : id === "2" || id === "5"
              ? "New York City, New York"
              : "Grand Canyon, Arizona",
            itinerary: [
              { 
                day: 1, 
                title: "Day 1: Arrival & Welcome", 
                description: "Arrive at your destination and check into your accommodation. Meet your guide for a welcome orientation and enjoy a relaxing evening preparing for the adventure ahead." 
              },
              { 
                day: 2, 
                title: "Day 2: Exploration Begins", 
                description: "After breakfast, embark on your first full day of exploration. Visit key landmarks, enjoy local cuisine, and immerse yourself in the culture and beauty of the area." 
              },
              { 
                day: 3, 
                title: "Day 3: Adventure Day", 
                description: "Today is dedicated to more active adventures. Depending on your tour package, this might include hiking, boating, or other exciting outdoor activities." 
              }
            ],
            included: [
              "Professional English-speaking guide",
              "Accommodation as per itinerary",
              "Transportation during the tour",
              "Entrance fees to attractions",
              "Daily breakfast"
            ],
            notIncluded: [
              "International flights",
              "Personal expenses",
              "Travel insurance",
              "Optional activities not mentioned in the itinerary",
              "Gratuities"
            ],
            highlights: [
              "Explore breathtaking natural landscapes",
              "Experience authentic local culture",
              "Enjoy comfortable accommodations",
              "Taste delicious regional cuisine",
              "Create unforgettable memories with expert guides"
            ]
          };
          
          setTour(mockData);
          setLoading(false);
        }, 1000); // Simulate API delay
      } catch (err) {
        setError('Failed to load tour details. Please try again later.');
        setLoading(false);
      }
    }
    
    if (id) {
      fetchTourData();
    }
  }, [id]);
  
  if (loading) {
    return (
      <main className="min-h-screen bg-white">
        <div className="max-w-6xl mx-auto p-4 py-20">
          <div className="flex flex-col items-center justify-center h-64">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600">Loading tour details...</p>
          </div>
        </div>
      </main>
    );
  }
  
  if (error || !tour) {
    return (
      <main className="min-h-screen bg-white">
        <div className="max-w-6xl mx-auto p-4 py-20">
          <div className="flex flex-col items-center justify-center h-64">
            <div className="text-red-600 text-xl mb-4">⚠️</div>
            <p className="text-xl font-bold text-gray-800">Oops! Something went wrong.</p>
            <p className="text-gray-600 mt-2">{error || 'Unable to load tour information.'}</p>
          </div>
        </div>
      </main>
    );
  }
  
  return (
    <main className="min-h-screen bg-white">
      {/* Hero image section */}
      <div className="relative h-[60vh] w-full">
        <Image 
          src={tour.images[0]} 
          alt={tour.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 flex items-end">
          <div className="max-w-6xl mx-auto w-full p-6 text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{tour.title}</h1>
            <div className="flex items-center gap-6 mb-4">
              <div className="flex items-center">
                <span className="text-yellow-400 mr-2">★</span>
                <span>{tour.rating.toFixed(2)} ({tour.reviews} reviews)</span>
              </div>
              <div className="flex items-center">
                <span className="mr-2">📍</span>
                <span>{tour.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto p-4 py-12">
        {/* Tour overview */}
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <div className="md:w-2/3">
            <h2 className="text-3xl font-bold mb-6">Tour Overview</h2>
            <p className="text-gray-700 mb-6">{tour.description}</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-500 text-sm">Duration</p>
                <p className="font-bold">{tour.days} days, {tour.nights} nights</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-500 text-sm">Group Size</p>
                <p className="font-bold">{tour.guests} people</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-500 text-sm">Rating</p>
                <p className="font-bold">{tour.rating.toFixed(2)} out of 5</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-500 text-sm">Location</p>
                <p className="font-bold">{tour.location}</p>
              </div>
            </div>
            
            <h3 className="text-2xl font-bold mb-4">Highlights</h3>
            <ul className="list-disc pl-5 mb-8">
              {tour.highlights.map((highlight, index) => (
                <li key={index} className="mb-2 text-gray-700">{highlight}</li>
              ))}
            </ul>
          </div>
          
          <div className="md:w-1/3 bg-white rounded-lg shadow-md p-6 h-fit sticky top-24">
            <p className="text-3xl font-bold mb-2">${tour.price.toFixed(2)}</p>
            <p className="text-gray-500 mb-6">per person</p>
            
            <div className="border-t border-b py-4 mb-6">
              <div className="flex justify-between mb-4">
                <span className="text-gray-700">Date</span>
                <button className="text-blue-600 font-medium">Select date</button>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Guests</span>
                <button className="text-blue-600 font-medium">Add guests</button>
              </div>
            </div>
            
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium mb-4">
              Book Now
            </button>
            
            <button className="w-full bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 py-3 px-4 rounded-lg font-medium">
              Ask a Question
            </button>
          </div>
        </div>
        
        {/* Itinerary */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Itinerary</h2>
          <div className="space-y-6">
            {tour.itinerary.map((day, index) => (
              <div key={index} className="border-l-4 border-blue-600 pl-6 pb-6">
                <h3 className="text-xl font-bold mb-2">{day.title}</h3>
                <p className="text-gray-700">{day.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* What's included */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-xl font-bold mb-4">What's Included</h2>
            <ul className="space-y-2">
              {tour.included.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-4">What's Not Included</h2>
            <ul className="space-y-2">
              {tour.notIncluded.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-red-500 mr-2">✗</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Gallery */}
        <div>
          <h2 className="text-3xl font-bold mb-6">Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {tour.images.map((image, index) => (
              <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                <Image 
                  src={image} 
                  alt={`${tour.title} image ${index + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
} 