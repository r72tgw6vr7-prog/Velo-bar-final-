/**
 * GalleryPage - Event Photo Gallery
 */

import React from 'react';
import { PageTemplate } from '@/templates/PageTemplate';
import { SiteBackground } from '@/components/layout/SiteBackground';
import { ParallaxScrollDemo } from '@/components/gallery/ParallaxScrollDemo.tsx';
import { HeroHeading } from '@/components/ui/HeroHeading.tsx';
import { useLanguage } from '@/contexts/LanguageContext.tsx';
import { combineSchemas, getEventSchema } from '@/seo/schema.ts';
import { SITE_URL } from '@/lib/site.ts';
import { PARALLAX_GALLERY_IMAGES } from '@/data/parallaxGalleryImages.ts';

export const GalleryPage: React.FC = () => {
  const { t } = useLanguage();

  const eventSchemas = PARALLAX_GALLERY_IMAGES.map((img) => {
    const match = img.basePath.match(/\/(\d{8})-/);
    if (!match) return null;

    const yyyymmdd = match[1];
    const isoDate = `${yyyymmdd.slice(0, 4)}-${yyyymmdd.slice(4, 6)}-${yyyymmdd.slice(6, 8)}`;
    const alt = img.alt || 'Event Impression';
    const name = alt.toLowerCase().includes('event') || alt.toLowerCase().includes('messe')
      ? alt
      : `Velo.Bar Event – ${alt}`;

    return getEventSchema({
      name,
      description: 'Event-Foto aus der Velo.Bar Galerie.',
      startDate: isoDate,
      location: 'München',
      url: `${SITE_URL}/galerie`,
      image: `${SITE_URL}${img.basePath}-640w.webp`,
    });
  }).filter(Boolean) as Record<string, unknown>[];

  const galleryStructuredData = eventSchemas.length > 0 ? combineSchemas(...eventSchemas) : undefined;

  return (
    <SiteBackground>
      <PageTemplate
        title={t('pages.gallery.seo.title')}
        description={t('pages.gallery.seo.description')}
        canonicalPath='/galerie'
        structuredData={galleryStructuredData}
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
