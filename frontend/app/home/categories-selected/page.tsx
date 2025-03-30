"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, Star } from 'lucide-react';

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

export default function CategorySelectedPage() {
  const searchParams = useSearchParams();
  const [categoryTours, setCategoryTours] = useState<CategoryTour[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const category = searchParams.get('category');
  const location = searchParams.get('location');
  const selectedCategoryData = categories.find(c => c.id === category);

  useEffect(() => {
    const fetchCategoryTours = async () => {
      if (!category || !location) return;
      
      try {
        const response = await fetch(
          `http://localhost:5000/api/places/tours?category=${category}&location=${location}&limit=10`
        );
        const data = await response.json();
        setCategoryTours(data.tours || []);
      } catch (error) {
        console.error('Error fetching tours:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategoryTours();
  }, [category, location]);

  if (!selectedCategoryData) return null;

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="relative h-[40vh] rounded-3xl overflow-hidden mb-12">
        <Image
          src={selectedCategoryData.image}
          alt={selectedCategoryData.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute top-8 left-8">
          <Link
            href="/"
            className="flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full hover:bg-white/30 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to Home
          </Link>
        </div>
        <div className="absolute bottom-0 left-0 p-12 text-white">
          <h2 className="text-5xl font-bold mb-4">{selectedCategoryData.name} Tours</h2>
          <p className="text-lg">{selectedCategoryData.tours}, {selectedCategoryData.activities}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-4">About {selectedCategoryData.name} Tours</h3>
          <p className="text-gray-600">
            Explore majestic {selectedCategoryData.name.toLowerCase()} destinations, challenging experiences, and breathtaking views with our {selectedCategoryData.name.toLowerCase()} tours and activities.
          </p>
        </div>

        <h3 className="text-2xl font-bold mb-8">Popular {selectedCategoryData.name} Tours</h3>
        
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
      </div>
    </main>
  );
} 