
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
  ChevronDown
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

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
            { title: 'My Rentals', href: '/dashboard/rentals', icon: Building },
            { title: 'Leases', href: '/dashboard/leases', icon: FileText },
            { title: 'Requests', href: '/dashboard/requests', icon: Wrench, badge: '2' }
          ],
          defaultOpen: true
        },
        {
          title: 'Financial',
          items: [
            { title: 'Wallet', href: '/dashboard/wallet', icon: Wallet },
            { title: 'Receipts', href: '/dashboard/receipts', icon: Receipt }
          ]
        },
        {
          title: 'Communication',
          items: [
            { title: 'Messages', href: '/dashboard/messages', icon: MessageSquare, badge: '3' },
            { title: 'Notices', href: '/dashboard/notices', icon: Bell }
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

    case 'caretaker':
      return [
        { title: 'Overview', items: [dashboardItem], defaultOpen: true },
        {
          title: 'Property Management',
          items: [
            { title: 'Assigned Properties', href: '/dashboard/properties', icon: Building },
            { title: 'Maintenance', href: '/dashboard/requests', icon: Wrench, badge: '3' }
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
            { title: 'Messages', href: '/dashboard/messages', icon: MessageSquare },
            { title: 'Notices', href: '/dashboard/caretaker/notices', icon: Bell }
          ]
        }
      ];

    case 'agent':
      return [
        { title: 'Overview', items: [dashboardItem], defaultOpen: true },
        {
          title: 'Property Management',
          items: [
            { title: 'Properties', href: '/dashboard/properties', icon: Building },
            { title: 'Viewings', href: '/dashboard/viewings', icon: Calendar },
            { title: 'Clients', href: '/dashboard/clients', icon: Users }
          ],
          defaultOpen: true
        },
        {
          title: 'Financial',
          items: [
            { title: 'Commissions', href: '/dashboard/commissions', icon: DollarSign },
            { title: 'Transactions', href: '/dashboard/transactions', icon: Wallet }
          ]
        },
        {
          title: 'Communication',
          items: [
            { title: 'Messages', href: '/dashboard/messages', icon: MessageSquare },
            { title: 'Documents', href: '/dashboard/documents', icon: FileCheck }
          ]
        }
      ];

    case 'admin':
    case 'super_admin':
      return [
        { title: 'Overview', items: [dashboardItem], defaultOpen: true },
        {
          title: 'User Management',
          items: [
            { title: 'Users', href: '/dashboard/users', icon: Users },
            { title: 'Properties', href: '/dashboard/properties', icon: Building },
            { title: 'Verification', href: '/dashboard/kyc', icon: Shield }
          ],
          defaultOpen: true
        },
        {
          title: 'Financial',
          items: [
            { title: 'Analytics', href: '/dashboard/analytics', icon: Activity },
            { title: 'Finance', href: '/dashboard/finance', icon: Wallet },
            { title: 'Reports', href: '/dashboard/reports', icon: BarChart3 }
          ]
        },
        {
          title: 'Communication',
          items: [
            { title: 'Messages', href: '/dashboard/messages', icon: MessageSquare },
            { title: 'System Config', href: '/dashboard/config', icon: Settings }
          ]
        }
      ];

    default:
      return [{ title: 'Overview', items: [dashboardItem], defaultOpen: true }];
  }
};

const Sidebar: React.FC<SidebarProps> = ({ role, isCollapsed }) => {
  const location = useLocation();
  const navigation = getNavigationByRole(role);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    navigation.forEach(section => {
      initial[section.title] = section.defaultOpen || false;
    });
    return initial;
  });

  const toggleSection = (sectionTitle: string) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionTitle]: !prev[sectionTitle]
    }));
  };

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
          <Collapsible 
            key={section.title} 
            open={openSections[section.title]}
            onOpenChange={() => toggleSection(section.title)}
          >
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                className={cn(
                  'w-full justify-between text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50',
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
