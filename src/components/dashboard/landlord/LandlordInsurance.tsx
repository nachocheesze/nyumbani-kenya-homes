
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Calendar, AlertTriangle, Plus } from 'lucide-react';

const LandlordInsurance = () => {
  const policies = [
    {
      id: 1,
      property: "Sunset Apartments",
      provider: "Madison Insurance",
      policyNumber: "POL-2024-001",
      coverage: "KES 10M",
      premium: "KES 120,000/year",
      startDate: "Jan 1, 2024",
      endDate: "Dec 31, 2024",
      status: "Active",
      daysUntilRenewal: 45
    },
    {
      id: 2,
      property: "Garden View Flats",
      provider: "Britam Insurance",
      policyNumber: "POL-2024-002",
      coverage: "KES 8M",
      premium: "KES 95,000/year",
      startDate: "Mar 15, 2024",
      endDate: "Mar 14, 2025",
      status: "Active",
      daysUntilRenewal: 128
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Insurance Coverage</h1>
          <p className="text-gray-600">Manage your property insurance policies</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Policy
        </Button>
      </div>

      {/* Insurance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-emerald-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Policies</p>
                <p className="text-2xl font-bold text-gray-900">2</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Coverage</p>
                <p className="text-2xl font-bold text-gray-900">KES 18M</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Annual Premium</p>
                <p className="text-2xl font-bold text-gray-900">KES 215K</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <AlertTriangle className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Due for Renewal</p>
                <p className="text-2xl font-bold text-gray-900">1</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Policies List */}
      <Card>
        <CardHeader>
          <CardTitle>Insurance Policies</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {policies.map((policy) => (
              <div key={policy.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Shield className="h-6 w-6 text-emerald-600" />
                    <div>
                      <h3 className="font-semibold">{policy.property}</h3>
                      <p className="text-sm text-gray-600">{policy.provider} • {policy.policyNumber}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 text-xs rounded ${
                      policy.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {policy.status}
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Coverage Amount</p>
                    <p className="font-medium">{policy.coverage}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Annual Premium</p>
                    <p className="font-medium">{policy.premium}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Policy Period</p>
                    <p className="font-medium">{policy.startDate} - {policy.endDate}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Renewal Status</p>
                    <p className={`font-medium ${policy.daysUntilRenewal < 60 ? 'text-yellow-600' : 'text-green-600'}`}>
                      {policy.daysUntilRenewal} days left
                    </p>
                  </div>
                </div>
                
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    {policy.daysUntilRenewal < 60 && (
                      <span className="text-yellow-600">Renewal due soon</span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">View Policy</Button>
                    <Button variant="outline" size="sm">Renew</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LandlordInsurance;
