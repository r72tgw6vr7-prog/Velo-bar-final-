import { ParallaxScroll } from '@/components/ui/parallax-scroll.tsx';
import { PARALLAX_GALLERY_IMAGES } from '@/data/parallaxGalleryImages.ts';

export function ParallaxScrollDemo() {
  return <ParallaxScroll images={PARALLAX_GALLERY_IMAGES} />;
}
