
import React, { useState, useEffect } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

// Import Step Components (to be created)
import TenantStepPersonalInfo from './steps/TenantStepPersonalInfo';
import TenantStepLeaseInfo from './steps/TenantStepLeaseInfo';
import TenantStepIdentification from './steps/TenantStepIdentification';
import TenantStepEmergency from './steps/TenantStepEmergency';
import TenantStepAdditionalDocuments from './steps/TenantStepAdditionalDocuments';
import TenantStepReview from './steps/TenantStepReview';

// Define the full tenant schema for validation across all steps
const tenantOnboardingSchema = z.object({
  // Step 1: Personal Information
  full_name: z.string().min(3, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone_number: z.string().min(10, "A valid phone number is required"),
  date_of_birth: z.string().optional(),
  occupation: z.string().optional(),

  // Step 2: Tenancy Details
  property_id: z.string().uuid("Please select a property"),
  unit_id: z.string().uuid("Please select a unit"),
  lease_start_date: z.string(),
  lease_end_date: z.string(),
  rent_amount: z.number().min(0, "Rent must be a positive number"),
  deposit_amount: z.number().min(0, "Deposit must be a positive number").optional(),

  // Step 3: Identification
  id_type: z.enum(["national_id", "passport", "alien_id"]),
  id_number: z.string().min(5, "ID number is required"),
  id_document_front: z.any().optional(),
  id_document_back: z.any().optional(),

  // Step 4: Emergency Contact
  emergency_contact_name: z.string().min(3, "Contact name is required"),
  emergency_contact_phone: z.string().min(10, "A valid phone number is required"),
  emergency_contact_relationship: z.string().min(2, "Relationship is required"),

  // Step 5: Additional Documents
  employment_letter: z.any().optional(),
  payslips: z.any().optional(),
  bank_statements: z.any().optional(),

  // Internal fields
  landlord_id: z.string().uuid(),
});

export type TenantOnboardingFormData = z.infer<typeof tenantOnboardingSchema>;

const fetchTenant = async (tenantId: string) => {
  const { data, error } = await supabase
    .from('tenants')
    .select('*')
    .eq('id', tenantId)
    .single();
  if (error) throw new Error('Failed to fetch tenant data');
  return data;
};

const TenantOnboardingForm: React.FC = () => {
  const { id: tenantId } = useParams<{ id: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const { userProfile } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: initialData, isLoading } = useQuery({
    queryKey: ['tenant', tenantId],
    queryFn: () => fetchTenant(tenantId!),
    enabled: !!tenantId,
  });

  const form = useForm<TenantOnboardingFormData>({
    resolver: zodResolver(tenantOnboardingSchema.partial()),
    defaultValues: {
      landlord_id: userProfile?.id,
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
      const stepFromUrl = searchParams.get("step");
      if (stepFromUrl) {
        setCurrentStep(parseInt(stepFromUrl, 10) - 1);
      } else if (initialData.progress_step) {
        setCurrentStep(initialData.progress_step - 1);
      }
    }
  }, [initialData, form, searchParams]);

  const steps = [
    { title: 'Personal Information', component: <TenantStepPersonalInfo form={form as UseFormReturn<TenantOnboardingFormData>} />, schema: tenantOnboardingSchema.pick({ full_name: true, email: true, phone_number: true, date_of_birth: true, occupation: true }) },
    { title: 'Tenancy Details', component: <TenantStepLeaseInfo form={form as UseFormReturn<TenantOnboardingFormData>} />, schema: tenantOnboardingSchema.pick({ property_id: true, unit_id: true, lease_start_date: true, lease_end_date: true, rent_amount: true, deposit_amount: true }) },
    { title: 'Identification', component: <TenantStepIdentification form={form as UseFormReturn<TenantOnboardingFormData>} />, schema: tenantOnboardingSchema.pick({ id_type: true, id_number: true, id_document_front: true, id_document_back: true }) },
    { title: 'Emergency Contact', component: <TenantStepEmergency form={form as UseFormReturn<TenantOnboardingFormData>} />, schema: tenantOnboardingSchema.pick({ emergency_contact_name: true, emergency_contact_phone: true, emergency_contact_relationship: true }) },
    { title: 'Additional Documents', component: <TenantStepAdditionalDocuments form={form as UseFormReturn<TenantOnboardingFormData>} />, schema: tenantOnboardingSchema.pick({ employment_letter: true, payslips: true, bank_statements: true }) },
    { title: 'Review & Submit', component: <TenantStepReview form={form as UseFormReturn<TenantOnboardingFormData>} />, schema: tenantOnboardingSchema },
  ];

  const updateProgress = async (step: number) => {
    if (tenantId) {
      await supabase.from('tenants').update({ progress_step: step }).eq('id', tenantId);
      setSearchParams({ step: step.toString() });
    }
  };

  const handleNext = async () => {
    const currentStepSchema = steps[currentStep].schema;
    const isValid = await form.trigger(Object.keys(currentStepSchema.shape) as (keyof TenantOnboardingFormData)[]);
    if (isValid) {
      const nextStep = currentStep + 2;
      setCurrentStep((prev) => prev + 1);
      updateProgress(nextStep);
    }
  };

  const handleBack = () => {
    const prevStep = currentStep;
    setCurrentStep((prev) => prev - 1);
    updateProgress(prevStep);
  };

  const onSubmit = async (data: TenantOnboardingFormData) => {
    setIsSubmitting(true);
    const promise = async () => {
      if (!userProfile || !tenantId) throw new Error("Something went wrong. Please try again.");

      // File upload logic would go here

      const { error } = await supabase
        .from('tenants')
        .update({ ...data, onboarding_status: 'complete', is_complete: true })
        .eq('id', tenantId);

      if (error) throw error;

      await queryClient.invalidateQueries({ queryKey: ['tenants'] });
      form.reset();
      navigate('/dashboard/landlord/tenants');
    };

    toast.promise(promise(), {
      loading: 'Submitting tenant data...',
      success: 'Tenant submitted successfully!',
      error: (err) => err.message || 'Failed to submit tenant.',
    });

    setIsSubmitting(false);
  };

  if (isLoading) {
    return <div>Loading tenant details...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Finish Tenant Setup</CardTitle>
        <div className="text-sm text-muted-foreground">Step {currentStep + 1} of {steps.length}: {steps[currentStep].title}</div>
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
              <div className="flex-grow"></div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button type="button" variant="outline" className="mr-2">Cancel</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>Your progress will be saved as a draft.</AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Continue Editing</AlertDialogCancel>
                    <AlertDialogAction onClick={() => navigate('/dashboard/landlord/tenants')}>Yes, Cancel</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              {currentStep < steps.length - 1 ? (
                <Button type="button" onClick={handleNext}>Next</Button>
              ) : (
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit Onboarding'}
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
