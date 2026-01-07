/**
 * IMAGE VALIDATION AND ERROR HANDLING UTILITIES
 * =============================================
 * Provides robust image loading with fallbacks and error handling.
 */

import { IMAGE_PATHS } from '../config/imagePaths.ts';

/**
 * Validates if an image exists by attempting to load it
 */
export const validateImage = async (path: string): Promise<boolean> => {
  try {
    const response = await fetch(path, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
};

/**
 * React image props with automatic fallback handling
 * Usage: <img {...getImageWithFallback('/images/placeholder.svg')} alt="Eli" />
 */
export const getImageWithFallback = (
  primaryPath: string,
  fallbackPath: string = IMAGE_PATHS.fallback.placeholder,
) => {
  return {
    src: primaryPath,
    onError: (e: React.SyntheticEvent<HTMLImageElement>) => {
      const target = e.currentTarget;
      // Prevent infinite loop if fallback also fails
      if (target.src !== fallbackPath) {
        // eslint-disable-next-line no-console
        console.warn(`Failed to load image: ${primaryPath}, using fallback: ${fallbackPath}`);
        target.src = fallbackPath;
      }
    },
    onLoad: () => {
      // eslint-disable-next-line no-console
      console.log(`[Image] Loaded successfully: ${primaryPath}`);
    },
  };
};

/**
 * Custom hook for image loading with state management
 */
export const useImageLoader = (src: string, fallback?: string) => {
  const [imageSrc, setImageSrc] = React.useState(src);
  const [isLoading, setIsLoading] = React.useState(true);
  const [hasError, setHasError] = React.useState(false);

  React.useEffect(() => {
    const img = new Image();
    img.src = src;

    img.onload = () => {
      setImageSrc(src);
      setIsLoading(false);
      setHasError(false);
    };

    img.onerror = () => {
      if (fallback) {
        setImageSrc(fallback);
      }
      setIsLoading(false);
      setHasError(true);
      // eslint-disable-next-line no-console
      console.error(`Failed to load image: ${src}`);
    };

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src, fallback]);

  return { imageSrc, isLoading, hasError };
};

// Re-export React for the hook
import React from 'react';

/**
 * Preload images to avoid loading delays
 */
export const preloadImages = (urls: string[]): Promise<void[]> => {
  return Promise.all(
    urls.map(
      (url) =>
        new Promise<void>((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve();
          img.onerror = () => {
            // eslint-disable-next-line no-console
            console.warn(`Failed to preload: ${url}`);
            reject(new Error(`Failed to preload: ${url}`));
          };
          img.src = url;
        }),
    ),
  );
};

/**
 * Get optimized image attributes for better performance
 */
export const getOptimizedImageProps = (src: string, alt: string) => {
  return {
    alt,
    loading: 'lazy' as const,
    decoding: 'async' as const,
    ...getImageWithFallback(src),
  };
};
