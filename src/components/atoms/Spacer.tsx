import React from 'react';
import { cn } from '@/utils/classname.ts';

type SpacerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | number;

const sizeToPx: Record<Exclude<SpacerSize, number>, string> = {
  xs: '8px',
  sm: '12px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  '2xl': '48px',
  '3xl': '64px',
};

export type SpacerProps = {
  size?: SpacerSize;
  axis?: 'vertical' | 'horizontal';
  className?: string;
};

export const Spacer: React.FC<SpacerProps> = ({ size = 'md', axis = 'vertical', className }) => {
  const pxValue = typeof size === 'number' ? `${size}px` : sizeToPx[size];
  const style =
    axis === 'vertical' ? { height: pxValue, width: '1px' } : { width: pxValue, height: '1px' };

  return <div aria-hidden role='presentation' className={cn(className)} style={style} />;
};

export default Spacer;
