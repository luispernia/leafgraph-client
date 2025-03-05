import React, { useState, ReactNode, SyntheticEvent } from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import Dashboard from '../components/Dashboard';

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`database-tabpanel-${index}`}
      aria-labelledby={`database-tab-${index}`}
      {...other}
      style={{ height: 'calc(100% - 48px)', overflow: 'auto' }}
    >
      {value === index && children}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `database-tab-${index}`,
    'aria-controls': `database-tabpanel-${index}`,
  };
}

const DashboardPage = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (_event: SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', backgroundColor: 'background.paper' }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          aria-label="database tabs"
          variant="scrollable"
          scrollButtons="auto"
          sx={{ minHeight: 48 }}
        >
          <Tab label="Database Overview" {...a11yProps(0)} />
          <Tab label="Tables & Structure" {...a11yProps(1)} />
          <Tab label="SQL Query Console" {...a11yProps(2)} />
          <Tab label="Import/Export" {...a11yProps(3)} />
          <Tab label="Users & Privileges" {...a11yProps(4)} />
        </Tabs>
      </Box>
      
      <TabPanel value={tabValue} index={0}>
        <Dashboard title="Database Overview" username="Admin" />
      </TabPanel>
      
      <TabPanel value={tabValue} index={1}>
        <Dashboard title="Tables & Structure" username="Admin" />
      </TabPanel>
      
      <TabPanel value={tabValue} index={2}>
        <Dashboard title="SQL Query Console" username="Admin" />
      </TabPanel>

      <TabPanel value={tabValue} index={3}>
        <Dashboard title="Import/Export Tools" username="Admin" />
      </TabPanel>

      <TabPanel value={tabValue} index={4}>
        <Dashboard title="Users & Privileges" username="Admin" />
      </TabPanel>
    </Box>
  );
};

export default DashboardPage; 