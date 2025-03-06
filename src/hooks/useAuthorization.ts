import { useAuth } from '../context/AuthContext';

/**
 * Hook for checking user authorization based on roles and permissions
 */
export const useAuthorization = () => {
  const { user, isAuthenticated } = useAuth();

  /**
   * Check if the current user has the required role
   * @param requiredRole Single role string to check
   * @returns boolean indicating if user has the role
   */
  const hasRole = (requiredRole: string): boolean => {
    if (!isAuthenticated || !user) return false;
    return user.role === requiredRole;
  };

  /**
   * Check if the current user has any of the required roles
   * @param roles Array of roles to check
   * @returns boolean indicating if user has any of the roles
   */
  const hasAnyRole = (roles: string[]): boolean => {
    if (!isAuthenticated || !user || !roles.length) return false;
    return roles.includes(user.role);
  };

  /**
   * Check if the authenticated user is an admin
   * @returns boolean indicating if user is an admin
   */
  const isAdmin = (): boolean => {
    return hasRole('admin');
  };

  return {
    hasRole,
    hasAnyRole,
    isAdmin,
    userRole: user?.role
  };
};

export default useAuthorization; 