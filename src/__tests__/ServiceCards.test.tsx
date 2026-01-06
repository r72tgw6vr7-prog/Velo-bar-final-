import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ServiceCards } from '@/components/molecules';

describe('ServiceCards Component', () => {
  it('renders service cards section', () => {
    render(<ServiceCards />);
    const heading = screen.getByText(/Alle Services Entdecken/i);
    expect(heading).toBeDefined();
  });

  it('renders both default service cards', () => {
    render(<ServiceCards />);
    // Query by heading to avoid matching descriptive labels that include
    // the same text (e.g. "Design Systems & UI/UX"). Headings are the
    // semantically correct target for card titles.
    const webAppsHeading = screen.getByRole('heading', { name: /Web Applications/i });
    const designSystemsHeading = screen.getByRole('heading', { name: /Design Systems/i });
    expect(webAppsHeading).toBeInTheDocument();
    expect(designSystemsHeading).toBeInTheDocument();
  });
});
