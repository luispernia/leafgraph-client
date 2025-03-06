import React from 'react';
import {
  Box,
  Typography,
  LinearProgress,
  alpha
} from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import InfoCard from './InfoCard';

interface DatabaseHealthProps {
  databaseHealth: number;
}

const DatabaseHealth = ({ databaseHealth }: DatabaseHealthProps) => {
  return (
    <InfoCard 
      title="Database Health" 
      icon={<CheckCircle />}
      iconBgColor={databaseHealth > 80 ? 'success.main' : 'warning.main'}
    >
      <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 1 }}>
        <Typography variant="h3" component="div" color="primary.main" fontWeight="bold">
          {databaseHealth}%
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1, ml: 1 }}>
          Healthy
        </Typography>
      </Box>
      <LinearProgress 
        variant="determinate" 
        value={databaseHealth} 
        sx={{ 
          height: 8, 
          borderRadius: 4,
          mb: 2,
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
          '& .MuiLinearProgress-bar': {
            bgcolor: databaseHealth > 80 ? 'success.main' : 'warning.main'
          }
        }} 
      />
      <Typography variant="body2" color="text.secondary">
        Last check: Today, 10:45 AM
      </Typography>
    </InfoCard>
  );
};

export default DatabaseHealth; 