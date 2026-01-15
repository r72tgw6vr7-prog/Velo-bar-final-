/**
 * AboutPage - About Velo.Bar
 */

import React from 'react';
import { PageTemplate } from '@/templates/PageTemplate';
import { SiteBackground } from '@/components/layout/SiteBackground';
import { Section } from '@/components/atoms/Section/Section.tsx';
import { HeroHeading } from '@/components/ui/HeroHeading.tsx';
import { ParallaxAbout } from '@/components/ParallaxAbout/ParallaxAbout.tsx';
import { aboutContent, aboutContentEN } from '@/content/about.ts';
import { useLanguage } from '@/contexts/LanguageContext.tsx';

export const AboutPage: React.FC = () => {
  const { language } = useLanguage();
  const content = language === 'de' ? aboutContent : aboutContentEN;
  const { hero } = content;

  return (
    <SiteBackground>
      <PageTemplate
        title={content.seoTitle}
        description={content.seoDescription}
        withContainer={false}
        background='transparent'
      >
        <HeroHeading eyebrow={hero.eyebrow} title={hero.title} subtitle={hero.subtitle} />

        {/* About Section with Parallax */}
        <Section container='none' spacing='none' background='transparent'>
          <ParallaxAbout />
        </Section>
      </PageTemplate>
    </SiteBackground>
  );
};

export default AboutPage;
