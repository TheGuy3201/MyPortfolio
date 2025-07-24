// API Caching utility for better performance
class APICache {
  constructor(maxSize = 50, ttl = 5 * 60 * 1000) { // 5 minutes default TTL
    this.cache = new Map();
    this.maxSize = maxSize;
    this.ttl = ttl;
  }

  generateKey(url, options = {}) {
    const method = options.method || 'GET';
    const body = options.body || '';
    return `${method}:${url}:${body}`;
  }

  get(key) {
    const item = this.cache.get(key);
    if (!item) return null;

    const now = Date.now();
    if (now > item.expiry) {
      this.cache.delete(key);
      return null;
    }

    // Move to end (LRU)
    this.cache.delete(key);
    this.cache.set(key, item);
    return item.data;
  }

  set(key, data) {
    // Remove oldest if at capacity
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }

    this.cache.set(key, {
      data,
      expiry: Date.now() + this.ttl
    });
  }

  clear() {
    this.cache.clear();
  }

  delete(key) {
    return this.cache.delete(key);
  }

  // Invalidate cache entries by pattern
  invalidatePattern(pattern) {
    const regex = new RegExp(pattern);
    for (const key of this.cache.keys()) {
      if (regex.test(key)) {
        this.cache.delete(key);
      }
    }
  }
}

// Global cache instance
const apiCache = new APICache();

// Enhanced fetch with caching
export const cachedFetch = async (url, options = {}) => {
  const cacheKey = apiCache.generateKey(url, options);
  
  // Only cache GET requests
  if (!options.method || options.method === 'GET') {
    const cached = apiCache.get(cacheKey);
    if (cached) {
      console.log('Cache hit for:', url);
      return Promise.resolve(cached);
    }
  }

  try {
    const response = await fetch(url, options);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Cache successful GET responses
    if ((!options.method || options.method === 'GET') && response.ok) {
      apiCache.set(cacheKey, {
        ...response,
        json: () => Promise.resolve(data)
      });
    }

    return {
      ...response,
      json: () => Promise.resolve(data)
    };
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

// Cache management utilities
export const clearAPICache = () => {
  apiCache.clear();
};

export const invalidateCache = (pattern) => {
  apiCache.invalidatePattern(pattern);
};

// Pre-fetch utility for critical resources
export const prefetch = (urls) => {
  urls.forEach(url => {
    cachedFetch(url).catch(err => 
      console.warn('Prefetch failed for:', url, err)
    );
  });
};

export default apiCache;
