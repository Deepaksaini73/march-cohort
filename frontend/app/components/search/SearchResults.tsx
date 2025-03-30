'use client';

import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { WiDaySunny, WiHumidity, WiThermometer } from 'react-icons/wi';
import { FaHotel, FaStar, FaRupeeSign, FaCalendarAlt } from 'react-icons/fa';
import { MdRestaurant } from 'react-icons/md';

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

interface SearchResultsProps {
  weatherData: WeatherData[];
  hotels: HotelData[];
  restaurants?: any[]; // Add proper type when restaurant data structure is known
}

const SearchResults: React.FC<SearchResultsProps> = ({ weatherData, hotels, restaurants = [] }) => {
  const [activeDay, setActiveDay] = useState(1);
  const totalDays = 2; // You can make this dynamic based on the search parameters

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

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Day Selection Tabs */}
      <div className="flex mb-8 overflow-x-auto scrollbar-hide">
        <div className="flex space-x-4 mx-auto bg-gray-100 dark:bg-gray-800 rounded-full p-2">
          {Array.from({ length: totalDays }, (_, i) => i + 1).map((day) => (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className={`flex items-center px-6 py-3 rounded-full transition-all duration-300 ${
                activeDay === day
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105'
                  : 'hover:bg-white/50 text-gray-700 dark:text-gray-300'
              }`}
            >
              <FaCalendarAlt className={`mr-2 ${activeDay === day ? 'text-white' : 'text-blue-500'}`} />
              <span className="font-medium">Day {day}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content for Active Day */}
      <div className="space-y-12">
        {/* Date Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
            {new Date(weatherData[0].datetime).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </h2>
        </div>

        {/* Weather Section */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white flex items-center">
            <WiDaySunny className="mr-2 text-yellow-500" />
            Weather Forecast
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {(weatherByDay[activeDay] || []).map((weather, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 hover:shadow-xl transition-shadow"
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
                    <span className="text-lg font-semibold text-gray-800 dark:text-white">
                      {weather.temperature}°C
                    </span>
                  </div>
                  <div className="flex items-center">
                    <WiHumidity className="text-2xl text-blue-500 mr-2" />
                    <span className="text-gray-600 dark:text-gray-300">{weather.humidity}%</span>
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
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white flex items-center">
            <FaHotel className="mr-2 text-blue-500" />
            Available Hotels
          </h3>
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
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden h-full">
                  <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                    {hotel.image ? (
                      <img
                        src={hotel.image}
                        alt={hotel.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-opacity-75">
                        <FaHotel className="text-6xl text-white" />
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                      {hotel.name}
                    </h4>
                    <div className="flex items-center mb-4">
                      <div className="flex items-center text-yellow-400">
                        <FaStar />
                        <span className="ml-1 text-gray-700 dark:text-gray-300">
                          {hotel.rating}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="flex items-center text-gray-600 dark:text-gray-400">
                        <FaRupeeSign className="mr-1" />
                        <span>{hotel.pricePerNight.toLocaleString()} per night</span>
                      </p>
                      <div className="pt-4 border-t border-gray-200 dark:border-gray-600">
                        <p className="flex items-center font-semibold text-gray-800 dark:text-white">
                          <FaRupeeSign className="mr-1" />
                          <span>Total: {hotel.totalCost.toLocaleString()}</span>
                        </p>
                      </div>
                    </div>
                    <button className="mt-4 w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                      Book Now
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

        {/* Restaurants Section */}
        {restaurants && restaurants.length > 0 && (
          <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white flex items-center">
              <MdRestaurant className="mr-2 text-green-500" />
              Nearby Restaurants
            </h3>
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
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden">
                    {/* Add restaurant card content here when data structure is known */}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </section>
        )}
      </div>
    </div>
  );
};

export default SearchResults; 