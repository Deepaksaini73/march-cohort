"use client";

import React, { useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

// Predefined testimonial data
const testimonialData = [
  {
    id: 1,
    name: 'Sara Mohamed',
    location: 'Jakarta',
    rating: 5,
    avatar: '/images/avatars/sara.jpg',
    content: "I've been using this booking system for several years now, and it's become my go-to platform for planning my trips. The interface is user-friendly, and I appreciate the detailed information and real-time availability of hotels."
  },
  {
    id: 2, 
    name: 'Atend John',
    location: 'California',
    rating: 5,
    avatar: '/images/avatars/atend.jpg',
    content: "I've been using this booking system for several years now, and it's become my go-to platform for planning my trips. The interface is user-friendly, and I appreciate the detailed information and real-time availability of hotels."
  },
  {
    id: 3,
    name: 'Sara Mohamed',
    location: 'Jakarta',
    rating: 5,
    avatar: '/images/avatars/sara.jpg',
    content: "I've been using this booking system for several years now, and it's become my go-to platform for planning my trips. The interface is user-friendly, and I appreciate the detailed information and real-time availability of hotels."
  },
  {
    id: 4,
    name: 'Roger Williams',
    location: 'London',
    rating: 5,
    avatar: '/images/avatars/roger.jpg',
    content: "I've been using this booking system for several years now, and it's become my go-to platform for planning my trips. The interface is user-friendly, and I appreciate the detailed information and real-time availability of hotels."
  }
];

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex group">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'} transition-all duration-300 transform group-hover:scale-110 hover:scale-125 hover:rotate-12`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

const TestimonialCard = ({ testimonial }: { testimonial: any }) => {
  return (
    <div className="bg-white p-6 mx-2 rounded-lg shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-2 hover:bg-gray-50 cursor-pointer h-full">
      <div className="text-lg text-gray-800 mb-4">
        {testimonial.content}
      </div>
      <div className="flex items-center mt-4">
        <div className="flex-shrink-0 transition-transform duration-300 hover:scale-110">
          <img 
            src={'https://icon-library.com/images/user-icon/user-icon-7.jpg'} 
            alt={testimonial.name}
            className="w-10 h-10 rounded-full object-cover border-2 border-transparent hover:border-yellow-400"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/40';
            }} 
          />
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-gray-900">{testimonial.name}</p>
          <p className="text-xs text-gray-500">{testimonial.location}</p>
        </div>
        <div className="ml-auto">
          <StarRating rating={testimonial.rating} />
        </div>
      </div>
    </div>
  );
};

export default function TestimonialSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    beforeChange: (_: any, next: number) => setCurrentSlide(next),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <section className="py-16 bg-gray-50 overflow-hidden relative">
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-white to-transparent opacity-30"></div>
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white to-transparent opacity-30"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="mb-8 text-center">
          <span className="inline-block px-3 py-1 bg-yellow-300 rounded-full text-sm font-semibold mb-4 transform transition-transform hover:scale-105">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Don't take our word for it
          </h2>
        </div>

        <div className="relative">
          <Slider {...settings}>
            {testimonialData.map(testimonial => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </Slider>
          
          <div className="flex justify-center mt-8">
            <button 
              onClick={() => (document.querySelector('.slick-prev') as HTMLElement)?.click()}
              className="mx-1 p-2 rounded-full bg-white shadow-md hover:bg-gray-50 hover:shadow-lg transition-all duration-300 transform hover:scale-110"
              aria-label="Previous slide"
            >
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={() => (document.querySelector('.slick-next') as HTMLElement)?.click()}
              className="mx-1 p-2 rounded-full bg-white shadow-md hover:bg-gray-50 hover:shadow-lg transition-all duration-300 transform hover:scale-110"
              aria-label="Next slide"
            >
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
} 