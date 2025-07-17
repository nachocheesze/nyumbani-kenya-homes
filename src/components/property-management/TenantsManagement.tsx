
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Edit, Users, Phone, Mail } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const TenantsManagement = () => {
  const { userProfile } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTenants = useCallback(async () => {
    try {
      let query = supabase
        .from('tenants')
        .select(`
          *,
          users (full_name, phone_number),
          properties (title, city, county)
        `);
      
      // Role-based filtering
      if (userProfile?.role === 'landlord') {
        query = query.eq('landlord_id', userProfile.id);
      }
      
      const { data, error } = await query.order('created_at', { ascending: false });
      if (error) throw error;
      setTenants(data || []);
    } catch (error) {
      console.error('Error fetching tenants:', error);
      toast({
        title: "Error",
        description: "Failed to load tenants",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  }, [userProfile, toast]);

  useEffect(() => {
    fetchTenants();
  }, [fetchTenants]);

  const canManageTenants = ['super_admin', 'admin', 'landlord', 'agent'].includes(userProfile?.role || '');

  if (!canManageTenants) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">You don't have permission to manage tenants.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tenant Management</h1>
          <p className="text-gray-600">Manage your tenants</p>
        </div>
        <Button onClick={() => navigate('/dashboard/property-management/tenants/add')}>
          <Plus className="h-4 w-4 mr-2" />
          Add New Tenant
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-emerald-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Tenants</p>
                <p className="text-2xl font-bold text-gray-900">{tenants.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Leases</p>
                <p className="text-2xl font-bold text-gray-900">
                  {tenants.filter(t => t.status === 'active').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                <p className="text-2xl font-bold text-gray-900">
                  KES {tenants.reduce((sum, t) => sum + (t.rent_amount || 0), 0).toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Tenants ({tenants.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {tenants.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">No tenants found</p>
              <Button onClick={() => navigate('/dashboard/property-management/tenants/add')}>
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Tenant
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tenant Name</TableHead>
                  <TableHead>Property</TableHead>
                  <TableHead>Rent</TableHead>
                  <TableHead>Move-in Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tenants.map((tenant) => (
                  <TableRow key={tenant.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="h-8 w-8 bg-emerald-100 rounded-full flex items-center justify-center">
                          <Users className="h-4 w-4 text-emerald-600" />
                        </div>
                        <div>
                          <p className="font-medium">{tenant.users?.full_name || 'N/A'}</p>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            {tenant.users?.phone_number && (
                              <span className="flex items-center gap-1">
                                <Phone className="h-3 w-3" />
                                {tenant.users.phone_number}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{tenant.properties?.title || 'N/A'}</p>
                        <p className="text-sm text-gray-500">
                          {tenant.properties?.city}, {tenant.properties?.county}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>KES {tenant.rent_amount?.toLocaleString() || '0'}</TableCell>
                    <TableCell>
                      {tenant.move_in_date ? new Date(tenant.move_in_date).toLocaleDateString() : '-'}
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        tenant.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {tenant.status || 'Active'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => navigate(`/dashboard/property-management/tenants/edit/${tenant.id}`)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
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

export default TenantsManagement;
