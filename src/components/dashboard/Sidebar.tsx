import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Building, Users, FileText, Wrench, Wallet, MessageSquare, Settings, BarChart3, Calendar, Shield, Star, UserCheck, TrendingUp, Handshake, ClipboardList, DollarSign, Activity, Receipt, Droplets, Trash2, Bell, CreditCard, ChevronDown, LogOut, User, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useAuth } from '@/contexts/AuthContext';
interface NavigationItem {
  title: string;
  href: string;
  icon: React.ComponentType<{
    className?: string;
  }>;
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
  const dashboardItem = {
    title: 'Dashboard',
    href: `/dashboard/${role}`,
    icon: Home
  };
  switch (role) {
    case 'tenant':
      return [{
        title: 'Overview',
        items: [dashboardItem],
        defaultOpen: true
      }, {
        title: 'Property Management',
        items: [{
          title: 'Rent',
          href: '/dashboard/tenant/rent',
          icon: CreditCard
        }, {
          title: 'Lease',
          href: '/dashboard/tenant/lease',
          icon: FileText
        }, {
          title: 'Maintenance',
          href: '/dashboard/tenant/maintenance',
          icon: Wrench,
          badge: '2'
        }],
        defaultOpen: true
      }, {
        title: 'Financial',
        items: [{
          title: 'Wallet',
          href: '/dashboard/tenant/wallet',
          icon: Wallet
        }]
      }, {
        title: 'Communication',
        items: [{
          title: 'Messages',
          href: '/dashboard/tenant/messages',
          icon: MessageSquare,
          badge: '3'
        }]
      }];
    case 'landlord':
      return [{
        title: 'Overview',
        items: [dashboardItem],
        defaultOpen: true
      }, {
        title: 'Property Management',
        items: [{
          title: 'Properties',
          href: '/dashboard/landlord/properties',
          icon: Building
        }, {
          title: 'Tenants',
          href: '/dashboard/landlord/tenants',
          icon: Users
        }, {
          title: 'Leases',
          href: '/dashboard/landlord/leases',
          icon: FileText
        }, {
          title: 'Requests',
          href: '/dashboard/landlord/requests',
          icon: Wrench,
          badge: '5'
        }],
        defaultOpen: true
      }, {
        title: 'Financial',
        items: [{
          title: 'Transactions',
          href: '/dashboard/landlord/transactions',
          icon: Wallet
        }, {
          title: 'Insurance',
          href: '/dashboard/landlord/insurance',
          icon: Shield
        }, {
          title: 'Reports',
          href: '/dashboard/landlord/reports',
          icon: BarChart3
        }]
      }, {
        title: 'Communication',
        items: [{
          title: 'Messages',
          href: '/dashboard/landlord/messages',
          icon: MessageSquare
        }, {
          title: 'Agents',
          href: '/dashboard/landlord/agents',
          icon: Handshake
        }, {
          title: 'Documents',
          href: '/dashboard/landlord/documents',
          icon: ClipboardList
        }]
      }];
    case 'agent':
      return [{
        title: 'Overview',
        items: [dashboardItem],
        defaultOpen: true
      }, {
        title: 'Business',
        items: [{
          title: 'Listings',
          href: '/dashboard/agent/listings',
          icon: Building
        }, {
          title: 'Viewings',
          href: '/dashboard/agent/viewings',
          icon: Calendar
        }, {
          title: 'Clients',
          href: '/dashboard/agent/clients',
          icon: Users
        }],
        defaultOpen: true
      }, {
        title: 'Financial',
        items: [{
          title: 'Earnings',
          href: '/dashboard/agent/earnings',
          icon: DollarSign
        }]
      }, {
        title: 'Communication',
        items: [{
          title: 'Messages',
          href: '/dashboard/agent/messages',
          icon: MessageSquare
        }]
      }];
    case 'caretaker':
      return [{
        title: 'Overview',
        items: [dashboardItem],
        defaultOpen: true
      }, {
        title: 'Property Management',
        items: [{
          title: 'Tenants',
          href: '/dashboard/caretaker/tenants',
          icon: Users
        }],
        defaultOpen: true
      }, {
        title: 'Financial',
        items: [{
          title: 'Payments',
          href: '/dashboard/caretaker/payments',
          icon: CreditCard
        }, {
          title: 'Receipts',
          href: '/dashboard/caretaker/receipts',
          icon: Receipt
        }]
      }, {
        title: 'Services',
        items: [{
          title: 'Water Management',
          href: '/dashboard/caretaker/water',
          icon: Droplets
        }, {
          title: 'Waste Management',
          href: '/dashboard/caretaker/waste',
          icon: Trash2
        }]
      }, {
        title: 'Communication',
        items: [{
          title: 'Notices',
          href: '/dashboard/caretaker/notices',
          icon: Bell
        }]
      }];
    case 'real_estate_company':
      return [{
        title: 'Overview',
        items: [dashboardItem],
        defaultOpen: true
      }, {
        title: 'Business Management',
        items: [{
          title: 'Agents',
          href: '/dashboard/real_estate_company/agents',
          icon: Users
        }, {
          title: 'Properties',
          href: '/dashboard/real_estate_company/properties',
          icon: Building
        }, {
          title: 'Reports',
          href: '/dashboard/real_estate_company/reports',
          icon: BarChart3
        }, {
          title: 'Compliance',
          href: '/dashboard/real_estate_company/compliance',
          icon: Shield
        }],
        defaultOpen: true
      }];
    case 'service_provider':
      return [{
        title: 'Overview',
        items: [dashboardItem],
        defaultOpen: true
      }, {
        title: 'Business',
        items: [{
          title: 'Orders',
          href: '/dashboard/service_provider/orders',
          icon: ClipboardList
        }, {
          title: 'Schedule',
          href: '/dashboard/service_provider/schedule',
          icon: Calendar
        }],
        defaultOpen: true
      }, {
        title: 'Financial',
        items: [{
          title: 'Earnings',
          href: '/dashboard/service_provider/earnings',
          icon: DollarSign
        }]
      }, {
        title: 'Quality',
        items: [{
          title: 'Reviews',
          href: '/dashboard/service_provider/reviews',
          icon: Star
        }, {
          title: 'Messages',
          href: '/dashboard/service_provider/messages',
          icon: MessageSquare
        }]
      }];
    case 'short_term_host':
      return [{
        title: 'Overview',
        items: [dashboardItem],
        defaultOpen: true
      }, {
        title: 'Property Management',
        items: [{
          title: 'Listings',
          href: '/dashboard/short_term_host/listings',
          icon: Building
        }, {
          title: 'Bookings',
          href: '/dashboard/short_term_host/bookings',
          icon: Calendar
        }, {
          title: 'Calendar',
          href: '/dashboard/short_term_host/calendar',
          icon: Calendar
        }],
        defaultOpen: true
      }, {
        title: 'Guest Management',
        items: [{
          title: 'Guests',
          href: '/dashboard/short_term_host/guests',
          icon: Users
        }]
      }, {
        title: 'Financial',
        items: [{
          title: 'Earnings',
          href: '/dashboard/short_term_host/earnings',
          icon: DollarSign
        }]
      }];
    case 'developer':
      return [{
        title: 'Overview',
        items: [dashboardItem],
        defaultOpen: true
      }, {
        title: 'Development',
        items: [{
          title: 'Projects',
          href: '/dashboard/developer/projects',
          icon: Building
        }, {
          title: 'Leads',
          href: '/dashboard/developer/leads',
          icon: Users
        }, {
          title: 'Proposals',
          href: '/dashboard/developer/proposals',
          icon: FileText
        }],
        defaultOpen: true
      }, {
        title: 'Financial',
        items: [{
          title: 'ROI Analysis',
          href: '/dashboard/developer/roi',
          icon: TrendingUp
        }]
      }];
    case 'investor':
      return [{
        title: 'Overview',
        items: [dashboardItem],
        defaultOpen: true
      }, {
        title: 'Investment Management',
        items: [{
          title: 'Investments',
          href: '/dashboard/investor/investments',
          icon: DollarSign
        }, {
          title: 'Documents',
          href: '/dashboard/investor/documents',
          icon: FileText
        }, {
          title: 'Reports',
          href: '/dashboard/investor/reports',
          icon: BarChart3
        }, {
          title: 'Partners',
          href: '/dashboard/investor/partners',
          icon: Handshake
        }],
        defaultOpen: true
      }];
    case 'admin':
    case 'super_admin':
      return [{
        title: 'Overview',
        items: [dashboardItem],
        defaultOpen: true
      }, {
        title: 'Platform Management',
        items: [{
          title: 'Users',
          href: '/dashboard/admin/users',
          icon: Users
        }, {
          title: 'KYC Verification',
          href: '/dashboard/admin/kyc',
          icon: Shield
        }, {
          title: 'System Config',
          href: '/dashboard/admin/config',
          icon: Settings
        }],
        defaultOpen: true
      }, {
        title: 'Analytics & Finance',
        items: [{
          title: 'Platform Finances',
          href: '/dashboard/admin/finances',
          icon: DollarSign
        }, {
          title: 'Analytics',
          href: '/dashboard/admin/analytics',
          icon: Activity
        }]
      }];
    default:
      return [{
        title: 'Overview',
        items: [dashboardItem],
        defaultOpen: true
      }];
  }
};
const Sidebar: React.FC<SidebarProps> = ({
  role,
  isCollapsed,
  onToggle
}) => {
  const location = useLocation();
  const {
    signOut,
    userProfile
  } = useAuth();
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
  return;
};
export default Sidebar;