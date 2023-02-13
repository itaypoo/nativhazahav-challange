import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-http-backend';


i18n
    .use(Backend)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    .init({
        fallbackLng: 'en',
        lng: "en", // default language
        debug: true,
        interpolation: {
            escapeValue: false, // not needed for react
        }
    });


export default i18n;