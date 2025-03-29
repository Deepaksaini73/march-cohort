"use client";

import Image from 'next/image';
import Link from 'next/link';

const categories = [
  {
    id: 1,
    title: 'Mountain',
    image: '/images/ocean-wave.jpg',
    count: '356 Tours, 264 Activities',
    slug: 'mountain'
  },
  {
    id: 2,
    title: 'Safari',
    image: '/images/maldives.jpg',
    count: '356 Tours, 264 Activities',
    slug: 'safari'
  },
  {
    id: 3,
    title: 'Desert',
    image: '/images/santorini.jpg',
    count: '356 Tours, 264 Activities',
    slug: 'desert'
  },
  {
    id: 4,
    title: 'Flower',
    image: '/images/ocean-wave.jpg',
    count: '356 Tours, 264 Activities',
    slug: 'flower'
  },
  {
    id: 5,
    title: 'Beach',
    image: '/images/maldives.jpg',
    count: '356 Tours, 264 Activities',
    slug: 'beach'
  },
  {
    id: 6,
    title: 'Temples',
    image: '/images/santorini.jpg',
    count: '356 Tours, 264 Activities',
    slug: 'temples'
  },
  {
    id: 7,
    title: 'Yacht',
    image: '/images/boating.jpg',
    count: '356 Tours, 264 Activities',
    slug: 'yacht'
  },
  {
    id: 8,
    title: 'Valley',
    image: '/images/ocean-wave.jpg',
    count: '356 Tours, 264 Activities',
    slug: 'valley'
  }
];

export default function TourCategories() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Top Categories of Tours</h2>
            <p className="text-gray-600 mt-1">Favorite destinations based on customer reviews</p>
          </div>
          <Link href="/categories" className="inline-flex items-center bg-black text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
            View More
            <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"></path>
              <path d="M12 5l7 7-7 7"></path>
            </svg>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {categories.map((category) => (
            <div key={category.id} className="group cursor-pointer">
              <Link href={`/categories/${category.slug}`}>
                <div className="relative rounded-lg overflow-hidden h-40 mb-3">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105 duration-300"
                  />
                </div>
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-gray-900">{category.title}</h3>
                  <button 
                    className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                    aria-label={`View ${category.title} tours`}
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </button>
                </div>
                <p className="text-sm text-gray-500">{category.count}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 