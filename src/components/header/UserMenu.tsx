import { useState } from 'react';
import {
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Typography,
  Avatar,
  alpha,
  Fade
} from '@mui/material';
import {
  Person,
  Settings,
  Logout
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const UserMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleClose();
  };

  const navigateTo = (path: string) => {
    navigate(path);
    handleClose();
  };

  const getUserInitial = () => {
    if (user?.username) {
      return user.username.charAt(0).toUpperCase();
    }
    return 'U';
  };

  return (
    <Box>
      <Tooltip title="Account settings">
        <IconButton
          size="small"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
          sx={{ 
            p: 0,
            '&:hover': {
              transform: 'translateY(-2px)'
            }
          }}
        >
          <Avatar 
            alt={user?.username || "User"} 
            src="/static/images/avatar/1.jpg" 
            sx={{ 
              width: 32,
              height: 32,
              bgcolor: theme => theme.palette.primary.main,
              border: theme => `2px solid ${alpha(theme.palette.primary.main, 0.2)}`
            }}
          >
            {getUserInitial()}
          </Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        id="menu-appbar"
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
        onClose={handleClose}
        TransitionComponent={Fade}
        PaperProps={{
          sx: {
            mt: 1.5,
            minWidth: 220,
            borderRadius: 2,
            boxShadow: (theme) => theme.shadows[3],
            overflow: 'hidden'
          }
        }}
      >
        <Box sx={{ px: 3, py: 2, borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Avatar 
              sx={{ 
                width: 40, 
                height: 40, 
                mr: 1.5,
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.2),
                color: 'primary.main'
              }}
            >
              {getUserInitial()}
            </Avatar>
            <Box>
              <Typography variant="subtitle2" fontWeight="bold">{user?.username || "User"}</Typography>
              <Typography variant="body2" color="text.secondary">{user?.email || "user@example.com"}</Typography>
            </Box>
          </Box>
          
          {user?.role && (
            <Box 
              sx={{ 
                display: 'inline-block',
                px: 1.5,
                py: 0.25,
                borderRadius: 1,
                fontSize: '0.7rem',
                fontWeight: 'bold',
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
        </Box>
        
        <MenuItem 
          onClick={() => navigateTo('/profile')} 
          sx={{ 
            py: 1.5, 
            px: 2, 
            borderRadius: 1, 
            mx: 0.5, 
            my: 0.5,
            '&:hover': {
              backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.08),
            }
          }}
        >
          <ListItemIcon>
            <Person fontSize="small" color="primary" />
          </ListItemIcon>
          <ListItemText primary="My Profile" />
        </MenuItem>
        
        <MenuItem 
          onClick={handleClose} 
          sx={{ 
            py: 1.5, 
            px: 2, 
            borderRadius: 1, 
            mx: 0.5, 
            my: 0.5,
            '&:hover': {
              backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.08),
            }
          }}
        >
          <ListItemIcon>
            <Settings fontSize="small" color="primary" />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </MenuItem>
        
        <Divider sx={{ my: 0.5 }} />
        
        <MenuItem 
          onClick={handleLogout} 
          sx={{ 
            py: 1.5, 
            px: 2, 
            color: 'error.main',
            borderRadius: 1, 
            mx: 0.5, 
            my: 0.5,
            '&:hover': {
              backgroundColor: (theme) => alpha(theme.palette.error.main, 0.08),
            }
          }}
        >
          <ListItemIcon>
            <Logout fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default UserMenu; 