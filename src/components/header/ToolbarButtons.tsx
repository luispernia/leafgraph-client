import React from 'react';
import { 
  Box,
  IconButton,
  Tooltip,
  alpha,
  useMediaQuery,
  Divider
} from '@mui/material';
import {
  Brightness4,
  Brightness7
} from '@mui/icons-material';
import { useTheme as useMuiTheme } from '@mui/material';
import { useTheme } from '../../hooks/useTheme';
import DatabaseMenu from './DatabaseMenu';
import NotificationsMenu from './NotificationsMenu';
import UserMenu from './UserMenu';

// Empty interface since we don't need props anymore
interface ToolbarButtonsProps {}

const ToolbarButtons = () => {
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      {!isMobile && (
        <DatabaseMenu />
      )}

      <Tooltip title={isDarkMode ? "Light Mode" : "Dark Mode"}>
        <IconButton 
          onClick={toggleTheme} 
          color="inherit" 
          size="small"
          sx={{ 
            ml: 1,
            borderRadius: 1.5,
            bgcolor: theme => alpha(theme.palette.divider, 0.05),
            '&:hover': {
              bgcolor: theme => alpha(theme.palette.primary.main, 0.1)
            }
          }}
        >
          {isDarkMode ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Tooltip>
      
      <NotificationsMenu />
      
      <Divider orientation="vertical" flexItem sx={{ mx: 1.5, height: 24, alignSelf: 'center' }} />
      
      <UserMenu />
    </Box>
  );
};

export default ToolbarButtons; 