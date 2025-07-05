
import React from 'react';
import { useAuth } from "@/contexts/AuthContext";
import { useRoleRedirect } from "@/hooks/useRoleRedirect";

// Import enhanced dashboard components
import EnhancedTenantDashboard from "@/components/dashboard/enhanced/EnhancedTenantDashboard";
import EnhancedLandlordDashboard from "@/components/dashboard/enhanced/EnhancedLandlordDashboard";
import EnhancedAgentDashboard from "@/components/dashboard/enhanced/EnhancedAgentDashboard";
import AdminDashboard from "@/components/dashboard/AdminDashboard";

const Dashboard = () => {
  const { userProfile, loading } = useAuth();
  useRoleRedirect();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Loading Profile...</h2>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto"></div>
        </div>
      </div>
    );
  }

  const renderDashboardByRole = () => {
    switch (userProfile.role) {
      case "tenant":
        return <EnhancedTenantDashboard />;
      case "landlord":
        return <EnhancedLandlordDashboard />;
      case "agent":
        return <EnhancedAgentDashboard />;
      case "real_estate_company":
        return <EnhancedAgentDashboard />; // Reuse agent dashboard for now
      case "service_provider":
        return <EnhancedAgentDashboard />; // Placeholder - customize later
      case "developer":
        return <EnhancedAgentDashboard />; // Placeholder - customize later
      case "investor":
        return <EnhancedAgentDashboard />; // Placeholder - customize later
      case "short_term_host":
        return <EnhancedAgentDashboard />; // Placeholder - customize later
      case "admin":
      case "super_admin":
        return <AdminDashboard />;
      default:
        return <EnhancedTenantDashboard />;
    }
  };

  return renderDashboardByRole();
};

export default Dashboard;
