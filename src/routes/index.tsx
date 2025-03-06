import { RouteObject } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import DatabaseConnection from '../components/DatabaseConnection';
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import Profile from '../components/Profile';
import RootLayout from '../layouts/RootLayout';
import NotFoundPage from '../pages/NotFoundPage';
import { lazy, Suspense } from 'react';
import { Box, CircularProgress } from '@mui/material';

// Lazy load the AuthLayout to avoid circular dependencies
const AuthLayout = lazy(() => import('../layouts/AuthLayout'));

// Loading component for suspense fallback
const LoadingFallback = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <CircularProgress />
  </Box>
);

// Define route metadata with role requirements
interface ProtectedRouteMetadata {
  requiredRole?: string;
  allowedRoles?: string[];
}

// Define route configuration with auth requirements
export const routes: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <AuthLayout />
          </Suspense>
        ),
        children: [
          {
            path: '',
            element: <Dashboard title="Dashboard" />,
          },
          {
            path: 'dashboard',
            element: <Dashboard title='Dashboard' />,
          },
          {
            path: 'connections',
            element: <DatabaseConnection />,
            // Example of a route that requires admin role
            // This is handled by AuthLayout which will redirect to login
            // This metadata can be used by components that need to know about role requirements
          },
          {
            path: 'profile',
            element: <Profile />,
          },
          {
            path: 'admin',
            // Admin routes can be defined here
            // They will be protected by the AuthLayout
          },
        ],
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      }
    ],
  },
]; 