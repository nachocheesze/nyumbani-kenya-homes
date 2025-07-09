import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Home, 
  Building, 
  Users, 
  FileText, 
  Wrench, 
  Wallet, 
  MessageSquare, 
  Settings,
  BarChart3,
  Calendar,
  Shield,
  Star,
  MapPin,
  UserCheck,
  TrendingUp,
  Eye,
  Handshake,
  ClipboardList,
  FileCheck,
  DollarSign,
  PieChart,
  Activity,
  Receipt,
  Droplets,
  Trash2,
  Bell,
  CreditCard,
  ChevronDown,
  ChevronRight,
  LogOut,
  User,
  PanelLeftClose,
  PanelLeftOpen
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useAuth } from '@/contexts/AuthContext';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface NavigationItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

interface NavigationSection {
  title: string;
  items: NavigationItem[];
  defaultOpen?: boolean;
}

interface SidebarProps {
  role: string;
  isCollapsed: boolean;
  onToggle: () => void;
}

const getNavigationByRole = (role: string): NavigationSection[] => {
  const dashboardItem = { title: 'Dashboard', href: `/dashboard/${role}`, icon: Home };

  switch (role) {
    case 'tenant':
      return [
        { title: 'Overview', items: [dashboardItem], defaultOpen: true },
        {
          title: 'Property Management',
          items: [
            { title: 'Rent', href: '/dashboard/tenant/rent', icon: CreditCard },
            { title: 'Lease', href: '/dashboard/tenant/lease', icon: FileText },
            { title: 'Maintenance', href: '/dashboard/tenant/maintenance', icon: Wrench, badge: '2' }
          ],
          defaultOpen: true
        },
        {
          title: 'Financial',
          items: [
            { title: 'Wallet', href: '/dashboard/tenant/wallet', icon: Wallet }
          ]
        },
        {
          title: 'Communication',
          items: [
            { title: 'Messages', href: '/dashboard/tenant/messages', icon: MessageSquare, badge: '3' }
          ]
        }
      ];

    case 'landlord':
      return [
        { title: 'Overview', items: [dashboardItem], defaultOpen: true },
        {
          title: 'Property Management',
          items: [
            { title: 'Properties', href: '/dashboard/landlord/properties', icon: Building },
            { title: 'Tenants', href: '/dashboard/landlord/tenants', icon: Users },
            { title: 'Leases', href: '/dashboard/landlord/leases', icon: FileText },
            { title: 'Requests', href: '/dashboard/landlord/requests', icon: Wrench, badge: '5' }
          ],
          defaultOpen: true
        },
        {
          title: 'Financial',
          items: [
            { title: 'Transactions', href: '/dashboard/landlord/transactions', icon: Wallet },
            { title: 'Insurance', href: '/dashboard/landlord/insurance', icon: Shield },
            { title: 'Reports', href: '/dashboard/landlord/reports', icon: BarChart3 }
          ]
        },
        {
          title: 'Communication',
          items: [
            { title: 'Messages', href: '/dashboard/landlord/messages', icon: MessageSquare },
            { title: 'Agents', href: '/dashboard/landlord/agents', icon: Handshake },
            { title: 'Documents', href: '/dashboard/landlord/documents', icon: ClipboardList }
          ]
        }
      ];

    case 'agent':
      return [
        { title: 'Overview', items: [dashboardItem], defaultOpen: true },
        {
          title: 'Business',
          items: [
            { title: 'Listings', href: '/dashboard/agent/listings', icon: Building },
            { title: 'Viewings', href: '/dashboard/agent/viewings', icon: Calendar },
            { title: 'Clients', href: '/dashboard/agent/clients', icon: Users }
          ],
          defaultOpen: true
        },
        {
          title: 'Financial',
          items: [
            { title: 'Earnings', href: '/dashboard/agent/earnings', icon: DollarSign }
          ]
        },
        {
          title: 'Communication',
          items: [
            { title: 'Messages', href: '/dashboard/agent/messages', icon: MessageSquare }
          ]
        }
      ];

    case 'caretaker':
      return [
        { title: 'Overview', items: [dashboardItem], defaultOpen: true },
        {
          title: 'Property Management',
          items: [
            { title: 'Tenants', href: '/dashboard/caretaker/tenants', icon: Users }
          ],
          defaultOpen: true
        },
        {
          title: 'Financial',
          items: [
            { title: 'Payments', href: '/dashboard/caretaker/payments', icon: CreditCard },
            { title: 'Receipts', href: '/dashboard/caretaker/receipts', icon: Receipt }
          ]
        },
        {
          title: 'Services',
          items: [
            { title: 'Water Management', href: '/dashboard/caretaker/water', icon: Droplets },
            { title: 'Waste Management', href: '/dashboard/caretaker/waste', icon: Trash2 }
          ]
        },
        {
          title: 'Communication',
          items: [
            { title: 'Notices', href: '/dashboard/caretaker/notices', icon: Bell }
          ]
        }
      ];

    case 'real_estate_company':
      return [
        { title: 'Overview', items: [dashboardItem], defaultOpen: true },
        {
          title: 'Business Management',
          items: [
            { title: 'Agents', href: '/dashboard/real_estate_company/agents', icon: Users },
            { title: 'Properties', href: '/dashboard/real_estate_company/properties', icon: Building },
            { title: 'Reports', href: '/dashboard/real_estate_company/reports', icon: BarChart3 },
            { title: 'Compliance', href: '/dashboard/real_estate_company/compliance', icon: Shield }
          ],
          defaultOpen: true
        }
      ];

    case 'service_provider':
      return [
        { title: 'Overview', items: [dashboardItem], defaultOpen: true },
        {
          title: 'Business',
          items: [
            { title: 'Orders', href: '/dashboard/service_provider/orders', icon: ClipboardList },
            { title: 'Schedule', href: '/dashboard/service_provider/schedule', icon: Calendar }
          ],
          defaultOpen: true
        },
        {
          title: 'Financial',
          items: [
            { title: 'Earnings', href: '/dashboard/service_provider/earnings', icon: DollarSign }
          ]
        },
        {
          title: 'Quality',
          items: [
            { title: 'Reviews', href: '/dashboard/service_provider/reviews', icon: Star },
            { title: 'Messages', href: '/dashboard/service_provider/messages', icon: MessageSquare }
          ]
        }
      ];

    case 'short_term_host':
      return [
        { title: 'Overview', items: [dashboardItem], defaultOpen: true },
        {
          title: 'Property Management',
          items: [
            { title: 'Listings', href: '/dashboard/short_term_host/listings', icon: Building },
            { title: 'Bookings', href: '/dashboard/short_term_host/bookings', icon: Calendar },
            { title: 'Calendar', href: '/dashboard/short_term_host/calendar', icon: Calendar }
          ],
          defaultOpen: true
        },
        {
          title: 'Guest Management',
          items: [
            { title: 'Guests', href: '/dashboard/short_term_host/guests', icon: Users }
          ]
        },
        {
          title: 'Financial',
          items: [
            { title: 'Earnings', href: '/dashboard/short_term_host/earnings', icon: DollarSign }
          ]
        }
      ];

    case 'developer':
      return [
        { title: 'Overview', items: [dashboardItem], defaultOpen: true },
        {
          title: 'Development',
          items: [
            { title: 'Projects', href: '/dashboard/developer/projects', icon: Building },
            { title: 'Leads', href: '/dashboard/developer/leads', icon: Users },
            { title: 'Proposals', href: '/dashboard/developer/proposals', icon: FileText }
          ],
          defaultOpen: true
        },
        {
          title: 'Financial',
          items: [
            { title: 'ROI Analysis', href: '/dashboard/developer/roi', icon: TrendingUp }
          ]
        }
      ];

    case 'investor':
      return [
        { title: 'Overview', items: [dashboardItem], defaultOpen: true },
        {
          title: 'Investment Management',
          items: [
            { title: 'Investments', href: '/dashboard/investor/investments', icon: DollarSign },
            { title: 'Documents', href: '/dashboard/investor/documents', icon: FileText },
            { title: 'Reports', href: '/dashboard/investor/reports', icon: BarChart3 },
            { title: 'Partners', href: '/dashboard/investor/partners', icon: Handshake }
          ],
          defaultOpen: true
        }
      ];

    case 'admin':
    case 'super_admin':
      return [
        { title: 'Overview', items: [dashboardItem], defaultOpen: true },
        {
          title: 'Platform Management',
          items: [
            { title: 'Users', href: '/dashboard/admin/users', icon: Users },
            { title: 'KYC Verification', href: '/dashboard/admin/kyc', icon: Shield },
            { title: 'System Config', href: '/dashboard/admin/config', icon: Settings }
          ],
          defaultOpen: true
        },
        {
          title: 'Analytics & Finance',
          items: [
            { title: 'Platform Finances', href: '/dashboard/admin/finances', icon: DollarSign },
            { title: 'Analytics', href: '/dashboard/admin/analytics', icon: Activity }
          ]
        }
      ];

    default:
      return [{ title: 'Overview', items: [dashboardItem], defaultOpen: true }];
  }
};

