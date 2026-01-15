/**
 * WhyVeloBarSection - "Warum Velo.Bar?" Trust Signal Cards
 * =========================================================
 * Animated trust signal cards showcasing key value propositions
 * Uses GSAP ScrollTrigger for scroll-triggered stagger animation
 *
 * @example
 * <WhyVeloBarSection />
 */

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Users from 'lucide-react/dist/esm/icons/users';
import Calendar from 'lucide-react/dist/esm/icons/calendar';
import Star from 'lucide-react/dist/esm/icons/star';
import { Section } from '@/components/atoms/Section/Section.tsx';
import { Container } from '@/components/atoms/Container/Container.tsx';
import { cn } from '@/utils/classname.ts';
import './WhyVeloBarSection.css';
import { useLanguage } from '@/contexts/LanguageContext.tsx';

// Trust signal card data - "Warum Velo.Bar?"
const WHY_VELOBAR_CARDS = [
  {
    id: 'professional-barkeepers',
    icon: Users,
    titleKey: 'whyVeloBarSection.cards.professional.title',
    descriptionKey: 'whyVeloBarSection.cards.professional.description',
  },
  {
    id: 'flexible-booking',
    icon: Calendar,
    titleKey: 'whyVeloBarSection.cards.flexible.title',
    descriptionKey: 'whyVeloBarSection.cards.flexible.description',
  },
  {
    id: 'premium-quality',
    icon: Star,
    titleKey: 'whyVeloBarSection.cards.premium.title',
    descriptionKey: 'whyVeloBarSection.cards.premium.description',
  },
] as const;

export interface WhyVeloBarSectionProps {
  className?: string;
  /** Optional: Override default cards */
  cards?: Array<{
    id: string;
    icon: React.ComponentType<{ size?: number; className?: string }>;
    title: string;
    description: string;
  }>;
}

export const WhyVeloBarSection: React.FC<WhyVeloBarSectionProps> = ({
  className,
  cards,
}) => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const localizedCards =
    cards ??
    WHY_VELOBAR_CARDS.map((card) => ({
      id: card.id,
      icon: card.icon,
      title: t(card.titleKey),
      description: t(card.descriptionKey),
    }));

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cardElements = cardsRef.current.filter((card): card is HTMLDivElement => card !== null);

    if (!sectionRef.current || cardElements.length === 0) return;

    // If reduced motion, show cards immediately
    if (prefersReducedMotion) {
      gsap.set(cardElements, { opacity: 1, y: 0, scale: 1 });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    let tween: gsap.core.Tween | undefined;

    const ctx = gsap.context(() => {
      // Staggered fade-in synced to scroll
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
    <Section
      container='default'
      spacing='xl'
      background='transparent'
      className={cn('why-velobar-section', className)}
    >
      <Container size='default'>
        {/* Section Header */}
        <div className='mx-auto mb-12 max-w-3xl text-center'>
          <h2 className='text-accent mt-4 text-3xl font-bold md:text-4xl'>{t('whyVeloBarSection.title')}</h2>
          <p className='mt-4 text-base font-semibold text-white md:text-lg'>
            {t('whyVeloBarSection.subtitle')}
          </p>
        </div>

        {/* Animated Cards Grid */}
        <div
          ref={sectionRef}
          className='why-velobar-cards-grid grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3'
        >
          {localizedCards.map((card, index) => {
            const IconComponent = card.icon;
            return (
              <div
                key={card.id}
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                className='why-velobar-card group relative flex h-full flex-col rounded-2xl border-2 border-[#ee7868] bg-[#fff8ec] p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-[#ee7868] hover:shadow-xl md:rounded-3xl md:p-8'
                style={{ zIndex: localizedCards.length - index }}
              >
                {/* Icon */}
                <div className='why-velobar-card__icon mb-6 flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#ee7868] md:h-12 md:w-12'>
                  <IconComponent size={24} className='text-[#ee7868]' />
                </div>

                {/* Title */}
                <h3 className='mb-4 text-left text-xl font-bold text-[#ee7868] transition-colors duration-200 md:mb-6 md:text-2xl'>
                  {card.title}
                </h3>

                {/* Description */}
                <p className='text-left text-sm leading-relaxed text-[#003141] md:text-base'>
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
};

export default WhyVeloBarSection;
