import React from 'react';
import { cn } from '@/utils/classname.ts';

export interface StackingCard {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface StackingCardsProps {
  cards: StackingCard[];
  className?: string;
}

export const StackingCardsSimple: React.FC<StackingCardsProps> = ({ cards, className }) => {
  return (
    <div className={cn('stacking-cards-section', className)}>
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3'>
        {cards.map((card, index) => (
          <div
            key={card.id}
            className='group relative rounded-[20px] border-2 border-[rgba(238,120,104,0.2)] bg-[rgba(255,248,236,0.92)] p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-[#ee7868] hover:shadow-xl md:rounded-3xl md:p-8'
            style={{
              borderColor: 'var(--surface-card-hover-border)',
              backgroundColor: 'var(--color-cream)',
              borderWidth: '2px',
              zIndex: cards.length - index,
            }}
          >
            <div className='mb-6 flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#ee7868] md:h-12 md:w-12'>
              {React.cloneElement(card.icon as React.ReactElement, {
                size: 24,
                className: 'text-[#ee7868]',
              })}
            </div>
            <h3
              style={{ fontSize: 'var(--font-size-h3)' }}
              className='mb-4 text-left font-bold text-[#003141] transition-colors duration-200 group-hover:text-[#ee7868] md:mb-6'
            >
              {card.title}
            </h3>
            <p className='text-left text-[#003141]'>{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
