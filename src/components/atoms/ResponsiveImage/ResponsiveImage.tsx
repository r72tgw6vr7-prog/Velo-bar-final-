/**
 * ResponsiveImage Component
 * =========================
 *
 * Optimized image component with:
 * - Responsive srcset (320w, 640w, 1024w, 1920w)
 * - WebP format with fallback
 * - Lazy loading below the fold
 * - Automatic sizes calculation
 * - Loading states
 *
 * @example
 * ```tsx
 * <ResponsiveImage
 *   src="/assets/backgrounds/cosmic-unified"
 *   alt="Cosmic background"
 *   sizes="100vw"
 *   priority={false}
 * />
 * ```
 *
 * @component
 * @category Atoms
 */

import React, { useState } from 'react';
import { cn } from '@/utils/classname.ts';
import { resolvePublicPath, publicHas } from '@/utils/resolvePublicPath.ts';

/**
 * Responsive image breakpoints - optimized for mobile-first, remove oversized 1920w
 */
const RESPONSIVE_WIDTHS = [256, 320, 640, 1024] as const;

/**
 * ResponsiveImage props
 * @interface ResponsiveImageProps
 */
export interface ResponsiveImageProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet'> {
  /**
   * Image source path without extension
   * Will automatically append -320w.webp, -640w.webp, etc.
   * @example "/assets/backgrounds/cosmic-unified"
   */
  src: string;

  /**
   * Alt text (required for accessibility)
   */
  alt: string;

  /**
   * Sizes attribute for responsive images
   * @default "100vw"
   * @example "(max-width: 768px) 100vw, 50vw"
   */
  sizes?: string;

  /**
   * Priority loading (disable lazy loading for above-the-fold images)
   * @default false
   */
  priority?: boolean;

  /**
   * Aspect ratio to prevent layout shift
   * @example "16/9" or "4/3"
   */
  aspectRatio?: string;

  /**
   * Object fit behavior
   * @default "cover"
   */
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';

  /**
   * Object position
   * @default "center"
   */
  objectPosition?: string;

  /**
   * Base64 blur placeholder for loading state
   * @example "data:image/webp;base64,UklGRi..."
   */
  placeholder?: string;

  /**
   * Show loading placeholder
   * @default true
   */
  showPlaceholder?: boolean;

  /**
   * Fallback image format if WebP not supported
   * @default "jpg"
   */
  fallbackFormat?: 'jpg' | 'jpeg' | 'png';
}

/**
 * ResponsiveImage Component
 */
