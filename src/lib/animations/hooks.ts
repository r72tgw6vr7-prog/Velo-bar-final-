/**
 * Animation Hooks
 *
 * This module provides React hooks for animation control and scroll-triggered
 * animations using Framer Motion.
 *
 * Features:
 * - useScrollAnimation: Trigger animations when elements enter the viewport
 * - useAnimateOnScroll: Get variants and props for scroll-triggered animations
 * - useDelayedAnimation: Apply staggered animations to multiple elements
 * - useResponsiveAnimation: Apply different animations based on screen size
 */

import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

/**
 * Hook to trigger animation when element enters viewport
 * @param threshold - Amount of element that needs to be visible to trigger (0-1)
 * @param once - Whether animation should only trigger once
 * @returns Object containing ref and inView status
 */
export const useScrollAnimation = (threshold: number = 0.1, once: boolean = true) => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once, amount: threshold });

  return { ref, isInView };
};

/**
 * Hook to get animation variants based on scroll position
 * @param threshold - Amount of element that needs to be visible to trigger (0-1)
 * @returns Object with ref, initial, and animate props for Framer Motion
 */
export const useAnimateOnScroll = (threshold: number = 0.1) => {
  const { ref, isInView } = useScrollAnimation(threshold);

  return {
    ref,
    initial: 'hidden',
    animate: isInView ? 'visible' : 'hidden',
  };
};

/**
 * Hook to apply animation with delay
 * @param delay - Delay in milliseconds
 * @returns Object containing shouldAnimate state
 */
export const useDelayedAnimation = (delay: number = 500) => {
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldAnimate(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return { shouldAnimate };
};

/**
 * Hook to apply different animations based on screen size
 * @returns Object containing responsive animation variants
 */
export const useResponsiveAnimation = () => {
  // You can expand this to use more breakpoints as needed
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false,
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return { isMobile };
};

/**
 * Hook to create a staggered animation for a list of items
 * @param itemCount - Number of items in the list
 * @param staggerDelay - Delay between each item in seconds
 * @param initialDelay - Initial delay before animation starts in seconds
 * @returns Array of delays for each item
 */
export const useStaggeredAnimation = (
  itemCount: number,
  staggerDelay: number = 0.1,
  initialDelay: number = 0.2,
) => {
  return Array.from({ length: itemCount }).map((_, i) => initialDelay + i * staggerDelay);
};
