/**
 * Micro-transitions System
 *
 * This module provides standardized micro-transitions for consistent interactive behavior
 * across all components in the portfolio website.
 *
 * Features:
 * - Standardized durations
 * - Predefined easing functions
 * - Tailwind transition classes
 * - Preset combinations for common use cases
 * - Utility functions for combining transitions
 */

// Duration constants (milliseconds)
export const TRANSITION_DURATIONS = {
  instant: 100,
  fast: 200,
  normal: 300,
  slow: 500,
} as const;

// Easing functions
export const TRANSITION_EASINGS = {
  smooth: 'cubic-bezier(0.4, 0.0, 0.2, 1)', // Material Design standard
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  linear: 'linear',
  easeOut: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
  easeIn: 'cubic-bezier(0.4, 0.0, 1, 1)',
} as const;

// Tailwind transition classes
export const TRANSITIONS = {
  // Hover effects
  hover: {
    scale: 'transition-transform duration-200 ease-smooth hover:scale-105',
    scaleSubtle: 'transition-transform duration-200 ease-smooth hover:scale-102',
    accentGlow: 'transition-shadow duration-300 ease-smooth hover:shadow-accent-glow',
    accentGlowMedium: 'transition-shadow duration-300 ease-smooth hover:shadow-accent-glow-medium',
    accentGlowStrong: 'transition-shadow duration-300 ease-smooth hover:shadow-accent-glow-strong',
    chromeGlow: 'transition-shadow duration-300 ease-smooth hover:shadow-chrome-subtle',
    chromeGlowMedium: 'transition-shadow duration-300 ease-smooth hover:shadow-chrome-medium',
    brightness: 'transition-all duration-200 ease-smooth hover:brightness-110',
    brightnessSubtle: 'transition-all duration-200 ease-smooth hover:brightness-105',
    opacity: 'transition-opacity duration-200 ease-smooth hover:opacity-90',
  },

  // Focus effects
  focus: {
    accentRing:
      'focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-accessible focus-visible:outline-offset-2 focus-visible:shadow-[0_0_0_2px_rgba(0,0,0,0.8)] transition-shadow duration-200',
    chromeRing:
      'focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-accessible focus-visible:outline-offset-2 focus-visible:shadow-[0_0_0_2px_rgba(0,0,0,0.8)] transition-shadow duration-200',
    accentGlow: 'focus-visible:shadow-accent-glow transition-shadow duration-200 ease-smooth',
    chromeGlow: 'focus-visible:shadow-chrome-subtle transition-shadow duration-200 ease-smooth',
  },

  // Active/tap effects
  active: {
    scale: 'active:scale-95 transition-transform duration-100 ease-smooth',
    scaleSubtle: 'active:scale-98 transition-transform duration-100 ease-smooth',
    opacity: 'active:opacity-80 transition-opacity duration-100 ease-smooth',
  },

  // Color transitions
  color: {
    accentToChrome: 'transition duration-200 ease-out text-accent-primary hover:text-white/80',
    chromeToAccent: 'transition duration-200 ease-out text-white/80 hover:text-accent-primary',
    accentToDark: 'transition duration-200 ease-out bg-accent-primary hover:bg-navy',
    chromeToDark: 'transition duration-200 ease-out text-white/80 hover:text-white',
    darkToAccent: 'transition duration-200 ease-out text-brand-dark hover:text-accent-primary',
    bgDarkToLight: 'transition duration-200 ease-out bg-brand-dark hover:bg-brand-light',
  },

  // Other transitions
  other: {
    fadeIn: 'transition-opacity duration-300 ease-smooth',
    fadeOut: 'transition-opacity duration-300 ease-smooth',
    growWidth: 'transition-width duration-300 ease-smooth',
    growHeight: 'transition-height duration-300 ease-smooth',
    spin: 'transition-transform duration-1000 ease-linear hover:rotate-360',
  },
} as const;

/**
 * Combines multiple transition classes into a single string
 * @param transitions - Array of transition class strings
 * @returns Combined class string with duplicates removed
 */
export const combineTransitions = (...transitions: string[]): string => {
  // Split all transitions into individual classes
  const allClasses = transitions.join(' ').split(' ');

  // Remove duplicates
  const uniqueClasses = Array.from(new Set(allClasses));

  // Join back into a single string
  return uniqueClasses.join(' ');
};

