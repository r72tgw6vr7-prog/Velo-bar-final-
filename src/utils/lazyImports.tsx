/**
 * Centralized lazy import utilities for bundle optimization
 * Reduces initial bundle size by deferring heavy component loading
 */

import React, { lazy, ComponentType } from 'react';

// Animation-heavy components
export const LazyParallaxAbout = lazy(() => 
  import('@/components/ParallaxAbout/ParallaxAbout').then(module => ({
    default: module.ParallaxAbout
  }))
);

export const LazyGalleryGrid = lazy(() => 
  import('@/components/gallery/GalleryGrid')
);

// Form-heavy components
export const LazyDatePicker = lazy(() => 
  import('@/components/atoms/DatePicker')
);

// UI Lab and development components (defer completely)
export const LazyUILabPreviewPage = lazy(() => 
  import('@/pages/UILabPreviewPage.tsx')
);

// Analytics components (defer until interaction)
export const LazyPerformanceDashboard = lazy(() => 
  import('@/components/debug/PerformanceDashboard').then(module => ({
    default: module.PerformanceDashboard
  }))
);

// Utility function for creating lazy components with loading fallback
export const createLazyComponent = <T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  fallback?: React.ReactNode
) => {
  const LazyComponent = lazy(importFn);
  
  return (props: React.ComponentProps<T>) => (
    <React.Suspense fallback={fallback || <div className="animate-pulse bg-white/5 rounded h-32" />}>
      <LazyComponent {...props} />
    </React.Suspense>
  );
};
