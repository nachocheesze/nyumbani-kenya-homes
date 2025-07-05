
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import StatsCard from '../widgets/StatsCard';
import ChartWidget from '../widgets/ChartWidget';
import { 
  Building, 
  Users, 
  DollarSign, 
  TrendingUp,
  AlertCircle,
  Plus,
  Wrench
} from 'lucide-react';
import { Link } from 'react-router-dom';

const EnhancedLandlordDashboard = () => {
  // Mock data - replace with real Supabase queries
  const revenueData = [
    { month: 'Jan', revenue: 255000, expenses: 45000 },
    { month: 'Feb', revenue: 255000, expenses: 52000 },
    { month: 'Mar', revenue: 255000, expenses: 38000 },
    { month: 'Apr', revenue: 255000, expenses: 41000 },
    { month: 'May', revenue: 255000, expenses: 49000 },
    { month: 'Jun', revenue: 255000, expenses: 47000 }
  ];

  const occupancyData = [
    { status: 'Occupied', count: 8 },
    { status: 'Vacant', count: 2 },
    { status: 'Maintenance', count: 1 }
  ];

  const maintenanceTypes = [
    { type: 'Plumbing', count: 5 },
    { type: 'Electrical', count: 3 },
    { type: 'HVAC', count: 2 },
    { type: 'General', count: 4 }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatsCard
          title="Total Properties"
          value="11"
          icon={Building}
          trend={{ value: 10, isPositive: true }}
        />
        <StatsCard
          title="Active Tenants"
          value="8"
          icon={Users}
          trend={{ value: 14.3, isPositive: true }}
        />
        <StatsCard
          title="Monthly Revenue"
          value="KSh 255,000"
          icon={DollarSign}
          trend={{ value: 5.2, isPositive: true }}
        />
        <StatsCard
          title="Occupancy Rate"
          value="73%"
          icon={TrendingUp}
          trend={{ value: -2.1, isPositive: false }}
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-emerald-50 border-emerald-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-emerald-900">Add Property</h3>
                <p className="text-sm text-emerald-700">List a new rental</p>
              </div>
              <Button size="sm" asChild>
                <Link to="/properties/new">
                  <Plus className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-orange-50 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-orange-900">Pending Rent</h3>
                <p className="text-sm text-orange-700">KSh 85,000 overdue</p>
              </div>
              <Badge variant="destructive">2 tenants</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-blue-900">Maintenance</h3>
                <p className="text-sm text-blue-700">5 active requests</p>
              </div>
              <Wrench className="h-5 w-5 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trends */}
        <ChartWidget
          title="Revenue vs Expenses"
          description="Monthly financial overview"
          data={revenueData}
          type="bar"
          dataKey="revenue"
          xAxisKey="month"
          color="#10b981"
        />

        {/* Occupancy Breakdown */}
        <ChartWidget
          title="Property Occupancy"
          description="Current occupancy status"
          data={occupancyData}
          type="pie"
          dataKey="count"
          color="#3b82f6"
        />
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Maintenance Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { property: 'Westlands Apt', issue: 'Plumbing leak', priority: 'High', time: '2 hours ago' },
                { property: 'Karen Villa', issue: 'AC not working', priority: 'Medium', time: '5 hours ago' },
                { property: 'Kilimani Flat', issue: 'Door lock issue', priority: 'Low', time: '1 day ago' }
              ].map((request, index) => (
                <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{request.issue}</p>
                    <p className="text-sm text-gray-600">{request.property}</p>
                    <p className="text-xs text-gray-500">{request.time}</p>
                  </div>
                  <Badge variant={request.priority === 'High' ? 'destructive' : 'secondary'}>
                    {request.priority}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Performing Properties</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Westlands Premium', revenue: 'KSh 95,000', occupancy: '100%' },
                { name: 'Karen Executive', revenue: 'KSh 85,000', occupancy: '100%' },
                { name: 'Kilimani Modern', revenue: 'KSh 75,000', occupancy: '80%' }
              ].map((property, index) => (
                <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{property.name}</p>
                    <p className="text-sm text-gray-600">Occupancy: {property.occupancy}</p>
                  </div>
                  <p className="font-semibold text-emerald-600">{property.revenue}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EnhancedLandlordDashboard;
