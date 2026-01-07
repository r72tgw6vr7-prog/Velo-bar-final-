import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/atoms/index.ts';
import { cn } from '@/utils/classname.ts';
import type { ReactNode } from 'react';

export interface ErrorStateProps {
  /** Headline displayed to the user */
  title?: string;
  /** Supporting description */
  description?: string;
  /** Optional action for retry or navigation */
  onRetry?: () => void;
  /** Custom label for the retry action */
  retryLabel?: string;
  /** Optional slot for a custom icon */
  icon?: ReactNode;
  /** Additional class names */
  className?: string;
  /** Optional children to render under the description */
  children?: ReactNode;
}

/**
 * ErrorState renders a consistent error feedback surface with optional retry action.
 */
export function ErrorState({
  title = 'Etwas ist schiefgelaufen',
  description = 'Bitte versuche es später erneut.',
  onRetry,
  retryLabel = 'Erneut versuchen',
  icon,
  className = '',
  children,
}: ErrorStateProps) {
  return (
    <div
      role='alert'
      className={cn(
        'border-accent-primary/20 bg-navy rounded-3xl border',
        'mx-auto flex max-w-2xl flex-col gap-4 px-8 py-10 text-center',
        'shadow-[0_20px_60px_rgba(0,0,0,0.45)]',
        className,
      )}
    >
      <div className='flex justify-center'>
        <span
          className={cn(
            'inline-flex h-12 w-12 items-center justify-center rounded-full',
            'bg-accent-primary/20 text-accent-primary',
            'shadow-accent-glow',
          )}
        >
          {icon ?? <AlertTriangle className='h-6 w-6' aria-hidden='true' />}
        </span>
      </div>
      <div className='space-y-0'>
        <h3 className='text-xl font-semibold text-white'>{title}</h3>
        {description && <p className='text-offwhite/70 text-sm md:text-base'>{description}</p>}
        {children}
      </div>
      {onRetry && (
        <div className='flex justify-center pt-0'>
          <Button variant='secondary' size='sm' onClick={onRetry}>
            {retryLabel}
          </Button>
        </div>
      )}
    </div>
  );
}

export default ErrorState;
