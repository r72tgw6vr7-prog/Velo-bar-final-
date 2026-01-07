import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../components/atoms/Button/Button.tsx';

describe('Button Component', () => {
  describe('Rendering', () => {
    it('renders button with correct text', () => {
      render(<Button>Click Me</Button>);
      const buttonElement = screen.getByRole('button', { name: /click me/i });
      expect(buttonElement).toBeDefined();
      expect(buttonElement.textContent).toContain('Click Me');
    });

    it('renders with default variant and size', () => {
      render(<Button>Default Button</Button>);
      const button = screen.getByRole('button');
      expect(button.className).toContain('border-white/20');
      expect(button.style.height).toBe('var(--button-height-md)');
      expect(button.style.padding).toBe('var(--button-padding-md)');
      expect(button.style.borderRadius).toBe('var(--button-radius-secondary)');
    });
  });

  describe('Variants', () => {
    it('renders default variant (outlined)', () => {
      render(<Button variant='default'>Default</Button>);
      const button = screen.getByRole('button');
      expect(button.className).toContain('border-white/20');
      expect(button.className).toContain('bg-transparent');
    });

    it('renders primary variant', () => {
      render(<Button variant='primary'>Primary</Button>);
      const button = screen.getByRole('button');
      expect(button.className).toContain('bg-accent-primary');
      expect(button.style.borderRadius).toBe('var(--button-radius-primary)');
    });

    it('renders secondary variant', () => {
      render(<Button variant='secondary'>Secondary</Button>);
      const button = screen.getByRole('button');
      expect(button.className).toContain('border-white/30');
    });

    it('renders ghost variant', () => {
      render(<Button variant='ghost'>Ghost</Button>);
      const button = screen.getByRole('button');
      expect(button.className).toContain('bg-transparent');
    });

    it('renders tertiary variant', () => {
      render(<Button variant='tertiary'>Tertiary</Button>);
      const button = screen.getByRole('button');
      expect(button.className).toContain('text-white/80');
    });
  });

  describe('Sizes', () => {
    it('renders small size', () => {
      render(<Button size='sm'>Small</Button>);
      const button = screen.getByRole('button');
      expect(button.style.height).toBe('var(--button-height-sm)');
      expect(button.style.padding).toBe('var(--button-padding-sm)');
      expect(button.style.fontSize).toBe('14px');
    });

    it('renders medium size', () => {
      render(<Button size='md'>Medium</Button>);
      const button = screen.getByRole('button');
      expect(button.style.height).toBe('var(--button-height-md)');
      expect(button.style.padding).toBe('var(--button-padding-md)');
      expect(button.style.fontSize).toBe('var(--button-font-size)');
    });

    it('renders large size', () => {
      render(<Button size='lg'>Large</Button>);
      const button = screen.getByRole('button');
      expect(button.style.height).toBe('var(--button-height-lg)');
      expect(button.style.padding).toBe('var(--button-padding-lg)');
      expect(button.style.fontSize).toBe('18px');
    });

    it('renders icon size', () => {
      render(<Button size='icon'>X</Button>);
      const button = screen.getByRole('button');
      expect(button.style.height).toBe('var(--button-height-sm)');
      expect(button.style.width).toBe('var(--button-height-sm)');
      expect(button.style.padding).toBe('0px');
    });
  });

  describe('States', () => {
    it('disables button when disabled prop is true', () => {
      render(<Button disabled>Disabled</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(button.className).toContain('disabled:opacity-50');
    });
  });

  describe('Interactions', () => {
    it('calls onClick handler when clicked', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      render(<Button onClick={handleClick}>Click Me</Button>);
      const button = screen.getByRole('button');

      await user.click(button);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick when disabled', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      render(
        <Button onClick={handleClick} disabled>
          Disabled
        </Button>,
      );
      const button = screen.getByRole('button');

      await user.click(button);
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('HTML Attributes', () => {
    it('sets type="button" by default', () => {
      render(<Button>Default Type</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'button');
    });

    it('respects custom type attribute', () => {
      render(<Button type='submit'>Submit</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'submit');
    });

    it('forwards custom className', () => {
      render(<Button className='custom-class'>Custom</Button>);
      const button = screen.getByRole('button');
      expect(button.className).toContain('custom-class');
    });

    it('forwards data attributes', () => {
      render(<Button data-testid='custom-button'>Custom</Button>);
      expect(screen.getByTestId('custom-button')).toBeDefined();
    });
  });

  describe('Accessibility', () => {
    it('maintains focus ring styles', () => {
      render(<Button>Focus Test</Button>);
      const button = screen.getByRole('button');
      expect(button.className).toContain('focus-visible:outline-none');
      expect(button.className).toContain('focus-visible:ring-2');
    });
  });
});
