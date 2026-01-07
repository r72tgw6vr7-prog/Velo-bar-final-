import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { ServicesPageInteractive } from '../ServicesPageInteractive.ts';
import { servicesContent } from '../../../content/services.ts';
/* eslint-disable no-console */

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => {
  const React = require('react');

  return {
    motion: {
      div: (props: any) => React.createElement('div', props),
      button: (props: any) => React.createElement('button', props),
      article: (props: any) => React.createElement('article', props),
    },
    AnimatePresence: ({ children }: any) => children,
    useInView: () => true, // Mock useInView to always return true
  };
});

// Mock the foundation components
vi.mock('../../../../foundation/VeloBarUtilityComponents', () => {
  const React = require('react');
  return {
    ResponsiveContainer: ({ children }) =>
      React.createElement('div', { 'data-testid': 'responsive-container' }, children),
    Grid: ({ children }) => React.createElement('div', { 'data-testid': 'grid' }, children),
    GridItem: ({ children }) =>
      React.createElement('div', { 'data-testid': 'grid-item' }, children),
    Typography: ({ children, variant, className }) =>
      React.createElement(
        'span',
        { 'data-testid': `typography-${variant || 'default'}`, className },
        children,
      ),
    Button: ({ children, onClick, className }) =>
      React.createElement(
        'button',
        { onClick, className, 'data-testid': 'velobar-button' },
        children,
      ),
  };
});

// Mock console.log to capture booking calls
const mockConsoleLog = vi.fn();
const originalConsoleLog = console.log;
beforeEach(() => {
  console.log = mockConsoleLog;
});
afterEach(() => {
  console.log = originalConsoleLog;
});

// Test wrapper (using mocked AppProvider)
const TestWrapper = ({ children }) => React.createElement('div', null, children);

describe('ServicesPageInteractive', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    mockConsoleLog.mockClear();
  });

  test('renders hero with provided title and subtitle', () => {
    render(
      React.createElement(
        TestWrapper,
        null,
        React.createElement(ServicesPageInteractive, {
          heroTitle: servicesContent.hero.title,
          heroSubtitle: servicesContent.hero.subtitle,
        }),
      ),
    );

    expect(screen.getByText(servicesContent.hero.title)).toBeInTheDocument();
    if (servicesContent.hero.subtitle) {
      expect(screen.getByText(servicesContent.hero.subtitle)).toBeInTheDocument();
    }
  });

  test('renders category tabs for all service categories', () => {
    render(
      React.createElement(TestWrapper, null, React.createElement(ServicesPageInteractive, null)),
    );

    servicesContent.categories.forEach((category) => {
      const tab = screen.getByRole('tab', {
        name: new RegExp(category.title, 'i'),
      });
      expect(tab).toBeInTheDocument();
    });
  });

  test('shows services for the initial active category', () => {
    render(
      React.createElement(TestWrapper, null, React.createElement(ServicesPageInteractive, null)),
    );

    const defaultCategory = servicesContent.categories[0];
    const defaultServices = servicesContent.services.filter(
      (service) => service.categoryId === defaultCategory.id,
    );

    defaultServices.forEach((service) => {
      expect(screen.getByText(service.title)).toBeInTheDocument();
    });
  });

  test('switches services when a different category tab is clicked', async () => {
    render(
      React.createElement(TestWrapper, null, React.createElement(ServicesPageInteractive, null)),
    );

    const targetCategory = servicesContent.categories[1];
    const tab = screen.getByRole('tab', {
      name: new RegExp(targetCategory.title, 'i'),
    });

    fireEvent.click(tab);

    const targetServices = servicesContent.services.filter(
      (service) => service.categoryId === targetCategory.id,
    );

    await waitFor(() => {
      expect(screen.getByText(targetServices[0].title)).toBeInTheDocument();
    });
  });

  test('booking CTA triggers booking flow with correct service id', async () => {
    render(
      React.createElement(TestWrapper, null, React.createElement(ServicesPageInteractive, null)),
    );

    const defaultCategory = servicesContent.categories[0];
    const defaultServices = servicesContent.services.filter(
      (service) => service.categoryId === defaultCategory.id,
    );
    const firstService = defaultServices[0];

    const ctaButton = screen.getByRole('button', {
      name: new RegExp(`${firstService.cta} für ${firstService.title}`, 'i'),
    });

    fireEvent.click(ctaButton);

    await waitFor(() => {
      expect(mockConsoleLog).toHaveBeenCalledWith('Booking service:', firstService.id);
    });
  });

  test('applies custom className to the root section', () => {
    const customClass = 'my-custom-class';
    render(
      React.createElement(
        TestWrapper,
        null,
        React.createElement(ServicesPageInteractive, { className: customClass }),
      ),
    );

    const section = document.querySelector('section');
    expect(section).toHaveClass(customClass);
  });

  test('has proper accessibility attributes for tabs and panel', () => {
    render(
      React.createElement(TestWrapper, null, React.createElement(ServicesPageInteractive, null)),
    );

    const tabs = screen.getAllByRole('tab');
    tabs.forEach((tab) => {
      expect(tab).toHaveAttribute('aria-selected');
      expect(tab).toHaveAttribute('aria-controls');
      expect(tab).toHaveAttribute('aria-label');
    });

    const panel = screen.getByRole('tabpanel');
    expect(panel).toHaveAttribute('aria-live', 'polite');
    expect(panel).toHaveAttribute('aria-labelledby');
  });
});
