
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import StatsCard from '../widgets/StatsCard';
import ChartWidget from '../widgets/ChartWidget';
import { 
  Home, 
  Wallet, 
  Calendar, 
  TrendingUp, 
  AlertCircle,
  DollarSign
} from 'lucide-react';

const EnhancedTenantDashboard = () => {
  // Mock data - replace with real Supabase queries
  const rentHistoryData = [
    { month: 'Jan', amount: 85000 },
    { month: 'Feb', amount: 85000 },
    { month: 'Mar', amount: 85000 },
    { month: 'Apr', amount: 85000 },
    { month: 'May', amount: 85000 },
    { month: 'Jun', amount: 85000 }
  ];

  const savingsData = [
    { category: 'Rent Savings', value: 45000 },
    { category: 'Utilities Saved', value: 15000 },
    { category: 'Move-out Fund', value: 15000 }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatsCard
          title="Current Rent"
          value="KSh 85,000"
          icon={Home}
          trend={{ value: 0, isPositive: true }}
        />
        <StatsCard
          title="Wallet Balance"
          value="KSh 125,000"
          icon={Wallet}
          trend={{ value: 8.2, isPositive: true }}
        />
        <StatsCard
          title="Days to Due"
          value="5"
          icon={Calendar}
          trend={{ value: -2, isPositive: false }}
        />
        <StatsCard
          title="Payment Streak"
          value="12 months"
          icon={TrendingUp}
        />
      </div>

      {/* Current Lease Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Home className="h-5 w-5" />
            <span>Current Lease Status</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">Westlands Apartment, Nairobi</h3>
                <p className="text-sm text-gray-600">2 Bedroom • 1200 sqft</p>
                <p className="text-xs text-gray-500">Lease expires: Dec 31, 2024</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-emerald-600">KSh 85,000</p>
                <p className="text-sm text-gray-600">Due: Feb 5, 2024</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-4 w-4 text-orange-500" />
              <span className="text-sm text-orange-600">Rent due in 5 days</span>
            </div>
            
            <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
              <DollarSign className="h-4 w-4 mr-2" />
              Pay Rent Now
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Rent Payment History */}
        <ChartWidget
          title="Rent Payment History"
          description="Your payment pattern over time"
          data={rentHistoryData}
          type="line"
          dataKey="amount"
          xAxisKey="month"
          color="#10b981"
        />

        {/* Savings Breakdown */}
        <ChartWidget
          title="Savings Breakdown"
          description="Your accumulated savings"
          data={savingsData}
          type="pie"
          dataKey="value"
          color="#3b82f6"
        />
      </div>

      {/* Move-out Savings Tracker */}
      <Card>
        <CardHeader>
          <CardTitle>Save to Move Out</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Progress toward goal</span>
              <span className="font-medium">37.5%</span>
            </div>
            <Progress value={37.5} className="h-2" />
            <div className="flex justify-between text-sm text-gray-600">
              <span>KSh 75,000 saved</span>
              <span>KSh 200,000 goal</span>
            </div>
            <Button variant="outline" className="w-full">
              Add to Savings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedTenantDashboard;
