import React from 'react';
import {
  Box,
  Tabs,
  Tab,
  Button,
  alpha,
  useTheme
} from '@mui/material';
import {
  ModeEdit,
  Save
} from '@mui/icons-material';

interface ProfileTabsProps {
  tabValue: number;
  editMode: boolean;
  handleTabChange: (event: React.SyntheticEvent, newValue: number) => void;
  handleEditToggle: () => void;
}

const ProfileTabs = ({ 
  tabValue, 
  editMode, 
  handleTabChange, 
  handleEditToggle 
}: ProfileTabsProps) => {
  const theme = useTheme();

  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider', px: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: 1 }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          aria-label="profile settings tabs"
          sx={{
            '& .MuiTabs-indicator': {
              height: 3,
              borderRadius: '3px 3px 0 0'
            }
          }}
        >
          <Tab label="Profile" id="profile-tab-0" aria-controls="profile-tabpanel-0" />
          <Tab label="Appearance" id="profile-tab-1" aria-controls="profile-tabpanel-1" />
          <Tab label="Notifications" id="profile-tab-2" aria-controls="profile-tabpanel-2" />
        </Tabs>
        <Button
          variant={editMode ? "contained" : "outlined"}
          startIcon={editMode ? <Save /> : <ModeEdit />}
          onClick={handleEditToggle}
        >
          {editMode ? "Save" : "Edit"}
        </Button>
      </Box>
    </Box>
  );
};

export default ProfileTabs; 