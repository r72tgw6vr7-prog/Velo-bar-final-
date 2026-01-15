/**
 * MenuPage - Drinks Menu
 */

import React, { useMemo } from 'react';
import { PageTemplate } from '@/templates/PageTemplate';
import { SiteBackground } from '@/components/layout/SiteBackground';
import { HeroHeading } from '@/components/ui/HeroHeading.tsx';
import { DrinksShowcase } from '@/sections/DrinksShowcase.tsx';
import { Helmet } from 'react-helmet-async';
import { getBreadcrumbSchema, combineSchemas } from '@/seo/schema.ts';
import { useLanguage } from '@/contexts/LanguageContext.tsx';

const MenuPage: React.FC = () => {
  const { t, language } = useLanguage();

  // SEO: ItemList schema for cocktail menu + breadcrumbs
  const menuSchema = useMemo(() => combineSchemas(
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Velo.Bar Cocktail Menu',
      description: language === 'de' 
        ? 'Cocktail-Auswahl für Events: Klassiker, Longdrinks und alkoholfreie Optionen'
        : 'Cocktail selection for events: classics, longdrinks and non-alcoholic options',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: language === 'de' ? 'Klassische Cocktails' : 'Classic Cocktails',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: language === 'de' ? 'Longdrinks' : 'Longdrinks',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: language === 'de' ? 'Alkoholfreie Cocktails' : 'Non-Alcoholic Cocktails',
        },
      ],
    },
    getBreadcrumbSchema([
      { name: 'Home', url: 'https://www.velo-bar.com' },
      { name: language === 'de' ? 'Drinks' : 'Drinks', url: 'https://www.velo-bar.com/menu' },
    ]),
  ), [language]);

  return (
    <SiteBackground>
      <PageTemplate 
        title={t('menu.seoTitle')}
        description={t('menu.seoDescription')}
        withContainer={false} 
        background='transparent'
      >
        <Helmet>
          <script type='application/ld+json'>{JSON.stringify(menuSchema)}</script>
        </Helmet>
        <div className='drinks-page'>
          <HeroHeading
            className='w-full'
            eyebrow={t('menu.hero.eyebrow')}
            title={t('menu.hero.title')}
            titleClassName='drinks-title'
            subtitle={t('menu.hero.subtitle')}
          />

          <div className='drinks-content'>
            <DrinksShowcase />
          </div>
        </div>
      </PageTemplate>
    </SiteBackground>
  );
};

export default MenuPage;
