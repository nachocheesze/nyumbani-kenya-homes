
import { Home } from "lucide-react";
import { Link } from "react-router-dom";

interface DashboardNavigationProps {
  currentRole: string;
  setCurrentRole: (role: string) => void;
}

const DashboardNavigation = ({ currentRole, setCurrentRole }: DashboardNavigationProps) => {
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
        
        {/* Role Switcher for Testing - Remove in Production */}
        <div className="flex items-center space-x-4">
          <select 
            value={currentRole} 
            onChange={(e) => setCurrentRole(e.target.value)}
            className="px-3 py-1 border rounded text-sm"
          >
            <option value="tenant">Tenant</option>
            <option value="landlord">Landlord</option>
            <option value="agent">Agent</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavigation;
