import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { IncludedItemCard, IncludedItemCardProps } from '../molecules/IncludedItemCard.ts';
import '../../styles/included-carousel.css';

export interface IncludedItemsCarouselProps {
  items: IncludedItemCardProps[];
  eyebrow?: string;
}

export const IncludedItemsCarousel: React.FC<IncludedItemsCarouselProps> = ({
  items,
  eyebrow = 'Was ist immer inklusive?',
}) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;

    const scrollAmount = carouselRef.current.offsetWidth * 0.5;
    const newScrollLeft =
      carouselRef.current.scrollLeft + (direction === 'right' ? scrollAmount : -scrollAmount);

    carouselRef.current.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth',
    });
  };

  return (
    <div className='included-carousel-section'>
      {eyebrow && (
        <h2 className='mb-16 flex justify-center'>
          <span
            className='inline-flex items-center rounded-full px-6 py-2 shadow-sm'
            style={{ backgroundColor: '#fff8ec' }}
          >
            <span className='text-sm font-semibold tracking-wide text-(--color-accent-primary,rgb(238,120,104))'>
              {eyebrow}
            </span>
          </span>
        </h2>
      )}

      <div className='included-carousel-wrapper'>
        {/* Desktop Navigation Arrows */}
        <button
          onClick={() => scroll('left')}
          className='included-carousel-arrow included-carousel-arrow--left'
          aria-label='Previous items'
        >
          <ChevronLeft className='h-6 w-6' />
        </button>

        {/* Carousel Track */}
        <div
          ref={carouselRef}
          className='included-carousel'
          role='region'
          aria-label='Included services carousel'
        >
          {items.map((item, index) => (
            <IncludedItemCard key={index} {...item} />
          ))}
        </div>

        {/* Desktop Navigation Arrows */}
        <button
          onClick={() => scroll('right')}
          className='included-carousel-arrow included-carousel-arrow--right'
          aria-label='Next items'
        >
          <ChevronRight className='h-6 w-6' />
        </button>
      </div>

      {/* Progress Dots for Mobile */}
      <div className='included-carousel-dots'>
        {items.slice(0, Math.ceil(items.length / 2)).map((_, index) => (
          <div key={index} className='included-carousel-dot' />
        ))}
      </div>
    </div>
  );
};

export default IncludedItemsCarousel;
