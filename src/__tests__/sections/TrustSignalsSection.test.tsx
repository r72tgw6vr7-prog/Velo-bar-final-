/**
 * TrustSignalsSection Component Tests
 * ====================================
 * Tests for the trust signals section displaying partners, reviews, and badges
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import TrustSignalsSection from '@/sections/TrustSignalsSection.tsx';

const mockPartners = [
  { logo: '/logos/partner1.svg', name: 'Partner 1', description: 'Premium Partner' },
  { logo: '/logos/partner2.svg', name: 'Partner 2' },
];

const mockReviews = [
  {
    rating: 5,
    content: 'Hervorragender Service und fantastische Cocktails!',
    author: 'Maria S.',
    source: 'Google',
  },
  {
    rating: 5,
    content: 'Das beste Catering für unsere Firmenfeier.',
    author: 'Thomas K.',
    source: 'Trustpilot',
  },
];

const mockBadges = [
  { iconUrl: '/icons/certified.svg', text: 'Zertifiziert' },
  { iconUrl: '/icons/quality.svg', text: 'Premium Qualität' },
];

describe('TrustSignalsSection', () => {
  const defaultProps = {
    title: 'Unsere Partner',
    subtitle: 'Vertrauensvolle Zusammenarbeit',
    partners: mockPartners,
    reviews: mockReviews,
    badges: mockBadges,
  };

  describe('Rendering', () => {
    it('renders title and subtitle', () => {
      render(<TrustSignalsSection {...defaultProps} />);

      expect(screen.getByText('Unsere Partner')).toBeDefined();
      expect(screen.getByText('Vertrauensvolle Zusammenarbeit')).toBeDefined();
    });

    it('renders partner logos', () => {
      render(<TrustSignalsSection {...defaultProps} />);

      const partnerImages = screen.getAllByRole('img');
      expect(partnerImages.length).toBeGreaterThanOrEqual(2);
    });

    it('renders partner descriptions when provided', () => {
      render(<TrustSignalsSection {...defaultProps} />);

      expect(screen.getByText('Premium Partner')).toBeDefined();
    });

    it('renders reviews section header', () => {
      render(<TrustSignalsSection {...defaultProps} />);

      expect(screen.getByText('Was Kunden sagen')).toBeDefined();
    });

    it('renders review content', () => {
      render(<TrustSignalsSection {...defaultProps} />);

      expect(screen.getByText(/Hervorragender Service/)).toBeDefined();
      expect(screen.getByText(/beste Catering/)).toBeDefined();
    });

    it('renders review authors', () => {
      render(<TrustSignalsSection {...defaultProps} />);

      // Authors are rendered with "— " prefix in ReviewCard
      expect(screen.getByText(/Maria S\./)).toBeDefined();
      expect(screen.getByText(/Thomas K\./)).toBeDefined();
    });

    it('renders badges', () => {
      render(<TrustSignalsSection {...defaultProps} />);

      expect(screen.getByText('Zertifiziert')).toBeDefined();
      expect(screen.getByText('Premium Qualität')).toBeDefined();
    });

    it('renders pagination dots', () => {
      const { container } = render(<TrustSignalsSection {...defaultProps} />);

      const dots = container.querySelectorAll('.rounded');
      expect(dots.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe('Styling', () => {
    it('applies custom className', () => {
      const { container } = render(
        <TrustSignalsSection {...defaultProps} className='custom-trust-class' />,
      );

      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper.className).toContain('custom-trust-class');
    });
  });
});
