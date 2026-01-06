import React from 'react';
import { cn } from '@/utils/classname';

export interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {}

const Divider = React.forwardRef<HTMLHRElement, DividerProps>(({ className, ...props }, ref) => (
  <hr ref={ref} className={cn('my-4 border-white/10', className)} {...props} />
));

Divider.displayName = 'Divider';

export default Divider;
