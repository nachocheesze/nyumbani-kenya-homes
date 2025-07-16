
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import PropertiesManagement from '@/components/property-management/PropertiesManagement';
import TenantsManagement from '@/components/property-management/TenantsManagement';
import { TenantFormPage } from '@/pages/TenantFormPage';

const PropertyManagement = () => {
  const { userProfile } = useAuth();

  const allowedRoles = ['super_admin', 'admin', 'landlord', 'agent'];

  if (!allowedRoles.includes(userProfile?.role || '')) {
    return (
      <div className="text-center py-8">
        <h2 className="text-xl font-semibold mb-2">Access Denied</h2>
        <p className="text-gray-500">You don't have permission to access property management.</p>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard/property-management/properties" replace />} />
      <Route path="/properties" element={<PropertiesManagement />} />
      <Route path="/tenants" element={<TenantsManagement />} />
      <Route path="/tenants/add" element={<AddTenantForm />} />
      <Route path="/tenants/edit/:id" element={<AddTenantForm />} />
    </Routes>
  );
};

export default PropertyManagement;
