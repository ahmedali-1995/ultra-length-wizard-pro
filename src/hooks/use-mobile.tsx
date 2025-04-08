
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(false);

  React.useEffect(() => {
    // Only run on the client
    if (typeof window === 'undefined') {
      return;
    }
    
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    
    // Check immediately
    checkIfMobile();
    
    // Set up event listener for window resize
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    
    if (mql.addEventListener) {
      mql.addEventListener('change', checkIfMobile);
    } else {
      // Fallback for older browsers
      window.addEventListener('resize', checkIfMobile);
    }
    
    return () => {
      if (mql.removeEventListener) {
        mql.removeEventListener('change', checkIfMobile);
      } else {
        window.removeEventListener('resize', checkIfMobile);
      }
    };
  }, []);

  return isMobile;
}
