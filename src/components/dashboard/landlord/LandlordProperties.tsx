
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building, Plus, Eye, Edit, Trash2 } from 'lucide-react';

const LandlordProperties = () => {
  const properties = [
    {
      id: 1,
      name: "Sunset Apartments",
      location: "Westlands, Nairobi",
      units: 12,
      occupied: 10,
      monthlyRent: "KES 850,000",
      status: "Active"
    },
    {
      id: 2,
      name: "Garden View Flats",
      location: "Karen, Nairobi",
      units: 8,
      occupied: 6,
      monthlyRent: "KES 480,000",
      status: "Active"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Properties</h1>
          <p className="text-gray-600">Manage your rental properties</p>
        </div>
        <Link to="/dashboard/property-management/properties/add">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Property
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Building className="h-8 w-8 text-emerald-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Properties</p>
                <p className="text-2xl font-bold text-gray-900">2</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Units</p>
                <p className="text-2xl font-bold text-gray-900">20</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Occupied Units</p>
                <p className="text-2xl font-bold text-gray-900">16</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                <p className="text-2xl font-bold text-gray-900">KES 1.3M</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Properties List */}
      <Card>
        <CardHeader>
          <CardTitle>Properties</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {properties.map((property) => (
              <div key={property.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <Building className="h-8 w-8 text-emerald-600" />
                  <div>
                    <h3 className="font-semibold">{property.name}</h3>
                    <p className="text-sm text-gray-600">{property.location}</p>
                    <p className="text-sm text-gray-500">
                      {property.occupied}/{property.units} units occupied
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{property.monthlyRent}/month</p>
                  <p className="text-sm text-green-600">{property.status}</p>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Link to={`/dashboard/property-management/properties/edit/${property.id}`}>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LandlordProperties;
