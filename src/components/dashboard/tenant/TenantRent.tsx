
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CreditCard, Calendar, AlertCircle, History } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

const TenantRent = () => {
  const { user } = useAuth();

  // Fetch tenant record
  const { data: tenantRecord } = useQuery({
    queryKey: ['tenant-record', user?.id],
    queryFn: async () => {
      if (!user) return null;
      
      const { data, error } = await supabase
        .from('tenants')
        .select(`
          *,
          property:properties(property_name, address, rent_amount)
        `)
        .eq('user_id', user.id)
        .eq('status', 'active')
        .single();

      if (error) {
        console.error('Error fetching tenant record:', error);
        return null;
      }
      return data;
    },
    enabled: !!user,
  });

  // Fetch rent payments
  const { data: rentPayments, isLoading } = useQuery({
    queryKey: ['rent-payments', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('rent_payments')
        .select('*')
        .eq('tenant_id', user.id)
        .order('due_date', { ascending: false })
        .limit(10);

      if (error) {
        console.error('Error fetching rent payments:', error);
        return [];
      }
      return data;
    },
    enabled: !!user,
  });

  const monthlyRent = tenantRecord?.rent_amount || tenantRecord?.property?.rent_amount || 0;
  const overdueAmount = rentPayments?.filter(p => p.status === 'overdue').reduce((sum, p) => sum + Number(p.amount), 0) || 0;
  const nextDueDate = rentPayments?.find(p => p.status === 'pending')?.due_date;

  const handlePayRent = () => {
    // TODO: Implement payment processing
    console.log('Pay rent clicked');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Rent Management</h1>
          <p className="text-gray-600">View and pay your rent</p>
        </div>
        <Button onClick={handlePayRent} className="flex items-center gap-2">
          <CreditCard className="h-4 w-4" />
          Pay Rent
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <CreditCard className="h-8 w-8 text-emerald-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Monthly Rent</p>
                <p className="text-2xl font-bold text-gray-900">
                  KES {monthlyRent.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Next Due Date</p>
                <p className="text-2xl font-bold text-gray-900">
                  {nextDueDate ? new Date(nextDueDate).toLocaleDateString() : 'N/A'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <AlertCircle className={`h-8 w-8 ${overdueAmount > 0 ? 'text-red-600' : 'text-green-600'}`} />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Outstanding</p>
                <p className={`text-2xl font-bold ${overdueAmount > 0 ? 'text-red-600' : 'text-green-600'}`}>
                  KES {overdueAmount.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {tenantRecord && (
        <Card>
          <CardHeader>
            <CardTitle>Property Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p><strong>Property:</strong> {tenantRecord.property?.property_name}</p>
              <p><strong>Address:</strong> {tenantRecord.property?.address}</p>
              <p><strong>Move-in Date:</strong> {tenantRecord.move_in_date ? new Date(tenantRecord.move_in_date).toLocaleDateString() : 'N/A'}</p>
              <p><strong>Lease End:</strong> {tenantRecord.lease_end_date ? new Date(tenantRecord.lease_end_date).toLocaleDateString() : 'N/A'}</p>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            Rent Payment History
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto"></div>
              <p className="text-gray-500 mt-2">Loading payment history...</p>
            </div>
          ) : rentPayments && rentPayments.length > 0 ? (
            <div className="space-y-4">
              {rentPayments.map((payment) => (
                <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">KES {Number(payment.amount).toLocaleString()}</p>
                    <p className="text-sm text-gray-500">Due: {new Date(payment.due_date).toLocaleDateString()}</p>
                    {payment.payment_date && (
                      <p className="text-sm text-gray-500">Paid: {new Date(payment.payment_date).toLocaleDateString()}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      payment.status === 'paid' ? 'bg-green-100 text-green-800' :
                      payment.status === 'overdue' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {payment.status?.toUpperCase()}
                    </span>
                    {payment.payment_method && (
                      <p className="text-xs text-gray-500 mt-1">{payment.payment_method}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <History className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No payment history available</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TenantRent;
