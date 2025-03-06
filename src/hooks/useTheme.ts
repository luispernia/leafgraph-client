import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { updateUserPreferences } from '../services/userService';

// Extend Window interface to include our custom properties
declare global {
  interface Window {
    isDarkMode?: boolean;
    toggleTheme?: () => void;
    setDarkMode?: (darkMode: boolean) => void;
  }
}

/**
 * Custom hook for theme management
 * Provides theme state and functions to toggle theme
 * Persists theme changes to the backend
 */
export const useTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean | null>(null);
  const { user } = useAuth();

  // Initialize theme from window object (set by RootLayout)
  useEffect(() => {
    if (window.isDarkMode !== undefined) {
      setIsDarkMode(window.isDarkMode);
    }

    // Listen for changes to window.isDarkMode
    const checkThemeInterval = setInterval(() => {
      if (window.isDarkMode !== undefined && window.isDarkMode !== isDarkMode) {
        setIsDarkMode(window.isDarkMode);
      }
    }, 300);

    return () => clearInterval(checkThemeInterval);
  }, [isDarkMode]);

  /**
   * Toggle theme and persist to backend
   */
  const toggleTheme = useCallback(async () => {
    // Use window.toggleTheme which is set by RootLayout
    // This ensures theme state is consistent across the app
    if (typeof window.toggleTheme === 'function') {
      window.toggleTheme();
    }
  }, []);

  /**
   * Set theme to specific value and persist to backend
   * @param darkMode - Whether to set dark mode
   */
  const setTheme = useCallback(async (darkMode: boolean) => {
    // Only update if different from current state
    if (window.isDarkMode !== darkMode) {
      if (typeof window.setDarkMode === 'function') {
        window.setDarkMode(darkMode);
      }

      // Persist theme preference if user is authenticated
      if (user && user.id) {
        try {
          await updateUserPreferences(user.id, {
            theme: darkMode ? 'dark' : 'light'
          });
        } catch (error) {
          console.error('Error saving theme preference:', error);
        }
      }
    }
  }, [user]);

  return {
    isDarkMode: isDarkMode === null ? false : isDarkMode,
    toggleTheme,
    setTheme
  };
}; 