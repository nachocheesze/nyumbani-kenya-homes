
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const AddPropertyForm = () => {
  const { userProfile } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    title: '',
    property_type: '',
    address: '',
    city: '',
    county: '',
    bedrooms: '',
    bathrooms: '',
    rent_amount: '',
    deposit_amount: '',
    description: '',
    amenities: [] as string[],
    features: [] as string[],
    is_available: true,
    available_from: '',
    landlord_id: '',
    agent_id: ''
  });

  const [loading, setLoading] = useState(false);
  const [landlords, setLandlords] = useState<any[]>([]);
  const [agents, setAgents] = useState<any[]>([]);

  const propertyTypes = [
    { value: 'apartment', label: 'Apartment' },
    { value: 'house', label: 'House' },
    { value: 'bedsitter', label: 'Bedsitter' },
    { value: 'studio', label: 'Studio' },
    { value: 'villa', label: 'Villa' },
    { value: 'townhouse', label: 'Townhouse' },
    { value: 'commercial', label: 'Commercial' }
  ];

  const availableAmenities = [
    'WiFi', 'Parking', 'Water', 'Electricity', 'Security', 'Generator', 
    'Swimming Pool', 'Gym', 'Garden', 'Balcony', 'Elevator', 'CCTV'
  ];

  const availableFeatures = [
    'Furnished', 'Semi-Furnished', 'Unfurnished', 'Pet Friendly', 
    'Air Conditioning', 'Heating', 'Fireplace', 'Storage'
  ];

  const kenyanCounties = [
    'Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret', 'Thika', 'Malindi',
    'Kitale', 'Garissa', 'Kakamega', 'Kisii', 'Meru', 'Nyeri', 'Machakos',
    'Kilifi', 'Uasin Gishu', 'Kiambu', 'Laikipia', 'Kajiado', 'Murang\'a'
  ];

  useEffect(() => {
    fetchUsersForAssignment();
    if (isEditing) {
      fetchPropertyData();
    }
  }, [isEditing, id]);

  const fetchUsersForAssignment = async () => {
    try {
      if (userProfile?.role === 'super_admin' || userProfile?.role === 'admin') {
        // Super admin and admin can assign to any landlord
        const { data: landlordData } = await supabase
          .from('users')
          .select('id, full_name')
          .eq('role', 'landlord');
        setLandlords(landlordData || []);

        // Can also assign to any agent
        const { data: agentData } = await supabase
          .from('users')
          .select('id, full_name')
          .eq('role', 'agent');
        setAgents(agentData || []);
      } else if (userProfile?.role === 'real_estate_company') {
        // Real estate company can assign to their agents
        const { data: companyAgents } = await supabase
          .from('real_estate_company_agents')
          .select('agent_id, users!inner(id, full_name)')
          .eq('company_id', userProfile.id);
        
        const agentsList = companyAgents?.map(ca => ca.users) || [];
        setAgents(agentsList);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchPropertyData = async () => {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      setFormData({
        title: data.title || '',
        property_type: data.property_type || '',
        address: data.address || '',
        city: data.city || '',
        county: data.county || '',
        bedrooms: data.bedrooms?.toString() || '',
        bathrooms: data.bathrooms?.toString() || '',
        rent_amount: data.rent_amount?.toString() || '',
        deposit_amount: data.deposit_amount?.toString() || '',
        description: data.description || '',
        amenities: data.amenities || [],
        features: data.features || [],
        is_available: data.is_available ?? true,
        available_from: data.available_from || '',
        landlord_id: data.landlord_id || '',
        agent_id: data.agent_id || ''
      });
    } catch (error) {
      console.error('Error fetching property data:', error);
      toast({
        title: "Error",
        description: "Failed to load property data",
        variant: "destructive"
      });
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAmenityToggle = (amenity: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const handleFeatureToggle = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const propertyData = {
        title: formData.title,
        property_type: formData.property_type,
        address: formData.address,
        city: formData.city,
        county: formData.county,
        bedrooms: formData.bedrooms ? parseInt(formData.bedrooms) : null,
        bathrooms: formData.bathrooms ? parseInt(formData.bathrooms) : null,
        rent_amount: formData.rent_amount ? parseFloat(formData.rent_amount) : null,
        deposit_amount: formData.deposit_amount ? parseFloat(formData.deposit_amount) : null,
        description: formData.description,
        amenities: formData.amenities,
        features: formData.features,
        is_available: formData.is_available,
        available_from: formData.available_from || null,
        landlord_id: formData.landlord_id || (userProfile?.role === 'landlord' ? userProfile.id : null),
        agent_id: formData.agent_id || (userProfile?.role === 'agent' ? userProfile.id : null)
      };

      let result;
      if (isEditing) {
        result = await supabase
          .from('properties')
          .update(propertyData)
          .eq('id', id);
      } else {
        result = await supabase
          .from('properties')
          .insert([propertyData]);
      }

      if (result.error) throw result.error;

      toast({
        title: "Success",
        description: `Property ${isEditing ? 'updated' : 'created'} successfully`
      });

      navigate('/dashboard/property-management/properties');
    } catch (error) {
      console.error('Error saving property:', error);
      toast({
        title: "Error",
        description: `Failed to ${isEditing ? 'update' : 'create'} property`,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 md:space-y-6 w-full max-w-full">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <Button
          variant="outline"
          onClick={() => navigate('/dashboard/property-management/properties')}
          className="w-full sm:w-auto"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Properties
        </Button>
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">
            {isEditing ? 'Edit Property' : 'Add New Property'}
          </h1>
          <p className="text-sm md:text-base text-gray-600">
            {isEditing ? 'Update property information' : 'Create a new property listing'}
          </p>
        </div>
      </div>

      <Card className="w-full max-w-full">
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">Property Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Property Name *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  required
                  placeholder="Enter property name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="property_type">Property Type *</Label>
                <Select value={formData.property_type} onValueChange={(value) => handleInputChange('property_type', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select property type" />
                  </SelectTrigger>
                  <SelectContent>
                    {propertyTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Location */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address">Address *</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  required
                  placeholder="Enter property address"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    required
                    placeholder="Enter city"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="county">County *</Label>
                  <Select value={formData.county} onValueChange={(value) => handleInputChange('county', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select county" />
                    </SelectTrigger>
                    <SelectContent>
                      {kenyanCounties.map((county) => (
                        <SelectItem key={county} value={county}>
                          {county}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Property Details */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bedrooms">Bedrooms</Label>
                <Input
                  id="bedrooms"
                  type="number"
                  value={formData.bedrooms}
                  onChange={(e) => handleInputChange('bedrooms', e.target.value)}
                  placeholder="0"
                  min="0"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bathrooms">Bathrooms</Label>
                <Input
                  id="bathrooms"
                  type="number"
                  value={formData.bathrooms}
                  onChange={(e) => handleInputChange('bathrooms', e.target.value)}
                  placeholder="0"
                  min="0"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="rent_amount">Monthly Rent (KES)</Label>
                <Input
                  id="rent_amount"
                  type="number"
                  value={formData.rent_amount}
                  onChange={(e) => handleInputChange('rent_amount', e.target.value)}
                  placeholder="0"
                  min="0"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="deposit_amount">Deposit (KES)</Label>
                <Input
                  id="deposit_amount"
                  type="number"
                  value={formData.deposit_amount}
                  onChange={(e) => handleInputChange('deposit_amount', e.target.value)}
                  placeholder="0"
                  min="0"
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Enter property description"
                rows={4}
              />
            </div>

            {/* Amenities */}
            <div className="space-y-4">
              <Label>Amenities</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {availableAmenities.map((amenity) => (
                  <div key={amenity} className="flex items-center space-x-2">
                    <Checkbox
                      id={`amenity-${amenity}`}
                      checked={formData.amenities.includes(amenity)}
                      onCheckedChange={() => handleAmenityToggle(amenity)}
                    />
                    <Label htmlFor={`amenity-${amenity}`} className="text-sm font-normal">
                      {amenity}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="space-y-4">
              <Label>Features</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {availableFeatures.map((feature) => (
                  <div key={feature} className="flex items-center space-x-2">
                    <Checkbox
                      id={`feature-${feature}`}
                      checked={formData.features.includes(feature)}
                      onCheckedChange={() => handleFeatureToggle(feature)}
                    />
                    <Label htmlFor={`feature-${feature}`} className="text-sm font-normal">
                      {feature}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Assignment Fields for Admin/Super Admin */}
            {(userProfile?.role === 'super_admin' || userProfile?.role === 'admin' || userProfile?.role === 'real_estate_company') && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {landlords.length > 0 && (
                  <div className="space-y-2">
                    <Label htmlFor="landlord_id">Assign Landlord</Label>
                    <Select value={formData.landlord_id} onValueChange={(value) => handleInputChange('landlord_id', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select landlord" />
                      </SelectTrigger>
                      <SelectContent>
                        {landlords.map((landlord) => (
                          <SelectItem key={landlord.id} value={landlord.id}>
                            {landlord.full_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {agents.length > 0 && (
                  <div className="space-y-2">
                    <Label htmlFor="agent_id">Assign Agent</Label>
                    <Select value={formData.agent_id} onValueChange={(value) => handleInputChange('agent_id', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select agent" />
                      </SelectTrigger>
                      <SelectContent>
                        {agents.map((agent) => (
                          <SelectItem key={agent.id} value={agent.id}>
                            {agent.full_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            )}

            {/* Availability */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="is_available"
                  checked={formData.is_available}
                  onCheckedChange={(checked) => handleInputChange('is_available', checked)}
                />
                <Label htmlFor="is_available">Property is available</Label>
              </div>

              <div className="space-y-2">
                <Label htmlFor="available_from">Available From</Label>
                <Input
                  id="available_from"
                  type="date"
                  value={formData.available_from}
                  onChange={(e) => handleInputChange('available_from', e.target.value)}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto"
              >
                {loading ? 'Saving...' : (isEditing ? 'Update Property' : 'Create Property')}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/dashboard/property-management/properties')}
                className="w-full sm:w-auto"
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddPropertyForm;
