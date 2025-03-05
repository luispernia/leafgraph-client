import React, { useState } from 'react';
import { 
  Box, 
  Tabs, 
  Tab, 
  Typography, 
  Container, 
  Paper,
  alpha,
  Divider,
  IconButton,
  Tooltip,
  Breadcrumbs,
  Link,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { 
  Storage, 
  Sync, 
  Add, 
  Home, 
  NavigateNext,
  History,
  ShowChart,
  DataUsage
} from '@mui/icons-material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`dashboard-tabpanel-${index}`}
      aria-labelledby={`dashboard-tab-${index}`}
      {...other}
      className="fade-in"
    >
      {value === index && <Box sx={{ p: { xs: 2, md: 3 } }}>{children}</Box>}
    </div>
  );
};

const a11yProps = (index: number) => {
  return {
    id: `dashboard-tab-${index}`,
    'aria-controls': `dashboard-tabpanel-${index}`,
  };
};

const DashboardPage = () => {
  const [value, setValue] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 2, mb: 4, px: { xs: 1, sm: 3 } }} className="fade-in">
      {/* Breadcrumbs Navigation */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Breadcrumbs 
          separator={<NavigateNext fontSize="small" />} 
          aria-label="breadcrumb"
          sx={{ 
            '& .MuiBreadcrumbs-ol': { 
              flexWrap: 'nowrap' 
            },
            '& .MuiBreadcrumbs-li': {
              whiteSpace: 'nowrap'
            }
          }}
        >
          <Link
            underline="hover"
            color="primary"
            href="/"
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <Home sx={{ mr: 0.5 }} fontSize="small" />
            Home
          </Link>
          <Link
            underline="hover"
            color="text.primary"
            href="/dashboard"
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <Storage sx={{ mr: 0.5 }} fontSize="small" />
            {!isMobile && 'Dashboard'}
          </Link>
          <Typography color="text.primary" sx={{ display: 'flex', alignItems: 'center' }}>
            {value === 0 && 'Database Overview'}
            {value === 1 && 'Status'}
            {value === 2 && 'Performance'}
          </Typography>
        </Breadcrumbs>
        
        <Box>
          <Tooltip title="Refresh Data">
            <IconButton size="small" sx={{ ml: 1 }} color="primary">
              <Sync />
            </IconButton>
          </Tooltip>
          <Tooltip title="Add Database">
            <IconButton 
              size="small" 
              sx={{ 
                ml: 1, 
                bgcolor: 'primary.main', 
                color: 'white',
                '&:hover': {
                  bgcolor: 'primary.dark',
                }
              }}
            >
              <Add />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      
      <Paper 
        elevation={0} 
        sx={{ 
          borderRadius: '12px',
          overflow: 'hidden',
          border: (theme) => `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          mb: 4
        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={value} 
            onChange={handleChange} 
            aria-label="dashboard tabs"
            variant={isMobile ? "scrollable" : "fullWidth"}
            scrollButtons={isMobile ? "auto" : false}
            sx={{
              '& .MuiTabs-indicator': {
                height: 3,
                borderTopLeftRadius: 3,
                borderTopRightRadius: 3
              },
              '& .MuiTab-root': {
                minHeight: 56,
                fontWeight: 500,
                transition: 'all 0.2s',
                '&:hover': {
                  color: 'primary.main',
                  bgcolor: (theme) => alpha(theme.palette.primary.main, 0.05)
                }
              },
              '& .Mui-selected': {
                fontWeight: 700
              }
            }}
          >
            <Tab 
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Storage sx={{ mr: 1 }} />
                  <span>Database Overview</span>
                </Box>
              } 
              {...a11yProps(0)} 
            />
            <Tab 
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <History sx={{ mr: 1 }} />
                  <span>Status</span>
                </Box>
              } 
              {...a11yProps(1)} 
            />
            <Tab 
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <ShowChart sx={{ mr: 1 }} />
                  <span>Performance</span>
                </Box>
              } 
              {...a11yProps(2)} 
            />
          </Tabs>
        </Box>
        
        <TabPanel value={value} index={0}>
          <Box sx={{ p: 0 }}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" component="h2" gutterBottom fontWeight="bold">
                Database Overview
              </Typography>
              <Typography variant="body2" color="text.secondary">
                View and manage all your databases in one place. Monitor performance, check status, and access quick actions.
              </Typography>
            </Box>
            
            <Divider sx={{ mb: 3 }} />
            
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                p: 3, 
                borderRadius: '8px',
                bgcolor: (theme) => alpha(theme.palette.info.light, 0.1),
                border: (theme) => `1px solid ${alpha(theme.palette.info.main, 0.3)}`,
                mb: 3
              }}
            >
              <DataUsage color="info" sx={{ fontSize: 40, mr: 2 }} />
              <Box>
                <Typography fontWeight="bold">
                  Database Overview dashboard provides real-time insights
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Monitor performance metrics, review recent queries, and manage your data efficiently.
                </Typography>
              </Box>
            </Box>
            
            <Typography paragraph>
              This interface connects to your database and provides all the tools you need to manage it effectively.
              Use the tabs above to navigate between different views and functionality.
            </Typography>
            <Typography paragraph>
              • View database statistics and metrics<br />
              • Monitor server performance in real-time<br />
              • Execute and optimize SQL queries<br />
              • Manage tables, views, and stored procedures
            </Typography>
          </Box>
        </TabPanel>
        
        <TabPanel value={value} index={1}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h5" component="h2" gutterBottom fontWeight="bold">
              Database Status
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Monitor the real-time status of your database servers, connections, and services.
            </Typography>
          </Box>
          
          <Divider sx={{ mb: 3 }} />
          
          <Typography paragraph>
            This panel provides detailed information about your database server status,
            active connections, running processes, and more. 
          </Typography>
          <Typography paragraph>
            Real-time monitoring tools allow you to quickly identify and resolve issues
            before they impact your applications and users.
          </Typography>
        </TabPanel>
        
        <TabPanel value={value} index={2}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h5" component="h2" gutterBottom fontWeight="bold">
              Performance Metrics
            </Typography>
            <Typography variant="body2" color="text.secondary">
              View detailed metrics and analytics about your database performance over time.
            </Typography>
          </Box>
          
          <Divider sx={{ mb: 3 }} />
          
          <Typography paragraph>
            The performance dashboard provides insights into query execution times,
            resource utilization, cache efficiency, and other critical performance indicators.
          </Typography>
          <Typography paragraph>
            Use these metrics to optimize your database operations, improve application
            performance, and identify opportunities for scaling your infrastructure.
          </Typography>
        </TabPanel>
      </Paper>
    </Container>
  );
};

export default DashboardPage; 