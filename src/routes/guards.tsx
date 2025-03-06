import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import useAuthorization from '../hooks/useAuthorization';

interface AuthGuardProps {
  children: ReactNode;
  requiredRole?: string;
  allowedRoles?: string[];
}

/**
 * A route guard component that protects routes requiring authentication.
 * It checks if the user is authenticated and redirects to login if not.
 */
export const AuthGuard = ({ children }: AuthGuardProps) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    // While checking auth status, don't render anything
    return null;
  }

  if (!isAuthenticated) {
    // Redirect to login with return URL
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return <>{children}</>;
};

/**
 * A route guard component that protects routes based on user roles.
 * It checks if the user has the required role(s) and redirects if not.
 */
export const RoleGuard = ({ 
  children, 
  requiredRole, 
  allowedRoles = []
}: AuthGuardProps) => {
  const { isAuthenticated, loading } = useAuth();
  const { hasRole, hasAnyRole } = useAuthorization();
  const location = useLocation();

  if (loading) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // Check role-based access
  const hasAccess = requiredRole 
    ? hasRole(requiredRole)
    : allowedRoles.length
      ? hasAnyRole(allowedRoles)
      : true;

  if (!hasAccess) {
    // Redirect to unauthorized page or dashboard
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

/**
 * A guard that prevents authenticated users from accessing routes like login page
 * Redirects to dashboard if user is already logged in
 */
export const UnauthenticatedGuard = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // Get the redirect URL from location state or default to dashboard
  const from = location.state?.from || '/';

  if (loading) {
    return null;
  }

  if (isAuthenticated) {
    // Redirect to the previous path or home
    return <Navigate to={from} replace />;
  }

  return <>{children}</>;
}; 