
'use client';

import React from 'react';
import { Toaster } from "sonner";

// This component only renders on the client side
export const ClientOnlySonner = () => {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  // Don't render anything during SSR
  if (!isMounted) return null;
  
  return <Toaster position="bottom-right" className="toaster group" />;
};

export default ClientOnlySonner;
