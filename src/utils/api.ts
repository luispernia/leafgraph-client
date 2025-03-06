/**
 * API utility for making HTTP requests with cookie-based authentication
 */

const API_BASE_URL = 'http://localhost:3000/api';

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

/**
 * Configure fetch options for all requests
 * With HTTP-only cookies, we need to include credentials
 */
const getRequestOptions = (method: string, body?: object): RequestInit => {
  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json'
    },
    // This is crucial for sending and receiving cookies
    credentials: 'include'
  };
  
  if (body) {
    options.body = JSON.stringify(body);
  }
  
  return options;
};

/**
 * Generic GET request
 * @param endpoint - API endpoint
 * @param requireAuth - Whether the request requires authentication (kept for consistency)
 */
export const get = async <T>(endpoint: string, requireAuth: boolean = true): Promise<ApiResponse<T>> => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, getRequestOptions('GET'));

    // Handle 401 Unauthorized
    if (response.status === 401 && requireAuth) {
      throw new Error('Authentication required');
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
 * @param requireAuth - Whether the request requires authentication (kept for consistency)
 */
export const post = async <T>(
  endpoint: string,
  body: object = {},
  requireAuth: boolean = true
): Promise<ApiResponse<T>> => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, getRequestOptions('POST', body));

    // Handle 401 Unauthorized
    if (response.status === 401 && requireAuth) {
      throw new Error('Authentication required');
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
    const response = await fetch(`${API_BASE_URL}${endpoint}`, getRequestOptions('PUT', body));

    // Handle 401 Unauthorized
    if (response.status === 401) {
      throw new Error('Authentication required');
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
    const response = await fetch(`${API_BASE_URL}${endpoint}`, getRequestOptions('DELETE'));

    // Handle 401 Unauthorized
    if (response.status === 401) {
      throw new Error('Authentication required');
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
 * Check if user is authenticated by trying to access protected endpoint
 * @returns Promise resolving to boolean indicating authentication status
 */
export const checkAuthentication = async (): Promise<boolean> => {
  try {
    const response = await get<{ authenticated: boolean }>('/users/me');
    return response.success && !!response.data?.authenticated;
  } catch (error) {
    return false;
  }
}; 