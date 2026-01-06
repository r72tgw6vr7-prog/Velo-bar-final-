import React, { useState, ImgHTMLAttributes } from 'react';

interface SafeImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  fallback?: string;
  alt: string;
}

/**
 * SafeImage Component - Handles broken images gracefully
 * Features:
 * - Automatic fallback on error
 * - Lazy loading by default
 * - Console warnings for debugging
 * - Error state tracking
 */
export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  fallback = '/images/fallback/default-image.webp',
  alt,
  className = '',
  loading = 'lazy',
  ...props
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [isError, setIsError] = useState(false);

  const handleError = () => {
    if (imgSrc !== fallback) {
      console.warn(`Failed to load image: ${imgSrc}`);
      setImgSrc(fallback);
      setIsError(true);
    }
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      onError={handleError}
      className={`${className} ${isError ? 'image-fallback' : ''}`}
      loading={loading}
      {...props}
    />
  );
};
