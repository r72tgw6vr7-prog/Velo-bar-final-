import React, { useState } from 'react';

interface LanguageToggleProps {
  onLanguageChange?: (language: 'DE' | 'EN') => void;
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({ onLanguageChange }) => {
  const [isGerman, setIsGerman] = useState(true);

  const handleGermanClick = () => {
    setIsGerman(true);
    onLanguageChange?.('DE');
  };

  const handleEnglishClick = () => {
    setIsGerman(false);
    onLanguageChange?.('EN');
  };

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        width: '140px',
        height: '48px',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        borderRadius: '9999px',
        padding: '4px',
      }}
    >
      {/* Accent sliding pill */}
      <div
        style={{
          position: 'absolute',
          top: '4px',
          left: '4px',
          width: '66px',
          height: '40px',
          backgroundColor: 'var(--color-accent-primary)',
          borderRadius: '9999px',
          transform: isGerman ? 'translateX(0px)' : 'translateX(66px)',
          transition: 'transform 300ms ease-in-out',
          zIndex: 0,
        }}
      />

      {/* DE Button */}
      <button
        onClick={handleGermanClick}
        style={{
          position: 'relative',
          zIndex: 10,
          width: '66px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: isGerman ? 'var(--color-teal)' : '#FFFFFF',
          fontWeight: 'var(--font-weight-600)',
          fontSize: 'var(--font-size-16px)',
          lineHeight: 'var(--line-height-1)',
          border: 'none',
          background: 'transparent',
          cursor: 'pointer',
          transition: 'color 200ms ease-in-out',
        }}
        aria-label='Switch to German'
      >
        DE
      </button>

      {/* EN Button */}
      <button
        onClick={handleEnglishClick}
        style={{
          position: 'relative',
          zIndex: 10,
          width: '66px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: isGerman ? '#FFFFFF' : 'var(--color-teal)',
          fontWeight: 'var(--font-weight-600)',
          fontSize: 'var(--font-size-16px)',
          lineHeight: 'var(--line-height-1)',
          border: 'none',
          background: 'transparent',
          cursor: 'pointer',
          transition: 'color 200ms ease-in-out',
        }}
        aria-label='Switch to English'
      >
        EN
      </button>
    </div>
  );
};

export default LanguageToggle;
