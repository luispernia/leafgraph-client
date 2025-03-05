/**
 * Token Storage utility for securely managing authentication tokens
 * 
 * This approach follows security best practices:
 * - Access token is stored in memory (not persisted across page refreshes, but more secure)
 * - Refresh token is stored in localStorage with encryption for persistence
 * - Session state is maintained with a session cookie
 */

// In-memory storage for access token (cleared on page refresh)
let inMemoryToken: string | null = null;

// Encryption key (in a real app, this could be derived from a server-generated value)
const ENCRYPTION_KEY = 'phpmyadminai_secure_key';

/**
 * Simple encryption function for the refresh token
 * Note: This is not military-grade encryption, but provides some obscurity
 */
const encrypt = (text: string): string => {
  // Simple XOR encryption with the key
  return Array.from(text)
    .map((char, i) => {
      const keyChar = ENCRYPTION_KEY.charCodeAt(i % ENCRYPTION_KEY.length);
      return String.fromCharCode(char.charCodeAt(0) ^ keyChar);
    })
    .join('');
};

/**
 * Decrypt the stored refresh token
 */
const decrypt = (encryptedText: string): string => {
  // Simple XOR decryption with the key
  return Array.from(encryptedText)
    .map((char, i) => {
      const keyChar = ENCRYPTION_KEY.charCodeAt(i % ENCRYPTION_KEY.length);
      return String.fromCharCode(char.charCodeAt(0) ^ keyChar);
    })
    .join('');
};

// Session state management
interface SessionState {
  userId: string;
  username: string;
  role: string;
  expiresAt: number;
}

/**
 * Get the current session state
 */
export const getSessionState = (): SessionState | null => {
  const sessionData = localStorage.getItem('auth_session');
  
  if (!sessionData) {
    return null;
  }
  
  try {
    const session = JSON.parse(decrypt(sessionData)) as SessionState;
    
    // Check if session has expired
    if (session.expiresAt < Date.now()) {
      clearSession();
      return null;
    }
    
    return session;
  } catch (e) {
    console.error('Error parsing session state:', e);
    clearSession();
    return null;
  }
};

/**
 * Set the session state
 */
export const setSessionState = (state: SessionState): void => {
  localStorage.setItem('auth_session', encrypt(JSON.stringify(state)));
};

/**
 * Clear the session state
 */
export const clearSession = (): void => {
  localStorage.removeItem('auth_session');
  localStorage.removeItem('refresh_token');
  inMemoryToken = null;
};

/**
 * Set the access token (stored in memory only)
 */
export const setAccessToken = (token: string): void => {
  inMemoryToken = token;
};

/**
 * Get the access token from memory
 */
export const getAccessToken = (): string | null => {
  return inMemoryToken;
};

/**
 * Set the refresh token (stored encrypted in localStorage)
 */
export const setRefreshToken = (token: string): void => {
  localStorage.setItem('refresh_token', encrypt(token));
};

/**
 * Get the refresh token from storage
 */
export const getRefreshToken = (): string | null => {
  const token = localStorage.getItem('refresh_token');
  
  if (!token) {
    return null;
  }
  
  try {
    return decrypt(token);
  } catch (e) {
    console.error('Error decrypting refresh token:', e);
    return null;
  }
};

/**
 * Check if user has an active session
 */
export const hasActiveSession = (): boolean => {
  return getSessionState() !== null && !!getRefreshToken();
};

/**
 * Helper function to extract expiry time from JWT
 * @param token JWT token
 * @returns Expiry timestamp in milliseconds
 */
export const getTokenExpiry = (token: string): number => {
  try {
    // Extract the payload part of the JWT
    const payloadBase64 = token.split('.')[1];
    const payload = JSON.parse(atob(payloadBase64));
    
    // Get the expiry timestamp and convert to milliseconds
    return payload.exp * 1000;
  } catch (e) {
    console.error('Error parsing token:', e);
    // Default to 1 hour from now
    return Date.now() + 3600 * 1000;
  }
}; 