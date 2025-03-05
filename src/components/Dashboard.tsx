import React from 'react';
import { 
  Container, 
  Grid, 
  Paper, 
  Typography, 
  Box, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Divider,
  ListItemButton,
  Card,
  CardContent,
  CardHeader,
  alpha,
  Chip,
  LinearProgress,
  Badge,
  Avatar
} from '@mui/material';
import { 
  Dashboard as DashboardIcon, 
  Storage, 
  Settings,
  Dataset,
  TableView,
  Code,
  Security,
  BarChart,
  ImportExport,
  CheckCircle,
  NoteAdd,
  ListAlt
} from '@mui/icons-material';

interface DashboardProps {
  title: string;
  username?: string;
}

const Dashboard = ({ title, username = 'User' }: DashboardProps) => {
  // Mock data for the dashboard visualizations
  const databaseHealth = 92;
  const recentActivities = [
    { id: 1, action: 'Table created', table: 'users', time: '10 min ago' },
    { id: 2, action: 'Query executed', table: 'orders', time: '25 min ago' },
    { id: 3, action: 'Row inserted', table: 'products', time: '45 min ago' }
  ];

  return (
    <Container maxWidth="xl" sx={{ mt: 2, mb: 4, px: { xs: 1, sm: 3 } }} className="fade-in">
      <Grid container spacing={3}>
        {/* Welcome Panel */}
        <Grid item xs={12}>
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
        </Grid>
        
        {/* Sidebar Menu */}
        <Grid item xs={12} md={3} lg={2}>
          <Paper sx={{ p: 0, display: 'flex', flexDirection: 'column', height: '100%', borderRadius: '12px', overflow: 'hidden' }}>
            <Box sx={{ 
              p: 2, 
              bgcolor: 'background.paper',
              borderBottom: (theme) => `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}>
              <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                <Storage sx={{ fontSize: 18 }} />
              </Avatar>
              <Typography component="h2" variant="subtitle1" color="primary" fontWeight="bold">
                Database Controls
              </Typography>
            </Box>
            
            <List component="nav" sx={{ flexGrow: 1, py: 0 }}>
              <ListItem disablePadding>
                <ListItemButton selected sx={{ borderLeft: (theme) => `4px solid ${theme.palette.primary.main}` }}>
                  <ListItemIcon>
                    <DashboardIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary={<Typography fontWeight={500}>Dashboard</Typography>} 
                    secondary="Overview" 
                  />
                </ListItemButton>
              </ListItem>
              
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Dataset />
                  </ListItemIcon>
                  <ListItemText 
                    primary={<Typography>Databases</Typography>} 
                    secondary="Manage" 
                  />
                  <Badge badgeContent={5} color="primary" sx={{ mr: 1 }} />
                </ListItemButton>
              </ListItem>
              
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <TableView />
                  </ListItemIcon>
                  <ListItemText 
                    primary={<Typography>Tables</Typography>} 
                    secondary="View & Edit" 
                  />
                </ListItemButton>
              </ListItem>
              
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Code />
                  </ListItemIcon>
                  <ListItemText 
                    primary={<Typography>SQL</Typography>} 
                    secondary="Run Queries" 
                  />
                </ListItemButton>
              </ListItem>
              
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <ImportExport />
                  </ListItemIcon>
                  <ListItemText 
                    primary={<Typography>Import/Export</Typography>} 
                    secondary="Data Transfer" 
                  />
                </ListItemButton>
              </ListItem>
              
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Security />
                  </ListItemIcon>
                  <ListItemText 
                    primary={<Typography>Security</Typography>} 
                    secondary="Permissions" 
                  />
                </ListItemButton>
              </ListItem>
              
              <Divider sx={{ my: 1 }} />
              
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Settings />
                  </ListItemIcon>
                  <ListItemText 
                    primary={<Typography>Settings</Typography>} 
                    secondary="Configure" 
                  />
                </ListItemButton>
              </ListItem>
            </List>
          </Paper>
        </Grid>
        
        {/* Main Content Area */}
        <Grid item xs={12} md={9} lg={10}>
          <Grid container spacing={3}>
            {/* Database Health Card */}
            <Grid item xs={12} md={4}>
              <Card sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                borderRadius: '12px',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: (theme) => `0 10px 15px -3px ${alpha(theme.palette.primary.main, 0.1)}`
                }
              }}>
                <CardHeader
                  title="Database Health"
                  titleTypographyProps={{ variant: 'h6', fontWeight: 'bold' }}
                  sx={{ 
                    pb: 0,
                    '& .MuiCardHeader-title': { 
                      fontSize: '1.1rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1
                    }
                  }}
                  avatar={
                    <Avatar sx={{ bgcolor: databaseHealth > 80 ? 'success.main' : 'warning.main' }}>
                      <CheckCircle />
                    </Avatar>
                  }
                />
                <CardContent sx={{ pt: 1, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
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
                </CardContent>
              </Card>
            </Grid>
            
            {/* Server Information Card */}
            <Grid item xs={12} md={4}>
              <Card sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                borderRadius: '12px',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: (theme) => `0 10px 15px -3px ${alpha(theme.palette.primary.main, 0.1)}`
                }
              }}>
                <CardHeader
                  title="Server Information"
                  titleTypographyProps={{ variant: 'h6', fontWeight: 'bold' }}
                  sx={{ 
                    pb: 0,
                    '& .MuiCardHeader-title': { 
                      fontSize: '1.1rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1
                    }
                  }}
                  avatar={
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      <Storage />
                    </Avatar>
                  }
                />
                <CardContent sx={{ pt: 1, flexGrow: 1 }}>
                  <Typography variant="body2" component="p" paragraph sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between' 
                  }}>
                    <span style={{ fontWeight: 500 }}>Server:</span>
                    <span>MySQL 8.0.28</span>
                  </Typography>
                  <Typography variant="body2" component="p" paragraph sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between'
                  }}>
                    <span style={{ fontWeight: 500 }}>Connection:</span>
                    <span>localhost:3306</span>
                  </Typography>
                  <Typography variant="body2" component="p" paragraph sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between'
                  }}>
                    <span style={{ fontWeight: 500 }}>Character Set:</span>
                    <span>UTF-8 (utf8mb4)</span>
                  </Typography>
                  <Typography variant="body2" component="p" sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between'
                  }}>
                    <span style={{ fontWeight: 500 }}>PHP Version:</span>
                    <span>8.1.6</span>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            {/* Recent Activity Card */}
            <Grid item xs={12} md={4}>
              <Card sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                borderRadius: '12px',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: (theme) => `0 10px 15px -3px ${alpha(theme.palette.primary.main, 0.1)}`
                }
              }}>
                <CardHeader
                  title="Recent Activity"
                  titleTypographyProps={{ variant: 'h6', fontWeight: 'bold' }}
                  sx={{ 
                    pb: 0,
                    '& .MuiCardHeader-title': { 
                      fontSize: '1.1rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1
                    }
                  }}
                  avatar={
                    <Avatar sx={{ bgcolor: 'secondary.main' }}>
                      <ListAlt />
                    </Avatar>
                  }
                />
                <CardContent sx={{ pt: 1, flexGrow: 1 }}>
                  <List dense sx={{ px: 0 }}>
                    {recentActivities.map((activity) => (
                      <ListItem key={activity.id} sx={{ px: 0, py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          <NoteAdd fontSize="small" color="action" />
                        </ListItemIcon>
                        <ListItemText
                          primary={activity.action}
                          secondary={`Table: ${activity.table}`}
                          primaryTypographyProps={{ variant: 'body2', fontWeight: 500 }}
                          secondaryTypographyProps={{ variant: 'caption' }}
                        />
                        <Typography variant="caption" color="text.secondary">
                          {activity.time}
                        </Typography>
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
            
            {/* Statistics Summary */}
            <Grid item xs={12}>
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
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard; 