/**
 * ParallaxAbout - Premium parallax portfolio experience for About Us
 * Features GSAP ScrollTrigger animations, staggered reveals, and world-class effects
 */

import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { ResponsiveImage } from '@/components/atoms/ResponsiveImage/ResponsiveImage.tsx';
import { useLanguage } from '@/contexts/LanguageContext.tsx';
import './ParallaxAbout.css';

interface ParallaxAboutProps {
  className?: string;
}

export const ParallaxAbout: React.FC<ParallaxAboutProps> = ({ className = '' }) => {
  const { t } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);
  const heroImageLeftRef = useRef<HTMLDivElement>(null);
  const heroImageRightRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // matchMedia internally creates a context, no need to wrap in gsap.context()
    const mm = gsap.matchMedia();

    // Desktop parallax for hero images
    mm.add('(min-width: 768px)', () => {
      if (heroImageLeftRef.current && heroImageRightRef.current) {
        gsap.to(heroImageLeftRef.current, {
          y: -60,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        gsap.to(heroImageRightRef.current, {
          y: 60,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      }
    });

    // Mobile parallax for hero images (reduced movement)
    mm.add('(max-width: 767px)', () => {
      if (heroImageLeftRef.current && heroImageRightRef.current) {
        gsap.to(heroImageLeftRef.current, {
          y: -30,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        gsap.to(heroImageRightRef.current, {
          y: 30,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      }
    });

    // Hero content fade-in (no media query needed)
    if (heroContentRef.current) {
      gsap.fromTo(
        heroContentRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        },
      );
    }

    // Story card animations
    const storyCards = document.querySelectorAll('.about-story');
    storyCards.forEach((card, index) => {
      const text = card.querySelector('.about-story__text');
      const image = card.querySelector('.about-story__image');

      if (text) {
        gsap.fromTo(
          text,
          { opacity: 0, x: index % 2 === 0 ? -40 : 40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          },
        );
      }

      if (image) {
        gsap.fromTo(
          image,
          { opacity: 0, scale: 0.95 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          },
        );

        // Desktop-only parallax for story images
        mm.add('(min-width: 768px)', () => {
          gsap.to(image, {
            y: index % 2 === 0 ? 40 : -40,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
              invalidateOnRefresh: true,
            },
          });
        });
      }
    });

    // Cleanup: mm.revert() handles all animations created inside matchMedia
    // Also kill any remaining ScrollTriggers to prevent memory leaks
    return () => {
      mm.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className={`parallax-about ${className}`}>
      {/* Hero Section with Two Founder Photos */}
      <section className='about-hero' ref={heroRef}>
        <div className='about-hero__content' ref={heroContentRef}>
          <h1 className='about-hero__title'>{t('pages.about.parallax.hero.title')}</h1>
          <p className='about-hero__subtitle'>
            {t('pages.about.parallax.hero.subtitle')}
          </p>
        </div>

        <div className='about-hero__images'>
          <div
            ref={heroImageLeftRef}
            className='about-hero__image about-hero__image--left'
            role='img'
            aria-label={t('pages.about.parallax.hero.founder1.aria')}
          >
            <ResponsiveImage
              src='/Velo Gallery/gallery-carousel/sebi'
              alt={t('pages.about.parallax.hero.founder1.alt')}
              className='h-full w-full'
              objectFit='cover'
              objectPosition='center 20%'
              sizes='(max-width: 768px) 50vw, 33vw'
            />
          </div>
          <div
            ref={heroImageRightRef}
            className='about-hero__image about-hero__image--right'
            role='img'
            aria-label={t('pages.about.parallax.hero.founder2.aria')}
          >
            <ResponsiveImage
              src='/Velo Gallery/gallery-carousel/Team Lars'
              alt={t('pages.about.parallax.hero.founder2.alt')}
              className='h-full w-full'
              objectFit='cover'
              objectPosition='center 20%'
              sizes='(max-width: 768px) 50vw, 33vw'
            />
          </div>
        </div>
      </section>

      {/* Story Section 1: Text Left, Image Right */}
      <section className='about-story about-story--text-left'>
        <div className='about-story__text'>
          <h2 className='about-story__heading'>{t('pages.about.parallax.story1.heading')}</h2>
          <p className='about-story__paragraph'>
            {t('pages.about.parallax.story1.p1')}
          </p>
          <p className='about-story__paragraph'>
            {t('pages.about.parallax.story1.p2')}
          </p>
        </div>

        <div className='about-story__image'>
          <ResponsiveImage
            src='/Velo Gallery/gallery-carousel/our story '
            alt={t('pages.about.parallax.story1.imageAlt')}
            className='h-full w-full'
            objectFit='cover'
            sizes='(max-width: 768px) 100vw, 50vw'
          />
        </div>
      </section>

      {/* Story Section 2: Image Left, Text Right */}
      <section className='about-story about-story--text-right'>
        <div className='about-story__image'>
          <ResponsiveImage
            src='/Velo Gallery/gallery-carousel/why us '
            alt={t('pages.about.parallax.story2.imageAlt')}
            className='h-full w-full'
            objectFit='cover'
            sizes='(max-width: 768px) 100vw, 50vw'
          />
        </div>

        <div className='about-story__text'>
          <h2 className='about-story__heading'>{t('pages.about.parallax.story2.heading')}</h2>
          <p className='about-story__paragraph'>
            <strong>{t('pages.about.parallax.story2.p1Strong')}</strong>
            <br />
            {t('pages.about.parallax.story2.p1')}
          </p>
          <p className='about-story__paragraph'>
            <strong>{t('pages.about.parallax.story2.p2Strong')}</strong>
            <br />
            {t('pages.about.parallax.story2.p2')}
          </p>
          <p className='about-story__paragraph'>
            <strong>{t('pages.about.parallax.story2.p3Strong')}</strong>
            <br />
            {t('pages.about.parallax.story2.p3')}
          </p>
        </div>
      </section>

      {/* Additional Story Section: Team Chemistry */}
      <section className='about-story about-story--text-left'>
        <div className='about-story__text'>
          <h2 className='about-story__heading'>{t('pages.about.parallax.team.heading')}</h2>
          <p className='about-story__paragraph'>
            <strong>{t('pages.about.parallax.team.p1Strong')}</strong>
          </p>
          <p className='about-story__paragraph'>
            {t('pages.about.parallax.team.p2')}
          </p>
          <p className='about-story__paragraph'>
            {t('pages.about.parallax.team.p3')}
          </p>
          <p className='about-story__paragraph'>
            <Link
              to='/firmenfeiern'
              className='text-accent-primary font-medium transition-colors duration-200 hover:underline'
            >
              {t('pages.about.parallax.team.links.corporate')}
            </Link>{' '}
            {t('pages.about.parallax.team.links.middle')}{' '}
            <Link
              to='/galerie'
              className='text-accent-primary font-medium transition-colors duration-200 hover:underline'
            >
              {t('pages.about.parallax.team.links.gallery')}
            </Link>{' '}
            {t('pages.about.parallax.team.links.suffix')}
          </p>
        </div>

        <div className='about-story__image'>
          <ResponsiveImage
            src='/Velo Gallery/gallery-carousel/Team'
            alt={t('pages.about.parallax.team.imageAlt')}
            className='h-full w-full'
            objectFit='cover'
            sizes='(max-width: 768px) 100vw, 50vw'
          />
        </div>
      </section>
    </div>
  );
};

export default ParallaxAbout;
