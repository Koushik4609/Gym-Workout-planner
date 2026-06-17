import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('fitforge-theme') || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('fitforge-theme', 'light');
  }, []);

  function toggleTheme() {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  }

  return (
    <ThemeContext.Provider value={{ theme: 'light', toggleTheme: () => {} }}>
      {children}
    </ThemeContext.Provider>
  );
}
