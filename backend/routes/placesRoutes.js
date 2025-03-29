const express = require('express');
const router = express.Router();
const placesController = require('../controllers/placesController');
const rateLimit = require('express-rate-limit');

// Rate limiter for API requests
const placesLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes'
});

// Apply rate limiter to all routes
router.use(placesLimiter);

// Places search endpoints
router.get('/search', placesController.searchPlaces);
router.get('/details', placesController.getPlaceDetails);
router.get('/photo', placesController.getPlacePhoto);
router.get('/autocomplete', placesController.getAutocomplete);
router.get('/nearby', placesController.getNearbyPlaces);

// New direct location image endpoint
router.get('/location-image', placesController.getLocationImageByName);

// New direct location endpoints
router.get('/location-rating', placesController.getLocationRating);
router.get('/location-address', placesController.getLocationAddress);

// Additional simplified endpoints
router.get('/nearby-by-name', placesController.getNearbyPlacesByName);
router.get('/smart-autocomplete', placesController.getAutocompleteWithLocation);
router.get('/attractions', placesController.getDirectPopularDestinations);
router.get('/tours', placesController.getDirectToursByCategory);

// Trip planner comprehensive endpoint
router.get('/trip-planner', placesController.getTripPlannerData);

// Weather endpoints
router.get('/weather', placesController.getLocationWeather);
router.get('/forecast', placesController.getLocationForecast);

// Travel information
router.get('/travel-tips', placesController.getTravelTips);

// Custom endpoints for tour-specific functionality
router.get('/popular-destinations', placesController.getPopularDestinations);
router.get('/tours-by-category', placesController.searchToursByCategory);

module.exports = router;
