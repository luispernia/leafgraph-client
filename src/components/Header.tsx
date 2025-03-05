import React, { useState } from 'react';
import {
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Box, 
  Menu, 
  MenuItem, 
  Tooltip, 
  Avatar, 
  Badge, 
  InputBase, 
  Divider,
  useMediaQuery,
  useTheme,
  alpha,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer,
  ListItemButton,
  Chip,
  Collapse,
  Fade
} from '@mui/material';
import { 
  Menu as MenuIcon, 
  Notifications, 
  Settings, 
  AccountCircle, 
  Search as SearchIcon, 
  Storage,
  Brightness4,
  Brightness7,
  Help,
  Code,
  Dashboard as DashboardIcon,
  Link as LinkIcon,
  Home,
  Logout,
  ExpandLess,
  ExpandMore,
  Person,
  KeyboardArrowDown
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import LeafGraphLogo from './LeafGraphLogo';

interface HeaderProps {
  title: string;
  onMenuToggle: () => void;
  onThemeToggle?: () => void;
  darkMode?: boolean;
  onNavigate?: (page: string) => void;
}

const Header = ({ 
  title, 
  onMenuToggle, 
  onThemeToggle, 
  darkMode = false,
  onNavigate
}: HeaderProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState<null | HTMLElement>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mainMenuAnchorEl, setMainMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const { user, logout, isAuthenticated } = useAuth();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationMenu = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
    onMenuToggle();
  };

  const handleMainMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMainMenuAnchorEl(event.currentTarget);
  };

  const handleMainMenuClose = () => {
    setMainMenuAnchorEl(null);
  };

  const navigateTo = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
    }
    if (drawerOpen) {
      setDrawerOpen(false);
    }
    setCurrentPage(page);
  };

  const handleLogout = () => {
    logout();
    handleClose();
  };

  // Updated menu items with sections
  const menuItems = [
    { 
      text: 'Dashboard', 
      icon: <DashboardIcon />, 
      page: 'dashboard' 
    },
    { 
      text: 'Database Overview', 
      icon: <Home />, 
      page: 'dashboardPage' 
    },
    { 
      text: 'Connections', 
      icon: <LinkIcon />, 
      page: 'connections' 
    }
  ];

  const getUserInitial = () => {
    if (user?.username) {
      return user.username.charAt(0).toUpperCase();
    }
    return 'U';
  };

  return (
    <>
      <AppBar 
        position="fixed" 
        sx={{ 
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: 'background.paper',
          color: 'text.primary',
          boxShadow: (theme) => `0 2px 6px ${alpha(theme.palette.common.black, 0.08)}`,
          borderBottom: (theme) => `1px solid ${alpha(theme.palette.divider, 0.08)}`,
          backdropFilter: 'blur(8px)',
          transition: 'all 0.3s'
        }}
        elevation={0}
      >
        <Toolbar sx={{ pr: { xs: 1, sm: 2 }, pl: { xs: 1, sm: 2 }, height: 64 }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerToggle}
            sx={{ 
              mr: { xs: 1, sm: 2 },
              borderRadius: 2,
              transition: 'all 0.2s',
              '&:hover': {
                transform: 'scale(1.05)',
                backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.1)
              }
            }}
          >
            <MenuIcon />
          </IconButton>
          
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              cursor: 'pointer',
              '&:hover': {
                '& .logo-text': {
                  transform: 'translateY(-1px)'
                }
              }
            }}
          >
            <LeafGraphLogo variant="full" sx={{ fontSize: 28 }} />
            {!isSmall && (
              <Chip 
                label="BETA" 
                size="small"
                sx={{ 
                  bgcolor: 'primary.main', 
                  color: 'white', 
                  fontWeight: 'bold',
                  fontSize: '0.65rem',
                  height: 20,
                  ml: 1,
                  '& .MuiChip-label': {
                    px: 1
                  }
                }}
              />
            )}
          </Box>
          
          {!isMobile && (
            <Box 
              sx={{ 
                ml: 4, 
                flexGrow: 1, 
                maxWidth: 400, 
                borderRadius: '12px',
                bgcolor: (theme) => alpha(theme.palette.divider, 0.08),
                display: 'flex',
                alignItems: 'center',
                p: 0.5,
                px: 2,
                transition: 'all 0.3s',
                '&:hover': {
                  bgcolor: (theme) => alpha(theme.palette.divider, 0.15),
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                }
              }}
            >
              <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />
              <InputBase
                placeholder="Search databases, tables..."
                inputProps={{ 'aria-label': 'search databases' }}
                sx={{ 
                  fontSize: '0.875rem',
                  color: 'text.primary',
                  width: '100%',
                  '& .MuiInputBase-input': {
                    transition: 'all 0.2s',
                    '&::placeholder': {
                      transition: 'all 0.2s',
                      opacity: 0.7
                    },
                    '&:focus::placeholder': {
                      opacity: 0.5
                    }
                  }
                }}
              />
            </Box>
          )}
          
          <Box sx={{ flexGrow: { xs: 1, md: 0 } }} />
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {!isMobile && (
              <>
                <Button 
                  color="inherit" 
                  sx={{ 
                    mx: 0.5,
                    borderRadius: 2,
                    '&:hover': {
                      backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.1),
                    }
                  }}
                  aria-controls="main-menu"
                  aria-haspopup="true"
                  onClick={handleMainMenuOpen}
                  endIcon={<KeyboardArrowDown />}
                >
                  Database
                </Button>
                <Menu
                  id="main-menu"
                  anchorEl={mainMenuAnchorEl}
                  keepMounted
                  open={Boolean(mainMenuAnchorEl)}
                  onClose={handleMainMenuClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                  sx={{ mt: 1 }}
                  PaperProps={{
                    elevation: 3,
                    sx: { 
                      borderRadius: 2,
                      minWidth: 180
                    }
                  }}
                >
                  <MenuItem 
                    onClick={() => {
                      navigateTo('dashboard');
                      handleMainMenuClose();
                    }}
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
                      <DashboardIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                  </MenuItem>
                  <MenuItem 
                    onClick={() => {
                      navigateTo('connections');
                      handleMainMenuClose();
                    }}
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
                      <LinkIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Connections" />
                  </MenuItem>
                </Menu>
              </>
            )}

            <Tooltip title="Toggle theme">
              <IconButton 
                onClick={onThemeToggle} 
                color="inherit" 
                size="small"
                sx={{ 
                  ml: { xs: 0.5, sm: 1 },
                  bgcolor: (theme) => alpha(theme.palette.divider, 0.08),
                  '&:hover': {
                    bgcolor: (theme) => alpha(theme.palette.divider, 0.15),
                    transform: 'scale(1.05)'
                  },
                  transition: 'all 0.2s'
                }}
              >
                {darkMode ? <Brightness7 /> : <Brightness4 />}
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Documentation">
              <IconButton 
                color="inherit" 
                size="small"
                sx={{ 
                  ml: { xs: 0.5, sm: 1 },
                  bgcolor: (theme) => alpha(theme.palette.divider, 0.08),
                  '&:hover': {
                    bgcolor: (theme) => alpha(theme.palette.divider, 0.15),
                    transform: 'scale(1.05)'
                  },
                  transition: 'all 0.2s'
                }}
              >
                <Code />
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Help">
              <IconButton 
                color="inherit" 
                size="small"
                sx={{ 
                  ml: { xs: 0.5, sm: 1 },
                  bgcolor: (theme) => alpha(theme.palette.divider, 0.08),
                  '&:hover': {
                    bgcolor: (theme) => alpha(theme.palette.divider, 0.15),
                    transform: 'scale(1.05)'
                  },
                  transition: 'all 0.2s'
                }}
              >
                <Help />
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Notifications">
              <IconButton
                size="small"
                color="inherit"
                aria-label="show notifications"
                aria-controls="notifications-menu"
                aria-haspopup="true"
                onClick={handleNotificationMenu}
                sx={{ 
                  ml: { xs: 0.5, sm: 1 },
                  bgcolor: (theme) => alpha(theme.palette.divider, 0.08),
                  '&:hover': {
                    bgcolor: (theme) => alpha(theme.palette.divider, 0.15),
                    transform: 'scale(1.05)'
                  },
                  transition: 'all 0.2s'
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
              anchorEl={notificationAnchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(notificationAnchorEl)}
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
            
            <Divider orientation="vertical" flexItem sx={{ mx: { xs: 1, sm: 2 }, height: 24, alignSelf: 'center' }} />
            
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
                    transition: 'all 0.2s',
                    '&:hover': {
                      transform: 'scale(1.05)'
                    }
                  }}
                >
                  <Avatar 
                    alt={user?.username || "User"} 
                    src="/static/images/avatar/1.jpg" 
                    sx={{ 
                      width: 34, 
                      height: 34,
                      border: (theme) => `2px solid ${theme.palette.primary.main}`,
                      bgcolor: (theme) => alpha(theme.palette.primary.main, 0.2)
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
                  onClick={() => {
                    navigateTo('profile');
                    handleClose();
                  }} 
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
          </Box>
        </Toolbar>
      </AppBar>

      {/* Side Drawer for Navigation */}
      <Drawer
        variant="temporary"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block' },
          '& .MuiDrawer-paper': { 
            width: 260,
            boxSizing: 'border-box',
            mt: '64px', // AppBar height
            pt: 2,
            borderTopRightRadius: 20,
            boxShadow: (theme) => theme.shadows[5]
          },
        }}
      >
        <Box sx={{ overflow: 'auto' }}>
          {user && (
            <Box sx={{ px: 3, py: 2, mb: 1 }}>
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
                  <Typography variant="subtitle2" fontWeight="bold">{user.username}</Typography>
                  <Typography variant="body2" color="text.secondary">{user.email}</Typography>
                </Box>
              </Box>
              <Button 
                variant="outlined" 
                fullWidth 
                size="small" 
                onClick={() => {
                  navigateTo('profile');
                  setDrawerOpen(false);
                }}
                sx={{ 
                  mt: 1,
                  borderRadius: 2,
                  textTransform: 'none'
                }}
              >
                View Profile
              </Button>
            </Box>
          )}
          
          <Divider sx={{ mb: 2 }} />
          
          <Typography variant="overline" sx={{ px: 3, color: 'text.secondary', fontWeight: 'bold' }}>
            MAIN NAVIGATION
          </Typography>
          
          <List sx={{ pt: 1 }}>
            {menuItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  onClick={() => navigateTo(item.page)}
                  sx={{ 
                    py: 1.2,
                    pl: 3,
                    borderRadius: '0 20px 20px 0',
                    mr: 2,
                    transition: 'all 0.2s',
                    '&:hover': {
                      bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
                      pl: 4
                    }
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40, color: 'primary.main' }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.text} 
                    primaryTypographyProps={{ 
                      fontWeight: currentPage === item.page ? 'bold' : 'normal' 
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          
          <Divider sx={{ mt: 2, mb: 2 }} />
          
          <Typography variant="overline" sx={{ px: 3, color: 'text.secondary', fontWeight: 'bold' }}>
            SETTINGS
          </Typography>
          
          <List sx={{ pt: 1 }}>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => navigateTo('profile')}
                sx={{ 
                  py: 1.2,
                  pl: 3,
                  borderRadius: '0 20px 20px 0',
                  mr: 2,
                  transition: 'all 0.2s',
                  '&:hover': {
                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
                    pl: 4
                  }
                }}
              >
                <ListItemIcon sx={{ minWidth: 40, color: 'primary.main' }}>
                  <AccountCircle />
                </ListItemIcon>
                <ListItemText primary="My Profile" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                onClick={onThemeToggle}
                sx={{ 
                  py: 1.2,
                  pl: 3,
                  borderRadius: '0 20px 20px 0',
                  mr: 2,
                  transition: 'all 0.2s',
                  '&:hover': {
                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
                    pl: 4
                  }
                }}
              >
                <ListItemIcon sx={{ minWidth: 40, color: 'primary.main' }}>
                  {darkMode ? <Brightness7 /> : <Brightness4 />}
                </ListItemIcon>
                <ListItemText primary={darkMode ? "Light Mode" : "Dark Mode"} />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
      
      {/* Toolbar spacer */}
      <Toolbar />
    </>
  );
};

export default Header; 