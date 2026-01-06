import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Users, Calendar, Star } from 'lucide-react';

interface WhyCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
  isReducedMotion: boolean;
}

const WhyCard = ({ icon, title, description, index, isReducedMotion }: WhyCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  // Stacking offsets for mobile
  const mobileOffsets = [0, 10, 20]; // pixels
  const rotations = [0, -2, 2]; // degrees

  // Z-index ensures proper stacking
  const zIndex = 3 - index;

  const cardVariants = {
    hidden: {
      y: isReducedMotion ? 0 : 40,
      opacity: 0,
      rotate: isReducedMotion ? 0 : rotations[index],
    },
    visible: {
      y: isReducedMotion ? 0 : window.innerWidth < 768 ? mobileOffsets[index] : 0,
      opacity: 1,
      rotate: isReducedMotion ? 0 : window.innerWidth < 768 ? rotations[index] : 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94], // Similar to power2.out
        delay: index * 0.15,
      },
    },
  };

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      initial='hidden'
      animate={hasAnimated ? 'visible' : 'hidden'}
      style={{ zIndex }}
      className={`group relative w-full rounded-[20px] border border-[rgba(238,120,104,0.2)] bg-[rgba(255,248,236,0.9)] p-6 shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-1 hover:border-[#ee7868] hover:shadow-[0_12px_32px_rgba(0,0,0,0.15)] md:w-full md:rounded-[24px] md:bg-[rgba(255,248,236,0.95)] md:p-8 md:shadow-[0_8px_24px_rgba(0,0,0,0.12)] ${index > 0 && window.innerWidth < 768 ? 'mt-[-8px]' : ''} `}
    >
      <div className='mb-6 flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#ee7868] md:mb-8'>
        {icon}
      </div>
      <h3
        className='mb-4 font-bold text-[#003141] transition-colors duration-200 group-hover:text-[#ee7868] md:mb-8'
        style={{ fontSize: 'var(--font-size-h3)' }}
      >
        {title}
      </h3>
      <p className='text-sm leading-relaxed text-[#003141] md:text-base'>{description}</p>
    </motion.div>
  );
};

export const WhyCards = () => {
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const cards = [
    {
      icon: <Users size={20} className='text-[#ee7868]' />,
      title: 'Professionelle Barkeeper',
      description: 'Erfahrene Barkeeper mit Leidenschaft für erstklassige Cocktails und Service.',
    },
    {
      icon: <Calendar size={20} className='text-[#ee7868]' />,
      title: 'Flexibel buchbar',
      description: 'Von kleinen Feiern bis zu Großevents – wir passen uns Ihren Bedürfnissen an.',
    },
    {
      icon: <Star size={20} className='text-[#ee7868]' />,
      title: 'Premium Qualität',
      description:
        'Hochwertige Zutaten und kreative Cocktail-Kreationen für unvergessliche Momente.',
    },
  ];

  return (
    <div className='why-section relative'>
      {/* Mobile: Stacked cards with overlap */}
      <div className='relative mx-auto max-w-sm px-6 py-8 md:hidden'>
        {cards.map((card, index) => (
          <WhyCard key={index} index={index} isReducedMotion={isReducedMotion} {...card} />
        ))}
      </div>

      {/* Tablet & Desktop: Grid layout */}
      <div className='hidden gap-6 px-6 py-8 md:grid md:grid-cols-2 lg:grid-cols-3 lg:gap-8'>
        {cards.map((card, index) => (
          <WhyCard key={index} index={index} isReducedMotion={isReducedMotion} {...card} />
        ))}
      </div>
    </div>
  );
};
