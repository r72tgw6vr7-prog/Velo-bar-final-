/**
 * UI Lab Preview Page
 * ===================
 * Temporary preview page to showcase all latest UI surfaces
 * Mounts components in vertical sections for visual verification
 *
 * HERO: Uses canonical HeroLocked component (see docs/HERO_AND_APP_WIRING.md)
 */

import '@/styles/pages/home-new.css';
import '@/styles/pages/ui-lab-unified.css';
import React from 'react';
import { PageTemplate } from '@/templates/PageTemplate';
import { SiteBackground } from '@/components/layout/SiteBackground';
import { Section } from '@/components/atoms/Section/Section.tsx';
import { Container } from '@/components/atoms/Container/Container.tsx';

// Hero - using canonical component
import { HeroLocked } from '@/sections/HeroLocked.tsx';
import { EyebrowBadge } from '@/components/atoms/EyebrowBadge.tsx';

// Cards & Trust
import { StackingCards } from '@/components/animations/StackingCards.tsx';
import { ServiceCards } from '@/components/molecules/Card/ServiceCards.tsx';
import { PriceCard } from '@/components/molecules/PriceCard.tsx';
import { TrustBadges } from '@/components/molecules/TrustBadges.tsx';
import { StickyTrustSignalsBar } from '@/components/molecules/StickyTrustSignalsBar.tsx';

// About / Parallax
import { ParallaxAbout } from '@/components/ParallaxAbout/ParallaxAbout.tsx';

// Sections
import { ServicesSection } from '@/sections/ServicesSection.tsx';
import { PartnersAndTestimonialsSection } from '@/sections/PartnersAndTestimonialsSection.tsx';
import { TrustSignalsSection } from '@/sections/TrustSignalsSection.tsx';
import { ClientLogos } from '@/sections/ClientLogos.tsx';

// Menu/Drinks content (simplified version)
import { HeroHeading } from '@/components/ui/HeroHeading.tsx';

// Pricing components
import { IncludedItemCard } from '@/components/molecules/IncludedItemCard.tsx';

// Location components
import VenueLandingPage from '@/pages/locations/VenueLandingPage.tsx';
import LocationsIndexPage from '@/pages/locations/LocationsIndexPage.tsx';

// Icons
import MapPin from 'lucide-react/dist/esm/icons/map-pin';
import Users from 'lucide-react/dist/esm/icons/users';
import Calendar from 'lucide-react/dist/esm/icons/calendar';
import Star from 'lucide-react/dist/esm/icons/star';

