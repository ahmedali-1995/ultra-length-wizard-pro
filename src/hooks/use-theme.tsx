
import * as React from "react";

type Theme = 'light' | 'dark';

export function useTheme() {
  const [theme, setTheme] = React.useState<Theme>('light');
  
  // Safely access browser APIs only in useEffect
  React.useEffect(() => {
    // Check for stored preference or system preference
    const storedTheme = localStorage.getItem('theme') as Theme;
    if (storedTheme) {
      setTheme(storedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }
    
    // Update document class when theme changes
    if (document && document.documentElement) {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      
      // Store the preference if localStorage is available
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('theme', theme);
      }
    }
  }, [theme]);

  const toggleTheme = React.useCallback(() => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  }, []);

  return { theme, toggleTheme };
};
