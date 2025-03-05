import { ReactNode, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import LoginPage from '../pages/LoginPage';

interface ProtectedRouteProps {
  children: ReactNode;
  redirectPath?: string;
  requiredRole?: string;
}

/**
 * A component to protect routes that require authentication.
 * It renders children if the user is authenticated, or redirects to the login page.
 * @param children - The components to render if authenticated
 * @param redirectPath - Optional path to redirect to if not authenticated
 * @param requiredRole - Optional role required to access this route
 */
const ProtectedRoute = ({ 
  children, 
  redirectPath = '/login',
  requiredRole 
}: ProtectedRouteProps) => {
  const { isAuthenticated, loading, user } = useAuth();

  // Check if the user has the required role if specified
  const hasRequiredRole = requiredRole 
    ? user?.role === requiredRole
    : true;

  // If authenticated and has required role, render the children
  if (isAuthenticated && hasRequiredRole) {
    return <>{children}</>;
  }

  // If not authenticated or doesn't have required role, and not loading, show login page
  if (!loading) {
    return <LoginPage />;
  }

  // If still loading auth state, show nothing (or could add a loading spinner)
  return null;
};

export default ProtectedRoute; 