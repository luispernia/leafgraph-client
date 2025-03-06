import React from 'react';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Switch,
  Divider
} from '@mui/material';
import {
  Notifications,
  Security,
  Storage as DatabaseIcon
} from '@mui/icons-material';

interface NotificationSettings {
  emailNotifications: boolean;
  databaseAlerts: boolean;
  securityAlerts: boolean;
  updateNotifications: boolean;
}

interface NotificationsTabProps {
  notificationSettings: NotificationSettings;
  handleToggleChange: (setting: keyof NotificationSettings) => 
    (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const NotificationsTab = ({
  notificationSettings,
  handleToggleChange
}: NotificationsTabProps) => {
  return (
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
          <Notifications color="primary" />
        </ListItemIcon>
        <ListItemText 
          primary="Update Notifications" 
          secondary="Get notifications about app updates and new features"
        />
        <Switch 
          edge="end" 
          checked={notificationSettings.updateNotifications} 
          onChange={handleToggleChange('updateNotifications')}
        />
      </ListItem>
    </List>
  );
};

export default NotificationsTab; 