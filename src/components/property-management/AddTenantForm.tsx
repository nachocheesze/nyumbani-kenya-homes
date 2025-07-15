import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const tenantSchema = z.object({
  full_name: z.string().min(1, 'Tenant name is required'),
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  phone_number: z.string().optional(),
  property_id: z.string().min(1, 'Assigned property is required'),
  lease_start_date: z.string().min(1, 'Lease start date is required'),
  lease_end_date: z.string().min(1, 'Lease end date is required'),
  rent_amount: z.number().min(0, 'Rent amount must be a positive number'),
});

type TenantFormData = z.infer<typeof tenantSchema>;

interface AddTenantFormProps {
  onSuccess?: () => void;
  editingTenant?: any;
}

const AddTenantForm: React.FC<AddTenantFormProps> = ({ onSuccess, editingTenant }) => {
  const { userProfile } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [properties, setProperties] = useState<any[]>([]);

  const form = useForm<TenantFormData>({
    resolver: zodResolver(tenantSchema),
    defaultValues: editingTenant ? {
      full_name: editingTenant.full_name || '',
      email: editingTenant.email || '',
      phone_number: editingTenant.phone_number || '',
      property_id: editingTenant.property_id || '',
      lease_start_date: editingTenant.lease_start_date || '',
      lease_end_date: editingTenant.lease_end_date || '',
      rent_amount: editingTenant.rent_amount || 0,
    } : {
      full_name: '',
      email: '',
      phone_number: '',
      property_id: '',
      lease_start_date: '',
      lease_end_date: '',
      rent_amount: 0,
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
        toast({
          title: "Error",
          description: "Failed to load properties.",
          variant: "destructive"
        });
      } else {
        setProperties(data || []);
      }
    };

    fetchProperties();
  }, [userProfile, toast]);

  const onSubmit = async (data: TenantFormData) => {
    setIsSubmitting(true);
    
    try {
      const tenantData = {
        user_id: userProfile?.id, // Assuming the tenant is also a user in the system
        property_id: data.property_id,
        landlord_id: userProfile?.role === 'landlord' ? userProfile.id : null, // Assign landlord based on role
        move_in_date: data.lease_start_date,
        lease_end_date: data.lease_end_date,
        rent_amount: data.rent_amount,
        full_name: data.full_name,
        email: data.email,
        phone_number: data.phone_number,
      };

      let result;
      if (editingTenant) {
        result = await supabase
          .from('tenants')
          .update(tenantData)
          .eq('id', editingTenant.id);
      } else {
        result = await supabase
          .from('tenants')
          .insert(tenantData);
      }

      if (result.error) throw result.error;

      toast({
        title: "Success",
        description: `Tenant ${editingTenant ? 'updated' : 'added'} successfully`
      });

      if (onSuccess) onSuccess();
      if (!editingTenant) {
        form.reset();
        navigate('/dashboard/property-management/tenants');
      }
    } catch (error) {
      console.error('Error saving tenant:', error);
      toast({
        title: "Error",
        description: `Failed to ${editingTenant ? 'update' : 'add'} tenant`,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
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
                name="lease_start_date"
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
                      onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                    />
                  </FormControl>
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
                onClick={() => navigate('/dashboard/property-management/tenants')}
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

export default AddTenantForm;