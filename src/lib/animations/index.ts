/**
 * Animations Library
 *
 * This module exports all animation-related utilities and constants
 * for use throughout the portfolio website.
 */

// Export all animation utilities
export * from './micro-transitions';
export * from './variants';
export * from './hooks';

// Re-export the AnimatedSection component for convenience
export { default as AnimatedSection } from '../../components/organisms/AnimatedSection';
