
'use client';

import React, { useEffect, useState } from 'react';
import { Toaster } from "sonner";

export const ClientOnlySonner = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render anything during SSR or before hydration completes
  if (!mounted) return null;
  
  // Use the base Sonner directly to avoid any theme-related hydration issues
  return <Toaster className="toaster group" />;
};

export default ClientOnlySonner;
