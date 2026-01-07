/**
 * ParallaxAbout - Premium parallax portfolio experience for About Us
 * Features GSAP ScrollTrigger animations, staggered reveals, and world-class effects
 */

import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import './ParallaxAbout.css';

interface ParallaxAboutProps {
  className?: string;
}

export const ParallaxAbout: React.FC<ParallaxAboutProps> = ({ className = '' }) => {
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
          <h1 className='about-hero__title'>Wir sind Velo.Bar</h1>
          <p className='about-hero__subtitle'>
            Gegründet mit der Vision, Premium-Cocktails auf Rädern zu bringen. Leidenschaft für
            Qualität, Handwerk und Bar-Erlebnisse, die im Kopf bleiben.
          </p>
        </div>

        <div className='about-hero__images'>
          <div
            ref={heroImageLeftRef}
            className='about-hero__image about-hero__image--left'
            style={{
              backgroundImage: 'url(/Velo%20Gallery/gallery-carousel/sebi.JPG)',
              backgroundSize: '150%',
              backgroundPosition: 'center 20%',
            }}
            role='img'
            aria-label='Sebastian - Co-Founder'
          />
          <div
            ref={heroImageRightRef}
            className='about-hero__image about-hero__image--right'
            style={{
              backgroundImage: 'url(/Velo%20Gallery/gallery-carousel/Team%20Lars.JPG)',
              backgroundSize: '150%',
              backgroundPosition: 'center 20%',
            }}
            role='img'
            aria-label='Lars Eggers - Co-Founder'
          />
        </div>
      </section>

      {/* Story Section 1: Text Left, Image Right */}
      <section className='about-story about-story--text-left'>
        <div className='about-story__text'>
          <h2 className='about-story__heading'>Die Geschichte</h2>
          <p className='about-story__paragraph'>
            Was mit einer Idee begann – "Wie bringen wir Bar-Qualität zu Messen und Firmenfeiern?" –
            ist heute ein etabliertes Unternehmen mit über 500 Events für Kunden in München und
            Coburg.
          </p>
          <p className='about-story__paragraph'>
            Wenn die Gäste nicht in die Bar kommen können, bringen wir die Bar zu ihnen. Diese
            Vision hat uns zu dem gemacht, was wir heute sind: Spezialisten für
            Premium-Cocktail-Catering bei Corporate Events.
          </p>
        </div>

        <div
          className='about-story__image'
          style={{
            backgroundImage: 'url(/Velo%20Gallery/gallery-carousel/our%20story%20.JPG)',
          }}
          role='img'
          aria-label='Velo Bar Our Story'
        />
      </section>

      {/* Story Section 2: Image Left, Text Right */}
      <section className='about-story about-story--text-right'>
        <div
          className='about-story__image'
          style={{
            backgroundImage: 'url(/Velo%20Gallery/gallery-carousel/why%20us%20.jpg)',
          }}
          role='img'
          aria-label='Why Velo Bar'
        />

        <div className='about-story__text'>
          <h2 className='about-story__heading'>Warum wir die Richtigen für dein Event sind</h2>
          <p className='about-story__paragraph'>
            <strong>Du kannst dich entspannen – wir kümmern uns um Bar & Drinks.</strong>
            <br />
            Saubere Abläufe, erfahrenes Team, zuverlässiger Service. Du konzentrierst dich auf dein
            Event, wir liefern das Bar-Erlebnis.
          </p>
          <p className='about-story__paragraph'>
            <strong>Deine Gäste bekommen Premium-Cocktails, keine Standard-Mischungen.</strong>
            <br />
            Wir investieren in die besten Spirituosen, trainierte Barkeeper und handgemachte Drinks.
            Qualität, die man schmeckt.
          </p>
          <p className='about-story__paragraph'>
            <strong>Dein Event wirkt professionell, aber nicht steif.</strong>
            <br />
            Lars bringt 10 Jahre internationale Barkeeper-Erfahrung mit, Sebastian die süddeutsche
            Gastfreundschaft und lokale München-Expertise. Zusammen bilden wir das perfekte Gespann.
          </p>
        </div>
      </section>

      {/* Additional Story Section: Team Chemistry */}
      <section className='about-story about-story--text-left'>
        <div className='about-story__text'>
          <h2 className='about-story__heading'>Das Team</h2>
          <p className='about-story__paragraph'>
            <strong>Lars (Nord) + Sebastian (Süd) = Perfektes Gespann für München</strong>
          </p>
          <p className='about-story__paragraph'>
            "Moin" trifft auf "Servus" – internationale Barkeeper-Erfahrung trifft auf lokale
            Verwurzelung. Unsere unterschiedlichen Hintergründe ergänzen sich perfekt und schaffen
            eine einzigartige Mischung aus Professionalität und Herzlichkeit.
          </p>
          <p className='about-story__paragraph'>
            Mit über 500 erfolgreich durchgeführten Events für Unternehmen wie BMW, Siemens und
            innovative Startups haben wir bewiesen: Unsere Vision funktioniert. Jedes Event ist für
            uns eine Chance, Premium-Bar-Handwerk zu zeigen.
          </p>
          <p className='about-story__paragraph'>
            <Link
              to='/firmenfeiern'
              className='text-accent-primary font-medium transition-colors duration-200 hover:underline'
            >
              Erfahre mehr über unsere Firmenfeiern
            </Link>{' '}
            oder sieh dir unsere{' '}
            <Link
              to='/galerie'
              className='text-accent-primary font-medium transition-colors duration-200 hover:underline'
            >
              Galerie
            </Link>{' '}
            an.
          </p>
        </div>

        <div
          className='about-story__image'
          style={{
            backgroundImage: 'url(/Velo%20Gallery/gallery-carousel/Team.JPG)',
          }}
          role='img'
          aria-label='Velo Bar Team'
        />
      </section>
    </div>
  );
};

export default ParallaxAbout;
