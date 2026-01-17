'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/classname.ts';

interface StickyScrollProps {
  content: {
    title: string;
    description: string;
    content?: React.ReactNode;
  }[];
  contentClassName?: string;
}

export function StickyScroll({ content, contentClassName }: StickyScrollProps) {
  const [activeCard, setActiveCard] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const cardLength = content.length || 1;

  const updateActiveCard = useMemo(
    () => () => {
      if (!containerRef.current || !cardRefs.current.length) return;
      const containerRect = containerRef.current.getBoundingClientRect();
      const containerCenter = containerRect.top + containerRect.height / 2;

      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.top + rect.height / 2;
        const distance = Math.abs(cardCenter - containerCenter);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveCard(closestIndex);
    },
    [],
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onScroll = () => {
      requestAnimationFrame(updateActiveCard);
    };

    const onResize = () => updateActiveCard();

    container.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    updateActiveCard();

    return () => {
      container.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, [updateActiveCard]);

  return (
    <motion.div
      ref={containerRef}
      className='services-parallax parallax-content services-parallax-track bg-section-dark relative flex h-[85vh] justify-center space-x-16 overflow-y-auto rounded-3xl px-16 py-16 snap-y snap-mandatory scroll-smooth'
    >
      {/* Left column with text */}
      <div className='relative flex items-start'>
        <div className='max-w-xl space-y-16'>
          {content.map((item, index) => (
            <motion.div
              key={item.title + index}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className={cn(
                'relative space-y-6 rounded-xl p-6 transition-all duration-300 snap-center',
                activeCard === index 
                  ? 'service-scroll-card' 
                  : 'service-scroll-card-inactive'
              )}
              animate={{
                scale: activeCard === index ? 1 : 0.97,
              }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <motion.h2
                initial={{ opacity: 0.4, y: 12 }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.5,
                  y: activeCard === index ? 0 : 12,
                }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className='text-3xl font-semibold tracking-tight text-(--color-coral) md:text-4xl'
              >
                {item.title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0.4, y: 8 }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.5,
                  y: activeCard === index ? 0 : 8,
                }}
                transition={{ duration: 0.4, ease: 'easeOut', delay: 0.05 }}
                className='mt-6 max-w-prose text-base leading-relaxed text-(--navy-primary) md:text-lg'
              >
                {item.description}
              </motion.p>
            </motion.div>
          ))}
          {/* Extra scroll space to allow last cards to reach their breakpoints */}
          <div style={{ height: `${Math.max(60, cardLength * 22)}vh` }} />
        </div>
      </div>

      {/* Sticky image/content column on the right */}
      <div
        className={cn(
          'services-parallax-sticky sticky top-12 hidden h-96 w-md overflow-hidden rounded-2xl lg:block',
          'service-scroll-card',
          contentClassName,
        )}
      >
        {content[activeCard]?.content ?? null}
      </div>
    </motion.div>
  );
}
