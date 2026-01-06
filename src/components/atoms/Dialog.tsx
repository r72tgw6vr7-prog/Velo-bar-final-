import React from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/utils/classname';

export interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const Dialog: React.FC<DialogProps> = ({ open, onOpenChange, title, children, className }) => {
  const overlayRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function onEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') onOpenChange(false);
    }
    if (open) {
      document.addEventListener('keydown', onEsc);
    }
    return () => document.removeEventListener('keydown', onEsc);
  }, [open, onOpenChange]);

  if (!open) return null;

  const onOverlayKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onOpenChange(false);
    }
  };

  return createPortal(
    <div
      ref={overlayRef}
      className={cn('fixed inset-0 z-50 flex items-center justify-center', className)}
      onClick={(e) => {
        if (e.target === overlayRef.current) onOpenChange(false);
      }}
      role='presentation'
      tabIndex={0}
      onKeyDown={onOverlayKeyDown}
      aria-label='Overlay'
    >
      <div className='absolute inset-0 bg-black' />
      <div
        role='dialog'
        aria-modal='true'
        aria-label={typeof title === 'string' ? title : undefined}
        className={cn(
          'relative z-10 w-[90vw] max-w-md rounded-xl p-6',
          'u-elevation-3 bg-(--surface-card) text-(--text-on-light)',
        )}
      >
        {title && <div className='mb-4 text-lg font-semibold'>{title}</div>}
        <div>{children}</div>
        <div className='mt-6 text-right'>
          <button
            type='button'
            className='bg-accent-primary text-navy-dark rounded-md px-3 py-1'
            onClick={() => onOpenChange(false)}
          >
            Schließen
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default Dialog;
