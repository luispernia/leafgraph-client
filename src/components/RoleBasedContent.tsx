import { ReactNode } from 'react';
import { useAuth } from '../context/AuthContext';

interface RoleBasedContentProps {
  children: ReactNode;
  allowedRoles: string[];
  fallback?: ReactNode;
}

/**
 * Component that renders content only if the user has one of the allowed roles.
 * @param children - Content to render if user has an allowed role
 * @param allowedRoles - Array of roles that can access this content
 * @param fallback - Optional content to render if user doesn't have an allowed role
 */
const RoleBasedContent = ({ 
  children, 
  allowedRoles, 
  fallback = null 
}: RoleBasedContentProps) => {
  const { user } = useAuth();

  // If no user or no role, render fallback
  if (!user || !user.role) {
    return fallback ? <>{fallback}</> : null;
  }

  // If user's role is in the allowed roles, render the children
  if (allowedRoles.includes(user.role)) {
    return <>{children}</>;
  }

  // Otherwise, render the fallback
  return fallback ? <>{fallback}</> : null;
};

export default RoleBasedContent; 