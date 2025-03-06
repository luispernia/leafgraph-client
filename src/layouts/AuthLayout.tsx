import { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation, useOutletContext } from 'react-router-dom';
import { 
  Box, 
  Toolbar, 
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { 
  DashboardOutlined, 
  LinkOutlined,
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import MainContent from './components/MainContent';
import AppDrawer from './components/AppDrawer';
import { navigateTo as navigationUtil, getUserInitial } from './utils/navigation';

interface RootLayoutContext {
  darkMode: boolean;
  handleThemeToggle: () => void;
}

const AuthLayout = () => {
  const [open, setOpen] = useState(true);
  const { isAuthenticated, user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { darkMode, handleThemeToggle } = useOutletContext<RootLayoutContext>();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [currentPage, setCurrentPage] = useState(() => {
    const path = location.pathname.split('/')[1] || 'dashboard';
    return path;
  });

  // Handle drawer open state
  useEffect(() => {
    // Set initial drawer state based on screen size, but only on first load
    const initialState = !isMobile;
    setOpen(initialState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array means this only runs once

  // Toggle drawer function
  const handleDrawerToggle = () => {
    console.log('Toggling drawer. Current state:', open);
    // Use a smoother animation by wrapping in requestAnimationFrame
    requestAnimationFrame(() => {
      setOpen(!open);
    });
  };

  // Handle authentication check
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      // Redirect to login page if not authenticated
      navigate('/login', { 
        state: { from: location.pathname }
      });
    }
  }, [isAuthenticated, loading, navigate, location]);

  // Navigation handler wrapper
  const handleNavigate = (page: string) => {
    navigationUtil(
      navigate,
      page,
      setCurrentPage,
      isMobile,
      setOpen
    );
  };

  // Get user initial wrapper
  const handleGetUserInitial = () => {
    return getUserInitial(user);
  };

  // Menu items for sidebar
  const menuItems = [
    { 
      text: 'Dashboard', 
      icon: <DashboardOutlined />, 
      page: 'dashboard' 
    },
    { 
      text: 'Connections', 
      icon: <LinkOutlined />, 
      page: 'connections' 
    }
  ];

  // If loading or not authenticated, don't render anything
  if (loading || !isAuthenticated) {
    return null;
  }

  return (
    <Box sx={{ display: 'flex', width: '100%', height: '100vh', overflow: 'hidden' }}>
      {/* AppBar/Header */}
      <Header
        title="LeafGraph" 
        onMenuToggle={handleDrawerToggle} 
        onThemeToggle={handleThemeToggle} 
        darkMode={darkMode}
      />
      
      {/* Drawer component */}
      <AppDrawer
        open={open}
        isMobile={isMobile}
        user={user}
        currentPage={currentPage}
        menuItems={menuItems}
        darkMode={darkMode}
        handleDrawerToggle={handleDrawerToggle}
        handleThemeToggle={handleThemeToggle}
        navigateTo={handleNavigate}
        getUserInitial={handleGetUserInitial}
      />
      
      {/* Main Content Area */}
      <MainContent open={open} isMobile={isMobile}>
        {/* Toolbar spacer to position content below the appbar */}
        <Toolbar />
        
        <Box 
          sx={{ 
            height: 'calc(100vh - 64px)',
            overflow: 'auto',
            pt: 0,
            pb: 2
          }}
        >
          <Outlet context={{ darkMode, handleThemeToggle }} />
        </Box>
      </MainContent>
    </Box>
  );
};

export default AuthLayout; 