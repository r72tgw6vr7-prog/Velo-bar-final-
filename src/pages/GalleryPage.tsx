/**
 * GalleryPage - Event Photo Gallery
 */

import React from 'react';
import { PageTemplate } from '@/templates/PageTemplate';
import { SiteBackground } from '@/components/layout/SiteBackground';
import { ParallaxScrollDemo } from '@/components/gallery/ParallaxScrollDemo.tsx';
import { HeroHeading } from '@/components/ui/HeroHeading.tsx';
import { useLanguage } from '@/contexts/LanguageContext.tsx';

export const GalleryPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <SiteBackground>
      <PageTemplate
        title={t('pages.gallery.seo.title')}
        description={t('pages.gallery.seo.description')}
        canonicalPath='/galerie'
        withContainer={false}
        background='transparent'
      >
        <HeroHeading
          eyebrow={t('pages.gallery.hero.eyebrow')}
          title={t('pages.gallery.hero.title')}
          subtitle={t('pages.gallery.hero.subtitle')}
        />

        <ParallaxScrollDemo />
      </PageTemplate>
    </SiteBackground>
  );
};

export default GalleryPage;
