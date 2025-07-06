
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  DollarSign, 
  FileText, 
  BarChart3, 
  Handshake,
  TrendingUp,
  PieChart,
  Users,
  Activity
} from 'lucide-react';
import { Link } from 'react-router-dom';

const InvestorDashboard = () => {
  const stats = [
    {
      title: 'Total Investments',
      value: 'KSh 12.5M',
      description: 'Portfolio value',
      icon: DollarSign,
      trend: '+8.2% this month'
    },
    {
      title: 'Active Projects',
      value: '14',
      description: 'Investments',
      icon: PieChart,
      trend: '+3 new this quarter'
    },
    {
      title: 'Expected Returns',
      value: 'KSh 2.8M',
      description: 'Annual projection',
      icon: TrendingUp,
      trend: '+12% ROI target'
    },
    {
      title: 'Partners',
      value: '8',
      description: 'Active relationships',
      icon: Users,
      trend: '+2 this month'
    }
  ];

  const quickActions = [
    {
      title: 'Investments',
      description: 'Portfolio overview',
      icon: DollarSign,
      href: '/dashboard/investor/investments',
      color: 'bg-green-50 text-green-600'
    },
    {
      title: 'Documents',
      description: 'Legal & contracts',
      icon: FileText,
      href: '/dashboard/investor/documents',
      color: 'bg-blue-50 text-blue-600'
    },
    {
      title: 'Reports',
      description: 'Performance analytics',
      icon: BarChart3,
      href: '/dashboard/investor/reports',
      color: 'bg-purple-50 text-purple-600'
    },
    {
      title: 'Partners',
      description: 'Business relationships',
      icon: Handshake,
      href: '/dashboard/investor/partners',
      color: 'bg-orange-50 text-orange-600'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Investor Dashboard</h1>
        <p className="text-gray-600 mt-2">Track your real estate investment portfolio</p>
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
          <CardDescription>Manage your investment portfolio</CardDescription>
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

export default InvestorDashboard;
