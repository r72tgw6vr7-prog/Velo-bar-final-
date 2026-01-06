/**
 * Performance Utilities
 * =====================
 * Optimized helpers for performance-critical operations
 */

/**
 * Throttle function for 60fps (16ms) operations
 * Ideal for scroll handlers and resize events
 */
export function throttle<T extends (...args: unknown[]) => void>(
  func: T,
  limit: number = 16, // 16ms = 60fps
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;

  return function (this: unknown, ...args: Parameters<T>): void {
    if (!inThrottle) {
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
      func.apply(this, args);
    }
  };
}

/**
 * Debounce function for operations that should only fire after inactivity
 * Useful for search inputs, window resize that triggers re-calculations
 */
export function debounce<T extends (...args: unknown[]) => void>(
  func: T,
  delay: number = 300,
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;

  return function (this: unknown, ...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

/**
 * RequestAnimationFrame throttle for smooth animations
 * Best for visual updates that need to sync with browser paint cycles
 */
export function rafThrottle<T extends (...args: unknown[]) => void>(
  func: T,
): (...args: Parameters<T>) => void {
  let rafId: number | null = null;

  return function (this: unknown, ...args: Parameters<T>) {
    if (rafId === null) {
      rafId = requestAnimationFrame(() => {
        func.apply(this, args);
        rafId = null;
      });
    }
  };
}

/**
 * Check if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Will-change CSS property helper
 * Add this to elements with heavy animations
 */
export const willChangeStyles = {
  transform: { willChange: 'transform' as const },
  opacity: { willChange: 'opacity' as const },
  transformOpacity: { willChange: 'transform, opacity' as const },
  auto: { willChange: 'auto' as const },
};

/**
 * Lazy load wrapper for below-fold content
 * Returns true when element is near viewport
 */
export function isNearViewport(element: HTMLElement | null, threshold: number = 200): boolean {
  if (!element || typeof window === 'undefined') return false;

  const rect = element.getBoundingClientRect();
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

  return rect.top <= viewportHeight + threshold;
}

/**
 * Performance monitoring utility
 */
export class PerformanceMonitor {
  private marks: Map<string, number> = new Map();

  mark(name: string): void {
    if (typeof performance !== 'undefined') {
      this.marks.set(name, performance.now());
    }
  }

  measure(name: string, startMark: string, endMark?: string): number | null {
    if (typeof performance === 'undefined') return null;

    const start = this.marks.get(startMark);
    const end = endMark ? this.marks.get(endMark) : performance.now();

    if (start === undefined || end === undefined) return null;

    const duration = end - start;
    // eslint-disable-next-line no-console
    console.log(`[Performance] ${name}: ${duration.toFixed(2)}ms`);
    return duration;
  }

  clear(): void {
    this.marks.clear();
  }
}

export const perfMonitor = new PerformanceMonitor();
