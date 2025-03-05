import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Switch,
  TextField,
  Button,
  Stack,
  Tab,
  Tabs,
  Grid,
  Paper,
  IconButton,
  useTheme,
  alpha,
  Alert,
  Snackbar
} from '@mui/material';
import {
  Person,
  ModeEdit,
  Brightness4,
  Brightness7,
  Palette,
  Notifications,
  Security,
  Language,
  Logout,
  Save,
  Storage as DatabaseIcon
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

interface ProfileProps {
  darkMode: boolean;
  onThemeToggle: () => void;
}

const Profile = ({ darkMode, onThemeToggle }: ProfileProps) => {
  const { user, logout } = useAuth();
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });
  
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

  const colorOptions = [
    { name: 'Blue', value: '#1976d2' },
    { name: 'Purple', value: '#9c27b0' },
    { name: 'Green', value: '#2e7d32' },
    { name: 'Orange', value: '#ed6c02' },
    { name: 'Red', value: '#d32f2f' }
  ];

  const getInitials = () => {
    if (userForm.firstName && userForm.lastName) {
      return `${userForm.firstName[0]}${userForm.lastName[0]}`;
    }
    if (user?.username) {
      return user.username[0].toUpperCase();
    }
    return 'U';
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
          <Card 
            elevation={0} 
            sx={{ 
              borderRadius: 3, 
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              height: '100%'
            }}
          >
            <CardContent sx={{ textAlign: 'center', pt: 4, pb: 3 }}>
              <Box sx={{ position: 'relative', display: 'inline-block', mb: 2 }}>
                <Avatar 
                  sx={{ 
                    width: 120, 
                    height: 120, 
                    fontSize: '2.5rem',
                    mb: 2,
                    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    border: `4px solid ${theme.palette.background.paper}`,
                    boxShadow: theme.shadows[3]
                  }}
                >
                  {getInitials()}
                </Avatar>
                <IconButton 
                  sx={{ 
                    position: 'absolute', 
                    bottom: 16, 
                    right: -4,
                    backgroundColor: theme.palette.background.paper,
                    border: `1px solid ${theme.palette.divider}`,
                    '&:hover': {
                      backgroundColor: alpha(theme.palette.primary.main, 0.1)
                    }
                  }}
                >
                  <ModeEdit fontSize="small" />
                </IconButton>
              </Box>
              
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                {userForm.firstName ? `${userForm.firstName} ${userForm.lastName}` : user?.username}
              </Typography>
              
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {user?.email}
              </Typography>
              
              {user?.role && (
                <Box 
                  sx={{ 
                    display: 'inline-block',
                    mt: 1,
                    px: 2,
                    py: 0.5,
                    borderRadius: 2,
                    fontSize: '0.8rem',
                    fontWeight: 'medium',
                    textTransform: 'uppercase',
                    bgcolor: (theme) => 
                      user.role === 'admin' 
                        ? alpha(theme.palette.error.main, 0.1)
                        : alpha(theme.palette.primary.main, 0.1),
                    color: (theme) => 
                      user.role === 'admin' 
                        ? theme.palette.error.main
                        : theme.palette.primary.main,
                  }}
                >
                  {user.role}
                </Box>
              )}
              
              <Typography 
                variant="body1" 
                sx={{ 
                  mt: 2,
                  fontStyle: 'italic',
                  color: 'text.secondary'
                }}
              >
                {userForm.bio || "No bio available"}
              </Typography>
              
              <Button 
                variant="outlined" 
                fullWidth 
                sx={{ mt: 3 }}
                startIcon={<Logout />}
                onClick={logout}
                color="error"
              >
                Logout
              </Button>
            </CardContent>
            
            <Divider />
            
            <List>
              <ListItemButton selected={tabValue === 0} onClick={() => setTabValue(0)}>
                <ListItemIcon>
                  <Person />
                </ListItemIcon>
                <ListItemText primary="Account Information" />
              </ListItemButton>
              
              <ListItemButton selected={tabValue === 1} onClick={() => setTabValue(1)}>
                <ListItemIcon>
                  <Palette />
                </ListItemIcon>
                <ListItemText primary="Appearance" />
              </ListItemButton>
              
              <ListItemButton selected={tabValue === 2} onClick={() => setTabValue(2)}>
                <ListItemIcon>
                  <Notifications />
                </ListItemIcon>
                <ListItemText primary="Notifications" />
              </ListItemButton>
            </List>
          </Card>
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
            <Box sx={{ borderBottom: 1, borderColor: 'divider', px: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: 1 }}>
                <Tabs 
                  value={tabValue} 
                  onChange={handleTabChange} 
                  aria-label="profile settings tabs"
                  sx={{
                    '& .MuiTabs-indicator': {
                      height: 3,
                      borderRadius: '3px 3px 0 0'
                    }
                  }}
                >
                  <Tab label="Profile" id="profile-tab-0" aria-controls="profile-tabpanel-0" />
                  <Tab label="Appearance" id="profile-tab-1" aria-controls="profile-tabpanel-1" />
                  <Tab label="Notifications" id="profile-tab-2" aria-controls="profile-tabpanel-2" />
                </Tabs>
                <Button
                  variant={editMode ? "contained" : "outlined"}
                  startIcon={editMode ? <Save /> : <ModeEdit />}
                  onClick={handleEditToggle}
                >
                  {editMode ? "Save" : "Edit"}
                </Button>
              </Box>
            </Box>
            
            {/* Profile Tab */}
            <TabPanel value={tabValue} index={0}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="First Name"
                    name="firstName"
                    value={userForm.firstName}
                    onChange={handleInputChange}
                    fullWidth
                    disabled={!editMode}
                    placeholder="Enter your first name"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Last Name"
                    name="lastName"
                    value={userForm.lastName}
                    onChange={handleInputChange}
                    fullWidth
                    disabled={!editMode}
                    placeholder="Enter your last name"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Username"
                    name="username"
                    value={userForm.username}
                    onChange={handleInputChange}
                    fullWidth
                    disabled={!editMode}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Email"
                    name="email"
                    type="email"
                    value={userForm.email}
                    onChange={handleInputChange}
                    fullWidth
                    disabled={!editMode}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Bio"
                    name="bio"
                    value={userForm.bio}
                    onChange={handleInputChange}
                    fullWidth
                    multiline
                    rows={4}
                    disabled={!editMode}
                    placeholder="Tell us about yourself"
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </TabPanel>
            
            {/* Appearance Tab */}
            <TabPanel value={tabValue} index={1}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>Theme</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Typography sx={{ flexGrow: 1 }}>
                      {darkMode ? "Dark Mode" : "Light Mode"}
                    </Typography>
                    <IconButton onClick={onThemeToggle} color="primary">
                      {darkMode ? <Brightness7 /> : <Brightness4 />}
                    </IconButton>
                  </Box>
                  
                  <Divider sx={{ my: 3 }} />
                  
                  <Typography variant="h6" gutterBottom>Colors</Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Choose your preferred accent color
                  </Typography>
                  
                  <Box sx={{ mb: 3, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {colorOptions.map((color) => (
                      <Box
                        key={color.value}
                        onClick={() => setThemePreferences({...themePreferences, primaryColor: color.value})}
                        sx={{
                          width: 40,
                          height: 40,
                          bgcolor: color.value,
                          borderRadius: '50%',
                          cursor: 'pointer',
                          border: themePreferences.primaryColor === color.value ? 
                            '3px solid white' : '3px solid transparent',
                          boxShadow: themePreferences.primaryColor === color.value ? 
                            `0 0 0 2px ${color.value}` : 'none',
                          transition: 'all 0.2s',
                          '&:hover': {
                            transform: 'scale(1.1)'
                          }
                        }}
                      />
                    ))}
                  </Box>
                  
                  <Divider sx={{ my: 3 }} />
                  
                  <Typography variant="h6" gutterBottom>Font Size</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography variant="body2">Small</Typography>
                    <Box sx={{ flexGrow: 1 }}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Button 
                          size="small" 
                          variant={themePreferences.fontSize === 'Small' ? 'contained' : 'outlined'}
                          onClick={() => setThemePreferences({...themePreferences, fontSize: 'Small'})}
                        >
                          A
                        </Button>
                        <Button 
                          size="small"
                          variant={themePreferences.fontSize === 'Medium' ? 'contained' : 'outlined'}
                          onClick={() => setThemePreferences({...themePreferences, fontSize: 'Medium'})}
                        >
                          A
                        </Button>
                        <Button 
                          size="small"
                          variant={themePreferences.fontSize === 'Large' ? 'contained' : 'outlined'}
                          onClick={() => setThemePreferences({...themePreferences, fontSize: 'Large'})}
                        >
                          A
                        </Button>
                      </Stack>
                    </Box>
                    <Typography variant="body2">Large</Typography>
                  </Box>
                </Grid>
              </Grid>
            </TabPanel>
            
            {/* Notifications Tab */}
            <TabPanel value={tabValue} index={2}>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <Notifications color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Email Notifications" 
                    secondary="Receive emails for important updates"
                  />
                  <Switch 
                    edge="end" 
                    checked={notificationSettings.emailNotifications} 
                    onChange={handleToggleChange('emailNotifications')}
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem>
                  <ListItemIcon>
                    <DatabaseIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Database Alerts" 
                    secondary="Get notified about database events and errors"
                  />
                  <Switch 
                    edge="end" 
                    checked={notificationSettings.databaseAlerts} 
                    onChange={handleToggleChange('databaseAlerts')}
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem>
                  <ListItemIcon>
                    <Security color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Security Alerts" 
                    secondary="Be alerted about security-related events"
                  />
                  <Switch 
                    edge="end" 
                    checked={notificationSettings.securityAlerts} 
                    onChange={handleToggleChange('securityAlerts')}
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem>
                  <ListItemIcon>
                    <Language color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Product Updates" 
                    secondary="Stay informed about new features and updates"
                  />
                  <Switch 
                    edge="end" 
                    checked={notificationSettings.updateNotifications} 
                    onChange={handleToggleChange('updateNotifications')}
                  />
                </ListItem>
              </List>
            </TabPanel>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile; 