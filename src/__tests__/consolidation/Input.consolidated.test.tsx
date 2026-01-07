/**
 * CONSOLIDATED INPUT COMPONENT TESTS
 * ===================================
 *
 * Tests for the consolidated Input component covering:
 * - All variant props
 * - Size variants
 * - Icon positioning
 * - Validation states
 * - Backward compatibility with FormInput and InputField
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from '../../components/atoms/index.ts';
import type { InputSize, InputVariant } from '../../types/components.ts';

describe('Input - Consolidated Component', () => {
  describe('Basic Rendering', () => {
    it('should render with required id and label', () => {
      render(<Input id='test-input' label='Test Label' />);

      expect(screen.getByLabelText('Test Label')).toBeDefined();
    });

    it('should render with placeholder', () => {
      render(<Input id='placeholder-test' placeholder='Enter text...' />);

      const input = screen.getByPlaceholderText('Enter text...');
      expect(input).toBeDefined();
    });

    it('should render with default value', () => {
      render(<Input id='default-value' defaultValue='Initial value' />);

      const input = screen.getByDisplayValue('Initial value');
      expect(input).toBeDefined();
    });
  });

  describe('Variant Rendering', () => {
    const variants: InputVariant[] = ['default', 'filled', 'outlined', 'ghost'];

    variants.forEach((variant) => {
      it(`should render ${variant} variant`, () => {
        render(
          <Input id={`input-${variant}`} variant={variant} data-testid={`input-${variant}`} />,
        );

        const input = screen.getByTestId(`input-${variant}`);
        expect(input).toBeDefined();
      });
    });
  });

  describe('Size Variants', () => {
    const sizes: InputSize[] = ['sm', 'md', 'lg'];

    sizes.forEach((size) => {
      it(`should render ${size} size`, () => {
        render(<Input id={`input-size-${size}`} size={size} data-testid={`size-${size}`} />);

        const input = screen.getByTestId(`size-${size}`);
        expect(input).toBeDefined();
      });
    });
  });

  describe('Validation States', () => {
    it('should show error state and message', () => {
      render(<Input id='error-input' label='Email' error='Invalid email format' />);

      expect(screen.getByText('Invalid email format')).toBeDefined();
    });

    it('should show helper text', () => {
      render(<Input id='helper-input' label='Username' helper='Choose a unique username' />);

      expect(screen.getByText('Choose a unique username')).toBeDefined();
    });

    it('should prioritize error over helper', () => {
      render(<Input id='priority-input' label='Test' error='Error message' helper='Helper text' />);

      expect(screen.getByText('Error message')).toBeDefined();
      expect(screen.queryByText('Helper text')).toBeNull();
    });

    it('should show required indicator', () => {
      render(<Input id='required-input' label='Required Field' required />);

      // Check for required attribute
      const input = screen.getByLabelText(/Required Field/);
      expect(input.hasAttribute('required')).toBe(true);
    });
  });

  describe('Icon Support', () => {
    const TestIcon = () => <span data-testid='test-icon'>@</span>;

    it('should render icon on the left', () => {
      render(<Input id='icon-left' label='Email' icon={<TestIcon />} iconPosition='left' />);

      expect(screen.getByTestId('test-icon')).toBeDefined();
    });

    it('should render icon on the right', () => {
      render(<Input id='icon-right' label='Search' icon={<TestIcon />} iconPosition='right' />);

      expect(screen.getByTestId('test-icon')).toBeDefined();
    });

    it('should default to left icon position', () => {
      render(<Input id='icon-default' label='Default Icon' icon={<TestIcon />} />);

      expect(screen.getByTestId('test-icon')).toBeDefined();
    });
  });

  describe('Full Width', () => {
    it('should apply full width styling', () => {
      const { container } = render(<Input id='full-width' label='Full Width' fullWidth={true} />);

      // Check for w-full class
      const inputContainer = container.querySelector('.w-full');
      expect(inputContainer).toBeTruthy();
    });

    it('should support non full-width layout when fullWidth is false', () => {
      const { container } = render(
        <Input id='not-full-width' label='Regular Width' fullWidth={false} />,
      );

      const wrapper = container.firstChild as HTMLElement | null;
      expect(wrapper).toBeTruthy();
      if (wrapper) {
        expect(wrapper.className).not.toContain('w-full');
      }
    });
  });

  describe('User Interactions', () => {
    it('should handle value changes', async () => {
      const user = userEvent.setup();

      render(<Input id='interactive' label='Type Here' />);

      const input = screen.getByLabelText('Type Here') as HTMLInputElement;
      await user.type(input, 'Hello World');

      expect(input.value).toBe('Hello World');
    });

    it('should handle onChange callback', async () => {
      const user = userEvent.setup();
      let value = '';
      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        value = e.target.value;
      };

      render(<Input id='onchange-test' label='Test' onChange={handleChange} />);

      const input = screen.getByLabelText('Test');
      await user.type(input, 'Test');

      expect(value).toBe('Test');
    });

    it('should handle focus and blur', async () => {
      const user = userEvent.setup();
      let focused = false;
      let blurred = false;

      render(
        <Input
          id='focus-test'
          label='Focus Test'
          onFocus={() => {
            focused = true;
          }}
          onBlur={() => {
            blurred = true;
          }}
        />,
      );

      const input = screen.getByLabelText('Focus Test');

      await user.click(input);
      expect(focused).toBe(true);

      await user.tab();
      expect(blurred).toBe(true);
    });
  });

  describe('Input Types', () => {
    const types = ['text', 'email', 'password', 'tel', 'number', 'url'];

    types.forEach((type) => {
      it(`should render ${type} input type`, () => {
        render(<Input id={`input-${type}`} label={`${type} input`} type={type} />);

        const input = screen.getByLabelText(`${type} input`) as HTMLInputElement;
        expect(input.type).toBe(type);
      });
    });
  });

  describe('Disabled State', () => {
    it('should render disabled input', () => {
      render(<Input id='disabled' label='Disabled' disabled />);

      const input = screen.getByLabelText('Disabled') as HTMLInputElement;
      expect(input.disabled).toBe(true);
    });

    it('should prevent input when disabled', async () => {
      const user = userEvent.setup();

      render(<Input id='disabled-input' label="Can't Type" disabled />);

      const input = screen.getByLabelText("Can't Type") as HTMLInputElement;
      await user.type(input, 'Test');

      expect(input.value).toBe('');
    });
  });

  describe('Accessibility', () => {
    it('should associate label with input', () => {
      render(<Input id='a11y-test' label='Accessible Label' />);

      const input = screen.getByLabelText('Accessible Label');
      expect(input.id).toBe('a11y-test');
    });

    it('should have aria-describedby for error messages', () => {
      render(<Input id='error-a11y' label='Field' error='Error message' />);

      const input = screen.getByLabelText('Field');
      const errorId = input.getAttribute('aria-describedby');

      expect(errorId).toBeTruthy();
      if (errorId) {
        const errorElement = document.getElementById(errorId);
        expect(errorElement?.textContent).toBe('Error message');
      }
    });

    it('should have aria-invalid when error exists', () => {
      render(<Input id='invalid-input' label='Invalid Field' error='Error' />);

      const input = screen.getByLabelText('Invalid Field');
      expect(input.getAttribute('aria-invalid')).toBe('true');
    });

    it('should have aria-required when required', () => {
      render(<Input id='required-a11y' label='Required' required />);

      // Use direct id lookup to avoid fragile label-text matching
      const input = document.getElementById('required-a11y') as HTMLInputElement;
      expect(input).toBeTruthy();
      expect(input.getAttribute('aria-required')).toBe('true');
    });
  });

  describe('Backward Compatibility', () => {
    it('should work with FormInput pattern (old API)', () => {
      // Test that the same component works with legacy naming
      render(
        <Input
          id='form-input'
          label='Legacy FormInput'
          name='fieldName'
          placeholder='Old pattern'
        />,
      );

      const input = screen.getByLabelText('Legacy FormInput');
      expect(input).toBeDefined();
      expect((input as HTMLInputElement).name).toBe('fieldName');
    });

    it('should work with InputField pattern (old API)', () => {
      render(<Input id='input-field' label='Legacy InputField' helper='Helper text pattern' />);

      const input = screen.getByLabelText('Legacy InputField');
      expect(input).toBeDefined();
      expect(screen.getByText('Helper text pattern')).toBeDefined();
    });
  });

  describe('Combined Props', () => {
    it('should combine size + variant + icon + error', () => {
      const Icon = () => <span data-testid='combo-icon'>[Search]</span>;

      render(
        <Input
          id='combo'
          label='Combined Props'
          size='lg'
          variant='outlined'
          icon={<Icon />}
          iconPosition='right'
          error='Validation error'
        />,
      );

      expect(screen.getByLabelText('Combined Props')).toBeDefined();
      expect(screen.getByTestId('combo-icon')).toBeDefined();
      expect(screen.getByText('Validation error')).toBeDefined();
    });

    it('should work with all props together', () => {
      render(
        <Input
          id='all-props'
          label='All Props Test'
          type='email'
          size='md'
          variant='filled'
          placeholder='test@example.com'
          helper='Enter your email'
          required
          fullWidth
        />,
      );

      // Use direct id lookup to avoid fragile label-text matching
      const input = document.getElementById('all-props') as HTMLInputElement;
      expect(input).toBeTruthy();
      expect(input.type).toBe('email');
      expect(input.placeholder).toBe('test@example.com');
      expect(input.required).toBe(true);
      expect(screen.getByText('Enter your email')).toBeDefined();
    });
  });
});
