import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import detector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import commonEn from './locales/en/translations.json';
import commonEs from './locales/es/translations.json';

const fallbackLng = ['en'];
const availableLanguages = ['en', 'es'];

i18n
  .use(HttpApi)
  .use(initReactI18next) // pass the i18n instance to react-i18next.
  .init({
    defaultNS: 'common',
    fallbackLng, // if user computer language is not on the list of available languages, than we will be using the fallback language specified earlier
    debug: true,
    resources: {
      en: {
        common: commonEn
      },
      es: {
        common: commonEs
      }
    },
    whitelist: availableLanguages,
    interpolation: {
      escapeValue: false
    },
    saveMissing: true,
  });

export default i18n;
