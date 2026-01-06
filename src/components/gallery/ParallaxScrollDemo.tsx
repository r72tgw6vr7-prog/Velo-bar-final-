import { ParallaxScroll } from '@/components/ui/parallax-scroll';
import { PARALLAX_GALLERY_IMAGES } from '@/data/parallaxGalleryImages';

export function ParallaxScrollDemo() {
  return <ParallaxScroll images={PARALLAX_GALLERY_IMAGES} />;
}
