
import React from 'react';
import { Route } from 'react-router-dom';

// Import landlord-specific pages
import LandlordProperties from "@/components/dashboard/landlord/LandlordProperties";
import LandlordTenants from "@/components/dashboard/landlord/LandlordTenants";
import LandlordLeases from "@/components/dashboard/landlord/LandlordLeases";
import LandlordRequests from "@/components/dashboard/landlord/LandlordRequests";
import LandlordTransactions from "@/components/dashboard/landlord/LandlordTransactions";
import LandlordInsurance from "@/components/dashboard/landlord/LandlordInsurance";
import LandlordReports from "@/components/dashboard/landlord/LandlordReports";
import LandlordMessages from "@/components/dashboard/landlord/LandlordMessages";
import LandlordAgents from "@/components/dashboard/landlord/LandlordAgents";
import LandlordDocuments from "@/components/dashboard/landlord/LandlordDocuments";

export const LandlordRoutes = () => (
  <>
    <Route path="/landlord/properties" element={<LandlordProperties />} />
    <Route path="/landlord/tenants" element={<LandlordTenants />} />
    <Route path="/landlord/leases" element={<LandlordLeases />} />
    <Route path="/landlord/requests" element={<LandlordRequests />} />
    <Route path="/landlord/transactions" element={<LandlordTransactions />} />
    <Route path="/landlord/insurance" element={<LandlordInsurance />} />
    <Route path="/landlord/reports" element={<LandlordReports />} />
    <Route path="/landlord/messages" element={<LandlordMessages />} />
    <Route path="/landlord/agents" element={<LandlordAgents />} />
    <Route path="/landlord/documents" element={<LandlordDocuments />} />
  </>
);
