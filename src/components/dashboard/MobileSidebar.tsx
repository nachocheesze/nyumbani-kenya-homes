
import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Sidebar from './Sidebar';

interface MobileSidebarProps {
  role: string;
  isOpen: boolean;
  onClose: () => void;
}

const MobileSidebar: React.FC<MobileSidebarProps> = ({ role, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full z-50 md:hidden">
        <div className="relative">
          <Sidebar 
            role={role} 
            isCollapsed={false}
            onToggle={onClose}
          />
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-4 right-2"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </>
  );
};

export default MobileSidebar;
