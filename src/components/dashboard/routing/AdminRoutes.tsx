
import React from 'react';
import { Route } from 'react-router-dom';

// Import admin pages
import AdminUsers from "@/components/dashboard/admin/AdminUsers";
import AdminKYC from "@/components/dashboard/admin/AdminKYC";
import AdminConfig from "@/components/dashboard/admin/AdminConfig";
import AdminFinances from "@/components/dashboard/admin/AdminFinances";
import AdminAnalytics from "@/components/dashboard/admin/AdminAnalytics";

export const AdminRoutes = () => (
  <>
    <Route path="/admin/users" element={<AdminUsers />} />
    <Route path="/admin/kyc" element={<AdminKYC />} />
    <Route path="/admin/config" element={<AdminConfig />} />
    <Route path="/admin/finances" element={<AdminFinances />} />
    <Route path="/admin/analytics" element={<AdminAnalytics />} />
    
    {/* Super Admin routes (same as admin) */}
    <Route path="/super_admin/users" element={<AdminUsers />} />
    <Route path="/super_admin/kyc" element={<AdminKYC />} />
    <Route path="/super_admin/config" element={<AdminConfig />} />
    <Route path="/super_admin/finances" element={<AdminFinances />} />
    <Route path="/super_admin/analytics" element={<AdminAnalytics />} />
  </>
);
