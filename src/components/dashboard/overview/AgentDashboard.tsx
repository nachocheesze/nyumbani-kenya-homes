
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import StatsCard from '@/components/dashboard/widgets/StatsCard';
import { Building, Users, DollarSign, Calendar, TrendingUp, Eye } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const AgentDashboard = () => {
  const salesData = [
    { month: 'Jan', sales: 12, viewings: 45 },
    { month: 'Feb', sales: 15, viewings: 52 },
    { month: 'Mar', sales: 18, viewings: 48 },
    { month: 'Apr', sales: 22, viewings: 61 },
    { month: 'May', sales: 25, viewings: 58 },
    { month: 'Jun', sales: 28, viewings: 72 }
  ];

  const commissionData = [
    { month: 'Jan', amount: 45000 },
    { month: 'Feb', amount: 52000 },
    { month: 'Mar', amount: 48000 },
    { month: 'Apr', amount: 65000 },
    { month: 'May', amount: 58000 },
    { month: 'Jun', amount: 72000 }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Agent Dashboard</h1>
        <p className="text-gray-600">Manage your properties and client relationships</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Active Listings"
          value="24"
          icon={Building}
          trend={{ value: 12.5, isPositive: true }}
        />
        <StatsCard
          title="Total Clients"
          value="156"
          icon={Users}
          trend={{ value: 8.2, isPositive: true }}
        />
        <StatsCard
          title="Monthly Commission"
          value="KES 72,000"
          icon={DollarSign}
          trend={{ value: 24.1, isPositive: true }}
        />
        <StatsCard
          title="Scheduled Viewings"
          value="12"
          icon={Calendar}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales & Viewings Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Sales & Viewings Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="sales" stroke="#10b981" strokeWidth={2} name="Sales" />
                <Line type="monotone" dataKey="viewings" stroke="#3b82f6" strokeWidth={2} name="Viewings" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Commission Earnings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Monthly Commission
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={commissionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`KES ${value.toLocaleString()}`, 'Commission']} />
                <Bar dataKey="amount" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Client Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Client Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { client: "Sarah Johnson", activity: "Viewed 3-bedroom apartment", time: "2 hours ago", status: "interested" },
                { client: "Michael Chen", activity: "Scheduled viewing for tomorrow", time: "4 hours ago", status: "scheduled" },
                { client: "Emma Wilson", activity: "Submitted offer on townhouse", time: "1 day ago", status: "offer" }
              ].map((item, index) => (
                <div key={index} className="flex justify-between items-start border-b pb-3">
                  <div>
                    <p className="font-medium">{item.client}</p>
                    <p className="text-sm text-gray-600">{item.activity}</p>
                    <span className={`text-xs px-2 py-1 rounded ${
                      item.status === 'interested' ? 'bg-blue-100 text-blue-800' :
                      item.status === 'scheduled' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">{item.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Performing Properties */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Top Performing Properties
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { property: "Ocean View Apartment", views: 245, inquiries: 18, status: "Hot" },
                { property: "Garden Heights Townhouse", views: 189, inquiries: 12, status: "Active" },
                { property: "City Center Condo", views: 156, inquiries: 8, status: "Active" }
              ].map((item, index) => (
                <div key={index} className="border-b pb-3">
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-medium">{item.property}</p>
                    <span className={`text-xs px-2 py-1 rounded ${
                      item.status === 'Hot' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{item.views} views</span>
                    <span>{item.inquiries} inquiries</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AgentDashboard;
