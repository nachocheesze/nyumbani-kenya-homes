import React, { useState } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import TenantStepPersonalInfo from './steps/TenantStepPersonalInfo';
import TenantStepLeaseInfo from './steps/TenantStepLeaseInfo';
import TenantStepIdentification from './steps/TenantStepIdentification';
import TenantStepEmergency from './steps/TenantStepEmergency';
import TenantStepAdditionalDocuments from './steps/TenantStepAdditionalDocuments';
import TenantStepCommunicationPreferences from './steps/TenantStepCommunicationPreferences';
import TenantStepDeclarationsConsents from './steps/TenantStepDeclarationsConsents';
import TenantStepReview from './steps/TenantStepReview';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const tenantSchema = z.object({
  // Step 1: Personal Details
  full_name: z.string().optional(),
  email: z.string().email('Invalid email address').optional(),
  phone_number: z.string().optional(),
  date_of_birth: z.string().optional(),
  gender: z.enum(['male', 'female', 'other']).optional(),
  nationality: z.string().optional(),
  marital_status: z.string().optional(),
  occupation: z.string().optional(),
  income_range: z.string().optional(),
  profile_photo: z.any().optional(), // File object

  // Step 2: National ID & Verification
  id_type: z.enum(['national_id', 'passport', 'driving_license']).optional(),
  id_number: z.string().optional(),
  id_document_front: z.any().optional(), // File object
  id_document_back: z.any().optional(), // File object
  selfie_photo: z.any().optional(), // File object
  kra_pin: z.string().optional(),
  nhif_insurance_no: z.string().optional(),

  // Step 3: Tenancy Details
  property_id: z.string().optional(),
  unit_id: z.string().optional(),
  move_in_date: z.string().optional(),
  lease_start_date: z.string().optional(),
  lease_end_date: z.string().optional(),
  lease_duration_months: z.number().optional(),
  rent_amount: z.number().optional(),
  rent_cycle: z.enum(['monthly', 'quarterly', 'annually']).optional(),
  security_deposit_amount: z.number().optional(),
  payment_method: z.string().optional(),
  rent_due_date: z.number().optional(),
  lease_status: z.enum(['pending', 'active', 'expired', 'terminated']).optional(),
  lease_agreement_file: z.any().optional(), // File object

  // Step 4: Supporting Documents
  additional_documents: z.array(z.object({
    file: z.any().optional(), // File object
    caption: z.string().optional(),
  })).optional(),

  // Step 5: Emergency & Alternate Contacts
  emergency_contact_full_name: z.string().optional(),
  emergency_contact_relationship: z.string().optional(),
  emergency_contact_phone_number: z.string().optional(),
  emergency_contact_email: z.string().email('Invalid email address').optional(),
  guarantor_full_name: z.string().optional(),
  guarantor_phone_number: z.string().optional(),
  guarantor_email: z.string().email('Invalid email address').optional(),

  // Step 6: Communication Preferences
  contact_method: z.enum(['email', 'sms', 'whatsapp', 'phone_call']).optional(),
  language_preference: z.enum(['en', 'sw', 'other']).optional(),
  notification_opt_ins: z.record(z.boolean()).optional(), // e.g., { rent_reminders: true, maintenance_updates: false }

  // Step 7: Declarations & Consents
  data_consent_given: z.boolean().optional(),
  lease_agreement_consent_given: z.boolean().optional(),
  signature_image: z.any().optional(), // File object
});

export type TenantFormData = z.infer<typeof tenantSchema>;

interface TenantOnboardingFormProps {
  editingTenant?: TenantFormData & { id: string };
}

