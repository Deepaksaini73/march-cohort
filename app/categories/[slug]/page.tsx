import Image from 'next/image';
import Link from 'next/link';

// Sample data for categories
const categories = [
  {
    id: 1,
    title: 'Mountain',
    image: '/images/ocean-wave.jpg',
    count: '356 Tours, 264 Activities',
    slug: 'mountain',
    description: 'Explore majestic mountain ranges, challenging peaks, and breathtaking views with our mountain tours and activities.'
  },
  {
    id: 2,
    title: 'Safari',
    image: '/images/maldives.jpg',
    count: '356 Tours, 264 Activities',
    slug: 'safari',
    description: 'Experience wildlife in its natural habitat with our safari tours that take you through some of the world\'s most stunning national parks.'
  },
  {
    id: 3,
    title: 'Desert',
    image: '/images/santorini.jpg',
    count: '356 Tours, 264 Activities',
    slug: 'desert',
    description: 'Discover the stark beauty and unique landscapes of the world\'s most fascinating deserts with our specialized desert tours.'
  },
  {
    id: 4,
    title: 'Flower',
    image: '/images/ocean-wave.jpg',
    count: '356 Tours, 264 Activities',
    slug: 'flower',
    description: 'Witness the spectacular beauty of flower blooms and botanical gardens around the world with our seasonal flower tours.'
  },
  {
    id: 5,
    title: 'Beach',
    image: '/images/maldives.jpg',
    count: '356 Tours, 264 Activities',
    slug: 'beach',
    description: 'Relax and unwind on the world\'s most beautiful beaches with our beach destination tours and activities.'
  },
  {
    id: 6,
    title: 'Temples',
    image: '/images/santorini.jpg',
    count: '356 Tours, 264 Activities',
    slug: 'temples',
    description: 'Explore ancient temples and spiritual sites around the world, experiencing the rich cultural heritage and history.'
  },
  {
    id: 7,
    title: 'Yacht',
    image: '/images/boating.jpg',
    count: '356 Tours, 264 Activities',
    slug: 'yacht',
    description: 'Set sail on luxurious yacht tours, exploring coastlines and enjoying the freedom of the open water.'
  },
  {
    id: 8,
    title: 'Valley',
    image: '/images/ocean-wave.jpg',
    count: '356 Tours, 264 Activities',
    slug: 'valley',
    description: 'Experience the serene beauty of valleys with lush landscapes, rivers, and unique geological formations.'
  }
];

// Sample tour data
const sampleTours = [
  {
    id: 1,
    title: '3-Day Adventure Tour',
    image: '/images/ocean-wave.jpg',
    price: 24877, // 299 USD * 83.20
    rating: 4.8,
    reviews: 124,
    location: 'Alps, Switzerland',
    duration: '3 days'
  },
  {
    id: 2,
    title: 'Scenic Day Trip',
    image: '/images/ocean-wave.jpg',
    price: 12397, // 149 USD * 83.20
    rating: 4.6,
    reviews: 86,
    location: 'Valley Region',
    duration: '1 day'
  },
  {
    id: 3,
    title: 'Mountain Expedition',
    image: '/images/ocean-wave.jpg',
    price: 41517, // 499 USD * 83.20
    rating: 4.9,
    reviews: 203,
    location: 'Himalayas',
    duration: '7 days'
  },
  {
    id: 4,
    title: 'Cultural Tour',
    image: '/images/santorini.jpg',
    price: 16557, // 199 USD * 83.20
    rating: 4.7,
    reviews: 157,
    location: 'Bangkok, Thailand',
    duration: '2 days'
  },
  {
    id: 5,
    title: 'Weekend Getaway',
    image: '/images/maldives.jpg',
    price: 29037, // 349 USD * 83.20
    rating: 4.5,
    reviews: 92,
    location: 'Bali, Indonesia',
    duration: '3 days'
  },
  {
    id: 6,
    title: 'Wildlife Safari',
    image: '/images/maldives.jpg',
    price: 49837, // 599 USD * 83.20
    rating: 4.9,
    reviews: 178,
    location: 'Serengeti, Tanzania',
    duration: '5 days'
  }
];

export default function CategoryPage({ params }: { params: { slug: string } }) {
  // Find the current category from the slug
  const category = categories.find(cat => cat.slug === params.slug) || {
    title: 'Category Not Found',
    image: '/images/ocean-wave.jpg',
    count: '0 Tours, 0 Activities',
    description: 'This category was not found. Please check our other categories.'
  };

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[300px] md:h-[400px]">
        <Image
          src={category.image}
          alt={category.title}
          fill
          className="object-cover brightness-75"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">{category.title} Tours</h1>
              <p className="text-white/90 text-lg">{category.count}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About {category.title} Tours</h2>
          <p className="text-gray-600">{category.description}</p>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular {category.title} Tours</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleTours.map((tour) => (
            <div key={tour.id} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="relative h-48">
                <Image
                  src={tour.image}
                  alt={tour.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-gray-900">{tour.title}</h3>
                  <span className="text-sm font-bold text-gray-900">₹{tour.price}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span>{tour.rating} ({tour.reviews} reviews)</span>
                </div>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{tour.location}</span>
                  <span className="mx-2">•</span>
                  <span>{tour.duration}</span>
                </div>
                <button className="w-full bg-black text-white py-2 rounded-md font-medium hover:bg-gray-800 transition-colors">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link href="/categories" className="inline-flex items-center bg-transparent border border-gray-300 text-gray-700 px-6 py-3 rounded-full font-medium hover:bg-gray-50 transition-colors mr-4">
            Back to Categories
          </Link>
          <Link href="/" className="inline-flex items-center bg-black text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors">
            Explore More Tours
          </Link>
        </div>
      </div>
    </main>
  );
} 