import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

const fallbackLng = ['en'];
const availableLanguages = ['en', 'es'];

i18n
  .use(initReactI18next) // pass the i18n instance to react-i18next.

  .init({
    resources: {
      en: {
        About: {
          Contribute: 'HELLLOS'
        }
      },
      es: {
        About: {
          Contribute: 'HOLLI HOLLI'
        }
      }
    },
    fallbackLng, // if user computer language is not on the list of available languages, than we will be using the fallback language specified earlier
    debug: true,
    whitelist: availableLanguages,
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
