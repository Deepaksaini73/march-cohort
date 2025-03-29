"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import SearchForm from '../search/SearchForm';

export default function Hero() {
  // Images for the background slider
  const backgroundImages = [
    {
      src: '/images/ocean-wave.jpg',
      alt: 'Ocean waves'
    },
    {
      src: '/images/maldives.jpg',
      alt: 'Maldives resort'
    },
    {
      src: '/images/santorini.jpg',
      alt: 'Santorini Greece'
    },
    {
      src: '/images/boating.jpg',
      alt: 'Boating adventure'
    }
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState('');

  const goToPrevImage = () => {
    if (isTransitioning) return;
    setDirection('prev');
    setIsTransitioning(true);
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? backgroundImages.length - 1 : prevIndex - 1
    );
  };

  const goToNextImage = () => {
    if (isTransitioning) return;
    setDirection('next');
    setIsTransitioning(true);
    setCurrentImageIndex((prevIndex) => 
      prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      goToNextImage();
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full min-h-[460px] md:min-h-[520px] overflow-hidden">
      {/* Background Images Slider */}
      <div className="absolute inset-0 z-0">
        <Image 
          src={backgroundImages[currentImageIndex].src}
          alt={backgroundImages[currentImageIndex].alt}
          fill
          priority={true}
          className="object-cover brightness-[0.85]"
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-10 pb-16 md:pt-16 md:pb-16">
        <div className="flex flex-col items-start">
          {/* Content */}
          <div className="w-full md:w-3/5 lg:w-1/2 text-white mb-8">
            <div className="inline-block bg-yellow-300 text-black font-medium px-5 py-1.5 rounded-full mb-4 text-sm">
              Discovery the World
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 leading-tight">
              Unleash Your Wanderlust<br />
              Book Your Next Journey
            </h1>
            
            <p className="text-base md:text-lg mb-6 text-gray-100 max-w-lg">
              Crafting Exceptional Journeys: Your Global Escape Planner. Unleash Your Wanderlust: 
              Seamless Travel, Extraordinary Adventures
            </p>
            
            <div className="flex space-x-3">
              <button 
                className="bg-white/20 w-10 h-10 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                aria-label="Previous slide"
                onClick={goToPrevImage}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button 
                className="bg-white/20 w-10 h-10 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                aria-label="Next slide"
                onClick={goToNextImage}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      
        {/* Search Form Component */}
        <div className="mb-28 mt-4">
          <SearchForm />
        </div>
      </div>
    </section>
  );
}
