import { Section } from '@/components/atoms/Section/Section';
import type { FC } from 'react';

const signatureCocktails = [
  {
    name: 'Himbeer - Hibiskus Fizz',
    imageBase: 'himbeer-hibiskus-fizz',
    ingredients: ['Vodka', 'SESES Himbeere - Hibiskus', 'Soda', 'Zitrone', 'Zucker'],
    type: 'Refreshing · Fruity',
    description:
      'Ein eleganter Fruchtcocktail mit floralen Noten und spritziger Frische. Perfekt für den Sommer.',
  },
  {
    name: 'Basil Smash',
    imageBase: 'basil-smash',
    ingredients: ['Gin', 'Basilikum', 'Zitrone', 'Zucker'],
    type: 'Fresh · Herbal',
    description:
      'Frischer Basilikum trifft auf Zitrus und eine elegante Gin-Basis – aromatisch und lebendig.',
  },
  {
    name: 'Maracuja Mojito',
    imageBase: 'minz-maracuja',
    ingredients: ['Rum', 'SESES Maracuja - Minze', 'Soda', 'Limette', 'Zucker', 'Minze'],
    type: 'Tropical · Refreshing',
    description:
      'Die tropische Variante des Klassikers mit exotischer Maracuja und frischer Minze.',
  },
  {
    name: 'Mango Rosmarin Mule',
    imageBase: 'mango-rosmarin',
    ingredients: ['Vodka', 'SESES Mango - Rosmarin', 'Ginger Beer', 'Limette'],
    type: 'Spicy · Aromatic',
    description: 'Würzige Mango trifft auf aromatischen Rosmarin und die Schärfe von Ginger Beer.',
  },
];

const classicHighballs = [
  'Dark and Stormy',
  'Moscow Mule',
  'Aperol Spritz',
  'Gin Tonic',
  "Horse's Neck",
  'Paloma',
];

export const DrinksShowcase: FC = () => {
  return (
    <section aria-labelledby='drinks-showcase-title'>
      {/* Signature Cocktails - Full Width Alternating Rows */}
      <Section container='wide' spacing='xl' background='light'>
        <h2 id='drinks-showcase-title' className='sr-only'>
          Signature Drinks
        </h2>

        <div className='space-y-24'>
          {signatureCocktails.map((cocktail, index) => {
            const isEven = index % 2 === 0;
            const basePath = `/Velo Gallery/${cocktail.imageBase}`;

            return (
              <div
                key={cocktail.name}
                className='grid grid-cols-1 items-center gap-12 lg:grid-cols-2'
              >
                {/* Image Column */}
                <div className={`${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div className='aspect-4/3 overflow-hidden rounded-2xl shadow-xl lg:aspect-3/4'>
                    <img
                      src={`${basePath}.jpg`}
                      alt={cocktail.name}
                      className='h-full w-full object-cover transition-transform duration-700 hover:scale-105'
                      loading='lazy'
                    />
                  </div>
                </div>

                {/* Text Column */}
                <div className={`${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className='space-y-6 md:space-y-7 md:rounded-2xl md:border md:border-(--color-coral)/10 md:bg-(--offwhite-primary)/70 md:p-8 md:backdrop-blur-sm'>
                    <div className='space-y-3'>
                      <div className='inline-flex items-center rounded-full bg-(--color-coral) px-4 py-2 shadow-sm'>
                        <span className='text-xs font-semibold tracking-wide text-(--offwhite-primary)'>
                          Signature Drink
                        </span>
                      </div>

                      <h3 className='text-3xl font-bold tracking-tight text-(--color-teal) md:text-4xl'>
                        {cocktail.name}
                      </h3>

                      <p className='text-base font-medium text-(--color-coral) italic md:text-lg'>
                        {cocktail.type}
                      </p>
                    </div>

                    <div className='h-px w-16 bg-(--color-coral)/30' />

                    <p className='text-base leading-relaxed text-(--text-dark-tea) md:text-lg'>
                      {cocktail.description}
                    </p>

                    <div className='h-px w-full bg-(--color-coral)/15' />

                    <div className='space-y-3'>
                      <h4 className='text-sm font-semibold tracking-wide text-(--color-teal)'>
                        Zutaten
                      </h4>
                      <div className='flex flex-wrap gap-2'>
                        {cocktail.ingredients.map((ingredient) => (
                          <span
                            key={ingredient}
                            className='inline-flex items-center rounded-full border border-(--color-coral)/25 bg-(--offwhite-primary) px-3 py-1 text-xs font-medium text-(--text-dark-tea)'
                          >
                            {ingredient}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Classic Highballs - Pricing Card Style Grid */}
      <Section container='wide' spacing='xl' background='light'>
        <div className='mb-12 text-center'>
          <div className='inline-flex items-center rounded-full border border-(--orange-primary)/20 bg-(--offwhite-primary) px-6 py-2 shadow-sm'>
            <span className='text-sm font-semibold tracking-wide text-(--orange-primary) uppercase'>
              Classic Highballs
            </span>
          </div>
        </div>

        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {classicHighballs.map((name) => (
            <div
              key={name}
              className='group flex h-full flex-col rounded-2xl border-2 border-(--orange-primary)/20 bg-(--color-bg-light) px-5 py-6 shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-1 hover:border-(--orange-primary) hover:shadow-[0_16px_48px_rgba(0,0,0,0.16)] md:px-4 md:py-5'
            >
              <h3 className='text-center text-xl font-bold text-(--navy-primary) md:text-lg'>
                {name}
              </h3>
            </div>
          ))}
        </div>
      </Section>
    </section>
  );
};

export default DrinksShowcase;
