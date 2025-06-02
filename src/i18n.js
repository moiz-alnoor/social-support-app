/**
 * i18n - Internationalization config for app
 *
 * - Loads translation files
 * - Sets up language switching
 * - Integrates with `react-i18next`
 *
 * Supported languages: en, ar
 */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEN from './locales/ en/translation.json';
import translationAR from './locales/ ar/translation.json';

const resources = {
  en: { translation: translationEN },
  ar: { translation: translationAR },
};

i18n
  .use(LanguageDetector) 
  .use(initReactI18next) 
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, 
    },
  });

export default i18n;
