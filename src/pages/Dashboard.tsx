import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from "@/contexts/AuthContext";
import { useRoleRedirect } from "@/hooks/useRoleRedirect";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

// Import dashboard overview components
import LandlordDashboard from "@/components/dashboard/overview/LandlordDashboard";
import TenantDashboard from "@/components/dashboard/overview/TenantDashboard";
import CaretakerDashboard from "@/components/dashboard/overview/CaretakerDashboard";
import AgentDashboard from "@/components/dashboard/overview/AgentDashboard";
import AdminDashboard from "@/components/dashboard/overview/AdminDashboard";
import ServiceProviderDashboard from "@/components/dashboard/overview/ServiceProviderDashboard";
import DeveloperDashboard from "@/components/dashboard/overview/DeveloperDashboard";
import InvestorDashboard from "@/components/dashboard/overview/InvestorDashboard";
import ShortTermHostDashboard from "@/components/dashboard/overview/ShortTermHostDashboard";

// Import property management
import PropertyManagement from "@/pages/PropertyManagement";

// Import tenant-specific pages
import TenantRent from "@/components/dashboard/tenant/TenantRent";
import TenantWallet from "@/components/dashboard/tenant/TenantWallet";
import TenantLease from "@/components/dashboard/tenant/TenantLease";
import TenantMaintenance from "@/components/dashboard/tenant/TenantMaintenance";
import TenantMessages from "@/components/dashboard/tenant/TenantMessages";

// Import agent-specific pages
import AgentListings from "@/components/dashboard/agent/AgentListings";
import AgentViewings from "@/components/dashboard/agent/AgentViewings";
import AgentClients from "@/components/dashboard/agent/AgentClients";
import AgentEarnings from "@/components/dashboard/agent/AgentEarnings";
import AgentMessages from "@/components/dashboard/agent/AgentMessages";

// Import caretaker-specific pages
import CaretakerPayments from "@/components/dashboard/caretaker/CaretakerPayments";
import CaretakerReceipts from "@/components/dashboard/caretaker/CaretakerReceipts";
import CaretakerWater from "@/components/dashboard/caretaker/CaretakerWater";
import CaretakerWaste from "@/components/dashboard/caretaker/CaretakerWaste";
import CaretakerNotices from "@/components/dashboard/caretaker/CaretakerNotices";
import CaretakerTenants from "@/components/dashboard/caretaker/CaretakerTenants";

// Import real estate company pages
import RealEstateAgents from "@/components/dashboard/real-estate/RealEstateAgents";
import RealEstateProperties from "@/components/dashboard/real-estate/RealEstateProperties";
import RealEstateReports from "@/components/dashboard/real-estate/RealEstateReports";
import RealEstateCompliance from "@/components/dashboard/real-estate/RealEstateCompliance";

// Import service provider pages
import ServiceProviderOrders from "@/components/dashboard/service-provider/ServiceProviderOrders";
import ServiceProviderSchedule from "@/components/dashboard/service-provider/ServiceProviderSchedule";
import ServiceProviderEarnings from "@/components/dashboard/service-provider/ServiceProviderEarnings";
import ServiceProviderReviews from "@/components/dashboard/service-provider/ServiceProviderReviews";
import ServiceProviderMessages from "@/components/dashboard/service-provider/ServiceProviderMessages";

// Import short-term host pages
import ShortTermListings from "@/components/dashboard/short-term-host/ShortTermListings";
import ShortTermBookings from "@/components/dashboard/short-term-host/ShortTermBookings";
import ShortTermCalendar from "@/components/dashboard/short-term-host/ShortTermCalendar";
import ShortTermGuests from "@/components/dashboard/short-term-host/ShortTermGuests";
import ShortTermEarnings from "@/components/dashboard/short-term-host/ShortTermEarnings";

