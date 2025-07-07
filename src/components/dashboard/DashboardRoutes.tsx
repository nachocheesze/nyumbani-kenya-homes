
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { getDashboardComponent } from "@/config/dashboardRoutes";
import PropertyManagement from "@/pages/PropertyManagement";

// Import route components
import { TenantRoutes } from "./routing/TenantRoutes";
import { LandlordRoutes } from "./routing/LandlordRoutes";
import { AgentRoutes } from "./routing/AgentRoutes";
import { CaretakerRoutes } from "./routing/CaretakerRoutes";
import { AdminRoutes } from "./routing/AdminRoutes";
import { ServiceProviderRoutes } from "./routing/ServiceProviderRoutes";
import { RealEstateRoutes } from "./routing/RealEstateRoutes";
import { SpecializedRoutes } from "./routing/SpecializedRoutes";

interface DashboardRoutesProps {
  userRole: string;
}

export const DashboardRoutes: React.FC<DashboardRoutesProps> = ({ userRole }) => {
  return (
    <Routes>
      {/* Role-specific dashboard overview routes */}
      <Route path="/" element={getDashboardComponent(userRole)} />
      <Route path={`/${userRole}`} element={getDashboardComponent(userRole)} />
      
      {/* Property Management routes */}
      <Route path="/property-management/*" element={<PropertyManagement />} />
      
      {/* Role-specific routes */}
      <TenantRoutes />
      <LandlordRoutes />
      <AgentRoutes />
      <CaretakerRoutes />
      <AdminRoutes />
      <ServiceProviderRoutes />
      <RealEstateRoutes />
      <SpecializedRoutes />
      
      {/* Fallback to role-specific dashboard */}
      <Route path="*" element={getDashboardComponent(userRole)} />
    </Routes>
  );
};
