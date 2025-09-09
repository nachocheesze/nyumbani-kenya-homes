import React from 'react';
import DashboardFormWrapper from '@/components/dashboard/DashboardFormWrapper';
import { QuickAddTenantForm } from '@/components/onboarding/quick-add/QuickAddTenantForm';

const AddTenantPage: React.FC = () => {
  return (
    <DashboardFormWrapper 
      title="Add a New Tenant (Quick Add)" 
      description="Quickly add a new tenant with minimal details. You can complete the full onboarding process later."
    >
      <QuickAddTenantForm />
    </DashboardFormWrapper>
  );
};

export default AddTenantPage;
