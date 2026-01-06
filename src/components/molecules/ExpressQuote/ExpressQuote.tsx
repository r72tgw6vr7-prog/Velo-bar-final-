import React, { useState } from 'react';
import { Send, Loader2, CheckCircle } from 'lucide-react';
import { csrfFetch } from '@/lib/csrfHelper';

interface ExpressQuoteProps {
  className?: string;
}

export const ExpressQuote: React.FC<ExpressQuoteProps> = ({ className = '' }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMessage('Bitte geben Sie eine gültige E-Mail-Adresse ein.');
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
        throw new Error('Anfrage fehlgeschlagen');
      }

      setStatus('success');
      setEmail('');
    } catch {
      setErrorMessage('Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.');
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
              Anfrage erhalten!
            </h3>
            <p className='text-(--typography-body-small) text-white/80'>
              Wir melden uns innerhalb von 4 Stunden bei Ihnen.
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
        Keine Zeit für Details? Wir melden uns bei Ihnen.
      </h3>
      <form onSubmit={handleSubmit} className='flex min-w-0 flex-col gap-8 sm:flex-row'>
        <input
          type='email'
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === 'error') setStatus('idle');
          }}
          placeholder='ihre-email@firma.de'
          className='h-12 min-w-0 flex-1 rounded-xl border border-[#003141]/20 bg-white/10 px-8 py-0 text-[#003141] transition-all duration-200 outline-none placeholder:text-[#003141]/50 focus:border-[#ee7868] focus:ring-2 focus:ring-[#ee7868]/20'
          disabled={status === 'loading'}
          aria-label='E-Mail-Adresse für Express-Angebot'
        />
        <button
          type='submit'
          disabled={status === 'loading'}
          className='inline-flex h-12 items-center justify-center gap-0 rounded-xl bg-[#ee7868] px-8 py-0 font-(--typography-font-weight-semibold) whitespace-nowrap text-white transition-colors duration-200 hover:bg-[#f08b7d] disabled:bg-[#ee7868]/50'
        >
          {status === 'loading' ? (
            <>
              <Loader2 className='animate-spin' size={18} />
              Senden...
            </>
          ) : (
            <>
              Angebot anfordern
              <Send size={18} />
            </>
          )}
        </button>
      </form>
      {status === 'error' && errorMessage && (
        <p className='mt-8 text-(--typography-body-small) text-red-400'>{errorMessage}</p>
      )}
      <p className='mt-8 text-(--typography-body-small) text-[#003141]/50'>
        ⚡ Antwort innerhalb von 4 Stunden während der Geschäftszeiten
      </p>
    </div>
  );
};

export default ExpressQuote;
