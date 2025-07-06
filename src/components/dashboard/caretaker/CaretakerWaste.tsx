
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, Plus, Calendar, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const CaretakerWaste = () => {
  const collectionSchedule = [
    { id: 1, property: "Greenfield Heights - Block A", type: "General Waste", nextCollection: "Tomorrow, 8:00 AM", status: "Scheduled", bins: 4 },
    { id: 2, property: "Sunrise Apartments", type: "Recycling", nextCollection: "Today, 2:00 PM", status: "Ready", bins: 3 },
    { id: 3, property: "Garden View Complex", type: "Organic Waste", nextCollection: "In 2 days", status: "Scheduled", bins: 2 },
    { id: 4, property: "Greenfield Heights - Block B", type: "General Waste", nextCollection: "Yesterday", status: "Overdue", bins: 5 }
  ];

  const wasteMetrics = [
    { property: "Greenfield Heights", generalWaste: "4 bins", recycling: "2 bins", organic: "1 bin", lastCollection: "3 days ago" },
    { property: "Sunrise Apartments", generalWaste: "3 bins", recycling: "3 bins", organic: "2 bins", lastCollection: "2 days ago" },
    { property: "Garden View Complex", generalWaste: "2 bins", recycling: "1 bin", organic: "2 bins", lastCollection: "1 day ago" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ready':
        return 'bg-green-100 text-green-800';
      case 'Scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'Overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Ready':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'Scheduled':
        return <Clock className="h-4 w-4 text-blue-600" />;
      case 'Overdue':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Waste Management</h1>
          <p className="text-gray-600">Monitor waste collection and recycling</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Collection
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Collections</CardTitle>
            <Calendar className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Scheduled</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bins</CardTitle>
            <Trash2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14</div>
            <p className="text-xs text-muted-foreground">Across all properties</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue Collections</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">Needs immediate attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recycling Rate</CardTitle>
            <Trash2 className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68%</div>
            <p className="text-xs text-muted-foreground">+5% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Collection Schedule */}
      <Card>
        <CardHeader>
          <CardTitle>Collection Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {collectionSchedule.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  {getStatusIcon(item.status)}
                  <div>
                    <p className="font-medium">{item.property}</p>
                    <p className="text-sm text-gray-600">{item.type} - {item.bins} bins</p>
                    <p className="text-xs text-gray-500">Next: {item.nextCollection}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                  
                  <Button variant="outline" size="sm">
                    {item.status === 'Overdue' ? 'Collect Now' : 'Update'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Property Waste Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Property Waste Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {wasteMetrics.map((metric, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-medium">{metric.property}</h3>
                  <span className="text-xs text-gray-500">Last collection: {metric.lastCollection}</span>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gray-500 rounded"></div>
                    <span>General: {metric.generalWaste}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded"></div>
                    <span>Recycling: {metric.recycling}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded"></div>
                    <span>Organic: {metric.organic}</span>
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

export default CaretakerWaste;
