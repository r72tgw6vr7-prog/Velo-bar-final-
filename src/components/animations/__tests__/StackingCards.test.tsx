import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StackingCards } from '../StackingCards.ts';
import { Users, Calendar, Star } from 'lucide-react';

describe('StackingCards', () => {
  const mockCards = [
    {
      id: 'card1',
      icon: <Users data-testid='icon-users' />,
      title: 'Test Card 1',
      description: 'Description for card 1',
    },
    {
      id: 'card2',
      icon: <Calendar data-testid='icon-calendar' />,
      title: 'Test Card 2',
      description: 'Description for card 2',
    },
    {
      id: 'card3',
      icon: <Star data-testid='icon-star' />,
      title: 'Test Card 3',
      description: 'Description for card 3',
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders all cards with correct content', () => {
    render(<StackingCards cards={mockCards} />);

    expect(screen.getByText('Test Card 1')).toBeInTheDocument();
    expect(screen.getByText('Test Card 2')).toBeInTheDocument();
    expect(screen.getByText('Test Card 3')).toBeInTheDocument();

    expect(screen.getByText('Description for card 1')).toBeInTheDocument();
    expect(screen.getByText('Description for card 2')).toBeInTheDocument();
    expect(screen.getByText('Description for card 3')).toBeInTheDocument();
  });

  it('renders icons correctly', () => {
    render(<StackingCards cards={mockCards} />);

    expect(screen.getByTestId('icon-users')).toBeInTheDocument();
    expect(screen.getByTestId('icon-calendar')).toBeInTheDocument();
    expect(screen.getByTestId('icon-star')).toBeInTheDocument();
  });

  it('applies correct z-index stacking order', () => {
    const { container } = render(<StackingCards cards={mockCards} />);
    const cards = container.querySelectorAll('.stacking-card');

    expect(cards[0]).toHaveStyle({ zIndex: '3' });
    expect(cards[1]).toHaveStyle({ zIndex: '2' });
    expect(cards[2]).toHaveStyle({ zIndex: '1' });
  });

  it('respects prefers-reduced-motion', () => {
    const matchMediaMock = vi.fn().mockImplementation((query) => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    vi.stubGlobal('matchMedia', matchMediaMock);

    render(<StackingCards cards={mockCards} />);

    expect(matchMediaMock).toHaveBeenCalledWith('(prefers-reduced-motion: reduce)');
  });

  it('renders with custom className', () => {
    const { container } = render(<StackingCards cards={mockCards} className='custom-class' />);
    const section = container.querySelector('.stacking-cards-section');

    expect(section).toHaveClass('custom-class');
  });

  it('renders correct number of cards', () => {
    const { container } = render(<StackingCards cards={mockCards} />);
    const cards = container.querySelectorAll('.stacking-card');

    expect(cards).toHaveLength(3);
  });

  it('applies mobile-first responsive classes', () => {
    const { container } = render(<StackingCards cards={mockCards} />);
    const grid = container.querySelector('.stacking-cards-grid');

    expect(grid).toHaveClass('grid');
    expect(grid).toHaveClass('grid-cols-1');
    expect(grid).toHaveClass('md:grid-cols-2');
    expect(grid).toHaveClass('lg:grid-cols-3');
  });

  it('handles empty cards array gracefully', () => {
    const { container } = render(<StackingCards cards={[]} />);
    const cards = container.querySelectorAll('.stacking-card');

    expect(cards).toHaveLength(0);
  });
});
