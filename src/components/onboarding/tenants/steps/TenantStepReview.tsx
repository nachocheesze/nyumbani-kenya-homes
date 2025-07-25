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
        <h2 className="text-xl font-semibold mb-4">Review & Submit</h2>
        <CardTitle>Review Tenant Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold">Personal Details</h3>
          <p><strong>Full Name:</strong> {formData.full_name || 'N/A'}</p>
          <p><strong>Email:</strong> {formData.email || 'N/A'}</p>
          <p><strong>Phone Number:</strong> {formData.phone_number || 'N/A'}</p>
          <p><strong>Date of Birth:</strong> {formData.date_of_birth || 'N/A'}</p>
          <p><strong>Gender:</strong> {formData.gender || 'N/A'}</p>
          <p><strong>Nationality:</strong> {formData.nationality || 'N/A'}</p>
          <p><strong>Marital Status:</strong> {formData.marital_status || 'N/A'}</p>
          <p><strong>Occupation:</strong> {formData.occupation || 'N/A'}</p>
          <p><strong>Income Range:</strong> {formData.income_range || 'N/A'}</p>
          <p><strong>Profile Photo:</strong> {formData.profile_photo?.name || 'No file'}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold">National ID & Verification</h3>
          <p><strong>ID Type:</strong> {formData.id_type || 'N/A'}</p>
          <p><strong>ID Number:</strong> {formData.id_number || 'N/A'}</p>
          <p><strong>ID Document Front:</strong> {formData.id_document_front?.name || 'No file'}</p>
          <p><strong>ID Document Back:</strong> {formData.id_document_back?.name || 'No file'}</p>
          <p><strong>Selfie Photo:</strong> {formData.selfie_photo?.name || 'No file'}</p>
          <p><strong>KRA PIN:</strong> {formData.kra_pin || 'N/A'}</p>
          <p><strong>NHIF/Insurance No:</strong> {formData.nhif_insurance_no || 'N/A'}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Tenancy Details</h3>
          <p><strong>Assigned Property:</strong> {formData.property_id || 'N/A'}</p>
          <p><strong>Unit:</strong> {formData.unit_id || 'N/A'}</p>
          <p><strong>Move-in Date:</strong> {formData.move_in_date || 'N/A'}</p>
          <p><strong>Lease Start Date:</strong> {formData.lease_start_date || 'N/A'}</p>
          <p><strong>Lease End Date:</strong> {formData.lease_end_date || 'N/A'}</p>
          <p><strong>Lease Duration:</strong> {formData.lease_duration_months || 'N/A'} months</p>
          <p><strong>Rent Amount:</strong> KES {formData.rent_amount?.toLocaleString() || 'N/A'}</p>
          <p><strong>Rent Cycle:</strong> {formData.rent_cycle || 'N/A'}</p>
          <p><strong>Security Deposit:</strong> KES {formData.security_deposit_amount?.toLocaleString() || 'N/A'}</p>
          <p><strong>Payment Method:</strong> {formData.payment_method || 'N/A'}</p>
          <p><strong>Rent Due Date:</strong> {formData.rent_due_date || 'N/A'}</p>
          <p><strong>Lease Status:</strong> {formData.lease_status || 'N/A'}</p>
          <p><strong>Lease Agreement File:</strong> {formData.lease_agreement_file?.name || 'No file'}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Supporting Documents</h3>
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
        <div>
          <h3 className="text-lg font-semibold">Emergency & Alternate Contacts</h3>
          <p><strong>Emergency Contact Name:</strong> {formData.emergency_contact_full_name || 'N/A'}</p>
          <p><strong>Relationship:</strong> {formData.emergency_contact_relationship || 'N/A'}</p>
          <p><strong>Phone Number:</strong> {formData.emergency_contact_phone_number || 'N/A'}</p>
          <p><strong>Email:</strong> {formData.emergency_contact_email || 'N/A'}</p>
          <p><strong>Guarantor Name:</strong> {formData.guarantor_full_name || 'N/A'}</p>
          <p><strong>Guarantor Phone:</strong> {formData.guarantor_phone_number || 'N/A'}</p>
          <p><strong>Guarantor Email:</strong> {formData.guarantor_email || 'N/A'}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Communication Preferences</h3>
          <p><strong>Contact Method:</strong> {formData.contact_method || 'N/A'}</p>
          <p><strong>Language Preference:</strong> {formData.language_preference || 'N/A'}</p>
          <p><strong>Notification Opt-ins:</strong></p>
          <ul>
            {formData.notification_opt_ins && Object.entries(formData.notification_opt_ins).map(([key, value]) => (
              <li key={key}>- {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}: {value ? 'Yes' : 'No'}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Declarations & Consents</h3>
          <p><strong>Data Consent Given:</strong> {formData.data_consent_given ? 'Yes' : 'No'}</p>
          <p><strong>Lease Agreement Consent Given:</strong> {formData.lease_agreement_consent_given ? 'Yes' : 'No'}</p>
          <p><strong>Digital Signature:</strong> {formData.signature_image?.name || 'No file'}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default TenantStepReview;