import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LanguageToggle } from '@/components/molecules/LanguageToggle';

describe('LanguageToggle Component', () => {
  it('renders language toggle buttons', () => {
    render(<LanguageToggle />);
    const deButton = screen.getByText('DE');
    const enButton = screen.getByText('EN');
    expect(deButton).toBeDefined();
    expect(enButton).toBeDefined();
  });
});
