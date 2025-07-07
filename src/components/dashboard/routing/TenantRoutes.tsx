
import React from 'react';
import { Route } from 'react-router-dom';

// Import tenant-specific pages
import TenantRent from "@/components/dashboard/tenant/TenantRent";
import TenantWallet from "@/components/dashboard/tenant/TenantWallet";
import TenantLease from "@/components/dashboard/tenant/TenantLease";
import TenantMaintenance from "@/components/dashboard/tenant/TenantMaintenance";
import TenantMessages from "@/components/dashboard/tenant/TenantMessages";

export const TenantRoutes = () => (
  <>
    <Route path="/tenant/rent" element={<TenantRent />} />
    <Route path="/tenant/wallet" element={<TenantWallet />} />
    <Route path="/tenant/lease" element={<TenantLease />} />
    <Route path="/tenant/maintenance" element={<TenantMaintenance />} />
    <Route path="/tenant/messages" element={<TenantMessages />} />
  </>
);
