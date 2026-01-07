import React from 'react';
import { Container } from '@/components/atoms/Container/Container.tsx';
import { Button } from '@/components/atoms/Button/Button.tsx';

type Swatch = {
  name: string;
  token: string;
};

type TypographySample = {
  label: string;
  className: string;
  text: string;
};

const colorSwatches: Swatch[] = [
  { name: 'Accent Primary', token: '--color-accent-primary' },
  { name: 'Accent Hover', token: '--color-accent-primary-hover' },
  { name: 'Text on Dark', token: '--color-text-on-dark' },
  { name: 'Text on Dark Secondary', token: '--color-text-on-dark-secondary' },
  { name: 'Border on Dark', token: '--color-border-on-dark' },
  { name: 'BG Page', token: '--color-bg-page' },
  { name: 'BG Surface', token: '--color-bg-surface' },
];

const typographySamples: TypographySample[] = [
  { label: 'Heading H1', className: 'text-4xl font-bold', text: 'Velo.Bar Heading H1' },
  { label: 'Heading H2', className: 'text-3xl font-semibold', text: 'Velo.Bar Heading H2' },
  { label: 'Body', className: 'text-base', text: 'Body text using design tokens for color.' },
  {
    label: 'Secondary',
    className: 'text-base text-(--color-text-on-dark-secondary)',
    text: 'Secondary text on dark.',
  },
];

const buttonVariants = [
  { label: 'Primary', props: { variant: 'primary' as const } },
  { label: 'Secondary', props: { variant: 'secondary' as const } },
  { label: 'Outline', props: { variant: 'outline' as const } },
  { label: 'Ghost', props: { variant: 'ghost' as const } },
];

const transitionDemos = [
  {
    label: 'Scale',
    className:
      'transition-transform duration-200 ease-[var(--transition-easing-smooth)] hover:scale-105',
  },
  {
    label: 'Shadow Glow',
    className:
      'transition-shadow duration-300 ease-[var(--transition-easing-smooth)] hover:shadow-[0_0_20px_rgba(var(--orange-rgb),0.3)]',
  },
  {
    label: 'Opacity',
    className:
      'transition-opacity duration-200 ease-[var(--transition-easing-smooth)] hover:opacity-80',
  },
];

const TokenVerificationPage: React.FC = () => {
  return (
    <div className='min-h-screen bg-(--color-bg-page) py-16 text-(--color-text-on-dark)'>
      <Container size='default' className='space-y-12'>
        <header className='space-y-2'>
          <p className='text-xs tracking-[0.25em] text-(--color-text-on-dark-secondary) uppercase'>
            Dev-only
          </p>
          <h1 className='text-accent-primary text-4xl font-bold'>Token Verification</h1>
          <p className='text-(--color-text-on-dark-secondary)'>
            Swatches, typography, buttons, focus rings, and transition smoke tests to catch drift
            quickly.
          </p>
        </header>

        <section className='space-y-4'>
          <h2 className='text-2xl font-semibold'>Color Swatches</h2>
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
            {colorSwatches.map((swatch) => (
              <div
                key={swatch.token}
                className='flex h-full flex-col items-center gap-3 rounded-lg border border-(--color-border-on-dark) bg-(--color-bg-surface) p-4'
              >
                <div
                  className='h-12 w-12 rounded-lg border border-(--color-border-on-dark)'
                  style={{ backgroundColor: `var(${swatch.token})` }}
                  aria-label={`${swatch.name} swatch`}
                />
                <div>
                  <div className='font-semibold'>{swatch.name}</div>
                  <div className='text-xs text-(--color-text-on-dark-secondary)'>
                    {swatch.token}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className='space-y-4'>
          <h2 className='text-2xl font-semibold'>Typography</h2>
          <div className='space-y-3 rounded-lg border border-(--color-border-on-dark) bg-(--color-bg-surface) p-6'>
            {typographySamples.map((sample) => (
              <div key={sample.label}>
                <div className='mb-1 text-xs tracking-wide text-(--color-text-on-dark-secondary) uppercase'>
                  {sample.label}
                </div>
                <div className={sample.className}>{sample.text}</div>
              </div>
            ))}
          </div>
        </section>

        <section className='space-y-4'>
          <h2 className='text-2xl font-semibold'>Buttons</h2>
          <div className='flex flex-wrap gap-3'>
            {buttonVariants.map(({ label, props }) => (
              <Button key={label} {...props}>
                {label}
              </Button>
            ))}
            <Button variant='primary' fullWidth={false} iconPosition='left'>
              Focus Ring Test
            </Button>
          </div>
        </section>

        <section className='space-y-4'>
          <h2 className='text-2xl font-semibold'>Focus Rings</h2>
          <div className='flex flex-wrap gap-4'>
            <button className='rounded border border-(--color-border-on-dark) bg-(--color-bg-surface) px-4 py-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--brand-primary)'>
              Native Button Focus
            </button>
            <Button
              variant='secondary'
              className='focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--brand-primary)'
            >
              Button Focus
            </Button>
            <input
              type='text'
              placeholder='Focus ring input'
              className='rounded border border-(--color-border-on-dark) bg-(--color-bg-surface) px-4 py-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--brand-primary)'
            />
          </div>
        </section>

        <section className='space-y-4'>
          <h2 className='text-2xl font-semibold'>Transition Demos</h2>
          <div className='flex flex-wrap gap-4'>
            {transitionDemos.map((demo) => (
              <div
                key={demo.label}
                className={`flex h-24 w-32 items-center justify-center rounded-lg border border-(--color-border-on-dark) bg-(--color-bg-surface) text-sm ${demo.className}`}
              >
                {demo.label}
              </div>
            ))}
          </div>
        </section>
      </Container>
    </div>
  );
};

export default TokenVerificationPage;
