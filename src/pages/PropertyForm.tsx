
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Home, 
  Upload, 
  MapPin, 
  DollarSign, 
  Bed, 
  Bath, 
  Square,
  Plus,
  X
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const PropertyForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    propertyType: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    images: [],
    amenities: [],
    features: []
  });

  const [customAmenity, setCustomAmenity] = useState("");
  const [customFeature, setCustomFeature] = useState("");

  const propertyTypes = [
    "Apartment", "Villa", "Townhouse", "Studio", "Office", "Shop", "Warehouse"
  ];

  const commonAmenities = [
    "Swimming Pool", "Gym", "Parking", "Security", "Elevator", 
    "Backup Generator", "Water Backup", "CCTV", "Intercom", "Garden",
    "Balcony", "Terrace", "Laundry", "Storage", "Pet Friendly"
  ];

  const commonFeatures = [
    "Fully Fitted Kitchen", "Master En-suite", "Built-in Wardrobes",
    "City View", "Garden View", "Tiled Floors", "Wooden Floors",
    "High-speed Internet Ready", "Air Conditioning", "Central Heating"
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleAmenity = (amenity: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const toggleFeature = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  const addCustomAmenity = () => {
    if (customAmenity.trim() && !formData.amenities.includes(customAmenity.trim())) {
      setFormData(prev => ({
        ...prev,
        amenities: [...prev.amenities, customAmenity.trim()]
      }));
      setCustomAmenity("");
    }
  };

  const addCustomFeature = () => {
    if (customFeature.trim() && !formData.features.includes(customFeature.trim())) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, customFeature.trim()]
      }));
      setCustomFeature("");
    }
  };

  const removeAmenity = (amenity: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.filter(a => a !== amenity)
    }));
  };

  const removeFeature = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter(f => f !== feature)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would normally submit to your backend
    console.log("Property data:", formData);
    // Simulate success and redirect
    navigate('/dashboard');
  };

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
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">List Your Property</h1>
          <p className="text-gray-600">
            Share your property with thousands of potential tenants across Kenya
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>Tell us about your property</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="title">Property Title *</Label>
                    <Input
                      id="title"
                      placeholder="e.g., Modern 3BR Apartment in Westlands"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your property, its features, and what makes it special..."
                      rows={4}
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="propertyType">Property Type *</Label>
                      <Select onValueChange={(value) => handleInputChange('propertyType', value)} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select property type" />
                        </SelectTrigger>
                        <SelectContent>
                          {propertyTypes.map(type => (
                            <SelectItem key={type} value={type.toLowerCase()}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="location">Location *</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="location"
                          placeholder="e.g., Westlands, Nairobi"
                          className="pl-10"
                          value={formData.location}
                          onChange={(e) => handleInputChange('location', e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Property Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Property Details</CardTitle>
                  <CardDescription>Specific details about your property</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <Label htmlFor="price">Monthly Rent (KSh) *</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="price"
                          type="number"
                          placeholder="85000"
                          className="pl-10"
                          value={formData.price}
                          onChange={(e) => handleInputChange('price', e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="bedrooms">Bedrooms *</Label>
                      <div className="relative">
                        <Bed className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="bedrooms"
                          type="number"
                          placeholder="3"
                          className="pl-10"
                          value={formData.bedrooms}
                          onChange={(e) => handleInputChange('bedrooms', e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="bathrooms">Bathrooms *</Label>
                      <div className="relative">
                        <Bath className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="bathrooms"
                          type="number"
                          placeholder="2"
                          className="pl-10"
                          value={formData.bathrooms}
                          onChange={(e) => handleInputChange('bathrooms', e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="area">Area (sqm)</Label>
                      <div className="relative">
                        <Square className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="area"
                          type="number"
                          placeholder="120"
                          className="pl-10"
                          value={formData.area}
                          onChange={(e) => handleInputChange('area', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Amenities */}
              <Card>
                <CardHeader>
                  <CardTitle>Amenities</CardTitle>
                  <CardDescription>What amenities does your property offer?</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {commonAmenities.map(amenity => (
                      <div key={amenity} className="flex items-center space-x-2">
                        <Checkbox
                          id={amenity}
                          checked={formData.amenities.includes(amenity)}
                          onCheckedChange={() => toggleAmenity(amenity)}
                        />
                        <Label htmlFor={amenity} className="text-sm">{amenity}</Label>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  <div>
                    <Label>Add Custom Amenity</Label>
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Enter custom amenity"
                        value={customAmenity}
                        onChange={(e) => setCustomAmenity(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomAmenity())}
                      />
                      <Button type="button" variant="outline" onClick={addCustomAmenity}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {formData.amenities.length > 0 && (
                    <div>
                      <Label>Selected Amenities</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {formData.amenities.map(amenity => (
                          <Badge key={amenity} variant="secondary" className="flex items-center space-x-1">
                            <span>{amenity}</span>
                            <button
                              type="button"
                              onClick={() => removeAmenity(amenity)}
                              className="ml-1 hover:bg-gray-200 rounded-full p-0.5"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Features */}
              <Card>
                <CardHeader>
                  <CardTitle>Property Features</CardTitle>
                  <CardDescription>Specific features of your property</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {commonFeatures.map(feature => (
                      <div key={feature} className="flex items-center space-x-2">
                        <Checkbox
                          id={feature}
                          checked={formData.features.includes(feature)}
                          onCheckedChange={() => toggleFeature(feature)}
                        />
                        <Label htmlFor={feature} className="text-sm">{feature}</Label>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  <div>
                    <Label>Add Custom Feature</Label>
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Enter custom feature"
                        value={customFeature}
                        onChange={(e) => setCustomFeature(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomFeature())}
                      />
                      <Button type="button" variant="outline" onClick={addCustomFeature}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {formData.features.length > 0 && (
                    <div>
                      <Label>Selected Features</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {formData.features.map(feature => (
                          <Badge key={feature} variant="secondary" className="flex items-center space-x-1">
                            <span>{feature}</span>
                            <button
                              type="button"
                              onClick={() => removeFeature(feature)}
                              className="ml-1 hover:bg-gray-200 rounded-full p-0.5"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Images */}
              <Card>
                <CardHeader>
                  <CardTitle>Property Images</CardTitle>
                  <CardDescription>Upload high-quality photos of your property</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Upload Images</h3>
                    <p className="text-gray-600 mb-4">
                      Drag and drop your images here, or click to browse
                    </p>
                    <Button variant="outline">
                      Choose Files
                    </Button>
                    <p className="text-sm text-gray-500 mt-2">
                      Support: JPG, PNG, WebP. Max file size: 5MB each
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle>Publishing Options</CardTitle>
                  <CardDescription>Review and publish your listing</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-emerald-50 rounded-lg">
                    <h4 className="font-semibold text-emerald-800 mb-2">Listing Preview</h4>
                    {formData.title && (
                      <p className="text-sm text-emerald-700 mb-1">
                        <strong>Title:</strong> {formData.title}
                      </p>
                    )}
                    {formData.location && (
                      <p className="text-sm text-emerald-700 mb-1">
                        <strong>Location:</strong> {formData.location}
                      </p>
                    )}
                    {formData.price && (
                      <p className="text-sm text-emerald-700">
                        <strong>Rent:</strong> KSh {parseInt(formData.price).toLocaleString()}/month
                      </p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms" required />
                      <Label htmlFor="terms" className="text-sm">
                        I agree to the Terms of Service and Privacy Policy
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="verified" />
                      <Label htmlFor="verified" className="text-sm">
                        I confirm all information is accurate and verified
                      </Label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Button 
                      type="submit" 
                      className="w-full bg-emerald-600 hover:bg-emerald-700"
                      disabled={!formData.title || !formData.description || !formData.price}
                    >
                      Publish Listing
                    </Button>
                    <Button type="button" variant="outline" className="w-full">
                      Save as Draft
                    </Button>
                  </div>

                  <div className="text-xs text-gray-500 space-y-1">
                    <p>• Listings are reviewed within 24 hours</p>
                    <p>• Free listing for the first 30 days</p>
                    <p>• Premium features available</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PropertyForm;
