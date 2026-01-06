import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import analytics from '../utils/analytics';

/**
 * Custom hook for Google Analytics integration
 *
 * Features:
 * - Automatic page view tracking on route changes
 * - Easy access to analytics functions
 * - TypeScript support
 */
export const useAnalytics = () => {
  const location = useLocation();

  // Track page views automatically on route changes
  useEffect(() => {
    // Get page title from document or route
    const pageTitle = document.title;

    // Track the page view
    analytics.pageView(location.pathname + location.search, pageTitle);
  }, [location]);

  // Return analytics methods for manual tracking
  return {
    // Page tracking
    pageView: analytics.pageView.bind(analytics),
    event: analytics.event.bind(analytics),

    // Specific tracking methods
    trackBooking: analytics.trackBooking,
    trackGallery: analytics.trackGallery,
    trackForm: analytics.trackForm,
    trackEngagement: analytics.trackEngagement,

    // Debug info
    getDebugInfo: analytics.getDebugInfo.bind(analytics),
  };
};

/**
 * Hook for tracking scroll depth
 */
export const useScrollDepthTracking = () => {
  useEffect(() => {
    let maxScrollPercentage = 0;

    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = Math.round((scrollTop / documentHeight) * 100);

      if (scrollPercentage > maxScrollPercentage) {
        maxScrollPercentage = scrollPercentage;
        analytics.trackEngagement.scrollDepth(scrollPercentage);
      }
    };

    // Throttle scroll events
    let timeoutId: NodeJS.Timeout;
    const throttledHandleScroll = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(handleScroll, 100);
    };

    window.addEventListener('scroll', throttledHandleScroll);

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);
};

/**
 * Hook for tracking time on page
 */
export const useTimeOnPageTracking = () => {
  useEffect(() => {
    const startTime = Date.now();

    return () => {
      const timeSpent = Date.now() - startTime;
      // Track if user spent more than 30 seconds on page
      if (timeSpent > 30000) {
        analytics.event('time_on_page', {
          content_group1: 'engagement',
          time_spent_seconds: Math.round(timeSpent / 1000),
          page_path: window.location.pathname,
        });
      }
    };
  }, []);
};
