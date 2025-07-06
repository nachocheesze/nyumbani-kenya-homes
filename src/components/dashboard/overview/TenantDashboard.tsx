
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import StatsCard from '@/components/dashboard/widgets/StatsCard';
import { Home, Receipt, Wrench, MessageSquare, Calendar, Wallet } from 'lucide-react';

const TenantDashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Tenant Dashboard</h1>
        <p className="text-gray-600">Manage your rental and stay updated</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Current Rent"
          value="KES 25,000"
          icon={Home}
        />
        <StatsCard
          title="Wallet Balance"
          value="KES 15,000"
          icon={Wallet}
          trend={{ value: 5.2, isPositive: true }}
        />
        <StatsCard
          title="Open Requests"
          value="2"
          icon={Wrench}
        />
        <StatsCard
          title="New Messages"
          value="3"
          icon={MessageSquare}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Lease Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Home className="h-5 w-5" />
              Current Lease
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Property Address</p>
                <p className="font-medium">Apartment 2B, Greenfield Heights</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Lease Period</p>
                <p className="font-medium">Jan 2024 - Dec 2024</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Monthly Rent</p>
                <p className="font-medium">KES 25,000</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Next Payment Due</p>
                <p className="font-medium text-orange-600">July 1, 2024</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Payments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Receipt className="h-5 w-5" />
              Recent Payments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { amount: "KES 25,000", date: "June 1, 2024", status: "Paid" },
                { amount: "KES 25,000", date: "May 1, 2024", status: "Paid" },
                { amount: "KES 25,000", date: "April 1, 2024", status: "Paid" }
              ].map((payment, index) => (
                <div key={index} className="flex justify-between items-center border-b pb-2">
                  <div>
                    <p className="font-medium">{payment.amount}</p>
                    <p className="text-sm text-gray-600">{payment.date}</p>
                  </div>
                  <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded">
                    {payment.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Active Requests */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wrench className="h-5 w-5" />
              Maintenance Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { issue: "Leaky faucet in kitchen", status: "In Progress", submitted: "2 days ago" },
                { issue: "Air conditioner not working", status: "Pending", submitted: "5 days ago" }
              ].map((request, index) => (
                <div key={index} className="border-b pb-3">
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-medium">{request.issue}</p>
                    <span className={`text-xs px-2 py-1 rounded ${
                      request.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {request.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">Submitted {request.submitted}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Upcoming Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { event: "Rent payment due", date: "In 3 days", type: "payment" },
                { event: "Property inspection", date: "Next week", type: "inspection" },
                { event: "Lease renewal discussion", date: "In 2 months", type: "lease" }
              ].map((item, index) => (
                <div key={index} className="flex justify-between items-center border-b pb-2">
                  <div>
                    <p className="font-medium">{item.event}</p>
                    <span className={`text-xs px-2 py-1 rounded ${
                      item.type === 'payment' ? 'bg-red-100 text-red-800' :
                      item.type === 'inspection' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {item.type}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">{item.date}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TenantDashboard;
