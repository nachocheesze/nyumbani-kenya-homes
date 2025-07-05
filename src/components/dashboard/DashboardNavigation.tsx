
import { Home, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

interface DashboardNavigationProps {
  currentRole: string;
  setCurrentRole: (role: string) => void;
}

const DashboardNavigation = ({ currentRole }: DashboardNavigationProps) => {
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
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
          <Button
            variant="outline"
            size="sm"
            onClick={handleSignOut}
            className="flex items-center space-x-2"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavigation;
