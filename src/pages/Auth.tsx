import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Home, Eye, EyeOff, User, Building, Briefcase, Wrench, TrendingUp, Calendar } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";

const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { signUp, signIn, user } = useAuth();
  
  // Determine the active tab based on the current path
  const getActiveTab = () => {
    if (location.pathname === '/signup') return 'signup';
    return 'login';
  };
  
  const [activeTab, setActiveTab] = useState(getActiveTab());
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [loading, setLoading] = useState(false);
  
  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  
  // Update active tab when location changes
  useEffect(() => {
    setActiveTab(getActiveTab());
  }, [location.pathname, getActiveTab]);
  
  // Redirect authenticated users
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);
  
  // Handle tab changes and update URL
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    navigate(value === 'signup' ? '/signup' : '/login', { replace: true });
  };
  
  const userRoles = [
    { 
      value: "tenant", 
      label: "Tenant", 
      description: "Find and rent properties",
      icon: User,
      color: "bg-blue-100 text-blue-800"
    },
    { 
      value: "landlord", 
      label: "Landlord", 
      description: "List and manage your properties",
      icon: Building,
      color: "bg-green-100 text-green-800"
    },
    { 
      value: "agent", 
      label: "Real Estate Agent", 
      description: "Manage properties for clients",
      icon: Briefcase,
      color: "bg-purple-100 text-purple-800"
    },
    { 
      value: "real_estate_company", 
      label: "Real Estate Company", 
      description: "Manage multiple agents and properties",
      icon: Building,
      color: "bg-emerald-100 text-emerald-800"
    },
    { 
      value: "service_provider", 
      label: "Service Provider", 
      description: "Offer maintenance and home services",
      icon: Wrench,
      color: "bg-orange-100 text-orange-800"
    },
    { 
      value: "developer", 
      label: "Developer", 
      description: "Real estate development projects",
      icon: TrendingUp,
      color: "bg-indigo-100 text-indigo-800"
    },
    { 
      value: "investor", 
      label: "Investor", 
      description: "Investment opportunities and ROI tracking",
      icon: TrendingUp,
      color: "bg-yellow-100 text-yellow-800"
    },
    { 
      value: "short_term_host", 
      label: "Short-term Host", 
      description: "Airbnb-style short-term rentals",
      icon: Calendar,
      color: "bg-pink-100 text-pink-800"
    }
  ];

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const fullName = `${firstName} ${lastName}`.trim();
    const { error } = await signUp(email, password, fullName, phoneNumber, selectedRole);
    
    if (!error) {
      // Clear form
      setEmail("");
      setPassword("");
      setFirstName("");
      setLastName("");
      setPhoneNumber("");
      setSelectedRole("");
    }
    
    setLoading(false);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await signIn(email, password);
    
    if (!error) {
      navigate('/dashboard');
    }
    
    setLoading(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      {/* Navigation */}
      <nav className="border-b bg-white/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Home className="h-8 w-8 text-emerald-600" />
            <Link to="/" className="text-2xl font-bold text-gray-900">Nyumbani</Link>
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

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {activeTab === 'signup' ? 'Join Nyumbani' : 'Welcome Back'}
            </h1>
            <p className="text-gray-600">
              {activeTab === 'signup'
                ? 'Create your account and start your real estate journey' 
                : 'Sign in to access your dashboard and properties'
              }
            </p>
          </div>

          <Card className="shadow-lg">
            <CardContent className="p-8">
              <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>

                <TabsContent value="login">
                  <form onSubmit={handleSignIn} className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address
                        </label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="w-full"
                        />
                      </div>

                      <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                          Password
                        </label>
                        <div className="relative">
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full pr-12"
                            autoComplete="current-password"
                          />
                          <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                          >
                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                          </button>
                        </div>
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-emerald-600 hover:bg-emerald-700"
                      disabled={loading}
                    >
                      {loading ? "Signing In..." : "Sign In"}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="signup">
                  <form onSubmit={handleSignUp} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                          First Name
                        </label>
                        <Input
                          id="firstName"
                          type="text"
                          placeholder="John"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          required
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                          Last Name
                        </label>
                        <Input
                          id="lastName"
                          type="text"
                          placeholder="Doe"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          required
                          className="w-full"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="signupEmail" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <Input
                        id="signupEmail"
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+254 700 123 456"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label htmlFor="signupPassword" className="block text-sm font-medium text-gray-700 mb-2">
                        Password
                      </label>
                      <div className="relative">
                        <Input
                          id="signupPassword"
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a strong password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          className="w-full pr-12"
                          autoComplete="new-password"
                        />
                        <button
                          type="button"
                          onClick={togglePasswordVisibility}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        I am a... <span className="text-red-500">*</span>
                      </label>
                      <Select value={selectedRole} onValueChange={setSelectedRole}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select your role" />
                        </SelectTrigger>
                        <SelectContent>
                          {userRoles.map((role) => {
                            const IconComponent = role.icon;
                            return (
                              <SelectItem key={role.value} value={role.value} className="py-3">
                                <div className="flex items-center space-x-3 w-full">
                                  <IconComponent className="h-5 w-5 text-emerald-600" />
                                  <div className="flex-1">
                                    <div className="font-medium">{role.label}</div>
                                    <div className="text-sm text-gray-500">{role.description}</div>
                                  </div>
                                </div>
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                      
                      {selectedRole && (
                        <div className="mt-3 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                          <div className="flex items-center space-x-2">
                            <Badge className={userRoles.find(r => r.value === selectedRole)?.color}>
                              {userRoles.find(r => r.value === selectedRole)?.label}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            {userRoles.find(r => r.value === selectedRole)?.description}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        id="terms"
                        required
                        className="mt-1 h-4 w-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                      />
                      <label htmlFor="terms" className="text-sm text-gray-600">
                        I agree to the{" "}
                        <Link to="/terms" className="text-emerald-600 hover:text-emerald-700">
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link to="/privacy" className="text-emerald-600 hover:text-emerald-700">
                          Privacy Policy
                        </Link>
                      </label>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-emerald-600 hover:bg-emerald-700"
                      disabled={!selectedRole || loading}
                    >
                      {loading ? "Creating Account..." : "Create Account"}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <div className="text-center mt-6 text-sm text-gray-600">
            {activeTab === 'signup' ? (
              <p>
                Already have an account?{" "}
                <button 
                  onClick={() => handleTabChange('login')}
                  className="text-emerald-600 hover:text-emerald-700 font-medium"
                >
                  Sign in here
                </button>
              </p>
            ) : (
              <p>
                Don't have an account?{" "}
                <button 
                  onClick={() => handleTabChange('signup')}
                  className="text-emerald-600 hover:text-emerald-700 font-medium"
                >
                  Sign up here
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
