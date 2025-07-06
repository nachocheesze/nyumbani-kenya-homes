
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Receipt, Download, Eye, Plus } from 'lucide-react';

const CaretakerReceipts = () => {
  const receipts = [
    { id: 1, number: "RCP-2024-001", tenant: "John Doe", unit: "2A", amount: 15000, date: "2024-06-01", type: "Rent Payment" },
    { id: 2, number: "RCP-2024-002", tenant: "Jane Smith", unit: "1B", amount: 12000, date: "2024-06-03", type: "Security Deposit" },
    { id: 3, number: "RCP-2024-003", tenant: "Mike Johnson", unit: "3C", amount: 18000, date: "2024-06-05", type: "Rent Payment" },
    { id: 4, number: "RCP-2024-004", tenant: "Sarah Wilson", unit: "4A", amount: 500, date: "2024-06-07", type: "Utility Payment" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Receipt Management</h1>
          <p className="text-gray-600">Generate and manage payment receipts</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Generate Receipt
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Receipts</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Amount</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">KES 345,500</div>
            <p className="text-xs text-muted-foreground">Receipt value</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Receipts</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Need generation</p>
          </CardContent>
        </Card>
      </div>

      {/* Receipts Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Receipts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {receipts.map((receipt) => (
              <div key={receipt.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-emerald-100 rounded-lg">
                    <Receipt className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-medium">{receipt.number}</p>
                    <p className="text-sm text-gray-600">{receipt.tenant} - Unit {receipt.unit}</p>
                    <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">
                      {receipt.type}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-medium">KES {receipt.amount.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">{receipt.date}</p>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CaretakerReceipts;
