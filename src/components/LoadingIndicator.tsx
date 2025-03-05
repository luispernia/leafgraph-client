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
        minHeight: '100vh',
        p: 3
      }}
    >
      <CircularProgress size={60} thickness={4} />
      {message && (
        <Typography 
          variant="h6" 
          sx={{ mt: 3, fontWeight: 500, color: 'text.secondary' }}
        >
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default LoadingIndicator; 