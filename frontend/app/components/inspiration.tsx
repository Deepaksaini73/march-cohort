"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Heart, Calendar, Clock, MessageSquare, ArrowLeft, ArrowRight } from 'lucide-react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export interface TravelArticle {
  id: number;
  category: string;
  image: string;
  date: string;
  readTime: number;
  comments: number;
  title: string;
  author: {
    name: string;
    avatar?: string;
  };
}

interface TravelInspirationProps {
  title?: string;
  subtitle?: string;
  articles?: TravelArticle[];
  slidesToShow?: {
    desktop: number;
    tablet: number;
    mobile: number;
  };
}

const defaultArticles: TravelArticle[] = [
  {
    id: 1,
    category: "Cultural",
    image: "/images/boating.jpg",
    date: "18 Sep 2024",
    readTime: 6,
    comments: 38,
    title: "Ultimate Travel Planning Guide: 10 Tips for a Seamless Journey",
    author: {
      name: "Jimmy Dave"
    }
  },
  {
    id: 2,
    category: "Travel",
    image: "/images/santorini.jpg",
    date: "18 Sep 2024",
    readTime: 6,
    comments: 38,
    title: "Top 10 Travel Hacks for Budget-Conscious Adventurers",
    author: {
      name: "Jimmy Dave"
    }
  },
  {
    id: 3,
    category: "Discovery",
    image: "/images/maldives.jpg",
    date: "18 Sep 2024",
    readTime: 6,
    comments: 38,
    title: "Discovering Hidden Gems: 10 Off-the-Beaten-Path Travel Tips",
    author: {
      name: "Jimmy Dave"
    }
  },
  {
    id: 4,
    category: "Cultural",
    image: "/images/ocean-wave.jpg",
    date: "18 Sep 2024",
    readTime: 6,
    comments: 38,
    title: "Ultimate Travel Planning Guide: 10 Tips for a Seamless Journey",
    author: {
      name: "Jimmy Dave"
    }
  },
  {
    id: 5,
    category: "Adventure",
    image: "/images/boating.jpg",
    date: "19 Sep 2024",
    readTime: 7,
    comments: 42,
    title: "Backpacking 101: Essential Tips for First-Time Adventurers",
    author: {
      name: "Sarah Johnson"
    }
  },
  {
    id: 6,
    category: "Luxury",
    image: "/images/santorini.jpg",
    date: "20 Sep 2024",
    readTime: 5,
    comments: 31,
    title: "Five-Star Experiences on a Three-Star Budget: Luxury Travel Hacks",
    author: {
      name: "Michael Chen"
    }
  },
  {
    id: 7,
    category: "Food",
    image: "/images/maldives.jpg",
    date: "21 Sep 2024",
    readTime: 8,
    comments: 56,
    title: "Culinary Adventures: Exploring the World Through Street Food",
    author: {
      name: "Elena Rodriguez"
    }
  },
  {
    id: 8,
    category: "Photography",
    image: "/images/ocean-wave.jpg",
    date: "22 Sep 2024",
    readTime: 5,
    comments: 39,
    title: "Capturing Moments: A Beginner's Guide to Travel Photography",
    author: {
      name: "David Lee"
    }
  }
];

const TravelInspirationCard = ({ article }: { article: TravelArticle }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 px-3">
      <div className="relative">
        <div className="aspect-w-16 aspect-h-10 relative h-56 w-full">
          <Image 
            src={article.image} 
            alt={article.title}
            fill
            className="object-cover"
          />
        </div>
        <button className="absolute top-4 right-4 p-1.5 rounded-full bg-white/80 hover:bg-white transition-all">
          <Heart className="h-5 w-5 text-gray-600" />
        </button>
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 rounded-full text-sm font-medium bg-white text-gray-800 shadow-sm">
            {article.category}
          </span>
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex items-center justify-between text-gray-500 text-sm mb-3">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{article.date}</span>
          </div>
          <div className="flex items-center mx-3">
            <Clock className="h-4 w-4 mr-1" />
            <span>{article.readTime} mins</span>
          </div>
          <div className="flex items-center">
            <MessageSquare className="h-4 w-4 mr-1" />
            <span>{article.comments} comments</span>
          </div>
        </div>
        
        <h3 className="font-bold text-lg mb-4 line-clamp-2 hover:text-blue-600 transition-colors">
          {article.title}
        </h3>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {article.author.avatar ? (
              <Image 
                src={article.author.avatar} 
                alt={article.author.name}
                width={36}
                height={36}
                className="rounded-full mr-2"
              />
            ) : (
              <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-2 font-medium">
                {article.author.name.split(' ').map(n => n[0]).join('')}
              </div>
            )}
            <span className="text-gray-700 font-medium text-sm">{article.author.name}</span>
          </div>
          <button className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1.5 rounded-full transition-colors font-medium">
            Keep Reading
          </button>
        </div>
      </div>
    </div>
  );
};

// Custom arrow components for React Slick
const PrevArrow = (props: any) => {
  const { onClick } = props;
  return (
    <button 
      onClick={onClick}
      className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 p-3 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors"
      aria-label="Previous"
    >
      <ArrowLeft className="h-5 w-5" />
    </button>
  );
};

const NextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <button 
      onClick={onClick}
      className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 p-3 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors"
      aria-label="Next"
    >
      <ArrowRight className="h-5 w-5" />
    </button>
  );
};

const TravelInspiration = ({ 
  title = "Get inspiration for your next trip",
  subtitle = "Favorite destinations based on customer reviews",
  articles = defaultArticles,
  slidesToShow = { desktop: 4, tablet: 2, mobile: 1 }
}: TravelInspirationProps) => {
  
  // Settings for React Slick
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: slidesToShow.desktop,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    customPaging: () => (
      <div className="w-3 h-3 mx-1 bg-gray-300 rounded-full transition-all hover:bg-amber-500"></div>
    ),
    dotsClass: "slick-dots custom-dots",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: slidesToShow.tablet,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: slidesToShow.mobile,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-amber-50 to-amber-100/50 relative overflow-hidden">
      {/* Background decoration elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-200 opacity-20 rounded-full transform translate-x-32 -translate-y-32"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-200 opacity-20 rounded-full transform -translate-x-40 translate-y-40"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
          <div>
            <h2 className="text-4xl font-bold mb-2">{title}</h2>
            <p className="text-gray-600">{subtitle}</p>
          </div>
        </div>
        
        <div className="slider-container px-8">
          <Slider {...settings}>
            {articles.map(article => (
              <TravelInspirationCard key={article.id} article={article} />
            ))}
          </Slider>
        </div>
        
        <div className="mt-16 text-center">
          <a href="/blog" className="inline-flex items-center px-6 py-3 bg-black text-white font-medium rounded-full hover:bg-gray-800 transition-colors hover:-translate-y-1 transition-transform duration-300 shadow-md">
            View More
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>

      {/* Custom CSS for React Slick */}
      <style jsx global>{`
        .custom-dots {
          position: relative;
          bottom: 0;
          display: flex !important;
          justify-content: center;
          margin: 25px 0 0;
          padding: 0;
        }
        .custom-dots li {
          margin: 0 4px;
        }
        .custom-dots li.slick-active div {
          background-color: #f59e0b;
          width: 24px;
        }
        .slick-list {
          margin: 0 -12px;
        }
        .slick-slide > div {
          padding: 0 12px;
        }
      `}</style>
    </section>
  );
};

export default TravelInspiration; 