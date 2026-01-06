import React from 'react';
import { cn } from '@/utils/classname';

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: number; // px
  stroke?: number; // px
}

const Spinner: React.FC<SpinnerProps> = ({ size = 16, stroke = 2, className, ...props }) => {
  const style: React.CSSProperties = {
    width: size,
    height: size,
    borderWidth: stroke,
  };
  return (
    <div
      className={cn(
        'inline-block animate-spin rounded-full border-current border-t-transparent',
        className,
      )}
      style={style}
      aria-label='Loading'
      {...props}
    />
  );
};

export default Spinner;
