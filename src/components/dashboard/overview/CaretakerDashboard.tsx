
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Droplets, 
  Trash2, 
  Receipt, 
  CreditCard, 
  Wrench,
  Users,
  TrendingUp,
  Clock
} from 'lucide-react';
import { Link } from 'react-router-dom';

const CaretakerDashboard = () => {
  const stats = [
    {
      title: 'Properties Managed',
      value: '8',
      description: 'Active assignments',
      icon: Users,
      trend: '+2 this month'
    },
    {
      title: 'Payments Collected',
      value: 'KSh 245,000',
      description: 'This month',
      icon: CreditCard,
      trend: '+15% from last month'
    },
    {
      title: 'Water Readings',
      value: '24',
      description: 'Pending this week',
      icon: Droplets,
      trend: '6 overdue'
    },
    {
      title: 'Maintenance Issues',
      value: '12',
      description: 'Active requests',
      icon: Wrench,
      trend: '3 urgent'
    }
  ];

  const quickActions = [
    {
      title: 'Record Payment',
      description: 'Log a new rent payment',
      icon: CreditCard,
      href: '/dashboard/caretaker/payments',
      color: 'bg-green-50 text-green-600'
    },
    {
      title: 'Submit Water Reading',
      description: 'Update water meter readings',
      icon: Droplets,
      href: '/dashboard/caretaker/water',
      color: 'bg-blue-50 text-blue-600'
    },
    {
      title: 'Generate Receipt',
      description: 'Create payment receipt',
      icon: Receipt,
      href: '/dashboard/caretaker/receipts',
      color: 'bg-purple-50 text-purple-600'
    },
    {
      title: 'Waste Schedule',
      description: 'Manage waste collection',
      icon: Trash2,
      href: '/dashboard/caretaker/waste',
      color: 'bg-orange-50 text-orange-600'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      action: 'Payment recorded',
      property: 'Maple Heights Apt 2B',
      amount: 'KSh 45,000',
      time: '2 hours ago',
      icon: CreditCard
    },
    {
      id: 2,
      action: 'Water reading submitted',
      property: 'Garden View Block C',
      amount: '1,245 units',
      time: '4 hours ago',
      icon: Droplets
    },
    {
      id: 3,
      action: 'Maintenance completed',
      property: 'Sunset Villa Unit 5',
      amount: 'Plumbing fix',
      time: '1 day ago',
      icon: Wrench
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Caretaker Dashboard</h1>
        <p className="text-gray-600 mt-2">Manage your assigned properties and daily tasks</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <p className="text-xs text-gray-600 mt-1">{stat.description}</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                <span className="text-xs text-green-600">{stat.trend}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks you can perform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Link key={index} to={action.href}>
                <Button variant="outline" className="h-24 w-full flex flex-col items-center justify-center space-y-2">
                  <div className={`p-2 rounded-full ${action.color}`}>
                    <action.icon className="h-5 w-5" />
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-sm">{action.title}</div>
                    <div className="text-xs text-gray-500">{action.description}</div>
                  </div>
                </Button>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
          <CardDescription>Your latest property management activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                <div className="p-2 bg-white rounded-full">
                  <activity.icon className="h-4 w-4 text-gray-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-600">{activity.property}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{activity.amount}</p>
                  <p className="text-xs text-gray-500 flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CaretakerDashboard;