const TenantOnboardingForm: React.FC<TenantOnboardingFormProps> = ({ editingTenant }) => {
  const { userProfile } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<TenantFormData>({
    resolver: zodResolver(tenantSchema),
    defaultValues: editingTenant || {
      full_name: '',
      email: '',
      phone_number: '',
      date_of_birth: '',
      gender: '',
      nationality: '',
      marital_status: '',
      occupation: '',
      income_range: '',
      profile_photo: undefined,

      id_type: '',
      id_number: '',
      id_document_front: undefined,
      id_document_back: undefined,
      selfie_photo: undefined,
      kra_pin: '',
      nhif_insurance_no: '',

      property_id: '',
      unit_id: '',
      move_in_date: '',
      lease_start_date: '',
      lease_end_date: '',
      lease_duration_months: 0,
      rent_amount: 0,
      rent_cycle: '',
      security_deposit_amount: 0,
      payment_method: '',
      rent_due_date: 0,
      lease_status: '',
      lease_agreement_file: undefined,

      additional_documents: [],

      emergency_contact_full_name: '',
      emergency_contact_relationship: '',
      emergency_contact_phone_number: '',
      emergency_contact_email: '',
      guarantor_full_name: '',
      guarantor_phone_number: '',
      guarantor_email: '',

      contact_method: '',
      language_preference: '',
      notification_opt_ins: {},

      data_consent_given: false,
      lease_agreement_consent_given: false,
      signature_image: undefined,
    },
  });

  const steps = [
    {
      title: 'Personal Information',
      component: <TenantStepPersonalInfo form={form as UseFormReturn<TenantFormData>} />,
      schema: z.object({}),
    },
    {
      title: 'National ID & Verification',
      component: <TenantStepIdentification form={form as UseFormReturn<TenantFormData>} />,
      schema: z.object({}),
    },
    {
      title: 'Tenancy Details',
      component: <TenantStepLeaseInfo form={form as UseFormReturn<TenantFormData>} />,
      schema: z.object({}),
    },
    {
      title: 'Supporting Documents',
      component: <TenantStepAdditionalDocuments form={form as UseFormReturn<TenantFormData>} />,
      schema: z.object({}),
    },
    {
      title: 'Emergency & Alternate Contacts',
      component: <TenantStepEmergency form={form as UseFormReturn<TenantFormData>} />,
      schema: z.object({}),
    },
    {
      title: 'Communication Preferences',
      component: <TenantStepCommunicationPreferences form={form as UseFormReturn<TenantFormData>} />,
      schema: z.object({}),
    },
    {
      title: 'Declarations & Consents',
      component: <TenantStepDeclarationsConsents form={form as UseFormReturn<TenantFormData>} />,
      schema: z.object({}),
    },
    {
      title: 'Review & Submit',
      component: <TenantStepReview form={form as UseFormReturn<TenantFormData>} />,
      schema: z.object({}), // Full schema for final review
    },
  ];

  const handleNext = async () => {
    const currentStepSchema = steps[currentStep].schema;
    const isValid = await form.trigger(Object.keys(currentStepSchema.shape) as (keyof TenantFormData)[]);

    if (isValid) {
      setCurrentStep((prev) => prev + 1);
    } else {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields for this step.",
        variant: "destructive",
      });
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const onSubmit = async (data: TenantFormData) => {
    setIsSubmitting(true);
    
    setIsSubmitting(true);

    const uploadFile = async (file: File | undefined, path: string): Promise<string | null> => {
      if (!file) return null;
      const fileExtension = file.name.split('.').pop();
      const fileName = `${uuidv4()}.${fileExtension}`;
      const filePath = `${path}/${fileName}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('tenant_documents') // Assuming 'tenant_documents' is your bucket name
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadError) {
        throw new Error(`Failed to upload ${file.name}: ${uploadError.message}`);
      }

      const { data: publicUrlData } = supabase.storage
        .from('tenant_documents')
        .getPublicUrl(filePath);

      return publicUrlData.publicUrl;
    };

    try {
      // Upload individual files
      const profilePhotoUrl = await uploadFile(data.profile_photo, `tenants/${userProfile?.id}/profile_photos`);
      const leaseAgreementFileUrl = await uploadFile(data.lease_agreement_file, `tenants/${userProfile?.id}/lease_agreements`);
      const idDocumentFrontUrl = await uploadFile(data.id_document_front, `tenants/${userProfile?.id}/identification`);
      const idDocumentBackUrl = await uploadFile(data.id_document_back, `tenants/${userProfile?.id}/identification`);
      const selfiePhotoUrl = await uploadFile(data.selfie_photo, `tenants/${userProfile?.id}/identification`);
      const signatureImageUrl = await uploadFile(data.signature_image, `tenants/${userProfile?.id}/signatures`);

      const tenantData = {
        full_name: data.full_name,
        email: data.email,
        phone_number: data.phone_number,
        date_of_birth: data.date_of_birth,
        gender: data.gender,
        nationality: data.nationality,
        marital_status: data.marital_status,
        occupation: data.occupation,
        income_range: data.income_range,
        profile_photo_url: profilePhotoUrl,
        // System-generated fields will be handled by Supabase defaults or triggers
      };

      let tenantId: string | null = null;

      if (editingTenant) {
        // Update tenant data
        const { data: updatedTenant, error: updateError } = await supabase
          .from('tenants')
          .update(tenantData)
          .eq('id', editingTenant.id)
          .select();
        if (updateError) throw updateError;
        tenantId = updatedTenant[0].id;
      } else {
        // Insert new tenant data
        const { data: newTenant, error: insertError } = await supabase
          .from('tenants')
          .insert(tenantData)
          .select();
        if (insertError) throw insertError;
        tenantId = newTenant[0].id;
      }

      if (!tenantId) {
        throw new Error("Failed to retrieve tenant ID after insert/update.");
      }

      // Insert/Update tenant_identifications
      const identificationData = {
        tenant_id: tenantId,
        id_type: data.id_type,
        id_number: data.id_number,
        id_front_url: idDocumentFrontUrl,
        id_back_url: idDocumentBackUrl,
        selfie_url: selfiePhotoUrl,
        kra_pin: data.kra_pin,
        nhif_insurance_no: data.nhif_insurance_no,
      };
      const { error: identificationError } = await supabase
        .from('tenant_identifications')
        .upsert(identificationData, { onConflict: 'tenant_id' });
      if (identificationError) throw identificationError;

      // Insert/Update lease_agreements
      const leaseAgreementData = {
        tenant_id: tenantId,
        property_id: data.property_id,
        unit_id: data.unit_id,
        move_in_date: data.move_in_date,
        lease_start_date: data.lease_start_date,
        lease_end_date: data.lease_end_date,
        lease_duration_months: data.lease_duration_months,
        rent_amount: data.rent_amount,
        rent_cycle: data.rent_cycle,
        security_deposit_amount: data.security_deposit_amount,
        payment_method: data.payment_method,
        rent_due_date: data.rent_due_date,
        lease_status: data.lease_status,
        lease_agreement_url: leaseAgreementFileUrl,
      };
      const { error: leaseError } = await supabase
        .from('lease_agreements')
        .upsert(leaseAgreementData, { onConflict: 'tenant_id' }); // Assuming one lease per tenant for simplicity, adjust if multiple leases are possible
      if (leaseError) throw leaseError;

      // Insert/Update tenant_contacts (emergency contact)
      const emergencyContactData = {
        tenant_id: tenantId,
        contact_type: 'emergency',
        full_name: data.emergency_contact_full_name,
        relationship: data.emergency_contact_relationship,
        phone_number: data.emergency_contact_phone_number,
        email: data.emergency_contact_email,
      };
      const { error: emergencyContactError } = await supabase
        .from('tenant_contacts')
        .upsert(emergencyContactData, { onConflict: 'tenant_id, contact_type' });
      if (emergencyContactError) throw emergencyContactError;

      // Insert/Update tenant_contacts (guarantor contact, if provided)
      if (data.guarantor_full_name) {
        const guarantorContactData = {
          tenant_id: tenantId,
          contact_type: 'guarantor',
          full_name: data.guarantor_full_name,
          phone_number: data.guarantor_phone_number,
          email: data.guarantor_email,
        };
        const { error: guarantorContactError } = await supabase
          .from('tenant_contacts')
          .upsert(guarantorContactData, { onConflict: 'tenant_id, contact_type' });
        if (guarantorContactError) throw guarantorContactError;
      }

      // Insert/Update tenant_preferences
      const preferencesData = {
        tenant_id: tenantId,
        contact_method: data.contact_method,
        language_preference: data.language_preference,
        notification_opt_ins: (data.notification_opt_ins && Object.keys(data.notification_opt_ins).length > 0)
          ? data.notification_opt_ins
          : null,
      };
      const { error: preferencesError } = await supabase
        .from('tenant_preferences')
        .upsert(preferencesData, { onConflict: 'tenant_id' });
      if (preferencesError) throw preferencesError;

      // Insert/Update tenant_consents
      const consentsData = {
        tenant_id: tenantId,
        data_consent_given: data.data_consent_given,
        lease_agreement_consent_given: data.lease_agreement_consent_given,
        signature_image_url: signatureImageUrl,
        signed_at: new Date().toISOString(),
      };
      const { error: consentsError } = await supabase
        .from('tenant_consents')
        .upsert(consentsData, { onConflict: 'tenant_id' });
      if (consentsError) throw consentsError;

      // Handle additional documents
      if (data.additional_documents && data.additional_documents.length > 0 && tenantId) {
        for (const doc of data.additional_documents) {
          if (doc.file) {
            const docUrl = await uploadFile(doc.file, `tenants/${tenantId}/additional_documents`);
            if (docUrl) {
              const { error: docInsertError } = await supabase
                .from('tenant_documents')
                .insert({
                  tenant_id: tenantId,
                  document_type: doc.caption || 'other', // Use caption as document_type or default to 'other'
                  document_url: docUrl,
                  uploaded_at: new Date().toISOString(),
                });
              if (docInsertError) {
                console.error(`Failed to insert additional document ${doc.file.name}:`, docInsertError);
              }
            }
          }
        }
      }

      toast({
        title: "Success",
        description: `Tenant ${editingTenant ? 'updated' : 'added'} successfully`,
      });

      form.reset();
      navigate('/dashboard/property-management/tenants');
    } catch (error) {
      console.error('Error saving tenant:', error);
      toast({
        title: "Error",
        description: `Failed to ${editingTenant ? 'update' : 'add'} tenant: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const onError = (errors: any) => {
    console.error("Form validation errors:", errors);
    toast({
      title: "Validation Error",
      description: "Please fill in all required fields correctly.",
      variant: "destructive",
    });

    // Find the first field with an error and scroll to it
    const firstErrorField = Object.keys(errors)[0];
    if (firstErrorField) {
      const element = document.getElementsByName(firstErrorField)[0];
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{editingTenant ? 'Edit Tenant' : 'Add New Tenant'}</CardTitle>
        <div className="text-sm text-gray-500">Step {currentStep + 1} of {steps.length}: {steps[currentStep].title}</div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit, onError)} className="space-y-6">
            {steps[currentStep].component}

            <div className="flex justify-between mt-6">
              {currentStep > 0 && (
                <Button type="button" variant="outline" onClick={handleBack}>
                  Back
                </Button>
              )}
              <div className="flex-grow"></div> {/* Spacer to push buttons to ends */}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button type="button" variant="outline" className="mr-2">
                    Cancel
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to cancel onboarding? All unsaved data will be lost.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>No, continue</AlertDialogCancel>
                    <AlertDialogAction onClick={() => navigate('/dashboard/landlord/tenants')}>
                      Yes, cancel
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              {currentStep < steps.length - 1 && (
                <Button type="button" onClick={handleNext}>
                  Next
                </Button>
              )}
              {currentStep === steps.length - 1 && (
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : (editingTenant ? 'Update Tenant' : 'Add Tenant')}
                </Button>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default TenantOnboardingForm;