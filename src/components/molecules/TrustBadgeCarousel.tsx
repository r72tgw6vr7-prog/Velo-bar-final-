import React, { useRef, useEffect } from 'react';
import { TrustBadge } from '../atoms/TrustBadge';

interface TrustBadge {
  icon: string;
  text: string;
}

interface TrustBadgeCarouselProps {
  badges: TrustBadge[];
  className?: string;
  autoScroll?: boolean;
  speed?: number;
}

export const TrustBadgeCarousel: React.FC<TrustBadgeCarouselProps> = ({
  badges,
  className = '',
  autoScroll = true,
  speed = 30000, // 30 seconds for one full cycle
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!autoScroll || !scrollRef.current) return;

    const scrollContainer = scrollRef.current;
    const scrollWidth = scrollContainer.scrollWidth;
    const clientWidth = scrollContainer.clientWidth;

    // Only animate if content is wider than container
    if (scrollWidth <= clientWidth) return;

    let animationId: number;
    let startTime: number | null = null;
    let currentPosition = 0;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      // Calculate position based on elapsed time
      currentPosition = (elapsed / speed) * scrollWidth;

      // Reset when we've scrolled through the full width
      if (currentPosition >= scrollWidth - clientWidth) {
        startTime = timestamp;
        currentPosition = 0;
      }

      scrollContainer.scrollLeft = currentPosition % (scrollWidth - clientWidth);
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [autoScroll, speed]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Gradient fade on left side */}
      <div className='absolute top-0 left-0 z-10 h-full w-12 bg-linear-to-r from-(--deep-black) to-transparent'></div>

      <div
        ref={scrollRef}
        className='no-scrollbar flex gap-0 overflow-x-auto px-8 py-0'
        style={{ scrollBehavior: 'smooth' }}
      >
        {badges.map((badge, index) => (
          <TrustBadge key={`trust-badge-${index}`} icon={badge.icon} text={badge.text} />
        ))}

        {/* Add duplicates for continuous scrolling effect */}
        {badges.length > 0 && autoScroll && (
          <>
            {badges.map((badge, index) => (
              <TrustBadge
                key={`trust-badge-duplicate-${index}`}
                icon={badge.icon}
                text={badge.text}
              />
            ))}
          </>
        )}
      </div>

      {/* Gradient fade on right side */}
      <div className='absolute top-0 right-0 z-10 h-full w-12 bg-linear-to-l from-(--deep-black) to-transparent'></div>
    </div>
  );
};

export default TrustBadgeCarousel;
