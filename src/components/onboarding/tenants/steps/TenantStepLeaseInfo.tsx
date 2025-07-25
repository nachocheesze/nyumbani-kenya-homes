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
  const [units, setUnits] = useState<{ id: string; unit_number: string }[]>([]);

  const rentCycles = ["monthly", "quarterly", "annually"];
  const leaseStatuses = ["pending", "active", "expired", "terminated"];

  useEffect(() => {
    const fetchProperties = async () => {
      if (!userProfile) return;

      let query = supabase.from('properties').select('id, property_name');

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

  const selectedPropertyId = form.watch('property_id');

  useEffect(() => {
    const fetchUnits = async () => {
      if (!selectedPropertyId) {
        setUnits([]);
        return;
      }

      const { data, error } = await supabase
        .from('property_units')
        .select('id, unit_number')
        .eq('property_id', selectedPropertyId);

      if (error) {
        console.error('Error fetching units:', error);
        toast({
          title: "Error",
          description: "Failed to load units for the selected property.",
          variant: "destructive",
        });
      } else {
        setUnits(data || []);
      }
    };

    fetchUnits();
  }, [selectedPropertyId, toast]);

  const paymentFrequencies = ['Monthly', 'Quarterly', 'Annually'];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Lease Details</h2>
      <FormField
        control={form.control}
        name="property_id"
        rules={{ required: 'Property is required.' }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Property</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a property" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {properties.map((property) => (
                  <SelectItem key={property.id} value={property.id}>
                    {property.property_name}
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
        name="unit_id"
        rules={{ required: 'Unit is required.' }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Unit</FormLabel>
            <Select onValueChange={field.onChange} value={field.value} disabled={units.length === 0}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a unit" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {units.map((unit) => (
                  <SelectItem key={unit.id} value={unit.id}>
                    {unit.unit_number}
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
          rules={{ required: 'Move-in date is required.' }}
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
          name="lease_start_date"
          rules={{ required: 'Lease start date is required.' }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lease Start Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="lease_end_date"
        rules={{ required: 'Lease end date is required.' }}
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

      <FormField
        control={form.control}
        name="lease_duration_months"
        rules={{ required: 'Lease duration is required.' }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Lease Duration (Months)</FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder="12"
                {...field}
                onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="rent_amount"
          rules={{ required: 'Rent amount is required.' }}
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
          name="security_deposit_amount"
          rules={{ required: 'Security deposit is required.' }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Security Deposit (KES)</FormLabel>
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
          name="rent_cycle"
          rules={{ required: 'Rent cycle is required.' }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rent Cycle</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select rent cycle" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {rentCycles.map((cycle) => (
                    <SelectItem key={cycle} value={cycle}>
                      {cycle.charAt(0).toUpperCase() + cycle.slice(1)}
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
          rules={{ required: 'Rent due date is required.' }}
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
        name="payment_method"
        rules={{ required: 'Payment method is required.' }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Payment Method</FormLabel>
            <FormControl>
              <Input placeholder="e.g., M-Pesa, Bank Transfer" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="lease_status"
        rules={{ required: 'Lease status is required.' }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Lease Status</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select lease status" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {leaseStatuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
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