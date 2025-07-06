
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';

export const useUserRole = () => {
  const { user, userProfile } = useAuth();

  const { data: isSuperAdmin, isLoading: isCheckingSuperAdmin } = useQuery({
    queryKey: ['is-super-admin', user?.id],
    queryFn: async () => {
      if (!user) return false;
      
      const { data, error } = await supabase.rpc('is_super_admin');
      if (error) {
        console.error('Error checking super admin status:', error);
        return false;
      }
      return data;
    },
    enabled: !!user,
  });

  const { data: currentUserRole, isLoading: isCheckingRole } = useQuery({
    queryKey: ['user-role', user?.id],
    queryFn: async () => {
      if (!user) return null;
      
      const { data, error } = await supabase.rpc('get_user_role');
      if (error) {
        console.error('Error getting user role:', error);
        return null;
      }
      return data;
    },
    enabled: !!user,
  });

  const hasRole = (role: string) => {
    if (isSuperAdmin) return true;
    return userProfile?.role === role || currentUserRole === role;
  };

  const canAccess = (allowedRoles: string[]) => {
    if (isSuperAdmin) return true;
    if (!userProfile?.role && !currentUserRole) return false;
    
    const userRole = userProfile?.role || currentUserRole;
    return allowedRoles.includes(userRole);
  };

  return {
    role: userProfile?.role || currentUserRole,
    isSuperAdmin: isSuperAdmin || false,
    hasRole,
    canAccess,
    isLoading: isCheckingSuperAdmin || isCheckingRole,
  };
};
