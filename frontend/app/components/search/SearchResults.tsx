'use client';

import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { FaHotel, FaStar, FaRupeeSign } from 'react-icons/fa';
import { Sun, Cloud, CloudRain, Hotel, Utensils, Calendar, Clock, MapPin, Star, ThermometerSun } from 'lucide-react';

interface WeatherData {
  datetime: string;
  temperature: number;
  description: string;
  humidity: number;
}

interface HotelData {
  name: string;
  rating: number;
  pricePerNight: number;
  totalCost: number;
  image?: string;
}

interface RestaurantData {
  name: string;
  cuisine: string;
  rating: number | string;
  price: string;
  image?: string;
}

interface AttractionData {
  name: string;
  rating: number;
  entranceFee: number;
  day: number;
  image?: string;
}

interface SearchResultsProps {
  weatherData: WeatherData[];
  hotels: HotelData[];
  restaurants?: RestaurantData[];
  attractions?: AttractionData[];
  isLoading?: boolean;
  error?: string;
}

const SearchResults: React.FC<SearchResultsProps> = ({ 
  weatherData = [], 
  hotels = [], 
  restaurants = [], 
  attractions = [],
  isLoading = false,
  error
}) => {
  // Debug logs
  useEffect(() => {
    console.log("SearchResults rendering with:", { 
      weatherCount: weatherData.length, 
      hotelsCount: hotels.length, 
      isLoading, 
      error 
    });
  }, [weatherData, hotels, isLoading, error]);

  // Group weather data by day
  const weatherByDay = weatherData.reduce((acc, weather) => {
    const date = new Date(weather.datetime);
    const day = date.getDate();
    if (!acc[day]) {
      acc[day] = [];
    }
    acc[day].push(weather);
    return acc;
  }, {} as Record<number, WeatherData[]>);

  // Group attractions by day
  const attractionsByDay = attractions?.reduce((acc: { [key: number]: AttractionData[] }, attraction) => {
    if (!acc[attraction.day]) {
      acc[attraction.day] = [];
    }
    acc[attraction.day].push(attraction);
    return acc;
  }, {}) || {};

  // Show loading state if needed
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto p-8 bg-white rounded-2xl shadow-xl">
        <div className="flex flex-col items-center justify-center py-16">
          <div className="animate-spin rounded-full h-20 w-20 border-4 border-blue-200 border-t-blue-600 mb-6"></div>
          <p className="text-2xl font-semibold text-gray-700 mb-2">Planning your perfect trip...</p>
          <p className="text-gray-500">We're curating the best experiences for you</p>
        </div>
      </div>
    );
  }

  // Show error message if there's an error
  if (error) {
    return (
      <div className="max-w-7xl mx-auto p-8 bg-red-50 rounded-2xl border-2 border-red-100">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-red-800 mb-4">Oops! Something went wrong</h3>
          <p className="text-red-600 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const getWeatherIcon = (description: string) => {
    const desc = description.toLowerCase();
    if (desc.includes('sun') || desc.includes('clear')) return <Sun className="w-6 h-6 text-yellow-500" />;
    if (desc.includes('rain')) return <CloudRain className="w-6 h-6 text-blue-500" />;
    return <Cloud className="w-6 h-6 text-gray-500" />;
  };

  // Show no results message if no data
  if (weatherData.length === 0 && hotels.length === 0 && restaurants.length === 0) {
    return (
      <div className="max-w-7xl mx-auto p-8 bg-blue-50 rounded-2xl border-2 border-blue-100">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-blue-800 mb-4">No Results Found</h2>
          <p className="text-gray-700 mb-6">We couldn't find any matches for your search criteria. Try adjusting your filters or searching for a different location.</p>
          <button 
            onClick={() => window.history.back()} 
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Another Search
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Hotels Overview */}
      <section className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-8 py-6">
          <h2 className="text-2xl font-bold text-white flex items-center">
            <Hotel className="w-6 h-6 mr-3" />
            Available Hotels
          </h2>
        </div>
        <div className="p-8">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 }
            }}
            className="hotel-swiper"
          >
            {hotels.map((hotel, index) => (
              <SwiperSlide key={index}>
                <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden transition-transform hover:scale-[1.02] duration-300">
                  <div className="h-48 bg-gray-100 relative">
                    {hotel.image ? (
                      <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
                        <FaHotel className="text-5xl text-blue-400" />
                      </div>
                    )}
                    <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-md flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      <span className="font-semibold">{hotel.rating.toFixed(1)}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-xl mb-3 text-gray-800">{hotel.name}</h3>
                    <div className="space-y-2">
                      <div className="flex items-center text-gray-600">
                        <FaRupeeSign className="w-4 h-4 mr-2" />
                        <span className="font-medium">{hotel.pricePerNight.toLocaleString()}</span>
                        <span className="text-gray-500 ml-1">/ night</span>
                      </div>
                      <div className="text-blue-600 font-semibold">
                        Total: ₹{hotel.totalCost.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Day-wise Schedule */}
      {Object.keys(weatherByDay).map((date, index) => (
        <section key={date} className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-purple-800 px-8 py-6">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <Calendar className="w-6 h-6 mr-3" />
              Day {index + 1} - {new Date(parseInt(date)).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </h2>
          </div>
          
          <div className="p-8">
            {/* Weather Timeline */}
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-6 flex items-center text-gray-800">
                <ThermometerSun className="w-6 h-6 mr-2 text-orange-500" />
                Weather Forecast
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {weatherByDay[parseInt(date)].map((weather, wIndex) => (
                  <div key={wIndex} className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-xl p-6 shadow-md">
                    <div className="flex items-center justify-between mb-4">
                      <Clock className="w-5 h-5 text-blue-500" />
                      <span className="text-gray-700 font-medium">
                        {new Date(weather.datetime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {getWeatherIcon(weather.description)}
                        <span className="ml-2 text-lg font-semibold">{weather.temperature}°C</span>
                      </div>
                      <div className="text-sm text-gray-600">{weather.humidity}% humidity</div>
                    </div>
                    <div className="mt-2 text-sm text-gray-600 capitalize">{weather.description}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Attractions for the day */}
            {attractionsByDay[index + 1] && attractionsByDay[index + 1].length > 0 && (
              <div className="mt-8">
                <h3 className="text-xl font-bold mb-6 flex items-center text-gray-800">
                  <MapPin className="w-6 h-6 mr-2 text-green-500" />
                  Places to Visit
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {attractionsByDay[index + 1].map((attraction, aIndex) => (
                    <div key={aIndex} className="bg-white rounded-xl border border-gray-200 shadow-lg p-6 hover:shadow-xl transition-shadow">
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="text-lg font-semibold text-gray-800">{attraction.name}</h4>
                        <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-lg">
                          <Star className="w-4 h-4 text-yellow-400 mr-1" />
                          <span className="font-medium text-yellow-700">{attraction.rating.toFixed(1)}</span>
                        </div>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <FaRupeeSign className="w-4 h-4 mr-1" />
                        <span>Entry Fee: {attraction.entranceFee.toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Restaurants */}
            {restaurants && restaurants.length > 0 && (
              <div className="mt-8">
                <h3 className="text-xl font-bold mb-6 flex items-center text-gray-800">
                  <Utensils className="w-6 h-6 mr-2 text-red-500" />
                  Recommended Restaurants
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {restaurants.map((restaurant, rIndex) => (
                    <div key={rIndex} className="bg-white rounded-xl border border-gray-200 shadow-lg p-6 hover:shadow-xl transition-shadow">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="text-lg font-semibold text-gray-800 mb-2">{restaurant.name}</h4>
                          <p className="text-sm text-gray-600">{restaurant.cuisine}</p>
                        </div>
                        <div className="flex items-center bg-green-50 px-2 py-1 rounded-lg">
                          <Star className="w-4 h-4 text-green-500 mr-1" />
                          <span className="font-medium text-green-700">
                            {typeof restaurant.rating === 'number' ? restaurant.rating.toFixed(1) : restaurant.rating}
                          </span>
                        </div>
                      </div>
                      <div className="text-sm text-gray-600">
                        Price Range: <span className="font-medium">{restaurant.price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      ))}
    </div>
  );
};

export default SearchResults; 