
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Calendar, Home } from 'lucide-react';

const TenantLease = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Lease Agreement</h1>
        <p className="text-gray-600">View your lease details and documents</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Home className="h-8 w-8 text-emerald-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Property</p>
                <p className="text-lg font-semibold text-gray-900">Sunset Apartments</p>
                <p className="text-sm text-gray-500">Unit 1A</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Lease Period</p>
                <p className="text-lg font-semibold text-gray-900">12 Months</p>
                <p className="text-sm text-gray-500">Jan 2024 - Dec 2024</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Status</p>
                <p className="text-lg font-semibold text-green-600">Active</p>
                <p className="text-sm text-gray-500">Expires in 11 months</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lease Documents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No lease documents available</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TenantLease;
