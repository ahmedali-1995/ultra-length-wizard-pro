
import { useState, useEffect } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LengthConverter from "./pages/LengthConverter";
import AreaConverter from "./pages/AreaConverter";
import VolumeConverter from "./pages/VolumeConverter";
import CommonConversions from "./pages/CommonConversions";
import { Toaster } from "./components/ui/sonner";

// Create the query client outside the component to avoid recreation
const queryClient = new QueryClient();

const App = () => {
  // Use state to track client-side rendering
  const [isMounted, setIsMounted] = useState(false);
  
  // Effect only runs on the client
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {/* Only render client components when on the client */}
        {isMounted && <Toaster />}
        
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/length-converter" element={<LengthConverter />} />
          <Route path="/area-converter" element={<AreaConverter />} />
          <Route path="/volume-converter" element={<VolumeConverter />} />
          <Route path="/common-conversions" element={<CommonConversions />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
