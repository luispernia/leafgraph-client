import { useState } from 'react';
import { 
  Button, 
  Menu, 
  MenuItem, 
  ListItemIcon, 
  ListItemText, 
  alpha 
} from '@mui/material';
import { 
  KeyboardArrowDown, 
  Dashboard as DashboardIcon, 
  Link as LinkIcon 
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const DatabaseMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const navigateTo = (path: string) => {
    navigate(path);
    handleMenuClose();
  };

  return (
    <>
      <Button 
        color="inherit" 
        sx={{ 
          mx: 1,
          borderRadius: 1.5,
          height: 32,
          px: 1.5,
          typography: 'body2',
          fontWeight: 500,
          '&:hover': {
            bgcolor: theme => alpha(theme.palette.primary.main, 0.1),
          }
        }}
        aria-controls="database-menu"
        aria-haspopup="true"
        onClick={handleMenuOpen}
        endIcon={<KeyboardArrowDown />}
      >
        Database
      </Button>
      <Menu
        id="database-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
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
            minWidth: 180,
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            overflow: 'hidden'
          }
        }}
      >
        <MenuItem 
          onClick={() => navigateTo('/dashboard')}
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
          onClick={() => navigateTo('/connections')}
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
  );
};

export default DatabaseMenu; 