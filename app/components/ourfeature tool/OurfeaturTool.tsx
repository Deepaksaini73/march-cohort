import { useState } from 'react';
import { Heart } from 'lucide-react';
import Image from 'next/image';

interface TourCardProps {
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
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md relative">
      <div className="relative h-56 w-full">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
        <button className="absolute top-4 right-4 p-1.5 rounded-full bg-white/80" title="Add to favorites">
          <Heart className="h-5 w-5 text-gray-600" />
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
      </div>
      
      <div className="p-5">
        <div className="flex items-center mb-3">
          <div className="flex items-center text-amber-400">
            <span className="mr-1">★</span>
            <span className="font-semibold text-sm">{rating.toFixed(2)}</span>
          </div>
          <span className="text-sm text-gray-500 ml-1">({reviews} reviews)</span>
        </div>
        
        <h3 className="font-bold text-xl mb-2">{title}</h3>
        
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
            <span className="font-bold text-xl">₹{(price * 83.20).toFixed(2)}</span>
            <span className="text-gray-500 text-sm"> / person</span>
          </div>
          <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 px-4 py-2 rounded-full text-sm font-medium">
            Book Now
          </button>
        </div>
        
        <button className="w-full bg-transparent hover:bg-gray-50 text-blue-600 border border-blue-600 px-4 py-2 rounded-full text-sm font-medium">
          View All
        </button>
      </div>
    </div>
  );
};

const OurFeatureTool = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  
  const tours = [
    {
      id: 1,
      title: "California Sunset/Twilight Boat Cruise",
      tag: "Top Rated",
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
      tag: "Best Sale",
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
      tag: "25% Off",
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
      tag: "Top Rated",
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
      tag: "Best Sale",
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
      tag: "25% Off",
      rating: 4.96,
      reviews: 672,
      days: 7,
      nights: 6,
      guests: "4-6",
      price: 1300.42,
      image: "/images/maldives.jpg"
    },
  ];

  const filters = ['All', 'Categories', 'Duration', 'Rating', 'Price Range'];

  return (
    <section className="py-12 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-2">Our Featured Tours</h2>
        <p className="text-gray-600 mb-8">Favorite destinations based on customer reviews</p>
        
        <div className="flex flex-wrap gap-4 mb-8">
          {filters.map((filter) => (
            <button 
              key={filter}
              className={`bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-full text-sm font-medium ${
                activeFilter === filter ? 'bg-gray-200' : ''
              }`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tours.map((tour) => (
            <TourCard
              key={tour.id}
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
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-md font-medium">
            View All Tours
          </button>
        </div>
      </div>
    </section>
  );
};

export default OurFeatureTool;
