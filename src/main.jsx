import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import '@fontsource/dm-sans/latin-400.css';
import '@fontsource/dm-sans/latin-500.css';
import '@fontsource/dm-sans/latin-600.css';
import '@fontsource/pt-sans/latin-700.css';
import '@fontsource/vazirmatn/arabic-400.css';
import '@fontsource/vazirmatn/arabic-500.css';
import '@fontsource/vazirmatn/arabic-700.css';
import './styles.css';
import App from './App.jsx';
import { PreferencesProvider } from './state/preferences.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PreferencesProvider>
      <HashRouter><App /></HashRouter>
    </PreferencesProvider>
  </React.StrictMode>,
);
