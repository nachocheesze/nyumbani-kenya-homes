
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Upload, Download, Eye, Trash2, Plus } from 'lucide-react';

const LandlordDocuments = () => {
  const documents = [
    {
      id: 1,
      name: "Lease Agreement - John Doe",
      type: "Lease Agreement",
      property: "Sunset Apartments - Unit 1A",
      dateUploaded: "2024-01-15",
      size: "2.4 MB",
      format: "PDF",
      status: "Active"
    },
    {
      id: 2,
      name: "Property Insurance Policy",
      type: "Insurance",
      property: "All Properties",
      dateUploaded: "2024-01-10",
      size: "1.8 MB",
      format: "PDF",
      status: "Active"
    },
    {
      id: 3,
      name: "Maintenance Receipt - Plumbing",
      type: "Receipt",
      property: "Garden View Flats - Unit 2B",
      dateUploaded: "2024-01-12",
      size: "856 KB",
      format: "PDF",
      status: "Active"
    },
    {
      id: 4,
      name: "Property Title Deed",
      type: "Legal Document",
      property: "Sunset Apartments",
      dateUploaded: "2024-01-05",
      size: "3.2 MB",
      format: "PDF",
      status: "Active"
    }
  ];

  const documentTypes = [
    { type: "Lease Agreements", count: 16, icon: FileText },
    { type: "Insurance Policies", count: 2, icon: FileText },
    { type: "Receipts", count: 24, icon: FileText },
    { type: "Legal Documents", count: 6, icon: FileText }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Document Management</h1>
          <p className="text-gray-600">Store and organize your property documents</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Upload
          </Button>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Document
          </Button>
        </div>
      </div>

      {/* Document Type Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {documentTypes.map((docType, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center">
                <docType.icon className="h-8 w-8 text-emerald-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{docType.type}</p>
                  <p className="text-2xl font-bold text-gray-900">{docType.count}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2">
              <Upload className="h-6 w-6" />
              <span>Upload Documents</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2">
              <FileText className="h-6 w-6" />
              <span>Create Lease</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2">
              <Download className="h-6 w-6" />
              <span>Export All</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Documents List */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Documents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {documents.map((document) => (
              <div key={document.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <FileText className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{document.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>{document.type}</span>
                      <span>•</span>
                      <span>{document.property}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>Uploaded: {new Date(document.dateUploaded).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>{document.size}</span>
                      <span>•</span>
                      <span>{document.format}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 text-xs rounded ${
                    document.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {document.status}
                  </span>
                  <div className="flex gap-1">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Storage Usage */}
      <Card>
        <CardHeader>
          <CardTitle>Storage Usage</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Used Storage</span>
              <span className="text-sm font-medium">245 MB of 1 GB</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-emerald-600 h-2 rounded-full" style={{ width: '24.5%' }}></div>
            </div>
            <p className="text-sm text-gray-600">
              You have plenty of storage space remaining for your documents.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LandlordDocuments;
