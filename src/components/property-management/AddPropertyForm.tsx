
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
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

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
  agent_id: z.string().optional(),
  image_files: z.array(z.instanceof(File)).optional(),
  amenities: z.array(z.string()).optional()
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [landlords, setLandlords] = useState<any[]>([]);
  const [agents, setAgents] = useState<any[]>([]);

  useEffect(() => {
    const fetchUsersByRole = async () => {
      // Fetch Landlords
      const { data: landlordsData, error: landlordsError } = await supabase
        .from('profiles')
        .select('id, full_name')
        .eq('role', 'landlord');
      if (landlordsError) {
        console.error('Error fetching landlords:', landlordsError);
        toast({
          title: "Error",
          description: "Failed to load landlords.",
          variant: "destructive"
        });
      } else {
        setLandlords(landlordsData || []);
      }

      // Fetch Agents
      const { data: agentsData, error: agentsError } = await supabase
        .from('profiles')
        .select('id, full_name')
        .eq('role', 'agent');
      if (agentsError) {
        console.error('Error fetching agents:', agentsError);
        toast({
          title: "Error",
          description: "Failed to load agents.",
          variant: "destructive"
        });
      } else {
        setAgents(agentsData || []);
      }
    };

    if (userProfile?.role === 'admin' || userProfile?.role === 'real_estate_company') {
      fetchUsersByRole();
    }
  }, [userProfile, toast]);

  const form = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema),
    defaultValues: editingProperty
      ? {
          title: editingProperty.title || '',
          address: editingProperty.address || '',
          city: editingProperty.city || '',
          county: editingProperty.county || '',
          property_type: editingProperty.property_type || '',
          bedrooms: editingProperty.bedrooms || 0,
          bathrooms: editingProperty.bathrooms || 0,
          rent_amount: editingProperty.rent_amount || 0,
          deposit_amount: editingProperty.deposit_amount || 0,
          description: editingProperty.description || '',
          landlord_id: editingProperty.landlord_id || (userProfile?.role === 'landlord' ? userProfile.id : ''),
          agent_id: editingProperty.agent_id || '',
          amenities: editingProperty.amenities || [],
          image_files: []
        }
      : {
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
          landlord_id: userProfile?.role === 'landlord' ? userProfile.id : '',
          agent_id: '',
          amenities: [],
          image_files: []
        }
  });

  const onSubmit = async (data: PropertyFormData) => {
    setIsSubmitting(true);
    
    try {
      const propertyData: any = {
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
        landlord_id: userProfile?.role === 'landlord' ? userProfile.id : data.landlord_id,
        agent_id: data.agent_id || null,
        is_available: true,
        amenities: data.amenities || []
      };

      const imageUrls: string[] = [];
      if (data.image_files && data.image_files.length > 0) {
        for (const file of data.image_files) {
          const fileExt = file.name.split('.').pop();
          const fileName = `${uuidv4()}.${fileExt}`;
          const filePath = `property_images/${fileName}`;
          const { error: uploadError } = await supabase.storage
            .from('property_images')
            .upload(filePath, file);

          if (uploadError) throw uploadError;

          const { data: publicUrlData } = supabase.storage
            .from('property_images')
            .getPublicUrl(filePath);
          
          if (publicUrlData) {
            imageUrls.push(publicUrlData.publicUrl);
          }
        }
        propertyData.image_urls = imageUrls;
      }

      let result;
      if (editingProperty) {
        result = await supabase
          .from('properties')
          .update(propertyData)
          .eq('id', editingProperty.id);
      } else {
        result = await supabase
          .from('properties')
          .insert(propertyData);
      }

      if (result.error) throw result.error;

      toast({
        title: "Success",
        description: `Property ${editingProperty ? 'updated' : 'created'} successfully`
      });

      if (onSuccess) onSuccess();
      if (!editingProperty) {
        form.reset();
        navigate('/dashboard/property-management/properties');
      }
    } catch (error) {
      console.error('Error saving property:', error);
      toast({
        title: "Error",
        description: `Failed to ${editingProperty ? 'update' : 'create'} property`,
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

  const amenitiesOptions = [
    'Parking',
    'Swimming Pool',
    'Gym',
    'Balcony',
    'Garden',
    'Security',
    'Pet Friendly',
    'Furnished',
    'Dishwasher',
    'Washer/Dryer',
    'Air Conditioning',
    'Heating',
    'Internet',
    'Cable TV'
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>{editingProperty ? 'Edit Property' : 'Add New Property'}</CardTitle>
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

            { (userProfile?.role === 'admin' || userProfile?.role === 'real_estate_company') && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="landlord_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Assign Landlord</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a landlord" />
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

                <FormField
                  control={form.control}
                  name="agent_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Assign Agent</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select an agent" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
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
              </div>
            )}

            <FormField
              control={form.control}
              name="amenities"
              render={() => (
                <FormItem>
                  <FormLabel>Amenities</FormLabel>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                    {amenitiesOptions.map((item) => (
                      <FormField
                        key={item}
                        control={form.control}
                        name="amenities"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...(field.value || []), item])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== item
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {item}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image_files"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Property Images</FormLabel>
                  <FormControl>
                    <Input 
                      type="file" 
                      multiple 
                      accept="image/*"
                      onChange={(e) => field.onChange(Array.from(e.target.files || []))}
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
                {isSubmitting ? 'Saving...' : (editingProperty ? 'Update Property' : 'Create Property')}
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
