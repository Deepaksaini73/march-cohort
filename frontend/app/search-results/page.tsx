import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import SearchResults from '../components/SearchResults';

export default function SearchResultsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // Parse search parameters
  const location = searchParams.location ? decodeURIComponent(searchParams.location as string) : '';
  const budget = searchParams.budget ? decodeURIComponent(searchParams.budget as string) : '';
  const date = searchParams.date as string;
  const days = parseInt(searchParams.days as string) || 1;

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Search Results for {location}
        </h1>
        
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Search Parameters</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">Location</p>
              <p className="font-medium text-gray-900">{location}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">Budget</p>
              <p className="font-medium text-gray-900">{budget || 'Not specified'}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">Date</p>
              <p className="font-medium text-gray-900">
                {date ? new Date(date).toLocaleDateString() : 'Not specified'}
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">Duration</p>
              <p className="font-medium text-gray-900">{days} {days === 1 ? 'day' : 'days'}</p>
            </div>
          </div>
        </div>

        <Suspense
          fallback={
            <div className="flex items-center justify-center min-h-[400px]">
              <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            </div>
          }
        >
          <SearchResults
            weatherData={[]}
            hotels={[]}
            restaurants={[]}
            attractions={[]}
            isLoading={false}
            error={null}
          />
        </Suspense>
      </div>
    </main>
  );
} 