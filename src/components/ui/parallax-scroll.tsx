import { useEffect, useMemo, useRef, useState } from 'react';
import React from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Button, ResponsiveImage } from '@/components/atoms/index.ts';
import { useMediaQuery } from '@/hooks/useMediaQuery.ts';
import './ParallaxScrollDemo.css';

interface ParallaxImage {
  basePath: string;
  alt: string;
}

interface ParallaxScrollProps {
  images: ParallaxImage[];
  className?: string;
}

const BASE_COLUMNS = 4;
const BATCH_SIZE = 8; // Reduced from 15 for better performance
const MEMORY_UNLOAD_THRESHOLD = 1000; // px distance before unloading
const ROWS_PER_BATCH = Math.max(1, Math.ceil(BATCH_SIZE / BASE_COLUMNS));

const buildRows = (items: ParallaxImage[], columns: number) => {
  const rows: ParallaxImage[][] = [];
  for (let i = 0; i < items.length; i += columns) {
    rows.push(items.slice(i, i + columns));
  }
  return rows;
};

const mergeForMobile = (columns: ParallaxImage[][], targetColumnCount: number) => {
  if (targetColumnCount === BASE_COLUMNS) {
    return columns;
  }
  // Mobile: redistribute base columns into fewer columns for a more balanced layout
  if (targetColumnCount === 2 && columns.length >= 4) {
    const merged0: ParallaxImage[] = [];
    const merged1: ParallaxImage[] = [];
    const maxLen = Math.max(...columns.map((col) => col.length));

    for (let i = 0; i < maxLen; i += 1) {
      const c0 = columns[0]?.[i];
      const c1 = columns[1]?.[i];
      const c2 = columns[2]?.[i];
      const c3 = columns[3]?.[i];

      if (c0) merged0.push(c0);
      if (c1) merged1.push(c1);
      if (c2) merged0.push(c2);
      if (c3) merged1.push(c3);
    }

    return [merged0, merged1];
  }

  const merged: ParallaxImage[][] = Array.from({ length: targetColumnCount }, () => []);

  columns.forEach((col, index) => {
    merged[index % targetColumnCount].push(...col);
  });

  return merged;
};

const Tile = React.memo(({ image }: { image: ParallaxImage }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '150px 0px', threshold: 0.1 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className='parallax-tile'>
      {isVisible ? (
        <ResponsiveImage
          src={image.basePath}
          alt={image.alt}
          sizes='(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw'
          aspectRatio='3/4'
          priority={false}
        />
      ) : (
        <div className='parallax-tile__placeholder' />
      )}
    </div>
  );
});

