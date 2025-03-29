// Tour categories data (in-memory for demo)
const tourCategories = [
  {
    id: 1,
    name: 'Mountain',
    slug: 'mountain',
    imageUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    tourCount: 356,
    activityCount: 264,
    description: 'Explore majestic mountain ranges, challenging peaks, and breathtaking views with our mountain tours and activities.'
  },
  {
    id: 2,
    name: 'Safari',
    slug: 'safari',
    imageUrl: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    tourCount: 234,
    activityCount: 156,
    description: 'Experience wildlife in its natural habitat with our safari tours that take you through some of the world\'s most stunning national parks.'
  },
  {
    id: 3,
    name: 'Desert',
    slug: 'desert',
    imageUrl: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    tourCount: 178,
    activityCount: 120,
    description: 'Discover the stark beauty and unique landscapes of the world\'s most fascinating deserts with our specialized desert tours.'
  },
  {
    id: 4,
    name: 'Flower',
    slug: 'flower',
    imageUrl: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    tourCount: 89,
    activityCount: 45,
    description: 'Witness the spectacular beauty of flower blooms and botanical gardens around the world with our seasonal flower tours.'
  },
  {
    id: 5,
    name: 'Beach',
    slug: 'beach',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    tourCount: 412,
    activityCount: 290,
    description: 'Relax and unwind on the world\'s most beautiful beaches with our beach destination tours and activities.'
  },
  {
    id: 6,
    name: 'Temples',
    slug: 'temples',
    imageUrl: 'https://images.unsplash.com/photo-1563994738562-4fd5a1ee7ecf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    tourCount: 267,
    activityCount: 189,
    description: 'Explore ancient temples and spiritual sites around the world, experiencing the rich cultural heritage and history.'
  },
  {
    id: 7,
    name: 'Yacht',
    slug: 'yacht',
    imageUrl: 'https://images.unsplash.com/photo-1599847022902-f64cc1ae97fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    tourCount: 145,
    activityCount: 98,
    description: 'Set sail on luxurious yacht tours, exploring coastlines and enjoying the freedom of the open water.'
  },
  {
    id: 8,
    name: 'Valley',
    slug: 'valley',
    imageUrl: 'https://images.unsplash.com/photo-1511497584788-876760111969?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    tourCount: 203,
    activityCount: 156,
    description: 'Experience the serene beauty of valleys with lush landscapes, rivers, and unique geological formations.'
  },
  {
    id: 9,
    name: 'City',
    slug: 'city',
    imageUrl: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    tourCount: 320,
    activityCount: 280,
    description: 'Explore vibrant urban landscapes, iconic architecture, and cultural hotspots with our guided city tours.'
  },
  {
    id: 10,
    name: 'Island',
    slug: 'island',
    imageUrl: 'https://images.unsplash.com/photo-1499678329028-101435549a4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    tourCount: 256,
    activityCount: 178,
    description: 'Discover paradise on our island tours featuring pristine beaches, unique ecosystems, and stunning coastal views.'
  },
  {
    id: 11,
    name: 'Historical',
    slug: 'historical',
    imageUrl: 'https://images.unsplash.com/photo-1569407228235-2a68488ef766?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    tourCount: 290,
    activityCount: 210,
    description: 'Journey through time with our historical tours showcasing ancient ruins, significant landmarks, and cultural heritage sites.'
  },
  {
    id: 12,
    name: 'Winter',
    slug: 'winter',
    imageUrl: 'https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    tourCount: 180,
    activityCount: 140,
    description: 'Embrace the magic of winter with snow adventures, skiing resorts, and cozy alpine experiences.'
  }
];

