
import { Home, LogOut, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

interface DashboardNavigationProps {
  currentRole: string;
  setCurrentRole: (role: string) => void;
  onToggleSidebar?: () => void;
}

const DashboardNavigation = ({ currentRole, onToggleSidebar }: DashboardNavigationProps) => {
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <nav className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {onToggleSidebar && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleSidebar}
              className="md:hidden"
            >
              <Menu className="h-4 w-4" />
            </Button>
          )}
          <div className="flex items-center space-x-2">
            <Home className="h-6 w-6 text-emerald-600" />
            <Link to="/" className="text-xl font-bold text-gray-900">Nyumbani</Link>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="hidden md:block">
            <span className="text-sm text-gray-600 capitalize">{currentRole.replace('_', ' ')}</span>
          </div>
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
