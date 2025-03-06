import { NavigateFunction } from 'react-router-dom';

/**
 * Navigate to different application routes
 * @param navigate - React Router's navigate function
 * @param page - Page identifier
 * @param setCurrentPage - State setter for the current page
 * @param isMobile - Whether the device is mobile
 * @param setOpen - Drawer open state setter
 */
export const navigateTo = (
  navigate: NavigateFunction,
  page: string, 
  setCurrentPage: (page: string) => void,
  isMobile: boolean,
  setOpen: (open: boolean) => void
) => {
  setCurrentPage(page);
  
  switch (page) {
    case 'dashboard':
      navigate('/dashboard');
      break;
    case 'dashboardPage':
      navigate('/');
      break;
    case 'connections':
      navigate('/connections');
      break;
    case 'profile':
      navigate('/profile');
      break;
    default:
      navigate('/');
      break;
  }
  
  // Close the drawer on mobile after navigation
  if (isMobile) {
    setOpen(false);
  }
};

/**
 * Get user initial for avatar
 * @param user - User object
 * @returns The first letter of the username or 'U' if no user
 */
export const getUserInitial = (user: { username: string } | null): string => {
  if (user?.username) {
    return user.username.charAt(0).toUpperCase();
  }
  return 'U';
}; 