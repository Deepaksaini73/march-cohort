import { Suspense } from 'react';
import { Loader2, MapPin, Calendar, Wallet2 } from 'lucide-react';
import { unstable_noStore as noStore } from 'next/cache';
import SearchResults from '../components/search/SearchResults';

interface TripData {
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
  restaurants: Array<{
    name: string;
    cuisine: string;
    rating: number | string;
    price: string;
  }>;
  attractions: Array<{
    name: string;
    rating: number;
    entranceFee: number;
    day: number;
  }>;
}

// Helper function to safely parse search params
function getSearchParams(searchParams: { [key: string]: string | string[] | undefined }) {
  // Helper function to decode URL parameters that might be double encoded
  const safeDecodeURIComponent = (str: string) => {
    try {
      // First decode
      let decoded = decodeURIComponent(str);
      // Check if it's still encoded
      if (decoded.includes('%20') || decoded.includes('%')) {
        // Second decode
        decoded = decodeURIComponent(decoded);
      }
      return decoded;
    } catch (e) {
      console.error('Error decoding URL parameter:', e);
      return str;
    }
  };

  // Now safely access and decode the searchParams
  const location = searchParams?.location ? 
    safeDecodeURIComponent(Array.isArray(searchParams.location) ? searchParams.location[0] : searchParams.location) : '';
  
  const budget = searchParams?.budget ? 
    safeDecodeURIComponent(Array.isArray(searchParams.budget) ? searchParams.budget[0] : searchParams.budget) : '';
  
  const days = searchParams?.days ? 
    parseInt(Array.isArray(searchParams.days) ? searchParams.days[0] : searchParams.days) : 1;
  
  return { location, budget, days };
}

export default async function SearchResultsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  // Opt out of caching for this page
  noStore();

  // Get search parameters safely
  const { location, budget, days } = getSearchParams(searchParams);

  // Get city from location (e.g., "Mumbai, India" -> "Mumbai")
  const city = location.split(',')[0].trim();

  try {
    // Make API call to backend
    const response = await fetch('http://localhost:8000/api/trip', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        city,
        location,
        days,
        guests: 2,
        budget,
        attraction_type: "Monument"
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ detail: 'Failed to fetch results' }));
      throw new Error(typeof errorData.detail === 'string' ? errorData.detail : 'Failed to fetch results');
    }

    const data: TripData = await response.json();

    return (
      <Suspense fallback={
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
          <div className="text-center bg-white p-8 rounded-2xl shadow-lg">
            <Loader2 className="w-16 h-16 text-blue-600 animate-spin mx-auto mb-6" />
            <p className="text-xl text-gray-700 font-medium">Planning your perfect trip...</p>
            <p className="text-gray-500 mt-2">This may take a moment</p>
          </div>
        </div>
      }>
        <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="container mx-auto px-4 py-12">
            {/* Hero Section */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-12 text-white">
                <h1 className="text-4xl font-bold mb-4">Discover {location}</h1>
                <p className="text-blue-100 text-lg">Your personalized travel itinerary awaits</p>
              </div>
            </div>
            
            {/* Search Parameters Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Trip Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <MapPin className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-semibold text-gray-800">{location}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <Wallet2 className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Budget</p>
                    <p className="font-semibold text-gray-800">{budget}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-purple-100 p-3 rounded-full">
                    <Calendar className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Duration</p>
                    <p className="font-semibold text-gray-800">{days} {days === 1 ? 'day' : 'days'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Search Results Section */}
            <div className="space-y-8">
              {data ? (
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <SearchResults
                    weatherData={data.weather || []}
                    hotels={data.hotels || []}
                    restaurants={data.restaurants || []}
                    attractions={data.attractions || []}
                    isLoading={false}
                  />
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
                  <div className="max-w-md mx-auto">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">No Results Found</h3>
                    <p className="text-gray-600 mb-6">We couldn't find any matches for your search criteria. Try adjusting your filters or searching for a different location.</p>
                    <button 
                      onClick={() => window.history.back()}
                      className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Try Another Search
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </Suspense>
    );
  } catch (error) {
    console.error('Error fetching results:', error);
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4 py-12">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-red-600 px-8 py-12 text-white">
              <h1 className="text-4xl font-bold mb-4">Search Results</h1>
              <p className="text-red-100">for {location}</p>
            </div>
            <div className="p-8">
              <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-red-800 mb-2">Error Occurred</h2>
                <p className="text-red-600">{error instanceof Error ? error.message : 'Please try again.'}</p>
                <button 
                  onClick={() => window.history.back()}
                  className="mt-6 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Go Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
} 