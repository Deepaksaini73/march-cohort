"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { MapPin, Star, Check, X } from 'lucide-react';

interface TourDetails {
  name: string;
  address: string;
  rating: number;
  total_ratings: number;
  photo_reference: string;
  place_id: string;
  price: number;
  overview: string;
  included: string[];
  notIncluded: string[];
  itinerary: {
    day: string;
    title: string;
    description: string;
  }[];
  gallery: string[];
}

const defaultTourDetails: Partial<TourDetails> = {
  rating: 4.96,
  total_ratings: 672,
  price: 48.25,
  overview: "Experience the beauty and wonder of this amazing destination with our expertly guided tour. This comprehensive tour offers a perfect blend of adventure, relaxation, and cultural immersion. Join us for an unforgettable journey through some of the most breathtaking landscapes and vibrant local scenes.",
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
  itinerary: [
    {
      day: "Day 1",
      title: "Arrival & Welcome",
      description: "Arrive at your destination and check into your accommodation. Meet your guide for a welcome orientation and enjoy a relaxing evening preparing for the adventure ahead."
    },
    {
      day: "Day 2",
      title: "Exploration Begins",
      description: "After breakfast, embark on your first full day of exploration. Visit key landmarks, enjoy local cuisine, and immerse yourself in the culture and beauty of the area."
    },
    {
      day: "Day 3",
      title: "Adventure Day",
      description: "Today is dedicated to more active adventures. Depending on your tour package, this might include hiking, boating, or other exciting outdoor activities."
    }
  ]
};

const TourDetailsPage = () => {
  const params = useParams();
  const router = useRouter();
  const [tourDetails, setTourDetails] = useState<TourDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTourDetails = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`http://localhost:5000/api/places/tours?category=heritage&location=Jaipur&limit=10`);
        const data = await response.json();
        
        const tour = data.tours?.find((t: any) => t.place_id === params.id);
        
        if (tour) {
          setTourDetails({
            ...defaultTourDetails,
            ...tour,
            price: Math.floor(Math.random() * (500 - 100 + 1)) + 100,
            gallery: [tour.photo_reference, tour.photo_reference]
          } as TourDetails);
        } else {
          console.error('Tour not found');
          router.push('/tours');
        }
      } catch (error) {
        console.error('Error fetching tour details:', error);
        setTourDetails(defaultTourDetails as TourDetails);
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      fetchTourDetails();
    }
  }, [params.id, router]);

  if (isLoading || !tourDetails) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-64 bg-gray-200 rounded"></div>
          <div className="h-4 w-48 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full">
        {tourDetails.photo_reference && (
          <Image
            src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=1200&photo_reference=${tourDetails.photo_reference}&key=AIzaSyB4Pk-oT_sJ7u2XmcDmSeFcTLM08Ukkpv0`}
            alt={tourDetails.name}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 flex items-end">
          <div className="max-w-6xl mx-auto w-full p-6 text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{tourDetails.name}</h1>
            <div className="flex items-center gap-6 mb-4">
              <div className="flex items-center">
                <span className="text-yellow-400 mr-2">★</span>
                <span>{tourDetails.rating.toFixed(2)} ({tourDetails.total_ratings} reviews)</span>
              </div>
              <div className="flex items-center">
                <span className="mr-2">📍</span>
                <span>{tourDetails.address}</span>
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
            <p className="text-gray-700 mb-6">{tourDetails.overview}</p>
          </div>
          
          <div className="md:w-1/3 bg-white rounded-lg shadow-md p-6 h-fit sticky top-24">
            <p className="text-3xl font-bold mb-2">₹{tourDetails.price.toFixed(2)}</p>
            <p className="text-gray-500 mb-6">Entry Fee</p>
            
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
            {tourDetails.itinerary.map((day, index) => (
              <div key={index} className="border-l-4 border-blue-600 pl-6 pb-6">
                <h3 className="text-xl font-bold mb-2">{day.title}</h3>
                <p className="text-gray-700">{day.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* What's included/not included */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-xl font-bold mb-4">What's Included</h2>
            <ul className="space-y-2">
              {tourDetails.included.map((item, index) => (
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
              {tourDetails.notIncluded.map((item, index) => (
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
            {tourDetails.gallery.map((photo, index) => (
              <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                <Image
                  src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photo}&key=AIzaSyB4Pk-oT_sJ7u2XmcDmSeFcTLM08Ukkpv0`}
                  alt={`${tourDetails.name} image ${index + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourDetailsPage; 