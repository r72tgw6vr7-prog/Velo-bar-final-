/**
 * LocationCard Component
 * =====================
 * Modern location card component for homepage locations section
 * Based on VenueLandingPage pattern with consistent styling
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { ResponsiveImageWithMetadata as ResponsiveImage } from '@/components/atoms/ResponsiveImage/ResponsiveImageWithMetadata.tsx';
import { cn } from '@/utils/classname.ts';

export interface LocationCardProps {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  ctaText: string;
  ctaLink: string;
  features?: string[];
  className?: string;
}

export const LocationCard: React.FC<LocationCardProps> = ({
  title,
  description,
  image,
  imageAlt,
  ctaText,
  ctaLink,
  features = [],
  className = '',
}) => {
  return (
    <div
      className={cn(
        'group border-brand/10 hover:border-accent/30 relative flex h-full cursor-pointer flex-col rounded-lg border p-4 transition duration-200 ease-out',
        className,
      )}
    >
      {/* Background image with overlay */}
      <div className='absolute inset-0 z-0'>
        <ResponsiveImage
          src={image}
          alt={imageAlt}
          sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
          className='h-full w-full object-cover'
          loading='lazy'
          fetchPriority='low'
        />
        <div
          className='absolute inset-0 bg-gradient-to-t from-[rgba(0,49,65,0.8)] via-[rgba(0,49,65,0.4)] to-transparent'
          style={{
            background: 'linear-gradient(to top, var(--surface-page), transparent)',
          }}
        />
      </div>

      {/* Content */}
      <div className='relative z-10 flex h-full flex-col p-6 text-white'>
        <h4 className='mb-2 font-semibold text-white'>{title}</h4>

        <p className='mb-4 text-sm text-white/80'>{description}</p>

        {/* Feature bullets */}
        {features.length > 0 && (
          <ul className='mb-4 space-y-2'>
            {features.map((feature, index) => (
              <li
                key={index}
                className='font-body text-text-body before:text-color-coral flex items-center justify-center gap-2 text-sm before:text-lg before:content-["•"]'
              >
                <span className='text-white'>{feature}</span>
              </li>
            ))}
          </ul>
        )}

        {/* CTA */}
        <div className='mt-auto'>
          <Link
            to={ctaLink}
            className='bg-accent text-brand hover:bg-accent/90 focus-visible:ring-accent inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors duration-200 focus-visible:ring-1 focus-visible:outline-none'
          >
            {ctaText}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LocationCard;
