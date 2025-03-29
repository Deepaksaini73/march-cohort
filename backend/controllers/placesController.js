const axios = require('axios');
const config = require('../config/config');

// Simple in-memory cache
const cache = {
  data: {},
  timeout: {},
  
  // Set cache with expiration (in milliseconds)
  set: function(key, value, ttl = 3600000) { // Default: 1 hour
    this.data[key] = value;
    
    // Clear any existing timeout
    if (this.timeout[key]) {
      clearTimeout(this.timeout[key]);
    }
    
    // Set timeout to clear cache
    this.timeout[key] = setTimeout(() => {
      delete this.data[key];
      delete this.timeout[key];
    }, ttl);
  },
  
  // Get from cache
  get: function(key) {
    return this.data[key] || null;
  },
  
  // Check if key exists
  has: function(key) {
    return this.data.hasOwnProperty(key);
  }
};

// Helper to build Google Places API URL
const buildApiUrl = (endpoint, params = {}) => {
  try {
    const url = new URL(`${config.googlePlacesBaseUrl}/${endpoint}/json`);
    
    // Add API key
    url.searchParams.append('key', config.googlePlacesApiKey);
    
    // Add all other parameters
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, value);
      }
    });
    
    return url.toString();
  } catch (error) {
    console.error('Error building API URL:', error);
    throw new Error('Invalid URL configuration');
  }
};

// Generate cache key based on endpoint and parameters
const generateCacheKey = (endpoint, params) => {
  return `${endpoint}:${JSON.stringify(params)}`;
};

// Search places by text query
exports.searchPlaces = async (req, res, next) => {
  try {
    console.log('Search places request:', req.query);
    const { query, type, location, radius = 50000 } = req.query;
    
    if (!query) {
      return res.status(400).json({ error: 'Query parameter is required' });
    }
    
    const params = { query };
    
    if (type) params.type = type;
    if (location) {
      const [lat, lng] = location.split(',');
      params.location = `${lat},${lng}`;
      params.radius = radius;
    }
    
    const cacheKey = generateCacheKey('textsearch', params);
    
    // Check cache
    if (cache.has(cacheKey)) {
      console.log('Returning cached results for', query);
      return res.json(cache.get(cacheKey));
    }
    
    const url = buildApiUrl('textsearch', params);
    console.log('Google Places API request URL:', url);
    
    const response = await axios.get(url);
    
    // Save to cache
    cache.set(cacheKey, response.data);
    
    res.json(response.data);
  } catch (error) {
    console.error('Error searching places:', error.message);
    if (error.response) {
      console.error('Google API response:', error.response.data);
    }
    
    if (!res.headersSent) {
      res.status(500).json({ 
        error: 'Failed to search places', 
        details: error.message,
        timestamp: new Date().toISOString()
      });
    } else {
      next(error);
    }
  }
};

// Get place details by place_id
exports.getPlaceDetails = async (req, res, next) => {
  try {
    console.log('Get place details request:', req.query);
    const { place_id, fields } = req.query;
    
    if (!place_id) {
      return res.status(400).json({ error: 'Place ID parameter is required' });
    }
    
    const params = { place_id };
    
    if (fields) {
      params.fields = fields;
    } else {
      params.fields = [
        'name', 'formatted_address', 'geometry', 'photos', 'price_level', 
        'rating', 'reviews', 'types', 'user_ratings_total', 'website', 
        'formatted_phone_number', 'international_phone_number', 'opening_hours', 
        'url', 'vicinity', 'address_components'
      ].join(',');
    }
    
    const cacheKey = generateCacheKey('details', params);
    
    // Check cache
    if (cache.has(cacheKey)) {
      console.log('Returning cached details for', place_id);
      return res.json(cache.get(cacheKey));
    }
    
    const url = buildApiUrl('details', params);
    console.log('Google Places API request URL:', url);
    
    const response = await axios.get(url);
    
    // Save to cache
    cache.set(cacheKey, response.data);
    
    res.json(response.data);
  } catch (error) {
    console.error('Error getting place details:', error.message);
    if (error.response) {
      console.error('Google API response:', error.response.data);
    }
    
    if (!res.headersSent) {
      res.status(500).json({ 
        error: 'Failed to get place details', 
        details: error.message,
        timestamp: new Date().toISOString()
      });
    } else {
      next(error);
    }
  }
};

// Get place photos by photo reference
exports.getPlacePhoto = async (req, res, next) => {
  try {
    console.log('Get place photo request:', req.query);
    const { photoreference, maxwidth = 800, maxheight } = req.query;
    
    if (!photoreference) {
      return res.status(400).json({ error: 'Photo reference parameter is required' });
    }
    
    const params = { photoreference, maxwidth };
    if (maxheight) params.maxheight = maxheight;
    
    const url = buildApiUrl('photo', params);
    console.log('Google Places API photo URL:', url);
    
    // Redirect to the actual photo URL
    res.redirect(url);
  } catch (error) {
    console.error('Error getting place photo:', error.message);
    if (!res.headersSent) {
      res.status(500).json({ 
        error: 'Failed to get place photo', 
        details: error.message,
        timestamp: new Date().toISOString()
      });
    } else {
      next(error);
    }
  }
};

// Get place autocomplete suggestions
exports.getAutocomplete = async (req, res, next) => {
  try {
    console.log('Get autocomplete request:', req.query);
    const { input, types = 'establishment', components, strictbounds, location, radius } = req.query;
    
    if (!input) {
      return res.status(400).json({ error: 'Input parameter is required' });
    }
    
    const params = { input, types };
    
    if (components) params.components = components;
    if (strictbounds) params.strictbounds = strictbounds;
    if (location) params.location = location;
    if (radius) params.radius = radius;
    
    const cacheKey = generateCacheKey('autocomplete', params);
    
    // Check cache
    if (cache.has(cacheKey)) {
      console.log('Returning cached autocomplete for', input);
      return res.json(cache.get(cacheKey));
    }
    
    const url = buildApiUrl('autocomplete', params);
    console.log('Google Places API request URL:', url);
    
    const response = await axios.get(url);
    
    // Save to cache (shorter TTL for autocomplete results)
    cache.set(cacheKey, response.data, 1800000); // 30 minutes
    
    res.json(response.data);
  } catch (error) {
    console.error('Error getting autocomplete suggestions:', error.message);
    if (error.response) {
      console.error('Google API response:', error.response.data);
    }
    
    if (!res.headersSent) {
      res.status(500).json({ 
        error: 'Failed to get autocomplete suggestions', 
        details: error.message,
        timestamp: new Date().toISOString()
      });
    } else {
      next(error);
    }
  }
};

