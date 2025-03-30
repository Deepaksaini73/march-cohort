import pandas as pd
import re
import requests
from datetime import datetime, timedelta
import random
import json
import os

# Load the dataset
df = pd.read_csv(os.path.join(os.path.dirname(__file__), 'travel_dataset.csv'))

# Define hotel price brackets based on rating
def fetch_weather_forecast(city, date):
    """Fetch weather forecast for a given city and date (up to 5 days) using the free forecast API."""
    api_key = "ac35a954227d238abfc011ab55e54d29"  # Replace with your OpenWeatherMap API key

    url = f"https://api.openweathermap.org/data/2.5/forecast?q={city}&appid={api_key}&units=metric"
    response = requests.get(url)
    
    weather_data = []

    if response.status_code == 200:
        forecast_data = response.json()

        print(f"\nWeather forecast for {city} on {date}:")
        found_forecast = False

        for forecast in forecast_data['list']:
            forecast_date = datetime.fromtimestamp(forecast['dt']).strftime("%Y-%m-%d %H:%M:%S")
            if forecast_date.startswith(date):
                temp = forecast['main']['temp']
                description = forecast['weather'][0]['description']
                humidity = forecast['main']['humidity']
                print(f"{forecast_date} - Temperature: {temp}°C, Description: {description.capitalize()}, Humidity: {humidity}%")
                found_forecast = True
                
                # Add to weather_data for API return
                weather_data.append({
                    "datetime": forecast_date,
                    "temperature": temp,
                    "description": description.capitalize(),
                    "humidity": humidity
                })

        if not found_forecast:
            print(f"No forecast available for {date}.")
    else:
        print(f"Failed to fetch forecast data. Error: {response.json()}")
    
    return weather_data

def fetch_hotels_from_api(lat, lon, checkin_date, checkout_date, radius=5, adults=2):
    """Fetch real-time hotel data near the specified coordinates using Booking.com API."""
    url = "https://booking-com.p.rapidapi.com/v1/hotels/search-by-coordinates"
    headers = {
        "X-RapidAPI-Key": "4749807104msh2c14424ddf82848p15f537jsn15995971e8db",  # Replace with your API key
        "X-RapidAPI-Host": "booking-com.p.rapidapi.com",
    }
    params = {
        "latitude": lat,
        "longitude": lon,
        "checkin_date": checkin_date,
        "checkout_date": checkout_date,
        "adults_number": adults,
        "locale": "en-us",
        "filter_by_currency": "INR",
        "order_by": "distance",
        "room_number": 1,
        "units": "metric",
    }

    response = requests.get(url, headers=headers, params=params)
    if response.status_code == 200:
        hotels = response.json().get("result", [])
        return hotels
    else:
        print(f"Failed to fetch hotels. Status Code: {response.status_code}")
        return []

def fetch_restaurants_from_api(lat, lon, radius=1500):
    """Fetch restaurant data using Google Places API."""
    # You'll need to get an API key from Google Cloud Platform
    # 1. Create a Google Cloud account: https://cloud.google.com/
    # 2. Enable the Places API
    # 3. Create an API key with restrictions for security

    api_key = "AIzaSyB4Pk-oT_sJ7u2XmcDmSeFcTLM08Ukkpv0"  # Replace with your Google API key
    url = f"https://maps.googleapis.com/maps/api/place/nearbysearch/json"

    params = {
        "location": f"{lat},{lon}",
        "radius": radius,
        "type": "restaurant",
        "key": api_key
    }

    try:
        response = requests.get(url, params=params)
        print(response.json())
        if response.status_code == 200:
            data = response.json()
            restaurants = data.get("results", [])
            return restaurants
        else:
            print(f"Failed to fetch restaurants. Status Code: {response.status_code}")
            return []
    except Exception as e:
        print(f"Error in API request: {str(e)}")
        return []

