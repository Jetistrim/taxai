import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { TaxProvider } from "@/contexts/TaxContext";
import { Header } from "@/components/Header";
import Index from "./pages/Index";
import LandingPage from "./pages/LandingPage";
import { ClientForm } from "@/components/ClientForm";
import { ResultsArea } from "@/components/ResultsArea";
import { History } from "./pages/History";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <TaxProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Landing Page - No Header */}
            <Route path="/" element={<LandingPage />} />
            
            {/* Dashboard Routes - With Header */}
            <Route path="/*" element={
              <div className="min-h-screen bg-background">
                <Header />
                <main>
                  <Routes>
                    <Route path="/dashboard" element={<Index />} />
                    <Route path="/client-form" element={
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
                        <div>
                          <ClientForm />
                        </div>
                        <div>
                          <ResultsArea />
                        </div>
                      </div>
                    } />
                    <Route path="/history" element={<History />} />
                    <Route path="/settings" element={<div className="p-6"><h1>Configurações em desenvolvimento...</h1></div>} />
                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
              </div>
            } />
          </Routes>
        </BrowserRouter>
      </TaxProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
