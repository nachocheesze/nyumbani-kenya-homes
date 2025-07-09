
import React from 'react';
import { X, Home, LogOut, User } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

interface MobileSidebarProps {
  role: string;
  isOpen: boolean;
  onClose: () => void;
}

const MobileSidebar: React.FC<MobileSidebarProps> = ({ role, isOpen, onClose }) => {
  const location = useLocation();
  const { signOut, userProfile } = useAuth();

  // Simple navigation items for mobile
  const mobileNavItems = [
    { title: 'Dashboard', href: `/dashboard/${role}`, icon: Home },
    // Add key navigation items based on role
    ...(role === 'tenant' ? [
      { title: 'Rent', href: '/dashboard/tenant/rent', icon: Home },
      { title: 'Maintenance', href: '/dashboard/tenant/maintenance', icon: Home },
      { title: 'Messages', href: '/dashboard/tenant/messages', icon: Home }
    ] : []),
    ...(role === 'landlord' ? [
      { title: 'Properties', href: '/dashboard/landlord/properties', icon: Home },
      { title: 'Tenants', href: '/dashboard/landlord/tenants', icon: Home },
      { title: 'Transactions', href: '/dashboard/landlord/transactions', icon: Home }
    ] : [])
  ];

  const handleSignOut = async () => {
    await signOut();
    onClose();
  };

  const handleNavClick = () => {
    onClose();
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden transition-opacity duration-300"
        onClick={handleOverlayClick}
      />
      
      {/* Sidebar */}
      <div className={cn(
        "fixed left-0 top-0 h-full w-80 bg-white z-50 md:hidden flex flex-col transition-transform duration-300 ease-in-out",
        isOpen ? "transform translate-x-0" : "transform -translate-x-full"
      )}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-2">
            <Home className="h-8 w-8 text-emerald-600" />
            <span className="text-xl font-bold text-gray-900">Nyumbani</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="p-2"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {mobileNavItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <NavLink
                key={item.href}
                to={item.href}
                onClick={handleNavClick}
                className={cn(
                  'flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors',
                  isActive
                    ? 'bg-emerald-100 text-emerald-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                )}
              >
                <item.icon className="h-5 w-5 mr-3" />
                <span>{item.title}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* User Section */}
        <div className="border-t p-4 space-y-4">
          {userProfile && (
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="h-10 w-10 bg-emerald-100 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-emerald-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {userProfile.full_name}
                </p>
                <p className="text-xs text-gray-500 capitalize">
                  {userProfile.role.replace('_', ' ')}
                </p>
              </div>
            </div>
          )}
          
          <Button
            onClick={handleSignOut}
            variant="outline"
            className="w-full flex items-center justify-center space-x-2"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </Button>
        </div>
      </div>
    </>
  );
};

export default MobileSidebar;
