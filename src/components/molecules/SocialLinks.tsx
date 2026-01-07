/**
 * SocialLinks Component
 * ===============
 * Standardized social media links component with consistent styling
 */

import React from 'react';
import { cn } from '../../utils/classname.ts';
import {
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  Star,
  Linkedin,
  Globe,
  type LucideIcon,
} from 'lucide-react';

export interface SocialLink {
  icon: string | React.ReactNode;
  text: string;
  href: string;
  label?: string;
}

export type SocialIconType =
  | 'Instagram'
  | 'Facebook'
  | 'Twitter'
  | 'Youtube'
  | 'Star'
  | 'Linkedin'
  | 'Globe';

export interface SocialLinksProps {
  /** Links to display */
  links: SocialLink[] | { [key: string]: SocialLink };
  /** Orientation for the social links */
  orientation?: 'horizontal' | 'vertical';
  /** Size of the social icons */
  size?: 'sm' | 'md' | 'lg';
  /** Whether to show the text alongside icons */
  showText?: boolean;
  /** Custom styling for the container */
  className?: string;
  /** Custom styling for each individual link */
  linkClassName?: string;
}

// Map of icon names to Lucide components
const iconMap: Record<SocialIconType, LucideIcon> = {
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  Star,
  Linkedin,
  Globe,
};

export const SocialLinks: React.FC<SocialLinksProps> = ({
  links,
  orientation = 'horizontal',
  size = 'md',
  showText = false,
  className,
  linkClassName,
}) => {
  // Convert links object to array if needed
  const linksArray = Array.isArray(links)
    ? links
    : Object.entries(links).map(([key, link]) => ({
        ...link,
        label: link.label || key,
      }));

  // Size classes for the container and icons
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24,
  };

  // Render the social icon based on the icon name or node
  const renderIcon = (icon: string | React.ReactNode) => {
    if (React.isValidElement(icon)) {
      return icon;
    }

    if (typeof icon === 'string' && icon in iconMap) {
      const IconComponent = iconMap[icon as SocialIconType];
      return <IconComponent size={iconSizes[size]} aria-hidden='true' focusable='false' />;
    }

    // Default icon if not found
    return <Globe size={iconSizes[size]} aria-hidden='true' focusable='false' />;
  };

  return (
    <div
      className={cn(
        'flex',
        orientation === 'horizontal' ? 'flex-row space-x-4' : 'flex-col space-y-4',
        className,
      )}
    >
      {linksArray.map((link, index) => (
        <a
          key={index}
          href={link.href}
          aria-label={link.label || link.text}
          className={cn(
            'rounded-full',
            'border-brand-primary-15 border',
            'flex items-center justify-center',
            'hover:border-brand-primary',
            'transition duration-300 ease-out',
            'hover:-translate-y-1',
            showText ? 'px-4' : '',
            sizeClasses[size],
            linkClassName,
          )}
          target='_blank'
          rel='noopener noreferrer'
        >
          {renderIcon(link.icon)}
          {!showText && <span className='sr-only'>{link.label || link.text}</span>}
          {showText && (
            <span className={cn('ml-2', 'text-color-text-primary', 'text-sm')}>{link.text}</span>
          )}
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
