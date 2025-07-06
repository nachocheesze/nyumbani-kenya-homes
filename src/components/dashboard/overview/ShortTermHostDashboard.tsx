
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Building, 
  Calendar, 
  Users, 
  DollarSign,
  TrendingUp,
  Star,
  Clock,
  MapPin
} from 'lucide-react';
import { Link } from 'react-router-dom';

const ShortTermHostDashboard = () => {
  const stats = [
    {
      title: 'Active Listings',
      value: '6',
      description: 'Properties available',
      icon: Building,
      trend: '+1 this month'
    },
    {
      title: 'Bookings This Month',
      value: '24',
      description: 'Total reservations',
      icon: Calendar,
      trend: '+18% from last month'
    },
    {
      title: 'Occupancy Rate',
      value: '78%',
      description: 'Average across listings',
      icon: TrendingUp,
      trend: '+5% this quarter'
    },
    {
      title: 'Monthly Revenue',
      value: 'KSh 145,000',
      description: 'This month',
      icon: DollarSign,
      trend: '+22% from last month'
    }
  ];

  const quickActions = [
    {
      title: 'Listings',
      description: 'Manage properties',
      icon: Building,
      href: '/dashboard/short_term_host/listings',
      color: 'bg-blue-50 text-blue-600'
    },
    {
      title: 'Bookings',
      description: 'View reservations',
      icon: Calendar,
      href: '/dashboard/short_term_host/bookings',
      color: 'bg-green-50 text-green-600'
    },
    {
      title: 'Calendar',
      description: 'Availability schedule',
      icon: Calendar,
      href: '/dashboard/short_term_host/calendar',
      color: 'bg-purple-50 text-purple-600'
    },
    {
      title: 'Guests',
      description: 'Guest management',
      icon: Users,
      href: '/dashboard/short_term_host/guests',
      color: 'bg-orange-50 text-orange-600'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Short-Term Host Dashboard</h1>
        <p className="text-gray-600 mt-2">Manage your short-term rental properties</p>
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
          <CardDescription>Manage your hosting business</CardDescription>
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

export default ShortTermHostDashboard;
