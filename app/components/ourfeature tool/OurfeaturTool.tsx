import { useState, useEffect, useRef } from 'react';
import { Heart } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

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

const TourCard = ({ 
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
}: TourCardProps) => {
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const hasMounted = useRef(false);

  // Load favorites from localStorage on component mount
  useEffect(() => {
    hasMounted.current = true;
    const favorites = JSON.parse(localStorage.getItem('tourFavorites') || '[]');
    setIsFavorite(favorites.includes(id));
  }, [id]);

  const handleViewDetails = () => {
    setIsLoading(true);
    
    // Only run in browser
    if (typeof window !== 'undefined') {
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
        document.body.removeChild(loadingToast);
        setIsLoading(false);
        router.push(`/destination/${id}?title=${encodeURIComponent(title)}`);
      }, 1000);
    } else {
      // If SSR, just navigate directly
      router.push(`/destination/${id}?title=${encodeURIComponent(title)}`);
    }
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    if (!hasMounted.current) return;
    
    e.stopPropagation();
    
    // Get current favorites from localStorage
    const favorites = JSON.parse(localStorage.getItem('tourFavorites') || '[]');
    
    // Toggle favorite status
    let newFavorites;
    if (isFavorite) {
      newFavorites = favorites.filter((tourId: number) => tourId !== id);
    } else {
      newFavorites = [...favorites, id];
      
      if (typeof window !== 'undefined') {
        // Show toast notification
        const toast = document.createElement('div');
        toast.className = 'fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in-out';
        toast.textContent = `${title} added to favorites!`;
        document.body.appendChild(toast);
        
        // Remove toast after 3 seconds
        setTimeout(() => {
          toast.classList.add('opacity-0');
          setTimeout(() => {
            document.body.removeChild(toast);
          }, 300); // Wait for fade out animation
        }, 3000);
      }
    }
    
    // Update localStorage and state
    localStorage.setItem('tourFavorites', JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md relative">
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
        <button 
          className={`absolute top-4 right-4 p-1.5 rounded-full ${isFavorite ? 'bg-pink-500 text-white' : 'bg-white/80 text-gray-600'} transition-colors`}
          onClick={handleToggleFavorite}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
        </button>
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            tag === 'Historical' ? 'bg-amber-100 text-amber-800' : 
            tag === 'Cultural' ? 'bg-green-100 text-green-800' : 
            tag === 'Temple' ? 'bg-purple-100 text-purple-800' :
            tag === 'Nature' ? 'bg-blue-100 text-blue-800' :
            tag === 'Beach' ? 'bg-cyan-100 text-cyan-800' :
            'bg-orange-100 text-orange-800'
          }`}>
            {tag}
          </span>
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex items-center mb-3">
          <div className="flex items-center text-amber-400">
            <span className="mr-1">★</span>
            <span className="font-semibold text-sm">{rating.toFixed(2)}</span>
          </div>
          <span className="text-sm text-gray-500 ml-1">({reviews} reviews)</span>
        </div>
        
        <h3 
          className="font-bold text-xl mb-2 cursor-pointer hover:text-blue-600 transition-colors"
          onClick={handleViewDetails}
        >
          {title}
        </h3>
        
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <span className="mr-1">◯</span>
            <span>{days} days {nights} nights</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <span className="mr-1">◯</span>
            <span>{guests} guest</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center mb-3">
          <div>
            <span className="font-bold text-xl">₹{price.toFixed(2)}</span>
            <span className="text-gray-500 text-sm"> / person</span>
          </div>
          <button 
            className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 px-4 py-2 rounded-full text-sm font-medium"
            onClick={(e) => {
              e.stopPropagation();
              // Add booking functionality here
              if (typeof window !== 'undefined') {
                alert(`Booking for ${title}`);
              }
            }}
          >
            Book Now
          </button>
        </div>
        
        <button 
          className="w-full bg-transparent hover:bg-gray-50 text-blue-600 border border-blue-600 px-4 py-2 rounded-full text-sm font-medium"
          onClick={handleViewDetails}
        >
          SEE
        </button>
      </div>
    </div>
  );
};

const OurFeatureTool = () => {
  const router = useRouter();
  const hasMounted = useRef(false);
  
  const tours = [
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
      image: "/images/boating.jpg"
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
      image: "/images/santorini.jpg"
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
      image: "/images/maldives.jpg"
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
      image: "/images/boating.jpg"
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
      image: "/images/santorini.jpg"
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
      image: "/images/maldives.jpg"
    },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    hasMounted.current = true;
  }, []);

  return (
    <section className="py-12 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-2">Our Featured Tours</h2>
        <p className="text-gray-600 mb-8">Favorite destinations based on customer reviews</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tours.map((tour) => (
            <TourCard
              key={tour.id}
              id={tour.id}
              title={tour.title}
              tag={tour.tag}
              rating={tour.rating}
              reviews={tour.reviews}
              days={tour.days}
              nights={tour.nights}
              guests={tour.guests}
              price={tour.price}
              image={tour.image}
            />
          ))}
        </div>
        
        <div className="flex justify-center mt-10">
          <button 
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-md font-medium"
            onClick={() => router.push('/tours')}
          >
            SEE ALL TOURS
          </button>
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
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </section>
  );
};

export default OurFeatureTool;
