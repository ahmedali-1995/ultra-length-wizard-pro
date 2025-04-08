
import * as React from "react";

type Theme = 'light' | 'dark';

export function useTheme() {
  // Always initialize with consistent defaults
  const [theme, setTheme] = React.useState<Theme>('light');
  const [mounted, setMounted] = React.useState(false);
  
  // Only access browser APIs after component has mounted
  React.useEffect(() => {
    setMounted(true);
    
    // Check for stored preference or system preference
    try {
      const storedTheme = localStorage.getItem('theme') as Theme || '';
      
      if (storedTheme) {
        setTheme(storedTheme);
      } else if (
        window.matchMedia && 
        window.matchMedia('(prefers-color-scheme: dark)').matches
      ) {
        setTheme('dark');
      }
    } catch (e) {
      // Handle localStorage access errors (could happen in some browser environments)
      console.error("Error accessing localStorage:", e);
    }
  }, []);
  
  // Apply theme effect - only run when mounted and theme changes
  React.useEffect(() => {
    if (!mounted) return;
    
    try {
      const root = document.documentElement;
      if (theme === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
      
      localStorage.setItem('theme', theme);
    } catch (e) {
      // Handle potential DOM or localStorage errors
      console.error("Error setting theme:", e);
    }
  }, [theme, mounted]);

  const toggleTheme = React.useCallback(() => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  }, []);

  return { 
    theme: mounted ? theme : 'light', // Always default to light during SSR
    toggleTheme,
    mounted
  };
}
