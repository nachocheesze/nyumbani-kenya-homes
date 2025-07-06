
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export const useRoleRedirect = () => {
  const { userProfile } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (userProfile?.role) {
      const roleRoutes: Record<string, string> = {
        tenant: '/dashboard',
        landlord: '/dashboard', 
        agent: '/dashboard',
        real_estate_company: '/dashboard',
        service_provider: '/dashboard',
        developer: '/dashboard',
        investor: '/dashboard',
        short_term_host: '/dashboard',
        caretaker: '/dashboard',
        admin: '/dashboard',
        super_admin: '/dashboard'
      };

      const targetRoute = roleRoutes[userProfile.role];
      if (targetRoute && window.location.pathname === '/') {
        navigate(targetRoute);
      }
    }
  }, [userProfile, navigate]);
};
