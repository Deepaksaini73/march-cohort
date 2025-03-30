"use client";
import { useState, useEffect, useRef } from 'react';
import { Search, MapPin, User, Calendar, Info, DollarSign, Car, Briefcase, Sparkles, ChevronDown, Loader2, CalendarDays } from 'lucide-react';
import Link from 'next/link';
import SearchResults from './SearchResults';

// Add types for the response data
interface Hotel {
  name: string;
  rating: number | string;
  pricePerNight: number | string;
  totalCost: number | string;
  image?: string;
}

interface Restaurant {
  name: string;
  cuisine: string;
  rating: number | string;
  price: string;
  image?: string;
}

export default function SearchForm() {
  const [activeTab, setActiveTab] = useState('All');
  const [location, setLocation] = useState('Mumbai, India');
  const [days, setDays] = useState(3);
  const [budget, setBudget] = useState('₹15,000');
  const [transport, setTransport] = useState('Car');
  const [purpose, setPurpose] = useState('Fun');
  const [startDate, setStartDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isFormFocused, setIsFormFocused] = useState(false);
  const [searchData, setSearchData] = useState('');
  const [showSearchData, setShowSearchData] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showDaysDropdown, setShowDaysDropdown] = useState(false);
  const [showPurposeDropdown, setShowPurposeDropdown] = useState(false);
  const [locationSuggestions, setLocationSuggestions] = useState<string[]>([]);
  const [locationSearchTerm, setLocationSearchTerm] = useState('Mumbai, India');
  const [isLoadingLocations, setIsLoadingLocations] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [searchResults, setSearchResults] = useState<{
    weather: Array<{
      datetime: string;
      temperature: number;
      description: string;
      humidity: number;
    }>;
    hotels: Array<{
      name: string;
      rating: number;
      pricePerNight: number;
      totalCost: number;
    }>;
    restaurants?: Array<{
      name: string;
      cuisine: string;
      rating: number | string;
      price: string;
    }>;
    attractions?: Array<{
      name: string;
      rating: number;
      entranceFee: number;
      day: number;
    }>;
    error?: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Popular destinations suggestions - Indian cities
  const popularDestinations = [
    'Mumbai, India',
    'Delhi, India',
    'Bangalore, India',
    'Kolkata, India',
    'Chennai, India',
    'Hyderabad, India',
    'Pune, India',
    'Ahmedabad, India',
    'Jaipur, India',
    'Ranchi, India',
    'Bhubaneswar, India',
    'Rourkela, India',
    'Goa, India',
    'Lucknow, India',
    'Kochi, India',
    'Chandigarh, India',
    'Varanasi, India',
    'Udaipur, India',
    'Shimla, India',
    'Rishikesh, India'
  ];
  
  // Reference for outside clicks
  const locationDropdownRef = useRef<HTMLDivElement>(null);
  const daysDropdownRef = useRef<HTMLDivElement>(null);
  const purposeDropdownRef = useRef<HTMLDivElement>(null);
  const datePickerRef = useRef<HTMLDivElement>(null);
  
  // Fetch location suggestions from API
  const fetchLocationSuggestions = async (searchTerm: string) => {
    if (searchTerm.length < 2) {
      return popularDestinations.filter(dest => 
        dest.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setIsLoadingLocations(true);
    
    try {
      // In a real implementation, you would call an actual API 
      // For demo purposes, we're simulating an API call
      const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
      await delay(700); // Simulate network delay
      
      // Simulate API response with matching real locations
      const apiResponse = [
        ...popularDestinations.filter(dest => 
          dest.toLowerCase().includes(searchTerm.toLowerCase())
        ),
        // Add some "API results" based on the search term
        ...[
          `${searchTerm} City, India`,
          `${searchTerm} Beach Resort, Goa`,
          `${searchTerm} Hills, Himachal Pradesh`,
          `${searchTerm} District, Maharashtra`
        ].filter(item => !popularDestinations.includes(item))
      ];
      
      return apiResponse.slice(0, 8); // Limit to 8 results
    } catch (error) {
      console.error("Error fetching location suggestions:", error);
      return popularDestinations.filter(dest => 
        dest.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } finally {
      setIsLoadingLocations(false);
    }
  };
  
  // Update location handling logic
  const handleLocationChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setLocationSearchTerm(searchTerm);
    
    if (searchTerm.trim() !== '') {
      setShowLocationDropdown(true);
      const results = await fetchLocationSuggestions(searchTerm);
      setLocationSuggestions(results);
    } else {
      setLocationSuggestions(popularDestinations);
      setShowLocationDropdown(true);
    }
  };
  
  const handleLocationSelect = (selected: string) => {
    setLocation(selected);
    setLocationSearchTerm(selected);
    setShowLocationDropdown(false);
  };

  // Handle clicks outside dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (locationDropdownRef.current && !locationDropdownRef.current.contains(event.target as Node)) {
        setShowLocationDropdown(false);
      }
      if (daysDropdownRef.current && !daysDropdownRef.current.contains(event.target as Node)) {
        setShowDaysDropdown(false);
      }
      if (purposeDropdownRef.current && !purposeDropdownRef.current.contains(event.target as Node)) {
        setShowPurposeDropdown(false);
      }
      if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
        setShowDatePicker(false);
      }
      setIsFormFocused(false);
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Initialize location suggestions and search term
  useEffect(() => {
    setLocationSuggestions(popularDestinations);
    setLocationSearchTerm(location);
  }, []);

  // Debug logs
  useEffect(() => {
    console.log("showResults:", showResults, "searchResults:", searchResults, "isLoading:", isLoading);
  }, [showResults, searchResults, isLoading]);

  // Add helper functions for date picker
  const formatDisplayDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  const handleDateChange = (newDate: string) => {
    setStartDate(newDate);
    setShowDatePicker(false);
  };
  
  const generateCalendarDays = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const days = [];
    const currentMonth = new Date(today);
    
    // Generate dates for the next 90 days
    for (let i = 0; i < 90; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      days.push(date);
    }
    
    return days;
  };

  const handleSearch = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    try {
      // Show loading state
      setShowResults(true);
      setSearchResults(null); // Clear previous results
      setIsLoading(true);
      
      // Extract city from location
      const city = location.split(',')[0].trim();
      
      // Convert budget string to proper format
      let formattedBudget = budget;
      if (!budget.includes('₹')) {
        formattedBudget = `₹${budget}`;
      }
      
      // Use 'Monument' as default attraction type when 'All' is selected
      const attractionType = activeTab === 'All' ? 'Monument' : activeTab;
      
      // Prepare data for API - match exactly with TripRequest model in backend/app.py
      const requestData = {
        city: city,
        location: location,
        days: days,
        budget: formattedBudget,
        transport: activeTab === 'Fort' ? transport : undefined,
        purpose: activeTab === 'Museum' ? purpose : undefined,
        attraction_type: attractionType, // Use the determined attraction type
        start_date: startDate
      };
      
      console.log("Sending request to backend:", requestData);
      
      try {
        // Check if backend is accessible first with a ping
        const pingResponse = await fetch('http://localhost:8000/', { 
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          // Add a short timeout so we don't wait too long for an unreachable server
          signal: AbortSignal.timeout(3000)
        }).catch(error => {
          console.error("Backend ping failed:", error);
          throw new Error("Backend server not accessible. Please make sure the backend is running on port 8000.");
        });
        
        if (!pingResponse?.ok) {
          throw new Error(`Backend server returned ${pingResponse?.status}: ${pingResponse?.statusText}`);
        }
      
        // Main API call to get all data at once - uses process_search_form_data from main.py
        const response = await fetch('http://localhost:8000/api/trip', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        });
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error(`API Error ${response.status}: ${errorText}`);
          throw new Error(`API request failed with status ${response.status}: ${errorText}`);
        }
        
        // Get response data
        const data = await response.json();
        console.log('API Response:', data);
        
        // Validate the response data
        if (!data.weather || !data.hotels) {
          console.warn('Response is missing required data fields:', data);
          throw new Error('Invalid response data: missing weather or hotels information');
        }
        
        // Process hotels data
        if (data.hotels && Array.isArray(data.hotels)) {
          // Ensure numerical values for price fields
          data.hotels = data.hotels.map((hotel: Hotel) => ({
            ...hotel,
            pricePerNight: typeof hotel.pricePerNight === 'string' ? 
              parseFloat(hotel.pricePerNight.replace(/[^\d.]/g, '')) : hotel.pricePerNight,
            totalCost: typeof hotel.totalCost === 'string' ? 
              parseFloat(hotel.totalCost.replace(/[^\d.]/g, '')) : hotel.totalCost,
            rating: typeof hotel.rating === 'string' ? 
              parseFloat(hotel.rating) || hotel.rating : hotel.rating
          }));
        }
        
        // Process restaurants data
        if (data.restaurants && Array.isArray(data.restaurants)) {
          data.restaurants = data.restaurants.map((restaurant: Restaurant) => ({
            ...restaurant,
            rating: typeof restaurant.rating === 'string' && !isNaN(parseFloat(restaurant.rating)) ? 
              parseFloat(restaurant.rating) : restaurant.rating
          }));
        }
        
        // Set the search results
        setSearchResults(data);
      } catch (error: any) {
        console.error('API Error:', error);
        
        // If the main API fails, try individual endpoints
        try {
          console.log('Trying individual endpoints for', city);
          
          // Build a combined result from individual endpoints
          const combinedResults: any = {
            weather: [],
            hotels: [],
            restaurants: []
          };
          
          // Try to get weather data
          try {
            const weatherResponse = await fetch(`http://localhost:8000/api/weather/${encodeURIComponent(city)}`);
            if (weatherResponse.ok) {
              const weatherData = await weatherResponse.json();
              combinedResults.weather = weatherData.weather || [];
            }
          } catch (weatherError) {
            console.error('Weather API Error:', weatherError);
          }
          
          // Try to get hotel data
          try {
            // Convert budget string to number
            const numericBudget = parseFloat(formattedBudget.replace(/[^\d.]/g, ''));
            const hotelResponse = await fetch(`http://localhost:8000/api/hotels?city=${encodeURIComponent(city)}&days=${days}&budget=${numericBudget}`);
            if (hotelResponse.ok) {
              const hotelData = await hotelResponse.json();
              combinedResults.hotels = hotelData.hotels || [];
            }
          } catch (hotelError) {
            console.error('Hotel API Error:', hotelError);
          }
          
          // Try to get restaurant data
          try {
            const restaurantResponse = await fetch(`http://localhost:8000/api/restaurants/${encodeURIComponent(city)}`);
            if (restaurantResponse.ok) {
              const restaurantData = await restaurantResponse.json();
              combinedResults.restaurants = restaurantData.restaurants || [];
            }
          } catch (restaurantError) {
            console.error('Restaurant API Error:', restaurantError);
          }
          
          // If we got some data, use it
          if (combinedResults.weather.length > 0 || combinedResults.hotels.length > 0 || combinedResults.restaurants.length > 0) {
            combinedResults.error = "Some data may be incomplete due to API errors";
            setSearchResults(combinedResults);
          } else {
            // If all individual endpoints failed, try sample data
            throw new Error("All individual endpoints failed");
          }
        } catch (endpointError) {
          // If all else fails, use sample data
          try {
            const fallbackResponse = await fetch('http://localhost:8000/api/sample-data');
            
            if (fallbackResponse.ok) {
              const fallbackData = await fallbackResponse.json();
              
              // Customize the sample data with the city name
              for (const hotel of fallbackData.hotels) {
                hotel.name = hotel.name.replace('Sample City', city);
              }
              for (const restaurant of fallbackData.restaurants) {
                restaurant.name = restaurant.name.replace('Sample City', city);
              }
              
              setSearchResults({
                ...fallbackData,
                error: `Failed to fetch live data: ${error.message}. Showing sample data.`
              });
            } else {
              throw new Error('Failed to fetch sample data');
            }
          } catch (fallbackError) {
            console.error('Fallback Error:', fallbackError);
            // If all else fails, show a simple error message
            setSearchResults({
              weather: [],
              hotels: [],
              restaurants: [],
              error: 'Failed to load data. Please try again later.'
            });
          }
        }
      }
      
      // Store in localStorage regardless of result
      localStorage.setItem('lastSearch', JSON.stringify({
        timestamp: new Date().toISOString(),
        tab: activeTab,
        location: location,
        days: days,
        budget: budget,
        start_date: startDate,
        ...(activeTab === 'Fort' ? { transport } : {}),
        ...(activeTab === 'Museum' ? { purpose } : {})
      }));
    } catch (error) {
      console.error('Error in search process:', error);
      // Show error message
      setSearchResults({
        weather: [],
        hotels: [],
        restaurants: [],
        error: 'A search error occurred. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Get appropriate recommended counts based on tab
  const getDayOptions = () => {
    return [1, 2, 3, 4, 5, 6, 7, 8, 10, 14, 21, 30];
  };
  
  const handleDaySelect = (count: number) => {
    setDays(count);
    setShowDaysDropdown(false);
  };

  return (
    <>
      <div 
        className={`backdrop-blur-md bg-white/95 rounded-3xl shadow-2xl p-8 max-w-6xl mx-auto relative border border-gray-100 z-20 transition-all duration-500 ${isFormFocused ? 'shadow-[0_20px_50px_rgba(8,_112,_184,_0.2)]' : ''}`}
        onClick={(e) => {
          e.stopPropagation();
          setIsFormFocused(true);
        }}
      >
        {/* Ambient background effect */}
        <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-gradient-to-br from-blue-100/30 via-purple-100/20 to-transparent rounded-r-3xl" />
        
        {/* Form */}
        <div className="flex flex-col lg:flex-row gap-5 items-stretch">
          {/* Location Input with Dropdown */}
          <div className="flex-grow relative" ref={locationDropdownRef}>
            <div 
              className="bg-white border border-gray-200 rounded-2xl p-5 h-full flex items-center shadow-sm hover:shadow-md transition-all duration-300 group focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100 cursor-pointer"
              onClick={() => setShowLocationDropdown(true)}
            >
              <div className="bg-gradient-to-br from-blue-500 to-purple-500 rounded-full p-3 mr-4 text-white shadow-md group-hover:scale-105 transition-transform duration-300">
                <MapPin className="w-6 h-6" />
              </div>
              <div className="flex-grow">
                <label htmlFor="location" className="block text-sm text-gray-500 font-medium mb-1">Where to?</label>
                <div className="flex items-center">
                  <input 
                    id="location"
                    type="text" 
                    className="text-lg font-medium bg-transparent outline-none w-full"
                    placeholder="Enter destination" 
                    value={locationSearchTerm}
                    onChange={handleLocationChange}
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowLocationDropdown(true);
                    }}
                  />
                  <ChevronDown className="w-5 h-5 text-gray-400 ml-2" />
                </div>
              </div>
            </div>
            
            {/* Location Dropdown */}
            {showLocationDropdown && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-100 z-40 max-h-60 overflow-y-auto animate-fadeIn">
                <div className="p-2">
                  <div className="flex items-center justify-between px-3 py-2">
                    <span className="text-xs font-semibold text-gray-500">
                      {isLoadingLocations ? 'Searching locations...' : 'Suggested Locations'}
                    </span>
                    {isLoadingLocations && (
                      <Loader2 className="w-3 h-3 text-blue-500 animate-spin" />
                    )}
                  </div>
                  
                  {isLoadingLocations ? (
                    <div className="flex items-center justify-center py-4">
                      <Loader2 className="w-5 h-5 text-blue-500 animate-spin mr-2" />
                      <span className="text-sm text-gray-500">Searching locations...</span>
                    </div>
                  ) : locationSuggestions.length > 0 ? (
                    locationSuggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        className="px-3 py-2.5 hover:bg-blue-50 rounded-lg cursor-pointer text-sm flex items-center transition-colors"
                        onClick={() => handleLocationSelect(suggestion)}
                      >
                        <MapPin className="w-4 h-4 text-blue-500 mr-2 flex-shrink-0" />
                        <span>{suggestion}</span>
                      </div>
                    ))
                  ) : (
                    <div className="px-3 py-4 text-sm text-gray-500 flex flex-col items-center">
                      <span className="mb-1">No matches found</span>
                      <span className="text-xs text-gray-400">Try a different search term</span>
                    </div>
                  )}
                  
                  {!isLoadingLocations && locationSearchTerm.length >= 2 && (
                    <div className="mt-2 pt-2 border-t border-gray-100">
                      <div className="px-3 py-2 text-xs text-blue-600 flex items-center cursor-pointer hover:bg-blue-50 rounded-lg" onClick={() => handleLocationSelect(locationSearchTerm)}>
                        <Search className="w-3 h-3 mr-1.5" />
                        Search for "{locationSearchTerm}"
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          
          {/* Budget Input */}
          <div className="w-full lg:w-60 relative">
            <div className="bg-white border border-gray-200 rounded-2xl p-5 h-full flex items-center shadow-sm hover:shadow-md transition-all duration-300 group focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100">
              <div className="bg-gradient-to-br from-green-500 to-teal-500 rounded-full p-3 mr-4 text-white shadow-md group-hover:scale-105 transition-transform duration-300">
                <DollarSign className="w-6 h-6" />
              </div>
              <div className="w-full">
                <label htmlFor="budget" className="block text-sm text-gray-500 font-medium mb-1">Budget</label>
                <select 
                  id="budget"
                  className="text-lg font-medium bg-transparent outline-none w-full cursor-pointer"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                >
                  <option value="₹7,500">₹7,500</option>
                  <option value="₹15,000">₹15,000</option>
                  <option value="₹22,500">₹22,500</option>
                  <option value="₹37,500">₹37,500</option>
                  <option value="₹50,000">₹50,000</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Start Date Picker */}
          <div className="w-full lg:w-64 relative" ref={datePickerRef}>
            <div 
              className="bg-white border border-gray-200 rounded-2xl p-5 h-full flex items-center shadow-sm hover:shadow-md transition-all duration-300 group focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100 cursor-pointer"
              onClick={() => setShowDatePicker(!showDatePicker)}
            >
              <div className="bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full p-3 mr-4 text-white shadow-md group-hover:scale-105 transition-transform duration-300">
                <CalendarDays className="w-6 h-6" />
              </div>
              <div className="flex-grow overflow-hidden">
                <label htmlFor="startDate" className="block text-sm text-gray-500 font-medium mb-1">Start Date</label>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-medium truncate">{formatDisplayDate(startDate)}</span>
                  <ChevronDown className="w-5 h-5 text-gray-400 ml-2 flex-shrink-0" />
                </div>
              </div>
            </div>
            
            {/* Calendar Dropdown */}
            {showDatePicker && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-100 z-50 max-h-80 overflow-y-auto animate-fadeIn">
                <div className="p-2">
                  <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100">
                    <span className="text-xs font-semibold text-gray-500">Select Start Date</span>
                    <button onClick={() => setShowDatePicker(false)} className="text-gray-400 hover:text-gray-600">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="py-2">
                    <div className="grid grid-cols-7 gap-1 mb-2">
                      {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
                        <div key={day} className="text-center text-xs font-medium text-gray-500 py-1">
                          {day}
                        </div>
                      ))}
                    </div>
                    
                    <div className="grid grid-cols-7 gap-1">
                      {generateCalendarDays().map((date, index) => {
                        const dateString = date.toISOString().split('T')[0];
                        const isSelected = dateString === startDate;
                        const isToday = date.toDateString() === new Date().toDateString();
                        
                        return (
                          <button
                            key={index}
                            className={`
                              rounded-full w-8 h-8 flex items-center justify-center text-sm transition-colors
                              ${isSelected ? 'bg-blue-500 text-white' : 'hover:bg-blue-50'}
                              ${isToday && !isSelected ? 'border border-blue-500 text-blue-500' : ''}
                              ${date.getMonth() !== new Date(startDate).getMonth() ? 'text-gray-400' : 'text-gray-700'}
                            `}
                            onClick={() => handleDateChange(dateString)}
                          >
                            {date.getDate()}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Transport Mode - Only visible for Fort type */}
          {activeTab === 'Fort' && (
            <div className="w-full lg:w-60 relative">
              <div className="bg-white border border-gray-200 rounded-2xl p-5 h-full flex items-center shadow-sm hover:shadow-md transition-all duration-300 group focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100">
                <div className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-full p-3 mr-4 text-white shadow-md group-hover:scale-105 transition-transform duration-300">
                  <Car className="w-6 h-6" />
                </div>
                <div className="w-full">
                  <label htmlFor="transport" className="block text-sm text-gray-500 font-medium mb-1">Transport</label>
                  <select 
                    id="transport"
                    className="text-lg font-medium bg-transparent outline-none w-full cursor-pointer"
                    value={transport}
                    onChange={(e) => setTransport(e.target.value)}
                  >
                    <option value="Car">Car</option>
                    <option value="Bus">Bus</option>
                    <option value="Train">Train</option>
                    <option value="Flight">Flight</option>
                    <option value="Bike">Bike</option>
                    <option value="Taxi">Taxi</option>
                  </select>
                </div>
              </div>
            </div>
          )}
          
          {/* Purpose Input - Only visible for Museum type */}
          {activeTab === 'Museum' && (
            <div className="w-full lg:w-60 relative">
              <div className="bg-white border border-gray-200 rounded-2xl p-5 h-full flex items-center shadow-sm hover:shadow-md transition-all duration-300 group focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100">
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-full p-3 mr-4 text-white shadow-md group-hover:scale-105 transition-transform duration-300">
                  <Briefcase className="w-6 h-6" />
                </div>
                <div className="w-full">
                  <label htmlFor="purpose" className="block text-sm text-gray-500 font-medium mb-1">Purpose</label>
                  <select 
                    id="purpose"
                    className="text-lg font-medium bg-transparent outline-none w-full cursor-pointer"
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                  >
                    <option value="Fun">Fun</option>
                    <option value="Business">Business</option>
                    <option value="Education">Education</option>
                    <option value="Tour">Tour</option>
                  </select>
                </div>
              </div>
            </div>
          )}
          
          {/* Days Dropdown for all tabs */}
          <div className="w-full lg:w-52 relative" ref={daysDropdownRef}>
            <button 
              onClick={(e) => {
                e.preventDefault();
                setShowDaysDropdown(!showDaysDropdown);
              }}
              className="relative w-full h-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-5 rounded-2xl text-base font-medium flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-300"
            >
              <Calendar className="w-5 h-5 mr-2 text-blue-500" />
              <span>Days</span>
              <span className="text-gray-500 mx-1">{days}</span>
              <ChevronDown className="w-4 h-4 ml-1 text-gray-400" />
            </button>
            
            {/* Days Dropdown */}
            {showDaysDropdown && (
              <div className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-lg border border-gray-100 z-40 w-48 animate-fadeIn">
                <div className="p-2">
                  <div className="text-xs font-semibold text-gray-500 px-3 py-2 border-b border-gray-100">
                    Select Number of Days
                  </div>
                  
                  {getDayOptions().map((count) => (
                    <div
                      key={count}
                      className={`px-3 py-2.5 hover:bg-blue-50 rounded-lg cursor-pointer text-sm flex items-center transition-colors ${days === count ? 'bg-blue-50 text-blue-600 font-medium' : ''}`}
                      onClick={() => handleDaySelect(count)}
                    >
                      <span className={`w-2 h-2 rounded-full mr-2 ${days === count ? 'bg-blue-500' : 'bg-gray-300'}`}></span>
                      <span>{count}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Search and Purpose Buttons */}
          <div className="w-full lg:w-auto lg:min-w-[220px] flex gap-3">
            {/* Purpose Button */}
            <div className="relative flex-grow lg:flex-grow-0" ref={purposeDropdownRef}>
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  setShowPurposeDropdown(!showPurposeDropdown);
                }}
                className="relative w-full h-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-5 rounded-2xl text-base font-medium flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-300"
              >
                <Info className="w-5 h-5 mr-2 text-blue-500" />
                <span>Purpose</span>
                <ChevronDown className="w-4 h-4 ml-1 text-gray-400" />
              </button>
              
              {/* Purpose Dropdown */}
              {showPurposeDropdown && (
                <div className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-lg border border-gray-100 z-40 w-48 animate-fadeIn">
                  <div className="p-2">
                    <div className="text-xs font-semibold text-gray-500 px-3 py-2 border-b border-gray-100">
                      Select Purpose Type
                    </div>
                    
                    {['All', 'Monument', 'Fort', 'Museum', 'Palace'].map((option) => (
                      <div
                        key={option}
                        className={`px-3 py-2.5 hover:bg-blue-50 rounded-lg cursor-pointer text-sm flex items-center transition-colors ${activeTab === option ? 'bg-blue-50 text-blue-600 font-medium' : ''}`}
                        onClick={() => {
                          setActiveTab(option);
                          setShowPurposeDropdown(false);
                        }}
                      >
                        <span className={`w-2 h-2 rounded-full mr-2 ${activeTab === option ? 'bg-blue-500' : 'bg-gray-300'}`}></span>
                        {option}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Search Button */}
            <button 
              onClick={handleSearch}
              className="relative w-full h-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-5 rounded-2xl text-lg font-medium flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600/0 via-white/20 to-blue-600/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <Search className="w-6 h-6 mr-2" />
              <span className="relative z-10">Search</span>
            </button>
          </div>
        </div>
        
        {/* Help Link */}
        <div className="flex justify-end mt-6">
          <button className="text-gray-500 hover:text-blue-600 flex items-center text-sm transition-colors hover:scale-105 transform duration-300">
            <Info className="w-5 h-5 mr-1.5" />
            Need some help?
          </button>
        </div>
        
        {/* Feedback for user - Only shown briefly after search */}
        {showSearchData && (
          <div className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg text-sm text-gray-700 border border-blue-100 animate-fadeIn">
            <div className="font-medium mb-1 flex items-center">
              <Sparkles className="w-4 h-4 mr-2 text-blue-500" />
              Search data collected:
            </div>
            <pre className="whitespace-pre-wrap text-xs mt-1 bg-white/80 p-2 rounded">
              {searchData}
            </pre>
          </div>
        )}
      </div>

      {/* Search Results */}
      {showResults && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-white dark:bg-gray-900">
          <div className="min-h-screen">
            <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 shadow-md">
              <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                  Search Results for {location}
                </h2>
                <button
                  onClick={() => setShowResults(false)}
                  className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"
                  aria-label="Close search results"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            {/* Check if searchResults exists before rendering the component */}
            {searchResults ? (
              <SearchResults
                weatherData={searchResults.weather || []}
                hotels={searchResults.hotels || []}
                restaurants={searchResults.restaurants || []}
                attractions={searchResults.attractions || []}
                isLoading={isLoading}
                error={searchResults.error}
              />
            ) : (
              <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[40vh]">
                <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Preparing your search results...
                </p>
                <Link href="/test-results" className="mt-8 text-blue-500 hover:underline">
                  View Test Results Page
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
} 