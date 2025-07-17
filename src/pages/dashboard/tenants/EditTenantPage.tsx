import React, { useEffect, useState } from 'react';
import DashboardFormWrapper from '@/components/dashboard/DashboardFormWrapper';
import TenantOnboardingForm, { TenantFormData } from '@/components/onboarding/tenants/TenantOnboardingForm';
import { useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

const EditTenantPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [editingTenant, setEditingTenant] = useState<(TenantFormData & { id: string }) | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchTenant = async () => {
      if (!id) return;
      setLoading(true);
      const { data, error } = await supabase
        .from('tenants')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching tenant:', error);
        toast({
          title: "Error",
          description: "Failed to load tenant data.",
          variant: "destructive",
        });
      } else if (data) {
        setEditingTenant({
          id: data.id,
          full_name: data.full_name,
          email: data.email,
          phone_number: data.phone_number || '',
          property_id: data.property_id,
          lease_start_date: data.move_in_date, // Assuming move_in_date is lease_start_date
          lease_end_date: data.lease_end_date,
          rent_amount: data.rent_amount,
        });
      }
      setLoading(false);
    };

    fetchTenant();
  }, [id, toast]);

  if (loading) {
    return (
      <DashboardFormWrapper title="Edit Tenant" description="Loading tenant data...">
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

  if (!editingTenant) {
    return (
      <DashboardFormWrapper title="Edit Tenant" description="Tenant not found.">
        <p>The tenant you are trying to edit does not exist or you do not have permission to view it.</p>
      </DashboardFormWrapper>
    );
  }

  return (
    <DashboardFormWrapper title="Edit Tenant" description="Update tenant details.">
      <TenantOnboardingForm editingTenant={editingTenant} />
    </DashboardFormWrapper>
  );
};

export default EditTenantPage;
