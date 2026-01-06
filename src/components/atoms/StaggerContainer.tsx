/**
 * StaggerContainer Component
 * ==========================
 * Animates children with staggered delays when scrolled into view.
 * Perfect for grids, lists, and card layouts.
 *
 * Usage:
 * <StaggerContainer>
 *   <StaggerItem><Card1 /></StaggerItem>
 *   <StaggerItem><Card2 /></StaggerItem>
 *   <StaggerItem><Card3 /></StaggerItem>
 * </StaggerContainer>
 */

import { motion, useInView, Variants } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface StaggerContainerProps {
  children: ReactNode;
  staggerDelay?: number;
  initialDelay?: number;
  threshold?: number;
  once?: boolean;
  className?: string;
  as?: 'div' | 'ul' | 'section' | 'article';
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'li' | 'article';
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export const StaggerContainer = ({
  children,
  staggerDelay = 0.1,
  initialDelay = 0.1,
  threshold = 0.1,
  once = true,
  className = '',
  as = 'div',
}: StaggerContainerProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: threshold });

  const MotionComponent = motion[as];

  const customContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: initialDelay,
      },
    },
  };

  return (
    <MotionComponent
      ref={ref}
      initial='hidden'
      animate={isInView ? 'visible' : 'hidden'}
      variants={customContainerVariants}
      className={className}
    >
      {children}
    </MotionComponent>
  );
};

export const StaggerItem = ({ children, className = '', as = 'div' }: StaggerItemProps) => {
  const MotionComponent = motion[as];

  return (
    <MotionComponent variants={itemVariants} className={className}>
      {children}
    </MotionComponent>
  );
};

export default StaggerContainer;
