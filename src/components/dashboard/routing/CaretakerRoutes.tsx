
import React from 'react';
import { Route } from 'react-router-dom';

// Import caretaker-specific pages
import CaretakerPayments from "@/components/dashboard/caretaker/CaretakerPayments";
import CaretakerReceipts from "@/components/dashboard/caretaker/CaretakerReceipts";
import CaretakerWater from "@/components/dashboard/caretaker/CaretakerWater";
import CaretakerWaste from "@/components/dashboard/caretaker/CaretakerWaste";
import CaretakerNotices from "@/components/dashboard/caretaker/CaretakerNotices";
import CaretakerTenants from "@/components/dashboard/caretaker/CaretakerTenants";

export const CaretakerRoutes = () => (
  <>
    <Route path="/caretaker/payments" element={<CaretakerPayments />} />
    <Route path="/caretaker/receipts" element={<CaretakerReceipts />} />
    <Route path="/caretaker/water" element={<CaretakerWater />} />
    <Route path="/caretaker/waste" element={<CaretakerWaste />} />
    <Route path="/caretaker/tenants" element={<CaretakerTenants />} />
    <Route path="/caretaker/notices" element={<CaretakerNotices />} />
  </>
);
