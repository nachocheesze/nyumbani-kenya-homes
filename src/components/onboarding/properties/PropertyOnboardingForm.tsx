import React, { useState } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { uploadFileAndGetPublicUrl } from '@/integrations/supabase/storage';
import { Unit } from '@/types/unit'; // Import Unit type

const unitSchema = z.object({
  unitNumber: z.string().min(1, "Unit number is required"),
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
      structure_type: undefined,
      has_blocks: undefined,
      number_of_blocks: undefined,
      has_unit_variations: undefined,
      approx_unit_count: undefined,
      description: '',
      address: '',
      city: '',
      county: '',
      neighborhood: '',
      nearest_landmark: '',
      latitude: undefined,
      longitude: undefined,
      property_type: '',
      category: undefined,
      managed_by: undefined,
      status: undefined,
      tags: '',
      floor_count: undefined,
      has_elevator: undefined,
      amenities: [],
      shared_utilities: [],
      features: [],
      total_units: undefined,
      blocks: [],
      units: [],
      images: [],
      floor_plans: [],
      video_tour_url: '',
      virtual_tour_url: '',
    },
  });

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
        landlord_id: true, agent_id: true, caretaker_id: true, paybill_number: true, bank_account: true, internal_notes: true
      }),
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
      const propertyDataToSave: any = {
        landlord_id: userProfile.id,
        property_name: data.property_name,
        structure_type: data.structure_type,
        has_blocks: data.has_blocks,
        number_of_blocks: data.number_of_blocks,
        has_unit_variations: data.has_unit_variations,
        approx_unit_count: data.approx_unit_count,
        description: data.description,
        address: data.address,
        city: data.city,
        county: data.county,
        neighborhood: data.neighborhood,
        nearest_landmark: data.nearest_landmark,
        latitude: data.latitude,
        longitude: data.longitude,
        property_type: data.property_type,
        category: data.category,
        managed_by: data.managed_by,
        status: data.status,
        tags: data.tags,
        floor_count: data.floor_count,
        has_elevator: data.has_elevator,
        amenities: data.amenities,
        shared_utilities: data.shared_utilities,
        total_units: data.total_units,
        video_url: data.video_tour_url,
        virtual_tour_url: data.virtual_tour_url,
      };

      // Handle main image URL from the first image uploaded
      let mainImageUrl: string | null = null;
      if (data.images && data.images.length > 0 && data.images[0].file) {
        const timestamp = Date.now();
        const path = `properties/${propertyId}/images/${timestamp}-0-${data.images[0].file.name}`;
        mainImageUrl = await uploadFileAndGetPublicUrl(data.images[0].file, path);
        propertyDataToSave.main_image_url = mainImageUrl;
      }

      let currentPropertyId = editingProperty?.id;

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
          property_id: currentPropertyId,
          unit_number: unit.unitNumber,
          block_name: unit.blockName,
          bedrooms: unit.bedrooms,
          bathrooms: unit.bathrooms,
          size: unit.size,
          rent_amount: unit.rent,
          deposit_amount: unit.deposit,
          is_negotiable: unit.isNegotiable,
          payment_cycle: unit.paymentCycle,
          rent_due_day: unit.rentDueDay,
          is_occupied: unit.isOccupied,
          available_from: unit.availableFrom,
          tenant_id: unit.tenantId,
          notes: unit.notes,
        }));

        const { error: unitsError } = await supabase.from('units').insert(unitsToInsert);
        if (unitsError) {
          console.error('Error saving units:', unitsError);
          throw new Error('Property was saved, but failed to save units. Please edit the property to add units later.');
        }
      }

      // Handle images
      if (data.images && data.images.length > 0) {
        const imageUploadPromises = data.images.map(async (media, index) => {
          if (media.file && media.file instanceof File) {
            const timestamp = Date.now();
            const path = `properties/${currentPropertyId}/images/${timestamp}-${index}-${media.file.name}`;
            const url = await uploadFileAndGetPublicUrl(media.file, path);
            return { property_id: currentPropertyId, image_url: url, caption: media.caption || '' };
          }
          return null;
        });
        const imagesToInsert = (await Promise.all(imageUploadPromises)).filter(Boolean);
        if (imagesToInsert.length > 0) {
          const { error: imagesError } = await supabase.from('property_media').insert(imagesToInsert);
          if (imagesError) {
            console.error('Error saving property images:', imagesError);
          }
        }
      }

      // Handle floor plans
      if (data.floor_plans && data.floor_plans.length > 0) {
        const floorPlanUploadPromises = data.floor_plans.map(async (media, index) => {
          if (media.file && media.file instanceof File) {
            const timestamp = Date.now();
            const path = `properties/${currentPropertyId}/floor_plans/${timestamp}-${index}-${media.file.name}`;
            const url = await uploadFileAndGetPublicUrl(media.file, path);
            return { property_id: currentPropertyId, image_url: url, caption: media.caption || '', media_type: 'floor_plan' };
          }
          return null;
        });
        const floorPlansToInsert = (await Promise.all(floorPlanUploadPromises)).filter(Boolean);
        if (floorPlansToInsert.length > 0) {
          const { error: floorPlansError } = await supabase.from('property_media').insert(floorPlansToInsert);
          if (floorPlansError) {
            console.error('Error saving floor plans:', floorPlansError);
          }
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