import * as api from '../utils/api';

interface UserPreferences {
  theme?: 'light' | 'dark';
  [key: string]: any; // Allow other preferences to be updated in the future
}

/**
 * Update user preferences including theme
 * @param userId - The user's ID
 * @param preferences - User preferences to update
 * @returns Promise with update status
 */
export const updateUserPreferences = async (userId: string, preferences: UserPreferences): Promise<boolean> => {
  try {
    const response = await api.put<{ success: boolean }>(`/users/${userId}`, preferences);
    return response.success;
  } catch (error) {
    console.error('Error updating user preferences:', error);
    return false;
  }
};

/**
 * Fetch user preferences
 * @param userId - The user's ID
 * @returns Promise with user preferences
 */
export const getUserPreferences = async (userId: string): Promise<UserPreferences | null> => {
  try {
    const response = await api.get<{ preferences: UserPreferences }>(`/users/${userId}/preferences`);
    return response.success && response.data ? response.data.preferences : null;
  } catch (error) {
    console.error('Error fetching user preferences:', error);
    return null;
  }
}; 