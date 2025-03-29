const express = require('express');
const router = express.Router();
const axios = require('axios');

// Load Google Places API Key from environment variables
const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;
const GOOGLE_PLACES_BASE_URL = 'https://maps.googleapis.com/maps/api/place';

// Check if API key is available
if (!GOOGLE_PLACES_API_KEY) {
  console.error('ERROR: GOOGLE_PLACES_API_KEY is not set in environment variables!');
}

// Middleware to validate API key
const validateApiKey = (req, res, next) => {
  if (!GOOGLE_PLACES_API_KEY) {
    return res.status(500).json({
      error: true,
      message: 'Google Places API key is not configured on the server'
    });
  }
  next();
};

// Apply the API key validation middleware to all routes
router.use(validateApiKey);

// Search endpoint
router.get('/search', async (req, res, next) => {
  try {
    const { query, type, location, radius = 50000 } = req.query;
    
    if (!query) {
      return res.status(400).json({
        error: true,
        message: 'Query parameter is required'
      });
    }
    
    let apiUrl = `${GOOGLE_PLACES_BASE_URL}/textsearch/json?query=${encodeURIComponent(query)}`;
    
    if (type) {
      apiUrl += `&type=${type}`;
    }
    
    if (location) {
      apiUrl += `&location=${location}&radius=${radius}`;
    }
    
    // Add the API key
    apiUrl += `&key=${GOOGLE_PLACES_API_KEY}`;
    
    console.log(`Making request to Google Places API: ${apiUrl.replace(GOOGLE_PLACES_API_KEY, 'API_KEY_HIDDEN')}`);
    
    const response = await axios.get(apiUrl);
    res.json(response.data);
  } catch (error) {
    console.error('Error in search endpoint:', error.message);
    next(error);
  }
});

// Autocomplete endpoint
router.get('/autocomplete', async (req, res, next) => {
  try {
    const { input, types = 'establishment' } = req.query;
    
    if (!input) {
      return res.status(400).json({
        error: true,
        message: 'Input parameter is required'
      });
    }
    
    const apiUrl = `${GOOGLE_PLACES_BASE_URL}/autocomplete/json?input=${encodeURIComponent(input)}&types=${types}&key=${GOOGLE_PLACES_API_KEY}`;
    
    console.log(`Making request to Google Places API: ${apiUrl.replace(GOOGLE_PLACES_API_KEY, 'API_KEY_HIDDEN')}`);
    
    const response = await axios.get(apiUrl);
    res.json(response.data);
  } catch (error) {
    console.error('Error in autocomplete endpoint:', error.message);
    next(error);
  }
});

// Place details endpoint
router.get('/details', async (req, res, next) => {
  try {
    const { placeId } = req.query;
    
    if (!placeId) {
      return res.status(400).json({
        error: true,
        message: 'placeId parameter is required'
      });
    }
    
    const apiUrl = `${GOOGLE_PLACES_BASE_URL}/details/json?place_id=${placeId}&fields=name,formatted_address,photos,rating,reviews,types,geometry,formatted_phone_number,website,opening_hours,price_level&key=${GOOGLE_PLACES_API_KEY}`;
    
    console.log(`Making request to Google Places API: ${apiUrl.replace(GOOGLE_PLACES_API_KEY, 'API_KEY_HIDDEN')}`);
    
    const response = await axios.get(apiUrl);
    res.json(response.data);
  } catch (error) {
    console.error('Error in details endpoint:', error.message);
    next(error);
  }
});

// Photo endpoint
router.get('/photos', async (req, res, next) => {
  try {
    const { photoReference, maxWidth = 400 } = req.query;
    
    if (!photoReference) {
      return res.status(400).json({
        error: true,
        message: 'photoReference parameter is required'
      });
    }
    
    const apiUrl = `${GOOGLE_PLACES_BASE_URL}/photo?photoreference=${photoReference}&maxwidth=${maxWidth}&key=${GOOGLE_PLACES_API_KEY}`;
    
    console.log(`Making request to Google Places API: ${apiUrl.replace(GOOGLE_PLACES_API_KEY, 'API_KEY_HIDDEN')}`);
    
    // Request the photo as a stream to avoid loading it into memory
    const response = await axios({
      method: 'get',
      url: apiUrl,
      responseType: 'stream'
    });
    
    // Set the content type header
    res.set('Content-Type', response.headers['content-type']);
    
    // Pipe the response stream to the client
    response.data.pipe(res);
  } catch (error) {
    console.error('Error in photos endpoint:', error.message);
    next(error);
  }
});

// Popular destinations endpoint
router.get('/popular', async (req, res, next) => {
  try {
    // Hard-coded popular destinations query
    const popularDestinations = [
      { query: 'popular tourist attractions in Paris', type: 'tourist_attraction' },
      { query: 'popular tourist attractions in London', type: 'tourist_attraction' },
      { query: 'popular tourist attractions in New York', type: 'tourist_attraction' },
      { query: 'popular tourist attractions in Tokyo', type: 'tourist_attraction' },
      { query: 'popular tourist attractions in Rome', type: 'tourist_attraction' },
      { query: 'popular tourist attractions in Barcelona', type: 'tourist_attraction' }
    ];
    
    // Select a random destination to feature
    const selectedDestination = popularDestinations[Math.floor(Math.random() * popularDestinations.length)];
    
    const apiUrl = `${GOOGLE_PLACES_BASE_URL}/textsearch/json?query=${encodeURIComponent(selectedDestination.query)}&type=${selectedDestination.type}&key=${GOOGLE_PLACES_API_KEY}`;
    
    console.log(`Making request to Google Places API: ${apiUrl.replace(GOOGLE_PLACES_API_KEY, 'API_KEY_HIDDEN')}`);
    
    const response = await axios.get(apiUrl);
    res.json(response.data);
  } catch (error) {
    console.error('Error in popular destinations endpoint:', error.message);
    next(error);
  }
});

// Category search endpoint
router.get('/category', async (req, res, next) => {
  try {
    const { category } = req.query;
    
    if (!category) {
      return res.status(400).json({
        error: true,
        message: 'Category parameter is required'
      });
    }
    
    // Map frontend categories to search queries
    const categoryMappings = {
      'adventure': 'adventure tours and activities',
      'cultural': 'cultural tours and historical sites',
      'beach': 'beach resorts and coastal attractions', 
      'mountain': 'mountain hiking tours and scenic views',
      'food': 'food tours and culinary experiences',
      'wildlife': 'wildlife safaris and nature tours'
    };
    
    const searchQuery = categoryMappings[category.toLowerCase()] || `${category} tours`;
    
    const apiUrl = `${GOOGLE_PLACES_BASE_URL}/textsearch/json?query=${encodeURIComponent(searchQuery)}&key=${GOOGLE_PLACES_API_KEY}`;
    
    console.log(`Making category request to Google Places API: ${apiUrl.replace(GOOGLE_PLACES_API_KEY, 'API_KEY_HIDDEN')}`);
    
    const response = await axios.get(apiUrl);
    res.json(response.data);
  } catch (error) {
    console.error(`Error in category search endpoint:`, error.message);
    next(error);
  }
});

module.exports = router; 