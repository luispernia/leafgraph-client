import { useState } from 'react';
import {
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Tooltip,
  Box,
  Typography,
  List,
  Divider,
  Button,
  alpha,
  Fade
} from '@mui/material';
import { Notifications } from '@mui/icons-material';

const NotificationsMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleNotificationMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Tooltip title="Notifications">
        <IconButton
          size="small"
          color="inherit"
          aria-label="show notifications"
          aria-controls="notifications-menu"
          aria-haspopup="true"
          onClick={handleNotificationMenu}
          sx={{ 
            ml: 1,
            borderRadius: 1.5,
            bgcolor: theme => alpha(theme.palette.divider, 0.05),
            '&:hover': {
              bgcolor: theme => alpha(theme.palette.primary.main, 0.1)
            }
          }}
        >
          <Badge 
            badgeContent={3} 
            color="error"
            sx={{
              '& .MuiBadge-badge': {
                animation: 'pulse 2s infinite',
                '@keyframes pulse': {
                  '0%': { transform: 'scale(1)' },
                  '50%': { transform: 'scale(1.1)' },
                  '100%': { transform: 'scale(1)' }
                }
              }
            }}
          >
            <Notifications />
          </Badge>
        </IconButton>
      </Tooltip>
      <Menu
        id="notifications-menu"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleNotificationClose}
        PaperProps={{
          sx: {
            mt: 1.5,
            width: 320,
            maxWidth: '100%',
            borderRadius: 2,
            boxShadow: (theme) => theme.shadows[3],
            overflow: 'hidden'
          }
        }}
        TransitionComponent={Fade}
        transitionDuration={200}
      >
        <Box sx={{ p: 2, borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}>
          <Typography variant="subtitle1" fontWeight="bold">Notifications</Typography>
          <Typography variant="caption" color="text.secondary">You have 3 new notifications</Typography>
        </Box>
        
        <List sx={{ pt: 0, pb: 0 }}>
          <MenuItem onClick={handleNotificationClose} sx={{ px: 2, py: 1.5 }}>
            <Box sx={{ position: 'relative', width: '100%' }}>
              <Typography variant="subtitle2" fontWeight="bold">Database backup completed</Typography>
              <Typography variant="body2" color="text.secondary">All databases were backed up successfully.</Typography>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>10 minutes ago</Typography>
              <Box 
                sx={{ 
                  position: 'absolute', 
                  width: 4, 
                  height: 4, 
                  bgcolor: 'primary.main', 
                  borderRadius: '50%', 
                  left: -8, 
                  top: 10 
                }} 
              />
            </Box>
          </MenuItem>
          
          <MenuItem onClick={handleNotificationClose} sx={{ px: 2, py: 1.5 }}>
            <Box sx={{ position: 'relative', width: '100%' }}>
              <Typography variant="subtitle2" fontWeight="bold">Server update available</Typography>
              <Typography variant="body2" color="text.secondary">A new version of MySQL server is available.</Typography>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>2 hours ago</Typography>
              <Box 
                sx={{ 
                  position: 'absolute', 
                  width: 4, 
                  height: 4, 
                  bgcolor: 'primary.main', 
                  borderRadius: '50%', 
                  left: -8, 
                  top: 10 
                }} 
              />
            </Box>
          </MenuItem>
          
          <MenuItem onClick={handleNotificationClose} sx={{ px: 2, py: 1.5 }}>
            <Box sx={{ position: 'relative', width: '100%' }}>
              <Typography variant="subtitle2" fontWeight="bold">Security alert</Typography>
              <Typography variant="body2" color="text.secondary">Multiple failed login attempts detected.</Typography>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>Yesterday</Typography>
              <Box 
                sx={{ 
                  position: 'absolute', 
                  width: 4, 
                  height: 4, 
                  bgcolor: 'error.main', 
                  borderRadius: '50%', 
                  left: -8, 
                  top: 10 
                }} 
              />
            </Box>
          </MenuItem>
        </List>
        
        <Divider />
        <Box sx={{ p: 1.5, textAlign: 'center' }}>
          <Button size="small" color="primary" variant="outlined" fullWidth>
            View all notifications
          </Button>
        </Box>
      </Menu>
    </>
  );
};

export default NotificationsMenu; 