// Sample tours data for each category
const toursData = {
  mountain: [
    {
      id: 101,
      title: 'Himalayan Adventure Trek',
      imageUrl: 'https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      price: 42500,
      rating: 4.9,
      reviewCount: 187,
      location: 'Himalayas, India',
      duration: '7 days'
    },
    {
      id: 102,
      title: 'Mount Everest Base Camp',
      imageUrl: 'https://images.unsplash.com/photo-1570751057993-3e03038ea942?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      price: 68000,
      rating: 4.8,
      reviewCount: 225,
      location: 'Nepal',
      duration: '14 days'
    },
    {
      id: 103,
      title: 'Swiss Alps Hiking Tour',
      imageUrl: 'https://images.unsplash.com/photo-1507039915464-9d829b6d2d78?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      price: 89500,
      rating: 4.7,
      reviewCount: 163,
      location: 'Switzerland',
      duration: '5 days'
    },
    {
      id: 104,
      title: 'Rocky Mountain Explorer',
      imageUrl: 'https://images.unsplash.com/photo-1514282406778-e26ebf76b3e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      price: 76800,
      rating: 4.6,
      reviewCount: 142,
      location: 'Colorado, USA',
      duration: '6 days'
    },
    {
      id: 105,
      title: 'Mount Fuji Sunrise Trek',
      imageUrl: 'https://images.unsplash.com/photo-1546529249-8ed5456b60a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      price: 52800,
      rating: 4.8,
      reviewCount: 198,
      location: 'Japan',
      duration: '3 days'
    },
    {
      id: 106,
      title: 'Andes Mountain Expedition',
      imageUrl: 'https://images.unsplash.com/photo-1489447068241-b3490214e879?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      price: 94500,
      rating: 4.9,
      reviewCount: 167,
      location: 'Peru',
      duration: '10 days'
    }
  ],
  safari: [
    {
      id: 201,
      title: 'Serengeti Wildlife Safari',
      imageUrl: 'https://images.unsplash.com/photo-1523805009345-7448845a9e53?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      price: 158900,
      rating: 4.9,
      reviewCount: 215,
      location: 'Tanzania',
      duration: '8 days'
    },
    {
      id: 202,
      title: 'Kruger National Park Experience',
      imageUrl: 'https://images.unsplash.com/photo-1534777367038-9404f45b869a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      price: 143500,
      rating: 4.8,
      reviewCount: 176,
      location: 'South Africa',
      duration: '6 days'
    },
    {
      id: 203,
      title: 'Masai Mara Migration Safari',
      imageUrl: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      price: 178000,
      rating: 4.9,
      reviewCount: 192,
      location: 'Kenya',
      duration: '7 days'
    },
    {
      id: 204,
      title: 'Ranthambore Tiger Safari',
      imageUrl: 'https://images.unsplash.com/photo-1551972251-12070d63502a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      price: 38500,
      rating: 4.7,
      reviewCount: 148,
      location: 'Rajasthan, India',
      duration: '3 days'
    }
  ],
  beach: [
    {
      id: 301,
      title: 'Goa Beach Getaway',
      imageUrl: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      price: 22500,
      rating: 4.6,
      reviewCount: 312,
      location: 'Goa, India',
      duration: '5 days'
    },
    {
      id: 302,
      title: 'Kerala Coastal Explorer',
      imageUrl: 'https://images.unsplash.com/photo-1579619087997-47da653ae480?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      price: 28700,
      rating: 4.7,
      reviewCount: 243,
      location: 'Kerala, India',
      duration: '7 days'
    },
    {
      id: 303,
      title: 'Maldives Island Escape',
      imageUrl: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      price: 189000,
      rating: 4.9,
      reviewCount: 428,
      location: 'Maldives',
      duration: '6 days'
    },
    {
      id: 304,
      title: 'Bali Beach Retreat',
      imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      price: 108000,
      rating: 4.8,
      reviewCount: 356,
      location: 'Bali, Indonesia',
      duration: '8 days'
    },
    {
      id: 305,
      title: 'Santorini Coastal Wonders',
      imageUrl: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      price: 157000,
      rating: 4.9,
      reviewCount: 287,
      location: 'Greece',
      duration: '7 days'
    }
  ],
  city: [
    {
      id: 401,
      title: 'Tokyo Urban Explorer',
      imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      price: 129800,
      rating: 4.8,
      reviewCount: 235,
      location: 'Japan',
      duration: '5 days'
    },
    {
      id: 402,
      title: 'Paris City of Lights',
      imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      price: 145000,
      rating: 4.9,
      reviewCount: 312,
      location: 'France',
      duration: '6 days'
    },
    {
      id: 403,
      title: 'New York City Break',
      imageUrl: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      price: 168000,
      rating: 4.7,
      reviewCount: 285,
      location: 'USA',
      duration: '5 days'
    },
    {
      id: 404,
      title: 'Dubai Modern Marvels',
      imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      price: 148000,
      rating: 4.8,
      reviewCount: 276,
      location: 'UAE',
      duration: '6 days'
    },
    {
      id: 405,
      title: 'Delhi-Agra-Jaipur Golden Triangle',
      imageUrl: 'https://images.unsplash.com/photo-1587135941948-670b381f08ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      price: 45000,
      rating: 4.7,
      reviewCount: 189,
      location: 'India',
      duration: '7 days'
    }
  ]
};

// Get all categories
exports.getAllCategories = async (req, res) => {
  try {
    res.status(200).json(tourCategories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ 
      error: true, 
      message: 'Failed to fetch categories',
      details: error.message
    });
  }
};

// Get single category by slug
exports.getCategoryBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    if (!slug) {
      return res.status(400).json({ error: true, message: 'Category slug is required' });
    }

    const category = tourCategories.find(cat => cat.slug === slug);

    if (!category) {
      return res.status(404).json({ error: true, message: 'Category not found' });
    }

    res.status(200).json(category);
  } catch (error) {
    console.error('Error fetching category:', error);
    res.status(500).json({ 
      error: true, 
      message: 'Failed to fetch category',
      details: error.message
    });
  }
};

// Get tours by category slug
exports.getToursByCategory = async (req, res) => {
  try {
    const { slug } = req.params;

    if (!slug) {
      return res.status(400).json({ error: true, message: 'Category slug is required' });
    }

    // Check if category exists
    const category = tourCategories.find(cat => cat.slug === slug);
    if (!category) {
      return res.status(404).json({ error: true, message: 'Category not found' });
    }

    // Get tours for this category
    const tours = toursData[slug] || [];

    res.status(200).json(tours);
  } catch (error) {
    console.error('Error fetching tours by category:', error);
    res.status(500).json({ 
      error: true, 
      message: 'Failed to fetch tours for this category',
      details: error.message
    });
  }
}; 