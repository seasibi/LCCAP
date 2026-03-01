// Analytics and Monitoring Utilities for LCCAP Application
// Comprehensive tracking, monitoring, and analytics system

import { useEffect, useCallback, useRef } from 'react';

// Analytics configuration
const ANALYTICS_CONFIG = {
  // Google Analytics 4
  GA4_MEASUREMENT_ID: process.env.REACT_APP_GA4_ID || 'G-XXXXXXXXXX',
  
  // Custom tracking endpoint
  CUSTOM_ENDPOINT: process.env.REACT_APP_ANALYTICS_ENDPOINT || '/api/analytics',
  
  // Session timeout (30 minutes)
  SESSION_TIMEOUT: 30 * 60 * 1000,
  
  // Performance metrics threshold
  PERFORMANCE_THRESHOLDS: {
    LCP: 2500,  // Largest Contentful Paint
    FID: 100,   // First Input Delay
    CLS: 0.1,   // Cumulative Layout Shift
    FCP: 1800,  // First Contentful Paint
    TTI: 3800   // Time to Interactive
  }
};

// Page view tracking
export const usePageTracking = () => {
  const lastTrackedPage = useRef(null);

  const trackPageView = useCallback((pageName, additionalData = {}) => {
    try {
      // Track with Google Analytics 4
      if (window.gtag) {
        window.gtag('config', ANALYTICS_CONFIG.GA4_MEASUREMENT_ID, {
          page_title: pageName,
          page_location: window.location.href,
          ...additionalData
        });
        
        window.gtag('event', 'page_view', {
          page_title: pageName,
          page_location: window.location.href
        });
      }

      // Track with custom endpoint
      trackCustomEvent('page_view', {
        pageName,
        url: window.location.href,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        ...additionalData
      });

      lastTrackedPage.current = pageName;
      console.log('Analytics: Page tracked:', pageName);
    } catch (error) {
      console.error('Analytics: Failed to track page view:', error);
    }
  }, []);

  return { trackPageView };
};

// Event tracking
export const useEventTracking = () => {
  const trackEvent = useCallback((eventName, parameters = {}) => {
    try {
      // Track with Google Analytics 4
      if (window.gtag) {
        window.gtag('event', eventName, {
          event_category: parameters.category || 'general',
          event_label: parameters.label,
          value: parameters.value,
          ...parameters
        });
      }

      // Track with custom endpoint
      trackCustomEvent('user_interaction', {
        eventName,
        timestamp: new Date().toISOString(),
        page: window.location.pathname,
        ...parameters
      });

      console.log('Analytics: Event tracked:', eventName, parameters);
    } catch (error) {
      console.error('Analytics: Failed to track event:', error);
    }
  }, []);

  const trackButtonClick = useCallback((buttonName, additionalData = {}) => {
    trackEvent('button_click', {
      category: 'engagement',
      label: buttonName,
      ...additionalData
    });
  }, [trackEvent]);

  const trackFormSubmit = useCallback((formName, additionalData = {}) => {
    trackEvent('form_submit', {
      category: 'conversion',
      label: formName,
      ...additionalData
    });
  }, [trackEvent]);

  const trackNavigation = useCallback((destination, additionalData = {}) => {
    trackEvent('navigation', {
      category: 'navigation',
      label: destination,
      ...additionalData
    });
  }, [trackEvent]);

  const trackSearch = useCallback((searchTerm, resultsCount, additionalData = {}) => {
    trackEvent('search', {
      category: 'search',
      label: searchTerm,
      value: resultsCount,
      ...additionalData
    });
  }, [trackEvent]);

  return {
    trackEvent,
    trackButtonClick,
    trackFormSubmit,
    trackNavigation,
    trackSearch
  };
};

