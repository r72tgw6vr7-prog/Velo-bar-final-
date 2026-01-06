import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface PaginationProps {
  page: number;
  onPageChange: (page: number) => void;
  pageSize?: number;
  hasNext?: boolean;
  isLoading?: boolean;
  ariaLabelPrefix?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  onPageChange,
  pageSize,
  hasNext,
  isLoading = false,
  ariaLabelPrefix = '',
}) => {
  const prev = () => onPageChange(Math.max(1, page - 1));
  const next = () => onPageChange(page + 1);

  return (
    <div className='mt-8 flex items-center justify-center gap-4'>
      <button
        type='button'
        className='micro-transition flex items-center gap-2 rounded border border-(--color-border-on-dark)/40 px-3 py-1 disabled:opacity-50'
        onClick={prev}
        disabled={page <= 1 || isLoading}
        aria-label={`${ariaLabelPrefix} Vorherige Seite`}
      >
        <ChevronLeft className='h-4 w-4' />
        Zurück
      </button>

      <span className='text-sm text-(--color-text-on-dark-secondary)'>
        Seite {page}
        {isLoading ? ' • aktualisiere…' : ''}
      </span>

      <button
        type='button'
        className='micro-transition flex items-center gap-2 rounded border border-(--color-border-on-dark)/40 px-3 py-1 disabled:opacity-50'
        onClick={next}
        disabled={!!(isLoading || hasNext === false)}
        aria-label={`${ariaLabelPrefix} Nächste Seite`}
      >
        Weiter
        <ChevronRight className='h-4 w-4' />
      </button>
    </div>
  );
};

export default Pagination;
