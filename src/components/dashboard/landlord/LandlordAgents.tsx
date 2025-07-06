
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Star, Phone, Mail, Building, TrendingUp } from 'lucide-react';

const LandlordAgents = () => {
  const agents = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah@realestate.com",
      phone: "+254 701 234 567",
      company: "Prime Properties Ltd",
      rating: 4.8,
      properties: 3,
      totalSales: "KES 2.5M",
      commission: "3%",
      status: "Active",
      joinDate: "Jan 2024"
    },
    {
      id: 2,
      name: "David Mbugua",
      email: "david@homefinders.co.ke",
      phone: "+254 722 876 543",
      company: "HomeFinders Kenya",
      rating: 4.6,
      properties: 2,
      totalSales: "KES 1.8M",
      commission: "2.5%",
      status: "Active",
      joinDate: "Mar 2024"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Property Agents</h1>
          <p className="text-gray-600">Manage your real estate agents and partnerships</p>
        </div>
        <Button className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          Add Agent
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-emerald-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Agents</p>
                <p className="text-2xl font-bold text-gray-900">2</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Building className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Properties Listed</p>
                <p className="text-2xl font-bold text-gray-900">5</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Sales</p>
                <p className="text-2xl font-bold text-gray-900">KES 4.3M</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Star className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg Rating</p>
                <p className="text-2xl font-bold text-gray-900">4.7</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Agents List */}
      <Card>
        <CardHeader>
          <CardTitle>My Agents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {agents.map((agent) => (
              <div key={agent.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 bg-emerald-100 rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{agent.name}</h3>
                      <p className="text-sm text-gray-600">{agent.company}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{agent.rating}</span>
                        <span className="text-sm text-gray-500">rating</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 text-xs rounded ${
                      agent.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {agent.status}
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm mb-3">
                  <div>
                    <p className="text-gray-600">Contact</p>
                    <div className="space-y-1">
                      <p className="font-medium flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {agent.email}
                      </p>
                      <p className="font-medium flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {agent.phone}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-600">Properties</p>
                    <p className="font-medium">{agent.properties} listed</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Total Sales</p>
                    <p className="font-medium">{agent.totalSales}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Commission</p>
                    <p className="font-medium">{agent.commission}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">
                    Joined: {agent.joinDate}
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">View Profile</Button>
                    <Button variant="outline" size="sm">Performance</Button>
                    <Button size="sm">Contact</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Agent Performance Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-center py-8 text-gray-500">
              <TrendingUp className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p>Performance analytics and detailed reports coming soon</p>
              <p className="text-sm">Track agent productivity, sales metrics, and customer satisfaction</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LandlordAgents;
