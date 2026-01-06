/**
 * Optimized Framer Motion imports for tree shaking
 * Centralized imports to enable better code splitting
 */

// Re-export commonly used Framer Motion components and hooks
// This allows us to lazy load them when needed
export {
  motion,
  AnimatePresence,
  useInView,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent
} from 'framer-motion';

// Types - these don't add to bundle size
export type { 
  Variants, 
  Variant, 
  Transition, 
  HTMLMotionProps, 
  PanInfo, 
  MotionValue 
} from 'framer-motion';

import React from 'react';

// Lazy loading helper for heavy animation components
export const createLazyMotionComponent = (
  importFn: () => Promise<{ default: React.ComponentType<unknown> }>
) => {
  return React.lazy(importFn);
};
