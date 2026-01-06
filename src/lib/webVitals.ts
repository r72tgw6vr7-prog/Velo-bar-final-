/**
 * WEB VITALS PERFORMANCE MONITORING
 *
 * Tracks Core Web Vitals and sends metrics to Google Analytics 4.
 * Provides real-time performance monitoring in production.
 *
 * Core Web Vitals tracked:
 * - LCP (Largest Contentful Paint) - Loading performance
 * - FID (First Input Delay) - Interactivity
 * - CLS (Cumulative Layout Shift) - Visual stability
 *
 * Additional metrics:
 * - FCP (First Contentful Paint) - Initial rendering
 * - TTFB (Time to First Byte) - Server response time
 * - INP (Interaction to Next Paint) - Responsiveness
 */

import { onCLS, onLCP, onFCP, onTTFB, onINP, type Metric } from 'web-vitals';

/* eslint-disable no-console -- dev-only Web Vitals diagnostics when GA4 is unavailable or during local tuning */

// Performance thresholds (Google's recommended values)
// Note: FID (First Input Delay) has been replaced by INP (Interaction to Next Paint) in web-vitals v4
const THRESHOLDS = {
  LCP: { good: 2500, needsImprovement: 4000 }, // ms
  CLS: { good: 0.1, needsImprovement: 0.25 }, // score
  FCP: { good: 1800, needsImprovement: 3000 }, // ms
  TTFB: { good: 800, needsImprovement: 1800 }, // ms
  INP: { good: 200, needsImprovement: 500 }, // ms (replaces FID)
};

// Rating based on thresholds
function getRating(metric: Metric): 'good' | 'needs-improvement' | 'poor' {
  const thresholds = THRESHOLDS[metric.name as keyof typeof THRESHOLDS];

  if (!thresholds) return 'good';

  if (metric.value <= thresholds.good) {
    return 'good';
  } else if (metric.value <= thresholds.needsImprovement) {
    return 'needs-improvement';
  } else {
    return 'poor';
  }
}

/**
 * Send metric to Google Analytics 4
 */
function sendToAnalytics(metric: Metric) {
  // Check if gtag is available
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
    if (process.env.NODE_ENV === 'development') {
      console.log('Web Vital:', {
        name: metric.name,
        value: Math.round(metric.value),
        rating: metric.rating,
        delta: Math.round(metric.delta),
      });
    }
    return;
  }

  // Get the custom rating based on our thresholds
  const customRating = getRating(metric);

  // Send to GA4
  window.gtag('event', metric.name, {
    event_category: 'Web Vitals',
    event_label: metric.id,
    value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
    metric_id: metric.id,
    metric_value: metric.value,
    metric_delta: metric.delta,
    metric_rating: customRating,
    non_interaction: true,
  });

  // Also log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`Metric: ${metric.name}:`, {
      value: Math.round(metric.value),
      rating: customRating,
      id: metric.id.substring(0, 8) + '...',
    });
  }
}

/**
 * Send metric to custom endpoint (optional)
 */
async function sendToCustomEndpoint(metric: Metric) {
  try {
    await fetch('/api/web-vitals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: metric.name,
        value: metric.value,
        rating: getRating(metric),
        id: metric.id,
        delta: metric.delta,
        timestamp: Date.now(),
        url: window.location.href,
        userAgent: navigator.userAgent,
        connectionType: (navigator as Navigator & { connection?: { effectiveType?: string } })
          .connection?.effectiveType,
      }),
      keepalive: true, // Ensure request completes even if page is closing
    });
  } catch (error) {
    // Silently fail - don't impact user experience
    if (process.env.NODE_ENV === 'development') {
      console.error('Failed to send web vital to custom endpoint:', error);
    }
  }
}

/**
 * Initialize Web Vitals tracking
 *
 * @param options Configuration options
 */
export function initWebVitals(
  options: {
    sendToGA?: boolean;
    sendToCustomEndpoint?: boolean;
    reportAllChanges?: boolean;
  } = {},
) {
  const {
    sendToGA = true,
    sendToCustomEndpoint: useCustomEndpoint = false,
    reportAllChanges = false,
  } = options;

  const handler = (metric: Metric) => {
    if (sendToGA) {
      sendToAnalytics(metric);
    }

    if (useCustomEndpoint) {
      sendToCustomEndpoint(metric);
    }
  };

  // Track Core Web Vitals (CLS, LCP, INP)
  onCLS(handler, { reportAllChanges });
  onLCP(handler, { reportAllChanges });
  onINP(handler, { reportAllChanges }); // Replaces FID in web-vitals v4

  // Track additional metrics
  onFCP(handler, { reportAllChanges });
  onTTFB(handler, { reportAllChanges });
}

/**
 * Get current Web Vitals performance summary
 */
export function getWebVitalsReport(): Promise<{
  cls?: number;
  lcp?: number;
  fcp?: number;
  ttfb?: number;
  inp?: number; // Replaces FID
}> {
  return new Promise((resolve) => {
    const report: Record<string, number> = {};
    let metricsReceived = 0;
    const totalMetrics = 5;

    const collectMetric = (metric: Metric) => {
      report[metric.name.toLowerCase()] = metric.value;
      metricsReceived++;

      if (metricsReceived === totalMetrics) {
        resolve(report);
      }
    };

    // Collect all metrics with timeout
    onCLS(collectMetric);
    onLCP(collectMetric);
    onINP(collectMetric); // Replaces FID
    onFCP(collectMetric);
    onTTFB(collectMetric);

    // Timeout after 5 seconds
    setTimeout(() => {
      resolve(report);
    }, 5000);
  });
}

/**
 * Check if performance is good based on Core Web Vitals
 */
export async function isPerformanceGood(): Promise<boolean> {
  const vitals = await getWebVitalsReport();

  const lcpGood = !vitals.lcp || vitals.lcp <= THRESHOLDS.LCP.good;
  const inpGood = !vitals.inp || vitals.inp <= THRESHOLDS.INP.good;
  const clsGood = !vitals.cls || vitals.cls <= THRESHOLDS.CLS.good;

  return lcpGood && inpGood && clsGood;
}

/**
 * Manual metric tracking for custom events
 */
export function trackCustomMetric(name: string, value: number, metadata?: Record<string, unknown>) {
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'custom_metric', {
      event_category: 'Performance',
      event_label: name,
      value: Math.round(value),
      ...metadata,
      non_interaction: true,
    });
  }

  if (process.env.NODE_ENV === 'development') {
    console.log(`Metric: Custom Metric: ${name}`, { value, ...metadata });
  }
}

/**
 * Track component render time
 */
export function trackComponentRender(componentName: string, renderTime: number) {
  trackCustomMetric(`component_render_${componentName}`, renderTime, {
    component: componentName,
  });
}

/**
 * Track API call duration
 */
export function trackApiCall(endpoint: string, duration: number, status: number) {
  trackCustomMetric(`api_call_${endpoint.replace(/\//g, '_')}`, duration, {
    endpoint,
    status,
    duration_ms: duration,
  });
}

/**
 * Track image loading time
 */
export function trackImageLoad(src: string, duration: number) {
  trackCustomMetric('image_load', duration, {
    src: src.substring(0, 100), // Truncate long URLs
    duration_ms: duration,
  });
}

// Export types for use in other modules
export type { Metric };
export { THRESHOLDS };

// Default export for convenience
export default {
  init: initWebVitals,
  getReport: getWebVitalsReport,
  isGood: isPerformanceGood,
  trackCustom: trackCustomMetric,
  trackComponent: trackComponentRender,
  trackApi: trackApiCall,
  trackImage: trackImageLoad,
};