// Performance monitoring
export const usePerformanceMonitoring = () => {
  const metrics = useRef({});

  useEffect(() => {
    // Monitor Core Web Vitals
    const observePerformance = () => {
      // Largest Contentful Paint (LCP)
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          if (entry.name === 'largest-contentful-paint') {
            metrics.current.lcp = entry.startTime;
            checkPerformanceThreshold('LCP', entry.startTime);
          }
        });
      }).observe({ entryTypes: ['largest-contentful-paint'] });

      // First Input Delay (FID)
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          if (entry.name === 'first-input') {
            metrics.current.fid = entry.processingStart - entry.startTime;
            checkPerformanceThreshold('FID', metrics.current.fid);
          }
        });
      }).observe({ entryTypes: ['first-input'] });

      // Cumulative Layout Shift (CLS)
      let clsValue = 0;
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        metrics.current.cls = clsValue;
        checkPerformanceThreshold('CLS', clsValue);
      }).observe({ entryTypes: ['layout-shift'] });
    };

    // Monitor page load performance
    const trackPageLoad = () => {
      if (window.performance && window.performance.timing) {
        const timing = window.performance.timing;
        const pageLoadTime = timing.loadEventEnd - timing.navigationStart;
        
        metrics.current.pageLoad = pageLoadTime;
        metrics.current.domContentLoaded = timing.domContentLoadedEventEnd - timing.navigationStart;
        metrics.current.firstPaint = timing.responseStart - timing.navigationStart;

        trackCustomEvent('performance_metrics', {
          pageLoadTime,
          domContentLoadedTime: metrics.current.domContentLoaded,
          firstPaintTime: metrics.current.firstPaint,
          timestamp: new Date().toISOString(),
          url: window.location.href
        });

        checkPerformanceThreshold('page_load', pageLoadTime);
      }
    };

    observePerformance();
    window.addEventListener('load', trackPageLoad);

    return () => {
      window.removeEventListener('load', trackPageLoad);
    };
  }, []);

  const checkPerformanceThreshold = (metric, value) => {
    const threshold = ANALYTICS_CONFIG.PERFORMANCE_THRESHOLDS[metric];
    if (threshold && value > threshold) {
      trackCustomEvent('performance_issue', {
        metric,
        value,
        threshold,
        exceedsThreshold: true,
        timestamp: new Date().toISOString()
      });
    }
  };

  const getMetrics = () => metrics.current;

  return { getMetrics };
};

// Error tracking
export const useErrorTracking = () => {
  const trackError = useCallback((error, errorInfo = {}) => {
    try {
      const errorData = {
        message: error.message || error,
        stack: error.stack,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent,
        ...errorInfo
      };

      // Track with Google Analytics
      if (window.gtag) {
        window.gtag('event', 'exception', {
          description: errorData.message,
          fatal: errorInfo.fatal || false
        });
      }

      // Track with custom endpoint
      trackCustomEvent('javascript_error', errorData);

      console.error('Analytics: Error tracked:', errorData);
    } catch (trackingError) {
      console.error('Analytics: Failed to track error:', trackingError);
    }
  }, []);

  const trackNetworkError = useCallback((url, status, error) => {
    try {
      const errorData = {
        type: 'network_error',
        url,
        status,
        error: error.message,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent
      };

      trackCustomEvent('network_error', errorData);
      console.error('Analytics: Network error tracked:', errorData);
    } catch (trackingError) {
      console.error('Analytics: Failed to track network error:', trackingError);
    }
  }, []);

  return { trackError, trackNetworkError };
};

// User behavior tracking
export const useUserBehaviorTracking = () => {
  const sessionStart = useRef(Date.now());
  const interactions = useRef([]);

  useEffect(() => {
    // Track session duration
    const trackSessionEnd = () => {
      const sessionDuration = Date.now() - sessionStart.current;
      
      trackCustomEvent('session_end', {
        duration: sessionDuration,
        interactions: interactions.current.length,
        timestamp: new Date().toISOString()
      });
    };

    // Track user interactions
    const trackInteraction = (event) => {
      const interaction = {
        type: event.type,
        target: event.target.tagName,
        timestamp: Date.now(),
        x: event.clientX,
        y: event.clientY
      };

      interactions.current.push(interaction);

      // Limit interactions array size
      if (interactions.current.length > 100) {
        interactions.current = interactions.current.slice(-50);
      }
    };

    // Track scroll depth
    let maxScrollDepth = 0;
    const trackScrollDepth = () => {
      const scrollDepth = Math.round(
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
      );
      
      if (scrollDepth > maxScrollDepth) {
        maxScrollDepth = scrollDepth;
        
        trackCustomEvent('scroll_depth', {
          depth: scrollDepth,
          maxDepth: maxScrollDepth,
          timestamp: new Date().toISOString()
        });
      }
    };

    // Add event listeners
    document.addEventListener('click', trackInteraction);
    document.addEventListener('scroll', trackScrollDepth, { passive: true });
    window.addEventListener('beforeunload', trackSessionEnd);

    return () => {
      document.removeEventListener('click', trackInteraction);
      document.removeEventListener('scroll', trackScrollDepth);
      window.removeEventListener('beforeunload', trackSessionEnd);
    };
  }, []);

  const trackTimeOnPage = useCallback((pageName) => {
    const timeSpent = Date.now() - sessionStart.current;
    
    trackCustomEvent('time_on_page', {
      pageName,
      duration: timeSpent,
      timestamp: new Date().toISOString()
    });
  }, []);

  return { trackTimeOnPage };
};

