/**
 * AnimatedCard Component
 * ======================
 * A card wrapper with built-in hover animations and scroll reveal.
 * Provides consistent card interactions across the site.
 *
 * Usage:
 * <AnimatedCard>
 *   <CardContent />
 * </AnimatedCard>
 *
 * <AnimatedCard hoverEffect="lift" glowOnHover>
 *   <PremiumCard />
 * </AnimatedCard>
 */

import { motion, useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';
import { cn } from '@/utils/classname';

type HoverEffect = 'lift' | 'scale' | 'glow' | 'tilt' | 'none';

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: HoverEffect;
  glowOnHover?: boolean;
  scrollReveal?: boolean;
  delay?: number;
  onClick?: () => void;
}

const hoverVariants = {
  lift: {
    y: -8,
    transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  scale: {
    scale: 1.02,
    transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  glow: {
    boxShadow: '0 0 30px rgba(var(--orange-rgb), 0.3)',
    transition: { duration: 0.3 },
  },
  tilt: {
    rotateX: -2,
    rotateY: 2,
    transition: { duration: 0.3 },
  },
  none: {},
};

const scrollVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export const AnimatedCard = ({
  children,
  className = '',
  hoverEffect = 'lift',
  glowOnHover = false,
  scrollReveal = true,
  delay = 0,
  onClick,
}: AnimatedCardProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const combinedHover = {
    ...hoverVariants[hoverEffect],
    ...(glowOnHover ? hoverVariants.glow : {}),
  };

  return (
    <motion.div
      ref={ref}
      className={cn(
        'rounded-2xl transition-shadow duration-300',
        onClick && 'cursor-pointer',
        className,
      )}
      initial={scrollReveal ? 'hidden' : undefined}
      animate={scrollReveal ? (isInView ? 'visible' : 'hidden') : undefined}
      variants={scrollReveal ? scrollVariants : undefined}
      whileHover={combinedHover}
      whileTap={onClick ? { scale: 0.98 } : undefined}
      transition={{ delay }}
      onClick={onClick}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedCard;
