
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Building, 
  Users, 
  DollarSign, 
  TrendingUp,
  Plus,
  MessageSquare,
  CheckCircle,
  Clock
} from "lucide-react";
import { Link } from "react-router-dom";

const AgentDashboard = () => {
  const mockData = {
    managedProperties: 8,
    monthlyCommission: 45000,
    activeLeads: 12,
    pendingApprovals: 2
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Properties Managed</p>
                <p className="text-2xl font-bold">{mockData.managedProperties}</p>
              </div>
              <Building className="h-8 w-8 text-emerald-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-emerald-600">KSh {mockData.monthlyCommission.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-emerald-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Leads</p>
                <p className="text-2xl font-bold">{mockData.activeLeads}</p>
              </div>
              <Users className="h-8 w-8 text-emerald-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Approval</p>
                <p className="text-2xl font-bold text-orange-600">{mockData.pendingApprovals}</p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common agent tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start h-12 bg-emerald-600 hover:bg-emerald-700" asChild>
              <Link to="/properties/new">
                <Plus className="h-5 w-5 mr-3" />
                Add New Listing
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start h-12">
              <MessageSquare className="h-5 w-5 mr-3" />
              <div className="text-left">
                <p className="font-medium">Messages ({mockData.activeLeads})</p>
                <p className="text-sm text-gray-600">New inquiries</p>
              </div>
            </Button>
            <Button variant="outline" className="w-full justify-start h-12">
              <TrendingUp className="h-5 w-5 mr-3" />
              <div className="text-left">
                <p className="font-medium">Commission Report</p>
                <p className="text-sm text-gray-600">View earnings</p>
              </div>
            </Button>
          </CardContent>
        </Card>

        {/* Recent Leads */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Leads</CardTitle>
            <CardDescription>Latest property inquiries</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: "Sarah Johnson", property: "Westlands Apartment", time: "2 hours ago", status: "new" },
                { name: "Mike Chen", property: "Karen Villa", time: "1 day ago", status: "contacted" },
                { name: "Grace Wanjiku", property: "Kilimani Flat", time: "2 days ago", status: "viewing" }
              ].map((lead, index) => (
                <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{lead.name}</p>
                    <p className="text-sm text-gray-600">{lead.property}</p>
                    <p className="text-xs text-gray-500">{lead.time}</p>
                  </div>
                  <Badge variant={lead.status === 'new' ? 'default' : 'secondary'}>
                    {lead.status}
                  </Badge>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                View All Leads
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Managed Properties */}
      <Card>
        <CardHeader>
          <CardTitle>Properties I Manage</CardTitle>
          <CardDescription>Current listings and their status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { title: "Modern 3BR in Westlands", status: "active", views: 45, inquiries: 8 },
              { title: "Luxury Villa in Karen", status: "pending", views: 23, inquiries: 3 },
              { title: "Studio in Kilimani", status: "active", views: 67, inquiries: 12 }
            ].map((property, index) => (
              <div key={index} className="flex justify-between items-center p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">{property.property_name}</h4>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className="text-sm text-gray-600">{property.views} views</span>
                    <span className="text-sm text-gray-600">{property.inquiries} inquiries</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={property.status === 'active' ? 'default' : 'secondary'}>
                    {property.status}
                  </Badge>
                  <Button variant="outline" size="sm">
                    Manage
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AgentDashboard;
