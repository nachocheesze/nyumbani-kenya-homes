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
import AddProperty from "./pages/properties/AddProperty";

import PropertyOnboardingForm from "./components/onboarding/properties/PropertyOnboardingForm";
import TenantOnboardingForm from "./components/onboarding/tenants/TenantOnboardingForm";
import AddTenantPage from "./pages/dashboard/tenants/AddTenantPage";
import EditTenantPage from "./pages/dashboard/tenants/EditTenantPage";
import TenantsPage from "./pages/dashboard/tenants/TenantsPage";

import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import { QuickAdd } from "./pages/QuickAdd";
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
        {/* Alias for dev/testing */}
        <Route path="/properties/add" element={<ProtectedRoute><DashboardLayout><AddProperty /></DashboardLayout></ProtectedRoute>} />
        <Route path="/quick-add" element={<ProtectedRoute><DashboardLayout><AddProperty /></DashboardLayout></ProtectedRoute>} />

        <Route path="/dashboard/*" element={<ProtectedRoute>
              <DashboardLayout>
                <Routes>
                  <Route path="landlord/properties/add" element={<AddProperty />} />
                  <Route path="landlord/properties/:id/edit" element={<PropertyOnboardingForm />} />
                  <Route path="landlord/tenants" element={<TenantsPage />} />
                  <Route path="landlord/tenants/add" element={<AddTenantPage />} />
                  <Route path="landlord/tenants/:id/edit" element={<EditTenantPage />} />
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