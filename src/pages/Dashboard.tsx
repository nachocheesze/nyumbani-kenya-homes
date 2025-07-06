
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from "@/contexts/AuthContext";
import { useRoleRedirect } from "@/hooks/useRoleRedirect";

// Import dashboard overview components
import LandlordDashboard from "@/components/dashboard/overview/LandlordDashboard";
import TenantDashboard from "@/components/dashboard/overview/TenantDashboard";
import CaretakerDashboard from "@/components/dashboard/overview/CaretakerDashboard";
import AgentDashboard from "@/components/dashboard/overview/AgentDashboard";
import AdminDashboard from "@/components/dashboard/overview/AdminDashboard";

// Import caretaker-specific pages
import CaretakerPayments from "@/components/dashboard/caretaker/CaretakerPayments";
import CaretakerReceipts from "@/components/dashboard/caretaker/CaretakerReceipts";
import CaretakerWater from "@/components/dashboard/caretaker/CaretakerWater";
import CaretakerWaste from "@/components/dashboard/caretaker/CaretakerWaste";
import CaretakerNotices from "@/components/dashboard/caretaker/CaretakerNotices";

const Dashboard = () => {
  const { userProfile, loading } = useAuth();
  useRoleRedirect();

  if (loading || !userProfile) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const getDashboardComponent = (role: string) => {
    switch (role) {
      case "tenant":
        return <TenantDashboard />;
      case "landlord":
        return <LandlordDashboard />;
      case "caretaker":
        return <CaretakerDashboard />;
      case "agent":
      case "real_estate_company":
        return <AgentDashboard />;
      case "admin":
      case "super_admin":
        return <AdminDashboard />;
      default:
        return <TenantDashboard />;
    }
  };

  return (
    <Routes>
      {/* Role-specific dashboard overview routes */}
      <Route path="/" element={getDashboardComponent(userProfile.role)} />
      <Route path={`/${userProfile.role}`} element={getDashboardComponent(userProfile.role)} />
      
      {/* Caretaker-specific routes */}
      <Route path="/caretaker/payments" element={<CaretakerPayments />} />
      <Route path="/caretaker/receipts" element={<CaretakerReceipts />} />
      <Route path="/caretaker/water" element={<CaretakerWater />} />
      <Route path="/caretaker/waste" element={<CaretakerWaste />} />
      <Route path="/caretaker/notices" element={<CaretakerNotices />} />
      
      {/* Fallback to role-specific dashboard */}
      <Route path="*" element={getDashboardComponent(userProfile.role)} />
    </Routes>
  );
};

export default Dashboard;
