
import { lazy, Suspense } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LengthConverter from "./pages/LengthConverter";
import AreaConverter from "./pages/AreaConverter";
import VolumeConverter from "./pages/VolumeConverter";
import CommonConversions from "./pages/CommonConversions";

// Import client-only components
const ClientOnlySonner = lazy(() => 
  import("./components/ClientOnlySonner")
);

const queryClient = new QueryClient();

const App = () => {
  // Only render client-specific components on the client side
  const isBrowser = typeof window !== 'undefined';
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {/* Only render Sonner on client */}
        {isBrowser && (
          <Suspense fallback={null}>
            <ClientOnlySonner />
          </Suspense>
        )}
        
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/length-converter" element={<LengthConverter />} />
          <Route path="/area-converter" element={<AreaConverter />} />
          <Route path="/volume-converter" element={<VolumeConverter />} />
          <Route path="/common-conversions" element={<CommonConversions />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
