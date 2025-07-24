import { useState, useEffect, useCallback, useRef, useMemo } from 'react';

// Custom hook for debounced values
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Custom hook for throttled callbacks
export const useThrottle = (callback, delay) => {
  const lastRun = useRef(Date.now());

  return useCallback((...args) => {
    if (Date.now() - lastRun.current >= delay) {
      callback(...args);
      lastRun.current = Date.now();
    }
  }, [callback, delay]);
};

// Custom hook for image lazy loading
export const useLazyImage = (src, placeholder = '') => {
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [imageRef, setImageRef] = useState();

  useEffect(() => {
    let observer;
    
    if (imageRef && imageSrc === placeholder) {
      if (IntersectionObserver) {
        observer = new IntersectionObserver(
          entries => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                setImageSrc(src);
                observer.unobserve(imageRef);
              }
            });
          },
          { threshold: 0.1 }
        );
        observer.observe(imageRef);
      } else {
        // Fallback: load image immediately
        setImageSrc(src);
      }
    }
    
    return () => {
      if (observer && observer.unobserve) {
        observer.unobserve(imageRef);
      }
    };
  }, [imageRef, imageSrc, placeholder, src]);

  return [setImageRef, imageSrc];
};

// Custom hook for API calls with caching and error handling
export const useAPI = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const cache = useRef(new Map());

  const fetchData = useCallback(async () => {
    const cacheKey = `${url}:${JSON.stringify(options)}`;
    
    // Check cache first
    if (cache.current.has(cacheKey)) {
      const cachedData = cache.current.get(cacheKey);
      if (Date.now() - cachedData.timestamp < 5 * 60 * 1000) { // 5 minutes
        setData(cachedData.data);
        setLoading(false);
        return;
      }
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      // Cache the result
      cache.current.set(cacheKey, {
        data: result,
        timestamp: Date.now()
      });
      
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [url, options]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch };
};

// Custom hook for optimized list rendering
export const useVirtualList = (items, itemHeight, containerHeight) => {
  const [scrollTop, setScrollTop] = useState(0);
  
  const visibleItems = useMemo(() => {
    const visibleStart = Math.floor(scrollTop / itemHeight);
    const visibleEnd = Math.min(
      visibleStart + Math.ceil(containerHeight / itemHeight) + 1,
      items.length
    );
    
    return items.slice(visibleStart, visibleEnd).map((item, index) => ({
      ...item,
      index: visibleStart + index
    }));
  }, [items, itemHeight, containerHeight, scrollTop]);

  const totalHeight = items.length * itemHeight;
  const offsetY = Math.floor(scrollTop / itemHeight) * itemHeight;

  return {
    visibleItems,
    totalHeight,
    offsetY,
    onScroll: useCallback((e) => {
      setScrollTop(e.target.scrollTop);
    }, [])
  };
};

// Custom hook for performance monitoring
export const usePerformanceMonitor = (componentName) => {
  const renderCount = useRef(0);
  const startTime = useRef(performance.now());

  useEffect(() => {
    renderCount.current += 1;
  });

  useEffect(() => {
    return () => {
      const endTime = performance.now();
      const duration = endTime - startTime.current;
      
      if (process.env.NODE_ENV === 'development') {
        console.log(`${componentName} - Renders: ${renderCount.current}, Duration: ${duration.toFixed(2)}ms`);
      }
    };
  }, [componentName]);

  return {
    renderCount: renderCount.current,
    measureRender: useCallback((fn) => {
      const start = performance.now();
      const result = fn();
      const end = performance.now();
      
      if (process.env.NODE_ENV === 'development') {
        console.log(`${componentName} render took ${(end - start).toFixed(2)}ms`);
      }
      
      return result;
    }, [componentName])
  };
};

// Custom hook for memory-efficient state updates
export const useOptimizedState = (initialState) => {
  const [state, setState] = useState(initialState);
  const stateRef = useRef(state);

  const optimizedSetState = useCallback((updater) => {
    if (typeof updater === 'function') {
      const newState = updater(stateRef.current);
      if (JSON.stringify(newState) !== JSON.stringify(stateRef.current)) {
        stateRef.current = newState;
        setState(newState);
      }
    } else {
      if (JSON.stringify(updater) !== JSON.stringify(stateRef.current)) {
        stateRef.current = updater;
        setState(updater);
      }
    }
  }, []);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  return [state, optimizedSetState];
};
