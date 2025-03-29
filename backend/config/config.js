require('dotenv').config();

module.exports = {
  port: process.env.PORT || 5000,
  googlePlacesApiKey: process.env.GOOGLE_PLACES_API_KEY,
  googlePlacesBaseUrl: process.env.GOOGLE_PLACES_BASE_URL || 'https://maps.googleapis.com/maps/api/place',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  openWeatherApiKey: process.env.OPENWEATHER_API_KEY
}; 