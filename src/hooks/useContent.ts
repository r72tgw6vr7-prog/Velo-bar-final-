/**
 * useContent Hook
 * ===============
 * Returns content in the current language
 */

import { useLanguage } from '@/contexts/LanguageContext.tsx';
import firmenfeiernContentDE, { firmenfeiernContentEN } from '@/content/firmenfeiern.ts';
import weihnachtsfeiernContentDE, { weihnachtsfeiernContentEN } from '@/content/weihnachtsfeiern.ts';
import messeCateringContentDE, { messeCateringContentEN } from '@/content/messe-catering.ts';
import privateFeiernContentDE, { privateFeiernContentEN } from '@/content/private-feiern.ts';

export const useContent = () => {
  const { language } = useLanguage();

  return {
    firmenfeiern: language === 'de' ? firmenfeiernContentDE : firmenfeiernContentEN,
    weihnachtsfeiern: language === 'de' ? weihnachtsfeiernContentDE : weihnachtsfeiernContentEN,
    messeCatering: language === 'de' ? messeCateringContentDE : messeCateringContentEN,
    privateFeiern: language === 'de' ? privateFeiernContentDE : privateFeiernContentEN,
  };
};
