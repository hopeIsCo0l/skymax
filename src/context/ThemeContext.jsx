import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [themePreference, setThemePreference] = useState(() => {
    return localStorage.getItem('skymax_theme') || 'system';
  });

  const [resolvedTheme, setResolvedTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('skymax_theme');
      if (stored === 'light' || stored === 'dark') {
        return stored;
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'dark';
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const updateTheme = () => {
      let active = themePreference;
      if (themePreference === 'system') {
        active = mediaQuery.matches ? 'dark' : 'light';
      }
      setResolvedTheme(active);
      document.documentElement.setAttribute('data-theme', active);
      document.documentElement.style.colorScheme = active;
    };

    updateTheme();

    const handleSystemChange = () => {
      if (themePreference === 'system') {
        updateTheme();
      }
    };

    mediaQuery.addEventListener('change', handleSystemChange);
    return () => mediaQuery.removeEventListener('change', handleSystemChange);
  }, [themePreference]);

  const setTheme = (newTheme) => {
    setThemePreference(newTheme);
    localStorage.setItem('skymax_theme', newTheme);
  };

  return (
    <ThemeContext.Provider value={{ themePreference, resolvedTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
