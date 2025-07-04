
import { useState } from "react";

// Import role-specific dashboard components
import TenantDashboard from "@/components/dashboard/TenantDashboard";
import LandlordDashboard from "@/components/dashboard/LandlordDashboard";
import AgentDashboard from "@/components/dashboard/AgentDashboard";
import AdminDashboard from "@/components/dashboard/AdminDashboard";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardNavigation from "@/components/dashboard/DashboardNavigation";

const Dashboard = () => {
  // Mock user data - in real app, get from Firebase Auth + MongoDB
  const [user] = useState({
    name: "John Doe",
    email: "john.doe@email.com",
    role: "tenant", // This would come from your database
    avatar: "/placeholder.svg",
    walletBalance: 125000
  });

  // Role switcher for testing (remove in production)
  const [currentRole, setCurrentRole] = useState(user.role);

  const renderDashboardByRole = () => {
    switch (currentRole) {
      case "tenant":
        return <TenantDashboard />;
      case "landlord":
        return <LandlordDashboard />;
      case "agent":
        return <AgentDashboard />;
      case "admin":
      case "super_admin":
        return <AdminDashboard />;
      default:
        return <TenantDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNavigation 
        currentRole={currentRole} 
        setCurrentRole={setCurrentRole} 
      />

      <div className="container mx-auto px-4 py-8">
        <DashboardHeader user={{ ...user, role: currentRole }} />
        {renderDashboardByRole()}
      </div>
    </div>
  );
};

export default Dashboard;
