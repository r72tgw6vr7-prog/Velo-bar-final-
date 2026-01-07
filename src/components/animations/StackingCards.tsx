import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { cn } from '@/utils/classname.ts';
import './StackingCards.css';

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

export const StackingCards: React.FC<StackingCardsProps> = ({ cards, className }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const cardElements = cardsRef.current.filter((card): card is HTMLDivElement => card !== null);

    if (!sectionRef.current || cardElements.length === 0) {
      return;
    }

    if (prefersReducedMotion) {
      gsap.set(cardElements, { opacity: 1, y: 0, scale: 1 });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    let tween: gsap.core.Tween | undefined;

    const ctx = gsap.context(() => {
      // Staggered fade-in synced to scroll (single trigger; no per-card ScrollTriggers)
      tween = gsap.fromTo(
        cardElements,
        { opacity: 0, y: 24, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          ease: 'back.out(1.4)',
          stagger: 0.35,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'bottom 40%',
            toggleActions: 'play none none reverse',
          },
        },
      );
    }, sectionRef);

    return () => {
      tween?.scrollTrigger?.kill();
      tween?.kill();
      ctx.revert();
    };
  }, []);

  return (
    <div ref={sectionRef} className={cn('stacking-cards-section', className)}>
      <div className='stacking-cards-grid grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3'>
        {cards.map((card, index) => (
          <div
            key={card.id}
            ref={(el) => {
              cardsRef.current[index] = el;
            }}
            className={cn(
              'why-card stacking-card group border-accent/20 bg-surface-muted hover:border-accent relative rounded-[20px] border-2 p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl md:rounded-3xl md:p-8',
            )}
          >
            <div className='stacking-card-icon border-accent mb-6 flex h-10 w-10 items-center justify-center rounded-full border-2 md:h-12 md:w-12'>
              {React.cloneElement(card.icon as React.ReactElement, {
                size: 24,
                className: 'text-accent',
              })}
            </div>
            <h3
              style={{ fontSize: 'var(--font-size-h3)' }}
              className='mb-4 text-left font-bold text-[#ee7868] transition-colors duration-200 group-hover:text-[#ee7868] md:mb-6'
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
