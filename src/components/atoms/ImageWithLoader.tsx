import React, { useState } from 'react';
import { SafeImage } from './SafeImage.ts';

interface ImageWithLoaderProps {
  src: string;
  alt: string;
  className?: string;
  fallback?: string;
  loading?: 'lazy' | 'eager';
}

/**
 * ImageWithLoader - Shows skeleton while loading
 * Provides smooth loading experience with skeleton placeholder
 */
export const ImageWithLoader: React.FC<ImageWithLoaderProps> = ({
  src,
  alt,
  className = '',
  fallback,
  loading = 'lazy',
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className='relative'>
      {/* Skeleton loader */}
      {!isLoaded && <div className='bg-deep-black absolute inset-0 animate-pulse rounded-lg' />}

      {/* Actual image */}
      <SafeImage
        src={src}
        alt={alt}
        className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
        fallback={fallback}
        loading={loading}
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
};
