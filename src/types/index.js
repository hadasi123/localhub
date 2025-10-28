// Type definitions for LocalHub

// Weather types
export const WeatherTypes = {
  CLEAR: 'clear',
  CLOUDY: 'cloudy',
  RAINY: 'rainy',
  STORMY: 'stormy',
  SNOWY: 'snowy',
  FOGGY: 'foggy'
};

// Feature types
export const FeatureTypes = {
  LOST_AND_FOUND: 'lost-and-found',
  CARPOOL: 'carpool',
  UPDATES: 'updates',
  EDUCATION: 'education',
  BUSINESS: 'business',
  PHONE_BOOK: 'phone-book',
  SELL: 'sell'
};

// Weather data structure
export const createWeatherData = (data = {}) => ({
  temperature: data.temperature || 0,
  description: data.description || '',
  icon: data.icon || WeatherTypes.CLEAR,
  location: data.location || 'Israel',
  maxTemperature: data.maxTemperature || null,
  minTemperature: data.minTemperature || null,
  humidity: data.humidity || 0,
  windSpeed: data.windSpeed || 0,
  timestamp: data.timestamp || new Date().toISOString()
});

// Feature data structure
export const createFeatureData = (data = {}) => ({
  id: data.id || '',
  title: data.title || '',
  description: data.description || '',
  type: data.type || '',
  icon: data.icon || '',
  content: data.content || '',
  createdAt: data.createdAt || new Date().toISOString(),
  updatedAt: data.updatedAt || new Date().toISOString()
});

// Lost and Found item structure
export const createLostAndFoundItem = (data = {}) => ({
  id: data.id || '',
  title: data.title || '',
  description: data.description || '',
  location: data.location || '',
  date: data.date || new Date().toISOString(),
  contact: data.contact || '',
  type: data.type || 'lost', // 'lost' or 'found'
  image: data.image || '',
  status: data.status || 'active' // 'active', 'resolved', 'expired'
});

// Carpool item structure
export const createCarpoolItem = (data = {}) => ({
  id: data.id || '',
  to: data.to || '',
  date: data.date || '',
  time: data.time || '',
  contact: data.contact || '',
  description: data.description || '',
  createdAt: data.createdAt || new Date().toISOString(),
  status: data.status || 'active'
});

// Update item structure
export const createUpdateItem = (data = {}) => ({
  id: data.id || '',
  title: data.title || '',
  content: data.content || '',
  category: data.category || '',
  priority: data.priority || 'normal', // 'low', 'normal', 'high', 'urgent'
  date: data.date || new Date().toISOString(),
  author: data.author || '',
  tags: data.tags || []
});

// Education item structure
export const createEducationItem = (data = {}) => ({
  id: data.id || '',
  title: data.title || '',
  description: data.description || '',
  category: data.category || '',
  level: data.level || '', // 'beginner', 'intermediate', 'advanced'
  duration: data.duration || '',
  instructor: data.instructor || '',
  contact: data.contact || '',
  price: data.price || 0,
  schedule: data.schedule || '',
  location: data.location || '',
  status: data.status || 'active'
});

// Business item structure
export const createBusinessItem = (data = {}) => ({
  id: data.id || '',
  name: data.name || '',
  description: data.description || '',
  category: data.category || '',
  address: data.address || '',
  phone: data.phone || '',
  email: data.email || '',
  website: data.website || '',
  hours: data.hours || '',
  services: data.services || [],
  rating: data.rating || 0,
  reviews: data.reviews || 0,
  status: data.status || 'active'
});

// Phone book item structure
export const createPhoneBookItem = (data = {}) => ({
  id: data.id || '',
  name: data.name || '',
  phone: data.phone || '',
  email: data.email || '',
  address: data.address || '',
  category: data.category || '',
  description: data.description || '',
  emergency: data.emergency || false,
  status: data.status || 'active'
});

// Sell item structure
export const createSellItem = (data = {}) => ({
  id: data.id || '',
  title: data.title || '',
  description: data.description || '',
  price: data.price || 0,
  category: data.category || '',
  condition: data.condition || 'good', // 'new', 'like-new', 'good', 'fair', 'poor'
  images: data.images || [],
  seller: data.seller || '',
  contact: data.contact || '',
  location: data.location || '',
  date: data.date || new Date().toISOString(),
  status: data.status || 'active' // 'active', 'sold', 'expired'
});

// News data structure
export const createNewsData = (data = {}) => ({
  id: data.id || '',
  title: data.title || '',
  description: data.description || '',
  url: data.url || '',
  imageUrl: data.imageUrl || '',
  source: data.source || '',
  author: data.author || '',
  publishedAt: data.publishedAt || new Date().toISOString(),
  content: data.content || ''
});

// News response structure
export const createNewsResponse = (data = {}) => ({
  articles: data.articles || [],
  totalResults: data.totalResults || 0,
  timestamp: data.timestamp || new Date().toISOString()
});
