from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import sys
import os
import traceback
from datetime import datetime, timedelta

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

app = FastAPI()

# Configure CORS to allow requests from frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For production, set to your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TripRequest(BaseModel):
    city: str
    location: str
    days: int
    guests: Optional[int] = None
    budget: Optional[str] = None
    transport: Optional[str] = None
    purpose: Optional[str] = None
    attraction_type: Optional[str] = "Monument"
    
class TripResponse(BaseModel):
    weather: List[dict]
    hotels: List[dict]
    restaurants: Optional[List[dict]] = None
    attractions: Optional[List[dict]] = None

@app.get("/")
def read_root():
    return {"message": "Travel Planning API is running"}

@app.post("/api/trip", response_model=TripResponse)
async def generate_trip(request: TripRequest):
    try:
        # Extract city from location (assumes format 'City, Country')
        city = request.location.split(',')[0].strip()
        
        # Log the request
        print(f"Processing trip request: {city}, {request.days} days, Budget: {request.budget}")
        
        # Directly call the process_search_form_data function from main.py
        result = process_search_form_data(
            city=city,
            location=request.location,
            days=request.days,
            guests=request.guests or 2,
            budget=request.budget or "₹15,000",
            attraction_type=request.attraction_type or "Monument"
        )
        
        # Verify the result has required fields
        if "weather" not in result or "hotels" not in result:
            raise ValueError("Result missing required fields (weather or hotels)")
        
        # Return the response
        return result
        
    except Exception as e:
        # Get the full stack trace
        error_details = traceback.format_exc()
        print(f"Error in /api/trip: {str(e)}\n{error_details}")
        
        # Return a user-friendly error
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