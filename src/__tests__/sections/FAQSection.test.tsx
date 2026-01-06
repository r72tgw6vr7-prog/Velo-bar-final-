/**
 * FAQSection Component Tests
 * ==========================
 * Tests for the FAQ section used on Velo Bar pages
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FAQSection } from '@/sections/FAQSection';

const mockFAQItems = [
  {
    id: 'faq-1',
    question: 'Wie lange im Voraus sollte ich buchen?',
    answer: 'Wir empfehlen eine Buchung mindestens 4-6 Wochen im Voraus.',
  },
  {
    id: 'faq-2',
    question: 'Welche Getränke bieten Sie an?',
    answer: 'Wir bieten eine breite Auswahl an Cocktails, Weinen und alkoholfreien Getränken.',
  },
  {
    id: 'faq-3',
    question: 'Können Sie auch vegetarische Optionen anbieten?',
    answer: 'Ja, wir bieten umfangreiche vegetarische und vegane Menüoptionen.',
  },
];

describe('FAQSection', () => {
  describe('Rendering', () => {
    it('renders FAQ items correctly', () => {
      render(<FAQSection items={mockFAQItems} />);

      // Check all questions are rendered
      expect(screen.getByText('Wie lange im Voraus sollte ich buchen?')).toBeDefined();
      expect(screen.getByText('Welche Getränke bieten Sie an?')).toBeDefined();
      expect(screen.getByText('Können Sie auch vegetarische Optionen anbieten?')).toBeDefined();
    });

    it('renders FAQ answers correctly', () => {
      render(<FAQSection items={mockFAQItems} />);

      expect(screen.getByText(/Wir empfehlen eine Buchung mindestens 4-6 Wochen/)).toBeDefined();
      expect(screen.getByText(/breite Auswahl an Cocktails/)).toBeDefined();
    });

    it('renders header when showHeader is true', () => {
      render(<FAQSection items={mockFAQItems} showHeader={true} />);

      expect(screen.getByText('Häufig gestellte Fragen')).toBeDefined();
    });

    it('does not render header when showHeader is false', () => {
      render(<FAQSection items={mockFAQItems} showHeader={false} />);

      expect(screen.queryByText('Häufig gestellte Fragen')).toBeNull();
    });

    it('renders custom title when provided', () => {
      render(
        <FAQSection
          items={mockFAQItems}
          showHeader={true}
          title='Ihre Fragen - Unsere Antworten'
        />,
      );

      expect(screen.getByText('Ihre Fragen - Unsere Antworten')).toBeDefined();
    });

    it('renders custom subtitle when provided', () => {
      render(
        <FAQSection
          items={mockFAQItems}
          showHeader={true}
          subtitle='Hier finden Sie Antworten auf die häufigsten Fragen.'
        />,
      );

      expect(
        screen.getByText('Hier finden Sie Antworten auf die häufigsten Fragen.'),
      ).toBeDefined();
    });
  });

  describe('Accessibility', () => {
    it('has proper list role for FAQ items', () => {
      render(<FAQSection items={mockFAQItems} />);

      const list = screen.getByRole('list', { name: 'FAQ items' });
      expect(list).toBeDefined();
    });

    it('renders FAQ items as list items', () => {
      render(<FAQSection items={mockFAQItems} />);

      const listItems = screen.getAllByRole('listitem');
      expect(listItems.length).toBe(3);
    });

    it('has proper heading structure when header is shown', () => {
      render(<FAQSection items={mockFAQItems} showHeader={true} />);

      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toBeDefined();
    });

    it('has aria-labelledby when header is shown', () => {
      const { container } = render(<FAQSection items={mockFAQItems} showHeader={true} />);

      const section = container.querySelector('section');
      expect(section?.getAttribute('aria-labelledby')).toBe('faq-heading');
    });
  });

  describe('Email Link', () => {
    it('renders default email link in subtitle', () => {
      render(<FAQSection items={mockFAQItems} showHeader={true} />);

      const emailLink = screen.getByRole('link', { name: 'E-Mail' });
      expect(emailLink.getAttribute('href')).toBe('mailto:hallo@velo-bar.com');
    });

    it('renders custom email link when provided', () => {
      render(
        <FAQSection items={mockFAQItems} showHeader={true} emailLink='mailto:info@velo-bar.com' />,
      );

      const emailLink = screen.getByRole('link', { name: 'E-Mail' });
      expect(emailLink.getAttribute('href')).toBe('mailto:info@velo-bar.com');
    });
  });

  describe('Styling', () => {
    it('applies custom className', () => {
      const { container } = render(
        <FAQSection items={mockFAQItems} className='custom-faq-class' />,
      );

      const section = container.querySelector('section');
      expect(section?.className).toContain('custom-faq-class');
    });
  });
});
