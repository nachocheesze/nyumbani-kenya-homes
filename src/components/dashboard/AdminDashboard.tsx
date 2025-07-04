
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  AlertTriangle, 
  Users, 
  Building, 
  DollarSign,
  Flag,
  CheckCircle,
  Search,
  Settings
} from "lucide-react";

const AdminDashboard = () => {
  const mockData = {
    flaggedListings: 5,
    pendingVerifications: 8,
    transactionAnomalies: 2,
    userReports: 12
  };

  return (
    <div className="space-y-6">
      {/* Alert Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-red-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Flagged Listings</p>
                <p className="text-2xl font-bold text-red-600">{mockData.flaggedListings}</p>
              </div>
              <Flag className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Verifications</p>
                <p className="text-2xl font-bold text-orange-600">{mockData.pendingVerifications}</p>
              </div>
              <Users className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-yellow-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Transaction Alerts</p>
                <p className="text-2xl font-bold text-yellow-600">{mockData.transactionAnomalies}</p>
              </div>
              <DollarSign className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">User Reports</p>
                <p className="text-2xl font-bold text-blue-600">{mockData.userReports}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Flagged Content Review */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Flag className="h-5 w-5" />
              <span>Flagged Listings Review</span>
            </CardTitle>
            <CardDescription>Content requiring immediate attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { title: "Suspicious Pricing - Westlands", reason: "Price too low", severity: "high" },
                { title: "Fake Images - Karen Villa", reason: "Stock photos", severity: "medium" },
                { title: "Inappropriate Content", reason: "Community guidelines", severity: "high" }
              ].map((item, index) => (
                <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-gray-600">{item.reason}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={item.severity === 'high' ? 'destructive' : 'secondary'}>
                      {item.severity}
                    </Badge>
                    <Button size="sm" variant="outline">
                      Review
                    </Button>
                  </div>
                </div>
              ))}
              <Button className="w-full" variant="outline">
                View All Flagged Content
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* User Verifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5" />
              <span>Pending Verifications</span>
            </CardTitle>
            <CardDescription>Agents and service providers awaiting approval</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: "John Kiprotich", type: "Real Estate Agent", documents: "Complete" },
                { name: "Sarah's Cleaning Service", type: "Service Provider", documents: "Pending" },
                { name: "Mike Construction", type: "Service Provider", documents: "Complete" }
              ].map((user, index) => (
                <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-gray-600">{user.type}</p>
                    <Badge variant={user.documents === 'Complete' ? 'default' : 'secondary'} className="mt-1">
                      {user.documents}
                    </Badge>
                  </div>
                  <div className="space-x-1">
                    <Button size="sm" variant="outline">
                      Review
                    </Button>
                    <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                      Approve
                    </Button>
                  </div>
                </div>
              ))}
              <Button className="w-full" variant="outline">
                View All Applications
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Admin Tools */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button variant="outline" className="h-16 justify-start">
          <Search className="h-5 w-5 mr-3" />
          <div className="text-left">
            <p className="font-medium">Search Users</p>
            <p className="text-sm text-gray-600">Filter by role</p>
          </div>
        </Button>
        <Button variant="outline" className="h-16 justify-start">
          <DollarSign className="h-5 w-5 mr-3" />
          <div className="text-left">
            <p className="font-medium">Transaction Monitor</p>
            <p className="text-sm text-gray-600">View anomalies</p>
          </div>
        </Button>
        <Button variant="outline" className="h-16 justify-start">
          <Settings className="h-5 w-5 mr-3" />
          <div className="text-left">
            <p className="font-medium">Platform Settings</p>
            <p className="text-sm text-gray-600">Manage features</p>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default AdminDashboard;