def process_and_display_restaurants_from_api(attraction_name, lat, lon):
    """Fetch restaurants from the API and display top rated options."""
    print(f"\nRestaurants near {attraction_name}:")
    
    restaurant_data = []
    restaurants = fetch_restaurants_from_api(lat, lon)

    if restaurants:
        valid_restaurants = []
        for restaurant in restaurants:
            name = restaurant.get("name", "Unknown Restaurant")

            # Google Places returns types for categorization
            types = restaurant.get("types", [])
            cuisine = "Restaurant"
            if "restaurant" in types:
                # Extract other meaningful types for cuisine info
                cuisine_types = [t.replace("_", " ").title() for t in types
                              if t not in ["restaurant", "food", "point_of_interest", "establishment"]]
                if cuisine_types:
                    cuisine = ", ".join(cuisine_types)

            # Google uses a numeric rating system out of 5
            rating = restaurant.get("rating", "No rating")

            # Price level is 0 (Free) to 4 (Very Expensive)
            price_level = restaurant.get("price_level", -1)

            if price_level == 0 or price_level == 1:
                price_description = "Budget-friendly"
            elif price_level == 2:
                price_description = "Mid-range"
            elif price_level >= 3:
                price_description = "Fine dining"
            else:
                price_description = "Unknown price range"

            valid_restaurants.append((name, cuisine, rating, price_description))

        # Sort by rating (highest first)
        sorted_restaurants = sorted(valid_restaurants,
                                   key=lambda x: float(x[2]) if isinstance(x[2], (int, float)) or
                                   (isinstance(x[2], str) and x[2] != "No rating" and x[2].replace('.', '', 1).isdigit())
                                   else 0,
                                   reverse=True)

        if sorted_restaurants:
            for restaurant in sorted_restaurants[:5]:  # Show top 5
                print(f"Restaurant: {restaurant[0]} | Cuisine: {restaurant[1]} | Rating: {restaurant[2]} | Price: {restaurant[3]}")
                restaurant_data.append({
                    "name": restaurant[0],
                    "cuisine": restaurant[1],
                    "rating": restaurant[2],
                    "price": restaurant[3]
                })
        else:
            print("No restaurants found in this area.")
    else:
        print("No restaurants found from the API.")
    
    return restaurant_data

def process_and_display_hotels_from_api(attraction_name, lat, lon, entrance_fee, num_days, budget):
    """Fetch hotels from the API and display based on user budget and preferences."""
    print(f"\nHotels near {attraction_name}:")
    
    hotel_data = []
    hotels = fetch_hotels_from_api(lat, lon, checkin_date="2025-04-05", checkout_date="2025-04-10")

    if hotels:
        hotel_costs = []
        skipped_count = 0
        for hotel in hotels:
            try:
                hotel_name = hotel['hotel_name']

                # Handle different price structures that might exist in the API response
                if 'price_breakdown' in hotel and 'gross_price' in hotel['price_breakdown']:
                    price_per_night = hotel['price_breakdown']['gross_price']
                elif 'min_total_price' in hotel:
                    price_per_night = hotel['min_total_price']
                else:
                    # Skip this hotel if no price info found
                    skipped_count += 1
                    continue

                # Ensure rating is always a number (0.0 if missing)
                rating = float(hotel.get('review_score', 0) or 0)

                # Ensure price is numeric before calculation
                try:
                    price_per_night_num = float(price_per_night)
                    total_cost = entrance_fee + (num_days * price_per_night_num)  # Use float instead of int
                    hotel_costs.append((hotel_name, rating, price_per_night, total_cost))
                except (ValueError, TypeError):
                    skipped_count += 1
                    continue

            except (KeyError, ValueError):
                skipped_count += 1
                continue

        # Report total skipped hotels instead of individual messages
        if skipped_count > 0:
            print(f"Skipped {skipped_count} hotels due to missing or invalid price information.")

        # Filter hotels within budget and sort by rating
        affordable_hotels = [hotel for hotel in hotel_costs if hotel[3] <= budget]

        # Filter out any possible None values before sorting
        affordable_hotels = [hotel for hotel in affordable_hotels if hotel[1] is not None]

        # Now sort the filtered list
        affordable_hotels = sorted(affordable_hotels, key=lambda x: x[1], reverse=True)  # Sort by rating

        if affordable_hotels:
            for hotel in affordable_hotels:
                print(f"Hotel: {hotel[0]} | Rating: {hotel[1]} | Price per Night: {hotel[2]} INR | "
                      f"Total Cost: {hotel[3]} INR")
                hotel_data.append({
                    "name": hotel[0],
                    "rating": hotel[1],
                    "pricePerNight": float(hotel[2]),
                    "totalCost": hotel[3]
                })
        else:
            print("No hotels found within your budget.")
    else:
        print("No hotels found from the API.")
    
    return hotel_data

