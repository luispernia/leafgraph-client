import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  List,
  IconButton,
  Button,
  Divider,
  useTheme,
  alpha
} from '@mui/material';
import {
  Person,
  ModeEdit,
  Palette,
  Notifications,
  Logout
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';

interface ProfileCardProps {
  tabValue: number;
  setTabValue: (value: number) => void;
  firstName: string;
  lastName: string;
}

const ProfileCard = ({ tabValue, setTabValue, firstName, lastName }: ProfileCardProps) => {
  const { user, logout } = useAuth();
  const theme = useTheme();

  const getInitials = () => {
    if (firstName && lastName) {
      return `${firstName[0]}${lastName[0]}`;
    }
    if (user?.username) {
      return user.username[0].toUpperCase();
    }
    return 'U';
  };

  return (
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
          {firstName ? `${firstName} ${lastName}` : user?.username}
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
  );
};

export default ProfileCard; 