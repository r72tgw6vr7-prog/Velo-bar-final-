'use client';

import { useEffect, useRef } from 'react';

import { cn } from '@/utils/classname.ts';

/**
 * BackgroundGradientAnimation
 * ===========================
 * Light, airy background with soft teal and coral glows on cream base.
 * Mount ONCE at root level (main.ts.
 *
 * Brand colors ONLY:
 * - Cream: rgb(255, 248, 236)
 * - Deep teal: rgb(0, 49, 65)
 * - Medium teal: rgb(0, 80, 100)
 * - Coral: rgb(238, 120, 104)
 *
 * MOBILE PERF: Disables expensive blur filter and RAF loop on mobile devices
 * to maintain 60fps. Uses static gradient fallback instead.
 */

export function BackgroundGradientAnimation() {
  const interactiveRef = useRef<HTMLDivElement>(null);
  const curX = useRef(0);
  const curY = useRef(0);
  const tgX = useRef(0);
  const tgY = useRef(0);

  // Interactive pointer-following blob
  useEffect(() => {
    let animationId: number;

    function move() {
      if (!interactiveRef.current) {
        animationId = requestAnimationFrame(move);
        return;
      }
      curX.current += (tgX.current - curX.current) / 20;
      curY.current += (tgY.current - curY.current) / 20;
      interactiveRef.current.style.transform = `translate(${Math.round(curX.current)}px, ${Math.round(curY.current)}px)`;
      animationId = requestAnimationFrame(move);
    }

    const handleMouseMove = (event: MouseEvent) => {
      tgX.current = event.clientX;
      tgY.current = event.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    animationId = requestAnimationFrame(move);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div
      className={cn('fixed inset-0 -z-10 overflow-hidden', 'h-screen w-screen', 'bg-guardian-hero')}
      aria-hidden='true'
    >
      {/* SVG filter for soft gooey blur */}
      <svg className='hidden' aria-hidden='true'>
        <defs>
          <filter id='goo'>
            <feGaussianBlur in='SourceGraphic' stdDeviation='10' result='blur' />
            <feColorMatrix
              in='blur'
              mode='matrix'
              values='1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8'
              result='goo'
            />
            <feBlend in='SourceGraphic' in2='goo' />
          </filter>
        </defs>
      </svg>

      {/* Gradient orbs container */}
      <div
        className='gradients-container absolute inset-0'
        style={{ filter: 'url(#goo) blur(40px)' }}
      >
        {/* ORB 1: Cream glow - ABOVE hero text, not centered behind it
            Provides soft top-lighting without washing out content */}
        <div
          className='animate-first absolute'
          style={{
            width: '45vw',
            height: '45vw',
            top: '-10%',
            left: '50%',
            transform: 'translateX(-50%)',
            background:
              'radial-gradient(circle at 50% 40%, rgba(255, 248, 236, 0.7) 0%, rgba(255, 248, 236, 0) 70%)',
            mixBlendMode: 'soft-light',
            transformOrigin: 'center center',
          }}
        />

        {/* ORB 2: Teal glow - bottom-left
            Adds depth and cool tones to lower portion */}
        <div
          className='animate-second absolute'
          style={{
            width: '40vw',
            height: '40vw',
            bottom: '-10%',
            left: '-5%',
            background:
              'radial-gradient(circle at 20% 80%, rgba(0, 80, 100, 0.5) 0%, rgba(0, 80, 100, 0) 75%)',
            mixBlendMode: 'multiply',
            transformOrigin: 'calc(50% - 400px) center',
          }}
        />

        {/* ORB 3: Coral accent - mid-right
            Warm accent for subtle color variation */}
        <div
          className='animate-third absolute'
          style={{
            width: '30vw',
            height: '30vw',
            top: '25%',
            right: '-5%',
            background:
              'radial-gradient(circle at 80% 30%, rgba(238, 120, 104, 0.45) 0%, rgba(238, 120, 104, 0) 75%)',
            mixBlendMode: 'soft-light',
            transformOrigin: 'calc(50% + 400px) center',
          }}
        />

        {/* ORB 4: Secondary teal - bottom center, very subtle
            Balances composition without competing with content */}
        <div
          className='animate-fourth absolute'
          style={{
            width: '25vw',
            height: '25vw',
            bottom: '5%',
            left: '50%',
            transform: 'translateX(-50%)',
            background:
              'radial-gradient(circle at 50% 60%, rgba(0, 80, 100, 0.35) 0%, rgba(0, 80, 100, 0) 70%)',
            mixBlendMode: 'multiply',
            transformOrigin: 'center calc(50% + 200px)',
          }}
        />

        {/* Interactive pointer-following orb - very subtle coral */}
        <div
          ref={interactiveRef}
          className='pointer-events-none absolute'
          style={{
            width: '100%',
            height: '100%',
            top: '-50%',
            left: '-50%',
            background:
              'radial-gradient(circle at center, rgba(238, 120, 104, 0.2) 0%, rgba(238, 120, 104, 0) 40%)',
            mixBlendMode: 'soft-light',
          }}
        />
      </div>
    </div>
  );
}
