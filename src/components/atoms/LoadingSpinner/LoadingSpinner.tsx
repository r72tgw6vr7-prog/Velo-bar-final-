import { cn } from '@/utils/classname';

export type LoadingSpinnerSize = 'xs' | 'sm' | 'md' | 'lg';
export type LoadingSpinnerVariant = 'brand' | 'neutral' | 'inverse';

export interface LoadingSpinnerProps {
  /** Visual size of the spinner */
  size?: LoadingSpinnerSize;
  /** Color theme to use */
  variant?: LoadingSpinnerVariant;
  /** Optional accessible label – defaults to “Loading” */
  label?: string;
  /** Additional class names */
  className?: string;
  /** Whether to render the label text under the spinner */
  showLabel?: boolean;
}

const SIZE_MAP: Record<LoadingSpinnerSize, string> = {
  xs: 'w-6 h-6',
  sm: 'w-8 h-8',
  md: 'w-12 h-12',
  lg: 'w-16 h-16',
};

const VARIANT_SPIN_RING: Record<LoadingSpinnerVariant, string> = {
  brand: 'border-t-brand-primary',
  neutral: 'border-t-white/80',
  inverse: 'border-t-black/80',
};

const VARIANT_BASE_RING: Record<LoadingSpinnerVariant, string> = {
  brand: 'border-brand-primary-20',
  neutral: 'border-white/20',
  inverse: 'border-black/20',
};

const VARIANT_GLOW_CLASSES: Record<LoadingSpinnerVariant, string> = {
  brand: 'shadow-[0_0_20px_rgba(236,72,153,0.45)]',
  neutral: 'shadow-[0_0_20px_rgba(255,255,255,0.25)]',
  inverse: 'shadow-[0_0_20px_rgba(0,0,0,0.25)]',
};

/**
 * LoadingSpinner – unified loader surface that aligns with the cosmic glass aesthetic.
 */
export function LoadingSpinner({
  size = 'md',
  variant = 'brand',
  label = 'Loading',
  className = '',
  showLabel = false,
}: LoadingSpinnerProps) {
  return (
    <div
      className={cn('text-color-text-secondary flex flex-col items-center gap-4', className)}
      role='status'
    >
      <span className='sr-only'>{label}</span>
      <span
        className={cn(
          'relative inline-flex items-center justify-center rounded-full',
          SIZE_MAP[size],
          VARIANT_GLOW_CLASSES[variant],
        )}
        aria-hidden='true'
      >
        <span
          className={cn(
            'absolute inset-0 rounded-full border-2 opacity-30',
            VARIANT_BASE_RING[variant],
          )}
        />
        <span
          className={cn(
            'absolute inset-0 animate-spin rounded-full border-2 border-t-2 border-transparent',
            VARIANT_SPIN_RING[variant],
            VARIANT_BASE_RING[variant],
          )}
        />
      </span>
      {showLabel && <span className='text-color-text-secondary text-sm font-medium'>{label}</span>}
    </div>
  );
}

export default LoadingSpinner;
