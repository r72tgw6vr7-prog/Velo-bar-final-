/**
 * AccessibilityMenu Component
 * ======================
 * A floating menu for users to adjust accessibility settings
 */

import React, { useState } from 'react';
import { cn } from '../../utils/classname.ts';
import { useAccessibility } from './AccessibilityProvider.tsx';
import { Accessibility, X, Eye, Type, MousePointerClick, Zap, Settings } from 'lucide-react';
import { Button } from '../atoms/index.ts';

interface AccessibilityMenuProps {
  className?: string;
}

export const AccessibilityMenu: React.FC<AccessibilityMenuProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    prefersReducedMotion,
    prefersHighContrast,
    prefersFocusIndicators,
    prefersLargeText,

    toggleReducedMotion,
    toggleHighContrast,
    toggleFocusIndicators,
    toggleLargeText,

    announce,
  } = useAccessibility();

  const handleToggle = () => {
    const newState = !isOpen;
    setIsOpen(newState);

    // Announce to screen readers
    if (newState) {
      announce('Accessibility menu opened', 'polite');
    } else {
      announce('Accessibility menu closed', 'polite');
    }
  };

  const handleSettingToggle = (setting: string, currentValue: boolean, toggleFn: () => void) => {
    toggleFn();
    announce(`${setting} ${!currentValue ? 'enabled' : 'disabled'}`, 'polite');
  };

  return (
    <>
      {/* Floating button */}
      <Button
        variant='outline'
        size='icon'
        aria-label={isOpen ? 'Close accessibility menu' : 'Open accessibility menu'}
        aria-expanded={isOpen ? 'true' : 'false'}
        onClick={handleToggle}
        className={cn(
          'z-z-popover fixed right-6 bottom-6',
          'h-12 w-12 rounded-full',
          'shadow-shadow-primary-soft',
          className,
        )}
      >
        {isOpen ? <X size={24} /> : <Accessibility size={24} />}
      </Button>

      {/* Menu */}
      {isOpen && (
        <div
          className={cn(
            'z-z-popover fixed right-6 bottom-20',
            'w-72',
            'bg-color-surface-dark',
            'border-color-text-primary-10 border',
            'shadow-shadow-primary-soft rounded-lg',
            'p-4',
            'animate-slideIn',
          )}
          role='dialog'
          aria-labelledby='a11y-menu-heading'
        >
          <div className={cn('mb-4 flex items-center justify-between')}>
            <h2
              id='a11y-menu-heading'
              className={cn(
                'font-headline text-lg',
                'text-brand-primary',
                'flex items-center gap-2',
              )}
            >
              <Settings size={18} /> Accessibility Settings
            </h2>
            <Button
              variant='ghost'
              size='icon'
              aria-label='Close accessibility menu'
              onClick={handleToggle}
              className={cn('h-8 w-8')}
            >
              <X size={16} />
            </Button>
          </div>

          <div className={cn('space-y-4')}>
            {/* Reduced motion */}
            <div className={cn('flex items-center justify-between')}>
              <label
                htmlFor='reduced-motion'
                className={cn(
                  'flex cursor-pointer items-center gap-2',
                  'text-text-primary text-sm',
                )}
              >
                <Zap size={16} className={cn('text-brand-primary')} />
                Reduce animations
              </label>
              <label className={cn('relative inline-flex cursor-pointer items-center')}>
                <input
                  id='reduced-motion'
                  type='checkbox'
                  checked={prefersReducedMotion}
                  onChange={() =>
                    handleSettingToggle(
                      'Reduced animations',
                      prefersReducedMotion,
                      toggleReducedMotion,
                    )
                  }
                  className={cn('peer sr-only')}
                />
                <div
                  className={cn(
                    'bg-text-primary-20 h-6 w-11',
                    'peer-focus:ring-2 peer-focus:outline-none',
                    'peer-focus:ring-brand-primary',
                    'peer rounded-full',
                    'peer-checked:after:translate-x-full',
                    'peer-checked:after:border-white',
                    'after:content-[""]',
                    'after:absolute after:top-[2px] after:left-[2px]',
                    'after:bg-black',
                    'after:border-text-primary after:border',
                    'after:h-5 after:w-5 after:rounded-full',
                    'after:transition-all',
                    'peer-checked:bg-brand-primary',
                  )}
                ></div>
              </label>
            </div>

            {/* High contrast */}
            <div className={cn('flex items-center justify-between')}>
              <label
                htmlFor='high-contrast'
                className={cn(
                  'flex cursor-pointer items-center gap-2',
                  'text-text-primary text-sm',
                )}
              >
                <Eye size={16} className={cn('text-brand-primary')} />
                High contrast
              </label>
              <label className={cn('relative inline-flex cursor-pointer items-center')}>
                <input
                  id='high-contrast'
                  type='checkbox'
                  checked={prefersHighContrast}
                  onChange={() =>
                    handleSettingToggle('High contrast', prefersHighContrast, toggleHighContrast)
                  }
                  className={cn('peer sr-only')}
                />
                <div
                  className={cn(
                    'bg-text-primary-20 h-6 w-11',
                    'peer-focus:ring-2 peer-focus:outline-none',
                    'peer-focus:ring-brand-primary',
                    'peer rounded-full',
                    'peer-checked:after:translate-x-full',
                    'peer-checked:after:border-white',
                    'after:content-[""]',
                    'after:absolute after:top-[2px] after:left-[2px]',
                    'after:bg-black',
                    'after:border-text-primary after:border',
                    'after:h-5 after:w-5 after:rounded-full',
                    'after:transition-all',
                    'peer-checked:bg-brand-primary',
                  )}
                ></div>
              </label>
            </div>

            {/* Focus indicators */}
            <div className={cn('flex items-center justify-between')}>
              <label
                htmlFor='focus-indicators'
                className={cn(
                  'flex cursor-pointer items-center gap-2',
                  'text-text-primary text-sm',
                )}
              >
                <MousePointerClick size={16} className={cn('text-brand-primary')} />
                Focus indicators
              </label>
              <label className={cn('relative inline-flex cursor-pointer items-center')}>
                <input
                  id='focus-indicators'
                  type='checkbox'
                  checked={prefersFocusIndicators}
                  onChange={() =>
                    handleSettingToggle(
                      'Focus indicators',
                      prefersFocusIndicators,
                      toggleFocusIndicators,
                    )
                  }
                  className={cn('peer sr-only')}
                />
                <div
                  className={cn(
                    'bg-text-primary-20 h-6 w-11',
                    'peer-focus:ring-2 peer-focus:outline-none',
                    'peer-focus:ring-brand-primary',
                    'peer rounded-full',
                    'peer-checked:after:translate-x-full',
                    'peer-checked:after:border-white',
                    'after:content-[""]',
                    'after:absolute after:top-[2px] after:left-[2px]',
                    'after:bg-deep-black',
                    'after:border-text-primary after:border',
                    'after:h-5 after:w-5 after:rounded-full',
                    'after:transition-all',
                    'peer-checked:bg-brand-primary',
                  )}
                ></div>
              </label>
            </div>

            {/* Large text */}
            <div className={cn('flex items-center justify-between')}>
              <label
                htmlFor='large-text'
                className={cn(
                  'flex cursor-pointer items-center gap-2',
                  'text-text-primary text-sm',
                )}
              >
                <Type size={16} className={cn('text-brand-primary')} />
                Larger text
              </label>
              <label className={cn('relative inline-flex cursor-pointer items-center')}>
                <input
                  id='large-text'
                  type='checkbox'
                  checked={prefersLargeText}
                  onChange={() =>
                    handleSettingToggle('Larger text', prefersLargeText, toggleLargeText)
                  }
                  className={cn('peer sr-only')}
                />
                <div
                  className={cn(
                    'bg-text-primary-20 h-6 w-11',
                    'peer-focus:ring-2 peer-focus:outline-none',
                    'peer-focus:ring-brand-primary',
                    'peer rounded-full',
                    'peer-checked:after:translate-x-full',
                    'peer-checked:after:border-white',
                    'after:content-[""]',
                    'after:absolute after:top-[2px] after:left-[2px]',
                    'after:bg-deep-black',
                    'after:border-text-primary after:border',
                    'after:h-5 after:w-5 after:rounded-full',
                    'after:transition-all',
                    'peer-checked:bg-brand-primary',
                  )}
                ></div>
              </label>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AccessibilityMenu;
