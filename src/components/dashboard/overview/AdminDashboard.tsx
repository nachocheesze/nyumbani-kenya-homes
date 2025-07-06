
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import StatsCard from '@/components/dashboard/widgets/StatsCard';
import { Users, Building, Activity, Shield, TrendingUp, AlertTriangle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const AdminDashboard = () => {
  const userGrowthData = [
    { month: 'Jan', users: 1200, properties: 450 },
    { month: 'Feb', users: 1350, properties: 520 },
    { month: 'Mar', users: 1420, properties: 580 },
    { month: 'Apr', users: 1680, properties: 640 },
    { month: 'May', users: 1850, properties: 720 },
    { month: 'Jun', users: 2100, properties: 850 }
  ];

  const revenueData = [
    { month: 'Jan', revenue: 450000 },
    { month: 'Feb', revenue: 520000 },
    { month: 'Mar', revenue: 480000 },
    { month: 'Apr', revenue: 650000 },
    { month: 'May', revenue: 720000 },
    { month: 'Jun', revenue: 850000 }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600">Platform overview and management</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Users"
          value="2,145"
          icon={Users}
          trend={{ value: 15.2, isPositive: true }}
        />
        <StatsCard
          title="Active Properties"
          value="856"
          icon={Building}
          trend={{ value: 8.7, isPositive: true }}
        />
        <StatsCard
          title="Platform Revenue"
          value="KES 850K"
          icon={TrendingUp}
          trend={{ value: 22.1, isPositive: true }}
        />
        <StatsCard
          title="Security Issues"
          value="3"
          icon={AlertTriangle}
          trend={{ value: -45.2, isPositive: true }}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User & Property Growth */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Platform Growth
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="users" stroke="#10b981" strokeWidth={2} name="Users" />
                <Line type="monotone" dataKey="properties" stroke="#3b82f6" strokeWidth={2} name="Properties" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Revenue Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Revenue Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`KES ${(value / 1000).toFixed(0)}K`, 'Revenue']} />
                <Bar dataKey="revenue" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Management Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent User Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent User Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { user: "New landlord registration", action: "Account created", time: "5 min ago", type: "registration" },
                { user: "Property verification", action: "Completed KYC", time: "1 hour ago", type: "verification" },
                { user: "Agent subscription", action: "Premium upgrade", time: "2 hours ago", type: "subscription" }
              ].map((item, index) => (
                <div key={index} className="border-b pb-3">
                  <div className="flex justify-between items-start mb-1">
                    <p className="font-medium text-sm">{item.user}</p>
                    <span className="text-xs text-gray-500">{item.time}</span>
                  </div>
                  <p className="text-sm text-gray-600">{item.action}</p>
                  <span className={`text-xs px-2 py-1 rounded ${
                    item.type === 'registration' ? 'bg-green-100 text-green-800' :
                    item.type === 'verification' ? 'bg-blue-100 text-blue-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {item.type}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Health */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              System Health
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { metric: "Server Uptime", value: "99.9%", status: "good" },
                { metric: "Database Performance", value: "Optimal", status: "good" },
                { metric: "API Response Time", value: "145ms", status: "good" },
                { metric: "Storage Usage", value: "78%", status: "warning" }
              ].map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm">{item.metric}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{item.value}</span>
                    <div className={`w-2 h-2 rounded-full ${
                      item.status === 'good' ? 'bg-green-500' : 'bg-yellow-500'
                    }`}></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { action: "Review pending verifications", count: "12 pending", priority: "high" },
                { action: "Process user reports", count: "3 reports", priority: "medium" },
                { action: "Update system settings", count: "2 updates", priority: "low" },
                { action: "Generate monthly report", count: "Due today", priority: "high" }
              ].map((item, index) => (
                <div key={index} className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <div className="flex justify-between items-start">
                    <p className="font-medium text-sm">{item.action}</p>
                    <span className={`text-xs px-2 py-1 rounded ${
                      item.priority === 'high' ? 'bg-red-100 text-red-800' :
                      item.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {item.priority}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">{item.count}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
