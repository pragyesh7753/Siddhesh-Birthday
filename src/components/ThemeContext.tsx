import { createContext, useState, useEffect, ReactNode } from 'react';
import { Theme, themes } from '../themes';

interface ThemeContextType {
  currentTheme: Theme;
  setTheme: (themeId: string) => void;
  availableThemes: Theme[];
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [currentThemeId, setCurrentThemeId] = useState('classic');

  useEffect(() => {
    const savedTheme = localStorage.getItem('birthday-theme');
    if (savedTheme && themes[savedTheme]) {
      setCurrentThemeId(savedTheme);
    }
  }, []);

  const setTheme = (themeId: string) => {
    if (themes[themeId]) {
      setCurrentThemeId(themeId);
      localStorage.setItem('birthday-theme', themeId);
      
      // Add theme transition effect
      document.body.style.transition = 'all 0.5s ease-in-out';
      setTimeout(() => {
        document.body.style.transition = '';
      }, 500);
    }
  };

  const value: ThemeContextType = {
    currentTheme: themes[currentThemeId],
    setTheme,
    availableThemes: Object.values(themes)
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

