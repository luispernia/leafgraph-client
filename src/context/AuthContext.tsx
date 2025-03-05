import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  getAccessToken,
  setAccessToken,
  getRefreshToken,
  setRefreshToken,
  getSessionState,
  setSessionState,
  clearSession,
  hasActiveSession,
  getTokenExpiry
} from '../utils/tokenStorage';

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  refreshAccessToken: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [tokenExpiryTime, setTokenExpiryTime] = useState<number | null>(null);

  // Initialize auth state from persisted session
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        setLoading(true);
        
        // Check if we have a session stored
        const session = getSessionState();
        
        if (session) {
          // If we have a stored session, try to refresh the token
          const refreshed = await refreshAccessToken();
          
          if (refreshed) {
            // If refresh was successful, set the user from the session
            setUser({
              id: session.userId,
              username: session.username,
              role: session.role,
              email: `${session.username}@example.com` // Default email format
            });
          } else {
            // If refresh failed, clear the session
            clearSession();
          }
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        clearSession();
      } finally {
        setLoading(false);
      }
    };
    
    initializeAuth();
  }, []);

  // Set up token refresh mechanism
  useEffect(() => {
    // Skip if no token expiry or no user
    if (!tokenExpiryTime || !user) {
      return;
    }

    // Calculate time until token expires (with 1-minute buffer)
    const timeUntilExpiry = tokenExpiryTime - Date.now() - 60000;
    
    // If token is already expired or will expire in less than a minute, refresh it now
    if (timeUntilExpiry <= 0) {
      refreshAccessToken();
      return;
    }

    // Set up timer to refresh token before it expires
    const refreshTimer = setTimeout(() => {
      refreshAccessToken();
    }, timeUntilExpiry);

    return () => {
      clearTimeout(refreshTimer);
    };
  }, [tokenExpiryTime, user]);

  const login = async (username: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Authentication failed');
      }

      if (!data.success) {
        throw new Error(data.message || 'Authentication failed');
      }

      const { accessToken, refreshToken } = data.data.tokens;
      
      // Get token expiry from the JWT payload
      const expiry = getTokenExpiry(accessToken);
      
      // Store tokens securely
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      setTokenExpiryTime(expiry);
      
      // Set user data from response
      setUser(data.data.user);
      
      // Create and store session state
      setSessionState({
        userId: data.data.user.id,
        username: data.data.user.username,
        role: data.data.user.role,
        expiresAt: Date.now() + (7 * 24 * 60 * 60 * 1000) // 7 days
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const refreshAccessToken = async (): Promise<boolean> => {
    const storedRefreshToken = getRefreshToken();
    
    if (!storedRefreshToken) {
      return false;
    }

    try {
      const response = await fetch('http://localhost:3000/api/auth/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ refreshToken: storedRefreshToken })
      });

      if (!response.ok) {
        throw new Error('Failed to refresh token');
      }

      const data = await response.json();
      
      if (!data.success || !data.data.accessToken) {
        throw new Error('Invalid response from refresh endpoint');
      }

      // Get token expiry from the JWT payload
      const expiry = getTokenExpiry(data.data.accessToken);
      
      // Update token in storage
      setAccessToken(data.data.accessToken);
      setTokenExpiryTime(expiry);
      
      return true;
    } catch (error) {
      console.error('Token refresh failed:', error);
      return false;
    }
  };

  const logout = () => {
    // Clear all stored tokens and session data
    clearSession();
    setUser(null);
    setTokenExpiryTime(null);
  };

  const clearError = () => {
    setError(null);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    loading,
    error,
    login,
    logout,
    clearError,
    refreshAccessToken
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext; 