import React, { useState, useMemo, useEffect } from 'react'
import { ThemeProvider, createTheme, CssBaseline, Box, useMediaQuery } from '@mui/material'
import './App.css'
import Dashboard from './components/Dashboard'
import DashboardPage from './components/DashboardPage'
import Header from './components/Header'
import DatabaseConnection from './components/DatabaseConnection'
import { AuthProvider, useAuth } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import LoginPage from './pages/LoginPage'
import LoadingIndicator from './components/LoadingIndicator'
import Profile from './components/Profile'

// Content wrapper component that uses authentication state
const AppContent = () => {
  const [open, setOpen] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const { isAuthenticated, loading, user } = useAuth();
  const [appInitialized, setAppInitialized] = useState(false);
  
  // Use system preference for initial dark mode state
  useMemo(() => {
    setDarkMode(prefersDarkMode)
  }, [prefersDarkMode])

  // Initialize app after auth is loaded
  useEffect(() => {
    if (!loading) {
      setTimeout(() => {
        setAppInitialized(true);
      }, 500); // Small delay for smoother UX
    }
  }, [loading]);

  const handleDrawerToggle = () => {
    setOpen(!open)
  }

  const handleThemeToggle = () => {
    setDarkMode(!darkMode)
  }

  const theme = useMemo(() => createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: darkMode ? '#4caf50' : '#2e7d32',
        light: darkMode ? '#80e27e' : '#60ad5e',
        dark: darkMode ? '#087f23' : '#005005',
        contrastText: '#ffffff',
      },
      secondary: {
        main: darkMode ? '#66bb6a' : '#388e3c',
        light: darkMode ? '#98ee99' : '#6abf69',
        dark: darkMode ? '#338a3e' : '#00600f',
        contrastText: '#ffffff',
      },
      background: {
        default: darkMode ? '#111827' : '#f9fafb',
        paper: darkMode ? '#1f2937' : '#ffffff',
      },
      error: {
        main: '#ef4444',
      },
      warning: {
        main: '#f59e0b',
      },
      info: {
        main: '#0ea5e9',
      },
      success: {
        main: '#10b981',
      },
      text: {
        primary: darkMode ? '#f9fafb' : '#111827',
        secondary: darkMode ? '#d1d5db' : '#4b5563',
      },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 700,
      },
      h2: {
        fontWeight: 600,
      },
      h3: {
        fontWeight: 600,
      },
      h4: {
        fontWeight: 600,
      },
      h5: {
        fontWeight: 600,
      },
      h6: {
        fontWeight: 600,
      },
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            textTransform: 'none',
            fontWeight: 500,
          },
          contained: {
            boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
          },
        },
      },
    },
  }), [darkMode]);

  // Display the content without Router since it's not available
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderContent = () => {
    switch(currentPage) {
      case 'dashboard':
        return <Dashboard title="LeafGraph" username={user?.username || "Admin"} />;
      case 'dashboardPage':
        return <DashboardPage />;
      case 'connections':
        return <DatabaseConnection />;
      case 'profile':
        return <Profile darkMode={darkMode} onThemeToggle={handleThemeToggle} />;
      default:
        return <Dashboard title="LeafGraph" username={user?.username || "Admin"} />;
    }
  };

  // Mock navigation function to pass to the Header
  const navigateTo = (page: string) => {
    setCurrentPage(page);
  };

  // If still loading auth state or initializing, show loading indicator
  if (loading || !appInitialized) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LoadingIndicator message="Initializing application..." />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box className={`app-container${darkMode ? ' MuiTheme-dark' : ''}`}>
        {isAuthenticated ? (
          // Authenticated UI with Header and content
          <>
            <Header 
              title="LeafGraph" 
              onMenuToggle={handleDrawerToggle} 
              onThemeToggle={handleThemeToggle} 
              darkMode={darkMode}
              onNavigate={navigateTo}
            />
            <div className="content-container">
              {renderContent()}
            </div>
          </>
        ) : (
          // Non-authenticated UI (Login page only)
          <LoginPage />
        )}
      </Box>
    </ThemeProvider>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App
