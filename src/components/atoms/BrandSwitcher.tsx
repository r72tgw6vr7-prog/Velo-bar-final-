import React from 'react';
import { useTheme } from '@/contexts/ThemeContext.tsx';
import { cn } from '@/utils/classname.ts';

type Brand = 'default' | 'emerald' | 'royal';

const BRAND_META: Record<Brand, { label: string; color: string }> = {
  default: { label: 'Default', color: '#ee7868' },
  emerald: { label: 'Emerald', color: '#10b981' },
  royal: { label: 'Royal', color: '#4f46e5' },
};

export interface BrandSwitcherProps extends React.HTMLAttributes<HTMLDivElement> {
  showLabel?: boolean;
  compact?: boolean;
}

export const BrandSwitcher: React.FC<BrandSwitcherProps> = ({
  className,
  showLabel = true,
  compact = false,
  ...props
}) => {
  const { brand, setBrand } = useTheme();

  return (
    <div className={cn('flex items-center gap-3', className)} {...props}>
      {showLabel && <span className='text-xs text-(--color-text-on-dark-secondary)'>Brand</span>}
      <div role='radiogroup' aria-label='Select brand' className='flex items-center gap-2'>
        {(Object.keys(BRAND_META) as Brand[]).map((key) => {
          const meta = BRAND_META[key];
          const selected = brand === key;
          return (
            <button
              key={key}
              type='button'
              role='radio'
              aria-checked={selected ? 'true' : 'false'}
              onClick={() => setBrand(key)}
              className={cn(
                'relative inline-flex items-center justify-center rounded-full transition-transform focus-visible:ring-2 focus-visible:ring-(--color-text-on-dark) focus-visible:ring-offset-2 focus-visible:outline-none',
                selected ? 'ring-2 ring-(--color-text-on-dark)' : 'ring-0',
              )}
              title={meta.label}
              aria-label={meta.label}
              style={{
                width: compact ? 18 : 22,
                height: compact ? 18 : 22,
                backgroundColor: meta.color,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export const BrandBadge: React.FC<React.HTMLAttributes<HTMLSpanElement>> = ({
  className,
  ...props
}) => {
  const { brand } = useTheme();
  const { label, color } = BRAND_META[brand as Brand];
  return (
    <span
      className={cn('inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs', className)}
      style={{
        backgroundColor: 'rgba(255,255,255,0.08)',
        color: 'var(--color-text-on-dark)',
        border: `1px solid rgba(255,255,255,0.12)`,
      }}
      {...props}
    >
      <span
        aria-hidden
        className='inline-block rounded-full'
        style={{ width: 8, height: 8, backgroundColor: color }}
      />
      {label}
    </span>
  );
};

export default BrandSwitcher;
