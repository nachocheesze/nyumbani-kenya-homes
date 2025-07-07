import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate, useParams } from 'react-router-dom';

const propertySchema = z.object({
  title: z.string().min(1, 'Property name is required'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  county: z.string().min(1, 'County is required'),
  property_type: z.string().min(1, 'Property type is required'),
  bedrooms: z.number().min(0).optional(),
  bathrooms: z.number().min(0).optional(),
  rent_amount: z.number().min(0).optional(),
  deposit_amount: z.number().min(0).optional(),
  description: z.string().optional(),
  landlord_id: z.string().optional(),
  agent_id: z.string().optional()
});

type PropertyFormData = z.infer<typeof propertySchema>;

interface AddPropertyFormProps {
  onSuccess?: () => void;
  editingProperty?: any;
}

const AddPropertyForm: React.FC<AddPropertyFormProps> = ({ onSuccess, editingProperty }) => {
  const { userProfile } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { id } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [landlords, setLandlords] = useState<any[]>([]);
  const [agents, setAgents] = useState<any[]>([]);
  const [propertyToEdit, setPropertyToEdit] = useState(editingProperty);

  // Fetch property data if editing
  useEffect(() => {
    if (id && !editingProperty) {
      fetchPropertyData();
    }
  }, [id]);

  // Fetch landlords and agents for admin/super_admin
  useEffect(() => {
    if (['admin', 'super_admin'].includes(userProfile?.role || '')) {
      fetchLandlords();
      fetchAgents();
    }
  }, [userProfile]);

  const fetchPropertyData = async () => {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setPropertyToEdit(data);
    } catch (error) {
      console.error('Error fetching property:', error);
      toast({
        title: "Error",
        description: "Failed to load property data",
        variant: "destructive"
      });
    }
  };

  const fetchLandlords = async () => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('id, full_name')
        .eq('role', 'landlord');

      if (error) throw error;
      setLandlords(data || []);
    } catch (error) {
      console.error('Error fetching landlords:', error);
    }
  };

  const fetchAgents = async () => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('id, full_name')
        .eq('role', 'agent');

      if (error) throw error;
      setAgents(data || []);
    } catch (error) {
      console.error('Error fetching agents:', error);
    }
  };

  const form = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema),
    defaultValues: propertyToEdit ? {
      title: propertyToEdit.title || '',
      address: propertyToEdit.address || '',
      city: propertyToEdit.city || '',
      county: propertyToEdit.county || '',
      property_type: propertyToEdit.property_type || '',
      bedrooms: propertyToEdit.bedrooms || 0,
      bathrooms: propertyToEdit.bathrooms || 0,
      rent_amount: propertyToEdit.rent_amount || 0,
      deposit_amount: propertyToEdit.deposit_amount || 0,
      description: propertyToEdit.description || '',
      landlord_id: propertyToEdit.landlord_id || '',
      agent_id: propertyToEdit.agent_id || ''
    } : {
      title: '',
      address: '',
      city: '',
      county: '',
      property_type: '',
      bedrooms: 0,
      bathrooms: 0,
      rent_amount: 0,
      deposit_amount: 0,
      description: '',
      landlord_id: '',
      agent_id: ''
    }
  });

  // Update form when propertyToEdit changes
  useEffect(() => {
    if (propertyToEdit) {
      form.reset({
        title: propertyToEdit.title || '',
        address: propertyToEdit.address || '',
        city: propertyToEdit.city || '',
        county: propertyToEdit.county || '',
        property_type: propertyToEdit.property_type || '',
        bedrooms: propertyToEdit.bedrooms || 0,
        bathrooms: propertyToEdit.bathrooms || 0,
        rent_amount: propertyToEdit.rent_amount || 0,
        deposit_amount: propertyToEdit.deposit_amount || 0,
        description: propertyToEdit.description || '',
        landlord_id: propertyToEdit.landlord_id || '',
        agent_id: propertyToEdit.agent_id || ''
      });
    }
  }, [propertyToEdit, form]);

  const onSubmit = async (data: PropertyFormData) => {
    setIsSubmitting(true);
    
    try {
      // Determine landlord_id based on user role
      let landlord_id = data.landlord_id;
      if (userProfile?.role === 'landlord') {
        landlord_id = userProfile.id;
      } else if (userProfile?.role === 'agent' && !landlord_id) {
        // For agents, we might need to get the landlord from their assignments
        landlord_id = userProfile.id; // Temporary - should be handled differently
      }

      const propertyData = {
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
        landlord_id: landlord_id,
        agent_id: data.agent_id || null,
        is_available: true
      };

      let result;
      if (propertyToEdit) {
        result = await supabase
          .from('properties')
          .update(propertyData)
          .eq('id', propertyToEdit.id);
      } else {
        result = await supabase
          .from('properties')
          .insert(propertyData);
      }

      if (result.error) throw result.error;

      toast({
        title: "Success",
        description: `Property ${propertyToEdit ? 'updated' : 'created'} successfully`
      });

      if (onSuccess) onSuccess();
      if (!propertyToEdit) {
        form.reset();
      }
      navigate('/dashboard/property-management/properties');
    } catch (error) {
      console.error('Error saving property:', error);
      toast({
        title: "Error",
        description: `Failed to ${propertyToEdit ? 'update' : 'create'} property`,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const propertyTypes = [
    'Apartment',
    'Bedsitter',
    'House',
    'Townhouse',
    'Villa',
    'Studio',
    'Commercial'
  ];

  const canAssignLandlord = ['admin', 'super_admin'].includes(userProfile?.role || '');
  const canAssignAgent = ['landlord', 'admin', 'super_admin', 'real_estate_company'].includes(userProfile?.role || '');

  return (
    <Card>
      <CardHeader>
        <CardTitle>{propertyToEdit ? 'Edit Property' : 'Add New Property'}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Property Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter property name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="property_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Property Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select property type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {propertyTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter full address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter city" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="county"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>County</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter county" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <FormField
                control={form.control}
                name="bedrooms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bedrooms</FormLabel>
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
                name="bathrooms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bathrooms</FormLabel>
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
                name="deposit_amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deposit (KES)</FormLabel>
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
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter property description..." 
                      className="min-h-20"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {canAssignLandlord && (
              <FormField
                control={form.control}
                name="landlord_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Assign to Landlord</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select landlord" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {landlords.map((landlord) => (
                          <SelectItem key={landlord.id} value={landlord.id}>
                            {landlord.full_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {canAssignAgent && (
              <FormField
                control={form.control}
                name="agent_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Assign Agent (Optional)</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select agent" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="">No Agent</SelectItem>
                        {agents.map((agent) => (
                          <SelectItem key={agent.id} value={agent.id}>
                            {agent.full_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <div className="flex gap-4">
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="flex-1"
              >
                {isSubmitting ? 'Saving...' : (propertyToEdit ? 'Update Property' : 'Create Property')}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate('/dashboard/property-management/properties')}
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

export default AddPropertyForm;
