import React, { useState, useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TenantFormData } from '../TenantOnboardingForm';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface TenantStepLeaseInfoProps {
  form: UseFormReturn<TenantFormData>;
}

const TenantStepLeaseInfo: React.FC<TenantStepLeaseInfoProps> = ({ form }) => {
  const { userProfile } = useAuth();
  const { toast } = useToast();
  const [properties, setProperties] = useState<{ id: string; title: string }[]>([]);

  useEffect(() => {
    const fetchProperties = async () => {
      if (!userProfile) return;

      let query = supabase.from('properties').select('id, title');

      if (userProfile.role === 'landlord') {
        query = query.eq('landlord_id', userProfile.id);
      } else if (userProfile.role === 'agent') {
        query = query.eq('agent_id', userProfile.id);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching properties:', error);
        toast({
          title: "Error",
          description: "Failed to load properties.",
          variant: "destructive",
        });
      } else {
        setProperties(data || []);
      }
    };

    fetchProperties();
  }, [userProfile, toast]);

  const paymentFrequencies = ['Monthly', 'Quarterly', 'Annually'];

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="property_id"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Property</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a property" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {properties.map((property) => (
                  <SelectItem key={property.id} value={property.id}>
                    {property.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="move_in_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Move-in Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lease_end_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lease End Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="rent_amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rent Amount (KES)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="0"
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="deposit_paid"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Deposit Paid (KES)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="0"
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="payment_frequency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payment Frequency</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment frequency" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {paymentFrequencies.map((frequency) => (
                    <SelectItem key={frequency} value={frequency}>
                      {frequency}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="rent_due_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rent Due Date (Day of Month)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="1" {...field} onChange={(e) => field.onChange(parseInt(e.target.value) || 0)} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="lease_agreement_file"
        render={({ field: { value, onChange, ...fieldProps } }) => (
          <FormItem>
            <FormLabel>Lease Agreement File</FormLabel>
            <FormControl>
              <Input
                {...fieldProps}
                type="file"
                accept=".pdf,image/*"
                onChange={(event) => onChange(event.target.files && event.target.files[0])}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default TenantStepLeaseInfo;