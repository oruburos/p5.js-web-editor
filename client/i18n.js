import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const fallbackLng = ['es'];
const availableLanguages = ['en', 'es'];

i18n
  .use(initReactI18next) // pass the i18n instance to react-i18next.

  .init({
    resources: {
      en: {
        About: {
          Contribute: 'Contribute',
          Report: 'Report a bug'
        },
        File: {
          File: 'File',
          New: 'New',
          Save: 'Save',
          Examples: 'Examples',
          Lang: 'Lang',

          LangChange: 'Congratulations, Language changed!!!'
        },
        Toast: {
          LangChange: 'Congratulations, Language changed!!!'
        },
      },
      es: {
        File: {
          File: 'Archivo',
          New: 'Nuevo',
          Save: 'Guardar',
          Examples: 'Ejemplos',
          Lang: 'Leng',
          LangChange: 'Has cambiado el lenguaje exitosamente!'
        },
        About: {
          Contribute: 'Contribuye',
          Report: 'Reporta un error'
        },
        Toast: {
          LangChange: 'Has cambiado el lenguaje exitosamente!'
        },
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
