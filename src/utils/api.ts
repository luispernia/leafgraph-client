/**
 * API utility for making authenticated HTTP requests
 */
import { getAccessToken, setAccessToken, getRefreshToken, clearSession } from './tokenStorage';

const API_BASE_URL = 'http://localhost:3000/api';

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

const getHeaders = (includeAuth: boolean = true): HeadersInit => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json'
  };

  if (includeAuth) {
    const token = getAccessToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  return headers;
};

/**
 * Generic GET request
 * @param endpoint - API endpoint
 * @param requireAuth - Whether the request requires authentication
 */
export const get = async <T>(endpoint: string, requireAuth: boolean = true): Promise<ApiResponse<T>> => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: getHeaders(requireAuth)
    });

    // Handle 401 Unauthorized - try to refresh token once
    if (response.status === 401 && requireAuth) {
      const refreshed = await handleUnauthorized();
      if (refreshed) {
        // Retry the request with the new token
        return get(endpoint, requireAuth);
      } else {
        throw new Error('Authentication required');
      }
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }

    return data as ApiResponse<T>;
  } catch (error) {
    console.error(`API Error (GET ${endpoint}):`, error);
    throw error;
  }
};

/**
 * Generic POST request
 * @param endpoint - API endpoint
 * @param body - Request body
 * @param requireAuth - Whether the request requires authentication
 */
export const post = async <T>(
  endpoint: string,
  body: object,
  requireAuth: boolean = true
): Promise<ApiResponse<T>> => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: getHeaders(requireAuth),
      body: JSON.stringify(body)
    });

    // Handle 401 Unauthorized - try to refresh token once
    if (response.status === 401 && requireAuth) {
      const refreshed = await handleUnauthorized();
      if (refreshed) {
        // Retry the request with the new token
        return post(endpoint, body, requireAuth);
      } else {
        throw new Error('Authentication required');
      }
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }

    return data as ApiResponse<T>;
  } catch (error) {
    console.error(`API Error (POST ${endpoint}):`, error);
    throw error;
  }
};

/**
 * Generic PUT request
 * @param endpoint - API endpoint
 * @param body - Request body
 */
export const put = async <T>(endpoint: string, body: object): Promise<ApiResponse<T>> => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(body)
    });

    // Handle 401 Unauthorized - try to refresh token once
    if (response.status === 401) {
      const refreshed = await handleUnauthorized();
      if (refreshed) {
        // Retry the request with the new token
        return put(endpoint, body);
      } else {
        throw new Error('Authentication required');
      }
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }

    return data as ApiResponse<T>;
  } catch (error) {
    console.error(`API Error (PUT ${endpoint}):`, error);
    throw error;
  }
};

/**
 * Generic DELETE request
 * @param endpoint - API endpoint
 */
export const del = async <T>(endpoint: string): Promise<ApiResponse<T>> => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: getHeaders()
    });

    // Handle 401 Unauthorized - try to refresh token once
    if (response.status === 401) {
      const refreshed = await handleUnauthorized();
      if (refreshed) {
        // Retry the request with the new token
        return del(endpoint);
      } else {
        throw new Error('Authentication required');
      }
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }

    return data as ApiResponse<T>;
  } catch (error) {
    console.error(`API Error (DELETE ${endpoint}):`, error);
    throw error;
  }
};

/**
 * Check if user is authenticated
 * @returns True if a valid token exists
 */
export const isAuthenticated = (): boolean => {
  return getAccessToken() !== null;
};

/**
 * Utility to handle unauthorized responses (401)
 * Will refresh the token if possible or logout the user
 */
export const handleUnauthorized = async (): Promise<boolean> => {
  const refreshToken = getRefreshToken();
  
  if (!refreshToken) {
    // No refresh token available, force logout
    clearSession();
    return false;
  }
  
  try {
    // Try to get a new access token
    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ refreshToken })
    });
    
    if (!response.ok) {
      throw new Error('Unable to refresh token');
    }
    
    const data = await response.json();
    
    if (data.success && data.data.accessToken) {
      setAccessToken(data.data.accessToken);
      return true;
    }
    
    throw new Error('Invalid refresh token response');
  } catch (error) {
    console.error('Token refresh failed:', error);
    clearSession();
    return false;
  }
}; 