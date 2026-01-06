import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import analytics from '@/utils/analytics';

export const FinalCTA = () => {
  return (
    <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
      <div className='relative mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8'>
        <div className='rounded-2xl border-2 border-[#ee7868] bg-[#fff8ec] p-8 text-center shadow-lg md:p-8'>
          <h2 className='mb-4 text-3xl font-bold tracking-tight text-[#ee7868] md:text-4xl'>
            Bereit für Ihr Event?
          </h2>
          <p className='mb-8 text-center text-base leading-relaxed text-[#003141] md:text-lg'>
            Sichern Sie sich jetzt Ihre mobile Cocktailbar für Ihr nächstes Event!
          </p>
          <p className='mb-8 text-center text-base leading-relaxed text-[#003141] md:text-lg'>
            Egal ob München oder Coburg – wir bringen die mobile Cocktailbar zu Ihrem Event. Jetzt
            unverbindlich anfragen!
          </p>
          <button
            className='inline-flex items-center justify-center gap-2 rounded-md bg-[#ee7868] px-6 py-3 text-base font-medium text-white transition-colors duration-200 hover:bg-[#ee7868]/90 focus-visible:ring-2 focus-visible:ring-[#ee7868] focus-visible:outline-none'
            onClick={() => {
              analytics.trackEngagement.cta('Jetzt anfragen', 'home_final_cta');
            }}
          >
            <Link className='flex items-center gap-2' to='/anfrage' data-discover='true'>
              Jetzt anfragen
              <ArrowRight />
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};