const Sidebar: React.FC<SidebarProps> = ({ role, isCollapsed, onToggle }) => {
  const location = useLocation();
  const { signOut, userProfile } = useAuth();
  const navigation = getNavigationByRole(role);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    navigation.forEach(section => {
      initial[section.title] = section.defaultOpen || false;
    });
    return initial;
  });

  const toggleSection = (sectionTitle: string) => {
    if (!isCollapsed) {
      setOpenSections(prev => ({
        ...prev,
        [sectionTitle]: !prev[sectionTitle]
      }));
    }
  };

  const handleSignOut = async () => {
    await signOut();
  };

  const SidebarItem = ({ item }: { item: NavigationItem }) => {
    const isActive = location.pathname === item.href;
    
    const content = (
      <NavLink
        to={item.href}
        className={cn(
          'flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors group relative',
          isActive
            ? 'bg-emerald-100 text-emerald-900'
            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
          isCollapsed ? 'justify-center px-2' : ''
        )}
      >
        <item.icon className={cn('h-4 w-4 flex-shrink-0', !isCollapsed && 'mr-3')} />
        {!isCollapsed && (
          <>
            <span className="flex-1">{item.title}</span>
            {item.badge && (
              <span className="ml-auto bg-emerald-600 text-white text-xs rounded-full px-2 py-0.5">
                {item.badge}
              </span>
            )}
          </>
        )}
        {isCollapsed && item.badge && (
          <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {item.badge}
          </span>
        )}
      </NavLink>
    );

    if (isCollapsed) {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              {content}
            </TooltipTrigger>
            <TooltipContent side="right" className="ml-2">
              <p>{item.title}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }

    return content;
  };

  return (
    <div className={cn(
      'fixed left-0 top-0 h-screen bg-white border-r border-gray-200 transition-all duration-300 flex flex-col z-40',
      isCollapsed ? 'w-16' : 'w-64'
    )}>
      {/* Header */}
      <div className={cn('p-4 border-b flex items-center justify-between', isCollapsed && 'px-2')}>
        <div className="flex items-center space-x-2">
          <Home className="h-8 w-8 text-emerald-600 flex-shrink-0" />
          {!isCollapsed && (
            <span className="text-xl font-bold text-gray-900">Nyumbani</span>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className={cn('p-1.5', isCollapsed && 'mx-auto')}
        >
          {isCollapsed ? (
            <PanelLeftOpen className="h-4 w-4" />
          ) : (
            <PanelLeftClose className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        {navigation.map((section) => (
          <div key={section.title} className="space-y-1">
            {!isCollapsed && (
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
                  {section.items.map((item) => (
                    <SidebarItem key={item.href} item={item} />
                  ))}
                </CollapsibleContent>
              </Collapsible>
            )}
            
            {isCollapsed && (
              <div className="space-y-1">
                {section.items.map((item) => (
                  <SidebarItem key={item.href} item={item} />
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* User Section */}
      <div className="border-t p-4">
        {!isCollapsed && userProfile && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="h-4 w-4 text-emerald-600" />
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
          </div>
        )}
        
        {isCollapsed && userProfile ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="mb-4 p-2 bg-gray-50 rounded-lg flex justify-center">
                  <div className="h-8 w-8 bg-emerald-100 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-emerald-600" />
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent side="right" className="ml-2">
                <p>{userProfile.full_name}</p>
                <p className="text-xs opacity-75 capitalize">
                  {userProfile.role.replace('_', ' ')}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : null}
        
        {isCollapsed ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={handleSignOut}
                  variant="outline"
                  size="sm"
                  className="w-full px-2 flex justify-center"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" className="ml-2">
                <p>Sign Out</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <Button
            onClick={handleSignOut}
            variant="outline"
            size="sm"
            className="w-full flex items-center justify-center space-x-2"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </Button>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
