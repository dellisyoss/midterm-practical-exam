import { createContext, useContext, useState } from 'react';

// One context object, created once and imported by every consumer.
// (Debugging case: a second createContext in another file would never
// receive the provider's value.)
export const PreferencesContext = createContext(null);

export function PreferencesProvider({ children }) {
  const [theme, setTheme] = useState('light');
  const [fontSize, setFontSize] = useState(16);

  return (
    <PreferencesContext.Provider value={{ theme, fontSize, setTheme, setFontSize }}>
      {children}
    </PreferencesContext.Provider>
  );
}

// Custom access Hook: rejects use outside the provider with a clear error.
export function usePreferences() {
  const context = useContext(PreferencesContext);
  if (!context) {
    throw new Error('usePreferences must be used inside a PreferencesProvider');
  }
  return context;
}
