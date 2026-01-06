import { useEffect, useMemo, useRef, useState, createContext, useContext } from 'react';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import type { LucideProps } from 'lucide-react';
import { Heart, MessageCircle, Palette, Zap } from 'lucide-react';
import '../../styles/process-timeline.css';

// Simple language context
const LanguageContext = createContext<'DE' | 'EN'>('DE');
export const useLanguage = () => {
  const language = useContext(LanguageContext);
  return { language };
};

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
}

// Using global cosmic nebula background

interface ProcessTimelineProps {}

type LocalisedCopy = {
  eyebrow: string;
  headline: string;
  subtitle: string;
};

const COPY: Record<'DE' | 'EN', LocalisedCopy> = {
  DE: {
    eyebrow: "So funktioniert's",
    headline: 'Ihr Weg zum perfekten Event',
    subtitle:
      'Von der ersten Anfrage bis zum letzten Cocktail begleiten wir Sie Schritt für Schritt – professionell, flexibel und stilvoll.',
  },
  EN: {
    eyebrow: 'How It Works',
    headline: 'Your Path to the Perfect Event',
    subtitle:
      'From initial inquiry to the last cocktail, we guide you through every step – professional, flexible, and stylish.',
  },
};

type LocalisedText = {
  DE: string;
  EN: string;
};

interface TimelineStep {
  id: string;
  icon: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>;
  title: LocalisedText;
  description: LocalisedText;
}

const STEPS: TimelineStep[] = [
  {
    id: 'inquiry',
    icon: MessageCircle,
    title: {
      DE: 'Anfrage',
      EN: 'Inquiry',
    },
    description: {
      DE: 'Teilen Sie uns Ihre Wünsche mit – Datum, Gästezahl und Eventart. Wir erstellen ein maßgeschneidertes Angebot.',
      EN: "Share your requirements – date, guest count, and event type. We'll create a tailored proposal for you.",
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
  },
];

export function ProcessTimeline({}: ProcessTimelineProps) {
  const { language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
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

  const markerPositions = useMemo(() => {
    if (STEPS.length <= 1) {
      return Array(STEPS.length).fill('0%');
    }
    const divisor = STEPS.length - 1;
    return STEPS.map((_, index) => `${(index / divisor) * 100}%`);
  }, []);

  const copy = COPY[language] ?? COPY.EN;

  return (
    <section
      ref={sectionRef}
      className='relative w-full py-16 text-white md:py-24'
      aria-label={copy.headline}
      style={{
        // Using the global cosmic background - only adding a darker overlay
        backgroundColor: 'rgba(26, 35, 50, 0.75)',
      }}
    >
      <div className='relative mx-auto max-w-[1104px] px-8'>
        <div className='space-y-8 text-center'>
          <p className='text-sm font-semibold tracking-[0.3em] text-white/50 uppercase'>
            {copy.eyebrow}
          </p>
          <h2 className='font-headline text-3xl text-white/80 md:text-4xl'>{copy.headline}</h2>
          <p className='font-body mx-auto max-w-2xl text-base leading-relaxed text-white/70'>
            {copy.subtitle}
          </p>
        </div>

        <div className='relative mt-16 mb-16'>
          <div className='timeline'>
            <div className={`timeline-fill ${isVisible ? 'is-visible' : ''}`} aria-hidden='true' />
          </div>
          {markerPositions.map((left, index) => (
            <div
              key={STEPS[index].id}
              className='absolute top-1/2 -translate-x-1/2 -translate-y-1/2'
              style={{ left }}
              aria-hidden='true'
            >
              <div className='border-accent-primary bg-navy text-accent-primary shadow-accent-glow flex h-10 w-10 items-center justify-center rounded-full border text-sm font-semibold'>
                {index + 1}
              </div>
            </div>
          ))}
        </div>

        <div className='grid grid-cols-2 gap-8 md:grid-cols-2 lg:grid-cols-4'>
          {STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <article key={step.id} className='flex h-full flex-col p-8 md:p-8'>
                <div className='border-accent-primary/60 bg-accent-primary/10 text-accent-primary mb-8 flex h-10 h-full w-10 flex-col items-center justify-center rounded-full border md:mb-8 md:h-14 md:w-14'>
                  <Icon size={20} className='md:hidden' />
                  <Icon size={24} className='hidden md:block' />
                </div>
                <h3 className='font-headline text-accent-primary text-lg font-semibold md:text-2xl'>
                  {step.title[language] ?? step.title.EN}
                </h3>
                <p className='mt-0 text-xs leading-5 text-white/80 md:mt-8 md:text-sm md:leading-6'>
                  {step.description[language] ?? step.description.EN}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
