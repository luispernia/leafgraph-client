import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import * as api from '../utils/api';

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
}

// Define API response interfaces
interface AuthResponse {
  user: User;
  token?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
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

  // Initialize auth state by checking if user is already authenticated
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        setLoading(true);
        
        // Check current authentication status using API
        const response = await api.get<User>('/users/me', true);
        if (response.success && response.data) {
          setUser(response.data);
        } else {
          // Clear user if the server doesn't recognize them
          setUser(null);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        // If this fails, the user is not authenticated or token is invalid
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    
    initializeAuth();
  }, []);

  const login = async (username: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await api.post<AuthResponse>(
        '/auth/login', 
        { username, password }, 
        false
      );

      if (!response.success || !response.data) {
        throw new Error(response.message || 'Authentication failed');
      }

      // Set user data from response
      setUser(response.data.user);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      // Call logout endpoint
      await api.post('/auth/logout', {}, true);
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      // Clear user state regardless of server response
      setUser(null);
    }
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
    clearError
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext; 