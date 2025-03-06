import { useState, useMemo, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { 
  ThemeProvider, 
  createTheme, 
  CssBaseline,
  Box, 
  useMediaQuery 
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import LoadingIndicator from '../components/LoadingIndicator';
import { updateUserPreferences, getUserPreferences } from '../services/userService';

const RootLayout = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [themeLoaded, setThemeLoaded] = useState(false);
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const { loading, user } = useAuth();
  const [appInitialized, setAppInitialized] = useState(false);
  
  // Fetch user's theme preference when authenticated
  useEffect(() => {
    const fetchUserTheme = async () => {
      if (user && user.id) {
        try {
          const preferences = await getUserPreferences(user.id);
          if (preferences && preferences.theme) {
            setDarkMode(preferences.theme === 'dark');
          } else {
            // If no saved preference, use system preference
            setDarkMode(prefersDarkMode);
          }
        } catch (error) {
          console.error('Error fetching theme preferences:', error);
          // Fallback to system preference
          setDarkMode(prefersDarkMode);
        } finally {
          setThemeLoaded(true);
        }
      } else {
        // Not authenticated, use system preference
        setDarkMode(prefersDarkMode);
        setThemeLoaded(true);
      }
    };

    fetchUserTheme();
  }, [user, prefersDarkMode]);

  // Initialize app after auth is loaded
  useEffect(() => {
    if (!loading && themeLoaded) {
      setTimeout(() => {
        setAppInitialized(true);
      }, 500); // Small delay for smoother UX
    }
  }, [loading, themeLoaded]);

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

  const handleThemeToggle = async () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    // Persist theme preference if user is authenticated
    if (user && user.id) {
      try {
        await updateUserPreferences(user.id, {
          theme: newDarkMode ? 'dark' : 'light'
        });
      } catch (error) {
        console.error('Error saving theme preference:', error);
      }
    }
  };

  // Export theme toggle function via window for access by other components
  useEffect(() => {
    // @ts-ignore - Adding custom property to window
    window.toggleTheme = handleThemeToggle;
    // @ts-ignore - Adding custom property to window  
    window.setDarkMode = setDarkMode;
    // @ts-ignore - Adding custom property to window
    window.isDarkMode = darkMode;

    return () => {
      // @ts-ignore - Cleanup
      delete window.toggleTheme;
      // @ts-ignore - Cleanup
      delete window.setDarkMode;
      // @ts-ignore - Cleanup
      delete window.isDarkMode;
    };
  }, [darkMode, user]);

  // If still loading auth state or initializing, show loading indicator
  if (loading || !themeLoaded || !appInitialized) {
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
        <Outlet context={{ darkMode, handleThemeToggle }} />
      </Box>
    </ThemeProvider>
  );
};

export default RootLayout; 