/**
 * Preset combinations for common use cases
 */
export const TRANSITION_PRESETS = {
  // Button transitions
  button: combineTransitions(
    TRANSITIONS.hover.scaleSubtle,
    TRANSITIONS.active.scale,
    TRANSITIONS.focus.accentRing,
  ),

  buttonAccent: combineTransitions(
    TRANSITIONS.hover.scaleSubtle,
    TRANSITIONS.active.scale,
    TRANSITIONS.focus.accentRing,
    TRANSITIONS.hover.accentGlow,
  ),

  buttonChrome: combineTransitions(
    TRANSITIONS.hover.scaleSubtle,
    TRANSITIONS.active.scale,
    TRANSITIONS.focus.chromeRing,
    TRANSITIONS.hover.chromeGlow,
  ),

  // Card transitions
  card: combineTransitions(TRANSITIONS.hover.accentGlow, TRANSITIONS.hover.scaleSubtle),

  cardAccent: combineTransitions(
    TRANSITIONS.hover.accentGlowMedium,
    TRANSITIONS.hover.scaleSubtle,
    TRANSITIONS.hover.brightnessSubtle,
  ),

  cardChrome: combineTransitions(
    TRANSITIONS.hover.chromeGlowMedium,
    TRANSITIONS.hover.scaleSubtle,
    TRANSITIONS.hover.brightnessSubtle,
  ),

  // Link transitions
  link: combineTransitions(TRANSITIONS.color.chromeToAccent, TRANSITIONS.hover.brightness),

  linkAccent: combineTransitions(TRANSITIONS.color.darkToAccent, TRANSITIONS.hover.brightness),

  linkChrome: combineTransitions(TRANSITIONS.color.accentToChrome, TRANSITIONS.hover.brightness),

  // Image transitions
  image: combineTransitions(TRANSITIONS.hover.brightness, TRANSITIONS.hover.scaleSubtle),

  imageZoom: combineTransitions(TRANSITIONS.hover.scale, TRANSITIONS.hover.brightness),

  // Icon transitions
  icon: combineTransitions(
    TRANSITIONS.hover.scaleSubtle,
    TRANSITIONS.hover.brightness,
    TRANSITIONS.active.opacity,
  ),

  iconSpin: combineTransitions(TRANSITIONS.other.spin, TRANSITIONS.hover.brightness),

  // Form element transitions
  formElement: combineTransitions(TRANSITIONS.focus.accentRing, TRANSITIONS.hover.brightnessSubtle),
} as const;

/**
 * Creates CSS custom properties for transition durations and easings
 * to be used with inline styles or CSS-in-JS solutions
 */
export const createTransitionVars = (): Record<string, string> => {
  const vars: Record<string, string> = {};

  // Add duration variables
  Object.entries(TRANSITION_DURATIONS).forEach(([key, value]) => {
    vars[`--duration-${key}`] = `${value}ms`;
  });

  // Add easing variables
  Object.entries(TRANSITION_EASINGS).forEach(([key, value]) => {
    vars[`--transition-easing-${key}`] = value;
  });

  return vars;
};

/**
 * Creates a complete transition string for use in inline styles or CSS-in-JS
 * @param property - CSS property to transition (e.g., 'transform', 'opacity')
 * @param duration - Duration key from TRANSITION_DURATIONS
 * @param easing - Easing key from TRANSITION_EASINGS
 * @returns Complete transition string
 */
export const createTransitionStyle = (
  property: string,
  duration: keyof typeof TRANSITION_DURATIONS = 'normal',
  easing: keyof typeof TRANSITION_EASINGS = 'smooth',
): string => {
  return `${property} ${TRANSITION_DURATIONS[duration]}ms ${TRANSITION_EASINGS[easing]}`;
};

/**
 * Respect user's motion preferences
 * @returns Classes to respect prefers-reduced-motion
 */
export const respectMotionPreferences = (): string => {
  return 'motion-safe:transition-all motion-reduce:transition-none';
};

// Export type definitions for TypeScript
export type TransitionDuration = keyof typeof TRANSITION_DURATIONS;
export type TransitionEasing = keyof typeof TRANSITION_EASINGS;
export type TransitionPreset = keyof typeof TRANSITION_PRESETS;
