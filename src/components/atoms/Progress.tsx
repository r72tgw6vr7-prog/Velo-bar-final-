import React from 'react';
import { cn } from '@/utils/classname';

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number; // 0-100
}

const clamp = (n: number) => Math.max(0, Math.min(100, n));

const Progress: React.FC<ProgressProps> = ({ value = 0, className, ...props }) => {
  const v = clamp(value);
  return (
    <div
      role='progressbar'
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={v}
      className={cn('h-2 w-full overflow-hidden rounded-full bg-white/10', className)}
      {...props}
    >
      <div className='bg-accent-primary h-full transition-all' style={{ width: `${v}%` }} />
    </div>
  );
};

export default Progress;
