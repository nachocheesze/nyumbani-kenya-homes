
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const tenantSchema = z.object({
  full_name: z.string().min(1, 'Full name is required'),
  email: z.string().email('Valid email is required'),
  phone_number: z.string().min(1, 'Phone number is required'),
  property_id: z.string().min(1, 'Property selection is required'),
  rent_amount: z.number().min(1, 'Rent amount is required'),
  move_in_date: z.string().optional(),
  lease_end_date: z.string().optional(),
  deposit_paid: z.number().min(0).optional()
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
  const [depositPaidToggle, setDepositPaidToggle] = useState(false);

  const form = useForm<TenantFormData>({
    resolver: zodResolver(tenantSchema),
    defaultValues: editingTenant ? {
      full_name: editingTenant.full_name || '',
      email: editingTenant.email || '',
      phone_number: editingTenant.phone_number || '',
      property_id: editingTenant.property_id || '',
      rent_amount: editingTenant.rent_amount || 0,
      move_in_date: editingTenant.move_in_date || '',
      lease_end_date: editingTenant.lease_end_date || '',
      deposit_paid: editingTenant.deposit_paid || 0
    } : {
      rent_amount: 0,
      deposit_paid: 0
    }
  });

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      let query = supabase.from('properties').select('*');
      
      if (userProfile?.role === 'landlord') {
        query = query.eq('landlord_id', userProfile.id);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      setProperties(data || []);
    } catch (error) {
      console.error('Error fetching properties:', error);
      toast({
        title: "Error",
        description: "Failed to load properties",
        variant: "destructive"
      });
    }
  };

  const onSubmit = async (data: TenantFormData) => {
    setIsSubmitting(true);
    
    try {
      // First, create or update user account
      let userId = editingTenant?.user_id;
      
      if (!editingTenant) {
        // Create new user account
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: data.email,
          password: 'temp123!', // Temporary password - user should reset
          options: {
            data: {
              full_name: data.full_name,
              phone_number: data.phone_number,
              role: 'tenant'
            }
          }
        });

        if (authError) throw authError;
        userId = authData.user?.id;

        // Also insert into users table
        const { error: userError } = await supabase
          .from('users')
          .insert({
            id: userId,
            full_name: data.full_name,
            phone_number: data.phone_number,
            role: 'tenant'
          });

        if (userError) throw userError;
      }

      // Create or update tenant record
      const tenantData = {
        user_id: userId,
        property_id: data.property_id,
        rent_amount: data.rent_amount,
        move_in_date: data.move_in_date || null,
        lease_end_date: data.lease_end_date || null,
        deposit_paid: depositPaidToggle ? data.deposit_paid : 0,
        landlord_id: userProfile?.id,
        status: 'active'
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
          .insert([tenantData]);
      }

      if (result.error) throw result.error;

      toast({
        title: "Success",
        description: `Tenant ${editingTenant ? 'updated' : 'created'} successfully${!editingTenant ? '. Login credentials sent to tenant email.' : ''}`
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
        description: `Failed to ${editingTenant ? 'update' : 'create'} tenant`,
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="full_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter full name" {...field} />
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
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Enter email address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="phone_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter phone number" {...field} />
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
                    <FormLabel>Property</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select property" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {properties.map((property) => (
                          <SelectItem key={property.id} value={property.id}>
                            {property.title} - {property.city}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="rent_amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Monthly Rent (KES)</FormLabel>
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

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="deposit-paid"
                  checked={depositPaidToggle}
                  onCheckedChange={setDepositPaidToggle}
                />
                <label htmlFor="deposit-paid" className="text-sm font-medium">
                  Deposit Paid
                </label>
              </div>

              {depositPaidToggle && (
                <FormField
                  control={form.control}
                  name="deposit_paid"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Deposit Amount (KES)</FormLabel>
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
              )}
            </div>

            <div className="flex gap-4">
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="flex-1"
              >
                {isSubmitting ? 'Saving...' : (editingTenant ? 'Update Tenant' : 'Create Tenant')}
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