// Import developer pages
import DeveloperProjects from "@/components/dashboard/developer/DeveloperProjects";
import DeveloperLeads from "@/components/dashboard/developer/DeveloperLeads";
import DeveloperProposals from "@/components/dashboard/developer/DeveloperProposals";
import DeveloperROI from "@/components/dashboard/developer/DeveloperROI";

// Import investor pages
import InvestorInvestments from "@/components/dashboard/investor/InvestorInvestments";
import InvestorDocuments from "@/components/dashboard/investor/InvestorDocuments";
import InvestorReports from "@/components/dashboard/investor/InvestorReports";
import InvestorPartners from "@/components/dashboard/investor/InvestorPartners";

// Import admin pages
import AdminUsers from "@/components/dashboard/admin/AdminUsers";
import AdminKYC from "@/components/dashboard/admin/AdminKYC";
import AdminConfig from "@/components/dashboard/admin/AdminConfig";
import AdminFinances from "@/components/dashboard/admin/AdminFinances";
import AdminAnalytics from "@/components/dashboard/admin/AdminAnalytics";

// Import landlord-specific pages
import LandlordProperties from "@/components/dashboard/landlord/LandlordProperties";
import LandlordTenants from "@/components/dashboard/landlord/LandlordTenants";
import LandlordLeases from "@/components/dashboard/landlord/LandlordLeases";
import LandlordRequests from "@/components/dashboard/landlord/LandlordRequests";
import LandlordTransactions from "@/components/dashboard/landlord/LandlordTransactions";
import LandlordInsurance from "@/components/dashboard/landlord/LandlordInsurance";
import LandlordReports from "@/components/dashboard/landlord/LandlordReports";
import LandlordMessages from "@/components/dashboard/landlord/LandlordMessages";
import LandlordAgents from "@/components/dashboard/landlord/LandlordAgents";
import LandlordDocuments from "@/components/dashboard/landlord/LandlordDocuments";

