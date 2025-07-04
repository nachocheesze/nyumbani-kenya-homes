
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Home, Users, TrendingUp, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const featuredProperties = [
    {
      id: 1,
      title: "Modern 3BR Apartment in Westlands",
      price: "KSh 85,000",
      location: "Westlands, Nairobi",
      image: "/placeholder.svg",
      bedrooms: 3,
      bathrooms: 2,
      type: "Apartment"
    },
    {
      id: 2,
      title: "Luxury Villa in Karen",
      price: "KSh 250,000",
      location: "Karen, Nairobi",
      image: "/placeholder.svg",
      bedrooms: 5,
      bathrooms: 4,
      type: "Villa"
    },
    {
      id: 3,
      title: "Cozy 2BR in Kilimani",
      price: "KSh 65,000",
      location: "Kilimani, Nairobi",
      image: "/placeholder.svg",
      bedrooms: 2,
      bathrooms: 2,
      type: "Apartment"
    }
  ];

  const benefits = [
    {
      icon: <Shield className="h-8 w-8 text-emerald-600" />,
      title: "Verified Listings",
      description: "All properties are verified by our team for authenticity and quality"
    },
    {
      icon: <Users className="h-8 w-8 text-emerald-600" />,
      title: "Trusted Community",
      description: "Connect with verified landlords, agents, and service providers"
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-emerald-600" />,
      title: "Smart Payments",
      description: "Secure rent payments and wallet management with Paystack integration"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-white/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Home className="h-8 w-8 text-emerald-600" />
            <span className="text-2xl font-bold text-gray-900">Nyumbani</span>
          </div>
          <div className="hidden md:flex space-x-6">
            <Link to="/properties" className="text-gray-600 hover:text-emerald-600 transition-colors">
              Browse Properties
            </Link>
            <Link to="/dashboard" className="text-gray-600 hover:text-emerald-600 transition-colors">
              Dashboard
            </Link>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" asChild>
              <Link to="/login">Login</Link>
            </Button>
            <Button className="bg-emerald-600 hover:bg-emerald-700" asChild>
              <Link to="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-50 to-teal-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Find Your Perfect
            <span className="text-emerald-600"> Nyumbani</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover, rent, and manage properties across Kenya with Africa's most trusted real estate platform
          </p>
          
          {/* Search Bar */}
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="flex items-center space-x-2 border rounded-lg px-4 py-2">
                <MapPin className="h-5 w-5 text-gray-400" />
                <Input 
                  placeholder="Location (e.g., Westlands)" 
                  className="border-0 focus-visible:ring-0 p-0" 
                />
              </div>
              <select className="border rounded-lg px-4 py-2 bg-white">
                <option>Property Type</option>
                <option>Apartment</option>
                <option>Villa</option>
                <option>Townhouse</option>
                <option>Office</option>
              </select>
              <select className="border rounded-lg px-4 py-2 bg-white">
                <option>Price Range</option>
                <option>Under KSh 50,000</option>
                <option>KSh 50,000 - 100,000</option>
                <option>KSh 100,000 - 200,000</option>
                <option>Over KSh 200,000</option>
              </select>
              <Button className="bg-emerald-600 hover:bg-emerald-700 w-full">
                <Search className="h-5 w-5 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Properties</h2>
              <p className="text-gray-600">Discover the best properties available right now</p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/properties">View All Properties</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property) => (
              <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                <div className="aspect-video bg-gray-200 relative overflow-hidden">
                  <img 
                    src={property.image} 
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-4 left-4 bg-emerald-600">
                    {property.type}
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{property.title}</CardTitle>
                  <CardDescription className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    {property.location}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-bold text-emerald-600">{property.price}</span>
                    <div className="text-sm text-gray-500">
                      {property.bedrooms} bed • {property.bathrooms} bath
                    </div>
                  </div>
                  <Button className="w-full" variant="outline" asChild>
                    <Link to={`/properties/${property.id}`}>View Details</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Nyumbani?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're revolutionizing real estate in Africa with technology, trust, and transparency
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How Nyumbani Works</h2>
            <p className="text-gray-600">Simple steps to find your perfect home</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">1. Search</h3>
              <p className="text-gray-600">Browse thousands of verified properties across Kenya</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Home className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">2. Visit</h3>
              <p className="text-gray-600">Schedule viewings and connect with verified landlords</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">3. Move In</h3>
              <p className="text-gray-600">Secure payments and seamless move-in process</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-emerald-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Find Your Nyumbani?</h2>
          <p className="text-emerald-100 mb-8 max-w-2xl mx-auto">
            Join thousands of Kenyans who have found their perfect homes through our platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100" asChild>
              <Link to="/properties">Browse Properties</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-emerald-600" asChild>
              <Link to="/properties/new">List Your Property</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Home className="h-6 w-6 text-emerald-500" />
                <span className="text-xl font-bold">Nyumbani</span>
              </div>
              <p className="text-gray-400">
                Africa's leading real estate platform, connecting people with their perfect homes.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Tenants</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Browse Properties</li>
                <li>Saved Searches</li>
                <li>Payment History</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Landlords</h4>
              <ul className="space-y-2 text-gray-400">
                <li>List Property</li>
                <li>Manage Listings</li>
                <li>Tenant Screening</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Terms of Service</li>
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
