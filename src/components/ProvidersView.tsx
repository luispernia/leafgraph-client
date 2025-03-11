import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  Button,
  useTheme,
  alpha
} from '@mui/material';
import { Storage as DatabaseIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Define provider types with their properties
const databaseProviders = [
  {
    id: 'mongodb',
    name: 'MongoDB',
    description: 'NoSQL database that provides high performance, high availability, and easy scalability',
    color: '#4DB33D', // MongoDB green
    logoPath: '/mongodb-logo.png' // Path to logo if available
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    description: 'Powerful, open source object-relational database system with a strong reputation for reliability',
    color: '#336791', // PostgreSQL blue
    logoPath: '/postgresql-logo.png' // Path to logo if available
  }
];

const ProvidersView: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleProviderSelect = (providerId: string) => {
    // Navigate to the connection setup page with the selected provider
    navigate(`/connections?provider=${providerId}`);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to LeafGraph
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph>
          Select a database provider to get started
        </Typography>
      </Box>

      <Grid container spacing={4} justifyContent="center">
        {databaseProviders.map((provider) => (
          <Grid item xs={12} md={6} key={provider.id}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderTop: `4px solid ${provider.color}`,
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: theme.shadows[6],
                  cursor: 'pointer'
                }
              }}
              onClick={() => handleProviderSelect(provider.id)}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                {provider.logoPath ? (
                  <Box
                    component="img"
                    src={provider.logoPath}
                    alt={`${provider.name} logo`}
                    sx={{ width: 40, height: 40, mr: 2 }}
                  />
                ) : (
                  <DatabaseIcon
                    sx={{
                      fontSize: 40,
                      mr: 2,
                      color: provider.color
                    }}
                  />
                )}
                <Typography variant="h5" component="h2">
                  {provider.name}
                </Typography>
              </Box>
              
              <Typography variant="body1" paragraph sx={{ flexGrow: 1 }}>
                {provider.description}
              </Typography>
              
              <Button
                variant="contained"
                size="large"
                fullWidth
                sx={{
                  mt: 2,
                  bgcolor: provider.color,
                  '&:hover': {
                    bgcolor: alpha(provider.color, 0.8)
                  }
                }}
              >
                Connect
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProvidersView; 