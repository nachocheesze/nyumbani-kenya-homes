
import React from 'react';
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
  Activity
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';

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
  const baseItems = [
    { title: 'Dashboard', href: '/dashboard', icon: Home }
  ];

  switch (role) {
    case 'tenant':
      return [
        { title: 'Main', items: baseItems, defaultOpen: true },
        {
          title: 'My Account',
          items: [
            { title: 'My Rentals', href: '/dashboard/rentals', icon: Building },
            { title: 'Wallet', href: '/dashboard/wallet', icon: Wallet },
            { title: 'Leases', href: '/dashboard/leases', icon: FileText },
            { title: 'Requests', href: '/dashboard/requests', icon: Wrench, badge: '2' },
            { title: 'Messages', href: '/dashboard/messages', icon: MessageSquare, badge: '3' }
          ],
          defaultOpen: true
        },
        {
          title: 'Analytics',
          items: [
            { title: 'Insights', href: '/dashboard/insights', icon: BarChart3 },
            { title: 'Settings', href: '/dashboard/settings', icon: Settings }
          ]
        }
      ];

    case 'landlord':
      return [
        { title: 'Main', items: baseItems, defaultOpen: true },
        {
          title: 'Property Management',
          items: [
            { title: 'Properties', href: '/dashboard/properties', icon: Building },
            { title: 'Tenants', href: '/dashboard/tenants', icon: Users },
            { title: 'Leases', href: '/dashboard/leases', icon: FileText },
            { title: 'Requests', href: '/dashboard/requests', icon: Wrench, badge: '5' }
          ],
          defaultOpen: true
        },
        {
          title: 'Financial',
          items: [
            { title: 'Transactions', href: '/dashboard/transactions', icon: Wallet },
            { title: 'Insurance', href: '/dashboard/insurance', icon: Shield },
            { title: 'Reports', href: '/dashboard/reports', icon: BarChart3 }
          ]
        },
        {
          title: 'Communication',
          items: [
            { title: 'Messages', href: '/dashboard/messages', icon: MessageSquare },
            { title: 'Agents', href: '/dashboard/agents', icon: UserCheck },
            { title: 'Documents', href: '/dashboard/documents', icon: ClipboardList }
          ]
        }
      ];

    case 'agent':
      return [
        { title: 'Main', items: baseItems, defaultOpen: true },
        {
          title: 'Portfolio',
          items: [
            { title: 'Properties', href: '/dashboard/properties', icon: Building },
            { title: 'Viewings', href: '/dashboard/viewings', icon: Calendar },
            { title: 'Clients', href: '/dashboard/clients', icon: Users }
          ],
          defaultOpen: true
        },
        {
          title: 'Business',
          items: [
            { title: 'Commissions', href: '/dashboard/commissions', icon: DollarSign },
            { title: 'Insights', href: '/dashboard/insights', icon: TrendingUp },
            { title: 'Messages', href: '/dashboard/messages', icon: MessageSquare },
            { title: 'Documents', href: '/dashboard/documents', icon: FileCheck }
          ]
        }
      ];

    case 'real_estate_company':
      return [
        { title: 'Main', items: baseItems, defaultOpen: true },
        {
          title: 'Management',
          items: [
            { title: 'Agents', href: '/dashboard/agents', icon: Users },
            { title: 'Properties', href: '/dashboard/properties', icon: Building },
            { title: 'Leases', href: '/dashboard/leases', icon: FileText }
          ],
          defaultOpen: true
        },
        {
          title: 'Analytics',
          items: [
            { title: 'Insights', href: '/dashboard/insights', icon: BarChart3 },
            { title: 'Transactions', href: '/dashboard/transactions', icon: Wallet },
            { title: 'Compliance', href: '/dashboard/compliance', icon: Shield }
          ]
        }
      ];

    case 'service_provider':
      return [
        { title: 'Main', items: baseItems, defaultOpen: true },
        {
          title: 'Services',
          items: [
            { title: 'Orders', href: '/dashboard/orders', icon: ClipboardList, badge: '3' },
            { title: 'Schedule', href: '/dashboard/schedule', icon: Calendar },
            { title: 'Earnings', href: '/dashboard/earnings', icon: DollarSign }
          ],
          defaultOpen: true
        },
        {
          title: 'Profile',
          items: [
            { title: 'Reviews', href: '/dashboard/reviews', icon: Star },
            { title: 'Messages', href: '/dashboard/messages', icon: MessageSquare },
            { title: 'Documents', href: '/dashboard/documents', icon: FileCheck }
          ]
        }
      ];

    case 'developer':
    case 'investor':
      return [
        { title: 'Main', items: baseItems, defaultOpen: true },
        {
          title: 'Investments',
          items: [
            { title: 'Proposals', href: '/dashboard/proposals', icon: FileText },
            { title: 'Performance', href: '/dashboard/performance', icon: TrendingUp },
            { title: 'Locations', href: '/dashboard/locations', icon: MapPin }
          ],
          defaultOpen: true
        },
        {
          title: 'Network',
          items: [
            { title: 'Partners', href: '/dashboard/partners', icon: Handshake },
            { title: 'Documents', href: '/dashboard/documents', icon: ClipboardList }
          ]
        }
      ];

    case 'admin':
    case 'super_admin':
      return [
        { title: 'Main', items: baseItems, defaultOpen: true },
        {
          title: 'User Management',
          items: [
            { title: 'Users', href: '/dashboard/users', icon: Users },
            { title: 'Properties', href: '/dashboard/properties', icon: Building },
            { title: 'KYC/Verification', href: '/dashboard/kyc', icon: Shield }
          ],
          defaultOpen: true
        },
        {
          title: 'Platform Analytics',
          items: [
            { title: 'Analytics', href: '/dashboard/analytics', icon: Activity },
            { title: 'Finance', href: '/dashboard/finance', icon: Wallet },
            { title: 'Reports', href: '/dashboard/reports', icon: BarChart3 }
          ]
        },
        {
          title: 'System',
          items: [
            { title: 'Configuration', href: '/dashboard/config', icon: Settings }
          ]
        }
      ];

    default:
      return [{ title: 'Main', items: baseItems, defaultOpen: true }];
  }
};

