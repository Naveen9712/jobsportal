import { type ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthUtils } from '../../utils/auth';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!AuthUtils.isAuthenticated()) {
      navigate('/admin/login', { replace: true });
      return;
    }

    // Optional: Show warning if token is expiring soon
    if (AuthUtils.isTokenExpiringSoon()) {
      console.warn('Admin token expiring soon');
      // You could show a toast notification here
    }
  }, [navigate]);

  // Don't render children if not authenticated
  if (!AuthUtils.isAuthenticated()) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;