"use client";

import Image from 'next/image';
import Link from 'next/link';

// Import all images
import mountainsImg from '@/assets/mountains.png';
import safariImg from '@/assets/safari.png';
import desertImg from '@/assets/desert.png';
import flowerImg from '@/assets/flower.png';
import beachImg from '@/assets/beach.png';
import templesImg from '@/assets/temples.png';
import yachtImg from '@/assets/yacht.png';
import valleyImg from '@/assets/bg-sea-1.png';
import bgSea2 from '@/assets/bg-sea-2.png';
import bgSea3 from '@/assets/bg-sea-3.png';

// Extended list of categories
const allCategories = [
  {
    id: 1,
    title: 'Mountain',
    image: mountainsImg,
    count: '356 Tours, 264 Activities',
    slug: 'mountain'
  },
  {
    id: 2,
    title: 'Safari',
    image: safariImg,
    count: '356 Tours, 264 Activities',
    slug: 'safari'
  },
  {
    id: 3,
    title: 'Desert',
    image: desertImg,
    count: '356 Tours, 264 Activities',
    slug: 'desert'
  },
  {
    id: 4,
    title: 'Flower',
    image: flowerImg,
    count: '356 Tours, 264 Activities',
    slug: 'flower'
  },
  {
    id: 5,
    title: 'Beach',
    image: beachImg,
    count: '356 Tours, 264 Activities',
    slug: 'beach'
  },
  {
    id: 6,
    title: 'Temples',
    image: templesImg,
    count: '356 Tours, 264 Activities',
    slug: 'temples'
  },
  {
    id: 7,
    title: 'Yacht',
    image: yachtImg,
    count: '356 Tours, 264 Activities',
    slug: 'yacht'
  },
  {
    id: 8,
    title: 'Valley',
    image: valleyImg,
    count: '356 Tours, 264 Activities',
    slug: 'valley'
  },
  // Additional categories for "View More" page
  {
    id: 9,
    title: 'Hiking',
    image: mountainsImg,
    count: '285 Tours, 195 Activities',
    slug: 'hiking'
  },
  {
    id: 10,
    title: 'Camping',
    image: bgSea2,
    count: '210 Tours, 185 Activities',
    slug: 'camping'
  },
  {
    id: 11,
    title: 'Cultural',
    image: templesImg,
    count: '325 Tours, 240 Activities',
    slug: 'cultural'
  },
  {
    id: 12,
    title: 'Adventure',
    image: safariImg,
    count: '410 Tours, 320 Activities',
    slug: 'adventure'
  },
  {
    id: 13,
    title: 'Cruise',
    image: yachtImg,
    count: '180 Tours, 150 Activities',
    slug: 'cruise'
  },
  {
    id: 14,
    title: 'Wildlife',
    image: safariImg,
    count: '290 Tours, 230 Activities',
    slug: 'wildlife'
  },
  {
    id: 15,
    title: 'Festivals',
    image: bgSea3,
    count: '170 Tours, 140 Activities',
    slug: 'festivals'
  },
  {
    id: 16,
    title: 'City',
    image: templesImg,
    count: '380 Tours, 320 Activities',
    slug: 'city'
  }
];

export default function CategoriesPage() {
  return (
    <main className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">All Tour Categories</h1>
          <p className="text-gray-600 max-w-2xl">
            Explore our comprehensive collection of tour categories, each offering unique experiences and adventures around the world.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {allCategories.map((category) => (
            <div key={category.id} className="group cursor-pointer">
              <Link href={`/categories/${category.slug}`}>
                <div className="relative rounded-lg overflow-hidden h-48 mb-3">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105 duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
                </div>
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900">{category.title}</h3>
                  <button 
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                    aria-label={`View ${category.title} tours`}
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </button>
                </div>
                <p className="text-sm text-gray-500">{category.count}</p>
              </Link>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link href="/" className="inline-flex items-center bg-black text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors">
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
} 