
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Home, Search, MapPin, DollarSign, Users, TrendingUp, Shield, Clock } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useRoleRedirect } from "@/hooks/useRoleRedirect";

const Index = () => {
  const { user, userProfile } = useAuth();
  useRoleRedirect();

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      {/* Navigation */}
      <nav className="border-b bg-white/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Home className="h-8 w-8 text-emerald-600" />
            <span className="text-2xl font-bold text-gray-900">Nyumbani</span>
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-sm text-gray-600">
                  Welcome, {userProfile?.full_name || 'User'}!
                </span>
                <Button asChild>
                  <Link to="/dashboard">Dashboard</Link>
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" asChild>
                  <Link to="/login">Login</Link>
                </Button>
                <Button className="bg-emerald-600 hover:bg-emerald-700" asChild>
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-6">
          Find Your Perfect
          <span className="text-emerald-600"> Home</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Kenya's premier real estate platform connecting tenants, landlords, and agents. 
          Discover your next home with confidence and ease.
        </p>
        <div className="flex justify-center space-x-4">
          <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700" asChild>
            <Link to="/properties">Browse Properties</Link>
          </Button>
          {!user && (
            <Button size="lg" variant="outline" asChild>
              <Link to="/signup">Get Started</Link>
            </Button>
          )}
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Nyumbani?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="text-center">
            <CardHeader>
              <Search className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
              <CardTitle>Smart Search</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Find properties that match your exact needs with our advanced filtering system.</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <MapPin className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
              <CardTitle>Prime Locations</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Discover properties in Kenya's most desirable neighborhoods and upcoming areas.</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <DollarSign className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
              <CardTitle>Transparent Pricing</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">No hidden fees. Clear pricing and financial tools to help you make informed decisions.</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Shield className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
              <CardTitle>Verified Listings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">All properties are verified by our team to ensure authenticity and quality.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* User Types */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Built for Everyone</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Users className="h-8 w-8 text-emerald-600 mb-2" />
                <CardTitle>For Tenants</CardTitle>
                <CardDescription>Find your perfect home</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">Search & Filter</Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">Virtual Tours</Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">Rent Payment</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Home className="h-8 w-8 text-emerald-600 mb-2" />
                <CardTitle>For Landlords</CardTitle>
                <CardDescription>Manage your properties</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">List Properties</Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">Tenant Screening</Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">Rent Collection</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <TrendingUp className="h-8 w-8 text-emerald-600 mb-2" />
                <CardTitle>For Agents</CardTitle>
                <CardDescription>Grow your business</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">Lead Management</Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">Commission Tracking</Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">Client Tools</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-xl text-gray-600 mb-8">
          Join thousands of Kenyans who have found their perfect home through Nyumbani.
        </p>
        {!user ? (
          <div className="flex justify-center space-x-4">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700" asChild>
              <Link to="/signup">Sign Up Free</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/properties">Browse Properties</Link>
            </Button>
          </div>
        ) : (
          <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700" asChild>
            <Link to="/dashboard">Go to Dashboard</Link>
          </Button>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Home className="h-6 w-6 text-emerald-600" />
                <span className="text-xl font-bold">Nyumbani</span>
              </div>
              <p className="text-gray-400">
                Kenya's premier real estate platform for finding, renting, and managing properties.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">For Tenants</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/properties" className="hover:text-white">Browse Properties</Link></li>
                <li><Link to="/signup" className="hover:text-white">Create Account</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">For Landlords</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/properties/new" className="hover:text-white">List Property</Link></li>
                <li><Link to="/signup" className="hover:text-white">Join as Landlord</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Nyumbani. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
