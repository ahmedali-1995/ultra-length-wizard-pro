
'use client';

import React, { useEffect, useState } from 'react';
import { Toaster as Sonner } from "@/components/ui/sonner";

export const ClientOnlySonner = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  
  // Only render Sonner when mounted (client-side)
  return <Sonner />;
};

export default ClientOnlySonner;
