import React from 'react';
import {
  Paper,
  Typography,
  Box,
  Chip,
  alpha,
  useTheme
} from '@mui/material';
import { CheckCircle } from '@mui/icons-material';

interface WelcomePanelProps {
  title: string;
  username: string;
}

const WelcomePanel = ({ title, username }: WelcomePanelProps) => {
  const theme = useTheme();
  
  return (
    <Paper 
      sx={{ 
        p: { xs: 2, md: 3 }, 
        display: 'flex', 
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: { sm: 'center' },
        justifyContent: 'space-between',
        background: (theme) => `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
        color: 'white',
        borderRadius: '12px',
        boxShadow: (theme) => `0 10px 15px -3px ${alpha(theme.palette.primary.main, 0.2)}`
      }}
    >
      <Box>
        <Typography component="h1" variant="h4" gutterBottom fontWeight="bold">
          {title}
        </Typography>
        <Typography variant="h6" sx={{ opacity: 0.9 }}>
          Welcome back, {username}! Manage your databases with ease.
        </Typography>
      </Box>
      <Box sx={{ mt: { xs: 3, sm: 0 } }}>
        <Chip 
          icon={<CheckCircle />} 
          label="All Systems Operational" 
          sx={{ 
            bgcolor: 'success.main', 
            color: 'white',
            fontWeight: 'bold',
            '& .MuiChip-icon': { color: 'white' }
          }} 
        />
      </Box>
    </Paper>
  );
};

export default WelcomePanel; 