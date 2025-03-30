'use client';

import React, { useState } from 'react';
import SearchResults from '../components/search/SearchResults';
import { Button } from '../components/ui/button';

export default function TestResultsPage() {
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const mockData = {
    weather: [
      {
        datetime: "2025-04-01 02:30:00",
        temperature: 23.79,
        description: "Clear sky",
        humidity: 9
      },
      {
        datetime: "2025-04-01 05:30:00",
        temperature: 22.55,
        description: "Clear sky",
        humidity: 9
      },
      {
        datetime: "2025-04-01 08:30:00",
        temperature: 28.51,
        description: "Clear sky",
        humidity: 6
      },
      {
        datetime: "2025-04-01 11:30:00",
        temperature: 36.85,
        description: "Clear sky",
        humidity: 4
      }
    ],
    hotels: [
      {
        name: "Rk Guest House Paying",
        rating: 8.8,
        pricePerNight: 7000,
        totalCost: 21050
      },
      {
        name: "Hotel Wonderstar Affordable Stay Near Tajmahal",
        rating: 7.8,
        pricePerNight: 4536,
        totalCost: 13658
      },
      {
        name: "Hotel Blossom Rooms - Fully AC",
        rating: 7.7,
        pricePerNight: 3360,
        totalCost: 10130
      }
    ]
  };
  
  const handleTestLoading = () => {
    setShowResults(true);
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Test Search Results Component</h1>
      
      <div className="space-y-4 mb-8">
        <Button 
          onClick={() => setShowResults(!showResults)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mr-4"
        >
          {showResults ? 'Hide Results' : 'Show Results'}
        </Button>
        
        <Button
          onClick={handleTestLoading}
          className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded"
        >
          Test Loading State
        </Button>
      </div>
      
      {showResults && (
        <>
          <div className="mb-8 p-4 bg-gray-100 rounded">
            <h2 className="text-lg font-semibold mb-2">Component Status:</h2>
            <div>Loading: {isLoading ? 'true' : 'false'}</div>
            <div>Weather Data: {mockData.weather.length} items</div>  
            <div>Hotel Data: {mockData.hotels.length} items</div>
          </div>
          
          <SearchResults
            weatherData={mockData.weather}
            hotels={mockData.hotels}
            isLoading={isLoading}
          />
        </>
      )}
    </div>
  );
} 