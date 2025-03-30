from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import sys
import os
import traceback
from datetime import datetime, timedelta
import logging
import json

# Add parent directory to path to import main.py
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Import all necessary functions from main.py
from main import (
    process_search_form_data,
    extract_hotels_restaurants_attractions,
    ai_trip_generator,
    fetch_weather_forecast,
    fetch_hotels_from_api,
    fetch_restaurants_from_api
)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

# Configure CORS - Allow requests from frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],  # Frontend URLs
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TripRequest(BaseModel):
    city: str
    location: str
    days: int
    guests: int = 2
    budget: str
    transport: Optional[str] = None
    purpose: Optional[str] = None
    attraction_type: str = "Monument"
    
class TripResponse(BaseModel):
    weather: List[dict]
    hotels: List[dict]
    restaurants: Optional[List[dict]] = None
    attractions: Optional[List[dict]] = None

@app.get("/")
async def health_check():
    """Health check endpoint to verify the API is running"""
    return {"status": "ok", "message": "API is running"}

@app.post("/api/trip")
async def generate_trip(request: TripRequest):
    """
    Generate a trip plan based on user input.
    This endpoint processes the search form data and returns weather, hotels, restaurants, and attractions.
    """
    logger.info(f"Received trip request for {request.city} for {request.days} days with budget {request.budget}")
    
    try:
        # Process the search form data using the main.py function
        result = process_search_form_data(
            city=request.city,
            location=request.location,
            days=request.days,
            guests=request.guests,
            budget=request.budget,
            attraction_type=request.attraction_type
        )
        
        logger.info(f"Generated trip plan with {len(result.get('weather', []))} weather entries, "
                   f"{len(result.get('hotels', []))} hotels, and "
                   f"{len(result.get('restaurants', []))} restaurants")
        
        # Ensure the result has all required fields
        if not result.get('weather'):
            logger.warning("No weather data in result, adding default")
            result['weather'] = [{
                'datetime': datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                'temperature': 28,
                'description': 'Sunny',
                'humidity': 65
            }]
            
        if not result.get('hotels'):
            logger.warning("No hotel data in result, adding default")
            result['hotels'] = [{
                'name': f'Sample Hotel in {request.city}',
                'rating': 4.0,
                'pricePerNight': 5000.0,
                'totalCost': 5000.0 * request.days
            }]
            
        if not result.get('restaurants'):
            logger.warning("No restaurant data in result, adding default")
            result['restaurants'] = [{
                'name': f'Local Restaurant in {request.city}',
                'cuisine': 'Local',
                'rating': 4.0,
                'price': 'Mid-range'
            }]
            
        return result
        
    except Exception as e:
        logger.error(f"Error processing trip request: {str(e)}")
        logger.exception("Full error traceback:")
        raise HTTPException(
            status_code=500,
            detail=f"Error generating trip plan: {str(e)}"
        )

# Direct endpoints that access specific functions from main.py

@app.get("/api/weather/{city}")
async def get_weather(city: str):
    """Get weather data for a specific city"""
    try:
        date_str = datetime.now().strftime("%Y-%m-%d")
        weather_data = fetch_weather_forecast(city, date_str)
        return {"weather": weather_data}
    except Exception as e:
        error_details = traceback.format_exc()
        print(f"Error fetching weather for {city}: {str(e)}\n{error_details}")
        raise HTTPException(status_code=500, detail=f"Error fetching weather: {str(e)}")

@app.get("/api/hotels")
async def get_hotels(city: str, days: int = 3, budget: float = 15000):
    """Get hotel recommendations for a city"""
    try:
        attraction_type = "Monument"  # Default
        result = extract_hotels_restaurants_attractions(city, attraction_type, budget, days)
        return {"hotels": result.get("hotels", [])}
    except Exception as e:
        error_details = traceback.format_exc()
        print(f"Error fetching hotels for {city}: {str(e)}\n{error_details}")
        raise HTTPException(status_code=500, detail=f"Error fetching hotels: {str(e)}")

@app.get("/api/restaurants/{city}")
async def get_restaurants(city: str):
    """Get restaurant recommendations for a city"""
    try:
        attraction_type = "Monument"  # Default
        days = 3  # Default
        budget = 15000  # Default
        result = extract_hotels_restaurants_attractions(city, attraction_type, budget, days)
        return {"restaurants": result.get("restaurants", [])}
    except Exception as e:
        error_details = traceback.format_exc()
        print(f"Error fetching restaurants for {city}: {str(e)}\n{error_details}")
        raise HTTPException(status_code=500, detail=f"Error fetching restaurants: {str(e)}")

@app.get("/api/sample-data", response_model=TripResponse)
async def get_sample_data():
    """Return sample data for testing frontend"""
    city = "Sample City"
    days = 3
    
    return {
        "weather": [
            {
                "datetime": f"{datetime.now().strftime('%Y-%m-%d')} 12:00:00",
                "temperature": 28.5,
                "description": "Partly cloudy",
                "humidity": 65
            },
            {
                "datetime": f"{(datetime.now() + timedelta(days=1)).strftime('%Y-%m-%d')} 12:00:00",
                "temperature": 29.3,
                "description": "Sunny",
                "humidity": 60
            }
        ],
        "hotels": [
            {
                "name": f"Sample Hotel in {city}",
                "rating": 4.2,
                "pricePerNight": 5000.0,
                "totalCost": 5000.0 * days
            },
            {
                "name": f"Budget Stay {city}",
                "rating": 3.8,
                "pricePerNight": 3000.0,
                "totalCost": 3000.0 * days
            }
        ],
        "restaurants": [
            {
                "name": f"Local Cuisine {city}",
                "cuisine": "Local",
                "rating": 4.5,
                "price": "Mid-range"
            },
            {
                "name": f"Fine Dining {city}",
                "cuisine": "International",
                "rating": 4.7,
                "price": "Fine dining"
            }
        ],
        "attractions": [
            {
                "name": "Sample Monument",
                "rating": 4.5,
                "entranceFee": 500,
                "day": 1
            },
            {
                "name": "Sample Museum",
                "rating": 4.3,
                "entranceFee": 300,
                "day": 2
            }
        ]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 