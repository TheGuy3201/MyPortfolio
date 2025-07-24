import React, { createContext, useContext, useMemo, useCallback } from 'react';

const PerformanceContext = createContext();

export const usePerformance = () => {
  const context = useContext(PerformanceContext);
  if (!context) {
    throw new Error('usePerformance must be used within a PerformanceProvider');
  }
  return context;
};

export const PerformanceProvider = ({ children }) => {
  // Memoized debounce function
  const debounce = useCallback((func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(null, args), delay);
    };
  }, []);

  // Memoized throttle function
  const throttle = useCallback((func, delay) => {
    let shouldWait = false;
    return (...args) => {
      if (shouldWait) return;
      func(...args);
      shouldWait = true;
      setTimeout(() => {
        shouldWait = false;
      }, delay);
    };
  }, []);

  // Image lazy loading helper
  const lazyLoadImage = useCallback((imgElement) => {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const image = entry.target;
            image.src = image.dataset.src;
            image.classList.remove('lazy');
            image.classList.add('loaded');
            observer.unobserve(image);
          }
        });
      });
      imageObserver.observe(imgElement);
    } else {
      // Fallback for browsers without IntersectionObserver
      imgElement.src = imgElement.dataset.src;
    }
  }, []);

  // Performance monitoring
  const measurePerformance = useCallback((name, fn) => {
    if (typeof performance !== 'undefined' && performance.mark) {
      performance.mark(`${name}-start`);
      const result = fn();
      performance.mark(`${name}-end`);
      performance.measure(name, `${name}-start`, `${name}-end`);
      return result;
    }
    return fn();
  }, []);

  // Batch state updates
  const batchUpdates = useCallback((updates) => {
    // React 18 automatic batching handles this, but this is a fallback
    if (typeof React.unstable_batchedUpdates === 'function') {
      React.unstable_batchedUpdates(() => {
        updates.forEach(update => update());
      });
    } else {
      updates.forEach(update => update());
    }
  }, []);

  const value = useMemo(() => ({
    debounce,
    throttle,
    lazyLoadImage,
    measurePerformance,
    batchUpdates
  }), [debounce, throttle, lazyLoadImage, measurePerformance, batchUpdates]);

  return (
    <PerformanceContext.Provider value={value}>
      {children}
    </PerformanceContext.Provider>
  );
};

export default PerformanceProvider;
