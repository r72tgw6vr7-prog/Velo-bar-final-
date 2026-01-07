import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Card, { CardHeader, CardContent, CardFooter } from '@/components/molecules/Card/Card.tsx';

describe('Card Component', () => {
  describe('Rendering', () => {
    it('renders card with children', () => {
      render(<Card>Test Content</Card>);
      expect(screen.getByText('Test Content')).toBeDefined();
    });

    it('renders with custom className', () => {
      render(<Card className='custom-card'>Content</Card>);
      const card = screen.getByText('Content').closest('.card');
      expect(card?.className).toContain('custom-card');
    });

    it('forwards data attributes', () => {
      render(<Card data-testid='test-card'>Content</Card>);
      expect(screen.getByTestId('test-card')).toBeDefined();
    });
  });

  describe('Variants', () => {
    it('renders default variant', () => {
      const { container } = render(<Card>Default</Card>);
      const card = container.querySelector('.card');
      expect(card).toBeDefined();
    });

    it('renders elevated variant with shadow', () => {
      const { container } = render(<Card variant='elevated'>Elevated</Card>);
      const card = container.querySelector('.card') as HTMLElement;
      expect(card.style.boxShadow).toBeTruthy();
    });

    it('renders bordered variant', () => {
      const { container } = render(<Card variant='bordered'>Bordered</Card>);
      const card = container.querySelector('.card') as HTMLElement;
      expect(card.style.border).toContain('1px solid');
    });

    it('renders glass variant with backdrop filter', () => {
      const { container } = render(<Card variant='glass'>Glass</Card>);
      const card = container.querySelector('.card') as HTMLElement;
      expect(card.style.backdropFilter).toContain('blur');
    });
  });

  describe('Padding', () => {
    it('applies no padding', () => {
      const { container } = render(<Card padding='none'>Content</Card>);
      const card = container.querySelector('.card') as HTMLElement;
      expect(card.style.padding).toBe('0px');
    });

    it('applies small padding', () => {
      const { container } = render(<Card padding='sm'>Content</Card>);
      const card = container.querySelector('.card') as HTMLElement;
      expect(card.style.padding).toBe('12px');
    });

    it('applies medium padding by default', () => {
      const { container } = render(<Card>Content</Card>);
      const card = container.querySelector('.card') as HTMLElement;
      expect(card.style.padding).toBe('16px');
    });

    it('applies large padding', () => {
      const { container } = render(<Card padding='lg'>Content</Card>);
      const card = container.querySelector('.card') as HTMLElement;
      expect(card.style.padding).toBe('24px');
    });

    it('applies extra large padding', () => {
      const { container } = render(<Card padding='xl'>Content</Card>);
      const card = container.querySelector('.card') as HTMLElement;
      expect(card.style.padding).toBe('32px');
    });
  });

  describe('States', () => {
    it('applies hover styles when hover is true', () => {
      const { container } = render(<Card hover>Hover Card</Card>);
      const card = container.querySelector('.card') as HTMLElement;
      expect(card.style.cursor).toBe('pointer');
      expect(card.style.transform).toContain('translateY');
    });

    it('applies selected styles', () => {
      const { container } = render(<Card selected>Selected</Card>);
      const card = container.querySelector('.card') as HTMLElement;
      expect(card.style.boxShadow).toBeTruthy();
    });
  });

  describe('Background Image', () => {
    it('renders with background image', () => {
      const { container } = render(<Card backgroundImage='/test-image.jpg'>Content</Card>);
      const card = container.querySelector('.card') as HTMLElement;
      expect(card.style.backgroundImage).toContain('test-image.jpg');
    });

    it('applies background image styles', () => {
      const { container } = render(<Card backgroundImage='/test.jpg'>Content</Card>);
      const card = container.querySelector('.card') as HTMLElement;
      expect(card.style.backgroundSize).toBe('cover');
      expect(card.style.backgroundPosition).toContain('center');
    });

    it('renders overlay when specified with background image', () => {
      const { container } = render(
        <Card backgroundImage='/test.jpg' overlay>
          Content
        </Card>,
      );
      const overlay = container.querySelector('div[style*="position: absolute"]');
      expect(overlay).toBeDefined();
    });

    it('does not render overlay without background image', () => {
      const { container } = render(<Card overlay>Content</Card>);
      const overlay = container.querySelector('div[style*="position: absolute"]');
      expect(overlay).toBeNull();
    });
  });

  describe('Custom Styles', () => {
    it('merges custom styles with default styles', () => {
      const { container } = render(<Card style={{ color: 'red', fontSize: '20px' }}>Content</Card>);
      const card = container.querySelector('.card') as HTMLElement;
      expect(card.style.color).toBe('red');
      expect(card.style.fontSize).toBe('20px');
    });
  });
});

describe('CardHeader Component', () => {
  it('renders title', () => {
    render(<CardHeader title='Test Title' />);
    expect(screen.getByText('Test Title')).toBeDefined();
  });

  it('renders subtitle', () => {
    render(<CardHeader title='Title' subtitle='Subtitle' />);
    expect(screen.getByText('Subtitle')).toBeDefined();
  });

  it('renders action element', () => {
    render(<CardHeader title='Title' action={<button>Action</button>} />);
    expect(screen.getByRole('button', { name: 'Action' })).toBeDefined();
  });

  it('renders without title or subtitle', () => {
    const { container } = render(<CardHeader />);
    expect(container.querySelector('.card-header')).toBeDefined();
  });

  it('applies custom className', () => {
    render(<CardHeader title='Title' className='custom-header' />);
    const header = screen.getByText('Title').closest('.card-header');
    expect(header?.className).toContain('custom-header');
  });
});

describe('CardContent Component', () => {
  it('renders children', () => {
    render(<CardContent>Test Content</CardContent>);
    expect(screen.getByText('Test Content')).toBeDefined();
  });

  it('applies custom className', () => {
    render(<CardContent className='custom-content'>Content</CardContent>);
    const content = screen.getByText('Content');
    expect(content.className).toContain('custom-content');
  });
});

describe('CardFooter Component', () => {
  it('renders children', () => {
    render(<CardFooter>Footer Content</CardFooter>);
    expect(screen.getByText('Footer Content')).toBeDefined();
  });

  it('applies custom className', () => {
    render(<CardFooter className='custom-footer'>Footer</CardFooter>);
    const footer = screen.getByText('Footer');
    expect(footer.className).toContain('custom-footer');
  });

  it('has border-top styling', () => {
    render(<CardFooter>Footer</CardFooter>);
    const footer = screen.getByText('Footer');
    expect(footer.className).toContain('border-t');
  });
});

describe('Card Composition', () => {
  it('renders full card with all subcomponents', () => {
    render(
      <Card data-testid='composed-card'>
        <CardHeader title='Card Title' subtitle='Card Subtitle' action={<button>Edit</button>} />
        <CardContent>Main content goes here</CardContent>
        <CardFooter>Footer content</CardFooter>
      </Card>,
    );

    expect(screen.getByTestId('composed-card')).toBeDefined();
    expect(screen.getByText('Card Title')).toBeDefined();
    expect(screen.getByText('Card Subtitle')).toBeDefined();
    expect(screen.getByText('Main content goes here')).toBeDefined();
    expect(screen.getByText('Footer content')).toBeDefined();
    expect(screen.getByRole('button', { name: 'Edit' })).toBeDefined();
  });
});
