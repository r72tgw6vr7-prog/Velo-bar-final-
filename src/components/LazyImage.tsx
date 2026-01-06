import { useState, useRef, useEffect } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  quality?: number;
}

export function LazyImage({ src, alt, className, placeholder, quality = 80 }: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '50px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const optimizedSrc = isInView ? `/api/optimize-image?src=${encodeURIComponent(src)}&quality=${quality}` : '';

  return (
    <div className={className} ref={imgRef}>
      {!isLoaded && placeholder && (
        <div className="animate-pulse bg-gray-200 w-full h-full" />
      )}
      {isInView && (
        <img
          src={optimizedSrc}
          alt={alt}
          className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setIsLoaded(true)}
          loading="lazy"
        />
      )}
    </div>
  );
}

// Gallery component with lazy loading
export function OptimizedGallery({ images }: { images: string[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {images.map((src, index) => (
        <LazyImage
          key={index}
          src={src}
          alt={`Gallery image ${index + 1}`}
          className="aspect-square"
          quality={75}
        />
      ))}
    </div>
  );
}