/**
 * AboutPage - About Velo.Bar
 */

import React from 'react';
import { PageTemplate } from '@/templates/PageTemplate';
import { Section } from '@/components/atoms/Section/Section.tsx';
import { HeroHeading } from '@/components/ui/HeroHeading.tsx';
import { ParallaxAbout } from '@/components/ParallaxAbout/ParallaxAbout.tsx';
import { aboutContent } from '@/content/about.ts';

export const AboutPage: React.FC = () => {
  const { hero } = aboutContent;

  return (
    <PageTemplate
      title={aboutContent.seoTitle}
      description={aboutContent.seoDescription}
      withContainer={false}
      background='transparent'
    >
      <HeroHeading eyebrow='Über uns' title={hero.title} subtitle={hero.subtitle} />

      {/* About Section with Parallax */}
      <Section container='none' spacing='none' background='transparent'>
        <ParallaxAbout />
      </Section>
    </PageTemplate>
  );
};

export default AboutPage;
