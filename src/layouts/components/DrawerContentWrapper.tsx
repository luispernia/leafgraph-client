import { Box, useTheme } from '@mui/material';
import { ReactNode } from 'react';

interface DrawerContentWrapperProps {
  children: ReactNode;
  open: boolean;
}

/**
 * Wrapper component for drawer content that handles smooth fade transitions
 * This ensures content fades before the drawer closes, preventing content flash
 */
const DrawerContentWrapper = ({ children, open }: DrawerContentWrapperProps) => {
  const theme = useTheme();
  
  return (
    <Box
      sx={{
        opacity: open ? 1 : 0,
        visibility: open ? 'visible' : 'hidden',
        transition: theme => theme.transitions.create(
          ['opacity', 'visibility'],
          {
            duration: theme.transitions.duration[open ? 'enteringScreen' : 'leavingScreen'],
            easing: theme.transitions.easing[open ? 'easeOut' : 'sharp'],
            // Make visibility change only after opacity animation completes when closing
            delay: !open && theme.transitions.duration.leavingScreen / 2 > 0 
              ? theme.transitions.duration.leavingScreen / 2 
              : 0,
          }
        ),
      }}
    >
      {children}
    </Box>
  );
};

export default DrawerContentWrapper; 