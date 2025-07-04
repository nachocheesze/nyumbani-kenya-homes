
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  MapPin, 
  Home, 
  Bed, 
  Bath, 
  Square, 
  Car, 
  Wifi, 
  Shield, 
  Phone, 
  Mail,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

const PropertyDetail = () => {
  const { id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  // Mock property data - in real app, fetch based on id
  const property = {
    id: 1,
    title: "Modern 3BR Apartment in Westlands",
    price: "KSh 85,000",
    location: "Westlands, Nairobi",
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    bedrooms: 3,
    bathrooms: 2,
    type: "Apartment",
    area: "120 sqm",
    description: "Beautiful modern apartment located in the heart of Westlands. This spacious 3-bedroom unit features contemporary finishes, ample natural light, and stunning city views. Perfect for families or professionals looking for comfort and convenience.",
    amenities: [
      "Swimming Pool", "Gym", "Parking", "Security", "Elevator", 
      "Backup Generator", "Water Backup", "CCTV", "Intercom", "Garden"
    ],
    features: [
      "Fully Fitted Kitchen",
      "Master En-suite",
      "Built-in Wardrobes",
      "Balcony with City View",
      "Tiled Floors",
      "High-speed Internet Ready"
    ],
    landlord: {
      name: "Sarah Wanjiku",
      role: "Landlord",
      avatar: "/placeholder.svg",
      phone: "+254 712 345 678",
      email: "sarah.wanjiku@email.com",
      properties: 12,
      rating: 4.8
    },
    nearby: [
      "Westgate Shopping Mall - 5 min walk",
      "Sarit Centre - 10 min drive",
      "ABC Place - 8 min walk",
      "Westlands Primary School - 3 min walk",
      "Aga Khan Hospital - 15 min drive"
    ]
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

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

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <Link to="/" className="hover:text-emerald-600">Home</Link>
          <span>/</span>
          <Link to="/properties" className="hover:text-emerald-600">Properties</Link>
          <span>/</span>
          <span className="text-gray-900">{property.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="relative mb-6">
              <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden relative">
                <img 
                  src={property.images[currentImageIndex]} 
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20" />
                
                {/* Navigation Arrows */}
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>

                {/* Image Indicators */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {property.images.map((_, index) => (
                    <button
                      key={index}
                      className={`w-2 h-2 rounded-full ${index === currentImageIndex ? 'bg-white' : 'bg-white/50'}`}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="bg-white/90 hover:bg-white"
                    onClick={() => setIsLiked(!isLiked)}
                  >
                    <Heart className={`h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="bg-white/90 hover:bg-white"
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Thumbnail Strip */}
              <div className="flex space-x-2 mt-4 overflow-x-auto">
                {property.images.map((image, index) => (
                  <button
                    key={index}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${index === currentImageIndex ? 'border-emerald-600' : 'border-transparent'}`}
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <img src={image} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Property Info */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="h-5 w-5 mr-2" />
                    {property.location}
                  </div>
                  <Badge className="bg-emerald-100 text-emerald-800">{property.type}</Badge>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-emerald-600">{property.price}</div>
                  <div className="text-gray-600">per month</div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                  <Bed className="h-5 w-5 text-gray-600" />
                  <div>
                    <div className="font-semibold">{property.bedrooms}</div>
                    <div className="text-sm text-gray-600">Bedrooms</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                  <Bath className="h-5 w-5 text-gray-600" />
                  <div>
                    <div className="font-semibold">{property.bathrooms}</div>
                    <div className="text-sm text-gray-600">Bathrooms</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                  <Square className="h-5 w-5 text-gray-600" />
                  <div>
                    <div className="font-semibold">{property.area}</div>
                    <div className="text-sm text-gray-600">Area</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                  <Car className="h-5 w-5 text-gray-600" />
                  <div>
                    <div className="font-semibold">Yes</div>
                    <div className="text-sm text-gray-600">Parking</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">{property.description}</p>
              </CardContent>
            </Card>

            {/* Features & Amenities */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle>Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {property.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-600">
                        <div className="w-2 h-2 bg-emerald-600 rounded-full mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Amenities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    {property.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center text-gray-600">
                        <Shield className="h-4 w-4 mr-2 text-emerald-600" />
                        <span className="text-sm">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Nearby Places */}
            <Card>
              <CardHeader>
                <CardTitle>What's Nearby</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {property.nearby.map((place, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-3 text-emerald-600" />
                      {place}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Contact Card */}
            <Card className="sticky top-24 mb-6">
              <CardHeader>
                <CardTitle>Contact Property Owner</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 mb-6">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={property.landlord.avatar} />
                    <AvatarFallback>{property.landlord.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-lg">{property.landlord.name}</h3>
                    <p className="text-gray-600">{property.landlord.role}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>{property.landlord.properties} properties</span>
                      <span>⭐ {property.landlord.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                    <Phone className="h-4 w-4 mr-2" />
                    Call {property.landlord.phone}
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Mail className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </div>

                <Separator className="my-4" />

                <div className="text-center">
                  <Button variant="outline" className="w-full">
                    Schedule Viewing
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Interested in this property?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                  Apply to Rent
                </Button>
                <Button variant="outline" className="w-full">
                  Save to Favorites
                </Button>
                <Button variant="outline" className="w-full">
                  Calculate Mortgage
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
