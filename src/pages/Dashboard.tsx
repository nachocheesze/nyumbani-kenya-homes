
import { useAuth } from "@/contexts/AuthContext";
import { useRoleRedirect } from "@/hooks/useRoleRedirect";

// Import role-specific dashboard components
import TenantDashboard from "@/components/dashboard/TenantDashboard";
import LandlordDashboard from "@/components/dashboard/LandlordDashboard";
import AgentDashboard from "@/components/dashboard/AgentDashboard";
import AdminDashboard from "@/components/dashboard/AdminDashboard";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardNavigation from "@/components/dashboard/DashboardNavigation";

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
        return <TenantDashboard />;
      case "landlord":
        return <LandlordDashboard />;
      case "agent":
        return <AgentDashboard />;
      case "real_estate_company":
        return <AgentDashboard />; // Same as agent for now
      case "service_provider":
        return <AgentDashboard />; // Same as agent for now  
      case "developer":
        return <AgentDashboard />; // Same as agent for now
      case "investor":
        return <AgentDashboard />; // Same as agent for now
      case "short_term_host":
        return <AgentDashboard />; // Same as agent for now
      case "admin":
      case "super_admin":
        return <AdminDashboard />;
      default:
        return <TenantDashboard />;
    }
  };

  // Mock wallet balance for now - will be replaced with real data later
  const mockUser = {
    name: userProfile.full_name,
    email: userProfile.id, // Will get email from auth.users if needed
    role: userProfile.role,
    avatar: "/placeholder.svg",
    walletBalance: 125000
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNavigation 
        currentRole={userProfile.role} 
        setCurrentRole={() => {}} // Remove role switching in production
      />

      <div className="container mx-auto px-4 py-8">
        <DashboardHeader user={mockUser} />
        {renderDashboardByRole()}
      </div>
    </div>
  );
};

export default Dashboard;
