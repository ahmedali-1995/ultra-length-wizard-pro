
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

// Import regular Toaster for server-side rendering safety
import { Toaster } from "@/components/ui/toaster";

// Use lazy loading for client-only components
const ClientOnlySonner = lazy(() => 
  import("./components/ClientOnlySonner").then(mod => ({ 
    default: mod.ClientOnlySonner 
  }))
);

const queryClient = new QueryClient();

// Helper to detect if we're in a browser environment
const isBrowser = typeof window !== 'undefined';

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      {/* Only render Toaster on the client side for now */}
      {isBrowser && <Toaster />}
      
      {/* Only render Sonner on the client */}
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

export default App;
