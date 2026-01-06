import { useEffect, useRef } from 'react';
import { FocusScope } from '@react-aria/focus';

type FocusTrapProps = {
  children: React.ReactNode;
  isActive?: boolean;
};

export const FocusTrap: React.FC<FocusTrapProps> = ({ children, isActive = true }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isActive && containerRef.current) {
      const focusableElements = containerRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );

      if (focusableElements.length > 0) {
        (focusableElements[0] as HTMLElement).focus();
      }
    }
  }, [isActive]);

  return isActive ? (
    <FocusScope contain restoreFocus autoFocus>
      <div ref={containerRef}>{children}</div>
    </FocusScope>
  ) : (
    <>{children}</>
  );
};
