/**
 * VELOBAR - PERFORMANCE MONITORING
 * Lightweight monitoring to help prevent timeout issues
 */

/* eslint-disable no-console -- performance monitor emits console diagnostics and recovery suggestions when thresholds are exceeded */

// Add type declaration for Vite's import.meta.env
interface ImportMetaEnv {
  DEV: boolean;
  PROD: boolean;
  MODE: string;
}

interface PerformanceMetrics {
  pageLoadTime: number;
  componentMountTime: number;
  lastActivity: number;
  errorCount: number;
}

class PerformanceMonitor {
  private metrics: PerformanceMetrics = {
    pageLoadTime: 0,
    componentMountTime: 0,
    lastActivity: Date.now(),
    errorCount: 0,
  };

  private timeoutWarningThreshold = 10000; // 10 seconds
  private maxErrorCount = 5;

  constructor() {
    this.initializeMonitoring();
  }

  private initializeMonitoring() {
    // Track page load time
    if (typeof window !== 'undefined') {
      window.addEventListener('load', () => {
        this.metrics.pageLoadTime = performance.now();
      });

      // Track user activity to reset timeout warnings
      ['click', 'scroll', 'keypress', 'mousemove'].forEach((event) => {
        window.addEventListener(
          event,
          () => {
            this.metrics.lastActivity = Date.now();
          },
          { passive: true },
        );
      });
    }
  }

  // Track component mount times
  trackComponentMount(componentName: string): () => void {
    const startTime = performance.now();

    return () => {
      const mountTime = performance.now() - startTime;
      this.metrics.componentMountTime = mountTime;

      if (mountTime > this.timeoutWarningThreshold) {
        console.warn(
          `Component ${componentName} took ${mountTime}ms to mount - this may cause timeout issues`,
        );
      }
    };
  }

  // Track errors that might lead to timeouts
  trackError(error: Error, context: string) {
    this.metrics.errorCount++;

    console.error(`Error in ${context}:`, error);

    if (this.metrics.errorCount >= this.maxErrorCount) {
      console.warn('Multiple errors detected - this may lead to timeout issues');
      this.suggestRecovery();
    }
  }

  // Check if the page is becoming unresponsive
  checkResponsiveness(): boolean {
    const timeSinceActivity = Date.now() - this.metrics.lastActivity;
    const isUnresponsive = timeSinceActivity > 30000; // 30 seconds without activity

    if (isUnresponsive) {
      console.warn('Page may be unresponsive - consider refreshing');
    }

    return !isUnresponsive;
  }

  // Suggest recovery actions
  private suggestRecovery() {
    if (import.meta.env.DEV) {
      console.group('Recovery suggestions:');
      console.log('1. Reload the page');
      console.log('2. Check your internet connection');
      console.log('3. Clear browser cache');
      console.log('4. Try a different browser');
      console.groupEnd();
    }
  }

  // Get current metrics
  getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  // Reset error count
  resetErrors() {
    this.metrics.errorCount = 0;
  }
}

// Export singleton instance
export const performanceMonitor = new PerformanceMonitor();

// React hook for component performance tracking
export const usePerformanceTracking = (componentName: string) => {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const endTracking = performanceMonitor.trackComponentMount(componentName);
    setIsLoading(false);

    return () => {
      endTracking();
    };
  }, [componentName]);

  return { isLoading };
};

export default performanceMonitor;
