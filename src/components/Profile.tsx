import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  Button,
  Divider,
  Avatar,
  useTheme,
  Alert,
  Snackbar,
  Grid,
  Card,
  alpha
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useTheme as useCustomTheme } from '../hooks/useTheme';
import { useOutletContext } from 'react-router-dom';

// Import subcomponents
import AppearanceTab from './profile/AppearanceTab';
import NotificationsTab from './profile/NotificationsTab';
import TabPanel from './profile/TabPanel';
import ProfileCard from './profile/ProfileCard';
import ProfileTabs from './profile/ProfileTabs';
import AccountTab from './profile/AccountTab';

interface ProfileProps {}

interface OutletContextType {
  darkMode: boolean;
  handleThemeToggle: () => void;
}

const Profile = () => {
  const { user, logout } = useAuth();
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });
  
  // Use our custom theme hook
  const { isDarkMode } = useCustomTheme();
  
  // Form values for user details
  const [userForm, setUserForm] = useState({
    username: user?.username || '',
    email: user?.email || '',
    firstName: '',
    lastName: '',
    bio: '',
  });

  // Theme preferences (would be loaded from user settings in a real app)
  const [themePreferences, setThemePreferences] = useState({
    primaryColor: '#1976d2',
    accentColor: '#f50057',
    fontFamily: 'Roboto',
    fontSize: 'Medium'
  });

  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    databaseAlerts: true,
    securityAlerts: true,
    updateNotifications: true
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleEditToggle = () => {
    if (editMode) {
      // Save changes would happen here
      setNotification({
        open: true,
        message: 'Profile updated successfully!',
        severity: 'success'
      });
    }
    setEditMode(!editMode);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserForm({
      ...userForm,
      [name]: value
    });
  };

  const handleToggleChange = (setting: keyof typeof notificationSettings) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNotificationSettings({
      ...notificationSettings,
      [setting]: event.target.checked
    });
  };

  const handleCloseNotification = () => {
    setNotification({...notification, open: false});
  };

  return (
    <Box sx={{ 
      maxWidth: 1200, 
      mx: 'auto', 
      p: { xs: 2, md: 3 },
      animation: 'fadeIn 0.5s ease-in-out',
      '@keyframes fadeIn': {
        '0%': { opacity: 0 },
        '100%': { opacity: 1 }
      }
    }}>
      <Snackbar 
        open={notification.open} 
        autoHideDuration={6000} 
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseNotification} 
          severity={notification.severity} 
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>

      <Grid container spacing={3}>
        {/* Profile Card */}
        <Grid item xs={12} md={4}>
          <ProfileCard 
            tabValue={tabValue} 
            setTabValue={setTabValue} 
            firstName={userForm.firstName}
            lastName={userForm.lastName}
          />
        </Grid>
        
        {/* Settings Area */}
        <Grid item xs={12} md={8}>
          <Card 
            elevation={0}
            sx={{ 
              borderRadius: 3, 
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              height: '100%'
            }}
          >
            <ProfileTabs 
              tabValue={tabValue} 
              editMode={editMode} 
              handleTabChange={handleTabChange} 
              handleEditToggle={handleEditToggle}
            />
            
            {/* Profile Tab */}
            <TabPanel value={tabValue} index={0}>
              <AccountTab 
                userForm={userForm} 
                editMode={editMode} 
                handleInputChange={handleInputChange} 
              />
            </TabPanel>
            
            {/* Appearance Tab */}
            <TabPanel value={tabValue} index={1}>
              <AppearanceTab themePreferences={themePreferences} />
            </TabPanel>
            
            {/* Notifications Tab */}
            <TabPanel value={tabValue} index={2}>
              <NotificationsTab 
                notificationSettings={notificationSettings} 
                handleToggleChange={handleToggleChange} 
              />
            </TabPanel>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile; 