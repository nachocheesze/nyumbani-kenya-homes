import React, { useState } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import TenantStepPersonalInfo from './steps/TenantStepPersonalInfo';
import TenantStepLeaseInfo from './steps/TenantStepLeaseInfo';
import TenantStepIdentification from './steps/TenantStepIdentification';
import TenantStepEmergency from './steps/TenantStepEmergency';
import TenantStepAdditionalDocuments from './steps/TenantStepAdditionalDocuments';
import TenantStepReview from './steps/TenantStepReview';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const tenantSchema = z.object({
  full_name: z.string().optional(),
  email: z.string().email('Invalid email address').optional(),
  phone_number: z.string().optional(),
  national_id_number: z.string().optional(),
  date_of_birth: z.string().optional(),
  nationality: z.string().optional(),

  property_id: z.string().optional(),
  move_in_date: z.string().optional(),
  lease_end_date: z.string().optional(),
  rent_amount: z.number().optional(),
  deposit_paid: z.number().optional(),
  payment_frequency: z.string().optional(),
  rent_due_date: z.number().optional(),
  lease_agreement_file: z.any().optional(), // File object

  id_document_front: z.any().optional(), // File object
  id_document_back: z.any().optional(), // File object
  passport_photo: z.any().optional(), // File object
  kra_pin: z.string().optional(),
  occupation: z.string().optional(),

  emergency_contact_full_name: z.string().optional(),
  emergency_contact_relationship: z.string().optional(),
  emergency_contact_phone_number: z.string().optional(),
  emergency_contact_email: z.string().email('Invalid email address').optional(),
  emergency_contact_address: z.string().optional(),

  additional_documents: z.array(z.object({
    file: z.any().optional(), // File object
    caption: z.string().optional(),
  })).optional(),
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
      national_id_number: '',
      date_of_birth: '',
      nationality: '',
      property_id: '',
      move_in_date: '',
      lease_end_date: '',
      rent_amount: 0,
      deposit_paid: 0,
      payment_frequency: '',
      rent_due_date: 0,
      lease_agreement_file: undefined,
      id_document_front: undefined,
      id_document_back: undefined,
      passport_photo: undefined,
      kra_pin: '',
      occupation: '',
      emergency_contact_full_name: '',
      emergency_contact_relationship: '',
      emergency_contact_phone_number: '',
      emergency_contact_email: '',
      emergency_contact_address: '',
      additional_documents: [],
    },
  });

  const steps = [
    {
      title: 'Personal Information',
      component: <TenantStepPersonalInfo form={form as UseFormReturn<TenantFormData>} />,
      schema: tenantSchema.pick({
        full_name: true, email: true, phone_number: true,
        national_id_number: true, date_of_birth: true, nationality: true
      }),
    },
    {
      title: 'Tenancy Details',
      component: <TenantStepLeaseInfo form={form as UseFormReturn<TenantFormData>} />,
      schema: tenantSchema.pick({
        property_id: true, move_in_date: true, lease_end_date: true,
        rent_amount: true, deposit_paid: true, payment_frequency: true,
        rent_due_date: true, lease_agreement_file: true
      }),
    },
    {
      title: 'Identification',
      component: <TenantStepIdentification form={form as UseFormReturn<TenantFormData>} />,
      schema: tenantSchema.pick({
        id_document_front: true, id_document_back: true, passport_photo: true,
        kra_pin: true, occupation: true
      }),
    },
    {
      title: 'Emergency Contact',
      component: <TenantStepEmergency form={form as UseFormReturn<TenantFormData>} />,
      schema: tenantSchema.pick({
        emergency_contact_full_name: true, emergency_contact_relationship: true,
        emergency_contact_phone_number: true, emergency_contact_email: true,
        emergency_contact_address: true
      }),
    },
    {
      title: 'Additional Documents',
      component: <TenantStepAdditionalDocuments form={form as UseFormReturn<TenantFormData>} />,
      schema: tenantSchema.pick({ additional_documents: true }),
    },
    {
      title: 'Review & Submit',
      component: <TenantStepReview form={form as UseFormReturn<TenantFormData>} />,
      schema: tenantSchema, // Full schema for final review
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
      const leaseAgreementFileUrl = await uploadFile(data.lease_agreement_file, `tenants/${userProfile?.id}/lease_agreements`);
      const idDocumentFrontUrl = await uploadFile(data.id_document_front, `tenants/${userProfile?.id}/identification`);
      const idDocumentBackUrl = await uploadFile(data.id_document_back, `tenants/${userProfile?.id}/identification`);
      const passportPhotoUrl = await uploadFile(data.passport_photo, `tenants/${userProfile?.id}/identification`);

      const tenantData: any = {
        full_name: data.full_name,
        email: data.email,
        phone_number: data.phone_number,
        national_id_number: data.national_id_number,
        date_of_birth: data.date_of_birth,
        nationality: data.nationality,
        property_id: data.property_id,
        move_in_date: data.move_in_date,
        lease_end_date: data.lease_end_date,
        rent_amount: data.rent_amount,
        deposit_paid: data.deposit_paid,
        payment_frequency: data.payment_frequency,
        rent_due_date: data.rent_due_date,
        kra_pin: data.kra_pin,
        occupation: data.occupation,
        emergency_contact_full_name: data.emergency_contact_full_name,
        emergency_contact_relationship: data.emergency_contact_relationship,
        emergency_contact_phone_number: data.emergency_contact_phone_number,
        emergency_contact_email: data.emergency_contact_email,
        emergency_contact_address: data.emergency_contact_address,
        lease_agreement_file_url: leaseAgreementFileUrl,
        id_document_front_url: idDocumentFrontUrl,
        id_document_back_url: idDocumentBackUrl,
        passport_photo_url: passportPhotoUrl,
      };

      let result;
      let tenantId: string | null = null;

      if (editingTenant) {
        result = await supabase
          .from('tenants')
          .update(tenantData)
          .eq('id', editingTenant.id)
          .select(); // Select the updated row to get its ID
        tenantId = editingTenant.id;
      } else {
        result = await supabase
          .from('tenants')
          .insert(tenantData)
          .select(); // Select the inserted row to get its ID
      }

      if (result.error) throw result.error;
      if (result.data && result.data.length > 0) {
        tenantId = result.data[0].id;
      } else {
        throw new Error("Failed to retrieve tenant ID after insert/update.");
      }

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
                  file_url: docUrl,
                  caption: doc.caption || '',
                  uploaded_at: new Date().toISOString(),
                });
              if (docInsertError) {
                console.error(`Failed to insert additional document ${doc.file.name}:`, docInsertError);
                // Decide whether to throw or just log and continue
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
        description: `Failed to ${editingTenant ? 'update' : 'add'} tenant`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
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
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {steps[currentStep].component}

            <div className="flex justify-between mt-6">
              {currentStep > 0 && (
                <Button type="button" variant="outline" onClick={handleBack}>
                  Back
                </Button>
              )}
              {currentStep < steps.length - 1 && (
                <Button type="button" onClick={handleNext} className="ml-auto">
                  Next
                </Button>
              )}
              {currentStep === steps.length - 1 && (
                <Button type="submit" disabled={isSubmitting} className="ml-auto">
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