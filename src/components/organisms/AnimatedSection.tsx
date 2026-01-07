/**
 * AnimatedSection Component
 *
 * A reusable wrapper component that animates its children when they enter the viewport.
 * Uses Framer Motion and the animation utilities for consistent animation experience.
 */

import { motion } from 'framer-motion';
import type { Variant, Variants, HTMLMotionProps, PanInfo } from 'framer-motion';
import React, { forwardRef } from 'react';
import { useScrollAnimation } from '@/lib/animations/hooks.ts';

// Extend motion.section props but override the drag handler types
type MotionSectionProps = Omit<
  HTMLMotionProps<'section'>,
  'onDrag' | 'onDragStart' | 'onDragEnd'
> & {
  onDrag?: (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void;
  onDragStart?: (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void;
  onDragEnd?: (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void;
};

interface AnimatedSectionProps extends React.HTMLAttributes<HTMLElement> {
  /** Content to be animated */
  children: React.ReactNode;

  /** Optional CSS class name */
  className?: string;

  /** Add texture-bg attribute for full-width background */
  hasBackground?: boolean;

  /** Animation variants for the section */
  variants?: {
    hidden: Variant;
    visible: Variant;
  };

  /** Animation transition properties */
  transition?: {
    duration?: number;
    delay?: number;
    ease?: string | number[];
  };

  /** Custom ref for the section element */
  ref?: React.Ref<HTMLElement>;
}

/**
 * AnimatedSection component that animates content when scrolled into view
 */
const AnimatedSection = forwardRef<HTMLElement, Omit<AnimatedSectionProps, 'ref'>>(
  ({ children, className = '', hasBackground = false, variants, transition, ...rest }, ref) => {
    const scrollRef = React.useRef<HTMLElement>(null);
    const { isInView } = useScrollAnimation();
    const sectionRef = ref || scrollRef;

    // Default variants if none provided
    const defaultVariants: Variants = {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.6,
          ease: 'easeOut',
          ...transition,
        },
      },
    };

    // Filter out any non-standard props that might cause type issues
    const {
      // Remove any props that we handle explicitly
      onDrag,
      onDragStart,
      onDragEnd,
      ...filteredRest
    } = rest as MotionSectionProps;

    return (
      <motion.section
        ref={sectionRef as React.Ref<HTMLElement>}
        className={className}
        initial='hidden'
        animate={isInView ? 'visible' : 'hidden'}
        variants={variants || defaultVariants}
        onDrag={onDrag}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        {...(hasBackground ? { 'data-texture-bg': true } : {})}
        {...filteredRest}
      >
        {children}
      </motion.section>
    );
  },
);

AnimatedSection.displayName = 'AnimatedSection';

export default AnimatedSection;
