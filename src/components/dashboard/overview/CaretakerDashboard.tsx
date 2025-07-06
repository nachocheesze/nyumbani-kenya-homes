
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import StatsCard from '@/components/dashboard/widgets/StatsCard';
import { Building, Wrench, Droplets, Trash2, CheckCircle, AlertCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CaretakerDashboard = () => {
  // Mock data for caretaker activities
  const maintenanceData = [
    { week: 'Week 1', completed: 8, pending: 3 },
    { week: 'Week 2', completed: 12, pending: 2 },
    { week: 'Week 3', completed: 10, pending: 4 },
    { week: 'Week 4', completed: 15, pending: 1 }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Caretaker Dashboard</h1>
        <p className="text-gray-600">Manage properties and maintenance tasks</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Assigned Properties"
          value="5"
          icon={Building}
        />
        <StatsCard
          title="Active Tasks"
          value="8"
          icon={Wrench}
          trend={{ value: -12.5, isPositive: false }}
        />
        <StatsCard
          title="Water Issues"
          value="2"
          icon={Droplets}
        />
        <StatsCard
          title="Waste Collections"
          value="15"
          icon={Trash2}
          trend={{ value: 8.3, isPositive: true }}
        />
      </div>

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Maintenance Activity Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Task Completion</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={maintenanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="completed" fill="#10b981" name="Completed" />
                <Bar dataKey="pending" fill="#f59e0b" name="Pending" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Today's Priority Tasks */}
        <Card>
          <CardHeader>
            <CardTitle>Today's Priority Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { task: "Fix water pump - Building A", priority: "High", status: "pending" },
                { task: "Waste collection - Building B", priority: "Medium", status: "completed" },
                { task: "Check electrical wiring - Unit 3C", priority: "High", status: "pending" },
                { task: "Garden maintenance", priority: "Low", status: "completed" }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between border-b pb-3">
                  <div className="flex items-center gap-3">
                    {item.status === 'completed' ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-orange-600" />
                    )}
                    <div>
                      <p className="font-medium">{item.task}</p>
                      <span className={`text-xs px-2 py-1 rounded ${
                        item.priority === 'High' ? 'bg-red-100 text-red-800' :
                        item.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {item.priority} Priority
                      </span>
                    </div>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full ${
                    item.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                  }`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Property Status Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Droplets className="h-5 w-5 text-blue-600" />
              Water Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Water pressure normal</span>
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div className="flex justify-between">
                <span>Tank levels monitored</span>
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div className="flex justify-between">
                <span>Pump maintenance due</span>
                <AlertCircle className="h-5 w-5 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trash2 className="h-5 w-5 text-green-600" />
              Waste Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Collection schedule up-to-date</span>
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div className="flex justify-between">
                <span>Recycling bins sorted</span>
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div className="flex justify-between">
                <span>Disposal area clean</span>
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5 text-emerald-600" />
              Property Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Security systems active</span>
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div className="flex justify-between">
                <span>Common areas clean</span>
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div className="flex justify-between">
                <span>Maintenance log updated</span>
                <AlertCircle className="h-5 w-5 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CaretakerDashboard;
