
import React from 'react';
import { Route } from 'react-router-dom';

// Import service provider pages
import ServiceProviderOrders from "@/components/dashboard/service-provider/ServiceProviderOrders";
import ServiceProviderSchedule from "@/components/dashboard/service-provider/ServiceProviderSchedule";
import ServiceProviderEarnings from "@/components/dashboard/service-provider/ServiceProviderEarnings";
import ServiceProviderReviews from "@/components/dashboard/service-provider/ServiceProviderReviews";
import ServiceProviderMessages from "@/components/dashboard/service-provider/ServiceProviderMessages";

export const ServiceProviderRoutes = () => (
  <>
    <Route path="/service_provider/orders" element={<ServiceProviderOrders />} />
    <Route path="/service_provider/schedule" element={<ServiceProviderSchedule />} />
    <Route path="/service_provider/earnings" element={<ServiceProviderEarnings />} />
    <Route path="/service_provider/reviews" element={<ServiceProviderReviews />} />
    <Route path="/service_provider/messages" element={<ServiceProviderMessages />} />
  </>
);