export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  sizes = '100vw',
  priority = false,
  aspectRatio,
  objectFit = 'cover',
  objectPosition = 'center',
  placeholder,
  showPlaceholder = true,
  fallbackFormat,
  className,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [useFallback, setUseFallback] = useState(false);

  const { loading, decoding, fetchPriority, style: imgStyleProp, ...imgProps } = props;

  const extensionMatch = src.match(/\.([a-zA-Z0-9]+)$/);
  const srcExtension = extensionMatch?.[1]?.toLowerCase();
  const hasKnownExtension = Boolean(
    srcExtension && ['jpg', 'jpeg', 'png', 'webp', 'avif'].includes(srcExtension),
  );
  const isSizeSuffixLiteral = /-\d+w\.(webp|jpe?g|png|avif)$/i.test(src);
  const literalAsset = hasKnownExtension || isSizeSuffixLiteral;
  const baseSrc = hasKnownExtension ? src.replace(/\.[a-zA-Z0-9]+$/, '') : src;

  const effectiveFallbackFormat: ResponsiveImageProps['fallbackFormat'] =
    srcExtension && srcExtension !== 'webp' && ['jpg', 'jpeg', 'png'].includes(srcExtension)
      ? (srcExtension as 'jpg' | 'jpeg' | 'png')
      : 'jpg';

  const computedFallbackFormat = fallbackFormat ?? effectiveFallbackFormat;

  const computedLoading = loading ?? (priority ? 'eager' : 'lazy');
  const computedDecoding = decoding ?? (priority ? 'sync' : 'async');
  const computedFetchPriority = fetchPriority ?? (priority ? 'high' : 'low');

  // Generate srcset for responsive images
  const generateSrcSet = () => {
    return RESPONSIVE_WIDTHS.map((width) => `${baseSrc}-${width}w.webp ${width}w`).join(', ');
  };

  // Generate fallback srcset for non-WebP browsers
  const generateFallbackSrcSet = () => {
    return RESPONSIVE_WIDTHS.map(
      (width) => `${baseSrc}-${width}w.${computedFallbackFormat} ${width}w`,
    ).join(', ');
  };

  // Default image (original size WebP)
  const defaultSrc = `${baseSrc}.webp`;
  const fallbackSrc = `${baseSrc}.${computedFallbackFormat}`;

  // Handle load
  const handleLoad = () => {
    setIsLoaded(true);
  };

  // Handle error
  const handleError = () => {
    if (!useFallback) {
      setUseFallback(true);
      return;
    }
    setError(true);
    console.warn(`Failed to load image: ${src}`);
  };

  // Compute wrapper styles
  const wrapperStyle: React.CSSProperties = {
    position: 'relative',
    overflow: 'hidden',
    ...(aspectRatio && { aspectRatio }),
  };

  // Compute image styles
  const imageStyle: React.CSSProperties = {
    objectFit,
    objectPosition,
    width: '100%',
    height: '100%',
    ...(imgStyleProp || {}),
  };

  const shouldShowPlaceholder = showPlaceholder && !isLoaded && !error && Boolean(placeholder);

  return (
    <div className={cn('responsive-image-wrapper', className)} style={wrapperStyle}>
      {/* Blur-up placeholder */}
      {shouldShowPlaceholder && (
        <div className='absolute inset-0' aria-hidden='true'>
          <img
            src={placeholder}
            alt=''
            className='h-full w-full scale-110 object-cover blur-sm'
            style={{ imageRendering: 'pixelated' }}
          />
        </div>
      )}

      {/* Picture element with WebP and fallback. If this is a literal asset (explicit filename/extension or size-suffixed), resolve exactly and do not synthesize filenames. */}
      {literalAsset ? (
        (() => {
          // Literal asset mode: respect exact src and only render actual files that exist in the manifest
          const resolved = resolvePublicPath(src);
          // publicHas already imported above

          // Try to provide other format sources only if they physically exist
          const extMatch = resolved.match(/\.(webp|jpe?g|png|avif)$/i);
          const base = extMatch ? resolved.slice(0, -extMatch[0].length) : resolved;

          const candidates: Array<{ type: string; url: string }> = [];
          // prefer avif then webp then original
          const formatOrder = ['.avif', '.webp', extMatch ? extMatch[0] : ''];
          formatOrder.forEach((ext) => {
            if (!ext) return;
            const candidate = base + ext;
            if (publicHas(candidate))
              candidates.push({
                type: `image/${ext.replace('.', '')}`,
                url: resolvePublicPath(candidate),
              });
          });

          return (
            <picture>
              {candidates.map((c) => (
                <source key={c.url} type={c.type} srcSet={c.url} sizes={sizes} />
              ))}

              <img
                src={resolvePublicPath(src)}
                alt={alt}
                loading={computedLoading}
                decoding={computedDecoding}
                fetchPriority={computedFetchPriority}
                onLoad={handleLoad}
                onError={handleError}
                style={imageStyle}
                className={cn(
                  'transition-opacity duration-300',
                  isLoaded ? 'opacity-100' : 'opacity-0',
                )}
                {...imgProps}
              />
            </picture>
          );
        })()
      ) : (
        <picture>
          {/* Only include srcset entries that actually exist in the manifest to avoid 404s */}
          {(() => {
            const makeSrcSet = (ext: string) =>
              RESPONSIVE_WIDTHS.map((width) => {
                const candidate = `${baseSrc}-${width}w${ext}`;
                const url = resolvePublicPath(candidate);
                return publicHas(url) ? `${url} ${width}w` : null;
              })
                .filter(Boolean)
                .join(', ');

            const avifSrcSet = makeSrcSet('.avif');
            const webpSrcSet = makeSrcSet('.webp');
            const fallbackSrcSet = makeSrcSet(`.${computedFallbackFormat}`);

            return (
              <>
                {avifSrcSet && <source type='image/avif' srcSet={avifSrcSet} sizes={sizes} />}
                {webpSrcSet && <source type='image/webp' srcSet={webpSrcSet} sizes={sizes} />}
                {fallbackSrcSet && (
                  <source
                    type={`image/${computedFallbackFormat}`}
                    srcSet={fallbackSrcSet}
                    sizes={sizes}
                  />
                )}
              </>
            );
          })()}

          {/* Fallback img element */}
          <img
            src={useFallback ? resolvePublicPath(fallbackSrc) : resolvePublicPath(defaultSrc)}
            alt={alt}
            loading={computedLoading}
            decoding={computedDecoding}
            fetchPriority={computedFetchPriority}
            onLoad={handleLoad}
            onError={handleError}
            style={imageStyle}
            className={cn(
              'transition-opacity duration-300',
              isLoaded ? 'opacity-100' : 'opacity-0',
            )}
            {...imgProps}
          />
        </picture>
      )}

      {/* Error state */}
      {error && (
        <div className='absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-900'>
          <div className='text-center text-gray-500 dark:text-gray-400'>
            <svg
              className='mx-auto mb-0 h-12 w-12'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
              />
            </svg>
            <p className='text-sm'>Image not available</p>
          </div>
        </div>
      )}
    </div>
  );
};

ResponsiveImage.displayName = 'ResponsiveImage';

export default ResponsiveImage;
