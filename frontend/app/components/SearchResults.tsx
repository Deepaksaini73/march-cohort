'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { WiDaySunny, WiHumidity, WiThermometer } from 'react-icons/wi';
import { FaHotel, FaStar, FaRupeeSign } from 'react-icons/fa';
import { MdRestaurant, MdAttachMoney } from 'react-icons/md';
import { BiSolidFood } from 'react-icons/bi';

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

interface SearchResultsProps {
  weatherData: WeatherData[];
  hotels: HotelData[];
  restaurants?: RestaurantData[];
  error?: string;
}

const SearchResults: React.FC<SearchResultsProps> = ({ 
  weatherData = [], 
  hotels = [], 
  restaurants = [],
  error
}) => {
  if (error) {
    return (
      <div className="max-w-5xl mx-auto mt-8 p-6 bg-red-50 dark:bg-red-900/30 rounded-lg border border-red-200 dark:border-red-800">
        <h2 className="text-2xl font-bold text-red-700 dark:text-red-400 mb-4">Error Fetching Data</h2>
        <p className="text-red-600 dark:text-red-300">{error}</p>
        <p className="mt-4 text-gray-700 dark:text-gray-300">Failed to fetch live data. Showing sample data.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Weather Section */}
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

      {/* Hotels Section */}
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
                  <h3 className="text-xl font-semibold mb-2">{hotel.name}</h3>
                  <div className="flex items-center mb-2">
                    <div className="flex items-center text-yellow-400">
                      <FaStar />
                      <span className="ml-1">{hotel.rating}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="flex items-center text-gray-600 dark:text-gray-300">
                      <FaRupeeSign className="mr-1" />
                      <span>{hotel.pricePerNight.toLocaleString()} per night</span>
                    </p>
                    <p className="flex items-center font-semibold">
                      <FaRupeeSign className="mr-1" />
                      <span>Total: {hotel.totalCost.toLocaleString()}</span>
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

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
                    <h3 className="text-xl font-semibold mb-2">{restaurant.name}</h3>
                    <div className="flex items-center mb-2">
                      <div className="flex items-center text-yellow-400">
                        <FaStar />
                        <span className="ml-1">{restaurant.rating}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="flex items-center text-gray-600 dark:text-gray-300">
                        <BiSolidFood className="mr-1" />
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
    </div>
  );
};

export default SearchResults; 