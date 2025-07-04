
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Building, 
  Users, 
  Wallet, 
  TrendingUp,
  Wrench,
  Plus,
  DollarSign,
  AlertCircle
} from "lucide-react";
import { Link } from "react-router-dom";

const LandlordDashboard = () => {
  const mockData = {
    properties: 3,
    totalRentIncome: 255000,
    pendingPayments: 85000,
    walletBalance: 180000,
    maintenanceRequests: 2,
    tenants: 5
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Properties</p>
                <p className="text-2xl font-bold">{mockData.properties}</p>
              </div>
              <Building className="h-8 w-8 text-emerald-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Tenants</p>
                <p className="text-2xl font-bold">{mockData.tenants}</p>
              </div>
              <Users className="h-8 w-8 text-emerald-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Monthly Income</p>
                <p className="text-2xl font-bold">KSh {mockData.totalRentIncome.toLocaleString()}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-emerald-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-orange-600">KSh {mockData.pendingPayments.toLocaleString()}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Wallet */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Wallet className="h-5 w-5" />
              <span>Wallet</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-emerald-600 mb-4">
              KSh {mockData.walletBalance.toLocaleString()}
            </p>
            <div className="space-y-2">
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                <DollarSign className="h-4 w-4 mr-2" />
                Request Rent Advance
              </Button>
              <Button variant="outline" className="w-full">
                Withdraw Funds
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Maintenance Requests */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Wrench className="h-5 w-5" />
              <span>Maintenance Requests</span>
            </CardTitle>
            <CardDescription>Pending issues from tenants</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Plumbing Issue</p>
                  <p className="text-sm text-gray-600">Westlands Apartment</p>
                </div>
                <Badge variant="secondary">New</Badge>
              </div>
              <div className="flex justify-between items-center p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Electrical Problem</p>
                  <p className="text-sm text-gray-600">Karen Villa</p>
                </div>
                <Badge variant="outline">In Progress</Badge>
              </div>
              <Button variant="outline" className="w-full">
                View All Requests
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Properties Management */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>My Properties</CardTitle>
            <CardDescription>Manage your listed properties</CardDescription>
          </div>
          <Button asChild>
            <Link to="/properties/new">
              <Plus className="h-4 w-4 mr-2" />
              Add Property
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((property) => (
              <div key={property} className="flex justify-between items-center p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">Modern Apartment in Westlands</h4>
                  <p className="text-sm text-gray-600">2 bedrooms • KSh 85,000/month</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge className="bg-emerald-100 text-emerald-800">Occupied</Badge>
                    <span className="text-sm text-gray-500">Rent due: Feb 1</span>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Manage
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LandlordDashboard;
