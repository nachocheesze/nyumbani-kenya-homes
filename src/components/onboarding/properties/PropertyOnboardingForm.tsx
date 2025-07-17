import React, { useState } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PropertyStepOverview from './steps/PropertyStepOverview';
import PropertyStepLocationDetails from './steps/PropertyStepLocationDetails';
import PropertyStepDetails from './steps/PropertyStepDetails';
import PropertyStepUnits from './steps/PropertyStepUnits';
import PropertyStepMedia from './steps/PropertyStepMedia';
import PropertyStepReview from './steps/PropertyStepReview';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const propertySchema = z.object({
  property_name: z.string().optional(),
  structure_type: z.string().optional(),
  total_units: z.number().optional(),
  description: z.string().optional(),

  address: z.string().optional(),
  city: z.string().optional(),
  county: z.string().optional(),
  nearby_landmarks: z.string().optional(),

  property_type: z.string().optional(),
  bedrooms: z.number().optional(),
  bathrooms: z.number().optional(),
  features: z.array(z.string()).optional(),
  amenities: z.array(z.string()).optional(),

  units: z.array(z.object({
    unit_name: z.string().optional(),
    rent_amount: z.number().optional(),
    deposit_amount: z.number().optional(),
    is_available: z.boolean().optional(),
  })).optional(),

  media_files: z.array(z.object({
    file: z.any().optional(), // File object
    caption: z.string().optional(),
  })).optional(),
});

export type PropertyFormData = z.infer<typeof propertySchema>;

interface PropertyOnboardingFormProps {
  editingProperty?: PropertyFormData & { id: string };
}

const PropertyOnboardingForm: React.FC<PropertyOnboardingFormProps> = ({ editingProperty }) => {
  const { userProfile } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema),
    defaultValues: editingProperty || {
      property_name: '',
      structure_type: '',
      total_units: 0,
      description: '',
      address: '',
      city: '',
      county: '',
      nearby_landmarks: '',
      property_type: '',
      bedrooms: 0,
      bathrooms: 0,
      features: [],
      amenities: [],
      units: [],
      media_files: [],
    },
  });

  const steps = [
    {
      title: 'Property Overview',
      component: <PropertyStepOverview form={form as UseFormReturn<PropertyFormData>} />,
      schema: propertySchema.pick({
        property_name: true, structure_type: true, total_units: true, description: true
      }),
    },
    {
      title: 'Location Details',
      component: <PropertyStepLocationDetails form={form as UseFormReturn<PropertyFormData>} />,
      schema: propertySchema.pick({
        address: true, city: true, county: true, nearby_landmarks: true
      }),
    },
    {
      title: 'Property Details',
      component: <PropertyStepDetails form={form as UseFormReturn<PropertyFormData>} />,
      schema: propertySchema.pick({
        property_type: true, bedrooms: true, bathrooms: true, features: true, amenities: true
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
      schema: propertySchema.pick({ media_files: true }),
    },
    {
      title: 'Review & Submit',
      component: <PropertyStepReview form={form as UseFormReturn<PropertyFormData>} />,
      schema: propertySchema, // Full schema for final review
    },
  ];

  const handleNext = async () => {
    const currentStepSchema = steps[currentStep].schema;
    const isValid = await form.trigger(Object.keys(currentStepSchema.shape) as (keyof PropertyFormData)[]);

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

  const onSubmit = async (data: PropertyFormData) => {
    setIsSubmitting(true);
    
    // For now, just log the data. Supabase insert logic will be added later.
    console.log("Property Form Data:", data);

    try {
      // Placeholder for Supabase upload logic for files
      // For example, you'd upload data.media_files and then store their URLs in the propertyData object.

      const propertyData: any = {
        title: data.property_name,
        structure_type: data.structure_type,
        total_units: data.total_units,
        description: data.description,
        address: data.address,
        city: data.city,
        county: data.county,
        nearby_landmarks: data.nearby_landmarks,
        property_type: data.property_type,
        bedrooms: data.bedrooms,
        bathrooms: data.bathrooms,
        features: data.features,
        amenities: data.amenities,
        // units: data.units, // Units might be stored in a separate table
        // image_urls: '...',
      };

      let result;
      if (editingProperty) {
        // result = await supabase
        //   .from('properties')
        //   .update(propertyData)
        //   .eq('id', editingProperty.id);
        console.log("Updating property:", propertyData);
      } else {
        // result = await supabase
        //   .from('properties')
        //   .insert(propertyData);
        console.log("Adding new property:", propertyData);
      }

      // if (result.error) throw result.error;

      toast({
        title: "Success",
        description: `Property ${editingProperty ? 'updated' : 'created'} successfully`,
      });

      form.reset();
      navigate('/dashboard/property-management/properties');
    } catch (error) {
      console.error('Error saving property:', error);
      toast({
        title: "Error",
        description: `Failed to ${editingProperty ? 'update' : 'create'} property`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{editingProperty ? 'Edit Property' : 'Add New Property'}</CardTitle>
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
                  {isSubmitting ? 'Submitting...' : (editingProperty ? 'Update Property' : 'Create Property')}
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