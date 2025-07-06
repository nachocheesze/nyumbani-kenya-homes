
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Phone, Mail, Home, Plus } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

const CaretakerTenants = () => {
  const { user } = useAuth();

  // Fetch assigned properties for this caretaker
  const { data: assignments } = useQuery({
    queryKey: ['caretaker-assignments', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('caretaker_assignments')
        .select('*')
        .eq('caretaker_id', user.id);

      if (error) {
        console.error('Error fetching caretaker assignments:', error);
        return [];
      }
      return data;
    },
    enabled: !!user,
  });

  // Fetch tenants for assigned properties
  const { data: tenants, isLoading } = useQuery({
    queryKey: ['caretaker-tenants', assignments],
    queryFn: async () => {
      if (!assignments || assignments.length === 0) return [];
      
      const propertyIds = assignments.map(a => a.property_id).filter(Boolean);
      if (propertyIds.length === 0) return [];

      const { data, error } = await supabase
        .from('tenants')
        .select(`
          *,
          user:users(full_name, phone_number),
          property:properties(title, address)
        `)
        .in('property_id', propertyIds);

      if (error) {
        console.error('Error fetching tenants:', error);
        return [];
      }
      return data;
    },
    enabled: !!assignments && assignments.length > 0,
  });

  const totalTenants = tenants?.length || 0;
  const occupiedUnits = tenants?.filter(t => t.status === 'active').length || 0;
  const vacantUnits = Math.max(0, (assignments?.length || 0) - occupiedUnits);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tenants</h1>
          <p className="text-gray-600">Manage tenant information and communications</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Tenant
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-emerald-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Tenants</p>
                <p className="text-2xl font-bold text-gray-900">{totalTenants}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Home className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Occupied Units</p>
                <p className="text-2xl font-bold text-gray-900">{occupiedUnits}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Home className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Vacant Units</p>
                <p className="text-2xl font-bold text-gray-900">{vacantUnits}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tenant Directory</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto"></div>
              <p className="text-gray-500 mt-2">Loading tenants...</p>
            </div>
          ) : tenants && tenants.length > 0 ? (
            <div className="space-y-4">
              {tenants.map((tenant) => (
                <div key={tenant.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                      <Users className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{tenant.user?.full_name || 'Unknown Tenant'}</h3>
                      <p className="text-sm text-gray-500">{tenant.property?.title || 'Unknown Property'}</p>
                      <p className="text-xs text-gray-400">{tenant.property?.address}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {tenant.user?.phone_number && (
                      <Button variant="outline" size="sm">
                        <Phone className="h-4 w-4" />
                      </Button>
                    )}
                    <Button variant="outline" size="sm">
                      <Mail className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No tenants found for your assigned properties</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CaretakerTenants;
