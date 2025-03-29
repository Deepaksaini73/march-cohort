const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categoriesController');
const rateLimit = require('express-rate-limit');

// Rate limiter for API requests
const categoriesLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes'
});

// Apply rate limiter to all routes
router.use(categoriesLimiter);

// Categories endpoints
router.get('/', categoriesController.getAllCategories);
router.get('/:slug', categoriesController.getCategoryBySlug);
router.get('/:slug/tours', categoriesController.getToursByCategory);

module.exports = router; 