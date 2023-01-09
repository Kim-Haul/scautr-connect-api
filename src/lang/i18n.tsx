import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import TranslationJp from './lang.jp.json';
import TranslationKo from './lang.ko.json';

const resource = {
  jp: {
    translation: TranslationJp,
  },
  ko: {
    translation: TranslationKo,
  },
};

i18n.use(initReactI18next).init({
  resources: resource,
  // 초기 설정 언어
  lng: localStorage.getItem('lang') ?? 'ko',
  fallbackLng: {
    jp: ['jp'],
    default: ['ko'],
  },
  debug: true,
  defaultNS: 'translation',
  ns: 'translation',
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
