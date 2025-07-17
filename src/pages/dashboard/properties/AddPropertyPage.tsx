import React from 'react';
import DashboardFormWrapper from '@/components/dashboard/DashboardFormWrapper';
import PropertyOnboardingForm from '@/components/onboarding/properties/PropertyOnboardingForm';

const AddPropertyPage: React.FC = () => {
  return (
    <DashboardFormWrapper title="Add New Property" description="Onboard a new property to your portfolio.">
      <PropertyOnboardingForm />
    </DashboardFormWrapper>
  );
};

export default AddPropertyPage;
