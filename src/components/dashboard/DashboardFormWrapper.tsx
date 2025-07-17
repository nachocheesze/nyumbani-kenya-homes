import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

interface DashboardFormWrapperProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

const DashboardFormWrapper: React.FC<DashboardFormWrapperProps> = ({ title, description, children }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
      <Card>
        <CardContent className="p-6">
          {children}
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardFormWrapper;
