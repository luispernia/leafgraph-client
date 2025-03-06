import React from 'react';
import { 
  Container, 
  Grid
} from '@mui/material';

// Import subcomponents
import WelcomePanel from './dashboard/WelcomePanel';
import SidebarMenu from './dashboard/SidebarMenu';
import DatabaseHealth from './dashboard/DatabaseHealth';
import ServerInfo from './dashboard/ServerInfo';
import RecentActivity from './dashboard/RecentActivity';
import StatisticsSummary from './dashboard/StatisticsSummary';

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
          <WelcomePanel title={title} username={username} />
        </Grid>
        
        {/* Sidebar Menu */}
        <Grid item xs={12} md={3} lg={2}>
          <SidebarMenu />
        </Grid>
        
        {/* Main Content Area */}
        <Grid item xs={12} md={9} lg={10}>
          <Grid container spacing={3}>
            {/* Database Health Card */}
            <Grid item xs={12} md={4}>
              <DatabaseHealth databaseHealth={databaseHealth} />
            </Grid>
            
            {/* Server Information Card */}
            <Grid item xs={12} md={4}>
              <ServerInfo />
            </Grid>
            
            {/* Recent Activity Card */}
            <Grid item xs={12} md={4}>
              <RecentActivity activities={recentActivities} />
            </Grid>
            
            {/* Statistics Summary */}
            <Grid item xs={12}>
              <StatisticsSummary />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard; 