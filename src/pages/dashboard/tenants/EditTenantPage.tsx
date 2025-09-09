import React from 'react';
import DashboardFormWrapper from '@/components/dashboard/DashboardFormWrapper';
import TenantOnboardingForm from '@/components/onboarding/tenants/TenantOnboardingForm';

const EditTenantPage: React.FC = () => {
  return (
    <DashboardFormWrapper 
      title="Finish Tenant Onboarding" 
      description="Complete the onboarding process for your tenant by filling in the remaining details."
    >
      <TenantOnboardingForm />
    </DashboardFormWrapper>
  );
};

export default EditTenantPage;