// Get nearby places
exports.getNearbyPlaces = async (req, res, next) => {
  try {
    console.log('Get nearby places request:', req.query);
    const { location, radius = 5000, type, keyword, rankby } = req.query;
    
    if (!location) {
      return res.status(400).json({ error: 'Location parameter is required' });
    }
    
    const params = { location };
    
    if (rankby === 'distance') {
      params.rankby = 'distance';
      // When rankby=distance, radius cannot be included
    } else {
      params.radius = radius;
    }
    
    if (type) params.type = type;
    if (keyword) params.keyword = keyword;
    
    const cacheKey = generateCacheKey('nearbysearch', params);
    
    // Check cache
    if (cache.has(cacheKey)) {
      console.log('Returning cached nearby places');
      return res.json(cache.get(cacheKey));
    }
    
    const url = buildApiUrl('nearbysearch', params);
    console.log('Google Places API request URL:', url);
    
    const response = await axios.get(url);
    
    // Save to cache
    cache.set(cacheKey, response.data);
    
    res.json(response.data);
  } catch (error) {
    console.error('Error getting nearby places:', error.message);
    if (error.response) {
      console.error('Google API response:', error.response.data);
    }
    
    if (!res.headersSent) {
      res.status(500).json({ 
        error: 'Failed to get nearby places', 
        details: error.message,
        timestamp: new Date().toISOString()
      });
    } else {
      next(error);
    }
  }
};

// Custom endpoint: Get popular destinations
exports.getPopularDestinations = async (req, res, next) => {
  try {
    console.log('Get popular destinations request:', req.query);
    const { country = 'india', limit = 20 } = req.query;
    
    const params = {
      query: `popular tourist destinations in ${country}`,
      type: 'tourist_attraction'
    };
    
    const cacheKey = generateCacheKey('popular-destinations', params);
    
    // Check cache
    if (cache.has(cacheKey)) {
      console.log('Returning cached popular destinations');
      return res.json(cache.get(cacheKey));
    }
    
    const url = buildApiUrl('textsearch', params);
    console.log('Google Places API request URL:', url);
    
    const response = await axios.get(url);
    console.log('Google API response status:', response.data.status);
    
    // Process and limit results
    const results = response.data.results || [];
    const limitedResults = results.slice(0, parseInt(limit));
    
    const responseData = {
      ...response.data,
      results: limitedResults
    };
    
    // Save to cache (longer TTL for popular destinations)
    cache.set(cacheKey, responseData, 86400000); // 24 hours
    
    res.json(responseData);
  } catch (error) {
    console.error('Error getting popular destinations:', error.message);
    if (error.response) {
      console.error('Google API response:', error.response.data);
    }
    
    if (!res.headersSent) {
      res.status(500).json({ 
        error: 'Failed to get popular destinations', 
        details: error.message,
        timestamp: new Date().toISOString()
      });
    } else {
      next(error);
    }
  }
};

// Custom endpoint: Search tours by category
exports.searchToursByCategory = async (req, res, next) => {
  try {
    console.log('Search tours by category request:', req.query);
    const { category, location, limit = 20 } = req.query;
    
    if (!category) {
      return res.status(400).json({ error: 'Category parameter is required' });
    }
    
    const query = location 
      ? `${category} tours in ${location}` 
      : `${category} tours`;
    
    const params = { query };
    
    const cacheKey = generateCacheKey('category-tours', params);
    
    // Check cache
    if (cache.has(cacheKey)) {
      console.log('Returning cached category tours');
      return res.json(cache.get(cacheKey));
    }
    
    const url = buildApiUrl('textsearch', params);
    console.log('Google Places API request URL:', url);
    
    const response = await axios.get(url);
    console.log('Google API response status:', response.data.status);
    
    // Process and limit results
    const results = response.data.results || [];
    const limitedResults = results.slice(0, parseInt(limit));
    
    const responseData = {
      ...response.data,
      results: limitedResults
    };
    
    // Save to cache
    cache.set(cacheKey, responseData);
    
    res.json(responseData);
  } catch (error) {
    console.error('Error searching tours by category:', error.message);
    if (error.response) {
      console.error('Google API response:', error.response.data);
    }
    
    if (!res.headersSent) {
      res.status(500).json({ 
        error: 'Failed to search tours by category', 
        details: error.message,
        timestamp: new Date().toISOString()
      });
    } else {
      next(error);
    }
  }
};

// Get location image directly by name
exports.getLocationImageByName = async (req, res, next) => {
  try {
    console.log('Get location image by name request:', req.query);
    const { name, maxwidth = 800 } = req.query;
    
    if (!name) {
      return res.status(400).json({ error: 'Location name parameter is required' });
    }
    
    // First search for the location to get photo reference
    const searchParams = { query: name };
    const searchUrl = buildApiUrl('textsearch', searchParams);
    console.log('Google Places API search URL:', searchUrl);
    
    const searchResponse = await axios.get(searchUrl);
    
    if (!searchResponse.data.results || searchResponse.data.results.length === 0) {
      return res.status(404).json({ 
        error: 'No location found with that name', 
        name: name,
        timestamp: new Date().toISOString()
      });
    }
    
    // Get the first result's first photo reference
    const firstResult = searchResponse.data.results[0];
    if (!firstResult.photos || firstResult.photos.length === 0) {
      return res.status(404).json({ 
        error: 'No photos available for this location', 
        name: name,
        location: firstResult.name,
        timestamp: new Date().toISOString()
      });
    }
    
    const photoReference = firstResult.photos[0].photo_reference;
    
    // Build photo URL (manually to avoid the "/json" issue)
    const photoUrl = `${config.googlePlacesBaseUrl}/photo?photoreference=${photoReference}&key=${config.googlePlacesApiKey}&maxwidth=${maxwidth}`;
    console.log('Google Places API direct photo URL:', photoUrl.replace(config.googlePlacesApiKey, 'API_KEY_HIDDEN'));
    
    // Redirect to the actual photo URL
    res.redirect(photoUrl);
  } catch (error) {
    console.error('Error getting location image by name:', error.message);
    if (error.response) {
      console.error('Google API response:', error.response.data);
    }
    
    if (!res.headersSent) {
      res.status(500).json({ 
        error: 'Failed to get location image', 
        details: error.message,
        timestamp: new Date().toISOString()
      });
    } else {
      next(error);
    }
  }
};

// Get location rating by name
exports.getLocationRating = async (req, res, next) => {
  try {
    console.log('Get location rating by name request:', req.query);
    const { name } = req.query;
    
    if (!name) {
      return res.status(400).json({ error: 'Location name parameter is required' });
    }
    
    // Search for the location to get details
    const searchParams = { query: name };
    const searchUrl = buildApiUrl('textsearch', searchParams);
    console.log('Google Places API search URL:', searchUrl);
    
    const searchResponse = await axios.get(searchUrl);
    
    if (!searchResponse.data.results || searchResponse.data.results.length === 0) {
      return res.status(404).json({ 
        error: 'No location found with that name', 
        name: name,
        timestamp: new Date().toISOString()
      });
    }
    
    // Get the first result
    const firstResult = searchResponse.data.results[0];
    
    // Extract rating information
    const ratingInfo = {
      name: firstResult.name,
      rating: firstResult.rating || 'No rating available',
      user_ratings_total: firstResult.user_ratings_total || 0,
      place_id: firstResult.place_id
    };
    
    res.json(ratingInfo);
  } catch (error) {
    console.error('Error getting location rating by name:', error.message);
    if (error.response) {
      console.error('Google API response:', error.response.data);
    }
    
    if (!res.headersSent) {
      res.status(500).json({ 
        error: 'Failed to get location rating', 
        details: error.message,
        timestamp: new Date().toISOString()
      });
    } else {
      next(error);
    }
  }
};

