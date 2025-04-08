
import * as React from "react";

type Theme = 'light' | 'dark';

export function useTheme() {
  const [theme, setTheme] = React.useState<Theme>('light');
  const [mounted, setMounted] = React.useState(false);
  
  // Only access browser APIs after component has mounted
  React.useEffect(() => {
    setMounted(true);
    
    // Check for stored preference or system preference
    const storedTheme = localStorage.getItem('theme') as Theme;
    if (storedTheme) {
      setTheme(storedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }
  }, []);
  
  // Apply theme effect - only run when mounted and theme changes
  React.useEffect(() => {
    if (!mounted) return;
    
    if (document && document.documentElement) {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      
      localStorage.setItem('theme', theme);
    }
  }, [theme, mounted]);

  const toggleTheme = React.useCallback(() => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  }, []);

  return { 
    theme, 
    toggleTheme,
    // Return if component is mounted to avoid hydration issues
    mounted
  };
};
