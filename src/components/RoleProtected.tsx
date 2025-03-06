import { ReactNode } from 'react';
import useAuthorization from '../hooks/useAuthorization';

interface RoleProtectedProps {
  /**
   * The content to render if the user has the required role
   */
  children: ReactNode;
  
  /**
   * Single role required to access the content
   */
  requiredRole?: string;
  
  /**
   * Array of roles - user must have at least one of these roles
   */
  allowedRoles?: string[];
  
  /**
   * Optional fallback component to show if user doesn't have required role
   */
  fallback?: ReactNode;
}

/**
 * Component that conditionally renders children based on user's role
 */
const RoleProtected = ({ 
  children, 
  requiredRole, 
  allowedRoles = [], 
  fallback = null 
}: RoleProtectedProps) => {
  const { hasRole, hasAnyRole } = useAuthorization();

  // Check if user has required permissions
  const hasAccess = () => {
    if (requiredRole) {
      return hasRole(requiredRole);
    }
    
    if (allowedRoles.length) {
      return hasAnyRole(allowedRoles);
    }
    
    // If no roles specified, allow access
    return true;
  };

  // Render children if user has access, otherwise render fallback
  return hasAccess() ? <>{children}</> : <>{fallback}</>;
};

export default RoleProtected; 