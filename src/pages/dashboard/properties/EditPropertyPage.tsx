import React, { useEffect, useState } from 'react';
import DashboardFormWrapper from '@/components/dashboard/DashboardFormWrapper';
import PropertyOnboardingForm, { PropertyFormData } from '@/components/onboarding/properties/PropertyOnboardingForm';
import { useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

const EditPropertyPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [editingProperty, setEditingProperty] = useState<(PropertyFormData & { id: string }) | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchProperty = async () => {
      if (!id) return;
      setLoading(true);
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching property:', error);
        toast({
          title: "Error",
          description: "Failed to load property data.",
          variant: "destructive",
        });
      } else if (data) {
        setEditingProperty({
          id: data.id,
          title: data.title,
          address: data.address,
          city: data.city,
          county: data.county,
          property_type: data.property_type,
          bedrooms: data.bedrooms || 0,
          bathrooms: data.bathrooms || 0,
          rent_amount: data.rent_amount || 0,
          deposit_amount: data.deposit_amount || 0,
          description: data.description || '',
          landlord_id: data.landlord_id || '',
          agent_id: data.agent_id || '',
          amenities: data.amenities || [],
          image_files: [] // Image files are not fetched for editing, user will re-upload if needed
        });
      }
      setLoading(false);
    };

    fetchProperty();
  }, [id, toast]);

  if (loading) {
    return (
      <DashboardFormWrapper title="Edit Property" description="Loading property data...">
        <div className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </DashboardFormWrapper>
    );
  }

  if (!editingProperty) {
    return (
      <DashboardFormWrapper title="Edit Property" description="Property not found.">
        <p>The property you are trying to edit does not exist or you do not have permission to view it.</p>
      </DashboardFormWrapper>
    );
  }

  return (
    <DashboardFormWrapper title="Edit Property" description="Update property details.">
      <PropertyOnboardingForm editingProperty={editingProperty} />
    </DashboardFormWrapper>
  );
};

export default EditPropertyPage;