// Get location address (city, state) by name
exports.getLocationAddress = async (req, res, next) => {
  try {
    console.log('Get location address by name request:', req.query);
    const { name } = req.query;
    
    if (!name) {
      return res.status(400).json({ error: 'Location name parameter is required' });
    }
    
    // Search for the location to get details
    const searchParams = { query: name };
    const searchUrl = buildApiUrl('textsearch', searchParams);
    console.log('Google Places API search URL:', searchUrl);
    
    const searchResponse = await axios.get(searchUrl);
    
    if (!searchResponse.data.results || searchResponse.data.results.length === 0) {
      return res.status(404).json({ 
        error: 'No location found with that name', 
        name: name,
        timestamp: new Date().toISOString()
      });
    }
    
    // Get the first result
    const firstResult = searchResponse.data.results[0];
    
    // If we have place_id, get more detailed address components
    if (firstResult.place_id) {
      const detailsParams = { 
        place_id: firstResult.place_id,
        fields: 'address_components,formatted_address,name'
      };
      
      const detailsUrl = buildApiUrl('details', detailsParams);
      console.log('Google Places API details URL:', detailsUrl);
      
      const detailsResponse = await axios.get(detailsUrl);
      
      if (detailsResponse.data.result && detailsResponse.data.result.address_components) {
        // Extract city and state from address components
        const addressComponents = detailsResponse.data.result.address_components;
        
        let city = '';
        let state = '';
        let country = '';
        
        // Find city, state, and country components
        for (const component of addressComponents) {
          if (component.types.includes('locality')) {
            city = component.long_name;
          } else if (component.types.includes('administrative_area_level_1')) {
            state = component.long_name;
          } else if (component.types.includes('country')) {
            country = component.long_name;
          }
        }
        
        // Send simplified address
        return res.json({
          name: detailsResponse.data.result.name,
          city: city || 'Not available',
          state: state || 'Not available',
          country: country || 'Not available',
          formatted_address: detailsResponse.data.result.formatted_address
        });
      }
    }
    
    // Fallback if detailed address components are not available
    return res.json({
      name: firstResult.name,
      formatted_address: firstResult.formatted_address || 'Address not available',
      note: 'Detailed city and state information not available'
    });
    
  } catch (error) {
    console.error('Error getting location address by name:', error.message);
    if (error.response) {
      console.error('Google API response:', error.response.data);
    }
    
    if (!res.headersSent) {
      res.status(500).json({ 
        error: 'Failed to get location address', 
        details: error.message,
        timestamp: new Date().toISOString()
      });
    } else {
      next(error);
    }
  }
};

// Get nearby places by location name
exports.getNearbyPlacesByName = async (req, res, next) => {
  try {
    console.log('Get nearby places by name request:', req.query);
    const { name, radius = 5000, type } = req.query;
    
    if (!name) {
      return res.status(400).json({ error: 'Location name parameter is required' });
    }
    
    // First search for the location to get its coordinates
    const searchParams = { query: name };
    const searchUrl = buildApiUrl('textsearch', searchParams);
    console.log('Google Places API search URL:', searchUrl);
    
    const searchResponse = await axios.get(searchUrl);
    
    if (!searchResponse.data.results || searchResponse.data.results.length === 0) {
      return res.status(404).json({ 
        error: 'No location found with that name', 
        name: name,
        timestamp: new Date().toISOString()
      });
    }
    
    // Get the first result's coordinates
    const firstResult = searchResponse.data.results[0];
    if (!firstResult.geometry || !firstResult.geometry.location) {
      return res.status(404).json({ 
        error: 'No coordinate information available for this location',
        name: name,
        timestamp: new Date().toISOString()
      });
    }
    
    const { lat, lng } = firstResult.geometry.location;
    
    // Now use these coordinates to find nearby places
    const nearbyParams = { 
      location: `${lat},${lng}`,
      radius: radius
    };
    
    if (type) nearbyParams.type = type;
    
    const nearbyUrl = buildApiUrl('nearbysearch', nearbyParams);
    console.log('Google Places API nearby search URL:', nearbyUrl);
    
    const nearbyResponse = await axios.get(nearbyUrl);
    
    // Add the source location info to the response
    const responseData = {
      ...nearbyResponse.data,
      source_location: {
        name: firstResult.name,
        address: firstResult.formatted_address,
        location: firstResult.geometry.location
      }
    };
    
    res.json(responseData);
  } catch (error) {
    console.error('Error getting nearby places by name:', error.message);
    if (error.response) {
      console.error('Google API response:', error.response.data);
    }
    
    if (!res.headersSent) {
      res.status(500).json({ 
        error: 'Failed to get nearby places', 
        details: error.message,
        timestamp: new Date().toISOString()
      });
    } else {
      next(error);
    }
  }
};

// Get autocomplete suggestions with default location context
exports.getAutocompleteWithLocation = async (req, res, next) => {
  try {
    console.log('Get autocomplete with location request:', req.query);
    const { input, location_context } = req.query;
    
    if (!input) {
      return res.status(400).json({ error: 'Input parameter is required' });
    }
    
    const params = { 
      input: input,
      types: 'establishment'
    };
    
    // If location context is provided, search for it first to get coordinates
    if (location_context) {
      const searchParams = { query: location_context };
      const searchUrl = buildApiUrl('textsearch', searchParams);
      console.log('Google Places API location context search URL:', searchUrl);
      
      const searchResponse = await axios.get(searchUrl);
      
      if (searchResponse.data.results && searchResponse.data.results.length > 0) {
        const locationResult = searchResponse.data.results[0];
        if (locationResult.geometry && locationResult.geometry.location) {
          const { lat, lng } = locationResult.geometry.location;
          params.location = `${lat},${lng}`;
          params.radius = 50000; // 50km radius
        }
      }
    }
    
    const url = buildApiUrl('autocomplete', params);
    console.log('Google Places API autocomplete URL:', url);
    
    const response = await axios.get(url);
    
    // Add location context info to the response if it was used
    if (location_context && params.location) {
      response.data.location_context_used = {
        location_name: location_context,
        coordinates: params.location,
        radius: params.radius
      };
    }
    
    res.json(response.data);
  } catch (error) {
    console.error('Error getting autocomplete with location:', error.message);
    if (error.response) {
      console.error('Google API response:', error.response.data);
    }
    
    if (!res.headersSent) {
      res.status(500).json({ 
        error: 'Failed to get autocomplete suggestions', 
        details: error.message,
        timestamp: new Date().toISOString()
      });
    } else {
      next(error);
    }
  }
};