def extract_hotels_restaurants_attractions(city, place_type, budget, num_days):
    """Extract attractions, calculate hotel costs, and display nearby restaurants and attractions based on input city, type, budget, and stay duration."""
    city_data = df[(df['City'].str.contains(city, case=False)) & (df['Type'].str.contains(place_type, case=False))]
    
    result = {
        "weather": [],
        "hotels": [],
        "restaurants": []
    }

    if city_data.empty:
        print(f"No attractions of type '{place_type}' found in {city}.")
        return result

    print(f"\nExploring attractions in {city} of type '{place_type}':")
    
    # Get current date for weather forecasts
    current_date = datetime.now()
    date_str = current_date.strftime("%Y-%m-%d")

    # Get weather forecast for the city
    weather_data = fetch_weather_forecast(city, date_str)
    result["weather"] = weather_data

    for _, row in city_data.iterrows():
        attraction_name = row['Name']
        entrance_fee = row['Entrance Fee in INR']
        lat, lon = float(row['Latitude']), float(row['Longitude'])

        print(f"\nAttraction: {attraction_name}")
        print(f"Entrance Fee: {entrance_fee} INR")

        # Fetch and display real-time hotels near the attraction using API
        hotels = process_and_display_hotels_from_api(attraction_name, lat, lon, entrance_fee, num_days, budget)
        result["hotels"].extend(hotels)

        # Fetch and display real-time restaurants near the attraction
        restaurants = process_and_display_restaurants_from_api(attraction_name, lat, lon)
        result["restaurants"].extend(restaurants)
        
        # Only process the first attraction for quicker results
        break

    return result

def ai_trip_generator(city, attraction_type, budget, num_days):
    """Generate an AI-based trip itinerary for the specified city, type, budget, and number of days."""
    print(f"\nAI Trip Plan for {city} - {num_days} day(s)")
    
    result = {
        "weather": [],
        "hotels": [],
        "restaurants": [],
        "attractions": []
    }

    # Filter attractions based on city and type
    city_data = df[(df['City'].str.contains(city, case=False)) & (df['Type'].str.contains(attraction_type, case=False))]

    if city_data.empty:
        print(f"No attractions of type '{attraction_type}' found in {city}.")
        return result

    # Rank attractions based on rating, entrance fee, and popularity
    ranked_attractions = city_data.sort_values(by=['Number of google review in lakhs', 'Entrance Fee in INR'], ascending=[False, True])
    selected_attractions = ranked_attractions.head(num_days * 2)  # Select top attractions based on days

    daily_plan = {}
    current_date = datetime.now()

    # Distribute attractions into daily slots and consider travel distance & time at each attraction
    for day in range(1, num_days + 1):
        print(f"\nDay {day} Plan:")
        current_attractions = selected_attractions.iloc[(day - 1) * 2 : day * 2]

        # Morning and afternoon attractions
        for i, row in current_attractions.iterrows():
            attraction_name = row['Name']
            lat, lon = float(row['Latitude']), float(row['Longitude'])
            entrance_fee = row['Entrance Fee in INR']
            rating = row['Number of google review in lakhs']

            print(f"\nAttraction: {attraction_name} | Rating: {rating}")
            print(f"Entrance Fee: {entrance_fee} INR")
            
            result["attractions"].append({
                "name": attraction_name,
                "rating": rating,
                "entranceFee": entrance_fee,
                "day": day
            })

            # Fetch weather forecast for the day and time
            date_str = (current_date + timedelta(days=day)).strftime("%Y-%m-%d")
            weather = fetch_weather_forecast(city, date_str)
            result["weather"].extend(weather)

            # Fetch and display real-time hotel recommendations near the attraction
            hotels = process_and_display_hotels_from_api(attraction_name, lat, lon, entrance_fee, num_days, budget)
            result["hotels"].extend(hotels)

            # Fetch and display nearby restaurants
            restaurants = process_and_display_restaurants_from_api(attraction_name, lat, lon)
            result["restaurants"].extend(restaurants)

    print("\nEnjoy your trip! Your AI-based itinerary is ready!")
    return result

