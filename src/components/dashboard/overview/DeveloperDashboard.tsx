
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Building, 
  Users, 
  FileText, 
  TrendingUp,
  DollarSign,
  Calendar,
  MapPin,
  Activity
} from 'lucide-react';
import { Link } from 'react-router-dom';

const DeveloperDashboard = () => {
  const stats = [
    {
      title: 'Active Projects',
      value: '5',
      description: 'In development',
      icon: Building,
      trend: '+2 this quarter'
    },
    {
      title: 'Total Investment',
      value: 'KSh 45M',
      description: 'Portfolio value',
      icon: DollarSign,
      trend: '+15% this year'
    },
    {
      title: 'Project Leads',
      value: '28',
      description: 'Potential clients',
      icon: Users,
      trend: '+8 this week'
    },
    {
      title: 'Avg ROI',
      value: '18.5%',
      description: 'Return on investment',
      icon: TrendingUp,
      trend: '+2.3% from target'
    }
  ];

  const quickActions = [
    {
      title: 'Projects',
      description: 'Manage developments',
      icon: Building,
      href: '/dashboard/developer/projects',
      color: 'bg-blue-50 text-blue-600'
    },
    {
      title: 'Leads',
      description: 'Prospect management',
      icon: Users,
      href: '/dashboard/developer/leads',
      color: 'bg-green-50 text-green-600'
    },
    {
      title: 'Proposals',
      description: 'Client proposals',
      icon: FileText,
      href: '/dashboard/developer/proposals',
      color: 'bg-purple-50 text-purple-600'
    },
    {
      title: 'ROI Analysis',
      description: 'Financial metrics',
      icon: TrendingUp,
      href: '/dashboard/developer/roi',
      color: 'bg-orange-50 text-orange-600'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Developer Dashboard</h1>
        <p className="text-gray-600 mt-2">Manage your development projects and investments</p>
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
          <CardDescription>Manage your development business</CardDescription>
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

export default DeveloperDashboard;