// Get direct popular destinations with simplified parameters
exports.getDirectPopularDestinations = async (req, res, next) => {
  try {
    console.log('Get direct popular destinations request:', req.query);
    const { name, limit = 10 } = req.query;
    
    if (!name) {
      return res.status(400).json({ error: 'Location name parameter is required' });
    }
    
    // Create the appropriate search query
    let searchQuery;
    
    // Check if input is likely a country or a city
    if (name.toLowerCase().match(/^(india|usa|france|japan|australia|italy|spain|canada|brazil|egypt)$/)) {
      // For countries, search for popular destinations within them
      searchQuery = `popular tourist destinations in ${name}`;
    } else {
      // For cities or regions, search for attractions within them
      searchQuery = `top attractions in ${name}`;
    }
    
    const params = {
      query: searchQuery,
      type: 'tourist_attraction'
    };
    
    const url = buildApiUrl('textsearch', params);
    console.log('Google Places API popular destinations URL:', url);
    
    const response = await axios.get(url);
    
    // Process and limit results
    const results = response.data.results || [];
    const limitedResults = results.slice(0, parseInt(limit));
    
    // Prepare simplified results with just the essential info
    const simplifiedResults = limitedResults.map(place => ({
      name: place.name,
      address: place.formatted_address,
      rating: place.rating || 'Not rated',
      total_ratings: place.user_ratings_total || 0,
      place_id: place.place_id,
      photo_reference: place.photos && place.photos.length > 0 ? place.photos[0].photo_reference : null
    }));
    
    const responseData = {
      status: response.data.status,
      location: name,
      destinations: simplifiedResults,
      total_found: results.length,
      showing: simplifiedResults.length
    };
    
    res.json(responseData);
  } catch (error) {
    console.error('Error getting direct popular destinations:', error.message);
    if (error.response) {
      console.error('Google API response:', error.response.data);
    }
    
    if (!res.headersSent) {
      res.status(500).json({ 
        error: 'Failed to get popular destinations', 
        details: error.message,
        timestamp: new Date().toISOString()
      });
    } else {
      next(error);
    }
  }
};

// Get direct tours by simplified category
exports.getDirectToursByCategory = async (req, res, next) => {
  try {
    console.log('Get direct tours by category request:', req.query);
    const { category, location, limit = 10 } = req.query;
    
    if (!category) {
      return res.status(400).json({ error: 'Category parameter is required' });
    }
    
    // Map user-friendly categories to search queries
    const categoryMappings = {
      'adventure': 'adventure tours and activities',
      'cultural': 'cultural tours and historical sites',
      'beach': 'beach resorts and coastal attractions', 
      'mountain': 'mountain hiking tours and scenic views',
      'food': 'food tours and culinary experiences',
      'wildlife': 'wildlife safaris and nature tours',
      'religious': 'religious and spiritual tours',
      'heritage': 'heritage sites and monuments',
      'urban': 'city tours and urban exploration',
      'camping': 'camping and outdoor activities'
    };
    
    // Build query based on category and location
    let searchQuery;
    
    if (location) {
      searchQuery = `${categoryMappings[category.toLowerCase()] || `${category} tours`} in ${location}`;
    } else {
      searchQuery = categoryMappings[category.toLowerCase()] || `${category} tours`;
    }
    
    const params = { query: searchQuery };
    
    const url = buildApiUrl('textsearch', params);
    console.log('Google Places API category search URL:', url);
    
    const response = await axios.get(url);
    
    // Process and limit results
    const results = response.data.results || [];
    const limitedResults = results.slice(0, parseInt(limit));
    
    // Prepare simplified results with just the essential info
    const simplifiedResults = limitedResults.map(place => ({
      name: place.name,
      address: place.formatted_address,
      rating: place.rating || 'Not rated',
      total_ratings: place.user_ratings_total || 0,
      place_id: place.place_id,
      photo_reference: place.photos && place.photos.length > 0 ? place.photos[0].photo_reference : null
    }));
    
    const responseData = {
      status: response.data.status,
      category: category,
      location: location || 'worldwide',
      tours: simplifiedResults,
      total_found: results.length,
      showing: simplifiedResults.length
    };
    
    res.json(responseData);
  } catch (error) {
    console.error('Error getting direct tours by category:', error.message);
    if (error.response) {
      console.error('Google API response:', error.response.data);
    }
    
    if (!res.headersSent) {
      res.status(500).json({ 
        error: 'Failed to get tours by category', 
        details: error.message,
        timestamp: new Date().toISOString()
      });
    } else {
      next(error);
    }
  }
};

