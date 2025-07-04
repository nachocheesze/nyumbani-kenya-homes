
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Home, 
  Heart, 
  Wallet, 
  Plus, 
  Settings, 
  Bell, 
  TrendingUp,
  Calendar,
  Users,
  Building,
  MapPin
} from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  // Mock user data - in real app, get from auth context
  const user = {
    name: "John Doe",
    email: "john.doe@email.com",
    role: "tenant", // tenant, landlord, agent, etc.
    avatar: "/placeholder.svg",
    walletBalance: 125000,
    memberSince: "January 2024"
  };

  const savedProperties = [
    {
      id: 1,
      title: "Modern 3BR Apartment in Westlands",
      price: "KSh 85,000",
      location: "Westlands, Nairobi",
      image: "/placeholder.svg",
      savedDate: "2024-01-15"
    },
    {
      id: 2,
      title: "Luxury Villa in Karen",
      price: "KSh 250,000",
      location: "Karen, Nairobi",
      image: "/placeholder.svg",
      savedDate: "2024-01-10"
    }
  ];

  const recentTransactions = [
    {
      id: 1,
      type: "Rent Payment",
      amount: -85000,
      date: "2024-01-01",
      status: "completed",
      description: "Monthly rent for Westlands Apartment"
    },
    {
      id: 2,
      type: "Wallet Top-up",
      amount: 100000,
      date: "2023-12-28",
      status: "completed",
      description: "Paystack deposit"
    },
    {
      id: 3,
      type: "Security Deposit",
      amount: -170000,
      date: "2023-12-15",
      status: "completed",
      description: "Security deposit for new lease"
    }
  ];

  const upcomingPayments = [
    {
      id: 1,
      title: "Monthly Rent",
      amount: 85000,
      dueDate: "2024-02-01",
      property: "Westlands Apartment"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="border-b bg-white">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Home className="h-8 w-8 text-emerald-600" />
            <Link to="/" className="text-2xl font-bold text-gray-900">Nyumbani</Link>
          </div>
          <div className="hidden md:flex space-x-6">
            <Link to="/properties" className="text-gray-600 hover:text-emerald-600 transition-colors">
              Browse Properties
            </Link>
            <Link to="/dashboard" className="text-emerald-600 font-medium">
              Dashboard
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
            <Avatar>
              <AvatarImage src={user.avatar} />
              <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user.name.split(' ')[0]}!
          </h1>
          <p className="text-gray-600">
            Manage your properties, payments, and preferences from your dashboard.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Wallet Balance</p>
                  <p className="text-2xl font-bold text-emerald-600">
                    KSh {user.walletBalance.toLocaleString()}
                  </p>
                </div>
                <Wallet className="h-8 w-8 text-emerald-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Saved Properties</p>
                  <p className="text-2xl font-bold">{savedProperties.length}</p>
                </div>
                <Heart className="h-8 w-8 text-gray-400" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Current Lease</p>
                  <p className="text-2xl font-bold">1</p>
                </div>
                <Building className="h-8 w-8 text-gray-400" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Member Since</p>
                  <p className="text-lg font-semibold">{user.memberSince}</p>
                </div>
                <Calendar className="h-8 w-8 text-gray-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full lg:w-[600px] grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="properties">Properties</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Upcoming Payments */}
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Payments</CardTitle>
                  <CardDescription>Your next payment schedule</CardDescription>
                </CardHeader>
                <CardContent>
                  {upcomingPayments.map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{payment.title}</h4>
                        <p className="text-sm text-gray-600">{payment.property}</p>
                        <p className="text-sm text-gray-500">Due: {payment.dueDate}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">KSh {payment.amount.toLocaleString()}</p>
                        <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                          Pay Now
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your latest transactions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentTransactions.slice(0, 3).map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{transaction.type}</p>
                          <p className="text-sm text-gray-600">{transaction.description}</p>
                          <p className="text-sm text-gray-500">{transaction.date}</p>
                        </div>
                        <div className={`font-bold ${transaction.amount > 0 ? 'text-emerald-600' : 'text-gray-900'}`}>
                          {transaction.amount > 0 ? '+' : ''}KSh {Math.abs(transaction.amount).toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    View All Transactions
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="properties" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Saved Properties</h2>
              <Button asChild>
                <Link to="/properties">
                  <Plus className="h-4 w-4 mr-2" />
                  Browse More
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedProperties.map((property) => (
                <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-gray-200">
                    <img 
                      src={property.image} 
                      alt={property.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg">{property.title}</CardTitle>
                    <CardDescription className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {property.location}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-xl font-bold text-emerald-600">{property.price}</span>
                      <Badge variant="secondary">Saved</Badge>
                    </div>
                    <div className="flex space-x-2">
                      <Button className="flex-1" variant="outline" asChild>
                        <Link to={`/properties/${property.id}`}>View Details</Link>
                      </Button>
                      <Button variant="outline" size="icon">
                        <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="payments" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Wallet Card */}
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle>Wallet</CardTitle>
                  <CardDescription>Manage your payment balance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-6">
                    <p className="text-3xl font-bold text-emerald-600 mb-2">
                      KSh {user.walletBalance.toLocaleString()}
                    </p>
                    <p className="text-gray-600">Available Balance</p>
                  </div>
                  <div className="space-y-2">
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                      <Plus className="h-4 w-4 mr-2" />
                      Top Up Wallet
                    </Button>
                    <Button variant="outline" className="w-full">
                      Withdraw Funds
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Transaction History */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Transaction History</CardTitle>
                  <CardDescription>All your payment activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentTransactions.map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium">{transaction.type}</h4>
                          <p className="text-sm text-gray-600">{transaction.description}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <p className="text-sm text-gray-500">{transaction.date}</p>
                            <Badge 
                              variant={transaction.status === 'completed' ? 'default' : 'secondary'}
                              className={transaction.status === 'completed' ? 'bg-emerald-100 text-emerald-800' : ''}
                            >
                              {transaction.status}
                            </Badge>
                          </div>
                        </div>
                        <div className={`font-bold text-lg ${transaction.amount > 0 ? 'text-emerald-600' : 'text-gray-900'}`}>
                          {transaction.amount > 0 ? '+' : ''}KSh {Math.abs(transaction.amount).toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Profile Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your personal details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback className="text-lg">{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-lg">{user.name}</h3>
                      <p className="text-gray-600">{user.email}</p>
                      <Badge className="mt-1 capitalize">{user.role}</Badge>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    <Settings className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </CardContent>
              </Card>

              {/* Account Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Manage your account preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>Email Notifications</span>
                      <Button variant="outline" size="sm">Configure</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>SMS Alerts</span>
                      <Button variant="outline" size="sm">Configure</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Payment Methods</span>
                      <Button variant="outline" size="sm">Manage</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Privacy Settings</span>
                      <Button variant="outline" size="sm">Update</Button>
                    </div>
                  </div>
                  <Button variant="destructive" className="w-full mt-4">
                    Deactivate Account
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
