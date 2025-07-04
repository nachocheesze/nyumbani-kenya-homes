
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { Link } from "react-router-dom";

// Import role-specific dashboard components
import TenantDashboard from "@/components/dashboard/TenantDashboard";
import LandlordDashboard from "@/components/dashboard/LandlordDashboard";
import AgentDashboard from "@/components/dashboard/AgentDashboard";
import AdminDashboard from "@/components/dashboard/AdminDashboard";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

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
      {/* Navigation */}
      <nav className="border-b bg-white">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Home className="h-8 w-8 text-emerald-600" />
            <Link to="/" className="text-2xl font-bold text-gray-900">Nyumbani</Link>
          </div>
          <div className="hidden md:flex space-x-6">
            <Link to="/properties" className="text-gray-600 hover:text-emerald-600 transition-colors">
              Browse Properties
            </Link>
            <Link to="/dashboard" className="text-emerald-600 font-medium">
              Dashboard
            </Link>
          </div>
          
          {/* Role Switcher for Testing - Remove in Production */}
          <div className="flex items-center space-x-4">
            <select 
              value={currentRole} 
              onChange={(e) => setCurrentRole(e.target.value)}
              className="px-3 py-1 border rounded text-sm"
            >
              <option value="tenant">Tenant</option>
              <option value="landlord">Landlord</option>
              <option value="agent">Agent</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Dashboard Header */}
        <DashboardHeader user={{ ...user, role: currentRole }} />

        {/* Role-specific Dashboard Content */}
        {renderDashboardByRole()}
      </div>
    </div>
  );
};

export default Dashboard;
