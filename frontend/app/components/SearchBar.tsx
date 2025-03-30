"use client";

import { useState, useRef } from 'react';
import { Search, MapPin, CalendarDays } from 'lucide-react';
import { useLoadScript, Autocomplete } from '@react-google-maps/api';
import { useRouter } from 'next/navigation';
import { FaRupeeSign } from 'react-icons/fa';

const libraries = ['places'];

interface SearchBarProps {
  className?: string;
}

const SearchBar = ({ className }: SearchBarProps) => {
  const router = useRouter();
  const [location, setLocation] = useState('');
  const [budget, setBudget] = useState('');
  const [days, setDays] = useState('');
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [locationSearchTerm, setLocationSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const locationDropdownRef = useRef<HTMLDivElement>(null);

  // Popular destinations suggestions
  const locationSuggestions = [
    'Mumbai, India',
    'Delhi, India',
    'Bangalore, India',
    'Kolkata, India',
    'Chennai, India',
    'Hyderabad, India',
    'Pune, India',
    'Ahmedabad, India',
    'Jaipur, India',
    'Goa, India'
  ];

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries: libraries as any,
  });

  const onPlaceSelected = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place.formatted_address) {
        setLocation(place.formatted_address);
        setLocationSearchTerm(place.formatted_address);
        setShowLocationDropdown(false);
      }
    }
  };

  const handleLocationSelect = (selectedLocation: string) => {
    setLocation(selectedLocation);
    setLocationSearchTerm(selectedLocation);
    setShowLocationDropdown(false);
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocationSearchTerm(value);
    setLocation(value);
    setShowLocationDropdown(true);
  };

  const handleSearch = async () => {
    if (!location) {
      setError('Please select a location');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Create search info object
      const searchInfo = {
        location,
        budget,
        days: parseInt(days) || 1
      };

      // Store search info in localStorage
      localStorage.setItem('userSearchInfo', JSON.stringify(searchInfo));

      // Create query parameters
      const queryParams = new URLSearchParams({
        location: encodeURIComponent(location),
        budget: encodeURIComponent(budget),
        days: days.toString()
      }).toString();

      // Redirect to search results page with query parameters
      router.push(`/search-results?${queryParams}`);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className={`w-full max-w-7xl mx-auto ${className}`}>
      <div className="relative p-6 bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-gray-100">
        {/* Background gradient decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50/50 to-transparent rounded-3xl opacity-60" />
        
        {/* Main content */}
        <div className="relative z-10">
          {/* Search form grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Location Field - spans 5 columns */}
            <div className="lg:col-span-5">
              <div className="relative">
                <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100">
                  <label className="block text-sm text-gray-500 font-medium mb-1">Where to?</label>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 mr-3">
                      <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg">
                        <MapPin className="h-5 w-5 text-white" />
                      </div>
                    </div>
                    <Autocomplete
                      onLoad={(autocomplete) => {
                        autocompleteRef.current = autocomplete;
                      }}
                      onPlaceChanged={onPlaceSelected}
                      options={{ types: ['(cities)'] }}
                    >
                      <input
                        type="text"
                        value={locationSearchTerm}
                        onChange={handleLocationChange}
                        className="w-full text-lg font-medium bg-transparent outline-none placeholder-gray-400"
                        placeholder="Search destinations"
                      />
                    </Autocomplete>
                  </div>
                </div>

                {/* Location Suggestions Dropdown */}
                {showLocationDropdown && (
                  <div className="absolute left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 z-50 max-h-[300px] overflow-y-auto">
                    <div className="p-4">
                      <h3 className="text-sm font-semibold text-gray-600 mb-3 px-2">Popular Destinations</h3>
                      <div className="space-y-2">
                        {locationSuggestions.map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => handleLocationSelect(suggestion)}
                            className="w-full flex items-center p-3 hover:bg-blue-50 rounded-lg transition-colors duration-200 group"
                          >
                            <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors mr-3">
                              <MapPin className="h-4 w-4 text-blue-600" />
                            </div>
                            <div className="text-left">
                              <span className="block font-medium text-gray-700">{suggestion.split(',')[0]}</span>
                              <span className="text-sm text-gray-500">{suggestion.split(',')[1]}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Budget Field - spans 3 columns */}
            <div className="lg:col-span-3">
              <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300">
                <label className="block text-sm text-gray-500 font-medium mb-1">Budget</label>
                <div className="flex items-center">
                  <div className="flex-shrink-0 mr-3">
                    <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg">
                      <FaRupeeSign className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full text-lg font-medium bg-transparent outline-none border-none"
                    aria-label="Select budget amount"
                  >
                    <option value="">Select budget</option>
                    <option value="₹5000-₹10000">₹5000-₹10000</option>
                    <option value="₹10000-₹20000">₹10000-₹20000</option>
                    <option value="₹20000-₹30000">₹20000-₹30000</option>
                    <option value="₹30000+">₹30000+</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Days Field - spans 2 columns */}
            <div className="lg:col-span-2">
              <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300">
                <label className="block text-sm text-gray-500 font-medium mb-1">Days</label>
                <div className="flex items-center">
                  <div className="flex-shrink-0 mr-3">
                    <div className="p-2 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg">
                      <CalendarDays className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <select
                    value={days}
                    onChange={(e) => setDays(e.target.value)}
                    className="w-full text-lg font-medium bg-transparent outline-none border-none"
                    aria-label="Select number of days"
                  >
                    <option value="">Days</option>
                    {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'day' : 'days'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Search Button - spans 2 columns */}
            <div className="lg:col-span-2">
              <button
                onClick={handleSearch}
                disabled={isLoading}
                className="w-full h-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl px-8 py-4 text-lg font-medium flex items-center justify-center gap-3 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Searching...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    <span>Search</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBar; 