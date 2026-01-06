import React from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/utils/classname';

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactElement;
  className?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({ content, children, className }) => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLSpanElement>(null);
  const id = React.useId();

  const show = () => setOpen(true);
  const hide = () => setOpen(false);

  const onKeyDown = (e: React.KeyboardEvent<HTMLSpanElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setOpen((v) => !v);
    }
  };

  return (
    <>
      <span
        ref={anchorRef}
        role='button'
        tabIndex={0}
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
        onKeyDown={onKeyDown}
        aria-describedby={open ? id : undefined}
        className='inline-block'
      >
        {children}
      </span>
      {open &&
        anchorRef.current &&
        createPortal(
          <div
            id={id}
            role='tooltip'
            className={cn(
              'pointer-events-none select-none',
              'absolute z-50 rounded-md px-2 py-1 text-xs',
              'bg-navy text-offwhite shadow-lg',
              className,
            )}
            style={{
              top: anchorRef.current.getBoundingClientRect().bottom + 8 + window.scrollY,
              left: anchorRef.current.getBoundingClientRect().left + window.scrollX,
            }}
          >
            {content}
          </div>,
          document.body,
        )}
    </>
  );
};

export default Tooltip;
