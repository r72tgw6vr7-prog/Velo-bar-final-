import { useState, useEffect, useRef } from 'react';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import type { LucideProps } from 'lucide-react';
import { motion } from 'framer-motion';
import { MessageCircle, Palette, Zap, Heart, CheckCircle, Sparkles } from 'lucide-react';
import { useBusinessDesignSystem } from '../../foundation/index.ts';
import { ProcessStepCard } from '../molecules/ProcessStepCard.ts';

interface TimelineStep {
  id: string;
  icon: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>;
  title: {
    DE: string;
    EN: string;
  };
  description: {
    DE: string;
    EN: string;
  };
  duration: {
    DE: string;
    EN: string;
  };
}

interface ProcessTimelineProps {}

export function ProcessTimeline({}: ProcessTimelineProps) {
  const { language } = useBusinessDesignSystem();
  const [isVisible, setIsVisible] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);

  const content = {
    DE: {
      headline: "So funktioniert's",
      subtitle: 'Unser bewährter 4-Schritte-Prozess für Ihr nächstes Event.',
      processComplete: 'Ihr Event ist bereit zum Feiern',
    },
    EN: {
      headline: 'How It Works',
      subtitle: 'Our proven 4-step process for your next event.',
      processComplete: 'Your event is ready to celebrate',
    },
  };

  const t = content[language];

  const timelineSteps: TimelineStep[] = [
    {
      id: 'inquiry',
      icon: MessageCircle,
      title: {
        DE: 'Anfrage',
        EN: 'Inquiry',
      },
      description: {
        DE: 'Teilen Sie uns Datum, Gästezahl und Eventart mit – wir erstellen ein maßgeschneidertes Angebot.',
        EN: "Share your date, guest count and event type – we'll create a tailored proposal.",
      },
      duration: {
        DE: '30-45 Min',
        EN: '30-45 Min',
      },
    },
    {
      id: 'planning',
      icon: Palette,
      title: {
        DE: 'Planung',
        EN: 'Planning',
      },
      description: {
        DE: 'Gemeinsam gestalten wir Ihre Getränkekarte und klären alle Details für einen reibungslosen Ablauf.',
        EN: 'Together we design your drink menu and coordinate all details for a seamless experience.',
      },
      duration: {
        DE: '1-7 Tage',
        EN: '1-7 Days',
      },
    },
    {
      id: 'event',
      icon: Zap,
      title: {
        DE: 'Event',
        EN: 'Event',
      },
      description: {
        DE: 'Unser Team sorgt für professionellen Bar-Service – pünktlich, stilvoll und mit Premium-Zutaten.',
        EN: 'Our team delivers professional bar service – punctual, stylish, and with premium ingredients.',
      },
      duration: {
        DE: '2-8 Std',
        EN: '2-8 Hours',
      },
    },
    {
      id: 'followup',
      icon: Heart,
      title: {
        DE: 'Nachbereitung',
        EN: 'Follow-up',
      },
      description: {
        DE: 'Feedback einholen, Fotos teilen und für Ihr nächstes Event zur Verfügung stehen.',
        EN: 'Gather feedback, share photos, and be ready for your next event.',
      },
      duration: {
        DE: '2-4 Wochen',
        EN: '2-4 Weeks',
      },
    },
  ];

  // Visibility detection
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className='bg-navy relative overflow-hidden py-32'
      aria-label={t.headline}
    >
      <div className='relative mx-auto max-w-7xl px-8 sm:px-8 lg:px-8'>
        {/* Section Header */}
        <motion.div
          className='mb-8 text-center'
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 40 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className='text-headline-lg font-headline text-accent-primary mb-8'>{t.headline}</h2>
          <p className='text-body-large font-body mx-auto max-w-3xl text-white/80'>{t.subtitle}</p>
        </motion.div>

        {/* Desktop Timeline (Horizontal) - Using ProcessStepCard components */}
        <div className='mb-16 hidden lg:block'>
          <motion.div
            className='relative'
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 40 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Timeline Line */}
            <div className='via-accent-primary absolute top-24 right-0 left-0 z-0 h-0.5 bg-gradient-to-r from-transparent to-transparent'>
              <motion.div
                className='bg-accent-primary h-full origin-left'
                initial={{ scaleX: 0 }}
                animate={{ scaleX: isVisible ? 1 : 0 }}
                transition={{ duration: 2, delay: 0.5, ease: 'easeInOut' }}
              />
            </div>

            {/* Timeline Steps Container - Auto layout: Horizontal, 30px spacing, Top alignment */}
            <div
              className='flex items-start justify-center'
              style={{
                gap: '30px', // Spacing between cards as per spec
              }}
            >
              {timelineSteps.map((step, index) => (
                <ProcessStepCard
                  key={step.id}
                  number={index + 1}
                  icon={step.icon}
                  title={step.title[language]}
                  description={step.description[language]}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Mobile/Tablet Timeline (Vertical) */}
        <div className='lg:hidden'>
          <motion.div
            className='relative mx-auto max-w-2xl'
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 40 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Vertical Timeline Line */}
            <div className='via-accent-primary absolute top-0 bottom-0 left-8 w-0.5 bg-gradient-to-b from-transparent to-transparent'>
              <motion.div
                className='bg-accent-primary w-full origin-top'
                initial={{ scaleY: 0 }}
                animate={{ scaleY: isVisible ? 1 : 0 }}
                transition={{ duration: 2, delay: 0.5, ease: 'easeInOut' }}
              />
            </div>

            {/* Vertical Steps */}
            <div className='space-y-16'>
              {timelineSteps.map((step, index) => {
                const IconComponent = step.icon;
                return (
                  <motion.div
                    key={step.id}
                    className='group relative flex items-start'
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -40 }}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  >
                    {/* Step Number */}
                    <motion.div
                      className='bg-navy border-accent-primary group-hover:shadow-accent-glow-subtle relative z-10 mr-8 flex h-16 w-16 items-center justify-center rounded-full border-2 transition-all duration-500'
                      whileHover={{ scale: 1.1 }}
                    >
                      <span className='text-accent-primary font-body font-bold'>{index + 1}</span>
                    </motion.div>

                    {/* Step Content */}
                    <div className='flex-1 pb-8'>
                      <div className='from-navy via-navy/95 to-navy/90 border-white/20/30 group-hover:border-accent-primary/40 group-hover:shadow-accent-glow-subtle rounded-2xl border bg-linear-to-br p-8 transition-all duration-500'>
                        {/* Icon and Title Row */}
                        <div className='mb-8 flex items-center space-x-8'>
                          <div className='bg-accent-primary/10 border-accent-primary/30 flex h-14 w-14 items-center justify-center rounded-full border'>
                            <IconComponent size={20} className='text-accent-primary' />
                          </div>
                          <div className='flex-1'>
                            <h3 className='text-headline-md font-headline text-accent-primary mb-0'>
                              {step.title[language]}
                            </h3>
                            <div className='flex items-center space-x-0 text-white/80'>
                              <Sparkles size={14} />
                              <span className='text-body-small font-body font-medium'>
                                {step.duration[language]}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Description */}
                        <p className='text-body-small font-body leading-relaxed text-white transition-colors duration-500 group-hover:text-white'>
                          {step.description[language]}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Completion Badge */}
        <motion.div
          className='text-center'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <motion.div
            className='from-accent-primary/20 via-accent-primary/10 to-accent-primary/20 border-accent-primary/40 shadow-accent-glow-subtle inline-flex items-center space-x-0 rounded-2xl border-2 bg-gradient-to-r px-8 py-8'
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(107, 114, 128, 0.4)' }}
            transition={{ duration: 0.3 }}
          >
            <CheckCircle size={24} className='text-accent-primary' />
            <span className='text-body font-body text-accent-primary font-bold'>
              {t.processComplete}
            </span>
            <Sparkles size={20} className='text-accent-primary' />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
