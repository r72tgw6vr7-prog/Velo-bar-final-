/**
 * GalleryGrid - Responsive Grid Layout with Lightbox
 * ===================================================
 * - Desktop: 3 rows (3 columns)
 * - Tablet: 2 rows (2 columns)
 * - Mobile: 1 row (1 column)
 * - Click to open full-size lightbox with navigation
 */

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { ResponsiveImageWithMetadata as ResponsiveImage } from '@/components/atoms/ResponsiveImage/ResponsiveImageWithMetadata';

interface GalleryImage {
  id: string;
  basePath: string;
  alt: string;
}

interface GalleryGridProps {
  images: GalleryImage[];
}

export const GalleryGrid: React.FC<GalleryGridProps> = ({ images }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = useCallback(() => {
    setSelectedIndex(null);
    document.body.style.overflow = 'auto';
  }, []);

  const goToPrevious = useCallback(() => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
    }
  }, [selectedIndex, images.length]);

  const goToNext = useCallback(() => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % images.length);
    }
  }, [selectedIndex, images.length]);

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;

      switch (e.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowLeft':
          goToPrevious();
          break;
        case 'ArrowRight':
          goToNext();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, goToPrevious, goToNext, closeLightbox]);

  return (
    <>
      {/* Gallery Grid */}
      <div className='gallery-grid-container'>
        <div className='gallery-grid'>
          {images.map((image, index) => (
            <div
              key={image.id}
              className='gallery-item'
              role='button'
              tabIndex={0}
              onClick={() => openLightbox(index)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  openLightbox(index);
                }
              }}
            >
              <div className='gallery-item-inner'>
                <ResponsiveImage
                  src={image.basePath}
                  alt={image.alt}
                  className='gallery-image'
                  sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
                  priority={false}
                  loading='lazy'
                />
                <div className='gallery-overlay'>
                  <span className='gallery-overlay-text'>Ansehen</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            className='lightbox-backdrop'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button className='lightbox-close' onClick={closeLightbox} aria-label='Close lightbox'>
              <X size={32} />
            </button>

            {/* Previous Button */}
            <button
              className='lightbox-nav lightbox-nav-prev'
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
              aria-label='Previous image'
            >
              <ChevronLeft size={40} />
            </button>

            {/* Next Button */}
            <button
              className='lightbox-nav lightbox-nav-next'
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              aria-label='Next image'
            >
              <ChevronRight size={40} />
            </button>

            {/* Image Container */}
            <motion.div
              className='lightbox-content'
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <AnimatePresence mode='wait'>
                <motion.picture
                  key={selectedIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                >
                  <source
                    type='image/webp'
                    srcSet={`${images[selectedIndex].basePath}-1920w.webp`}
                  />
                  <source
                    type='image/jpeg'
                    srcSet={`${images[selectedIndex].basePath}-1920w.jpg`}
                  />
                  <img
                    src={`${images[selectedIndex].basePath}-1920w.webp`}
                    alt={images[selectedIndex].alt}
                    className='lightbox-image'
                  />
                </motion.picture>
              </AnimatePresence>

              {/* Image Counter */}
              <div className='lightbox-counter'>
                {selectedIndex + 1} / {images.length}
              </div>

              {/* Image Caption */}
              {images[selectedIndex].alt !== 'Event impression' && (
                <div className='lightbox-caption'>{images[selectedIndex].alt}</div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GalleryGrid;
