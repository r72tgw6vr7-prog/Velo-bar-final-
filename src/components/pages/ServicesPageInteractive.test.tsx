import React from 'react';
import Section from '../ui/Section';
import PageHeader from '../ui/PageHeader';

const ServicesPageInteractiveTest: React.FC = () => {
  return (
    <Section bg='none' className='relative z-10'>
      <div className='mx-auto flex w-full max-w-[1104px] flex-col gap-16'>
        <PageHeader eyebrow='Test' title='Test' subtitle='Test' alignment='center' maxWidth='md' />
        <div>Content</div>
      </div>
    </Section>
  );
};

export default ServicesPageInteractiveTest;

import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

describe('ServicesPageInteractiveTest (smoke)', () => {
  it('renders without crashing', () => {
    render(<ServicesPageInteractiveTest />);
    expect(true).toBe(true);
  });
});
