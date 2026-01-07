import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Palette,
  Camera,
  Hexagon,
  Droplets,
  Heart,
  Circle,
  Zap,
  Star,
  ChevronRight,
} from 'lucide-react';
import { useBusinessDesignSystem } from '../../foundation/index.ts';
import { Container } from '@/components/atoms/Container/Container.tsx';

interface ServiceHighlightsProps {
  onServiceClick?: (serviceId: string) => void;
}

export function ServiceHighlights({ onServiceClick }: ServiceHighlightsProps) {
  const { language } = useBusinessDesignSystem();
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px',
      },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleMouseEnter = (cardId: string) => {
    setHoveredCard(cardId);
  };

  const handleMouseLeave = () => {
    setHoveredCard(null);
  };

  const content = {
    DE: {
      coreTitle: 'Service-Highlights',
      coreSubtitle: 'Mobile Cocktailbar & Event-Catering auf höchstem Niveau',
      collabTitle: 'Zusammenarbeit & Betreuung',
      collabSubtitle: 'So entstehen erfolgreiche Digitalprojekte',
      viewDetails: 'Details ansehen',
      contactCta: 'Projektanfrage senden',
      coreServices: [
        {
          id: 'custom-webapps',
          name: 'Individuelle Webanwendungen',
          subtitle: 'Full-Stack Lösungen',
          description:
            'Skalierbare Webanwendungen und Plattformen, maßgeschneidert für spezifische Geschäftsanforderungen.',
          priceRange: 'Projektbasiert ab €4.000',
          icon: Palette,
        },
        {
          id: 'frontend-architecture',
          name: 'Frontend-Architektur & Design-Systeme',
          subtitle: 'Nachhaltige UI-Architektur',
          description:
            'Robuste Frontend-Architekturen, Komponentenbibliotheken und Design-Systeme für große Teams.',
          priceRange: 'Ab €1.600 / Workshop',
          icon: Camera,
        },
        {
          id: 'performance',
          name: 'Performance & Core Web Vitals',
          subtitle: 'Schnelle Ladezeiten',
          description:
            'Gezielte Optimierungen für Core Web Vitals, Lighthouse-Scores und wahrgenommene Geschwindigkeit.',
          priceRange: 'Audit ab €1.200',
          icon: Circle,
        },
        {
          id: 'ecommerce',
          name: 'E-Commerce & Buchungslösungen',
          subtitle: 'Konversionsstarke Systeme',
          description:
            'Onlineshops, Buchungssysteme und Customer Journeys mit klaren Metriken und Tracking.',
          priceRange: 'Projektbasiert ab €6.000',
          icon: Star,
        },
        {
          id: 'consulting',
          name: 'Technische Beratung',
          subtitle: 'Strategische Begleitung',
          description:
            'Technische Sparringspartnerschaft für Roadmaps, Architekturentscheidungen und Team-Coaching.',
          priceRange: 'Ab €1.200 / Tag',
          icon: Hexagon,
        },
        {
          id: 'ui-ux',
          name: 'UI/UX Design & Prototyping',
          subtitle: 'Nutzerzentrierte Interfaces',
          description:
            'Interaktive Prototypen, Design-Reviews und Mikrointeraktionen für überzeugende Nutzererlebnisse.',
          priceRange: 'Ab €2.000',
          icon: Droplets,
        },
      ],
      collaborationModels: [
        {
          id: 'project-based',
          name: 'Projektbasierte Zusammenarbeit',
          subtitle: 'Klare Ziele & Scope',
          locations: [
            'Discovery & Zieldefinition',
            'Konzept & Architektur',
            'Implementierung',
            'Launch & Handover',
          ],
          startingPrice: 'Ab €4.000',
          icon: Circle,
          description: 'Ideal für klar umrissene Projekte mit definiertem Umfang und Fahrplan.',
        },
        {
          id: 'retainer',
          name: 'Retainer & Langfrist-Support',
          subtitle: 'Kontinuierliche Weiterentwicklung',
          locations: [
            'Technische Betreuung',
            'Roadmap-Planung',
            'Code Reviews',
            'Pair Programming',
          ],
          startingPrice: 'Ab €1.500 / Monat',
          icon: Heart,
          description:
            'Für Teams, die laufend Unterstützung bei Architektur, Refactoring und neuen Features benötigen.',
        },
        {
          id: 'workshops',
          name: 'Workshops & Audits',
          subtitle: 'Fokussierte Sessions',
          locations: [
            'Architecture Review',
            'Performance-Audit',
            'Design-System-Workshop',
            'Team-Enablement',
          ],
          startingPrice: 'Ab €1.200 / Session',
          icon: Zap,
          description:
            'Kompakte Formate zur schnellen Analyse, Entscheidungsfindung und gezielten Verbesserung.',
        },
      ],
    },
    EN: {
      coreTitle: 'Service Highlights',
      coreSubtitle: 'Mobile cocktail bar and event catering at the highest level',
      collabTitle: 'Collaboration & Ongoing Support',
      collabSubtitle: 'How successful digital projects are built',
      viewDetails: 'View details',
      contactCta: 'Request a project',
      coreServices: [
        {
          id: 'custom-webapps',
          name: 'Custom Web Applications',
          subtitle: 'Full-Stack Solutions',
          description:
            'Scalable web applications and platforms tailored to specific business requirements.',
          priceRange: 'Project-based from €4,000',
          icon: Palette,
        },
        {
          id: 'frontend-architecture',
          name: 'Frontend Architecture & Design Systems',
          subtitle: 'Sustainable UI Architecture',
          description:
            'Robust frontend architectures, component libraries and design systems for growing teams.',
          priceRange: 'From €1,600 / workshop',
          icon: Camera,
        },
        {
          id: 'performance',
          name: 'Performance & Core Web Vitals',
          subtitle: 'Fast Experiences',
          description:
            'Targeted optimization for Core Web Vitals, Lighthouse scores and perceived performance.',
          priceRange: 'Audits from €1,200',
          icon: Circle,
        },
        {
          id: 'ecommerce',
          name: 'E-Commerce & Booking Solutions',
          subtitle: 'Conversion-Focused Systems',
          description:
            'Online stores, booking flows and customer journeys with clear metrics and tracking.',
          priceRange: 'Project-based from €6,000',
          icon: Star,
        },
        {
          id: 'consulting',
          name: 'Technical Consulting',
          subtitle: 'Strategic Partnership',
          description:
            'Technical sparring for roadmaps, architecture decisions and team enablement.',
          priceRange: 'From €1,200 / day',
          icon: Hexagon,
        },
        {
          id: 'ui-ux',
          name: 'UI/UX Design & Prototyping',
          subtitle: 'User-Centered Interfaces',
          description:
            'Interactive prototypes, design reviews and micro-interactions for compelling experiences.',
          priceRange: 'From €2,000',
          icon: Droplets,
        },
      ],
      collaborationModels: [
        {
          id: 'project-based',
          name: 'Project-Based Collaboration',
          subtitle: 'Clear Scope & Outcomes',
          locations: [
            'Discovery & Goals',
            'Concept & Architecture',
            'Implementation',
            'Launch & Handover',
          ],
          startingPrice: 'From €4,000',
          icon: Circle,
          description: 'Ideal for projects with a clearly defined scope and timeline.',
        },
        {
          id: 'retainer',
          name: 'Retainer & Long-Term Support',
          subtitle: 'Continuous Improvement',
          locations: ['Technical guidance', 'Roadmap planning', 'Code reviews', 'Pair programming'],
          startingPrice: 'From €1,500 / month',
          icon: Heart,
          description:
            'For teams that need ongoing support with architecture, refactoring and new features.',
        },
        {
          id: 'workshops',
          name: 'Workshops & Audits',
          subtitle: 'Focused Sessions',
          locations: [
            'Architecture review',
            'Performance audit',
            'Design system workshop',
            'Team enablement',
          ],
          startingPrice: 'From €1,200 / session',
          icon: Zap,
          description:
            'Compact formats for quick analysis, decision-making and targeted improvement.',
        },
      ],
    },
  };

  const t = content[language];

  return (
    <section
      ref={sectionRef}
      className='relative py-32 lg:py-40'
      aria-label={language === 'DE' ? 'Stil Navigator' : 'Style Navigator'}
    >
      <Container size='default' className='safe-area-padding'>
        {/* CORE SERVICES SECTION */}
        <div
          className={`mb-8 transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}
        >
          {/* Section Header */}
          <div className='mb-8 text-center'>
            <h2 className='text-headline-lg font-headline text-accent-primary mb-8'>
              {t.coreTitle}
            </h2>
            <p className='text-body-large font-body mx-auto max-w-2xl text-white'>
              {t.coreSubtitle}
            </p>
          </div>

          {/* Honeycomb Pattern Grid */}
          <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
            {t.coreServices.map((style) => {
              const IconComponent = style.icon;
              const isHovered = hoveredCard === style.id;

              return (
                <motion.div
                  key={style.id}
                  className={`group relative cursor-pointer transition-all duration-500 ${
                    isHovered ? '-translate-y-2 transform' : ''
                  }`}
                  onMouseEnter={() => setHoveredCard(style.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className='card hover:border-accent-primary hover:shadow-accent-glow-subtle relative flex h-full flex-col justify-between rounded-2xl border border-(--color-border-on-light) p-8 text-(--text-on-light) transition-all duration-300'>
                    {/* Icon */}
                    <div className='mb-8 flex justify-center'>
                      <div
                        className={`rounded-full p-4 transition-all duration-500 ${
                          isHovered
                            ? 'bg-accent-primary scale-110 text-black'
                            : 'text-accent-primary bg-(--surface-card-subtle)'
                        }`}
                      >
                        <IconComponent size={24} />
                      </div>
                    </div>

                    {/* Style Info */}
                    <div className='flex-1 text-center'>
                      <h3
                        className={`text-headline-md font-headline mb-4 transition-colors duration-500 ${
                          isHovered ? 'text-(--text-on-light)' : 'text-accent-primary'
                        }`}
                      >
                        {style.name}
                      </h3>
                      <p className='text-body-small font-body mb-0 text-(--text-body-light)'>
                        {style.subtitle}
                      </p>
                    </div>

                    {/* Hover Indicator */}
                    <div className='mt-8 flex justify-center'>
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 ${
                          isHovered
                            ? 'bg-accent-primary text-black'
                            : 'bg-(--surface-card-subtle) text-(--text-body-light)'
                        }`}
                      >
                        <ChevronRight size={16} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* COLLABORATION MODELS SECTION */}
        <div
          className={`transition-all delay-500 duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}
        >
          {/* Section Header */}
          <div className='mb-16 text-center'>
            <h2 className='text-headline-lg font-headline mb-8 text-white'>{t.collabTitle}</h2>
            <p className='text-body-large font-body mx-auto max-w-2xl text-white'>
              {t.collabSubtitle}
            </p>
          </div>

          {/* 3 Vertical Glass Cards */}
          <div className='grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-16'>
            {t.collaborationModels.map((category) => {
              const IconComponent = category.icon;
              const isHovered = hoveredCard === category.id;

              return (
                <div
                  key={category.id}
                  className={`group relative cursor-pointer transition-all duration-500 ${
                    isHovered ? '-translate-y-2 transform' : ''
                  }`}
                  onMouseEnter={() => handleMouseEnter(category.id)}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => onServiceClick?.(category.id)}
                  role='button'
                  tabIndex={0}
                  onKeyDown={(e) =>
                    (e.key === 'Enter' || e.key === ' ') && onServiceClick?.(category.id)
                  }
                >
                  {/* Vertical Glass Card */}
                  <div
                    className={`glass-surface relative h-96 overflow-hidden rounded-2xl transition-all duration-500 lg:h-112 ${
                      isHovered
                        ? 'border-accent-primary border shadow-md'
                        : 'border border-(--color-border-on-light)'
                    }`}
                  >
                    {/* Orange Accent Line at Top */}
                    <div
                      className={`h-1 w-full transition-all duration-500 ${
                        isHovered
                          ? 'from-accent-primary via-accent-primary to-accent-primary bg-linear-to-r shadow-md'
                          : 'bg-accent-primary'
                      }`}
                    ></div>

                    {/* Content */}
                    <div className='flex h-full flex-col p-8'>
                      {/* Icon */}
                      <div className='mb-8 flex justify-center'>
                        <div
                          className={`rounded-full p-4 transition-all duration-500 ${
                            isHovered
                              ? 'scale-110 bg-(--surface-card-subtle) shadow-md'
                              : 'bg-(--surface-card-subtle)'
                          }`}
                        >
                          <IconComponent
                            size={28}
                            className={`transition-colors duration-500 ${
                              isHovered ? 'text-(--text-on-light)' : 'text-(--text-body-light)'
                            }`}
                          />
                        </div>
                      </div>

                      {/* Category Info */}
                      <div className='mb-8 text-center'>
                        <h3
                          className={`text-headline-md font-headline mb-2 transition-colors duration-500 ${
                            isHovered ? 'text-(--text-on-light)' : 'text-(--text-on-light)'
                          }`}
                        >
                          {category.name}
                        </h3>
                        <p className='text-body-small font-body mb-8 text-(--text-body-light)'>
                          {category.subtitle}
                        </p>
                        <p className='text-body-small font-body text-(--text-body-light)'>
                          {category.description}
                        </p>
                      </div>

                      {/* Locations */}
                      <div className='mb-8 flex-1'>
                        <div className='grid grid-cols-2 gap-0'>
                          {category.locations.map((location) => (
                            <div
                              key={location}
                              className='flex h-full flex-col rounded-lg border border-(--color-border-on-light) bg-(--surface-card-subtle) px-0 py-0 text-center'
                            >
                              <span className='text-body-small font-body text-(--text-body-light)'>
                                {location}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Starting Price - Appears on Hover */}
                      <div
                        className={`text-center transition-all duration-500 ${
                          isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                        }`}
                      >
                        <div className='mb-8 flex h-full flex-col rounded-xl border border-(--color-border-on-light) bg-(--surface-card) px-8 py-0'>
                          <span className='text-body-small font-body font-medium text-(--text-on-light)'>
                            {category.startingPrice}
                          </span>
                        </div>
                        <span className='text-body-small font-body group-hover:text-accent-primary font-medium text-(--text-on-light) transition-colors duration-300'>
                          {t.contactCta} →
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
