import React from 'react';

export const AccessibilityEnhancements: React.FC = () => {
  return (
    <div className='sr-only'>
      {/* Accessibility enhancements for screen readers */}
      <div
        id='skip-link'
        className='bg-accent-primary text-navy-dark sr-only z-50 p-0 focus:not-sr-only focus:absolute focus:top-0 focus:left-0'
      >
        Skip to main content
      </div>
    </div>
  );
};

export default AccessibilityEnhancements;
