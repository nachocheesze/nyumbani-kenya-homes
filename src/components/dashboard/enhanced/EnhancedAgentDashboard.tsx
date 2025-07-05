
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
  Calendar,
  MessageSquare,
  Plus,
  Eye
} from 'lucide-react';
import { Link } from 'react-router-dom';

const EnhancedAgentDashboard = () => {
  // Mock data - replace with real Supabase queries
  const commissionData = [
    { month: 'Jan', commission: 35000 },
    { month: 'Feb', commission: 42000 },
    { month: 'Mar', commission: 38000 },
    { month: 'Apr', commission: 45000 },
    { month: 'May', commission: 51000 },
    { month: 'Jun', commission: 48000 }
  ];

  const conversionData = [
    { stage: 'Leads', count: 45 },
    { stage: 'Viewings', count: 28 },
    { stage: 'Applications', count: 18 },
    { stage: 'Signed', count: 12 }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatsCard
          title="Properties Managed"
          value="18"
          icon={Building}
          trend={{ value: 12.5, isPositive: true }}
        />
        <StatsCard
          title="Active Leads"
          value="24"
          icon={Users}
          trend={{ value: 8.3, isPositive: true }}
        />
        <StatsCard
          title="This Month's Commission"
          value="KSh 48,000"
          icon={DollarSign}
          trend={{ value: 15.2, isPositive: true }}
        />
        <StatsCard
          title="Conversion Rate"
          value="26.7%"
          icon={TrendingUp}
          trend={{ value: 3.1, isPositive: true }}
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-emerald-50 border-emerald-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-emerald-900">Add Listing</h3>
                <p className="text-sm text-emerald-700">New property</p>
              </div>
              <Button size="sm" asChild>
                <Link to="/properties/new">
                  <Plus className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-blue-900">Schedule Viewings</h3>
                <p className="text-sm text-blue-700">5 pending requests</p>
              </div>
              <Calendar className="h-5 w-5 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-purple-900">Messages</h3>
                <p className="text-sm text-purple-700">12 unread</p>
              </div>
              <MessageSquare className="h-5 w-5 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Commission Trends */}
        <ChartWidget
          title="Monthly Commission"
          description="Your earnings over time"
          data={commissionData}
          type="line"
          dataKey="commission"
          xAxisKey="month"
          color="#10b981"
        />

        {/* Conversion Funnel */}
        <ChartWidget
          title="Lead Conversion Funnel"
          description="Sales pipeline performance"
          data={conversionData}
          type="bar"
          dataKey="count"
          xAxisKey="stage"
          color="#3b82f6"
        />
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Property Inquiries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { client: 'Sarah Johnson', property: 'Westlands 2BR', action: 'Viewing scheduled', time: '1 hour ago' },
                { client: 'Mike Chen', property: 'Karen Villa', action: 'Info requested', time: '3 hours ago' },
                { client: 'Grace Wanjiku', property: 'Kilimani Studio', action: 'Application submitted', time: '5 hours ago' }
              ].map((inquiry, index) => (
                <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{inquiry.client}</p>
                    <p className="text-sm text-gray-600">{inquiry.property}</p>
                    <p className="text-xs text-gray-500">{inquiry.time}</p>
                  </div>
                  <Badge variant="secondary">{inquiry.action}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Performing Listings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { property: 'Modern 2BR Westlands', views: 156, inquiries: 12, status: 'active' },
                { property: 'Executive Studio CBD', views: 89, inquiries: 8, status: 'active' },
                { property: 'Family Home Karen', views: 67, inquiries: 5, status: 'pending' }
              ].map((listing, index) => (
                <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{listing.property}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="flex items-center">
                        <Eye className="h-3 w-3 mr-1" />
                        {listing.views} views
                      </span>
                      <span>{listing.inquiries} inquiries</span>
                    </div>
                  </div>
                  <Badge variant={listing.status === 'active' ? 'default' : 'secondary'}>
                    {listing.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EnhancedAgentDashboard;
