
import React, { useState, useEffect } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import PropertyStepStructure from './steps/PropertyStepStructure';
import PropertyStepLocationDetails from './steps/PropertyStepLocationDetails';
import PropertyStepDetails from './steps/PropertyStepDetails';
import PropertyStepUnits from './steps/PropertyStepUnits';
import PropertyStepMedia from './steps/PropertyStepMedia';
import PropertyStepReview from './steps/PropertyStepReview';
import PropertyStepLegal from './steps/PropertyStepLegal';
import PropertyStepOwnership from './steps/PropertyStepOwnership';
import PropertyStepPayments from './steps/PropertyStepPayments';
import PropertyStepStructureDetails from './steps/PropertyStepStructureDetails'; // New import
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { uploadFileAndGetPublicUrl } from '@/integrations/supabase/storage';
import { Unit } from '@/types/unit'; // Import Unit type
import { useQuery, useQueryClient } from '@tanstack/react-query';

const unitSchema = z.object({
  unitName: z.string().min(1, "Unit name is required"),
  blockName: z.string().optional(),
  bedrooms: z.number().int().min(0, "Bedrooms must be a non-negative number"),
  bathrooms: z.number().int().min(0, "Bathrooms must be a non-negative number"),
  size: z.string().optional(),
  rent: z.number().min(0, "Rent must be a non-negative number"),
  deposit: z.number().min(0, "Deposit must be a non-negative number").optional(),
  isNegotiable: z.boolean().optional(),
  paymentCycle: z.string(),
  rentDueDay: z.number().int().min(1).max(31),
  isOccupied: z.boolean().optional(),
  availableFrom: z.string().optional(),
  tenantId: z.string().optional(),
  notes: z.string().optional(),
});

const blockSchema = z.object({
  name: z.string().min(1, "Block name is required"),
  floorCount: z.number().int().min(1).optional(),
  hasElevator: z.boolean(),
  unitsInBlock: z.number().int().min(1, "Number of units in block is required"),
});

const propertySchema = z.object({
  property_name: z.string().min(1, "Property name is required"),
  structure_type: z.enum(["single_unit", "multi_unit_block", "estate"], { required_error: "Please select a structure type" }),
  has_blocks: z.boolean().optional(),
  number_of_blocks: z.number().int().min(1, "Number of blocks must be at least 1").optional(),
  has_unit_variations: z.boolean({ required_error: "Please specify if units have variations" }),
  approx_unit_count: z.number().int().min(1, "Approximate unit count must be at least 1").optional(),
  description: z.string().min(1, "Description is required"),

  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  county: z.string().min(1, "County is required"),
  neighborhood: z.string().optional(),
  nearest_landmark: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),

  property_type: z.string().optional(), // This will be used for overall property type
  category: z.enum(["residential", "commercial", "industrial", "land"], { required_error: "Please select a property category" }),
  managed_by: z.enum(["owner", "agent", "caretaker", "developer"], { required_error: "Please select who manages this property" }),
  status: z.enum(["available", "occupied", "under_renovation", "coming_soon"], { required_error: "Please select the property status" }),
  tags: z.string().optional(),

  floor_count: z.number().int().min(1, "Floor count must be at least 1").optional(),
  has_elevator: z.boolean().optional(),
  amenities: z.array(z.string()).optional(),
  shared_utilities: z.array(z.string()).optional(),
  features: z.array(z.string()).optional(),
  total_units: z.number().int().min(1, "Total units must be at least 1").optional(),

  blocks: z.array(blockSchema).optional(),

  units: z.array(unitSchema).optional(), // Use unitSchema here

  images: z.array(z.object({
    file: z.any().optional(),
    caption: z.string().optional(),
  })).optional(),
  floor_plans: z.array(z.object({
    file: z.any().optional(),
    caption: z.string().optional(),
  })).optional(),
  video_tour_url: z.string().url().or(z.literal('')).optional(),
  virtual_tour_url: z.string().url().or(z.literal('')).optional(),
  payments: z.array(z.object({
    methodType: z.enum(["mobile_money", "bank", "other"]),
    provider: z.enum(["mpesa", "airtel", "t-kash"]).nullable(),
    channel: z.enum(["paybill", "till_number", "phone"]).nullable(),
    accountName: z.string(),
    accountNumber: z.string(),
    bankName: z.string().optional(),
    swiftCode: z.string().optional(),
    branch: z.string().optional(),
    notes: z.string().optional(),
  })).optional(),
  landlord_id: z.string().optional(),
  agent_id: z.string().optional(),
  caretaker_id: z.string().optional(),
  ownership_type: z.string().optional(),
  title_deed_file: z.any().optional(),
  lease_template_file: z.any().optional(),
  construction_permit_file: z.any().optional(),
  nema_certificate_file: z.any().optional(),
  internal_notes: z.string().optional(),
});

export type PropertyFormData = z.infer<typeof propertySchema>;

type PropertyOnboardingFormProps = {};

const fetchProperty = async (recordId: string) => {
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('id', recordId)
    .single();
  if (error) throw new Error('Failed to fetch property data');
  return data;
};

