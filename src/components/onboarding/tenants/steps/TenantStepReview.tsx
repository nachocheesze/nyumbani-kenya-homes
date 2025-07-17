import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { TenantFormData } from '../TenantOnboardingForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TenantStepReviewProps {
  form: UseFormReturn<TenantFormData>;
}

const TenantStepReview: React.FC<TenantStepReviewProps> = ({ form }) => {
  const formData = form.watch(); // Get all form data

  return (
    <Card>
      <CardHeader>
        <CardTitle>Review Tenant Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold">Personal Details</h3>
          <p><strong>Full Name:</strong> {formData.full_name || 'N/A'}</p>
          <p><strong>Email:</strong> {formData.email || 'N/A'}</p>
          <p><strong>Phone Number:</strong> {formData.phone_number || 'N/A'}</p>
          <p><strong>National ID Number:</strong> {formData.national_id_number || 'N/A'}</p>
          <p><strong>Date of Birth:</strong> {formData.date_of_birth || 'N/A'}</p>
          <p><strong>Nationality:</strong> {formData.nationality || 'N/A'}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Tenancy Details</h3>
          <p><strong>Property ID:</strong> {formData.property_id || 'N/A'}</p>
          <p><strong>Move-in Date:</strong> {formData.move_in_date || 'N/A'}</p>
          <p><strong>Lease End Date:</strong> {formData.lease_end_date || 'N/A'}</p>
          <p><strong>Rent Amount:</strong> KES {formData.rent_amount?.toLocaleString() || 'N/A'}</p>
          <p><strong>Deposit Paid:</strong> KES {formData.deposit_paid?.toLocaleString() || 'N/A'}</p>
          <p><strong>Payment Frequency:</strong> {formData.payment_frequency || 'N/A'}</p>
          <p><strong>Rent Due Date:</strong> {formData.rent_due_date || 'N/A'}</p>
          <p><strong>Lease Agreement File:</strong> {formData.lease_agreement_file?.name || 'No file'}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Identification</h3>
          <p><strong>ID Document Front:</strong> {formData.id_document_front?.name || 'No file'}</p>
          <p><strong>ID Document Back:</strong> {formData.id_document_back?.name || 'No file'}</p>
          <p><strong>Passport Photo:</strong> {formData.passport_photo?.name || 'No file'}</p>
          <p><strong>KRA PIN:</strong> {formData.kra_pin || 'N/A'}</p>
          <p><strong>Occupation:</strong> {formData.occupation || 'N/A'}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Emergency Contact</h3>
          <p><strong>Full Name:</strong> {formData.emergency_contact_full_name || 'N/A'}</p>
          <p><strong>Relationship:</strong> {formData.emergency_contact_relationship || 'N/A'}</p>
          <p><strong>Phone Number:</strong> {formData.emergency_contact_phone_number || 'N/A'}</p>
          <p><strong>Email:</strong> {formData.emergency_contact_email || 'N/A'}</p>
          <p><strong>Address:</strong> {formData.emergency_contact_address || 'N/A'}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Additional Documents</h3>
          {formData.additional_documents && formData.additional_documents.length > 0 ? (
            <ul>
              {formData.additional_documents.map((doc, index) => (
                <li key={index}><strong>File:</strong> {doc.file?.name || 'N/A'} {doc.caption && `(Caption: ${doc.caption})`}</li>
              ))}
            </ul>
          ) : (
            <p>No additional documents uploaded.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TenantStepReview;