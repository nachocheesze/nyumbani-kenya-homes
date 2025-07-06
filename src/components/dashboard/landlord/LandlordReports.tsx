
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart3, Download, Calendar, TrendingUp, PieChart } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Cell } from 'recharts';

const LandlordReports = () => {
  const revenueData = [
    { month: 'Jan', revenue: 1200000, expenses: 250000 },
    { month: 'Feb', revenue: 1150000, expenses: 180000 },
    { month: 'Mar', revenue: 1300000, expenses: 320000 },
    { month: 'Apr', revenue: 1250000, expenses: 200000 },
    { month: 'May', revenue: 1400000, expenses: 280000 },
    { month: 'Jun', revenue: 1350000, expenses: 230000 }
  ];

  const occupancyData = [
    { property: 'Sunset Apartments', occupied: 10, vacant: 2 },
    { property: 'Garden View Flats', occupied: 6, vacant: 2 }
  ];

  const expenseBreakdown = [
    { name: 'Maintenance', value: 45, color: '#10b981' },
    { name: 'Insurance', value: 25, color: '#3b82f6' },
    { name: 'Management', value: 20, color: '#f59e0b' },
    { name: 'Other', value: 10, color: '#ef4444' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600">Financial insights and property performance</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Date Range
          </Button>
          <Button className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-emerald-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Net Income (YTD)</p>
                <p className="text-2xl font-bold text-gray-900">KES 6.2M</p>
                <p className="text-sm text-green-600">+12% from last year</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <BarChart3 className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg Monthly Revenue</p>
                <p className="text-2xl font-bold text-gray-900">KES 1.3M</p>
                <p className="text-sm text-green-600">+8% from last month</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Occupancy Rate</p>
                <p className="text-2xl font-bold text-gray-900">80%</p>
                <p className="text-sm text-yellow-600">-2% from last month</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Collection Rate</p>
                <p className="text-2xl font-bold text-gray-900">95%</p>
                <p className="text-sm text-green-600">+3% from last month</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue vs Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value: number) => [`KES ${(value / 1000).toFixed(0)}K`]} />
                <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} name="Revenue" />
                <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={2} name="Expenses" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Occupancy by Property */}
        <Card>
          <CardHeader>
            <CardTitle>Occupancy by Property</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={occupancyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="property" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="occupied" fill="#10b981" name="Occupied" />
                <Bar dataKey="vacant" fill="#f59e0b" name="Vacant" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Additional Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Expense Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Expense Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <RechartsPieChart>
                <Tooltip formatter={(value) => [`${value}%`]} />
                <RechartsPieChart data={expenseBreakdown} cx="50%" cy="50%" outerRadius={80}>
                  {expenseBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </RechartsPieChart>
              </RechartsPieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {expenseBreakdown.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm">{item.name}: {item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Report Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { title: "Monthly Income Statement", description: "Detailed revenue and expense breakdown" },
                { title: "Tenant Payment Report", description: "Track rent collection and arrears" },
                { title: "Property Performance", description: "Occupancy and maintenance metrics" },
                { title: "Tax Summary Report", description: "Annual tax-ready financial summary" },
                { title: "Vacancy Analysis", description: "Track vacant units and turnover rates" }
              ].map((report, index) => (
                <div key={index} className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-sm">{report.title}</p>
                      <p className="text-xs text-gray-600">{report.description}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-3 w-3" />
                    </Button>
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

export default LandlordReports;
