import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

interface LoadingIndicatorProps {
  message?: string;
}

/**
 * A simple loading indicator component that displays a spinner and optional message
 */
const LoadingIndicator = ({ message = 'Loading...' }: LoadingIndicatorProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100vh',
        p: 3,
        zIndex: 9999,
        margin: 0
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <CircularProgress size={60} thickness={4} />
        {message && (
          <Typography 
            variant="h6" 
            sx={{ mt: 3, fontWeight: 500, color: 'text.secondary', textAlign: 'center' }}
          >
            {message}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default LoadingIndicator; 