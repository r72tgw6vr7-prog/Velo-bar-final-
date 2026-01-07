/**
 * HeroParallax Component
 * ======================
 * Full height photos scattered, no text to avoid.
 */

import '@/styles/hero.css';
import { ResponsiveImageWithMetadata as ResponsiveImage } from '@/components/atoms/ResponsiveImage/ResponsiveImageWithMetadata.tsx';

interface PhotoFrame {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  top: number;
  left: number;
  rotation: number;
}

// Photos scattered across full background (10vh to 70vh)
// 15 photos, random placement, mix of sizes 120-180px
const scatteredPhotos: PhotoFrame[] = [
  // Top area (10vh-25vh)
  {
    id: 'p1',
    src: '/Velo Gallery/mobile-bar-hero-640w',
    alt: 'Mobile bar',
    width: 160,
    height: 120,
    top: 80,
    left: 100,
    rotation: -2,
  },
  {
    id: 'p2',
    src: '/Velo Gallery/drinks-selection',
    alt: 'Drinks',
    width: 140,
    height: 140,
    top: 90,
    left: 320,
    rotation: 1,
  },
  {
    id: 'p3',
    src: '/Velo Gallery/event-1-640w',
    alt: 'Event',
    width: 180,
    height: 130,
    top: 70,
    left: 520,
    rotation: -3,
  },
  {
    id: 'p4',
    src: '/Velo Gallery/gin-tasting-640w',
    alt: 'Gin',
    width: 120,
    height: 120,
    top: 100,
    left: 750,
    rotation: 2,
  },
  {
    id: 'p5',
    src: '/Velo Gallery/event-2-640w',
    alt: 'Corporate',
    width: 150,
    height: 110,
    top: 85,
    left: 920,
    rotation: -1,
  },

  // Middle area (25vh-45vh)
  {
    id: 'p6',
    src: '/Velo Gallery/wedding-bar',
    alt: 'Wedding',
    width: 170,
    height: 140,
    top: 200,
    left: 150,
    rotation: 1,
  },
  {
    id: 'p7',
    src: '/Velo Gallery/event-3-640w',
    alt: 'Barkeeper',
    width: 130,
    height: 130,
    top: 220,
    left: 380,
    rotation: -2,
  },
  {
    id: 'p8',
    src: '/Velo Gallery/mobile-bar-setup-640w',
    alt: 'Setup',
    width: 160,
    height: 120,
    top: 190,
    left: 580,
    rotation: 3,
  },
  {
    id: 'p9',
    src: '/Velo Gallery/mobile-bar-hero-640w',
    alt: 'Bar',
    width: 140,
    height: 140,
    top: 210,
    left: 800,
    rotation: -1,
  },
  {
    id: 'p10',
    src: '/Velo Gallery/drinks-selection',
    alt: 'Selection',
    width: 180,
    height: 130,
    top: 195,
    left: 1000,
    rotation: 2,
  },

  // Lower area (45vh-70vh)
  {
    id: 'p11',
    src: '/Velo Gallery/event-1-640w',
    alt: 'Party',
    width: 150,
    height: 150,
    top: 320,
    left: 120,
    rotation: -3,
  },
  {
    id: 'p12',
    src: '/Velo Gallery/gin-tasting-640w',
    alt: 'Tasting',
    width: 120,
    height: 120,
    top: 340,
    left: 340,
    rotation: 1,
  },
  {
    id: 'p13',
    src: '/Velo Gallery/event-2-640w',
    alt: 'Corporate',
    width: 160,
    height: 140,
    top: 310,
    left: 520,
    rotation: -2,
  },
  {
    id: 'p14',
    src: '/Velo Gallery/wedding-bar',
    alt: 'Wedding',
    width: 140,
    height: 110,
    top: 330,
    left: 740,
    rotation: 2,
  },
  {
    id: 'p15',
    src: '/Velo Gallery/event-3-640w',
    alt: 'Barkeeper',
    width: 170,
    height: 130,
    top: 325,
    left: 920,
    rotation: -1,
  },
];

interface HeroParallaxProps {
  className?: string;
}

export const HeroParallax = ({ className = '' }: HeroParallaxProps) => {
  const rows: Array<PhotoFrame[]> = [
    scatteredPhotos.slice(0, 5),
    scatteredPhotos.slice(5, 10),
    scatteredPhotos.slice(10, 15),
  ];

  const repeatCount = 2;

  const getRepeatedRow = (row: PhotoFrame[]): PhotoFrame[] => {
    const repeated: PhotoFrame[] = [];
    for (let i = 0; i < repeatCount; i += 1) {
      repeated.push(...row);
    }
    return repeated;
  };

  const getPosterVariantClass = (index: number, offset: number): string => {
    const patternIndex = (index + offset) % 5;
    switch (patternIndex) {
      case 0:
        return 'landscape';
      case 1:
        return 'portrait';
      case 2:
        return 'panorama';
      case 3:
        return 'square-md';
      default:
        return 'square-sm';
    }
  };

  return (
    <div className={`hero-parallax ${className}`}>
      {rows.map((row, rowIndex) => {
        const repeatedRow = getRepeatedRow(row);
        const rowOffset = rowIndex * 2;

        return (
          <div key={`row-${rowIndex}`} className='hero-parallax-track'>
            <div className='hero-parallax-group'>
              {repeatedRow.map((photo, index) => (
                <div
                  key={`${photo.id}-${rowIndex}-a-${index}`}
                  className={`hero-parallax-poster ${getPosterVariantClass(index, rowOffset)}`}
                  style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
                >
                  <ResponsiveImage
                    src={photo.src}
                    alt={photo.alt}
                    sizes='160px'
                    className='h-full w-full'
                    priority={rowIndex === 0 && index === 0}
                    fetchPriority={rowIndex === 0 && index === 0 ? 'high' : 'low'}
                  />
                </div>
              ))}
            </div>

            <div className='hero-parallax-group' aria-hidden='true'>
              {repeatedRow.map((photo, index) => (
                <div
                  key={`${photo.id}-${rowIndex}-b-${index}`}
                  className={`hero-parallax-poster ${getPosterVariantClass(index, rowOffset)}`}
                  style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
                >
                  <ResponsiveImage
                    src={photo.src}
                    alt={photo.alt}
                    sizes='160px'
                    className='h-full w-full'
                    priority={false}
                    fetchPriority='low'
                  />
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HeroParallax;
