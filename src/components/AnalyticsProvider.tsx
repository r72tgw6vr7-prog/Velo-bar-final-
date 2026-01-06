import React from 'react';
import { useAnalytics, useScrollDepthTracking, useTimeOnPageTracking } from '../hooks/useAnalytics';
import { useWebVitals } from '../hooks/useWebVitals';

interface AnalyticsProviderProps {
  children: React.ReactNode;
}

/**
 * Analytics Provider Component
 *
 * Wraps the app to provide comprehensive analytics tracking functionality.
 *
 * Features:
 * - Page view tracking
 * - Scroll depth tracking
 * - Time on page tracking
 * - Web Vitals performance monitoring (LCP, INP, CLS, FCP, TTFB)
 */
const AnalyticsProvider: React.FC<AnalyticsProviderProps> = ({ children }) => {
  // Initialize analytics hooks
  useAnalytics(); // Page view tracking
  useScrollDepthTracking(); // Scroll depth tracking
  useTimeOnPageTracking(); // Time on page tracking

  // Initialize Web Vitals performance monitoring
  useWebVitals({
    sendToGA: true, // Send metrics to Google Analytics
    reportAllChanges: false, // Only report final values
  });

  return <>{children}</>;
};

export default AnalyticsProvider;
