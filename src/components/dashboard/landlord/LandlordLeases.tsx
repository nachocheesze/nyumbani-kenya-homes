
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Calendar, User, Home } from 'lucide-react';

const LandlordLeases = () => {
  const leases = [
    {
      id: 1,
      tenant: "John Doe",
      property: "Sunset Apartments - Unit 1A",
      startDate: "Jan 1, 2024",
      endDate: "Dec 31, 2024",
      monthlyRent: "KES 75,000",
      deposit: "KES 150,000",
      status: "Active",
      daysLeft: 45
    },
    {
      id: 2,
      tenant: "Jane Smith",
      property: "Garden View Flats - Unit 2B",
      startDate: "Mar 15, 2024",
      endDate: "Mar 14, 2025",
      monthlyRent: "KES 60,000",
      deposit: "KES 120,000",
      status: "Active",
      daysLeft: 128
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Lease Agreements</h1>
          <p className="text-gray-600">Track and manage your lease agreements</p>
        </div>
        <Button className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          Create Lease
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-emerald-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Leases</p>
                <p className="text-2xl font-bold text-gray-900">16</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Expiring Soon</p>
                <p className="text-2xl font-bold text-yellow-600">3</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Up for Renewal</p>
                <p className="text-2xl font-bold text-blue-600">2</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Deposits</p>
                <p className="text-2xl font-bold text-gray-900">KES 2.1M</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Leases List */}
      <Card>
        <CardHeader>
          <CardTitle>All Lease Agreements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {leases.map((lease) => (
              <div key={lease.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <FileText className="h-6 w-6 text-emerald-600" />
                    <div>
                      <h3 className="font-semibold">{lease.tenant}</h3>
                      <p className="text-sm text-gray-600 flex items-center gap-1">
                        <Home className="h-3 w-3" />
                        {lease.property}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 text-xs rounded ${
                      lease.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {lease.status}
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Start Date</p>
                    <p className="font-medium">{lease.startDate}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">End Date</p>
                    <p className="font-medium">{lease.endDate}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Monthly Rent</p>
                    <p className="font-medium">{lease.monthlyRent}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Security Deposit</p>
                    <p className="font-medium">{lease.deposit}</p>
                  </div>
                </div>
                
                <div className="mt-3 flex items-center justify-between">
                  <p className="text-sm text-gray-600">
                    <Calendar className="h-4 w-4 inline mr-1" />
                    {lease.daysLeft} days until expiry
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">View Details</Button>
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

export default LandlordLeases;
