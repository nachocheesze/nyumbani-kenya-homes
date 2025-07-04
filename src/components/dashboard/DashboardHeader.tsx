
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, LogOut, Wallet } from "lucide-react";

interface DashboardHeaderProps {
  user: {
    name: string;
    email: string;
    role: string;
    avatar?: string;
    walletBalance?: number;
  };
}

const DashboardHeader = ({ user }: DashboardHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-8 p-6 bg-white rounded-lg border">
      <div className="flex items-center space-x-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={user.avatar} />
          <AvatarFallback className="text-lg">
            {user.name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-xl font-bold">Welcome back, {user.name.split(' ')[0]}!</h2>
          <div className="flex items-center space-x-2">
            <p className="text-gray-600">{user.email}</p>
            <Badge className="capitalize">{user.role}</Badge>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {user.walletBalance !== undefined && (
          <div className="text-right">
            <p className="text-sm text-gray-600">Wallet Balance</p>
            <p className="font-bold text-emerald-600">
              KSh {user.walletBalance.toLocaleString()}
            </p>
          </div>
        )}
        
        <Button variant="outline" size="icon">
          <Bell className="h-4 w-4" />
        </Button>
        
        <Button variant="outline" size="icon">
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
