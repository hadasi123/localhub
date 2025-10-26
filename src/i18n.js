// Simple i18n helper (minimal dependency-free)
import React, { createContext, useContext, useState } from 'react';
import he from './locales/he';

const LocaleContext = createContext();

export const I18nProvider = ({ children, defaultLang = 'he' }) => {
  const [lang, setLang] = useState(defaultLang);
  const translations = { he };

  const t = (key, fallback) => {
    const segs = key.split('.');
    const dict = translations[lang] || {};
    let cur = dict;
    for (const s of segs) {
      if (!cur) return fallback || key;
      cur = cur[s];
    }
    return cur ?? fallback ?? key;
  };

  return (
    <LocaleContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LocaleContext.Provider>
  );
};

export const useI18n = () => {
  return useContext(LocaleContext);
};

const i18nExports = {
  I18nProvider,
  useI18n
};

export default i18nExports;