// Custom event tracking helper
const trackCustomEvent = (eventName, data) => {
  try {
    // Send to custom analytics endpoint
    fetch(ANALYTICS_CONFIG.CUSTOM_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Analytics-Event': eventName
      },
      body: JSON.stringify({
        eventName,
        data,
        sessionId: getSessionId(),
        userId: getUserId(),
        timestamp: new Date().toISOString()
      })
    }).catch(error => {
      console.error('Analytics: Failed to send custom event:', error);
    });
  } catch (error) {
    console.error('Analytics: Custom tracking error:', error);
  }
};

// Session management
const getSessionId = () => {
  let sessionId = sessionStorage.getItem('lccap_session_id');
  
  if (!sessionId) {
    sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    sessionStorage.setItem('lccap_session_id', sessionId);
  }
  
  return sessionId;
};

const getUserId = () => {
  // Get user ID from localStorage or generate anonymous ID
  let userId = localStorage.getItem('lccap_user_id');
  
  if (!userId) {
    userId = 'anon_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('lccap_user_id', userId);
  }
  
  return userId;
};

// A/B testing utilities
export const useABTesting = () => {
  const [variant, setVariant] = useState(null);

  useEffect(() => {
    const getVariant = () => {
      const testKey = 'lccap_ab_test';
      let savedVariant = localStorage.getItem(testKey);
      
      if (!savedVariant) {
        // Assign random variant (A or B)
        const variants = ['A', 'B'];
        savedVariant = variants[Math.floor(Math.random() * variants.length)];
        localStorage.setItem(testKey, savedVariant);
      }
      
      return savedVariant;
    };

    const currentVariant = getVariant();
    setVariant(currentVariant);

    // Track variant assignment
    trackCustomEvent('ab_test_assigned', {
      testKey: 'lccap_ui_variant',
      variant: currentVariant,
      timestamp: new Date().toISOString()
    });
  }, []);

  const trackABTestConversion = useCallback((conversionType) => {
    if (variant) {
      trackCustomEvent('ab_test_conversion', {
        testKey: 'lccap_ui_variant',
        variant,
        conversionType,
        timestamp: new Date().toISOString()
      });
    }
  }, [variant]);

  return { variant, trackABTestConversion };
};

// Heat map tracking
export const useHeatMapTracking = () => {
  const clicks = useRef([]);

  useEffect(() => {
    const trackClick = (event) => {
      const clickData = {
        x: event.clientX,
        y: event.clientY,
        timestamp: Date.now(),
        page: window.location.pathname,
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight
        }
      };

      clicks.current.push(clickData);

      // Limit clicks array size
      if (clicks.current.length > 100) {
        clicks.current = clicks.current.slice(-50);
      }

      // Send heat map data in batches
      if (clicks.current.length % 10 === 0) {
        trackCustomEvent('heat_map_data', {
          clicks: clicks.current.slice(-10),
          timestamp: new Date().toISOString()
        });
      }
    };

    document.addEventListener('click', trackClick);

    return () => {
      document.removeEventListener('click', trackClick);
    };
  }, []);

  return { clicks: clicks.current };
};

// Analytics initialization
export const initializeAnalytics = () => {
  try {
    // Load Google Analytics 4
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_CONFIG.GA4_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    window.gtag = function() {
      window.dataLayer.push(arguments);
    };

    // Track initial page view
    window.gtag('js', new Date());
    window.gtag('config', ANALYTICS_CONFIG.GA4_MEASUREMENT_ID, {
      anonymize_ip: true,
      send_page_view: false
    });

    console.log('Analytics: GA4 initialized');
  } catch (error) {
    console.error('Analytics: Failed to initialize GA4:', error);
  }
};

// Export analytics utilities
export default {
  usePageTracking,
  useEventTracking,
  usePerformanceMonitoring,
  useErrorTracking,
  useUserBehaviorTracking,
  useABTesting,
  useHeatMapTracking,
  initializeAnalytics,
  ANALYTICS_CONFIG
};
