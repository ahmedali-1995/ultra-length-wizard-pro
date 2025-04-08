
import React from 'react';
import { Toaster } from "@/components/ui/sonner";

// This component only renders on the client side
export const ClientOnlyToaster = () => {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  // Don't render anything during SSR
  if (!isMounted) return null;
  
  return <Toaster position="bottom-right" />;
};

export default ClientOnlyToaster;
