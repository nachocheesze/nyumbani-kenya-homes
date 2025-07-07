
import React from 'react';
import { Route } from 'react-router-dom';

// Import agent-specific pages
import AgentListings from "@/components/dashboard/agent/AgentListings";
import AgentViewings from "@/components/dashboard/agent/AgentViewings";
import AgentClients from "@/components/dashboard/agent/AgentClients";
import AgentEarnings from "@/components/dashboard/agent/AgentEarnings";
import AgentMessages from "@/components/dashboard/agent/AgentMessages";

export const AgentRoutes = () => (
  <>
    <Route path="/agent/listings" element={<AgentListings />} />
    <Route path="/agent/viewings" element={<AgentViewings />} />
    <Route path="/agent/clients" element={<AgentClients />} />
    <Route path="/agent/earnings" element={<AgentEarnings />} />
    <Route path="/agent/messages" element={<AgentMessages />} />
  </>
);
