import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }) {
  const [themeMode, setThemeMode] = useState(() => {
    return localStorage.getItem('fitforge-theme-mode') || 'System Theme';
  });

  useEffect(() => {
    const applyTheme = (mode) => {
      let actualTheme = mode;
      if (mode === 'System Theme') {
        actualTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      } else {
        actualTheme = mode === 'Dark Mode' ? 'dark' : 'light';
      }
      
      document.documentElement.setAttribute('data-theme', actualTheme);
      localStorage.setItem('fitforge-theme-mode', mode);
    };

    applyTheme(themeMode);

    // Listen for system theme changes if set to System Theme
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (themeMode === 'System Theme') {
        applyTheme('System Theme');
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [themeMode]);

  return (
    <ThemeContext.Provider value={{ themeMode, setThemeMode }}>
      {children}
    </ThemeContext.Provider>
  );
}
