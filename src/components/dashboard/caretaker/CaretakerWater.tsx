
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Droplets, Plus, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

const CaretakerWater = () => {
  const waterIssues = [
    { id: 1, property: "Greenfield Heights - Block A", issue: "Low water pressure", unit: "Multiple units", priority: "High", status: "In Progress", reported: "2 hours ago" },
    { id: 2, property: "Sunrise Apartments", issue: "Water pump maintenance", unit: "Building-wide", priority: "Medium", status: "Scheduled", reported: "1 day ago" },
    { id: 3, property: "Garden View Complex", issue: "Leaky pipe in basement", unit: "Common area", priority: "High", status: "Pending", reported: "3 hours ago" },
    { id: 4, property: "Greenfield Heights - Block B", issue: "Water tank cleaning", unit: "Building-wide", priority: "Low", status: "Completed", reported: "2 days ago" }
  ];

  const waterMetrics = [
    { property: "Greenfield Heights", pressure: "Normal", tankLevel: "85%", lastMaintenance: "2 weeks ago", status: "good" },
    { property: "Sunrise Apartments", pressure: "Low", tankLevel: "45%", lastMaintenance: "1 month ago", status: "warning" },
    { property: "Garden View Complex", pressure: "Normal", tankLevel: "92%", lastMaintenance: "1 week ago", status: "good" }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'In Progress':
        return <Clock className="h-4 w-4 text-blue-600" />;
      case 'Pending':
        return <AlertTriangle className="h-4 w-4 text-orange-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Water Management</h1>
          <p className="text-gray-600">Monitor and manage water systems</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Report Issue
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Issues</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Needs attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Water Pressure</CardTitle>
            <Droplets className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Normal</div>
            <p className="text-xs text-muted-foreground">2/3 properties</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tank Levels</CardTitle>
            <Droplets className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">74%</div>
            <p className="text-xs text-muted-foreground">Average level</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Maintenance Due</CardTitle>
            <Clock className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>
      </div>

      {/* Water System Status */}
      <Card>
        <CardHeader>
          <CardTitle>Property Water Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {waterMetrics.map((metric, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg ${
                    metric.status === 'good' ? 'bg-green-100' : 'bg-yellow-100'
                  }`}>
                    <Droplets className={`h-5 w-5 ${
                      metric.status === 'good' ? 'text-green-600' : 'text-yellow-600'
                    }`} />
                  </div>
                  <div>
                    <p className="font-medium">{metric.property}</p>
                    <div className="flex gap-4 text-sm text-gray-600">
                      <span>Pressure: {metric.pressure}</span>
                      <span>Tank: {metric.tankLevel}</span>
                      <span>Last maintenance: {metric.lastMaintenance}</span>
                    </div>
                  </div>
                </div>
                
                <div className={`w-3 h-3 rounded-full ${
                  metric.status === 'good' ? 'bg-green-500' : 'bg-yellow-500'
                }`}></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Water Issues */}
      <Card>
        <CardHeader>
          <CardTitle>Water Issues & Maintenance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {waterIssues.map((issue) => (
              <div key={issue.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  {getStatusIcon(issue.status)}
                  <div>
                    <p className="font-medium">{issue.issue}</p>
                    <p className="text-sm text-gray-600">{issue.property} - {issue.unit}</p>
                    <p className="text-xs text-gray-500">Reported {issue.reported}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(issue.priority)}`}>
                    {issue.priority} Priority
                  </span>
                  
                  <span className="text-sm text-gray-600">{issue.status}</span>
                  
                  <Button variant="outline" size="sm">
                    Update
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

export default CaretakerWater;
