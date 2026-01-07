/**
 * ErrorMessage Component
 * ======================
 * Unified error handling UI component
 * Provides consistent error display across the application
 */

import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, XCircle, AlertTriangle, RefreshCw } from 'lucide-react';
import { cn } from '@/utils/classname.ts';
import { errorAnimations } from '@/lib/animations/variants.ts';

export type ErrorType = 'error' | 'warning' | 'info' | 'critical';

export interface ErrorMessageProps {
  /** Error message to display */
  message: string;
  /** Error title (optional) */
  title?: string;
  /** Error type for styling */
  type?: ErrorType;
  /** Show retry button */
  showRetry?: boolean;
  /** Retry button callback */
  onRetry?: () => void;
  /** Show dismiss button */
  showDismiss?: boolean;
  /** Dismiss button callback */
  onDismiss?: () => void;
  /** Additional CSS classes */
  className?: string;
  /** Show icon */
  showIcon?: boolean;
  /** Full page error (larger, centered) */
  fullPage?: boolean;
}

const iconMap = {
  error: XCircle,
  warning: AlertTriangle,
  info: AlertCircle,
  critical: AlertCircle,
};

const colorMap = {
  error: 'border-red-500/30 bg-red-500/10 text-red-400',
  warning: 'border-accent-primary/30 bg-accent-primary/10 text-accent-primary',
  info: 'border-accent-primary/30 bg-accent-primary/10 text-accent-primary',
  critical: 'border-red-600/50 bg-red-600/20 text-red-300',
};

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  title,
  type = 'error',
  showRetry = false,
  onRetry,
  showDismiss = true,
  onDismiss,
  className,
  showIcon = true,
  fullPage = false,
}) => {
  const Icon = iconMap[type];
  const colorClass = colorMap[type];

  if (fullPage) {
    return (
      <motion.div
        variants={errorAnimations}
        initial='initial'
        animate='animate'
        exit='exit'
        className={cn('flex min-h-[400px] items-center justify-center p-8', className)}
      >
        <div className={cn('w-full max-w-md rounded-lg border-2 p-8', 'text-center', colorClass)}>
          {showIcon && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.2 }}
              className='mb-8 flex justify-center'
            >
              <Icon className='h-16 w-16' />
            </motion.div>
          )}

          {title && <h3 className='mb-8 text-2xl font-bold text-white'>{title}</h3>}

          <p className='mb-8 text-lg opacity-90'>{message}</p>

          <div className='flex justify-center gap-8'>
            {showRetry && onRetry && (
              <button
                onClick={onRetry}
                className={cn(
                  'rounded-lg px-6 py-4 font-medium',
                  'bg-white/10 hover:bg-white/20',
                  'border border-white/20',
                  'transition-all duration-200',
                  'active:scale-95',
                  'flex items-center gap-2',
                )}
              >
                <RefreshCw className='h-4 w-4' />
                Try Again
              </button>
            )}

            {showDismiss && onDismiss && (
              <button
                onClick={onDismiss}
                className={cn(
                  'rounded-lg px-6 py-4 font-medium',
                  'bg-transparent hover:bg-white/10',
                  'border border-white/10',
                  'transition-all duration-200',
                  'active:scale-95',
                )}
              >
                Dismiss
              </button>
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={errorAnimations}
      initial='initial'
      animate='animate'
      exit='exit'
      className={cn(
        'flex items-start gap-4 rounded-lg border p-4', // 8pt grid: was gap-3 (12px)
        '',
        colorClass,
        className,
      )}
      role='alert'
      aria-live='polite'
    >
      {showIcon && <Icon className='mt-1 h-5 w-5 flex-shrink-0' />}

      <div className='min-w-0 flex-1'>
        {title && <h4 className='mb-0 font-semibold text-white'>{title}</h4>}
        <p className='text-sm opacity-90'>{message}</p>

        {(showRetry || showDismiss) && (
          <div className='mt-0 flex gap-0'>
            {showRetry && onRetry && (
              <button
                onClick={onRetry}
                className={cn(
                  'rounded px-2 py-2 text-sm font-medium',
                  'bg-white/10 hover:bg-white/20',
                  'transition-all duration-200',
                  'active:scale-95',
                  'flex items-center gap-2',
                )}
              >
                <RefreshCw className='h-3.5 w-3.5' />
                Retry
              </button>
            )}

            {showDismiss && onDismiss && (
              <button
                onClick={onDismiss}
                className={cn(
                  'rounded px-2 py-2 text-sm font-medium',
                  'hover:bg-white/10',
                  'transition-all duration-200',
                  'active:scale-95',
                )}
              >
                Dismiss
              </button>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ErrorMessage;
