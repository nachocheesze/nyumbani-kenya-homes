import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

const tenantSchema = z.object({
  full_name: z.string().min(1, 'Tenant name is required'),
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  phone_number: z.string().optional(),
  property_id: z.string().min(1, 'Assigned property is required'),
  move_in_date: z.string().min(1, 'Move-in date is required'),
  lease_end_date: z.string().min(1, 'Lease end date is required'),
  rent_amount: z.coerce.number().min(0, 'Rent amount must be a positive number'),
  deposit_paid: z.coerce.number().min(0, 'Deposit paid must be a positive number').optional(),
  status: z.enum(['active', 'inactive', 'terminated']).default('active'),
});

export type TenantFormValues = z.infer<typeof tenantSchema>;

interface TenantFormProps {
  editingTenant?: TenantFormValues & { id?: string };
  onSave: (data: TenantFormValues) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

interface PropertyOption {
  id: string;
  title: string;
}

export const TenantForm: React.FC<TenantFormProps> = ({ editingTenant, onSave, onCancel, isSubmitting }) => {
  const { userProfile } = useAuth();
  const [properties, setProperties] = useState<PropertyOption[]>([]);

  const form = useForm<TenantFormValues>({
    resolver: zodResolver(tenantSchema),
    defaultValues: editingTenant ? {
      full_name: editingTenant.full_name || '',
      email: editingTenant.email || '',
      phone_number: editingTenant.phone_number || '',
      property_id: editingTenant.property_id || '',
      move_in_date: editingTenant.move_in_date || '',
      lease_end_date: editingTenant.lease_end_date || '',
      rent_amount: editingTenant.rent_amount || 0,
      deposit_paid: editingTenant.deposit_paid || 0,
      status: editingTenant.status || 'active',
    } : {
      full_name: '',
      email: '',
      phone_number: '',
      property_id: '',
      move_in_date: '',
      lease_end_date: '',
      rent_amount: 0,
      deposit_paid: 0,
      status: 'active',
    }
  });

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
      } else {
        setProperties(data || []);
      }
    };

    fetchProperties();
  }, [userProfile]);

  const onSubmit = (data: TenantFormValues) => {
    onSave(data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{editingTenant ? 'Edit Tenant' : 'Add New Tenant'}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="full_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tenant Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter tenant's full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Enter tenant's email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter tenant's phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="property_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assigned Property</FormLabel>
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
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="terminated">Terminated</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-4">
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="flex-1"
              >
                {isSubmitting ? 'Saving...' : (editingTenant ? 'Update Tenant' : 'Add Tenant')}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={onCancel}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
