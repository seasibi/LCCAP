// Performance Optimization Utilities for LCCAP Application
// Advanced performance enhancements for layout components

import { useCallback, useMemo, useRef, useEffect } from 'react';

// Memoization utilities
export const useMemoizedCallback = (callback, deps) => {
  return useCallback(callback, deps);
};

export const useMemoizedValue = (factory, deps) => {
  return useMemo(factory, deps);
};

// Intersection Observer for lazy loading
export const useIntersectionObserver = (ref, options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);
    
    observer.observe(element);
    
    return () => {
      observer.unobserve(element);
    };
  }, [ref, options]);
  
  return isIntersecting;
};

// Debounce utility for search and filter operations
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

// Throttle utility for scroll events
export const useThrottle = (callback, delay) => {
  const lastCall = useRef(0);
  
  return useCallback((...args) => {
    const now = new Date().getTime();
    if (now - lastCall.current >= delay) {
      callback(...args);
      lastCall.current = now;
    }
  }, [callback, delay]);
};

// Virtual scrolling utility for large lists
export const useVirtualScroll = (items, itemHeight, containerHeight) => {
  const [scrollTop, setScrollTop] = useState(0);
  
  const visibleItems = useMemo(() => {
    const startIndex = Math.floor(scrollTop / itemHeight);
    const endIndex = Math.min(
      startIndex + Math.ceil(containerHeight / itemHeight) + 1,
      items.length
    );
    
    return {
      items: items.slice(startIndex, endIndex),
      startIndex,
      endIndex,
      offsetY: startIndex * itemHeight
    };
  }, [items, itemHeight, containerHeight, scrollTop]);
  
  const handleScroll = useThrottle((e) => {
    setScrollTop(e.target.scrollTop);
  }, 16); // ~60fps
  
  return {
    visibleItems,
    handleScroll,
    totalHeight: items.length * itemHeight
  };
};

// Image lazy loading component
export const LazyImage = ({ src, alt, className, placeholder, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef();
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (imgRef.current) {
      observer.observe(imgRef.current);
    }
    
    return () => observer.disconnect();
  }, []);
  
  const handleLoad = () => {
    setIsLoaded(true);
  };
  
  return (
    <div ref={imgRef} className={`relative ${className}`} {...props}>
      {isInView && (
        <img
          src={src}
          alt={alt}
          onLoad={handleLoad}
          className={`transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}
      {!isLoaded && placeholder && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse">
          {placeholder}
        </div>
      )}
    </div>
  );
};

// Performance monitoring
export const PerformanceMonitor = {
  // Measure component render time
  measureRender: (componentName, renderFunction) => {
    const start = performance.now();
    const result = renderFunction();
    const end = performance.now();
    
    console.log(`${componentName} render time: ${end - start}ms`);
    return result;
  },
  
  // Track memory usage
  trackMemory: () => {
    if (performance.memory) {
      return {
        used: Math.round(performance.memory.usedJSHeapSize / 1048576),
        total: Math.round(performance.memory.totalJSHeapSize / 1048576),
        limit: Math.round(performance.memory.jsHeapSizeLimit / 1048576)
      };
    }
    return null;
  },
  
  // Log performance metrics
  logMetrics: (operation, startTime) => {
    const duration = performance.now() - startTime;
    console.log(`Performance: ${operation} took ${duration.toFixed(2)}ms`);
    return duration;
  }
};

// Optimized scroll handler
export const useOptimizedScroll = (callback) => {
  const ticking = useRef(false);
  
  return useCallback((event) => {
    if (!ticking.current) {
      requestAnimationFrame(() => {
        callback(event);
        ticking.current = false;
      });
      ticking.current = true;
    }
  }, [callback]);
};

// Resize observer utility
export const useResizeObserver = (ref, callback) => {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    
    const observer = new ResizeObserver((entries) => {
      callback(entries[0]);
    });
    
    observer.observe(element);
    
    return () => {
      observer.disconnect();
    };
  }, [ref, callback]);
};

// Bundle size optimization utilities
export const BundleOptimizer = {
  // Dynamic import utility
  lazyLoad: (importFunction) => {
    return React.lazy(importFunction);
  },
  
  // Code splitting helper
  splitComponent: (componentPath) => {
    return () => import(`../components/${componentPath}`);
  }
};

// Cache management
export const CacheManager = {
  // Simple LRU cache
  createLRUCache: (maxSize = 100) => {
    const cache = new Map();
    
    return {
      get: (key) => {
        if (cache.has(key)) {
          const value = cache.get(key);
          cache.delete(key);
          cache.set(key, value);
          return value;
        }
        return undefined;
      },
      
      set: (key, value) => {
        if (cache.size >= maxSize) {
          const firstKey = cache.keys().next().value;
          cache.delete(firstKey);
        }
        cache.set(key, value);
      },
      
      has: (key) => cache.has(key),
      clear: () => cache.clear(),
      size: () => cache.size
    };
  }
};

// Animation performance utilities
export const AnimationOptimizer = {
  // Use CSS transforms instead of position changes
  useTransform: (x, y) => {
    return `translate3d(${x}px, ${y}px, 0)`;
  },
  
  // Optimize animations with will-change
  optimizeElement: (element) => {
    element.style.willChange = 'transform, opacity';
  },
  
  // Clean up will-change after animation
  cleanupElement: (element) => {
    element.style.willChange = 'auto';
  }
};

// Network performance utilities
export const NetworkOptimizer = {
  // Request batching
  batchRequests: (requests, batchSize = 5, delay = 100) => {
    return new Promise((resolve) => {
      const results = [];
      let index = 0;
      
      const processBatch = () => {
        const batch = requests.slice(index, index + batchSize);
        index += batchSize;
        
        Promise.all(batch.map(req => fetch(req.url, req.options)))
          .then(responses => Promise.all(responses.map(r => r.json())))
          .then(data => {
            results.push(...data);
            
            if (index < requests.length) {
              setTimeout(processBatch, delay);
            } else {
              resolve(results);
            }
          });
      };
      
      processBatch();
    });
  },
  
  // Request caching
  cacheResponse: (url, data, ttl = 300000) => { // 5 minutes default TTL
    const cache = {};
    const key = url;
    
    cache[key] = {
      data,
      timestamp: Date.now(),
      ttl
    };
    
    return cache[key];
  },
  
  // Get cached response
  getCachedResponse: (url) => {
    const cache = {};
    const key = url;
    const cached = cache[key];
    
    if (cached && Date.now() - cached.timestamp < cached.ttl) {
      return cached.data;
    }
    
    return null;
  }
};

export default {
  useMemoizedCallback,
  useMemoizedValue,
  useIntersectionObserver,
  useDebounce,
  useThrottle,
  useVirtualScroll,
  LazyImage,
  PerformanceMonitor,
  useOptimizedScroll,
  useResizeObserver,
  BundleOptimizer,
  CacheManager,
  AnimationOptimizer,
  NetworkOptimizer
};
