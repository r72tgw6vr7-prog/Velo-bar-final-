import { Section } from '@/components/atoms/Section/Section.tsx';
import { ResponsiveImage } from '@/components/atoms/ResponsiveImage/ResponsiveImage.tsx';
import type { FC } from 'react';
import { useLanguage } from '@/contexts/LanguageContext.tsx';
import { EyebrowBadge } from '@/components/atoms/EyebrowBadge.tsx';

const signatureCocktails = [
  {
    key: 'raspberryHibiscusFizz',
    imageBase: 'himbeer-hibiskus-fizz',
    ingredients: ['Vodka', 'SESES Raspberry - Hibiscus', 'Soda', 'Lemon', 'Sugar'],
  },
  {
    key: 'basilSmash',
    imageBase: 'basil-smash',
    ingredients: ['Gin', 'Basil', 'Lemon', 'Sugar'],
  },
  {
    key: 'passionfruitMojito',
    imageBase: 'minz-maracuja',
    ingredients: ['Rum', 'SESES Passionfruit - Mint', 'Soda', 'Lime', 'Sugar', 'Mint'],
  },
  {
    key: 'mangoRosemaryMule',
    imageBase: 'mango-rosmarin',
    ingredients: ['Vodka', 'SESES Mango - Rosemary', 'Ginger Beer', 'Lime'],
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
  const { t } = useLanguage();
  return (
    <section aria-labelledby='drinks-showcase-title'>
      {/* Signature Cocktails - Full Width Alternating Rows */}
      <Section container='wide' spacing='xl' background='light'>
        <h2 id='drinks-showcase-title' className='sr-only'>
          {t('drinksShowcase.sectionTitle')}
        </h2>

        <div className='space-y-24'>
          {signatureCocktails.map((cocktail, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={cocktail.key}
                className='grid grid-cols-1 items-center gap-12 lg:grid-cols-2'
              >
                {/* Image Column */}
                <div className={`${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div className='aspect-4/3 overflow-hidden rounded-2xl shadow-xl lg:aspect-3/4'>
                    <ResponsiveImage
                      src={`/Velo Gallery/${cocktail.imageBase}`}
                      alt={t(`drinksShowcase.cocktails.${cocktail.key}.name`)}
                      className='h-full w-full transition-transform duration-700 hover:scale-105'
                      objectFit='cover'
                      sizes='(max-width: 768px) 100vw, 50vw'
                      priority={index === 0}
                    />
                  </div>
                </div>

                {/* Text Column */}
                <div className={`${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className='space-y-6 rounded-2xl border border-(--color-coral)/10 bg-(--color-bg-surface)/90 p-6 backdrop-blur-sm overflow-hidden md:space-y-7 md:bg-(--offwhite-primary)/70 md:p-8'>
                    <div className='space-y-3'>
                      <EyebrowBadge>{t('drinksShowcase.signatureBadge')}</EyebrowBadge> 

                      <h3 className='text-3xl font-bold tracking-tight text-(--color-teal) md:text-4xl'>
                        {t(`drinksShowcase.cocktails.${cocktail.key}.name`)}
                      </h3>

                      <p className='text-base font-medium text-(--color-coral) italic md:text-lg'>
                        {t(`drinksShowcase.cocktails.${cocktail.key}.type`)}
                      </p>
                    </div>

                    <div className='h-px w-16 bg-(--color-coral)/30' />

                    <p className='text-base leading-relaxed text-(--text-dark-tea) md:text-lg'>
                      {t(`drinksShowcase.cocktails.${cocktail.key}.description`)}
                    </p>

                    <div className='h-px w-full bg-(--color-coral)/15' />

                    <div className='space-y-3'>
                      <h4 className='text-sm font-semibold tracking-wide text-(--color-teal)'>
                        {t('drinksShowcase.ingredientsHeading')}
                      </h4>
                      <div className='flex flex-wrap gap-2'>
                        {cocktail.ingredients.map((ingredient) => (
                          <span key={ingredient} className='badge-chip border-(--color-coral)/25 text-(--text-dark-tea)'>
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
            <EyebrowBadge>{t('drinksShowcase.classicHighballsBadge')}</EyebrowBadge>
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
