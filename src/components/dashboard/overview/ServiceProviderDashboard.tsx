
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ClipboardList, 
  Calendar, 
  DollarSign, 
  Star,
  Clock,
  Users,
  TrendingUp,
  Wrench
} from 'lucide-react';
import { Link } from 'react-router-dom';

const ServiceProviderDashboard = () => {
  const stats = [
    {
      title: 'Active Orders',
      value: '18',
      description: 'Pending completion',
      icon: ClipboardList,
      trend: '+3 new today'
    },
    {
      title: 'Monthly Earnings',
      value: 'KSh 85,000',
      description: 'This month',
      icon: DollarSign,
      trend: '+22% from last month'
    },
    {
      title: 'Average Rating',
      value: '4.8',
      description: 'From 64 reviews',
      icon: Star,
      trend: '+0.2 this month'
    },
    {
      title: 'Scheduled Jobs',
      value: '12',
      description: 'Next 7 days',
      icon: Calendar,
      trend: '2 urgent'
    }
  ];

  const quickActions = [
    {
      title: 'View Orders',
      description: 'Manage service requests',
      icon: ClipboardList,
      href: '/dashboard/service_provider/orders',
      color: 'bg-blue-50 text-blue-600'
    },
    {
      title: 'Schedule',
      description: 'Check your calendar',
      icon: Calendar,
      href: '/dashboard/service_provider/schedule',
      color: 'bg-green-50 text-green-600'
    },
    {
      title: 'Earnings',
      description: 'View payment history',
      icon: DollarSign,
      href: '/dashboard/service_provider/earnings',
      color: 'bg-yellow-50 text-yellow-600'
    },
    {
      title: 'Reviews',
      description: 'Customer feedback',
      icon: Star,
      href: '/dashboard/service_provider/reviews',
      color: 'bg-purple-50 text-purple-600'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Service Provider Dashboard</h1>
        <p className="text-gray-600 mt-2">Manage your services and client requests</p>
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
          <CardDescription>Manage your service business</CardDescription>
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
    </div>
  );
};

export default ServiceProviderDashboard;
