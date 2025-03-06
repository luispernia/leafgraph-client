import React from 'react';
import {
  Paper,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Divider,
  Typography,
  Badge,
  Avatar,
  alpha,
  useTheme
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Storage,
  Settings,
  Dataset,
  TableView,
  Code,
  Security,
  ImportExport
} from '@mui/icons-material';

const SidebarMenu = () => {
  const theme = useTheme();
  
  return (
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
  );
};

export default SidebarMenu; 