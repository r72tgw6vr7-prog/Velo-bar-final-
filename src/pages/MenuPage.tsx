/**
 * MenuPage - Drinks Menu
 */

import React from 'react';
import { PageTemplate } from '@/templates/PageTemplate';
import { HeroHeading } from '@/components/ui/HeroHeading';
import { DrinksShowcase } from '@/sections/DrinksShowcase';

const MenuPage: React.FC = () => {
  return (
    <PageTemplate withContainer={false} background='transparent'>
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
