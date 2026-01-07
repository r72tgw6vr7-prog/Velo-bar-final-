import React from 'react';
import { useTheme } from '@/contexts/ThemeContext.tsx';
import { Button } from './Button/index.ts';
import { cn } from '@/utils/classname.ts';

export type ThemeToggleProps = {
  className?: string;
  showBrandSelect?: boolean;
};

const brandLabels: Record<'default' | 'emerald' | 'royal', string> = {
  default: 'Default',
  emerald: 'Emerald',
  royal: 'Royal',
};

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className, showBrandSelect = true }) => {
  const { theme, brand, toggleTheme, setBrand } = useTheme();

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <Button variant='secondary' size='sm' onClick={toggleTheme} aria-label='Toggle color mode'>
        Theme: {theme}
      </Button>
      {showBrandSelect && (
        <label className='flex items-center gap-2 text-sm'>
          <span className='text-(--color-text-on-dark-secondary)'>Brand</span>
          <select
            className='rounded-md border border-(--color-border-on-dark)/60 bg-(--color-bg-surface) px-2 py-1 text-(--color-text-on-dark)'
            value={brand}
            onChange={(e) => setBrand(e.target.value as keyof typeof brandLabels)}
          >
            {Object.entries(brandLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
      )}
    </div>
  );
};

export default ThemeToggle;
