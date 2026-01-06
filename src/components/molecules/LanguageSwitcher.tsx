import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Language } from '@/contexts/LanguageContext';
import { Globe } from 'lucide-react';

interface LanguageSwitcherProps {
  className?: string;
  variant?: 'default' | 'compact' | 'dropdown';
}

/**
 * LanguageSwitcher Component
 * UI component for switching between German (DE) and English (EN)
 * Designed for B2B corporate website with German as primary language
 */
export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  className = '',
  variant = 'default',
}) => {
  const { language, setLanguage } = useLanguage();

  // Function to handle language change
  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
  };

  if (variant === 'compact') {
    return (
      <button
        type='button'
        onClick={() => handleLanguageChange(language === 'de' ? 'en' : 'de')}
        className={`hover:bg-surface-tinted flex items-center gap-2 rounded-md px-2 py-2 text-sm transition-colors ${className}`}
        aria-label={language === 'de' ? 'Switch to English' : 'Auf Deutsch wechseln'}
      >
        <Globe size={14} className='text-black/60' />
        <span className='font-medium text-black/80 uppercase'>{language}</span>
      </button>
    );
  }

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <Globe size={14} className='mr-0 text-black/50' />
      <button
        type='button'
        onClick={() => handleLanguageChange('de')}
        className={`rounded px-2 py-2 text-sm transition-colors duration-200 ${
          language === 'de'
            ? 'text-accent-primary bg-accent-primary/10 font-semibold'
            : 'hover:bg-surface-tinted text-black/60 hover:text-black/80'
        }`}
        aria-label='Auf Deutsch wechseln'
        aria-pressed={language === 'de' ? 'true' : 'false'}
      >
        DE
      </button>
      <span className='text-black/30'>|</span>
      <button
        type='button'
        onClick={() => handleLanguageChange('en')}
        className={`rounded px-2 py-2 text-sm transition-colors duration-200 ${
          language === 'en'
            ? 'text-accent-primary bg-accent-primary/10 font-semibold'
            : 'hover:bg-surface-tinted text-black/60 hover:text-black/80'
        }`}
        aria-label='Switch to English'
        aria-pressed={language === 'en' ? 'true' : 'false'}
      >
        EN
      </button>
    </div>
  );
};

export default LanguageSwitcher;
