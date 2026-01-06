/**
 * LoadingSpinner Component
 * ========================
 * Animated loading indicators for async content.
 *
 * Usage:
 * <LoadingSpinner />
 * <LoadingSpinner size="lg" variant="dots" />
 * <LoadingSpinner variant="pulse" className="text-accent-primary" />
 */

import { motion } from 'framer-motion';
import { cn } from '@/utils/classname';

type SpinnerSize = 'sm' | 'md' | 'lg';
type SpinnerVariant = 'spinner' | 'dots' | 'pulse' | 'bars';

interface LoadingSpinnerProps {
  size?: SpinnerSize;
  variant?: SpinnerVariant;
  className?: string;
  label?: string;
}

const sizeClasses: Record<SpinnerSize, string> = {
  sm: 'w-4 h-4',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
};

const Spinner = ({ size, className }: { size: SpinnerSize; className?: string }) => (
  <motion.div
    className={cn(
      sizeClasses[size],
      'rounded-full border-2 border-current border-t-transparent',
      className,
    )}
    animate={{ rotate: 360 }}
    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
  />
);

const Dots = ({ size, className }: { size: SpinnerSize; className?: string }) => {
  const dotSize = size === 'sm' ? 'w-1.5 h-1.5' : size === 'md' ? 'w-2 h-2' : 'w-3 h-3';

  return (
    <div className={cn('flex gap-1', className)}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className={cn(dotSize, 'rounded-full bg-current')}
          animate={{ y: [0, -8, 0] }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.15,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

const Pulse = ({ size, className }: { size: SpinnerSize; className?: string }) => (
  <motion.div
    className={cn(sizeClasses[size], 'rounded-full bg-current', className)}
    animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
  />
);

const Bars = ({ size, className }: { size: SpinnerSize; className?: string }) => {
  const barHeight = size === 'sm' ? 'h-4' : size === 'md' ? 'h-6' : 'h-8';

  return (
    <div className={cn('flex items-end gap-1', className)}>
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className={cn('w-1 rounded-full bg-current', barHeight)}
          animate={{ scaleY: [0.4, 1, 0.4] }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: i * 0.1,
            ease: 'easeInOut',
          }}
          style={{ transformOrigin: 'bottom' }}
        />
      ))}
    </div>
  );
};

export const LoadingSpinner = ({
  size = 'md',
  variant = 'spinner',
  className = '',
  label,
}: LoadingSpinnerProps) => {
  const SpinnerComponent = {
    spinner: Spinner,
    dots: Dots,
    pulse: Pulse,
    bars: Bars,
  }[variant];

  return (
    <div className={cn('flex flex-col items-center justify-center gap-2', className)} role='status'>
      <SpinnerComponent size={size} className='text-accent-primary' />
      {label && <span className='text-sm text-white/70'>{label}</span>}
      <span className='sr-only'>Loading...</span>
    </div>
  );
};

export default LoadingSpinner;
