/**
 * Framer Motion Animation Variants
 *
 * This module provides standardized animation variants for use with Framer Motion
 * throughout the portfolio website.
 *
 * Features:
 * - Fade animations (fadeIn, fadeInUp, fadeInDown)
 * - Slide animations (slideInLeft, slideInRight)
 * - Scale animations (scaleIn)
 * - Stagger animations (for lists and grids)
 * - Custom branded animations
 */

import type { Variants, Transition } from 'framer-motion';
import { TRANSITION_DURATIONS } from './micro-transitions.ts';

// Easing presets that work with Framer Motion
const EASINGS = {
  smooth: [0.4, 0, 0.2, 1], // Material Design standard easing
  easeOut: [0, 0, 0.2, 1],
  easeIn: [0.4, 0, 1, 1],
  bounce: [0.68, -0.55, 0.265, 1.55],
  linear: [0, 0, 1, 1],
} as const;

// Default transition settings
const defaultTransition: Transition = {
  duration: TRANSITION_DURATIONS.normal / 1000, // Convert to seconds for Framer
  ease: EASINGS.smooth,
};

// Fade animations
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: defaultTransition,
  },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: defaultTransition,
  },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: defaultTransition,
  },
};

// Slide animations
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: defaultTransition,
  },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: defaultTransition,
  },
};

export const slideInBottom: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: defaultTransition,
  },
};

// Scale animations
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: defaultTransition,
  },
};

export const scaleInFast: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: TRANSITION_DURATIONS.fast / 1000,
      ease: EASINGS.easeOut,
    },
  },
};

// Stagger animations
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: defaultTransition,
  },
};

export const staggerItemLeft: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: defaultTransition,
  },
};

export const staggerItemRight: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: defaultTransition,
  },
};

// Custom branded animations
export const accentGlow: Variants = {
  initial: { boxShadow: '0 0 0 rgba(var(--orange-rgb), 0)' },
  animate: {
    boxShadow: [
      '0 0 5px rgba(var(--orange-rgb), 0.2)',
      '0 0 20px rgba(var(--orange-rgb), 0.6)',
      '0 0 5px rgba(var(--orange-rgb), 0.2)',
    ],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
  hover: {
    boxShadow: '0 0 25px rgba(var(--orange-rgb), 0.8)',
    transition: { duration: 0.3 },
  },
};

// Page transition variants
export const pageTransition: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      when: 'beforeChildren',
      staggerChildren: 0.15,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: EASINGS.easeIn,
    },
  },
};

// Hero section animation
export const heroImage: Variants = {
  hidden: { opacity: 0, scale: 1.1 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: TRANSITION_DURATIONS.slow / 1000,
      ease: EASINGS.easeOut,
    },
  },
};

export const heroText: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: TRANSITION_DURATIONS.normal / 1000,
      ease: EASINGS.easeOut,
      delay: 0.2,
    },
  },
};

// Gallery item variants
export const galleryItem: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: defaultTransition,
  },
  hover: {
    scale: 1.03,
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
    transition: {
      duration: TRANSITION_DURATIONS.fast / 1000,
      ease: EASINGS.easeOut,
    },
  },
};

export const errorAnimations: Variants = {
  initial: { opacity: 0, y: -10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};
