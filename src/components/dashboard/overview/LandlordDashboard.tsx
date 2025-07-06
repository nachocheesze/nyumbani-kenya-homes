
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import StatsCard from '@/components/dashboard/widgets/StatsCard';
import { Building, Users, DollarSign, Wrench, TrendingUp, Calendar } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const LandlordDashboard = () => {
  // Mock data - replace with actual Supabase queries
  const rentData = [
    { month: 'Jan', collected: 45000, expected: 50000 },
    { month: 'Feb', collected: 48000, expected: 50000 },
    { month: 'Mar', collected: 50000, expected: 50000 },
    { month: 'Apr', collected: 47000, expected: 50000 },
    { month: 'May', collected: 52000, expected: 50000 },
    { month: 'Jun', collected: 49000, expected: 50000 }
  ];

  const occupancyData = [
    { name: 'Occupied', value: 85, color: '#10b981' },
    { name: 'Vacant', value: 15, color: '#ef4444' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Landlord Dashboard</h1>
        <p className="text-gray-600">Overview of your property portfolio</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Properties"
          value="12"
          icon={Building}
          trend={{ value: 8.2, isPositive: true }}
        />
        <StatsCard
          title="Active Tenants"
          value="34"
          icon={Users}
          trend={{ value: 3.1, isPositive: true }}
        />
        <StatsCard
          title="Monthly Revenue"
          value="KES 291,000"
          icon={DollarSign}
          trend={{ value: 12.5, isPositive: true }}
        />
        <StatsCard
          title="Open Requests"
          value="7"
          icon={Wrench}
          trend={{ value: -15.3, isPositive: false }}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Rent Collection Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Rent Collection Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={rentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`KES ${value.toLocaleString()}`, '']} />
                <Bar dataKey="expected" fill="#e5e7eb" name="Expected" />
                <Bar dataKey="collected" fill="#10b981" name="Collected" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Occupancy Rate */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Occupancy Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={occupancyData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {occupancyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Messages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { tenant: "John Doe", message: "Water pressure issue in unit 2A", time: "2 hours ago" },
                { tenant: "Jane Smith", message: "Rent payment confirmation", time: "5 hours ago" },
                { tenant: "Mike Johnson", message: "Request for maintenance", time: "1 day ago" }
              ].map((item, index) => (
                <div key={index} className="flex justify-between items-start border-b pb-2">
                  <div>
                    <p className="font-medium">{item.tenant}</p>
                    <p className="text-sm text-gray-600">{item.message}</p>
                  </div>
                  <span className="text-xs text-gray-500">{item.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Upcoming Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { event: "Lease renewal - Unit 3B", date: "Tomorrow", type: "lease" },
                { event: "Property inspection - Block A", date: "In 3 days", type: "inspection" },
                { event: "Insurance renewal", date: "Next week", type: "insurance" }
              ].map((item, index) => (
                <div key={index} className="flex justify-between items-center border-b pb-2">
                  <div>
                    <p className="font-medium">{item.event}</p>
                    <span className={`text-xs px-2 py-1 rounded ${
                      item.type === 'lease' ? 'bg-blue-100 text-blue-800' :
                      item.type === 'inspection' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {item.type}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">{item.date}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LandlordDashboard;
