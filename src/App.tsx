import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { I18nProvider } from "@/contexts/I18nContext";
import { ContentProvider } from "@/contexts/ContentProvider";
import Index from "./pages/Index.tsx";

const NotFound = lazy(() => import("./pages/NotFound.tsx"));
const Legal = lazy(() => import("./pages/Legal.tsx"));
const Unsubscribe = lazy(() => import("./pages/Unsubscribe.tsx"));
const Portfolio = lazy(() => import("./pages/Portfolio.tsx"));
const ServicePage = lazy(() => import("./pages/ServicePage.tsx"));

const Admin = lazy(() => import("./pages/Admin.tsx"));
const AdminLogin = lazy(() => import("./pages/AdminLogin.tsx"));
const ResetPassword = lazy(() => import("./pages/ResetPassword.tsx"));

const App = () => (
  <I18nProvider>
    <ContentProvider>
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
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ContentProvider>
  </I18nProvider>
);

export default App;
