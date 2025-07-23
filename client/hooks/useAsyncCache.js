import { useState, useEffect, useCallback } from 'react';

export function useAsyncCache() {
  const [cache, setCache] = useState(new Map());

  const getCachedData = useCallback((key) => {
    return cache.get(key);
  }, [cache]);

  const setCachedData = useCallback((key, data) => {
    setCache(prev => new Map(prev).set(key, data));
  }, []);

  const clearCache = useCallback(() => {
    setCache(new Map());
  }, []);

  return { getCachedData, setCachedData, clearCache };
}
