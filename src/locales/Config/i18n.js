import i18next from 'i18next';
import translationPT from '../translationPT.json';
import translationEN from '../translationEN.json'

i18next.init({
  lng: 'pt',
  debug: true,
  resources: {
    en: {
      translation: translationEN,
    },
    pt: {
      translation: translationPT,
    },
  }
});

export default i18next;