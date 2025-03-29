"use client";

import TravelInspiration, { TravelArticle } from '../inspiration';

const CustomInspirationExample = () => {
  // Example of custom travel articles data
  const customArticles: TravelArticle[] = [
    {
      id: 101,
      category: "Mountain",
      image: "/images/boating.jpg", // Replace with actual mountain image
      date: "25 Oct 2024",
      readTime: 8,
      comments: 52,
      title: "Top 5 Mountain Destinations for Adventure Seekers",
      author: {
        name: "Alex Rivera"
      }
    },
    {
      id: 102,
      category: "Beach",
      image: "/images/santorini.jpg", // Replace with actual beach image
      date: "27 Oct 2024",
      readTime: 5,
      comments: 38,
      title: "Ultimate Beach Getaways: Hidden Paradises Around the World",
      author: {
        name: "Maya Johnson"
      }
    },
    {
      id: 103,
      category: "City",
      image: "/images/maldives.jpg", // Replace with actual city image
      date: "29 Oct 2024",
      readTime: 7,
      comments: 45,
      title: "Urban Exploration: Architectural Wonders in Modern Cities",
      author: {
        name: "Tomas Schmidt"
      }
    }
  ];

  return (
    <div>
      {/* Example using default data */}
      <div className="mb-20">
        <h2 className="text-2xl font-bold mb-4 px-4">Default TravelInspiration Component:</h2>
        <TravelInspiration />
      </div>
      
      {/* Example with custom data */}
      <div>
        <h2 className="text-2xl font-bold mb-4 px-4">Custom TravelInspiration Component:</h2>
        <TravelInspiration 
          title="Discover Trending Destinations" 
          subtitle="Handpicked selections from our travel experts"
          articles={customArticles}
          slidesToShow={{ desktop: 3, tablet: 2, mobile: 1 }}
        />
      </div>
    </div>
  );
};

export default CustomInspirationExample; 