export const ParallaxScroll = ({ images, className }: ParallaxScrollProps) => {
  gsap.registerPlugin(ScrollTrigger);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const accordionRef = useRef<HTMLDivElement | null>(null);
  const column0Ref = useRef<HTMLDivElement | null>(null);
  const column1Ref = useRef<HTMLDivElement | null>(null);
  const column2Ref = useRef<HTMLDivElement | null>(null);
  const column3Ref = useRef<HTMLDivElement | null>(null);
  
  const isMobile = useMediaQuery('(max-width: 767px)');
  const columnCount = isMobile ? 2 : BASE_COLUMNS;
  const [visibleRows, setVisibleRows] = useState(ROWS_PER_BATCH);
  const [isExpanding, setIsExpanding] = useState(false);

  const rows = useMemo(() => buildRows(images, BASE_COLUMNS), [images]);
  const maxRows = rows.length;

  useEffect(() => {
    setVisibleRows((current) =>
      Math.min(Math.max(current, ROWS_PER_BATCH), maxRows || ROWS_PER_BATCH),
    );
  }, [maxRows]);

  const visibleRowSlice = useMemo(() => rows.slice(0, visibleRows), [rows, visibleRows]);

  const baseColumns = useMemo(
    () =>
      Array.from({ length: BASE_COLUMNS }, (_, colIndex) =>
        visibleRowSlice.map((row) => row[colIndex]).filter(Boolean),
      ),
    [visibleRowSlice],
  );

  const responsiveColumns = useMemo(
    () => mergeForMobile(baseColumns, columnCount),
    [baseColumns, columnCount],
  );

  const canShowMore = visibleRows < maxRows;

  // GSAP ScrollTrigger parallax effect
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const container = containerRef.current;
    const col0 = column0Ref.current;
    const col1 = column1Ref.current;
    const col2 = column2Ref.current;
    const col3 = column3Ref.current;

    if (!container) return;

    const mm = gsap.matchMedia();

    const setup = (yValues: number[]) => {
      const columns = [col0, col1, col2, col3].filter(Boolean) as HTMLElement[];

      columns.forEach((column, index) => {
        gsap.to(column, {
          y: yValues[index] ?? yValues[yValues.length - 1],
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.4,
            invalidateOnRefresh: true,
          },
        });
      });
    };

    mm.add('(max-width: 767px)', () => {
      // Mobile: 2 columns (balanced movement prevents big empty areas)
      setup([160, -160]);
    });

    mm.add('(min-width: 768px)', () => {
      // Desktop: 4 columns (balanced movement prevents huge bottom gap)
      setup([260, 100, -100, -320]);
    });

    return () => {
      mm.revert();
    };
  }, [columnCount]);

  // Handle "Show more photos" expansion with proper refresh
  const handleShowMore = () => {
    // Prevent rapid multiple clicks
    if (isExpanding) return;
    setIsExpanding(true);

    const accordion = accordionRef.current;
    
    // Update visible rows first
    setVisibleRows((current) => Math.min(current + ROWS_PER_BATCH, maxRows));

    if (!accordion) {
      // Simple fallback - just reset flag after brief delay
      setTimeout(() => {
        setIsExpanding(false);
      }, 150);
      return;
    }

    // Mark accordion as expanding
    accordion.classList.add('is-expanding');

    // Guaranteed cleanup with multiple fallbacks
    const resetExpandState = () => {
      // Force remove the class
      accordion.classList.remove('is-expanding');
      
      // Double check and force remove again
      setTimeout(() => {
        accordion.classList.remove('is-expanding');
        setIsExpanding(false);
      }, 50);
      
      // Refresh ScrollTrigger after DOM updates
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    };

    // Multiple cleanup attempts with different timings
    setTimeout(resetExpandState, 300);
    setTimeout(() => {
      accordion.classList.remove('is-expanding');
      setIsExpanding(false);
    }, 500);
  };

  return (
    <section ref={containerRef} className={`parallax-scroll-section ${className ?? ''}`}>
      <div className='parallax-scroll-container'>
        <div ref={gridRef} className='parallax-grid' id='velo-gallery-grid'>
          <div ref={column0Ref} className='parallax-column'>
            {responsiveColumns[0]?.map((image, imageIndex) => (
              <Tile key={`col0-${image.basePath}-${imageIndex}`} image={image} />
            ))}
          </div>

          <div ref={column1Ref} className='parallax-column'>
            {responsiveColumns[1]?.map((image, imageIndex) => (
              <Tile key={`col1-${image.basePath}-${imageIndex}`} image={image} />
            ))}
          </div>

          {responsiveColumns[2] && (
            <div ref={column2Ref} className='parallax-column'>
              {responsiveColumns[2].map((image, imageIndex) => (
                <Tile key={`col2-${image.basePath}-${imageIndex}`} image={image} />
              ))}
            </div>
          )}

          {responsiveColumns[3] && (
            <div ref={column3Ref} className='parallax-column'>
              {responsiveColumns[3].map((image, imageIndex) => (
                <Tile key={`col3-${image.basePath}-${imageIndex}`} image={image} />
              ))}
            </div>
          )}
        </div>
      </div>

      {canShowMore && (
        <div ref={accordionRef} className='parallax-accordion'>
          <Button
            type='button'
            variant='inverse'
            onClick={handleShowMore}
            aria-controls='velo-gallery-grid'
            disabled={isExpanding}
          >
            Mehr Bilder anzeigen
          </Button>
        </div>
      )}
    </section>
  );
};

export default ParallaxScroll;
