import { createContext, useContext, useEffect, useState } from 'react';
import { translations } from '../data/translations.js';
import { localized } from '../data/portfolio.js';

const PreferencesContext = createContext(null);

function readPreference(key, fallback) {
  try { return localStorage.getItem(`portfolio:${key}:v1`) ?? fallback; }
  catch { return fallback; }
}

function persistPreference(key, value) {
  try { localStorage.setItem(`portfolio:${key}:v1`, value); }
  catch { /* Preferences still work in memory if storage is disabled. */ }
}

export function PreferencesProvider({ children }) {
  const [language, setLanguage] = useState(() => readPreference('language', 'en') === 'fa' ? 'fa' : 'en');
  const [dark, setDark] = useState(() => {
    const stored = readPreference('theme', 'system');
    return stored === 'dark' || (stored !== 'light' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'fa' ? 'rtl' : 'ltr';
    persistPreference('language', language);
  }, [language]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    persistPreference('theme', dark ? 'dark' : 'light');
  }, [dark]);

  return (
    <PreferencesContext.Provider value={{ language, dark, t: translations[language], text: (value) => localized(value, language),
      toggleLanguage: () => setLanguage((previous) => previous === 'en' ? 'fa' : 'en'),
      toggleTheme: () => setDark((previous) => !previous),
    }}>
      {children}
    </PreferencesContext.Provider>
  );
}

export function usePreferences() { return useContext(PreferencesContext); }
