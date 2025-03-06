import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  alpha,
  Avatar,
  Button
} from '@mui/material';
import {
  AccountCircle,
  Brightness4,
  Brightness7
} from '@mui/icons-material';

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
}

interface DrawerContentProps {
  user: User | null;
  currentPage: string;
  menuItems: Array<{
    text: string;
    icon: React.ReactNode;
    page: string;
  }>;
  navigateTo: (page: string) => void;
  darkMode: boolean;
  handleThemeToggle: () => void;
  getUserInitial: () => string;
}

const DrawerContent = ({
  user,
  currentPage,
  menuItems,
  navigateTo,
  darkMode,
  handleThemeToggle,
  getUserInitial
}: DrawerContentProps) => (
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
            <Typography variant="body2" color="text.secondary">{user.email || 'user@example.com'}</Typography>
          </Box>
        </Box>
        <Button
          variant="outlined"
          fullWidth
          size="small"
          onClick={() => navigateTo('profile')}
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
            selected={currentPage === item.page}
            sx={{ 
              py: 1.2,
              pl: 3,
              borderRadius: '0 20px 20px 0',
              mr: 2,
              transition: 'all 0.2s',
              '&:hover': {
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
                pl: 4
              },
              '&.Mui-selected': {
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.12),
                '&:hover': {
                  bgcolor: (theme) => alpha(theme.palette.primary.main, 0.18),
                }
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
          onClick={handleThemeToggle}
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
);

export default DrawerContent; 