
import * as React from "react";

type Theme = 'light' | 'dark';

export function useTheme() {
  // Initialize with default values
  const [theme, setTheme] = React.useState<Theme>('light');
  const [mounted, setMounted] = React.useState(false);
  
  // Only access browser APIs after component has mounted
  React.useEffect(() => {
    setMounted(true);
    
    // Check for stored preference or system preference
    const setInitialTheme = () => {
      try {
        // Safe localStorage access for SSR
        if (typeof window !== 'undefined') {
          const storedTheme = localStorage.getItem('theme') as Theme;
          if (storedTheme) {
            setTheme(storedTheme);
          } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setTheme('dark');
          }
        }
      } catch (error) {
        // Silently fail for SSR
        console.error("Theme detection error:", error);
      }
    };
    
    setInitialTheme();
  }, []);
  
  // Apply theme effect - only run when mounted and theme changes
  React.useEffect(() => {
    if (!mounted) return;
    
    try {
      if (typeof window !== 'undefined' && typeof document !== 'undefined') {
        const root = document.documentElement;
        if (theme === 'dark') {
          root.classList.add('dark');
        } else {
          root.classList.remove('dark');
        }
        
        localStorage.setItem('theme', theme);
      }
    } catch (error) {
      // Silently fail for SSR
      console.error("Theme application error:", error);
    }
  }, [theme, mounted]);

  const toggleTheme = React.useCallback(() => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  }, []);

  return { 
    theme: mounted ? theme : 'light', // Default to light during SSR
    toggleTheme,
    mounted
  };
}
