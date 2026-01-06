/**
 * CONSOLIDATED CARD COMPONENT TESTS
 * ==================================
 *
 * Tests for the consolidated Card component covering:
 * - All variant props
 * - Compound components (Header, Body, Footer)
 * - Backward compatibility
 * - Visual parity with legacy implementation
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Card } from '../../components/atoms/Card/Card';
import type { CardVariant, CardPadding } from '../../types/components';

describe('Card - Consolidated Component', () => {
  describe('Variant Rendering', () => {
    const variants: CardVariant[] = ['default', 'elevated', 'outlined', 'bordered', 'glass'];

    variants.forEach((variant) => {
      it(`should render ${variant} variant correctly`, () => {
        render(
          <Card variant={variant} data-testid={`card-${variant}`}>
            Test Content
          </Card>,
        );

        const card = screen.getByTestId(`card-${variant}`);
        expect(card).toBeDefined();
        expect(card.textContent).toContain('Test Content');

        // Variant-specific class checks
        if (variant === 'glass') {
          expect(card.className).toContain('glass-card');
        }
      });
    });

    it('should default to "default" variant when not specified', () => {
      const { container } = render(<Card>Default</Card>);
      expect(container.firstChild).toBeDefined();
    });
  });

  describe('Padding Variants', () => {
    const paddings: CardPadding[] = ['none', 'sm', 'md', 'lg', 'xl'];

    paddings.forEach((padding) => {
      it(`should render with ${padding} padding`, () => {
        render(
          <Card padding={padding} data-testid={`card-padding-${padding}`}>
            Content
          </Card>,
        );

        const card = screen.getByTestId(`card-padding-${padding}`);
        expect(card).toBeDefined();

        // Check for padding class
        const paddingMap: Record<CardPadding, string> = {
          none: '0',
          sm: '4',
          md: '6',
          lg: '8',
          xl: '10',
        };

        const expectedPaddingValue = paddingMap[padding];

        expect(card.className).toContain(`p-${expectedPaddingValue}`);
      });
    });
  });

  describe('Interactive Props', () => {
    it('should apply hover effects when hover prop is true', () => {
      render(
        <Card hover={true} data-testid='hoverable-card'>
          Hover Me
        </Card>,
      );

      const card = screen.getByTestId('hoverable-card');
      expect(card.className).toContain('hover:transform');
      expect(card.className).toContain('hover:-translate-y-1');
    });

    it('should apply selected state', () => {
      render(
        <Card selected={true} data-testid='selected-card'>
          Selected
        </Card>,
      );

      const card = screen.getByTestId('selected-card');
      expect(card.className).toContain('ring-2');
    });

    it('should handle click events', async () => {
      const user = userEvent.setup();
      let clicked = false;
      const handleClick = () => {
        clicked = true;
      };

      render(
        <Card onClick={handleClick} data-testid='clickable-card'>
          Click Me
        </Card>,
      );

      const card = screen.getByTestId('clickable-card');
      await user.click(card);

      expect(clicked).toBe(true);
    });

    it('should be keyboard accessible when clickable', async () => {
      const user = userEvent.setup();
      let clicked = false;
      const handleClick = () => {
        clicked = true;
      };

      render(
        <Card onClick={handleClick} data-testid='keyboard-card'>
          Keyboard Accessible
        </Card>,
      );

      const card = screen.getByTestId('keyboard-card');
      card.focus();

      // Press Enter
      await user.keyboard('{Enter}');
      expect(clicked).toBe(true);

      // Reset and test Space
      clicked = false;
      await user.keyboard(' ');
      expect(clicked).toBe(true);
    });
  });

  describe('Compound Components', () => {
    it('should render with Header, Body, and Footer slots', () => {
      render(
        <Card data-testid='compound-card'>
          <Card.Header>Header Content</Card.Header>
          <Card.Body>Body Content</Card.Body>
          <Card.Footer>Footer Content</Card.Footer>
        </Card>,
      );

      expect(screen.getByText('Header Content')).toBeDefined();
      expect(screen.getByText('Body Content')).toBeDefined();
      expect(screen.getByText('Footer Content')).toBeDefined();
    });

    it('should render Header with title and subtitle', () => {
      render(
        <Card>
          <Card.Header title='Test Title' subtitle='Test Subtitle' />
        </Card>,
      );

      expect(screen.getByText('Test Title')).toBeDefined();
      expect(screen.getByText('Test Subtitle')).toBeDefined();
    });

    it('should render Header with action element', () => {
      render(
        <Card>
          <Card.Header title='Title' action={<button>Action</button>} />
        </Card>,
      );

      expect(screen.getByText('Action')).toBeDefined();
    });

    it('should auto-push Footer to bottom', () => {
      render(
        <Card>
          <Card.Body>Short content</Card.Body>
          <Card.Footer>Footer at bottom</Card.Footer>
        </Card>,
      );

      const footer = screen.getByText('Footer at bottom');
      // Prefer asserting the footer element or its closest card-footer wrapper
      const footerWrapper = footer.closest('.card-footer') || footer.parentElement;
      expect(footerWrapper?.className).toContain('mt-auto');
    });
  });

  describe('Background Image', () => {
    it('should render with background image', () => {
      render(
        <Card backgroundImage='/test-image.jpg' data-testid='bg-card'>
          Content
        </Card>,
      );

      const card = screen.getByTestId('bg-card');
      expect(card.style.backgroundImage).toContain('/test-image.jpg');
    });

    it('should render overlay when specified', () => {
      const { container } = render(
        <Card backgroundImage='/test.jpg' overlay={true}>
          Content
        </Card>,
      );

      // Look for overlay div
      const overlay = container.querySelector('.bg-linear-to-b');
      expect(overlay).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    it('should support ARIA labels', () => {
      render(
        <Card aria-label='Test Card Label' data-testid='aria-card'>
          Content
        </Card>,
      );

      const card = screen.getByTestId('aria-card');
      expect(card.getAttribute('aria-label')).toBe('Test Card Label');
    });

    it('should support aria-labelledby', () => {
      render(
        <>
          <h2 id='card-title'>Card Title</h2>
          <Card aria-labelledby='card-title' data-testid='labelled-card'>
            Content
          </Card>
        </>,
      );

      const card = screen.getByTestId('labelled-card');
      expect(card.getAttribute('aria-labelledby')).toBe('card-title');
    });

    it('should have role="button" when clickable', () => {
      render(
        <Card onClick={() => {}} data-testid='button-card'>
          Click Me
        </Card>,
      );

      const card = screen.getByTestId('button-card');
      expect(card.getAttribute('role')).toBe('button');
    });

    it('should have tabIndex=0 when clickable', () => {
      render(
        <Card onClick={() => {}} data-testid='focusable-card'>
          Focus Me
        </Card>,
      );

      const card = screen.getByTestId('focusable-card');
      expect(card.getAttribute('tabIndex')).toBe('0');
    });
  });

  describe('Variant Combinations', () => {
    it('should combine variant + padding + hover', () => {
      render(
        <Card variant='elevated' padding='lg' hover={true} data-testid='combo-card'>
          Combined Props
        </Card>,
      );

      const card = screen.getByTestId('combo-card');

      // Should have elevated styling
      expect(card.className).toContain('shadow-lg');

      // Should have large padding
      expect(card.className).toContain('p-8');

      // Should have hover effects
      expect(card.className).toContain('hover:transform');
    });

    it('should combine glass variant with background image and overlay', () => {
      render(
        <Card
          variant='glass'
          backgroundImage='/hero.jpg'
          overlay={true}
          data-testid='glass-bg-card'
        >
          Glass with Background
        </Card>,
      );

      const card = screen.getByTestId('glass-bg-card');
      expect(card.className).toContain('glass-card');
      expect(card.style.backgroundImage).toContain('/hero.jpg');
    });
  });

  describe('Custom Styling', () => {
    it('should accept custom className', () => {
      render(
        <Card className='custom-class' data-testid='custom-card'>
          Custom
        </Card>,
      );

      const card = screen.getByTestId('custom-card');
      expect(card.className).toContain('custom-class');
    });

    it('should accept custom styles', () => {
      render(
        <Card style={{ border: '2px solid red' }} data-testid='styled-card'>
          Styled
        </Card>,
      );

      const card = screen.getByTestId('styled-card');
      expect(card.style.border).toBe('2px solid red');
    });
  });

  describe('Backward Compatibility', () => {
    it('should work with legacy molecule Card import pattern', () => {
      // This test ensures the API hasn't changed
      const legacyUsage = (
        <Card variant='default' padding='md'>
          <Card.Header title='Legacy' />
          <Card.Body>Content</Card.Body>
          <Card.Footer>Footer</Card.Footer>
        </Card>
      );

      const { container } = render(legacyUsage);
      expect(container.textContent).toContain('Legacy');
      expect(container.textContent).toContain('Content');
      expect(container.textContent).toContain('Footer');
    });
  });
});
