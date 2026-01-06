/**
 * LanguageSwitcher Component
 * ==========================
 * Toggles between German (DE) and English (EN) languages
 */

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Globe } from 'lucide-react';

interface LanguageSwitcherProps {
  variant?: 'default' | 'compact';
  className?: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  variant = 'default',
  className = '',
}) => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'de' ? 'en' : 'de');
  };

  if (variant === 'compact') {
    return (
      <button
        onClick={toggleLanguage}
        className={`flex min-h-11 min-w-11 items-center gap-2 rounded-md px-4 py-2 transition-colors ${className}`}
        aria-label={`Switch to ${language === 'de' ? 'English' : 'German'}`}
      >
        <Globe size={18} />
        <span className='text-base font-medium uppercase'>{language}</span>
      </button>
    );
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Globe size={16} className='text-accent-primary' />
      <div className='bg-surface-tinted flex items-center gap-0 rounded-md p-0'>
        <button
          onClick={() => setLanguage('de')}
          className={`min-h-11 min-w-11 rounded px-4 py-2 text-base font-medium transition-colors ${
            language === 'de'
              ? 'bg-accent-primary text-navy-dark shadow-sm'
              : 'text-white/80 hover:text-white'
          }`}
        >
          DE
        </button>
        <button
          onClick={() => setLanguage('en')}
          className={`min-h-11 min-w-11 rounded px-4 py-2 text-base font-medium transition-colors ${
            language === 'en'
              ? 'bg-accent-primary text-navy-dark shadow-sm'
              : 'text-white/80 hover:text-white'
          }`}
        >
          EN
        </button>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
