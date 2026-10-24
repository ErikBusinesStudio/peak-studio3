import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { I18nProvider } from "@/contexts/I18nContext";
import Index from "./pages/Index.tsx";

const NotFound = lazy(() => import("./pages/NotFound.tsx"));
const Legal = lazy(() => import("./pages/Legal.tsx"));
const Unsubscribe = lazy(() => import("./pages/Unsubscribe.tsx"));
const Portfolio = lazy(() => import("./pages/Portfolio.tsx"));
const ServicePage = lazy(() => import("./pages/ServicePage.tsx"));

const App = () => (
  <I18nProvider>
      <BrowserRouter>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/privacy" element={<Legal kind="privacy" />} />
            <Route path="/cookie" element={<Legal kind="cookie" />} />
            <Route path="/prezzi" element={<Navigate to="/#prezzi" replace />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/servizi/:id" element={<ServicePage />} />
            <Route path="/unsubscribe" element={<Unsubscribe />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </I18nProvider>
);

export default App;
