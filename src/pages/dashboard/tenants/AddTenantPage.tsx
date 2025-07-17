import React from 'react';
import DashboardFormWrapper from '@/components/dashboard/DashboardFormWrapper';
import TenantOnboardingForm from '@/components/onboarding/tenants/TenantOnboardingForm';

const AddTenantPage: React.FC = () => {
  return (
    <DashboardFormWrapper title="Add New Tenant" description="Onboard a new tenant to your property.">
      <TenantOnboardingForm />
    </DashboardFormWrapper>
  );
};

export default AddTenantPage;
