import { Link } from 'react-router-dom';
import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right';
import analytics from '@/utils/analytics.ts';
import { useLanguage } from '@/contexts/LanguageContext.tsx';

export const FinalCTA = () => {
  const { t } = useLanguage();

  return (
    <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
      <div className='relative mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8'>
        <div className='rounded-2xl border-2 border-[#ee7868] bg-[#fff8ec] p-8 text-center shadow-lg md:p-8'>
          <h2 className='mb-4 text-center text-2xl font-bold text-[#ee7868] md:text-3xl'>
            {t('finalCta.title')}
          </h2>
          <p className='mb-4 text-center text-base leading-relaxed text-[#003141] md:text-lg'>
            {t('finalCta.subtitle')}
          </p>
          <p className='mb-8 text-center text-base leading-relaxed text-[#003141] md:text-lg'>
            {t('finalCta.description')}
          </p>
          <button
            className='inline-flex items-center justify-center gap-2 rounded-md bg-[#ee7868] px-6 py-3 text-base font-medium text-white transition-colors duration-200 hover:bg-[#ee7868]/90 focus-visible:ring-2 focus-visible:ring-[#ee7868] focus-visible:outline-none'
            onClick={() => {
              analytics.trackEngagement.cta(t('finalCta.button'), 'home_final_cta');
            }}
          >
            <Link className='flex items-center gap-2' to='/anfrage' data-discover='true'>
              {t('finalCta.button')}
              <ArrowRight />
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};
