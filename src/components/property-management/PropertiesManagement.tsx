
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Edit, Eye, Trash2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { useUserRole } from '@/hooks/useUserRole';
import { useQuery } from '@tanstack/react-query';

const PropertiesManagement = () => {
  const { userProfile } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { role, isSuperAdmin, isLoading: isRoleLoading } = useUserRole();

  const { data: properties, isLoading, error, refetch } = useQuery({
    queryKey: ['properties', userProfile?.id, role],
    queryFn: async () => {
      if (!userProfile?.id || isRoleLoading) return [];

      let query = supabase.from('properties').select('*');

      if (isSuperAdmin || role === 'admin') {
        // Admins and Super Admins see all properties
      } else if (role === 'landlord') {
        query = query.eq('landlord_id', userProfile.id);
      } else if (role === 'agent') {
        query = query.eq('agent_id', userProfile.id);
      } else if (role === 'real_estate_company') {
        // Assuming company_id column in properties table and userProfile has company_id
        // This needs to be confirmed based on userProfile structure or a separate lookup
        query = query.eq('company_id', userProfile.company_id);
      } else {
        return [];
      }

      const { data, error } = await query.order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    },
    enabled: !!userProfile?.id && !isRoleLoading,
  });

  const handleDelete = async (propertyId: string) => {
    if (!confirm('Are you sure you want to delete this property?')) return;

    try {
      const { error } = await supabase
        .from('properties')
        .delete()
        .eq('id', propertyId);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Property deleted successfully',
      });

      refetch();
    } catch (error) {
      console.error('Error deleting property:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete property',
        variant: 'destructive',
      });
    }
  };

  const canManageProperties = ['super_admin', 'admin', 'landlord', 'agent', 'real_estate_company'].includes(role || '');

  if (isRoleLoading || isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Error loading properties: {error.message}</p>
      </div>
    );
  }

  if (!canManageProperties) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">You don't have permission to manage properties.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Property Management</h1>
          <p className="text-gray-600">Manage your properties</p>
        </div>
        <Button onClick={() => navigate('/properties/new')}>
          <Plus className="h-4 w-4 mr-2" />
          Add New Property
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Properties ({properties?.length || 0})</CardTitle>
        </CardHeader>
        <CardContent>
          {properties?.length === 0 ? (
            <div className="text-center text-muted mt-10">
              No properties found yet. Click "Add Property" to get started.
              <Button onClick={() => navigate('/dashboard/property-management/properties/add')} className="mt-4">
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Property
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Property Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Rent</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {properties?.map((property) => (
                  <TableRow key={property.id}>
                    <TableCell className="font-medium">{property.title}</TableCell>
                    <TableCell>{property.property_type}</TableCell>
                    <TableCell>{property.city}, {property.county}</TableCell>
                    <TableCell>
                      {property.rent_amount ? `KES ${property.rent_amount.toLocaleString()}` : '-'}
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        property.is_available
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {property.is_available ? 'Available' : 'Occupied'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/properties/${property.id}`)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/properties/edit/${property.id}`)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        {(isSuperAdmin || role === 'admin' || property.landlord_id === userProfile?.id) && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(property.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PropertiesManagement;
