import React from 'react';

export type CarouselApi = {
  // Navigation
  scrollNext: () => void;
  scrollPrev: () => void;
  scrollTo: (index: number) => void;

  // State management
  selectedScrollSnap: () => number;
  on: (event: string, callback: () => void) => void;
  off: (event: string, callback: () => void) => void;
};

interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  setApi?: (api: CarouselApi) => void;
}

export function Carousel({ children, className = '', setApi, ...rest }: CarouselProps) {
  // State
  const [currentIndex, setCurrentIndex] = React.useState(0);

  // Create API methods
  React.useEffect(() => {
    if (setApi) {
      // Create a carousel API
      const api: CarouselApi = {
        scrollNext: () => {
          // Find next valid index
          const nextIndex = (currentIndex + 1) % React.Children.count(children);
          setCurrentIndex(nextIndex);
        },
        scrollPrev: () => {
          // Find previous valid index
          const prevIndex =
            (currentIndex - 1 + React.Children.count(children)) % React.Children.count(children);
          setCurrentIndex(prevIndex);
        },
        scrollTo: (index: number) => {
          // Validate index
          if (index >= 0 && index < React.Children.count(children)) {
            setCurrentIndex(index);
          }
        },
        selectedScrollSnap: () => currentIndex,
        on: (event: string, callback: () => void) => {
          // Simple event system
          if (event === 'select') {
            // We could implement a real event system here if needed
            callback();
          }
        },
        off: (event: string, callback: () => void) => {
          // Cleanup for event system
        },
      };

      setApi(api);
    }
  }, [setApi, currentIndex, children]);

  return (
    <div className={`relative w-full ${className}`} {...rest}>
      {children}
    </div>
  );
}

export function CarouselContent({
  children,
  className = '',
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`flex gap-(--gap,1rem) overflow-hidden ${className}`} {...rest}>
      {children}
    </div>
  );
}

export function CarouselItem({
  children,
  className = '',
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`shrink-0 ${className}`} {...rest}>
      {children}
    </div>
  );
}

export function CarouselPrevious({
  className = '',
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      aria-label='Previous'
      className={`absolute top-1/2 left-2 -translate-y-1/2 ${className}`}
      {...rest}
    >
      ‹
    </button>
  );
}

export function CarouselNext({
  className = '',
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      aria-label='Next'
      className={`absolute top-1/2 right-2 -translate-y-1/2 ${className}`}
      {...rest}
    >
      ›
    </button>
  );
}
