/**
 * GalleryPage - Event Photo Gallery
 */

import React from 'react';
import { PageTemplate } from '@/templates/PageTemplate.tsx';
import { ParallaxScrollDemo } from '@/components/gallery/ParallaxScrollDemo';
import { HeroHeading } from '@/components/ui/HeroHeading';

export const GalleryPage: React.FC = () => {
  return (
    <PageTemplate
      title='Galerie'
      description='Eindrücke von unseren Events: Cocktailbars auf Firmenfeiern, Hochzeiten und privaten Feiern.'
      canonicalPath='/galerie'
      withContainer={false}
      background='transparent'
    >
      <HeroHeading
        eyebrow='Event Impressionen'
        title='Galerie'
        subtitle='So sieht es aus, wenn wir Ihr Event unvergesslich machen.'
      />

      <ParallaxScrollDemo />
    </PageTemplate>
  );
};

export default GalleryPage;
