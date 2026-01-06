import React from 'react';
import { cn } from '@/utils/classname';

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  requiredMark?: boolean;
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, children, requiredMark, ...props }, ref) => (
    <label
      ref={ref}
      className={cn('text-color-text-primary text-sm font-medium', className)}
      {...props}
    >
      {children}
      {requiredMark && (
        <span aria-hidden className='text-accent-primary ml-0'>
          *
        </span>
      )}
    </label>
  ),
);

Label.displayName = 'Label';

export default Label;