const Dashboard = () => {
  const { userProfile, loading } = useAuth();
  useRoleRedirect();

  if (loading || !userProfile) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const getDashboardComponent = (role: string) => {
    switch (role) {
      case "tenant":
        return <TenantDashboard />;
      case "landlord":
        return <LandlordDashboard />;
      case "caretaker":
        return <CaretakerDashboard />;
      case "agent":
      case "real_estate_company":
        return <AgentDashboard />;
      case "service_provider":
        return <ServiceProviderDashboard />;
      case "developer":
        return <DeveloperDashboard />;
      case "investor":
        return <InvestorDashboard />;
      case "short_term_host":
        return <ShortTermHostDashboard />;
      case "admin":
      case "super_admin":
        return <AdminDashboard />;
      default:
        return <TenantDashboard />;
    }
  };

  return (
    <DashboardLayout>
      <Routes>
        {/* Role-specific dashboard overview routes */}
        <Route path="/" element={getDashboardComponent(userProfile.role)} />
        <Route path={`/${userProfile.role}`} element={getDashboardComponent(userProfile.role)} />
        
        {/* Property Management routes */}
        <Route path="/property-management/*" element={<PropertyManagement />} />
        
        {/* Tenant-specific routes */}
        <Route path="/tenant/rent" element={<TenantRent />} />
        <Route path="/tenant/wallet" element={<TenantWallet />} />
        <Route path="/tenant/lease" element={<TenantLease />} />
        <Route path="/tenant/maintenance" element={<TenantMaintenance />} />
        <Route path="/tenant/messages" element={<TenantMessages />} />
        
        {/* Landlord-specific routes */}
        <Route path="/landlord/properties" element={<LandlordProperties />} />
        <Route path="/landlord/tenants" element={<LandlordTenants />} />
        <Route path="/landlord/leases" element={<LandlordLeases />} />
        <Route path="/landlord/requests" element={<LandlordRequests />} />
        <Route path="/landlord/transactions" element={<LandlordTransactions />} />
        <Route path="/landlord/insurance" element={<LandlordInsurance />} />
        <Route path="/landlord/reports" element={<LandlordReports />} />
        <Route path="/landlord/messages" element={<LandlordMessages />} />
        <Route path="/landlord/agents" element={<LandlordAgents />} />
        <Route path="/landlord/documents" element={<LandlordDocuments />} />
        
        {/* Agent-specific routes */}
        <Route path="/agent/listings" element={<AgentListings />} />
        <Route path="/agent/viewings" element={<AgentViewings />} />
        <Route path="/agent/clients" element={<AgentClients />} />
        <Route path="/agent/earnings" element={<AgentEarnings />} />
        <Route path="/agent/messages" element={<AgentMessages />} />
        
        {/* Caretaker-specific routes */}
        <Route path="/caretaker/payments" element={<CaretakerPayments />} />
        <Route path="/caretaker/receipts" element={<CaretakerReceipts />} />
        <Route path="/caretaker/water" element={<CaretakerWater />} />
        <Route path="/caretaker/waste" element={<CaretakerWaste />} />
        <Route path="/caretaker/tenants" element={<CaretakerTenants />} />
        <Route path="/caretaker/notices" element={<CaretakerNotices />} />
        
        {/* Real Estate Company routes */}
        <Route path="/real_estate_company/agents" element={<RealEstateAgents />} />
        <Route path="/real_estate_company/properties" element={<RealEstateProperties />} />
        <Route path="/real_estate_company/reports" element={<RealEstateReports />} />
        <Route path="/real_estate_company/compliance" element={<RealEstateCompliance />} />
        
        {/* Service Provider routes */}
        <Route path="/service_provider/orders" element={<ServiceProviderOrders />} />
        <Route path="/service_provider/schedule" element={<ServiceProviderSchedule />} />
        <Route path="/service_provider/earnings" element={<ServiceProviderEarnings />} />
        <Route path="/service_provider/reviews" element={<ServiceProviderReviews />} />
        <Route path="/service_provider/messages" element={<ServiceProviderMessages />} />
        
        {/* Short-term Host routes */}
        <Route path="/short_term_host/listings" element={<ShortTermListings />} />
        <Route path="/short_term_host/bookings" element={<ShortTermBookings />} />
        <Route path="/short_term_host/calendar" element={<ShortTermCalendar />} />
        <Route path="/short_term_host/guests" element={<ShortTermGuests />} />
        <Route path="/short_term_host/earnings" element={<ShortTermEarnings />} />
        
        {/* Developer routes */}
        <Route path="/developer/projects" element={<DeveloperProjects />} />
        <Route path="/developer/leads" element={<DeveloperLeads />} />
        <Route path="/developer/proposals" element={<DeveloperProposals />} />
        <Route path="/developer/roi" element={<DeveloperROI />} />
        
        {/* Investor routes */}
        <Route path="/investor/investments" element={<InvestorInvestments />} />
        <Route path="/investor/documents" element={<InvestorDocuments />} />
        <Route path="/investor/reports" element={<InvestorReports />} />
        <Route path="/investor/partners" element={<InvestorPartners />} />
        
        {/* Admin routes */}
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/kyc" element={<AdminKYC />} />
        <Route path="/admin/config" element={<AdminConfig />} />
        <Route path="/admin/finances" element={<AdminFinances />} />
        <Route path="/admin/analytics" element={<AdminAnalytics />} />
        
        {/* Super Admin routes (same as admin) */}
        <Route path="/super_admin/users" element={<AdminUsers />} />
        <Route path="/super_admin/kyc" element={<AdminKYC />} />
        <Route path="/super_admin/config" element={<AdminConfig />} />
        <Route path="/super_admin/finances" element={<AdminFinances />} />
        <Route path="/super_admin/analytics" element={<AdminAnalytics />} />
        
        {/* Fallback to role-specific dashboard */}
        <Route path="*" element={getDashboardComponent(userProfile.role)} />
      </Routes>
    </DashboardLayout>
  );
};

export default Dashboard;
