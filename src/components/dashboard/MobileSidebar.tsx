
import React from 'react';
import { X, Home, LogOut, User, ChevronDown, ChevronRight } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useState } from 'react';

interface MobileSidebarProps {
  role: string;
  isOpen: boolean;
  onClose: () => void;
}

const MobileSidebar: React.FC<MobileSidebarProps> = ({ role, isOpen, onClose }) => {
  const location = useLocation();
  const { signOut, userProfile } = useAuth();
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    'Overview': true,
    'Property Management': true,
    'Financial': false,
    'Communication': false,
    'Business': false,
    'Services': false,
    'Platform Management': false,
    'Analytics & Finance': false,
    'Business Management': false,
    'Guest Management': false,
    'Development': false,
    'Investment Management': false,
    'Quality': false
  });

  const toggleSection = (sectionTitle: string) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionTitle]: !prev[sectionTitle]
    }));
  };

  const getNavigationByRole = (role: string) => {
    const dashboardItem = { title: 'Dashboard', href: `/dashboard/${role}`, icon: Home };

    switch (role) {
      case 'tenant':
        return [
          { title: 'Overview', items: [dashboardItem], defaultOpen: true },
          {
            title: 'Property Management',
            items: [
              { title: 'Rent', href: '/dashboard/tenant/rent', icon: 'CreditCard' },
              { title: 'Lease', href: '/dashboard/tenant/lease', icon: 'FileText' },
              { title: 'Maintenance', href: '/dashboard/tenant/maintenance', icon: 'Wrench', badge: '2' }
            ],
            defaultOpen: true
          },
          {
            title: 'Financial',
            items: [
              { title: 'Wallet', href: '/dashboard/tenant/wallet', icon: 'Wallet' }
            ]
          },
          {
            title: 'Communication',
            items: [
              { title: 'Messages', href: '/dashboard/tenant/messages', icon: 'MessageSquare', badge: '3' }
            ]
          }
        ];

      case 'landlord':
        return [
          { title: 'Overview', items: [dashboardItem], defaultOpen: true },
          {
            title: 'Property Management',
            items: [
              { title: 'Properties', href: '/dashboard/property-management/properties', icon: 'Building' },
              { title: 'Tenants', href: '/dashboard/property-management/tenants', icon: 'Users' },
              { title: 'Leases', href: '/dashboard/landlord/leases', icon: 'FileText' },
              { title: 'Requests', href: '/dashboard/landlord/requests', icon: 'Wrench', badge: '5' }
            ],
            defaultOpen: true
          },
          {
            title: 'Financial',
            items: [
              { title: 'Transactions', href: '/dashboard/landlord/transactions', icon: 'Wallet' },
              { title: 'Insurance', href: '/dashboard/landlord/insurance', icon: 'Shield' },
              { title: 'Reports', href: '/dashboard/landlord/reports', icon: 'BarChart3' }
            ]
          },
          {
            title: 'Communication',
            items: [
              { title: 'Messages', href: '/dashboard/landlord/messages', icon: 'MessageSquare' },
              { title: 'Agents', href: '/dashboard/landlord/agents', icon: 'Handshake' },
              { title: 'Documents', href: '/dashboard/landlord/documents', icon: 'ClipboardList' }
            ]
          }
        ];

      case 'agent':
        return [
          { title: 'Overview', items: [dashboardItem], defaultOpen: true },
          {
            title: 'Business',
            items: [
              { title: 'Properties', href: '/dashboard/property-management/properties', icon: 'Building' },
              { title: 'Listings', href: '/dashboard/agent/listings', icon: 'Building' },
              { title: 'Viewings', href: '/dashboard/agent/viewings', icon: 'Calendar' },
              { title: 'Clients', href: '/dashboard/agent/clients', icon: 'Users' }
            ],
            defaultOpen: true
          },
          {
            title: 'Financial',
            items: [
              { title: 'Earnings', href: '/dashboard/agent/earnings', icon: 'DollarSign' }
            ]
          },
          {
            title: 'Communication',
            items: [
              { title: 'Messages', href: '/dashboard/agent/messages', icon: 'MessageSquare' }
            ]
          }
        ];

      case 'admin':
      case 'super_admin':
        return [
          { title: 'Overview', items: [dashboardItem], defaultOpen: true },
          {
            title: 'Property Management',
            items: [
              { title: 'Properties', href: '/dashboard/property-management/properties', icon: 'Building' },
              { title: 'Tenants', href: '/dashboard/property-management/tenants', icon: 'Users' }
            ],
            defaultOpen: true
          },
          {
            title: 'Platform Management',
            items: [
              { title: 'Users', href: '/dashboard/admin/users', icon: 'Users' },
              { title: 'KYC Verification', href: '/dashboard/admin/kyc', icon: 'Shield' },
              { title: 'System Config', href: '/dashboard/admin/config', icon: 'Settings' }
            ]
          },
          {
            title: 'Analytics & Finance',
            items: [
              { title: 'Platform Finances', href: '/dashboard/admin/finances', icon: 'DollarSign' },
              { title: 'Analytics', href: '/dashboard/admin/analytics', icon: 'Activity' }
            ]
          }
        ];

      default:
        return [{ title: 'Overview', items: [dashboardItem], defaultOpen: true }];
    }
  };

  const navigation = getNavigationByRole(role);

  const getIconComponent = (iconName: string) => {
    const icons = {
      'Home': Home,
      'Building': require('lucide-react').Building,
      'Users': require('lucide-react').Users,
      'FileText': require('lucide-react').FileText,
      'Wrench': require('lucide-react').Wrench,
      'Wallet': require('lucide-react').Wallet,
      'MessageSquare': require('lucide-react').MessageSquare,
      'CreditCard': require('lucide-react').CreditCard,
      'Shield': require('lucide-react').Shield,
      'BarChart3': require('lucide-react').BarChart3,
      'Handshake': require('lucide-react').Handshake,
      'ClipboardList': require('lucide-react').ClipboardList,
      'Calendar': require('lucide-react').Calendar,
      'DollarSign': require('lucide-react').DollarSign,
      'Settings': require('lucide-react').Settings,
      'Activity': require('lucide-react').Activity
    };
    return icons[iconName as keyof typeof icons] || Home;
  };

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
          {navigation.map((section) => (
            <div key={section.title} className="space-y-1">
              <Collapsible 
                open={openSections[section.title]}
                onOpenChange={() => toggleSection(section.title)}
              >
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-between text-xs font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 h-8"
                  >
                    <span>{section.title}</span>
                    {openSections[section.title] ? (
                      <ChevronDown className="h-3 w-3" />
                    ) : (
                      <ChevronRight className="h-3 w-3" />
                    )}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-1">
                  {section.items.map((item) => {
                    const isActive = location.pathname === item.href;
                    const IconComponent = getIconComponent(item.icon);
                    
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
                        <IconComponent className="h-5 w-5 mr-3" />
                        <span className="flex-1">{item.title}</span>
                        {item.badge && (
                          <span className="ml-auto bg-emerald-600 text-white text-xs rounded-full px-2 py-0.5">
                            {item.badge}
                          </span>
                        )}
                      </NavLink>
                    );
                  })}
                </CollapsibleContent>
              </Collapsible>
            </div>
          ))}
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
