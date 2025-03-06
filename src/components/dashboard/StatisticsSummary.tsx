import React from 'react';
import {
  Paper,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  alpha,
  useTheme
} from '@mui/material';
import { BarChart } from '@mui/icons-material';

const StatisticsSummary = () => {
  const theme = useTheme();
  
  return (
    <Paper sx={{ 
      p: 3, 
      display: 'flex', 
      flexDirection: 'column',
      borderRadius: '12px',
      bgcolor: (theme) => alpha(theme.palette.primary.light, 0.05)
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <BarChart color="primary" sx={{ mr: 1 }} />
        <Typography component="h2" variant="h6" color="primary" fontWeight="bold">
          Database Statistics
        </Typography>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card variant="outlined" sx={{ 
            borderRadius: '10px',
            bgcolor: (theme) => alpha(theme.palette.background.paper, 0.8)
          }}>
            <CardContent>
              <Typography color="text.secondary" variant="subtitle2" gutterBottom fontWeight="500">
                Total Databases
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
                <Typography variant="h3" component="div" color="primary.dark" fontWeight="bold">
                  5
                </Typography>
                <Chip 
                  label="+1 new" 
                  size="small" 
                  color="success" 
                  sx={{ ml: 2, height: 20, fontSize: '0.7rem' }} 
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card variant="outlined" sx={{ 
            borderRadius: '10px',
            bgcolor: (theme) => alpha(theme.palette.background.paper, 0.8)
          }}>
            <CardContent>
              <Typography color="text.secondary" variant="subtitle2" gutterBottom fontWeight="500">
                Total Tables
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
                <Typography variant="h3" component="div" color="primary.dark" fontWeight="bold">
                  27
                </Typography>
                <Chip 
                  label="+3 new" 
                  size="small" 
                  color="success" 
                  sx={{ ml: 2, height: 20, fontSize: '0.7rem' }} 
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card variant="outlined" sx={{ 
            borderRadius: '10px',
            bgcolor: (theme) => alpha(theme.palette.background.paper, 0.8)
          }}>
            <CardContent>
              <Typography color="text.secondary" variant="subtitle2" gutterBottom fontWeight="500">
                Storage Used
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
                <Typography variant="h3" component="div" color="primary.dark" fontWeight="bold">
                  256 MB
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                  of 5 GB
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default StatisticsSummary; 