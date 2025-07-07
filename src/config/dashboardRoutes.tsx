
import React from 'react';

// Import dashboard overview components
import LandlordDashboard from "@/components/dashboard/overview/LandlordDashboard";
import TenantDashboard from "@/components/dashboard/overview/TenantDashboard";
import CaretakerDashboard from "@/components/dashboard/overview/CaretakerDashboard";
import AgentDashboard from "@/components/dashboard/overview/AgentDashboard";
import AdminDashboard from "@/components/dashboard/overview/AdminDashboard";
import ServiceProviderDashboard from "@/components/dashboard/overview/ServiceProviderDashboard";
import DeveloperDashboard from "@/components/dashboard/overview/DeveloperDashboard";
import InvestorDashboard from "@/components/dashboard/overview/InvestorDashboard";
import ShortTermHostDashboard from "@/components/dashboard/overview/ShortTermHostDashboard";

export const getDashboardComponent = (role: string) => {
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
    case "service_provider":
      return <ServiceProviderDashboard />;
    case "developer":
      return <DeveloperDashboard />;
    case "investor":
      return <InvestorDashboard />;
    case "short_term_host":
      return <ShortTermHostDashboard />;
    case "admin":
    case "super_admin":
      return <AdminDashboard />;
    default:
      return <TenantDashboard />;
  }
};
