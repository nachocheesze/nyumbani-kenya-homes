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
import { uploadFileAndGetPublicUrl } from '@/integrations/supabase/storage';

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
    file: z.any().optional(),
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

    if (!userProfile) {
      toast({ title: "Authentication Error", description: "You must be logged in to create a property.", variant: "destructive" });
      setIsSubmitting(false);
      return;
    }

    const propertyId = editingProperty?.id || uuidv4();

    try {
      // Upload media files and get their URLs
      const uploadedMediaUrls: { url: string; caption?: string }[] = [];
      if (data.media_files && data.media_files.length > 0) {
        const uploadPromises = data.media_files.map(async (media, index) => {
          if (media.file && media.file instanceof File) {
            const timestamp = Date.now();
            const path = `properties/${propertyId}/media/${timestamp}-${index}-${media.file.name}`;
            const url = await uploadFileAndGetPublicUrl(media.file, path);
            return { url, caption: media.caption };
          }
          return null;
        });

        const results = (await Promise.all(uploadPromises)).filter(Boolean);
        uploadedMediaUrls.push(...results as { url: string; caption?: string }[]);
      }

      const mainImageUrl = uploadedMediaUrls.length > 0 ? uploadedMediaUrls[0].url : null;

      let currentPropertyId = editingProperty?.id;

      const propertyDataToSave: any = {
        landlord_id: userProfile.id,
        property_name: data.property_name,
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
        main_image_url: mainImageUrl,
      };

      if (editingProperty) {
        // Update existing property
        const { error: propertyError } = await supabase
          .from('properties')
          .update(propertyDataToSave)
          .eq('id', editingProperty.id);
        if (propertyError) throw propertyError;
      } else {
        // Insert new property
        const { data: newProperty, error: propertyError } = await supabase
          .from('properties')
          .insert(propertyDataToSave)
          .select('id')
          .single();
        if (propertyError) throw propertyError;
        currentPropertyId = newProperty.id;
      }

      // Ensure currentPropertyId is available for units and media
      if (!currentPropertyId) {
        throw new Error("Failed to obtain property ID.");
      }

      // Then, handle the units
      if (data.units && data.units.length > 0) {
        const unitsToInsert = data.units.map(unit => ({
          ...unit,
          property_id: currentPropertyId,
        }));

        const { error: unitsError } = await supabase.from('units').insert(unitsToInsert);
        if (unitsError) {
          console.error('Error saving units:', unitsError);
          throw new Error('Property was saved, but failed to save units. Please edit the property to add units later.');
        }
      }

      // Then, handle the media records
      if (uploadedMediaUrls.length > 0) {
        // If editing, we might need to remove old media first. For now, we'll just add the new ones.
        const mediaToInsert = uploadedMediaUrls.map(media => ({
          property_id: currentPropertyId,
          image_url: media.url, // Assuming a generic URL column
          caption: media.caption || '',
        }));

        const { error: mediaError } = await supabase.from('property_media').insert(mediaToInsert);
        if (mediaError) {
            // Log the error but don't block the success message for the property itself
            console.error('Error saving property media:', mediaError);
        }
      }

      toast({
        title: "Success",
        description: `Property ${editingProperty ? 'updated' : 'created'} successfully`,
      });

      form.reset();
      navigate('/dashboard/property-management/properties');
    } catch (error: any) {
      console.error('Error saving property:', error);
      toast({
        title: "Error",
        description: error.message || `Failed to ${editingProperty ? 'update' : 'create'} property`,
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