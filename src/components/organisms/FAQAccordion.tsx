/**
 * FAQAccordion Component
 * ======================
 * Clean, minimal FAQ grid layout with static Q&A cards
 * Replaces accordion pattern with simple 3-column grid
 */

import React from 'react';
import { cn } from '@/utils/classname';

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQ[];
  allowMultiple?: boolean; // Kept for backwards compatibility, no longer used
  className?: string;
  columns?: 1 | 2 | 3;
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({
  items,
  className = '',
  columns = 3,
}) => {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  };

  return (
    <div
      className={cn('grid gap-8 md:gap-10', gridCols[columns], className)}
      role='list'
      aria-label='Frequently Asked Questions'
    >
      {items.map((item) => (
        <article key={item.id} className='flex flex-col' role='listitem'>
          <h3 className='mb-0 text-base font-semibold text-gray-900'>{item.question}</h3>
          <p className='text-sm leading-relaxed text-gray-600'>{item.answer}</p>
        </article>
      ))}
    </div>
  );
};

export default FAQAccordion;