const PropertyOnboardingForm: React.FC<PropertyOnboardingFormProps> = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const { userProfile } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: initialData, isLoading } = useQuery({
    queryKey: ['property', id],
    queryFn: () => fetchProperty(id!),
    enabled: !!id,
  });

  const form = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema.partial()),
    defaultValues: {},
  });

  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
      const stepFromUrl = searchParams.get("step");
      if (stepFromUrl) {
        setCurrentStep(parseInt(stepFromUrl, 10) - 1);
      } else if (initialData.is_quick_added) {
        setCurrentStep(initialData.progress_step ? initialData.progress_step - 1 : 1);
      }
    }
  }, [initialData, form, searchParams]);

  const steps = [
    {
      title: 'Property Structure',
      component: <PropertyStepStructure form={form as UseFormReturn<PropertyFormData>} />,
      schema: propertySchema.pick({
        structure_type: true, has_blocks: true, number_of_blocks: true, has_unit_variations: true, approx_unit_count: true
      }),
    },
    {
      title: 'Basic Property Info',
      component: <PropertyStepDetails form={form as UseFormReturn<PropertyFormData>} />,
      schema: propertySchema.pick({
        property_name: true, description: true, property_type: true, category: true, managed_by: true, status: true, tags: true
      }),
    },
    {
      title: 'Location Details',
      component: <PropertyStepLocationDetails form={form as UseFormReturn<PropertyFormData>} />,
      schema: propertySchema.pick({
        address: true, city: true, county: true, neighborhood: true, nearest_landmark: true, latitude: true, longitude: true
      }),
    },
    {
      title: 'Structural Details',
      component: <PropertyStepStructureDetails form={form as UseFormReturn<PropertyFormData>} />,
      schema: propertySchema.pick({
        floor_count: true, has_elevator: true, blocks: true, amenities: true, shared_utilities: true, features: true
      }),
    },
    {
      title: 'Units Setup',
      component: <PropertyStepUnits form={form as UseFormReturn<PropertyFormData>} />,
      schema: propertySchema.pick({ units: true }),
    },
    {
      title: 'Media Upload',
      component: <PropertyStepMedia form={form as UseFormReturn<PropertyFormData>} />,
      schema: propertySchema.pick({ images: true, floor_plans: true, video_tour_url: true, virtual_tour_url: true }),
    },
    {
      title: 'Payment Information',
      component: <PropertyStepPayments form={form as UseFormReturn<PropertyFormData>} />,
      schema: propertySchema.pick({ payments: true }),
    },
    {
      title: 'Legal & Documents',
      component: <PropertyStepLegal form={form as UseFormReturn<PropertyFormData>} />,
      schema: propertySchema.pick({
        ownership_type: true, title_deed_file: true, lease_template_file: true, construction_permit_file: true, nema_certificate_file: true
      }),
    },
    {
      title: 'Management & Ownership',
      component: <PropertyStepOwnership form={form as UseFormReturn<PropertyFormData>} />,
      schema: propertySchema.pick({
        landlord_id: true, agent_id: true, caretaker_id: true, internal_notes: true
      }),
    },
    {
      title: 'Review & Submit',
      component: <PropertyStepReview form={form as UseFormReturn<PropertyFormData>} />,
      schema: propertySchema, // Full schema for final review
    },
  ];

  const updateProgress = async (step: number) => {
    if (id) {
      await supabase
        .from('properties')
        .update({ progress_step: step })
        .eq('id', id);
      setSearchParams({ step: step.toString() });
    }
  };

  const handleNext = async () => {
    const currentStepSchema = steps[currentStep].schema;
    const isValid = await form.trigger(Object.keys(currentStepSchema.shape) as (keyof PropertyFormData)[]);

    if (isValid) {
      const nextStep = currentStep + 2;
      setCurrentStep((prev) => prev + 1);
      updateProgress(nextStep);
    } else {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields for this step.",
        variant: "destructive",
      });
    }
  };

  const handleBack = () => {
    const prevStep = currentStep;
    setCurrentStep((prev) => prev - 1);
    updateProgress(prevStep);
  };

  const onSubmit = async (data: PropertyFormData) => {
    setIsSubmitting(true);

    if (!userProfile || !id) {
      toast({ title: "Error", description: "Something went wrong. Please try again.", variant: "destructive" });
      setIsSubmitting(false);
      return;
    }

    try {
      const propertyDataToSave: any = {
        ...data,
        onboarding_status: 'complete', // Mark as complete
        is_quick_added: false, // No longer a quick add
      };

      // Handle file uploads and get public URLs
      // ... (file upload logic remains the same)

      const { error: propertyError } = await supabase
        .from('properties')
        .update(propertyDataToSave)
        .eq('id', id);

      if (propertyError) throw propertyError;

      // Invalidate queries to refetch data on the dashboard
      await queryClient.invalidateQueries({ queryKey: ['properties'] });

      toast({
        title: "Success",
        description: "Property submitted successfully",
      });

      form.reset();
      navigate('/dashboard/landlord/properties');
    } catch (error: any) {
      console.error('Error saving property:', error);
      toast({
        title: "Error",
        description: error.message || `Failed to submit property`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      {searchParams.get("from") === "quick" && (
        <div className="p-4 bg-blue-100 border-b border-blue-200">
          <div className="flex items-center justify-between">
            <p className="text-sm text-blue-800">
              This property was created via Quick Add. Continue setup when ready.
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                const newSearchParams = new URLSearchParams(searchParams);
                newSearchParams.delete("from");
                setSearchParams(newSearchParams);
              }}
            >
              Dismiss
            </Button>
          </div>
        </div>
      )}
      <CardHeader>
        <CardTitle>{id ? 'Finish Property Setup' : 'Add New Property'}</CardTitle>
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
              <div className="flex-grow"></div>
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
                      Are you sure you want to cancel? Your progress will be saved as a draft.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>No, continue</AlertDialogCancel>
                    <AlertDialogAction onClick={() => navigate('/dashboard/landlord/properties')}>
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
                  {isSubmitting ? 'Submitting...' : 'Submit Property'}
                </Button>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default PropertyOnboardingForm;
