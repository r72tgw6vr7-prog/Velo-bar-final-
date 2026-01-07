/**
 * LazyParallaxAbout - Wrapper that dynamically loads ParallaxAbout with GSAP
 * This prevents GSAP from being included in the initial bundle
 */

import React, { Suspense, lazy } from 'react';
import './ParallaxAbout.css';

const ParallaxAboutLazy = lazy(() => 
  import('./ParallaxAbout.tsx').then(module => ({
    default: module.ParallaxAbout
  }))
);

interface LazyParallaxAboutProps {
  className?: string;
}

export const LazyParallaxAbout: React.FC<LazyParallaxAboutProps> = ({ className = '' }) => {
  return (
    <Suspense 
      fallback={
        <div className={`parallax-about-loading ${className}`}>
          <div className="animate-pulse h-64 bg-gray-200 rounded-lg"></div>
        </div>
      }
    >
      <ParallaxAboutLazy className={className} />
    </Suspense>
  );
};

export default LazyParallaxAbout;
