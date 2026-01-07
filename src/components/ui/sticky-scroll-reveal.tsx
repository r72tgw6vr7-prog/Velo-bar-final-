'use client';

import React, { useRef, useState } from 'react';
import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
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

  const { scrollYProgress } = useScroll({
    container: containerRef,
    offset: ['start start', 'end start'],
  });

  const cardLength = content.length || 1;

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (!cardLength) return;

    const denominator = cardLength > 1 ? cardLength - 1 : 1;
    const breakpoints = content.map((_, index) => index / denominator);

    const closestIndex = breakpoints.reduce((closest, breakpoint, index) => {
      const distance = Math.abs(latest - breakpoint);
      const closestDistance = Math.abs(latest - breakpoints[closest]);
      return distance < closestDistance ? index : closest;
    }, 0);

    setActiveCard(closestIndex);
  });

  return (
    <motion.div
      ref={containerRef}
      className='services-parallax parallax-content services-parallax-track bg-section-dark relative flex h-160 justify-center space-x-16 overflow-y-auto rounded-3xl px-16 py-16'
    >
      {/* Left column with text */}
      <div className='relative flex items-start'>
        <div className='max-w-xl space-y-16'>
          {content.map((item, index) => (
            <div
              key={item.title + index}
              className='relative space-y-6 rounded-xl p-6'
              style={{
                background: 'linear-gradient(to bottom, rgba(0,49,65,0.55), rgba(0,49,65,0.2))',
              }}
            >
              <motion.h2
                initial={{ opacity: 0.4, y: 12 }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.4,
                  y: activeCard === index ? 0 : 12,
                }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className='text-3xl font-semibold tracking-tight text-(--offwhite-primary) md:text-4xl'
              >
                {item.title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0.4, y: 8 }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.4,
                  y: activeCard === index ? 0 : 8,
                }}
                transition={{ duration: 0.4, ease: 'easeOut', delay: 0.05 }}
                className='mt-6 max-w-prose text-base leading-relaxed text-(--text-dark-tea) md:text-lg'
                style={{
                  lineHeight: '1.6',
                }}
              >
                {item.description}
              </motion.p>
            </div>
          ))}
          <div className='h-96' />
        </div>
      </div>

      {/* Sticky image/content column on the right */}
      <div
        className={cn(
          'services-parallax-sticky sticky top-12 hidden h-96 w-md overflow-hidden rounded-3xl border border-(--color-bg-surface) bg-(--color-bg-surface) p-8 lg:block',
          contentClassName,
        )}
      >
        {content[activeCard]?.content ?? null}
      </div>
    </motion.div>
  );
}
