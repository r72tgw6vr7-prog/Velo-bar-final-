/**
 * WEB VITALS REACT HOOK
 *
 * React hook for tracking Web Vitals performance metrics.
 * Automatically initializes tracking when component mounts.
 */

import { useEffect, useState } from 'react';
import webVitals from '@/lib/webVitals';

/* eslint-disable no-console -- uses console for dev-only Web Vitals diagnostics and initialization logs */

interface WebVitalsState {
  cls?: number;
  lcp?: number;
  fcp?: number;
  ttfb?: number;
  inp?: number;
  isGood?: boolean;
  loading: boolean;
}

/**
 * Hook to initialize Web Vitals tracking
 *
 * @param options Configuration options
 * @returns void
 *
 * @example
 * ```tsx
 * function App() {
 *   useWebVitals({ sendToGA: true });
 *   return <div>App Content</div>;
 * }
 * ```
 */
export function useWebVitals(options?: {
  sendToGA?: boolean;
  sendToCustomEndpoint?: boolean;
  reportAllChanges?: boolean;
}) {
  // eslint-disable-next-line react-hooks/exhaustive-deps -- run once on mount; options are treated as static configuration
  useEffect(() => {
    // Initialize Web Vitals tracking
    webVitals.init(options);

    // Log initialization in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Web Vitals tracking initialized');
    }
  }, []); // Empty deps - only initialize once
}

/**
 * Hook to get current Web Vitals metrics
 *
 * @returns Current Web Vitals state
 *
 * @example
 * ```tsx
 * function PerformanceDashboard() {
 *   const vitals = useWebVitalsReport();
 *
 *   if (vitals.loading) return <div>Loading metrics...</div>;
 *
 *   return (
 *     <div>
 *       <p>LCP: {vitals.lcp}ms</p>
 *       <p>Performance: {vitals.isGood ? 'Good' : 'Needs Improvement'}</p>
 *     </div>
 *   );
 * }
 * ```
 */
export function useWebVitalsReport(): WebVitalsState {
  const [state, setState] = useState<WebVitalsState>({
    loading: true,
  });

  useEffect(() => {
    let mounted = true;

    // Get initial report
    webVitals.getReport().then(async (report) => {
      if (!mounted) return;

      const isGood = await webVitals.isGood();

      setState({
        ...report,
        isGood,
        loading: false,
      });
    });

    return () => {
      mounted = false;
    };
  }, []);

  return state;
}

/**
 * Hook to track component render performance
 *
 * @param componentName Name of the component
 *
 * @example
 * ```tsx
 * function ExpensiveComponent() {
 *   useComponentPerformance('ExpensiveComponent');
 *
 *   // Your component logic
 *   return <div>...</div>;
 * }
 * ```
 */
export function useComponentPerformance(componentName: string) {
  useEffect(() => {
    const startTime = performance.now();

    return () => {
      const renderTime = performance.now() - startTime;

      // Only track if render took more than 50ms
      if (renderTime > 50) {
        webVitals.trackComponent(componentName, renderTime);
      }
    };
  }, [componentName]);
}

/**
 * Hook to track API call performance
 *
 * @returns Function to track API calls
 *
 * @example
 * ```tsx
 * function DataFetcher() {
 *   const trackApi = useApiPerformance();
 *
 *   const fetchData = async () => {
 *     const startTime = performance.now();
 *     const response = await fetch('/api/data');
 *     const duration = performance.now() - startTime;
 *
 *     trackApi('/api/data', duration, response.status);
 *   };
 *
 *   return <button onClick={fetchData}>Fetch</button>;
 * }
 * ```
 */
export function useApiPerformance() {
  return (endpoint: string, duration: number, status: number) => {
    webVitals.trackApi(endpoint, duration, status);
  };
}

/**
 * Hook to track image loading performance
 *
 * @returns Function to track image loads
 *
 * @example
 * ```tsx
 * function ImageGallery() {
 *   const trackImage = useImagePerformance();
 *
 *   const handleImageLoad = (e: Event) => {
 *     const img = e.target as HTMLImageElement;
 *     const duration = performance.now() - loadStartTime;
 *     trackImage(img.src, duration);
 *   };
 *
 *   return <img src="..." onLoad={handleImageLoad} />;
 * }
 * ```
 */
export function useImagePerformance() {
  return (src: string, duration: number) => {
    webVitals.trackImage(src, duration);
  };
}

// Export default hook
export default useWebVitals;