// Get comprehensive trip planner data for a location
exports.getTripPlannerData = async (req, res, next) => {
  try {
    console.log('Get trip planner data request:', req.query);
    const { location, limit = 50 } = req.query;
    
    if (!location) {
      return res.status(400).json({ error: 'Location parameter is required' });
    }
    
    // Special handling for Indian locations
    const indiaLocations = {
      'jaipur': 'Jaipur, Rajasthan, India',
      'delhi': 'New Delhi, India',
      'mumbai': 'Mumbai, Maharashtra, India',
      'kolkata': 'Kolkata, West Bengal, India',
      'bangalore': 'Bangalore, Karnataka, India',
      'chennai': 'Chennai, Tamil Nadu, India',
      'agra': 'Agra, Uttar Pradesh, India',
      'goa': 'Goa, India',
      'kerala': 'Kerala, India',
      'varanasi': 'Varanasi, India'
    };
    
    // Normalize input location and check if it's a known Indian location
    const normalizedLocation = location.toLowerCase().trim();
    const searchLocation = Object.keys(indiaLocations).some(key => normalizedLocation.includes(key)) 
      ? Object.keys(indiaLocations).find(key => normalizedLocation.includes(key))
        ? indiaLocations[Object.keys(indiaLocations).find(key => normalizedLocation.includes(key))]
        : location
      : location;
    
    // Check cache with the normalized location
    const cacheKey = generateCacheKey('trip-planner', { location: searchLocation });
    if (cache.has(cacheKey)) {
      console.log('Returning cached trip planner data for', searchLocation);
      return res.json(cache.get(cacheKey));
    }
    
    // First get the main location details to get coordinates
    const searchParams = { query: searchLocation };
    const searchUrl = buildApiUrl('textsearch', searchParams);
    console.log('Google Places API location search URL:', searchUrl);
    
    const locationResponse = await axios.get(searchUrl);
    
    if (!locationResponse.data.results || locationResponse.data.results.length === 0) {
      return res.status(404).json({ 
        error: 'No location found with that name',
        location: location,
        timestamp: new Date().toISOString()
      });
    }
    
    // Get the first result's coordinates
    const mainLocation = locationResponse.data.results[0];
    if (!mainLocation.geometry || !mainLocation.geometry.location) {
      return res.status(404).json({ 
        error: 'No coordinate information available for this location',
        location: location,
        timestamp: new Date().toISOString()
      });
    }
    
    const { lat, lng } = mainLocation.geometry.location;
    const mainCoordinates = { lat, lng };
    
    // Define categories to search for with more specific Indian context if applicable
    const isIndianLocation = Object.values(indiaLocations).some(loc => 
      searchLocation.toLowerCase().includes(loc.toLowerCase())
    );
    
    const categories = isIndianLocation 
      ? [
          { name: 'Attractions', query: `tourist attractions in ${searchLocation}` },
          { name: 'Historical', query: `historical places in ${searchLocation}` },
          { name: 'Temples', query: `temples in ${searchLocation}` },
          { name: 'Cultural', query: `cultural sites in ${searchLocation}` },
          { name: 'Markets', query: `bazaars and markets in ${searchLocation}` },
          { name: 'Palaces', query: `palaces and forts in ${searchLocation}` },
          { name: 'Gardens', query: `gardens and parks in ${searchLocation}` },
          { name: 'Food', query: `best restaurants in ${searchLocation}` }
        ]
      : [
          { name: 'Attractions', query: `tourist attractions in ${searchLocation}` },
          { name: 'Historical', query: `historical places in ${searchLocation}` },
          { name: 'Cultural', query: `cultural sites in ${searchLocation}` },
          { name: 'Museums', query: `museums in ${searchLocation}` },
          { name: 'Religious', query: `temples and religious sites in ${searchLocation}` },
          { name: 'Parks', query: `parks and gardens in ${searchLocation}` },
          { name: 'Shopping', query: `shopping markets in ${searchLocation}` },
          { name: 'Food', query: `best restaurants in ${searchLocation}` }
        ];
    
    // Fetch data for each category concurrently
    const categoryPromises = categories.map(async (category) => {
      const params = { query: category.query };
      const url = buildApiUrl('textsearch', params);
      console.log(`Fetching ${category.name} for ${searchLocation}:`, url);
      
      try {
        const response = await axios.get(url);
        const results = response.data.results || [];
        
        // Process places with distance calculation
        const processedPlaces = results.map(place => {
          // Calculate distance from main location
          const distance = place.geometry && place.geometry.location 
            ? calculateDistance(
                mainCoordinates.lat, 
                mainCoordinates.lng, 
                place.geometry.location.lat, 
                place.geometry.location.lng
              ) 
            : null;
            
          return {
            name: place.name,
            place_id: place.place_id,
            address: place.formatted_address,
            location: place.geometry ? place.geometry.location : null,
            distance: distance ? {
              km: distance.toFixed(2),
              miles: (distance * 0.621371).toFixed(2)
            } : null,
            rating: place.rating || 'Not rated',
            user_ratings_total: place.user_ratings_total || 0,
            photo_reference: place.photos && place.photos.length > 0 ? place.photos[0].photo_reference : null,
            types: place.types || []
          };
        });
        
        // Sort by rating (highest first)
        const sortedPlaces = processedPlaces.sort((a, b) => {
          const ratingA = typeof a.rating === 'number' ? a.rating : 0;
          const ratingB = typeof b.rating === 'number' ? b.rating : 0;
          return ratingB - ratingA;
        });
        
        return {
          category: category.name,
          places: sortedPlaces
        };
      } catch (error) {
        console.error(`Error fetching ${category.name} data:`, error.message);
        return {
          category: category.name,
          places: [],
          error: `Failed to fetch ${category.name} data`
        };
      }
    });
    
    // Wait for all category data to be fetched
    const categoriesData = await Promise.all(categoryPromises);
    
    // Filter out categories with no places
    const filteredCategoriesData = categoriesData.filter(category => category.places.length > 0);
    
    // If no places were found, return an error
    if (filteredCategoriesData.length === 0) {
      return res.status(404).json({ 
        error: 'No places found for this location',
        location: location,
        timestamp: new Date().toISOString()
      });
    }
    
    // Create a "top rated" category from all places
    const allPlaces = filteredCategoriesData.flatMap(category => category.places);
    const uniquePlaces = [];
    const seenPlaceIds = new Set();
    
    // Remove duplicate places (same place_id)
    allPlaces.forEach(place => {
      if (!seenPlaceIds.has(place.place_id)) {
        uniquePlaces.push(place);
        seenPlaceIds.add(place.place_id);
      }
    });
    
    // Sort all places by rating and get top ones
    const topRated = uniquePlaces
      .sort((a, b) => {
        const ratingA = typeof a.rating === 'number' ? a.rating : 0;
        const ratingB = typeof b.rating === 'number' ? b.rating : 0;
        return ratingB - ratingA;
      })
      .slice(0, 10);
    
    // Add the top rated category at the beginning
    filteredCategoriesData.unshift({
      category: 'Top Rated',
      places: topRated
    });
    
    // Final response object
    const responseData = {
      destination: {
        name: mainLocation.name,
        address: mainLocation.formatted_address,
        location: mainCoordinates,
        place_id: mainLocation.place_id,
        photo_reference: mainLocation.photos && mainLocation.photos.length > 0 
          ? mainLocation.photos[0].photo_reference 
          : null
      },
      categories: filteredCategoriesData,
      total_places_found: uniquePlaces.length
    };
    
    // Cache the results for future use (24 hours for popular destinations)
    cache.set(cacheKey, responseData, isIndianLocation ? 86400000 : 3600000);
    
    res.json(responseData);
  } catch (error) {
    console.error('Error getting trip planner data:', error.message);
    if (error.response) {
      console.error('Google API response:', error.response.data);
    }
    
    if (!res.headersSent) {
      res.status(500).json({ 
        error: 'Failed to get trip planner data', 
        details: error.message,
        timestamp: new Date().toISOString()
      });
    } else {
      next(error);
    }
  }
};

// Helper function to calculate distance between coordinates using Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c; // Distance in km
  
  return distance;
}

// Get weather data for a location by name
exports.getLocationWeather = async (req, res, next) => {
  try {
    console.log('Get location weather request:', req.query);
    const { name } = req.query;
    
    if (!name) {
      return res.status(400).json({ error: 'Location name parameter is required' });
    }
    
    // First search for the location to get its coordinates
    const searchParams = { query: name };
    const searchUrl = buildApiUrl('textsearch', searchParams);
    console.log('Google Places API search URL:', searchUrl);
    
    const searchResponse = await axios.get(searchUrl);
    
    if (!searchResponse.data.results || searchResponse.data.results.length === 0) {
      return res.status(404).json({ 
        error: 'No location found with that name', 
        name: name,
        timestamp: new Date().toISOString()
      });
    }
    
    // Get the first result's coordinates
    const firstResult = searchResponse.data.results[0];
    if (!firstResult.geometry || !firstResult.geometry.location) {
      return res.status(404).json({ 
        error: 'No coordinate information available for this location',
        name: name,
        timestamp: new Date().toISOString()
      });
    }
    
    const { lat, lng } = firstResult.geometry.location;
    
    // Use OpenWeatherMap API with the directly provided key
    const weatherApiKey = 'c4ad468b7bd8bac5f7cbe2810bf113ae';
    
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${weatherApiKey}`;
    console.log('Weather API request URL:', weatherUrl.replace(weatherApiKey, 'API_KEY_HIDDEN'));
    
    const weatherResponse = await axios.get(weatherUrl);
    
    // Create a simplified weather object with the most important data
    const weatherData = {
      location: {
        name: firstResult.name,
        address: firstResult.formatted_address,
        coordinates: { lat, lng },
        place_id: firstResult.place_id
      },
      weather: {
        main: weatherResponse.data.weather[0].main,
        description: weatherResponse.data.weather[0].description,
        icon: weatherResponse.data.weather[0].icon,
        icon_url: `https://openweathermap.org/img/wn/${weatherResponse.data.weather[0].icon}@2x.png`,
        temperature: {
          current: weatherResponse.data.main.temp,
          feels_like: weatherResponse.data.main.feels_like,
          min: weatherResponse.data.main.temp_min,
          max: weatherResponse.data.main.temp_max,
          unit: 'celsius'
        },
        humidity: weatherResponse.data.main.humidity,
        pressure: weatherResponse.data.main.pressure,
        wind: {
          speed: weatherResponse.data.wind.speed,
          deg: weatherResponse.data.wind.deg,
          unit: 'm/s'
        },
        clouds: weatherResponse.data.clouds.all,
        visibility: weatherResponse.data.visibility,
        sunrise: new Date(weatherResponse.data.sys.sunrise * 1000).toISOString(),
        sunset: new Date(weatherResponse.data.sys.sunset * 1000).toISOString(),
        timezone: weatherResponse.data.timezone
      },
      timestamp: new Date().toISOString()
    };
    
    // Create a cache key for weather data (cache for shorter time since weather changes)
    const cacheKey = generateCacheKey('weather', { location: name });
    
    // Save to cache with a 30 minute TTL
    cache.set(cacheKey, weatherData, 1800000);
    
    res.json(weatherData);
  } catch (error) {
    console.error('Error getting location weather:', error.message);
    if (error.response) {
      console.error('API response:', error.response.data);
    }
    
    if (!res.headersSent) {
      res.status(500).json({ 
        error: 'Failed to get location weather', 
        details: error.message,
        timestamp: new Date().toISOString()
      });
    } else {
      next(error);
    }
  }
};

