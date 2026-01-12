/**
 * MenuPage - Drinks Menu
 */

import React from 'react';
import { PageTemplate } from '@/templates/PageTemplate';
import { HeroHeading } from '@/components/ui/HeroHeading.tsx';
import { DrinksShowcase } from '@/sections/DrinksShowcase.tsx';
import { Helmet } from 'react-helmet-async';
import { getBreadcrumbSchema, combineSchemas } from '@/seo/schema.ts';

const MenuPage: React.FC = () => {
  // SEO: ItemList schema for cocktail menu + breadcrumbs
  const menuSchema = combineSchemas(
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Velo.Bar Cocktail Menu',
      description: 'Cocktail-Auswahl für Events: Klassiker, SESES Longdrinks und alkoholfreie Optionen',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Klassische Cocktails',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'SESES Longdrinks',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Alkoholfreie Cocktails',
        },
      ],
    },
    getBreadcrumbSchema([
      { name: 'Home', url: 'https://www.velo-bar.com' },
      { name: 'Menu', url: 'https://www.velo-bar.com/menu' },
    ]),
  );

  return (
    <PageTemplate withContainer={false} background='transparent'>
      <Helmet>
        <script type='application/ld+json'>{JSON.stringify(menuSchema)}</script>
      </Helmet>
      <div className='drinks-page'>
        <HeroHeading
          className='w-full'
          eyebrow='Unsere Cocktails'
          title='Drinks'
          titleClassName='drinks-title'
          subtitle='Unsere Cocktail-Auswahl als Inspiration. Wir kreieren die passenden Drinks für Ihr Event.'
        />

        <div className='drinks-content'>
          <DrinksShowcase />
        </div>
      </div>
    </PageTemplate>
  );
};

export default MenuPage;
