import React from 'react';
import type { LucideProps } from 'lucide-react';

interface IconProps {
  icon?: React.ComponentType<LucideProps>;
  size?: number;
  className?: string;
  children?: React.ReactNode; // For inline SVG content
  color?: string;
  strokeWidth?: number;
  fill?: string;
  viewBox?: string;
  onClick?: () => void;
  'aria-label'?: string;
}

export const Icon: React.FC<IconProps> = ({
  icon: IconComponent,
  size = 24,
  className = '',
  children,
  color,
  strokeWidth,
  fill,
  viewBox = '0 0 24 24',
  onClick,
  'aria-label': ariaLabel,
}) => {
  // If an icon component is provided, render it
  if (IconComponent) {
    return (
      <IconComponent
        size={size}
        className={className}
        color={color}
        strokeWidth={strokeWidth}
        fill={fill}
        onClick={onClick}
        aria-label={ariaLabel}
      />
    );
  }

  // If children are provided, render as inline SVG
  if (children) {
    return (
      <svg
        width={size}
        height={size}
        viewBox={viewBox}
        className={className}
        fill={fill}
        onClick={onClick}
        aria-label={ariaLabel}
      >
        {children}
      </svg>
    );
  }

  // Fallback - empty span
  return <span className={className} />;
};

export default Icon;
