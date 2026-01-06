import React, { HTMLAttributes } from 'react';
import { VisuallyHidden } from './VisuallyHidden';

interface SkipLinkProps extends HTMLAttributes<HTMLAnchorElement> {
  targetId?: string;
  /** The label text for screen readers */
  label?: string;
  /** Additional class names to apply */
  className?: string;
}

/**
 * SkipLink component that provides keyboard users with a way to skip to the main content.
 * Renders a visually hidden link that becomes visible when focused.
 */
export const SkipLink = ({
  targetId = 'main-content',
  label = 'Skip to main content',
  className = '',
  ...props
}: SkipLinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
  return (
    <a
      href={`#${targetId}`}
      className={`focus:ring-primary-600 absolute top-0 left-0 z-50 -translate-y-full bg-white px-4 py-2 font-medium text-gray-900 transition-transform duration-200 focus:translate-y-0 focus:ring-2 focus:ring-offset-2 ${className}`}
      {...props}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      <span aria-hidden='true' className='block'>
        {label}
      </span>
    </a>
  );
};

// Add display name for better debugging
SkipLink.displayName = 'SkipLink';

export default SkipLink;