const DesignSystemPreviewPage: React.FC = () => {
  // Sample data for components that need props
  const stackingCardsData = [
    {
      id: 'professional-barkeepers',
      icon: <Users size={24} />,
      title: 'Professionelle Barkeeper',
      description:
        'Erfahrene Barkeeper mit Leidenschaft für erstklassige Cocktails und Service. Wir bringen 10+ Jahre internationale Bar-Erfahrung zu Ihrem Event.',
    },
    {
      id: 'flexible-booking',
      icon: <Calendar size={24} />,
      title: 'Flexibel buchbar',
      description:
        'Von kleinen Feiern bis zu Großevents – wir passen uns Ihren Bedürfnissen an. Für 50-500+ Gäste, überall in München und Coburg.',
    },
    {
      id: 'premium-quality',
      icon: <Star size={24} />,
      title: 'Premium Qualität',
      description:
        'Handgemachte Cocktails mit den besten Spirituosen. Ihre Gäste bekommen Bar-Qualität, die man schmeckt und die im Gedächtnis bleibt.',
    },
  ];

  const cocktails = [
    {
      name: 'Himbeer - Hibiskus Fizz',
      ingredients: ['Gin', 'SESES Himbeere - Hibiskus', 'Soda', 'Zitrone', 'Zucker'],
      type: 'Refreshing, fruity',
    },
    {
      name: 'Bramble',
      ingredients: ['Gin', 'Chambord', 'SESES Brombeere - Lavendel', 'Zitrone', 'Zucker'],
      type: 'Classic, berry-forward',
    },
    {
      name: 'Maracuja Mojito',
      ingredients: ['Rum', 'SESES Maracuja - Minze', 'Soda', 'Limette', 'Zucker', 'Minze'],
      type: 'Tropical, refreshing',
    },
    {
      name: 'Mango Rosmarin Mule',
      ingredients: ['Vodka', 'SESES Mango - Rosmarin', 'Ginger Beer', 'Limette'],
      type: 'Spicy, aromatic',
    },
  ];

  return (
    <SiteBackground>
    <PageTemplate
      title='UI Lab Preview | Velo.Bar'
      description='Preview of all latest UI surfaces'
      canonicalPath='/ui-lab'
      withContainer={false}
    >
      {/* Hero Section - Using canonical HeroLocked component */}
      <Section container='default' spacing='none' background='transparent'>
        <Container size='default' className='relative z-10'>
          <div className='mb-8 text-center'>
            <EyebrowBadge icon={<MapPin size={16} />}>UI Lab Preview</EyebrowBadge>
            <h1 className='text-accent-primary mt-4 mb-4 text-4xl font-bold'>Latest UI Surfaces</h1>
            <p className='text-text-body text-lg'>Visual verification of all components</p>
          </div>
        </Container>
        <HeroLocked />
      </Section>

      {/* Stacking Cards */}
      <Section container='default' spacing='xl' background='transparent'>
        <Container size='default'>
          <div className='mb-16 text-center'>
            <h2 className='text-accent-primary mb-4 text-3xl font-bold'>Stacking Cards</h2>
            <p className='text-text-body'>GSAP-powered stacking cards animation</p>
          </div>
          <StackingCards cards={stackingCardsData} />
        </Container>
      </Section>

      {/* Service Cards */}
      <Section container='default' spacing='xl' background='transparent'>
        <Container size='default'>
          <div className='mb-16 text-center'>
            <h2 className='text-accent-primary mb-4 text-3xl font-bold'>Service Cards</h2>
            <p className='text-text-body'>Service showcase cards</p>
          </div>
          <ServiceCards />
        </Container>
      </Section>

      {/* Price Cards */}
      <Section container='default' spacing='xl' background='transparent'>
        <Container size='default'>
          <div className='mb-16 text-center'>
            <h2 className='text-accent-primary mb-4 text-3xl font-bold'>Price Cards</h2>
            <p className='text-text-body'>Pricing card components</p>
          </div>
          <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
            <PriceCard
              iconUrl='/Velo Gallery/bar-icon'
              title='Basic Package'
              description='Perfect for smaller events'
              features={[
                { text: 'Mobile Bar für 50 Gäste', iconUrl: '/icons/guests.svg' },
                { text: '2 Stunden Bar-Service', iconUrl: '/icons/time.svg' },
                { text: 'Grundauswahl an Cocktails', iconUrl: '/icons/cocktails.svg' },
                { text: 'Professioneller Barkeeper', iconUrl: '/icons/barkeeper.svg' },
              ]}
              ctaText='Jetzt Anfragen'
              highlighted={false}
            />
            <PriceCard
              iconUrl='/Velo Gallery/bar-icon.webp'
              title='Premium Package'
              description='Our most popular choice'
              features={[
                { text: 'Mobile Bar für 100 Gäste', iconUrl: '/icons/guests.svg' },
                { text: '4 Stunden Bar-Service', iconUrl: '/icons/time.svg' },
                { text: 'Erweiterte Cocktail-Auswahl', iconUrl: '/icons/cocktails.svg' },
                { text: '2 Barkeeper', iconUrl: '/icons/barkeeper.svg' },
                { text: 'Edelstahl-Schank-Theke', iconUrl: '/icons/bar.svg' },
              ]}
              ctaText='Jetzt Anfragen'
              highlighted
            />
            <PriceCard
              iconUrl='/Velo Gallery/bar-icon.webp'
              title='Business Package'
              description='For large corporate events'
              features={[
                { text: 'Mobile Bar für 200+ Gäste', iconUrl: '/icons/guests.svg' },
                { text: '6 Stunden Bar-Service', iconUrl: '/icons/time.svg' },
                { text: 'Premium Cocktail-Auswahl', iconUrl: '/icons/cocktails.svg' },
                { text: '3 Barkeeper', iconUrl: '/icons/barkeeper.svg' },
                { text: 'Beleuchtung & Deko', iconUrl: '/icons/deco.svg' },
              ]}
              ctaText='Jetzt Anfragen'
              highlighted={false}
            />
          </div>
        </Container>
      </Section>

      {/* Trust Badges */}
      <Section container='default' spacing='xl' background='transparent'>
        <Container size='default'>
          <div className='mb-16 text-center'>
            <h2 className='text-accent-primary mb-4 text-3xl font-bold'>Trust Badges</h2>
            <p className='text-text-body'>Trust and certification badges</p>
          </div>
          <TrustBadges />
        </Container>
      </Section>

      {/* Sticky Trust Signals Bar */}
      <Section container='default' spacing='xl' background='transparent'>
        <Container size='default'>
          <div className='mb-16 text-center'>
            <h2 className='text-accent-primary mb-4 text-3xl font-bold'>Trust Signals Bar</h2>
            <p className='text-text-body'>Trust signals (normally sticky)</p>
          </div>
          <div className='relative'>
            <StickyTrustSignalsBar />
          </div>
        </Container>
      </Section>

      {/* Parallax About */}
      <Section container='none' spacing='none' background='transparent'>
        <Container size='default'>
          <div className='mb-16 text-center'>
            <h2 className='text-accent-primary mb-4 text-3xl font-bold'>Parallax About</h2>
            <p className='text-text-body'>Parallax scrolling about section</p>
          </div>
        </Container>
        <ParallaxAbout />
      </Section>

      {/* Services Section */}
      <Section container='default' spacing='xl' background='transparent'>
        <Container size='default'>
          <div className='mb-16 text-center'>
            <h2 className='text-accent-primary mb-4 text-3xl font-bold'>Services Section</h2>
            <p className='text-text-body'>Complete services section</p>
          </div>
          <ServicesSection />
        </Container>
      </Section>

      {/* Partners and Testimonials */}
      <Section container='default' spacing='xl' background='transparent'>
        <Container size='default'>
          <div className='mb-16 text-center'>
            <h2 className='text-accent-primary mb-4 text-3xl font-bold'>Partners & Testimonials</h2>
            <p className='text-text-body'>Partners and customer testimonials</p>
          </div>
          <PartnersAndTestimonialsSection />
        </Container>
      </Section>

      {/* Trust Signals Section */}
      <Section container='default' spacing='xl' background='transparent'>
        <Container size='default'>
          <div className='mb-16 text-center'>
            <h2 className='text-accent-primary mb-4 text-3xl font-bold'>Trust Signals Section</h2>
            <p className='text-text-body'>Trust signals and statistics</p>
          </div>
          <TrustSignalsSection
            title='Vertrauen & Qualität'
            subtitle='Warum Kunden uns wählen'
            partners={[
              {
                logo: '/Velo Gallery/partner1',
                name: 'BMW Group',
                description: 'Corporate Events',
              },
              { logo: '/Velo Gallery/partner2', name: 'Siemens', description: 'Team Events' },
              {
                logo: '/Velo Gallery/partner3',
                name: 'Allianz',
                description: 'Company Celebrations',
              },
            ]}
            reviews={[
              {
                rating: 5,
                content: 'Exzellenter Service und tolle Cocktails!',
                author: 'Maria Schmidt',
                source: 'Google',
              },
              {
                rating: 5,
                content: 'Perfekt für unser Firmenevent.',
                author: 'Thomas Weber',
                source: 'Google',
              },
              {
                rating: 5,
                content: 'Professionelle Barkeeper, super Atmosphäre.',
                author: 'Julia Meier',
                source: 'Google',
              },
            ]}
            badges={[
              { iconUrl: '/icons/certificate.svg', text: 'Zertifizierte Barkeeper' },
              { iconUrl: '/icons/insurance.svg', text: 'Vollversichert' },
              { iconUrl: '/icons/eco.svg', text: 'Nachhaltig' },
            ]}
          />
        </Container>
      </Section>

      {/* Client Logos */}
      <Section container='default' spacing='xl' background='transparent'>
        <Container size='default'>
          <div className='mb-16 text-center'>
            <h2 className='text-accent-primary mb-4 text-3xl font-bold'>Client Logos</h2>
            <p className='text-text-body'>Trusted by companies</p>
          </div>
          <ClientLogos
            variant='marquee'
            title='Vertrauen von führenden Unternehmen'
            subtitle='Diese Unternehmen haben uns bereits für ihre Events gebucht'
          />
        </Container>
      </Section>

      {/* Menu/Drinks Preview */}
      <Section container='default' spacing='xl' background='transparent'>
        <Container size='default'>
          <HeroHeading
            eyebrow='Unsere Cocktails'
            title='Drinks Menu Preview'
            subtitle='Unsere Cocktail-Auswahl als Inspiration. Wir kreieren die passenden Drinks für Ihr Event.'
          />

          <div className='mb-8 flex justify-center'>
            <EyebrowBadge>Signature Drinks</EyebrowBadge>
          </div>

          <div className='grid gap-8 md:grid-cols-2'>
            {cocktails.map((cocktail, index) => (
              <div
                key={index}
                className='flex h-full flex-col rounded-xl border border-[rgba(0,49,65,0.06)] bg-[rgba(255,248,236,0.9)] p-8 transition duration-200 ease-out hover:border-[rgba(238,120,104,0.3)]'
              >
                <h3 className='mb-0 text-xl font-bold text-[rgb(238,120,104)]'>{cocktail.name}</h3>
                <p className='mb-8 text-sm text-[rgba(0,80,100,0.7)] italic'>{cocktail.type}</p>
                <p className='text-[rgb(0,30,50)]'>{cocktail.ingredients.join(' · ')}</p>
              </div>
            ))}
          </div>

          <div className='mt-16 text-center'>
            <div className='flex justify-center'>
              <EyebrowBadge>Classic Highballs</EyebrowBadge>
            </div>
          </div>
          <div className='mt-8 grid gap-8 md:grid-cols-3'>
            {[
              'Mojito',
              'Moscow Mule',
              'Aperol Spritz',
              'Gin Tonic',
              'Whiskey Sour',
              'Margarita',
            ].map((name) => (
              <div
                key={name}
                className='flex h-full flex-col rounded-xl border border-[rgba(0,49,65,0.06)] bg-[rgba(255,248,236,0.9)] p-8 text-center'
              >
                <h3 className='font-semibold text-[rgb(0,49,65)]'>{name}</h3>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Location Details Preview */}
      <Section container='default' spacing='xl' background='transparent'>
        <Container size='default'>
          <div className='mb-16 text-center'>
            <h2 className='text-accent-primary mb-4 text-3xl font-bold'>Location Details</h2>
            <p className='text-text-body'>Venue-specific landing pages and location cards</p>
          </div>

          <div className='mb-16'>
            <h3 className='mb-8 text-xl font-bold text-[#003141]'>Sample Venue: Messe München</h3>
            <div className='rounded-xl border border-[rgba(0,49,65,0.06)] bg-[rgba(255,248,236,0.9)] p-8'>
              <div className='grid gap-8 md:grid-cols-2'>
                <div>
                  <h4 className='mb-4 font-semibold text-[#003141]'>Event Highlights</h4>
                  <ul className='space-y-2 text-[#003141]'>
                    <li>• Über 40 internationale Messen pro Jahr</li>
                    <li>• BAUMA: 500.000+ Besucher</li>
                    <li>• ISPO: 80.000+ Fachbesucher</li>
                    <li>• Direkte U-Bahn-Anbindung</li>
                  </ul>
                </div>
                <div>
                  <h4 className='mb-4 font-semibold text-[#003141]'>Unsere Lösungen</h4>
                  <ul className='space-y-2 text-[#003141]'>
                    <li>• Autarke Bar ohne Stromanschluss</li>
                    <li>• Kompaktes Setup in 30 Minuten</li>
                    <li>• Lastenrad-Anlieferung</li>
                    <li>• All-Inclusive-Pakete</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className='mb-8 text-xl font-bold text-[#003141]'>All Locations</h3>
            <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
              {[
                'Messe München',
                'MOC München',
                'Ballhausforum Infinity',
                'Werk1 München',
                'Schloss Schleißheim',
                'Zenith München',
              ].map((venue) => (
                <div
                  key={venue}
                  className='cursor-pointer rounded-lg border border-[rgba(0,49,65,0.06)] bg-[rgba(255,248,236,0.9)] p-4 transition duration-200 ease-out hover:border-[rgba(238,120,104,0.3)]'
                >
                  <h4 className='font-semibold text-[#003141]'>{venue}</h4>
                  <p className='text-sm text-[rgba(0,80,100,0.7)]'>Event location details</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Footer note */}
      <Section container='default' spacing='xl' background='transparent'>
        <Container size='default'>
          <div className='text-center'>
            <p className='text-text-body text-sm'>UI Lab Preview - End of component showcase</p>
          </div>
        </Container>
      </Section>
      </PageTemplate>
    </SiteBackground>
  );
};

export default DesignSystemPreviewPage;
