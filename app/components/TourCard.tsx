'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Heart } from 'lucide-react';

interface TourCardProps {
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
}

export default function TourCard({ 
  id,
  title, 
  tag, 
  rating, 
  reviews, 
  days, 
  nights, 
  guests, 
  price, 
  image 
}: TourCardProps) {
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const hasMounted = useRef(false);

  // Load favorites from localStorage on component mount
  useEffect(() => {
    hasMounted.current = true;
    try {
      const favorites = JSON.parse(localStorage.getItem('tourFavorites') || '[]');
      setIsFavorite(favorites.includes(id));
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
    
    return () => {
      hasMounted.current = false;
    };
  }, [id]);

  const handleViewDetails = () => {
    setIsLoading(true);
    
    try {
      // Show loading indicator as we're fetching destination info
      const loadingToast = document.createElement('div');
      loadingToast.className = 'fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 flex items-center';
      loadingToast.innerHTML = `
        <svg class="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Fetching destination information...
      `;
      document.body.appendChild(loadingToast);

      // Simulate API call (replace with actual API call in production)
      setTimeout(() => {
        if (document.body.contains(loadingToast)) {
          document.body.removeChild(loadingToast);
        }
        setIsLoading(false);
        router.push(`/destination/${id}?title=${encodeURIComponent(title)}`);
      }, 1000);
    } catch (error) {
      console.error('Error in view details:', error);
      setIsLoading(false);
      router.push(`/destination/${id}?title=${encodeURIComponent(title)}`);
    }
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    if (!hasMounted.current) return;
    
    e.stopPropagation();
    
    try {
      // Get current favorites from localStorage
      const favorites = JSON.parse(localStorage.getItem('tourFavorites') || '[]');
      
      // Toggle favorite status
      let newFavorites;
      if (isFavorite) {
        newFavorites = favorites.filter((tourId: number) => tourId !== id);
      } else {
        newFavorites = [...favorites, id];
        
        // Show toast notification
        const toast = document.createElement('div');
        toast.className = 'fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in-out';
        toast.textContent = `${title} added to favorites!`;
        document.body.appendChild(toast);
        
        // Remove toast after 3 seconds
        setTimeout(() => {
          if (document.body.contains(toast)) {
            toast.classList.add('opacity-0');
            setTimeout(() => {
              if (document.body.contains(toast)) {
                document.body.removeChild(toast);
              }
            }, 300); // Wait for fade out animation
          }
        }, 3000);
      }
      
      // Update localStorage and state
      localStorage.setItem('tourFavorites', JSON.stringify(newFavorites));
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md relative hover:shadow-lg transition-shadow duration-300">
      <div 
        className="relative h-56 w-full cursor-pointer" 
        onClick={handleViewDetails}
      >
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        <button 
          className={`absolute top-4 right-4 p-1.5 rounded-full ${isFavorite ? 'bg-pink-500 text-white' : 'bg-white/80 text-gray-600'} transition-colors hover:scale-110`}
          onClick={handleToggleFavorite}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
        </button>
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            tag === 'Top Rated' ? 'bg-amber-100 text-amber-800' : 
            tag === 'Best Sale' ? 'bg-green-100 text-green-800' : 
            'bg-orange-100 text-orange-800'
          }`}>
            {tag}
          </span>
        </div>
        
        <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center">
          <div className="flex items-center text-white">
            <span className="mr-1">★</span>
            <span className="font-semibold">{rating.toFixed(1)}</span>
            <span className="text-white/80 ml-1">({reviews})</span>
          </div>
          <div className="text-white font-semibold">${price.toFixed(0)}</div>
        </div>
      </div>
      
      <div className="p-5">
        <h3 
          className="font-bold text-xl mb-3 cursor-pointer hover:text-blue-600 transition-colors"
          onClick={handleViewDetails}
        >
          {title}
        </h3>
        
        <div className="flex items-center gap-3 mb-4 text-gray-600">
          <div className="flex items-center text-sm">
            <span className="mr-1">🕒</span>
            <span>{days} days</span>
          </div>
          <div className="flex items-center text-sm">
            <span className="mr-1">🌙</span>
            <span>{nights} nights</span>
          </div>
          <div className="flex items-center text-sm">
            <span className="mr-1">👥</span>
            <span>{guests}</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-4">
          <div>
            <span className="text-sm text-gray-500">From</span>
            <div>
              <span className="font-bold text-xl text-blue-600">${price.toFixed(2)}</span>
              <span className="text-gray-500 text-sm">/person</span>
            </div>
          </div>
          
          <button 
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300"
            onClick={handleViewDetails}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
} 