# Function to process search form data from the frontend
def process_search_form_data(city, location, days, guests=2, budget="₹15,000", attraction_type="Monument"):
    """Process search form data from frontend and return results"""
    print(f"Processing search form data: City={city}, Days={days}, Guests={guests}, Budget={budget}")
    
    # Parse budget string to get maximum budget
    budget_max = 15000  # Default
    if budget:
        # Extract the max value from range like "₹7,500-₹15,000"
        budget_parts = budget.split('-')
        if len(budget_parts) > 1:
            # Get the second part (max value) and remove currency symbol and commas
            budget_str = budget_parts[1].replace('₹', '').replace(',', '')
            budget_max = float(budget_str)
        else:
            # Handle single value like "₹37,500+"
            budget_str = budget_parts[0].replace('₹', '').replace(',', '').replace('+', '')
            budget_max = float(budget_str)
    
    try:
        # Get results using the existing functions
        result = extract_hotels_restaurants_attractions(city, attraction_type, budget_max, days)
        
        # If we don't have enough hotels, try to get more with the trip generator
        if len(result["hotels"]) < 3:
            try:
                trip_result = ai_trip_generator(city, attraction_type, budget_max, days)
                
                # Merge unique hotels and weather data
                existing_hotel_names = [h["name"] for h in result["hotels"]]
                for hotel in trip_result["hotels"]:
                    if hotel["name"] not in existing_hotel_names:
                        result["hotels"].append(hotel)
                        existing_hotel_names.append(hotel["name"])
                
                # Add unique weather entries
                existing_datetimes = [w["datetime"] for w in result["weather"]]
                for weather in trip_result["weather"]:
                    if weather["datetime"] not in existing_datetimes:
                        result["weather"].append(weather)
                        existing_datetimes.append(weather["datetime"])
            except Exception as e:
                print(f"Error in trip generator: {str(e)}. Continuing with existing data.")
    except Exception as e:
        print(f"Error getting data: {str(e)}. Falling back to sample data.")
        # Provide sample data if all else fails
        result = {
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
            ]
        }
    
    # Ensure weather and hotels exist
    if "weather" not in result or not result["weather"]:
        result["weather"] = [
            {
                "datetime": f"{datetime.now().strftime('%Y-%m-%d')} 12:00:00",
                "temperature": 28.5,
                "description": "Partly cloudy",
                "humidity": 65
            }
        ]
    
    if "hotels" not in result or not result["hotels"]:
        result["hotels"] = [
            {
                "name": f"Sample Hotel in {city}",
                "rating": 4.2,
                "pricePerNight": 5000.0,
                "totalCost": 5000.0 * days
            }
        ]
    
    if "restaurants" not in result or not result["restaurants"]:
        result["restaurants"] = [
            {
                "name": f"Local Cuisine {city}",
                "cuisine": "Local",
                "rating": 4.5,
                "price": "Mid-range"
            }
        ]
    
    return result

# If the script is run directly (not imported), display interactive prompt
if __name__ == "__main__":
    # For testing via command line
    city_input = input("Enter the city to Explore: ")
    attraction_type_input = input("Enter the type of attraction (e.g., Monument, Fort, Museum): ")
    budget_input = float(input("Enter your total budget in INR: "))
    num_days_input = int(input("Enter the number of days you plan to stay: "))
    
    # Call the function with user inputs
    result = process_search_form_data(
        city=city_input, 
        location=f"{city_input}, India", 
        days=num_days_input, 
        budget=f"₹{budget_input}",
        attraction_type=attraction_type_input
    )
    
    # Print the results
    print("\nResults summary:")
    print(f"- Weather forecasts: {len(result['weather'])} entries")
    print(f"- Hotels found: {len(result['hotels'])}")
    print(f"- Restaurants found: {len(result['restaurants'])}") 
