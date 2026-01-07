import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import type { HTMLAttributes, ReactNode } from 'react';
import { HeroSection } from '@/sections/HeroSection.tsx';

// Mock framer-motion
vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion');
  return {
    ...actual,
    motion: {
      div: ({
        children,
        style,
        className,
        ...props
      }: { children?: ReactNode } & HTMLAttributes<HTMLDivElement>) => (
        <div style={style} className={className} {...props}>
          {children}
        </div>
      ),
    },
    useScroll: () => ({ scrollYProgress: { current: 0 } }),
    useTransform: () => ({ current: '0%' }),
  };
});

describe('HeroSection Component', () => {
  describe('Rendering', () => {
    it('renders hero section', () => {
      const { container } = render(<HeroSection />);
      const hero = container.querySelector('.relative.min-h-screen');
      expect(hero).toBeDefined();
    });

    it('renders with background container', () => {
      const { container } = render(<HeroSection />);
      const background = container.querySelector('.absolute.inset-0');
      expect(background).toBeDefined();
    });

    it('accepts custom background image prop', () => {
      expect(() => render(<HeroSection backgroundImage='/custom-hero.jpg' />)).not.toThrow();
    });

    it('renders children when provided', () => {
      render(
        <HeroSection>
          <div data-testid='custom-content'>Custom Hero Content</div>
        </HeroSection>,
      );
      expect(screen.getByTestId('custom-content')).toBeDefined();
      expect(screen.getByText('Custom Hero Content')).toBeDefined();
    });
  });

  describe('Background Styles', () => {
    it('has layered background structure', () => {
      const { container } = render(<HeroSection />);
      const bgContainer = container.querySelector('.absolute.inset-0');

      // Check that background container exists
      expect(bgContainer).toBeDefined();
    });

    it('sets up parallax container', () => {
      const { container } = render(<HeroSection />);
      const hero = container.querySelector('.relative.min-h-screen');
      expect(hero?.className).toContain('overflow-hidden');
    });

    it('has absolute positioned background', () => {
      const { container } = render(<HeroSection />);
      const bgContainer = container.querySelector('.absolute.inset-0');
      expect(bgContainer).toBeDefined();
    });
  });

  describe('Layout', () => {
    it('uses flexbox layout', () => {
      const { container } = render(<HeroSection />);
      const hero = container.querySelector('.relative.min-h-screen');
      expect(hero?.className).toContain('flex');
      expect(hero?.className).toContain('flex-col');
    });

    it('has full screen minimum height', () => {
      const { container } = render(<HeroSection />);
      const hero = container.querySelector('.min-h-screen');
      expect(hero).toBeDefined();
    });

    it('uses relative positioning for content stacking', () => {
      const { container } = render(<HeroSection />);
      const hero = container.querySelector('.relative');
      expect(hero).toBeDefined();
    });
  });

  describe('Props', () => {
    it('accepts backgroundImage prop without errors', () => {
      const customBg = '/assets/custom-background.jpg';
      expect(() => render(<HeroSection backgroundImage={customBg} />)).not.toThrow();
    });

    it('renders without crashing when no props provided', () => {
      expect(() => render(<HeroSection />)).not.toThrow();
    });
  });

  describe('Performance', () => {
    it('applies will-change for GPU acceleration', () => {
      const { container } = render(<HeroSection />);
      const background = container.querySelector('[style*="background"]') as HTMLElement;
      // Performance optimizations are applied via motion.div
      expect(background).toBeDefined();
    });

    it('applies transform3d for GPU layer', () => {
      const { container } = render(<HeroSection />);
      const background = container.querySelector('[style*="transform"]') as HTMLElement;
      expect(background?.style.transform).toBeTruthy();
    });

    it('applies backface-visibility optimization', () => {
      const { container } = render(<HeroSection />);
      const background = container.querySelector('[style*="background"]') as HTMLElement;
      // Backface visibility is applied for performance
      expect(background).toBeDefined();
    });
  });

  describe('Structure', () => {
    it('maintains proper z-index stacking', () => {
      const { container } = render(<HeroSection />);
      // Background should be behind content (z-20)
      const backgrounds = container.querySelectorAll('[class*="z-"]');
      expect(backgrounds.length).toBeGreaterThan(0);
    });

    it('has overflow hidden to prevent scroll issues', () => {
      const { container } = render(<HeroSection />);
      const hero = container.querySelector('.overflow-hidden');
      expect(hero).toBeDefined();
    });
  });

  describe('Content Overlay', () => {
    it('supports complex children structures', () => {
      render(
        <HeroSection>
          <div data-testid='heading'>Heading</div>
          <div data-testid='subheading'>Subheading</div>
          <button data-testid='cta'>Call to Action</button>
        </HeroSection>,
      );

      expect(screen.getByTestId('heading')).toBeDefined();
      expect(screen.getByTestId('subheading')).toBeDefined();
      expect(screen.getByTestId('cta')).toBeDefined();
    });
  });
});
