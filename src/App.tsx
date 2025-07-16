import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Index from "./pages/Index";
import Properties from "./pages/Properties";
import PropertyDetail from "./pages/PropertyDetail";
import Dashboard from "./pages/Dashboard";
import { PropertyFormPage } from "./pages/PropertyFormPage";
import PropertyManagement from "./components/property-management/PropertiesManagement";
import { TenantFormPage } from "./pages/TenantFormPage";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
const queryClient = new QueryClient();

// Component to handle conditional header rendering
const AppContent = () => {
  const location = useLocation();
  const isDashboardRoute = location.pathname.startsWith('/dashboard');
  const isAccountRoute = location.pathname.startsWith('/account') || location.pathname.startsWith('/profile');
  const shouldHideHeader = isDashboardRoute || isAccountRoute;
  return <>
      {!shouldHideHeader}
      
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/properties/:id" element={<PropertyDetail />} />
        <Route path="/properties/new" element={<ProtectedRoute allowedRoles={['landlord', 'agent', 'real_estate_company', 'admin', 'super_admin']}>
              <PropertyFormPage />
            </ProtectedRoute>} />
        <Route path="/properties/edit/:id" element={<ProtectedRoute allowedRoles={['landlord', 'agent', 'real_estate_company', 'admin', 'super_admin']}>
              <PropertyFormPage />
            </ProtectedRoute>} />
        <Route path="/dashboard/*" element={<ProtectedRoute>
              <DashboardLayout>
                <Routes>
                  <Route index element={<Dashboard />} />
                  <Route path="property-management/tenants/add" element={<TenantFormPage />} />
                  <Route path="property-management/tenants/edit/:id" element={<TenantFormPage />} />
                  <Route path="*" element={<Dashboard />} />
                </Routes>
              </DashboardLayout>
            </ProtectedRoute>} />
        <Route path="/login" element={<Auth />} />
        <Route path="/signup" element={<Auth />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>;
};
const App = () => <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>;
export default App;