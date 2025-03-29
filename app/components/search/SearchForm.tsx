"use client";
import { useState, useEffect, useRef } from 'react';
import { Search, MapPin, User, Calendar, Info, DollarSign, Car, Briefcase, Sparkles, ChevronDown, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function SearchForm() {
  const [activeTab, setActiveTab] = useState('Tours');
  const [location, setLocation] = useState('Mumbai, India');
  const [guests, setGuests] = useState(4);
  const [days, setDays] = useState(3);
  const [budget, setBudget] = useState('₹7,500-₹15,000');
  const [transport, setTransport] = useState('Car');
  const [purpose, setPurpose] = useState('Fun');
  const [isFormFocused, setIsFormFocused] = useState(false);
  const [searchData, setSearchData] = useState('');
  const [showSearchData, setShowSearchData] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showGuestsDropdown, setShowGuestsDropdown] = useState(false);
  const [showDaysDropdown, setShowDaysDropdown] = useState(false);
  const [locationSuggestions, setLocationSuggestions] = useState<string[]>([]);
  const [locationSearchTerm, setLocationSearchTerm] = useState('Mumbai, India');
  const [isLoadingLocations, setIsLoadingLocations] = useState(false);
  
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
  const guestsDropdownRef = useRef<HTMLDivElement>(null);
  const daysDropdownRef = useRef<HTMLDivElement>(null);
  
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
  
  const handleGuestSelect = (count: number) => {
    setGuests(count);
    setShowGuestsDropdown(false);
  };

  // Handle clicks outside dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (locationDropdownRef.current && !locationDropdownRef.current.contains(event.target as Node)) {
        setShowLocationDropdown(false);
      }
      if (guestsDropdownRef.current && !guestsDropdownRef.current.contains(event.target as Node)) {
        setShowGuestsDropdown(false);
      }
      if (daysDropdownRef.current && !daysDropdownRef.current.contains(event.target as Node)) {
        setShowDaysDropdown(false);
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

  const handleSearch = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Create a string with all the search data including the date/time
    let searchInfo = `Search at ${new Date().toLocaleString()}\n`;
    searchInfo += `Tab: ${activeTab}\n`;
    searchInfo += `Location: ${location}\n`;
    
    // Add conditional fields based on active tab
    if (activeTab === 'Budget') {
      searchInfo += `Price Range: ${budget}\n`;
      searchInfo += `Days: ${days}`;
    } else if (activeTab === 'Rental') {
      searchInfo += `Transport: ${transport}\n`;
      searchInfo += `Days: ${days}`;
    } else if (activeTab === 'Activities') {
      searchInfo += `Purpose: ${purpose}\n`;
      searchInfo += `Days: ${days}`;
    } else {
      // Tours tab
      searchInfo += `Guests: ${guests}\n`;
      searchInfo += `Days: ${days}`;
    }
    
    // Create a JSON object with all the data (alternative format)
    const searchDataObject = {
      timestamp: new Date().toISOString(),
      tab: activeTab,
      location: location,
      days: days, // Store days for all tabs
      ...(activeTab === 'Budget' ? { priceRange: budget } : {}),
      ...(activeTab === 'Rental' ? { transport } : {}),
      ...(activeTab === 'Activities' ? { purpose } : {}),
      ...(activeTab === 'Tours' ? { guests } : {})
    };
    
    // Store the search information string
    setSearchData(searchInfo);
    
    // Show the stored data in console
    console.log("Search Data (String):", searchInfo);
    console.log("Search Data (Object):", searchDataObject);
    
    // Show feedback to the user (optional)
    setShowSearchData(true);
    
    // Hide the feedback after 3 seconds
    setTimeout(() => {
      setShowSearchData(false);
    }, 3000);
    
    // Store in localStorage
    localStorage.setItem('lastSearch', JSON.stringify(searchDataObject));
    
    // Normally you would redirect here, but we're commenting this out
    // to allow the console output to be visible
    // window.location.href = `/${activeTab.toLowerCase()}`;
    
    // Instead, just show a message about where we would navigate
    console.log(`Would navigate to: /${activeTab.toLowerCase()}`);
  };

  // Get appropriate recommended counts based on tab
  const getDayOptions = () => {
    return [1, 2, 3, 4, 5, 6, 7, 8, 10, 14, 21, 30];
  };
  
  const getGuestOptions = () => {
    if (activeTab === 'Tours') {
      return [1, 2, 3, 4, 5, 6, 8, 10, 12, 15, 20];
    } else if (activeTab === 'Budget') {
      return [1, 2, 3, 4, 5, 6, 7, 8, 10, 14, 21, 30];
    } else {
      return [1, 2, 3, 4, 5, 6];
    }
  };
  
  const handleDaySelect = (count: number) => {
    setDays(count);
    setShowDaysDropdown(false);
  };

  return (
    <div 
      className={`backdrop-blur-md bg-white/95 rounded-3xl shadow-2xl p-7 max-w-5xl mx-auto relative border border-gray-100 z-20 transition-all duration-500 ${isFormFocused ? 'shadow-[0_20px_50px_rgba(8,_112,_184,_0.2)]' : ''}`}
      onClick={(e) => {
        e.stopPropagation();
        setIsFormFocused(true);
      }}
    >
      {/* Ambient background effect */}
      <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-gradient-to-br from-blue-100/30 via-purple-100/20 to-transparent rounded-r-3xl" />
      
      {/* Tabs */}
      <div className="flex mb-7 justify-center">
        <div className="bg-gray-100 p-1.5 rounded-full inline-flex shadow-inner">
          {['Tours', 'Budget', 'Rental', 'Activities'].map((tab) => (
            <button 
              key={tab}
              className={`relative overflow-hidden ${
                activeTab === tab 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md' 
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-200'
              } px-7 py-3 rounded-full text-sm font-medium transition-all duration-300 transform ${activeTab === tab ? 'scale-105' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {activeTab === tab && (
                <span className="absolute inset-0 opacity-20">
                  <span className="absolute inset-0 rounded-full bg-white/20 animate-pulse" />
                </span>
              )}
              {tab}
            </button>
          ))}
        </div>
      </div>
      
      {/* Form */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch">
        {/* Location Input with Dropdown */}
        <div className={`flex-grow relative ${activeTab === 'Budget' ? 'md:w-[35%]' : ''}`} ref={locationDropdownRef}>
          <div 
            className="bg-white border border-gray-200 rounded-2xl p-4 h-full flex items-center shadow-sm hover:shadow-md transition-all duration-300 group focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100 cursor-pointer"
            onClick={() => setShowLocationDropdown(true)}
          >
            <div className="bg-gradient-to-br from-blue-500 to-purple-500 rounded-full p-2 mr-3 text-white shadow-md group-hover:scale-105 transition-transform duration-300">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="flex-grow">
              <label htmlFor="location" className="block text-xs text-gray-500 font-medium mb-1">Where to?</label>
              <div className="flex items-center">
                <input 
                  id="location"
                  type="text" 
                  className="text-base font-medium bg-transparent outline-none w-full"
                  placeholder="Enter destination" 
                  value={locationSearchTerm}
                  onChange={handleLocationChange}
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowLocationDropdown(true);
                  }}
                />
                <ChevronDown className="w-4 h-4 text-gray-400 ml-2" />
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
        
        {/* Budget Input - Only visible for Budget tab */}
        {activeTab === 'Budget' && (
          <div className="w-full md:w-56 relative">
            <div className="bg-white border border-gray-200 rounded-2xl p-4 h-full flex items-center shadow-sm hover:shadow-md transition-all duration-300 group focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100">
              <div className="bg-gradient-to-br from-green-500 to-teal-500 rounded-full p-2 mr-3 text-white shadow-md group-hover:scale-105 transition-transform duration-300">
                <DollarSign className="w-5 h-5" />
              </div>
              <div className="w-full">
                <label htmlFor="budget" className="block text-xs text-gray-500 font-medium mb-1">Price Range</label>
                <select 
                  id="budget"
                  className="text-base font-medium bg-transparent outline-none w-full cursor-pointer"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                >
                  <option value="₹0-₹7,500">₹0-₹7,500</option>
                  <option value="₹7,500-₹15,000">₹7,500-₹15,000</option>
                  <option value="₹15,000-₹22,500">₹15,000-₹22,500</option>
                  <option value="₹22,500-₹37,500">₹22,500-₹37,500</option>
                  <option value="₹37,500+">₹37,500+</option>
                </select>
              </div>
            </div>
          </div>
        )}
        
        {/* Transport Mode - Only visible for Rental tab */}
        {activeTab === 'Rental' ? (
          <div className="w-full md:w-56 relative">
            <div className="bg-white border border-gray-200 rounded-2xl p-4 h-full flex items-center shadow-sm hover:shadow-md transition-all duration-300 group focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100">
              <div className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-full p-2 mr-3 text-white shadow-md group-hover:scale-105 transition-transform duration-300">
                <Car className="w-5 h-5" />
              </div>
              <div className="w-full">
                <label htmlFor="transport" className="block text-xs text-gray-500 font-medium mb-1">Transport</label>
                <select 
                  id="transport"
                  className="text-base font-medium bg-transparent outline-none w-full cursor-pointer"
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
        ) : activeTab === 'Activities' ? (
          /* Purpose Input - Only visible for Activities tab */
          <div className="w-full md:w-56 relative">
            <div className="bg-white border border-gray-200 rounded-2xl p-4 h-full flex items-center shadow-sm hover:shadow-md transition-all duration-300 group focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-full p-2 mr-3 text-white shadow-md group-hover:scale-105 transition-transform duration-300">
                <Briefcase className="w-5 h-5" />
              </div>
              <div className="w-full">
                <label htmlFor="purpose" className="block text-xs text-gray-500 font-medium mb-1">Purpose</label>
                <select 
                  id="purpose"
                  className="text-base font-medium bg-transparent outline-none w-full cursor-pointer"
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                >
                  <option value="Fun">Fun</option>
                  <option value="Business">Business</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Office">Office</option>
                  <option value="Tour">Tour</option>
                  <option value="Education">Education</option>
                </select>
              </div>
            </div>
          </div>
        ) : (
          /* Guests Input for Tours tab */
          <div className="w-full md:w-56 relative" ref={guestsDropdownRef}>
            <div 
              className="bg-white border border-gray-200 rounded-2xl p-4 h-full flex items-center shadow-sm hover:shadow-md transition-all duration-300 group focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100 cursor-pointer"
              onClick={() => setShowGuestsDropdown(!showGuestsDropdown)}
            >
              <div className="bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full p-2 mr-3 text-white shadow-md group-hover:scale-105 transition-transform duration-300">
                <User className="w-5 h-5" />
              </div>
              <div className="flex-grow">
                <label htmlFor="guests" className="block text-xs text-gray-500 font-medium mb-1">Guests</label>
                <div className="flex items-center justify-between">
                  <span className="text-base font-medium">{guests}</span>
                  <div className="flex items-center">
                    <span className="text-gray-500 mr-2">guests</span>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Days Dropdown */}
            {showGuestsDropdown && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-100 z-40 max-h-60 overflow-y-auto animate-fadeIn">
                <div className="p-2">
                  <div className="flex items-center px-3 py-2">
                    <span className="text-xs font-semibold text-gray-500">Select Number of Guests</span>
                  </div>
                  
                  {getGuestOptions().map((count) => (
                    <div
                      key={count}
                      className={`px-3 py-2.5 hover:bg-blue-50 rounded-lg cursor-pointer text-sm transition-colors ${guests === count ? 'bg-blue-50 font-medium' : ''}`}
                      onClick={() => handleGuestSelect(count)}
                    >
                      <div className="flex items-center justify-between">
                        <span>{count} {count === 1 ? 'guest' : 'guests'}</span>
                        {count === guests && (
                          <svg className="w-4 h-4 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586l-3.293-3.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      {count > 14 && (
                        <div className="text-xs text-blue-500 mt-1">Extended stay discount available</div>
                      )}
                    </div>
                  ))}
                  
                  <div className="px-3 py-2 mt-2 border-t border-gray-100">
                    <div className="text-xs text-gray-500">
                      Need more options? <span className="text-blue-500 cursor-pointer hover:underline">Contact us</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        
        {/* Days Dropdown for all tabs */}
        <div className="w-full md:w-56 relative" ref={daysDropdownRef}>
          <div 
            className="bg-white border border-gray-200 rounded-2xl p-4 h-full flex items-center shadow-sm hover:shadow-md transition-all duration-300 group focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100 cursor-pointer"
            onClick={() => setShowDaysDropdown(!showDaysDropdown)}
          >
            <div className="bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full p-2 mr-3 text-white shadow-md group-hover:scale-105 transition-transform duration-300">
              <Calendar className="w-5 h-5" />
            </div>
            <div className="flex-grow">
              <label htmlFor="days" className="block text-xs text-gray-500 font-medium mb-1">Days</label>
              <div className="flex items-center justify-between">
                <span className="text-base font-medium">{days}</span>
                <div className="flex items-center">
                  <span className="text-gray-500 mr-2">days</span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Days Dropdown */}
          {showDaysDropdown && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-100 z-40 max-h-60 overflow-y-auto animate-fadeIn">
              <div className="p-2">
                <div className="flex items-center px-3 py-2">
                  <span className="text-xs font-semibold text-gray-500">Select Number of Days</span>
                </div>
                
                {getDayOptions().map((count) => (
                  <div
                    key={count}
                    className={`px-3 py-2.5 hover:bg-blue-50 rounded-lg cursor-pointer text-sm transition-colors ${days === count ? 'bg-blue-50 font-medium' : ''}`}
                    onClick={() => handleDaySelect(count)}
                  >
                    <div className="flex items-center justify-between">
                      <span>{count} {count === 1 ? 'day' : 'days'}</span>
                      {count === days && (
                        <svg className="w-4 h-4 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586l-3.293-3.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    {count > 14 && (
                      <div className="text-xs text-blue-500 mt-1">Extended stay discount available</div>
                    )}
                  </div>
                ))}
                
                <div className="px-3 py-2 mt-2 border-t border-gray-100">
                  <div className="text-xs text-gray-500">
                    Need more options? <span className="text-blue-500 cursor-pointer hover:underline">Contact us</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Search Button */}
        <div className="w-full md:w-auto">
          <button 
            onClick={handleSearch}
            className="relative w-full h-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-4 rounded-2xl text-base font-medium flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600/0 via-white/20 to-blue-600/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            <Search className="w-5 h-5 mr-2" />
            <span className="relative z-10">Search</span>
          </button>
        </div>
      </div>
      
      {/* Help Link */}
      <div className="flex justify-end mt-5">
        <button className="text-gray-500 hover:text-blue-600 flex items-center text-xs transition-colors hover:scale-105 transform duration-300">
          <Info className="w-4 h-4 mr-1.5" />
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
  );
} 