/**
 * Animation Utilities for Portfolio Website
 *
 * Standardized animation patterns used throughout the application
 * for consistent motion and interaction.
 */

// Common animation timing functions
export const easings = {
  // Standard curves
  standard: 'cubic-bezier(0.4, 0.0, 0.2, 1)', // Material Design standard easing
  decelerate: 'cubic-bezier(0.0, 0.0, 0.2, 1)', // Deceleration curve (fast to slow)
  accelerate: 'cubic-bezier(0.4, 0.0, 1, 1)', // Acceleration curve (slow to fast)
  sharp: 'cubic-bezier(0.4, 0.0, 0.6, 1)', // Sharp curve

  // Custom brand curves
  luxuryEntrance: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)', // Smooth entrance
  accentReveal: 'cubic-bezier(0.22, 1, 0.36, 1)', // Emphasized curve for accent elements
  staggered: 'cubic-bezier(0.83, 0, 0.17, 1)', // For staggered entrance
};

// Durations in milliseconds
export const durations = {
  fast: 150,
  standard: 300,
  medium: 500,
  slow: 800,
  entrance: 1200, // For page/section entrances
};

// Common animation variants for framer-motion
export const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: durations.standard / 1000, // Convert to seconds for framer-motion
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
};

export const fadeInUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

export const fadeInDownVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

export const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
};

export const slideInLeftVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

export const slideInRightVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

// Helper for creating staggered children animations
export const staggerChildren = (delayChildren = 0.1) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: delayChildren,
    },
  },
});

// Function to check if reduced motion is preferred
export const prefersReducedMotion =
  typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

// Function to get appropriate animation based on reduced motion preference
export const getAccessibleAnimation = (
  animationVariant: any,
  shouldReduce: boolean = prefersReducedMotion,
) => {
  if (shouldReduce) {
    return {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.1 } },
    };
  }
  return animationVariant;
};

export default {
  easings,
  durations,
  fadeInVariants,
  fadeInUpVariants,
  fadeInDownVariants,
  scaleInVariants,
  slideInLeftVariants,
  slideInRightVariants,
  staggerChildren,
  prefersReducedMotion,
  getAccessibleAnimation,
};
