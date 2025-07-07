
import React from 'react';
import { Route } from 'react-router-dom';

// Import specialized role pages
import ShortTermListings from "@/components/dashboard/short-term-host/ShortTermListings";
import ShortTermBookings from "@/components/dashboard/short-term-host/ShortTermBookings";
import ShortTermCalendar from "@/components/dashboard/short-term-host/ShortTermCalendar";
import ShortTermGuests from "@/components/dashboard/short-term-host/ShortTermGuests";
import ShortTermEarnings from "@/components/dashboard/short-term-host/ShortTermEarnings";

import DeveloperProjects from "@/components/dashboard/developer/DeveloperProjects";
import DeveloperLeads from "@/components/dashboard/developer/DeveloperLeads";
import DeveloperProposals from "@/components/dashboard/developer/DeveloperProposals";
import DeveloperROI from "@/components/dashboard/developer/DeveloperROI";

import InvestorInvestments from "@/components/dashboard/investor/InvestorInvestments";
import InvestorDocuments from "@/components/dashboard/investor/InvestorDocuments";
import InvestorReports from "@/components/dashboard/investor/InvestorReports";
import InvestorPartners from "@/components/dashboard/investor/InvestorPartners";

export const SpecializedRoutes = () => (
  <>
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
  </>
);
