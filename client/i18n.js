import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import detector from 'i18next-browser-languagedetector';
import commonEn from './locales/en/translations.json';
import commonEs from './locales/es/translations.json';

const fallbackLng = ['es'];
const availableLanguages = ['en', 'es'];

i18n
  .use(detector)
  .use(initReactI18next) // pass the i18n instance to react-i18next.
  .init({
    fallbackLng, // if user computer language is not on the list of available languages, than we will be using the fallback language specified earlier
    debug: true,
    defaultNS: 'translations',
    resources: {
      en: {
        common: commonEn
      },
      de: {
        common: commonEs
      }
    },
    whitelist: availableLanguages,
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
