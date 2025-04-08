
import * as React from "react";

type Theme = 'light' | 'dark';

export function useTheme() {
  const [theme, setTheme] = React.useState<Theme>('light');
  const [mounted, setMounted] = React.useState(false);
  
  // Only access browser APIs after component has mounted
  React.useEffect(() => {
    setMounted(true);
    
    // Check for stored preference or system preference
    try {
      const storedTheme = localStorage.getItem('theme') as Theme;
      if (storedTheme) {
        setTheme(storedTheme);
      } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setTheme('dark');
      }
    } catch (error) {
      // If localStorage or matchMedia fails (e.g., during SSR), fallback to light theme
      console.error("Error accessing browser APIs:", error);
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
      
      // Don't use localStorage during SSR
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', theme);
      }
    } catch (error) {
      // Handle any errors during SSR
      console.error("Error updating theme:", error);
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
