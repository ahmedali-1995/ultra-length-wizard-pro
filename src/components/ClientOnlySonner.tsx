
'use client';

import React from 'react';
import { Toaster } from "sonner";

// This component only renders on the client side
export const ClientOnlySonner = () => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render anything during SSR
  if (!mounted) return null;
  
  return <Toaster className="toaster group" />;
};

export default ClientOnlySonner;
