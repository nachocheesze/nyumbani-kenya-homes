
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, Home, Filter, Grid, List } from "lucide-react";
import { Link } from "react-router-dom";

const Properties = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  const properties = [
    {
      id: 1,
      title: "Modern 3BR Apartment in Westlands",
      price: "KSh 85,000",
      location: "Westlands, Nairobi",
      image: "/placeholder.svg",
      bedrooms: 3,
      bathrooms: 2,
      type: "Apartment",
      area: "120 sqm",
      amenities: ["Parking", "Swimming Pool", "Gym", "Security"]
    },
    {
      id: 2,
      title: "Luxury Villa in Karen",
      price: "KSh 250,000",
      location: "Karen, Nairobi",
      image: "/placeholder.svg",
      bedrooms: 5,
      bathrooms: 4,
      type: "Villa",
      area: "350 sqm",
      amenities: ["Garden", "Parking", "Security", "Maids Quarter"]
    },
    {
      id: 3,
      title: "Cozy 2BR in Kilimani",
      price: "KSh 65,000",
      location: "Kilimani, Nairobi",
      image: "/placeholder.svg",
      bedrooms: 2,
      bathrooms: 2,
      type: "Apartment",
      area: "85 sqm",
      amenities: ["Parking", "Elevator", "Security"]
    },
    {
      id: 4,
      title: "Executive Townhouse in Lavington",
      price: "KSh 180,000",
      location: "Lavington, Nairobi",
      image: "/placeholder.svg",
      bedrooms: 4,
      bathrooms: 3,
      type: "Townhouse",
      area: "200 sqm",
      amenities: ["Garden", "Parking", "Security", "Swimming Pool"]
    },
    {
      id: 5,
      title: "Modern Studio in CBD",
      price: "KSh 45,000",
      location: "CBD, Nairobi",
      image: "/placeholder.svg",
      bedrooms: 1,
      bathrooms: 1,
      type: "Studio",
      area: "45 sqm",
      amenities: ["Parking", "Security", "High-speed Internet"]
    },
    {
      id: 6,
      title: "Family Home in Runda",
      price: "KSh 320,000",
      location: "Runda, Nairobi",
      image: "/placeholder.svg",
      bedrooms: 6,
      bathrooms: 5,
      type: "Villa",
      area: "450 sqm",
      amenities: ["Garden", "Swimming Pool", "Gym", "Security", "Staff Quarters"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-white/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Home className="h-8 w-8 text-emerald-600" />
            <Link to="/" className="text-2xl font-bold text-gray-900">Nyumbani</Link>
          </div>
          <div className="hidden md:flex space-x-6">
            <Link to="/properties" className="text-emerald-600 font-medium">
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

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
            <div className="flex items-center space-x-2 border rounded-lg px-4 py-2">
              <Search className="h-5 w-5 text-gray-400" />
              <Input 
                placeholder="Search properties..." 
                className="border-0 focus-visible:ring-0 p-0" 
              />
            </div>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="westlands">Westlands</SelectItem>
                <SelectItem value="karen">Karen</SelectItem>
                <SelectItem value="kilimani">Kilimani</SelectItem>
                <SelectItem value="lavington">Lavington</SelectItem>
                <SelectItem value="runda">Runda</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Property Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="apartment">Apartment</SelectItem>
                <SelectItem value="villa">Villa</SelectItem>
                <SelectItem value="townhouse">Townhouse</SelectItem>
                <SelectItem value="studio">Studio</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0-50000">Under KSh 50,000</SelectItem>
                <SelectItem value="50000-100000">KSh 50,000 - 100,000</SelectItem>
                <SelectItem value="100000-200000">KSh 100,000 - 200,000</SelectItem>
                <SelectItem value="200000+">Over KSh 200,000</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Filter className="h-4 w-4 mr-2" />
              Apply Filters
            </Button>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Properties for Rent</h1>
            <p className="text-gray-600">{properties.length} properties found</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Properties Grid/List */}
        <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-6"}>
          {properties.map((property) => (
            <Card key={property.id} className={`overflow-hidden hover:shadow-lg transition-shadow group ${viewMode === 'list' ? 'flex flex-col md:flex-row' : ''}`}>
              <div className={`bg-gray-200 relative overflow-hidden ${viewMode === 'list' ? 'md:w-1/3 aspect-video md:aspect-square' : 'aspect-video'}`}>
                <img 
                  src={property.image} 
                  alt={property.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-4 left-4 bg-emerald-600">
                  {property.type}
                </Badge>
              </div>
              <div className={viewMode === 'list' ? 'md:w-2/3 flex flex-col' : ''}>
                <CardHeader>
                  <CardTitle className="text-lg">{property.title}</CardTitle>
                  <CardDescription className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    {property.location}
                  </CardDescription>
                </CardHeader>
                <CardContent className={viewMode === 'list' ? 'flex-1' : ''}>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-bold text-emerald-600">{property.price}</span>
                    <div className="text-sm text-gray-500">
                      {property.bedrooms} bed • {property.bathrooms} bath • {property.area}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {property.amenities.slice(0, 3).map((amenity, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {amenity}
                      </Badge>
                    ))}
                    {property.amenities.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{property.amenities.length - 3} more
                      </Badge>
                    )}
                  </div>
                  <Button className="w-full" variant="outline" asChild>
                    <Link to={`/properties/${property.id}`}>View Details</Link>
                  </Button>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-12">
          <div className="flex space-x-2">
            <Button variant="outline" disabled>Previous</Button>
            <Button className="bg-emerald-600">1</Button>
            <Button variant="outline">2</Button>
            <Button variant="outline">3</Button>
            <Button variant="outline">Next</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Properties;
