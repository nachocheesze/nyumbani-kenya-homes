
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, Plus, Eye, Send, AlertTriangle, Info, CheckCircle } from 'lucide-react';

const CaretakerNotices = () => {
  const notices = [
    { 
      id: 1, 
      title: "Water Maintenance Scheduled", 
      content: "Water will be shut off in Block A from 9 AM to 3 PM for pump maintenance.",
      type: "maintenance", 
      priority: "High", 
      status: "Sent", 
      recipients: "Block A residents",
      date: "2024-06-07",
      readCount: 12,
      totalRecipients: 15
    },
    { 
      id: 2, 
      title: "Waste Collection Changes", 
      content: "Due to public holiday, waste collection is rescheduled to Saturday morning.",
      type: "schedule", 
      priority: "Medium", 
      status: "Draft", 
      recipients: "All residents",
      date: "2024-06-06",
      readCount: 0,
      totalRecipients: 45
    },
    { 
      id: 3, 
      title: "Security System Update", 
      content: "New security cameras have been installed in common areas.",
      type: "security", 
      priority: "Low", 
      status: "Sent", 
      recipients: "All residents",
      date: "2024-06-05",
      readCount: 38,
      totalRecipients: 45
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'maintenance':
        return <AlertTriangle className="h-4 w-4 text-orange-600" />;
      case 'security':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'schedule':
        return <Info className="h-4 w-4 text-blue-600" />;
      default:
        return <Bell className="h-4 w-4 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Sent':
        return 'bg-green-100 text-green-800';
      case 'Draft':
        return 'bg-gray-100 text-gray-800';
      case 'Scheduled':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notice Management</h1>
          <p className="text-gray-600">Create and manage tenant notifications</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create Notice
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Notices</CardTitle>
            <Bell className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Currently active</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Draft Notices</CardTitle>
            <Bell className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Ready to send</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Read Rate</CardTitle>
            <Eye className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">84%</div>
            <p className="text-xs text-muted-foreground">Average read rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Priority</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Urgent notices</p>
          </CardContent>
        </Card>
      </div>

      {/* Notice Templates */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Notice Templates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: "Maintenance Notice", description: "Scheduled maintenance work", icon: AlertTriangle, color: "orange" },
              { title: "Water Disruption", description: "Water supply interruption", icon: AlertTriangle, color: "red" },
              { title: "General Information", description: "General announcements", icon: Info, color: "blue" }
            ].map((template, index) => (
              <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center gap-3 mb-2">
                  <template.icon className={`h-5 w-5 text-${template.color}-600`} />
                  <h3 className="font-medium">{template.title}</h3>
                </div>
                <p className="text-sm text-gray-600">{template.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Notices */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Notices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notices.map((notice) => (
              <div key={notice.id} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3">
                    {getTypeIcon(notice.type)}
                    <div>
                      <h3 className="font-medium">{notice.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{notice.content}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs text-gray-500">To: {notice.recipients}</span>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-500">{notice.date}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(notice.priority)}`}>
                      {notice.priority}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(notice.status)}`}>
                      {notice.status}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    {notice.status === 'Sent' && (
                      <span>Read: {notice.readCount}/{notice.totalRecipients} ({Math.round((notice.readCount / notice.totalRecipients) * 100)}%)</span>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    {notice.status === 'Draft' && (
                      <Button size="sm" className="flex items-center gap-1">
                        <Send className="h-4 w-4" />
                        Send
                      </Button>
                    )}
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

export default CaretakerNotices;
