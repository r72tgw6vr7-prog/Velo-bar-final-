import React, { useState } from 'react';
import Send from 'lucide-react/dist/esm/icons/send';
import Loader2 from 'lucide-react/dist/esm/icons/loader-2';
import CheckCircle from 'lucide-react/dist/esm/icons/check-circle';;
import { csrfFetch } from '@/lib/csrfHelper.ts';
import { useLanguage } from '@/contexts/LanguageContext';

interface ExpressQuoteProps {
  className?: string;
}

export const ExpressQuote: React.FC<ExpressQuoteProps> = ({ className = '' }) => {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMessage(t('expressQuote.validation.invalidEmail'));
      setStatus('error');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await csrfFetch('/api/express-quote', {
        method: 'POST',
        body: JSON.stringify({ email, type: 'express_quote' }),
      });

      if (!response.ok) {
        throw new Error(t('expressQuote.errors.requestFailed'));
      }

      setStatus('success');
      setEmail('');
    } catch {
      setErrorMessage(t('expressQuote.errors.generic'));
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div
        className={`mb-8 rounded-2xl border border-green-500/30 bg-green-500/20 p-6 ${className}`}
      >
        <div className='flex items-center gap-8'>
          <CheckCircle className='shrink-0 text-green-400' size={24} />
          <div>
            <h3 className='font-(--typography-font-weight-semibold) text-(--typography-headline-md) text-white'>
              {t('expressQuote.success.title')}
            </h3>
            <p className='text-(--typography-body-small) text-white/80'>
              {t('expressQuote.success.detail')}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`mb-8 min-w-0 rounded-2xl border border-[#003141]/10 bg-[#fff8ec]/70 p-6 ${className}`}
    >
      <h3 className='mb-0 font-(--typography-font-weight-semibold) text-(--typography-headline-md) text-[#003141]'>
        {t('expressQuote.title')}
      </h3>
      <form onSubmit={handleSubmit} className='flex min-w-0 flex-col gap-8 sm:flex-row'>
        <input
          type='email'
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === 'error') setStatus('idle');
          }}
          placeholder={t('expressQuote.placeholderEmail')}
          className='h-12 min-w-0 flex-1 rounded-xl border border-[#003141]/20 bg-white/10 px-8 py-0 text-[#003141] transition-all duration-200 outline-none placeholder:text-[#003141]/50 focus:border-[#ee7868] focus:ring-2 focus:ring-[#ee7868]/20'
          disabled={status === 'loading'}
          aria-label={t('expressQuote.aria.email')}
        />
        <button
          type='submit'
          disabled={status === 'loading'}
          className='inline-flex h-12 items-center justify-center gap-0 rounded-xl bg-[#ee7868] px-8 py-0 font-(--typography-font-weight-semibold) whitespace-nowrap text-white transition-colors duration-200 hover:bg-[#f08b7d] disabled:bg-[#ee7868]/50'
        >
          {status === 'loading' ? (
            <>
              <Loader2 className='animate-spin' size={18} />
              {t('expressQuote.actions.sending')}
            </>
          ) : (
            <>
              {t('expressQuote.actions.cta')}
              <Send size={18} />
            </>
          )}
        </button>
      </form>
      {status === 'error' && errorMessage && (
        <p className='mt-8 text-(--typography-body-small) text-red-400'>{errorMessage}</p>
      )}
      <p className='mt-8 text-(--typography-body-small) text-[#003141]/50'>
        {t('expressQuote.footer')}
      </p>
    </div>
  );
};

export default ExpressQuote;
