
import React from 'react';
import { useAuth } from "@/contexts/AuthContext";
import { useRoleRedirect } from "@/hooks/useRoleRedirect";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { DashboardRoutes } from "@/components/dashboard/DashboardRoutes";

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

  return (
    <DashboardLayout>
      <DashboardRoutes userRole={userProfile.role} />
    </DashboardLayout>
  );
};

export default Dashboard;
