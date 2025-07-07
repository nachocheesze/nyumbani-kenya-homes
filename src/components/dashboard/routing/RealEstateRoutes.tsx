
import React from 'react';
import { Route } from 'react-router-dom';

// Import real estate company pages
import RealEstateAgents from "@/components/dashboard/real-estate/RealEstateAgents";
import RealEstateProperties from "@/components/dashboard/real-estate/RealEstateProperties";
import RealEstateReports from "@/components/dashboard/real-estate/RealEstateReports";
import RealEstateCompliance from "@/components/dashboard/real-estate/RealEstateCompliance";

export const RealEstateRoutes = () => (
  <>
    <Route path="/real_estate_company/agents" element={<RealEstateAgents />} />
    <Route path="/real_estate_company/properties" element={<RealEstateProperties />} />
    <Route path="/real_estate_company/reports" element={<RealEstateReports />} />
    <Route path="/real_estate_company/compliance" element={<RealEstateCompliance />} />
  </>
);