const Sidebar: React.FC<SidebarProps> = ({ role, isCollapsed }) => {
  const location = useLocation();
  const navigation = getNavigationByRole(role);

  return (
    <div className={cn(
      'bg-white border-r border-gray-200 transition-all duration-300',
      isCollapsed ? 'w-16' : 'w-64'
    )}>
      <div className="p-4">
        <div className="flex items-center space-x-2">
          <Home className="h-8 w-8 text-emerald-600" />
          {!isCollapsed && (
            <span className="text-xl font-bold text-gray-900">Nyumbani</span>
          )}
        </div>
      </div>

      <nav className="px-2 space-y-1">
        {navigation.map((section) => (
          <Collapsible key={section.title} defaultOpen={section.defaultOpen}>
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                className={cn(
                  'w-full justify-between text-sm font-medium text-gray-700 hover:text-gray-900',
                  isCollapsed && 'px-2'
                )}
              >
                {!isCollapsed && section.title}
                {!isCollapsed && <ChevronDown className="h-4 w-4" />}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-1">
              {section.items.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <NavLink
                    key={item.href}
                    to={item.href}
                    className={cn(
                      'flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors group',
                      isActive
                        ? 'bg-emerald-100 text-emerald-900'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                      isCollapsed && 'justify-center px-2'
                    )}
                  >
                    <item.icon className={cn('h-5 w-5', !isCollapsed && 'mr-3')} />
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
                  </NavLink>
                );
              })}
            </CollapsibleContent>
          </Collapsible>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
