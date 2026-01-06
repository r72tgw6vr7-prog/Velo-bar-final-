/**
 * useContent Hook
 * ===============
 * Returns content in the current language
 */

import { useLanguage } from '@/contexts/LanguageContext';
import firmenfeiernContentDE, { firmenfeiernContentEN } from '@/content/firmenfeiern';
import weihnachtsfeiernContentDE, { weihnachtsfeiernContentEN } from '@/content/weihnachtsfeiern';
import messeCateringContentDE, { messeCateringContentEN } from '@/content/messe-catering';
import privateFeiernContentDE, { privateFeiernContentEN } from '@/content/private-feiern';

export const useContent = () => {
  const { language } = useLanguage();

  return {
    firmenfeiern: language === 'de' ? firmenfeiernContentDE : firmenfeiernContentEN,
    weihnachtsfeiern: language === 'de' ? weihnachtsfeiernContentDE : weihnachtsfeiernContentEN,
    messeCatering: language === 'de' ? messeCateringContentDE : messeCateringContentEN,
    privateFeiern: language === 'de' ? privateFeiernContentDE : privateFeiernContentEN,
  };
};