// Get weather forecast for a location by name
exports.getLocationForecast = async (req, res, next) => {
  try {
    console.log('Get location forecast request:', req.query);
    const { name, days = 5 } = req.query;
    
    if (!name) {
      return res.status(400).json({ error: 'Location name parameter is required' });
    }
    
    // First search for the location to get its coordinates
    const searchParams = { query: name };
    const searchUrl = buildApiUrl('textsearch', searchParams);
    console.log('Google Places API search URL:', searchUrl);
    
    const searchResponse = await axios.get(searchUrl);
    
    if (!searchResponse.data.results || searchResponse.data.results.length === 0) {
      return res.status(404).json({ 
        error: 'No location found with that name', 
        name: name,
        timestamp: new Date().toISOString()
      });
    }
    
    // Get the first result's coordinates
    const firstResult = searchResponse.data.results[0];
    if (!firstResult.geometry || !firstResult.geometry.location) {
      return res.status(404).json({ 
        error: 'No coordinate information available for this location',
        name: name,
        timestamp: new Date().toISOString()
      });
    }
    
    const { lat, lng } = firstResult.geometry.location;
    
    // Use OpenWeatherMap API with the directly provided key
    const weatherApiKey = 'c4ad468b7bd8bac5f7cbe2810bf113ae';
    
    // We're using the 5-day forecast endpoint, which returns data in 3-hour increments
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&units=metric&appid=${weatherApiKey}`;
    console.log('Weather Forecast API request URL:', forecastUrl.replace(weatherApiKey, 'API_KEY_HIDDEN'));
    
    const forecastResponse = await axios.get(forecastUrl);
    
    // Group forecast data by day
    const forecastsByDay = {};
    const forecastList = forecastResponse.data.list || [];
    
    forecastList.forEach(forecast => {
      const date = new Date(forecast.dt * 1000);
      const dayKey = date.toISOString().split('T')[0]; // YYYY-MM-DD format
      
      if (!forecastsByDay[dayKey]) {
        forecastsByDay[dayKey] = {
          date: dayKey,
          day_name: new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date),
          forecasts: []
        };
      }
      
      forecastsByDay[dayKey].forecasts.push({
        time: date.toISOString(),
        time_formatted: new Intl.DateTimeFormat('en-US', { 
          hour: 'numeric', 
          minute: 'numeric',
          hour12: true 
        }).format(date),
        main: forecast.weather[0].main,
        description: forecast.weather[0].description,
        icon: forecast.weather[0].icon,
        icon_url: `https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`,
        temperature: forecast.main.temp,
        feels_like: forecast.main.feels_like,
        humidity: forecast.main.humidity,
        wind_speed: forecast.wind.speed,
        wind_direction: forecast.wind.deg,
        clouds: forecast.clouds.all,
        pop: forecast.pop * 100 // Probability of precipitation (convert to percentage)
      });
    });
    
    // Convert to array and sort by date
    const dailyForecasts = Object.values(forecastsByDay)
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(0, parseInt(days)); // Limit to requested number of days
    
    // Calculate daily summaries
    const dailyForecastsWithSummary = dailyForecasts.map(day => {
      const forecasts = day.forecasts;
      
      // Skip summary if no forecasts
      if (forecasts.length === 0) {
        return day;
      }
      
      // Calculate min/max temps and most common weather condition
      let minTemp = forecasts[0].temperature;
      let maxTemp = forecasts[0].temperature;
      const weatherConditions = {};
      
      forecasts.forEach(f => {
        // Update min/max temps
        minTemp = Math.min(minTemp, f.temperature);
        maxTemp = Math.max(maxTemp, f.temperature);
        
        // Count weather conditions
        const condition = f.main;
        weatherConditions[condition] = (weatherConditions[condition] || 0) + 1;
      });
      
      // Find most common weather condition
      let mostCommonCondition = null;
      let maxCount = 0;
      
      Object.entries(weatherConditions).forEach(([condition, count]) => {
        if (count > maxCount) {
          mostCommonCondition = condition;
          maxCount = count;
        }
      });
      
      // Create representative icon (from the forecast with the most common condition)
      const representativeForecast = forecasts.find(f => f.main === mostCommonCondition) || forecasts[0];
      
      // Add summary to day object
      return {
        ...day,
        summary: {
          condition: mostCommonCondition,
          icon: representativeForecast.icon,
          icon_url: representativeForecast.icon_url,
          min_temp: minTemp,
          max_temp: maxTemp,
          avg_humidity: Math.round(forecasts.reduce((sum, f) => sum + f.humidity, 0) / forecasts.length),
          precipitation_chance: Math.round(forecasts.reduce((max, f) => Math.max(max, f.pop), 0))
        }
      };
    });
    
    // Create response data
    const forecastData = {
      location: {
        name: firstResult.name,
        address: firstResult.formatted_address,
        coordinates: { lat, lng },
        place_id: firstResult.place_id
      },
      city: forecastResponse.data.city,
      daily_forecasts: dailyForecastsWithSummary,
      timestamp: new Date().toISOString()
    };
    
    // Create a cache key for forecast data
    const cacheKey = generateCacheKey('forecast', { location: name, days });
    
    // Save to cache with a 3-hour TTL
    cache.set(cacheKey, forecastData, 10800000);  // 3 hours
    
    res.json(forecastData);
  } catch (error) {
    console.error('Error getting location forecast:', error.message);
    if (error.response) {
      console.error('API response:', error.response.data);
    }
    
    if (!res.headersSent) {
      res.status(500).json({ 
        error: 'Failed to get location forecast', 
        details: error.message,
        timestamp: new Date().toISOString()
      });
    } else {
      next(error);
    }
  }
};

// Get travel tips and best time to visit for a location
exports.getTravelTips = async (req, res, next) => {
  try {
    console.log('Get travel tips request:', req.query);
    const { name } = req.query;
    
    if (!name) {
      return res.status(400).json({ error: 'Location name parameter is required' });
    }
    
    // First search for the location
    const searchParams = { query: name };
    const searchUrl = buildApiUrl('textsearch', searchParams);
    console.log('Google Places API search URL:', searchUrl);
    
    const searchResponse = await axios.get(searchUrl);
    
    if (!searchResponse.data.results || searchResponse.data.results.length === 0) {
      return res.status(404).json({ 
        error: 'No location found with that name', 
        name: name,
        timestamp: new Date().toISOString()
      });
    }
    
    // Get the first result's details
    const firstResult = searchResponse.data.results[0];
    
    // Location data mapping for popular destinations
    // This would ideally be stored in a database, but we're hardcoding for this example
    const locationTips = {
      // India
      'jaipur': {
        best_time: 'October to March',
        seasons: {
          winter: { months: 'November to February', description: 'Pleasant days and cool nights, ideal for sightseeing', temp_range: '10°C to 25°C' },
          summer: { months: 'March to June', description: 'Very hot, not recommended for extended outdoor activities', temp_range: '25°C to 45°C' },
          monsoon: { months: 'July to September', description: 'Occasional heavy rainfall, but monuments look more beautiful', temp_range: '25°C to 35°C' }
        },
        local_tips: [
          'Visit Amber Fort early in the morning to avoid crowds',
          'Try the local Rajasthani cuisine, especially Dal Baati Churma',
          'Bargain in the local markets, starting at 40-50% of the initial price',
          'Use auto-rickshaws for short distances but fix the price beforehand',
          'Carry a water bottle and dress modestly when visiting temples'
        ],
        avoid: [
          'Traveling during peak summer (May-June) due to extreme heat',
          'Accepting guide services from strangers at monuments',
          'Drinking tap water'
        ],
        events: [
          { name: 'Jaipur Literature Festival', month: 'January', description: 'World\'s largest free literary festival' },
          { name: 'Elephant Festival', month: 'March', description: 'Colorful festival showcasing decorated elephants' },
          { name: 'Teej Festival', month: 'August', description: 'Traditional festival celebrating the monsoon season' },
          { name: 'Kite Festival', month: 'January', description: 'Vibrant kite flying during Makar Sankranti' }
        ],
        transport_options: [
          { type: 'Auto-rickshaw', cost: 'Low', convenience: 'Medium', best_for: 'Short distances within the city' },
          { type: 'Taxi/Cab', cost: 'Medium', convenience: 'High', best_for: 'Comfortable city travel and day trips' },
          { type: 'City Bus', cost: 'Very Low', convenience: 'Low', best_for: 'Budget travelers comfortable with crowds' },
          { type: 'Rental Bike/Scooter', cost: 'Low', convenience: 'Medium', best_for: 'Independent travelers familiar with Indian traffic' },
          { type: 'Uber/Ola', cost: 'Medium', convenience: 'High', best_for: 'Hassle-free travel within the city' }
        ],
        typical_costs: {
          budget_per_day: '₹1,500-3,000',
          mid_range_per_day: '₹3,000-7,000',
          luxury_per_day: '₹7,000+',
          meals: { budget: '₹100-300', mid_range: '₹300-800', luxury: '₹800+' },
          accommodation: { budget: '₹500-1,500', mid_range: '₹1,500-5,000', luxury: '₹5,000+' }
        }
      },
      'delhi': {
        best_time: 'October to March',
        seasons: {
          winter: { months: 'November to February', description: 'Cool and pleasant, occasionally foggy', temp_range: '5°C to 25°C' },
          summer: { months: 'March to June', description: 'Hot and dry, with occasional dust storms', temp_range: '25°C to 45°C' },
          monsoon: { months: 'July to September', description: 'Humid with moderate rainfall', temp_range: '25°C to 35°C' }
        },
        local_tips: [
          'Use the Delhi Metro for efficient travel across the city',
          'Visit Chandni Chowk early morning for the best street food experience',
          'Carry a scarf/mask during winter due to pollution',
          'Use prepaid taxis from the airport',
          'Take a guided tour of Old Delhi to discover hidden gems'
        ],
        avoid: [
          'Walking alone late at night in isolated areas',
          'Using private cabs without verified apps',
          'Carrying valuable items visibly',
          'Visiting outdoor attractions during peak afternoon in summer'
        ],
        events: [
          { name: 'Republic Day Parade', month: 'January', description: 'Grand parade along Rajpath' },
          { name: 'Qutub Festival', month: 'November/December', description: 'Cultural performances at Qutub Minar' },
          { name: 'International Mango Festival', month: 'July', description: 'Festival showcasing varieties of mangoes' },
          { name: 'Diwali', month: 'October/November', description: 'Festival of lights with beautiful decorations citywide' }
        ],
        transport_options: [
          { type: 'Delhi Metro', cost: 'Low', convenience: 'High', best_for: 'Efficient travel across the city' },
          { type: 'Auto-rickshaw', cost: 'Low', convenience: 'Medium', best_for: 'Short distances' },
          { type: 'Taxi/Cab', cost: 'Medium', convenience: 'High', best_for: 'Comfortable travel' },
          { type: 'Uber/Ola', cost: 'Medium', convenience: 'High', best_for: 'Reliable travel with AC' },
          { type: 'Bus', cost: 'Very Low', convenience: 'Low', best_for: 'Budget travelers' }
        ],
        typical_costs: {
          budget_per_day: '₹1,500-3,000',
          mid_range_per_day: '₹3,000-7,000',
          luxury_per_day: '₹7,000+',
          meals: { budget: '₹100-300', mid_range: '₹300-800', luxury: '₹800+' },
          accommodation: { budget: '₹500-1,500', mid_range: '₹1,500-5,000', luxury: '₹5,000+' }
        }
      },
      'agra': {
        best_time: 'October to March',
        seasons: {
          winter: { months: 'November to February', description: 'Cool and pleasant, ideal for sightseeing', temp_range: '7°C to 25°C' },
          summer: { months: 'March to June', description: 'Very hot, difficult for extended outdoor visits', temp_range: '25°C to 45°C' },
          monsoon: { months: 'July to September', description: 'Humid with moderate rainfall', temp_range: '25°C to 35°C' }
        },
        local_tips: [
          'Visit Taj Mahal at sunrise for the best views and fewer crowds',
          'Consider visiting on a full moon night for a special experience',
          'Buy marble souvenirs from government emporiums to ensure authenticity',
          'Use the Agra Cantt railway station for better connectivity',
          'Book a guide in advance for historical context'
        ],
        avoid: [
          'Unauthorized guides who may overcharge',
          'Visiting the Taj Mahal on Fridays (closed for prayer)',
          'Carrying large bags to monuments (limited storage facilities)',
          'Day trips that rush through the monuments'
        ],
        events: [
          { name: 'Taj Mahotsav', month: 'February', description: 'Cultural festival showcasing arts, crafts, and cuisine' },
          { name: 'Ram Barat', month: 'August/September', description: 'Traditional procession celebrating Lord Ram\'s marriage' },
          { name: 'Bateshwar Fair', month: 'October/November', description: 'Religious fair near Bateshwar temples' }
        ],
        transport_options: [
          { type: 'Auto-rickshaw', cost: 'Low', convenience: 'Medium', best_for: 'Travel within the city' },
          { type: 'Taxi/Cab', cost: 'Medium', convenience: 'High', best_for: 'Visiting multiple monuments' },
          { type: 'Cycle Rickshaw', cost: 'Very Low', convenience: 'Low', best_for: 'Short distances in old city areas' },
          { type: 'Uber/Ola', cost: 'Medium', convenience: 'High', best_for: 'Reliable travel with AC' },
          { type: 'Tonga (Horse Carriage)', cost: 'Low', convenience: 'Medium', best_for: 'Traditional experience around Taj area' }
        ],
        typical_costs: {
          budget_per_day: '₹1,500-3,000',
          mid_range_per_day: '₹3,000-6,000',
          luxury_per_day: '₹6,000+',
          meals: { budget: '₹100-300', mid_range: '₹300-700', luxury: '₹700+' },
          accommodation: { budget: '₹500-1,500', mid_range: '₹1,500-4,000', luxury: '₹4,000+' }
        }
      }
    };
    
    // Generic tips for any location
    const genericTips = {
      general: [
        'Research local customs and traditions before visiting',
        'Learn a few basic phrases in the local language',
        'Keep a copy of your identification documents',
        'Get travel insurance that covers medical emergencies',
        'Register with your country\'s embassy if traveling internationally'
      ],
      safety: [
        'Keep emergency contact numbers handy',
        'Be aware of common tourist scams in the area',
        'Use hotel safes for valuable items',
        'Avoid displaying expensive jewelry or electronics',
        'Stay hydrated and protect yourself from the sun'
      ],
      packing: [
        'Pack appropriate clothing for the local climate and cultural norms',
        'Bring necessary medications and a basic first aid kit',
        'Carry a universal power adapter for your electronics',
        'Use packing cubes to organize your luggage efficiently',
        'Pack a reusable water bottle and shopping bag'
      ]
    };
    
    // Try to find location-specific tips
    const locationKey = name.toLowerCase().trim().replace(/\s+/g, ' ').split(' ')[0];
    const specificTips = locationTips[locationKey] || null;
    
    // Prepare response data
    const tipsData = {
      location: {
        name: firstResult.name,
        address: firstResult.formatted_address,
        place_id: firstResult.place_id,
        photo_reference: firstResult.photos && firstResult.photos.length > 0 ? firstResult.photos[0].photo_reference : null
      },
      destination_tips: specificTips,
      general_travel_tips: genericTips,
      timestamp: new Date().toISOString()
    };
    
    // Create a cache key for tips data
    const cacheKey = generateCacheKey('travel-tips', { location: name });
    
    // Save to cache with a long TTL as this data doesn't change frequently
    cache.set(cacheKey, tipsData, 604800000); // 7 days
    
    res.json(tipsData);
  } catch (error) {
    console.error('Error getting travel tips:', error.message);
    if (error.response) {
      console.error('API response:', error.response.data);
    }
    
    if (!res.headersSent) {
      res.status(500).json({ 
        error: 'Failed to get travel tips', 
        details: error.message,
        timestamp: new Date().toISOString()
      });
    } else {
      next(error);
    }
  }
};

/**
 * Get simplified popular destinations by location name
 */
exports.getSimplifiedPopularDestinations = async (req, res, next) => {
  try {
    const { name } = req.query;
    
    if (!name) {
      return res.status(400).json({
        error: true,
        message: "Location name is required"
      });
    }
    
    // Normalize the input location
    const normalizedLocation = name.toLowerCase().trim();
    
    // Define Indian city mappings for better results
    const indianLocations = {
      'delhi': 'Delhi, India',
      'mumbai': 'Mumbai, Maharashtra, India',
      'bangalore': 'Bangalore, Karnataka, India',
      'bengaluru': 'Bangalore, Karnataka, India',
      'hyderabad': 'Hyderabad, Telangana, India',
      'chennai': 'Chennai, Tamil Nadu, India',
      'kolkata': 'Kolkata, West Bengal, India',
      'jaipur': 'Jaipur, Rajasthan, India',
      'agra': 'Agra, Uttar Pradesh, India',
      'goa': 'Goa, India',
      'kerala': 'Kerala, India',
      'varanasi': 'Varanasi, Uttar Pradesh, India',
      'udaipur': 'Udaipur, Rajasthan, India',
      'rishikesh': 'Rishikesh, Uttarakhand, India'
    };
    
    // Use mapped location if available, otherwise use the input
    const searchLocation = indianLocations[normalizedLocation] || name;

    // First, find the location coordinates
    const locationUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(searchLocation)}&inputtype=textquery&fields=place_id,geometry,name,formatted_address,photos&key=${process.env.GOOGLE_PLACES_API_KEY}`;
    
    const locationResponse = await fetch(locationUrl);
    const locationData = await locationResponse.json();
    
    if (locationData.status !== 'OK' || !locationData.candidates || locationData.candidates.length === 0) {
      return res.status(404).json({
        error: true,
        message: "No location found with that name",
        location: searchLocation
      });
    }
    
    const mainLocation = locationData.candidates[0];
    const location = mainLocation.geometry ? mainLocation.geometry.location : null;
    
    if (!location) {
      return res.status(404).json({
        error: true,
        message: "No coordinate information found for this location",
        location: searchLocation
      });
    }
    
    // Now search for popular places/destinations nearby
    const placesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.lat},${location.lng}&radius=20000&type=tourist_attraction&rankby=prominence&key=${process.env.GOOGLE_PLACES_API_KEY}`;
    
    const placesResponse = await fetch(placesUrl);
    const placesData = await placesResponse.json();
    
    if (placesData.status !== 'OK' || !placesData.results) {
      return res.status(404).json({
        error: true,
        message: "No destinations found near this location",
        location: searchLocation
      });
    }
    
    // Format the results with only essential information
    const destinations = placesData.results.map(place => ({
      name: place.name,
      address: place.vicinity,
      rating: place.rating || 0,
      total_ratings: place.user_ratings_total || 0,
      photo_reference: place.photos && place.photos[0] ? place.photos[0].photo_reference : null
    }));
    
    return res.status(200).json({
      location: mainLocation.formatted_address || searchLocation,
      destinations: destinations
    });
    
  } catch (error) {
    console.error('Error in getSimplifiedPopularDestinations:', error);
    return res.status(500).json({
      error: true,
      message: "Server error while fetching destinations",
      details: error.message
    });
  }
}; 