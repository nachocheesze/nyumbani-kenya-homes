
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Home, 
  Wallet, 
  Heart, 
  Calendar, 
  Settings, 
  TrendingUp,
  Wrench,
  MapPin,
  DollarSign
} from "lucide-react";
import { Link } from "react-router-dom";

const TenantDashboard = () => {
  const mockData = {
    activeLease: {
      address: "Westlands Apartment, Nairobi",
      rent: 85000,
      dueDate: "2024-02-01"
    },
    walletBalance: 125000,
    savedProperties: 3,
    moveOutSavings: {
      target: 200000,
      current: 75000
    }
  };

  return (
    <div className="space-y-6">
      {/* Active Lease */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Home className="h-5 w-5" />
            <span>My Active Lease</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span>{mockData.activeLease.address}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold text-emerald-600">
                KSh {mockData.activeLease.rent.toLocaleString()}
              </span>
              <div className="text-right">
                <p className="text-sm text-gray-600">Due Date</p>
                <p className="font-medium">{mockData.activeLease.dueDate}</p>
              </div>
            </div>
            <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
              <DollarSign className="h-4 w-4 mr-2" />
              Pay Rent Now
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            <Button variant="outline" className="w-full">
              Top Up Wallet
            </Button>
          </CardContent>
        </Card>

        {/* Saved Properties */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Heart className="h-5 w-5" />
              <span>Saved Properties</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold mb-4">{mockData.savedProperties}</p>
            <Button variant="outline" className="w-full" asChild>
              <Link to="/properties">Browse More</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Move Out Savings Tracker */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5" />
            <span>Save to Move Out</span>
          </CardTitle>
          <CardDescription>Track your progress towards your next move</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Progress</span>
              <span className="font-medium">
                {Math.round((mockData.moveOutSavings.current / mockData.moveOutSavings.target) * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-emerald-600 h-2 rounded-full" 
                style={{ width: `${(mockData.moveOutSavings.current / mockData.moveOutSavings.target) * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>KSh {mockData.moveOutSavings.current.toLocaleString()}</span>
              <span>KSh {mockData.moveOutSavings.target.toLocaleString()}</span>
            </div>
            <Button variant="outline" className="w-full">
              Add to Savings
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button variant="outline" className="h-16 justify-start">
          <Wrench className="h-5 w-5 mr-3" />
          <div className="text-left">
            <p className="font-medium">Report Maintenance</p>
            <p className="text-sm text-gray-600">Submit an issue</p>
          </div>
        </Button>
        <Button variant="outline" className="h-16 justify-start">
          <Settings className="h-5 w-5 mr-3" />
          <div className="text-left">
            <p className="font-medium">Find Services</p>
            <p className="text-sm text-gray-600">WiFi, cleaning, etc.</p>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default TenantDashboard;
