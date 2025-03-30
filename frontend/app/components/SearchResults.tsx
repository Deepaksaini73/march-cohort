'use client';

import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { WiDaySunny, WiHumidity, WiThermometer } from 'react-icons/wi';
import { FaHotel, FaStar, FaRupeeSign, FaUtensils } from 'react-icons/fa';
import { MdRestaurant } from 'react-icons/md';
import { Loader2 } from 'lucide-react';
import { MdAttachMoney } from 'react-icons/md';

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
  error?: string | null;
}

const SearchResults: React.FC<SearchResultsProps> = ({ 
  weatherData = [], 
  hotels = [], 
  restaurants = [], 
  attractions = [],
  isLoading = false,
  error
}) => {
  const [activeDay, setActiveDay] = useState(1);
  
  // Debug logs
  useEffect(() => {
    console.log("SearchResults rendering with:", { 
      weatherCount: weatherData.length, 
      hotelsCount: hotels.length, 
      isLoading, 
      error 
    });
  }, [weatherData, hotels, isLoading, error]);
  
  // Calculate total days based on weather data
  const totalDays = weatherData.length > 0 
    ? [...new Set(weatherData.map(w => new Date(w.datetime).getDate()))].length 
    : 1;

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

  // Show loading state if needed
  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto mt-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <div className="flex flex-col items-center justify-center py-12">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300 text-lg">Fetching your travel data...</p>
        </div>
      </div>
    );
  }
  
  // Show error message if there's an error
  if (error) {
    return (
      <div className="max-w-5xl mx-auto mt-8 p-6 bg-red-50 dark:bg-red-900/30 rounded-lg border border-red-200 dark:border-red-800">
        <h2 className="text-2xl font-bold text-red-700 dark:text-red-400 mb-4">Data Retrieval Note</h2>
        <p className="text-red-600 dark:text-red-300 mb-4">{error}</p>
        
        {(weatherData.length > 0 || hotels.length > 0 || restaurants.length > 0) && (
          <p className="text-gray-700 dark:text-gray-300">Displaying available data below.</p>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Weather Section */}
      {weatherData.length > 0 && (
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
            Weather Forecast
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {weatherData.map((weather, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <WiDaySunny className="text-4xl text-yellow-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {new Date(weather.datetime).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <WiThermometer className="text-2xl text-red-500 mr-2" />
                    <span className="text-lg font-semibold">
                      {weather.temperature}°C
                    </span>
                  </div>
                  <div className="flex items-center">
                    <WiHumidity className="text-2xl text-blue-500 mr-2" />
                    <span>{weather.humidity}%</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    {weather.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Hotels Section */}
      {hotels.length > 0 && (
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
            Available Hotels
          </h2>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="hotel-swiper"
          >
            {hotels.map((hotel, index) => (
              <SwiperSlide key={index}>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden h-full">
                  <div className="h-48 bg-gray-200 dark:bg-gray-700">
                    {hotel.image ? (
                      <img
                        src={hotel.image}
                        alt={hotel.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <FaHotel className="text-4xl text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 line-clamp-2">{hotel.name}</h3>
                    <div className="flex items-center mb-2">
                      <div className="flex items-center text-yellow-400">
                        <FaStar />
                        <span className="ml-1">{hotel.rating}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="flex items-center text-gray-600 dark:text-gray-300">
                        <FaRupeeSign className="mr-1" />
                        <span>{hotel.pricePerNight?.toLocaleString() || "N/A"} per night</span>
                      </p>
                      <p className="flex items-center font-semibold">
                        <FaRupeeSign className="mr-1" />
                        <span>Total: {hotel.totalCost?.toLocaleString() || "N/A"}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      )}

      {/* Restaurants Section */}
      {restaurants.length > 0 && (
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
            Nearby Restaurants
          </h2>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3500 }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="restaurant-swiper"
          >
            {restaurants.map((restaurant, index) => (
              <SwiperSlide key={index}>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden h-full">
                  <div className="h-48 bg-gray-200 dark:bg-gray-700">
                    {restaurant.image ? (
                      <img
                        src={restaurant.image}
                        alt={restaurant.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <MdRestaurant className="text-4xl text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 line-clamp-2">{restaurant.name}</h3>
                    <div className="flex items-center mb-2">
                      <div className="flex items-center text-yellow-400">
                        <FaStar />
                        <span className="ml-1">{restaurant.rating}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="flex items-center text-gray-600 dark:text-gray-300">
                        <FaUtensils className="mr-1" />
                        <span>{restaurant.cuisine}</span>
                      </p>
                      <p className="flex items-center font-semibold">
                        <MdAttachMoney className="mr-1" />
                        <span>{restaurant.price}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      )}

      {/* Attractions Section */}
      {attractions && attractions.length > 0 && (
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
            Attractions to Visit
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {attractions.map((attraction, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{attraction.name}</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <FaStar className="text-yellow-400 mr-2" />
                      <span>Rating: {attraction.rating}</span>
                    </div>
                    {attraction.entranceFee && (
                      <div className="flex items-center">
                        <FaRupeeSign className="mr-2" />
                        <span>Entrance Fee: {attraction.entranceFee.toLocaleString()}</span>
                      </div>
                    )}
                    {attraction.day && (
                      <div className="flex items-center">
                        <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                          Recommended for Day {attraction.day}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* No Results Message */}
      {weatherData.length === 0 && hotels.length === 0 && restaurants.length === 0 && !error && !isLoading && (
        <div className="max-w-5xl mx-auto mt-8 p-6 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-800 text-center">
          <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-4">No Results Found</h2>
          <p className="text-gray-700 dark:text-gray-300">
            We couldn't find any results for your search. Please try different search criteria.
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchResults; 