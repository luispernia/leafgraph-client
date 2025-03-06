import React from 'react';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography
} from '@mui/material';
import { ListAlt, NoteAdd } from '@mui/icons-material';
import InfoCard from './InfoCard';

interface Activity {
  id: number;
  action: string;
  table: string;
  time: string;
}

interface RecentActivityProps {
  activities: Activity[];
}

const RecentActivity = ({ activities }: RecentActivityProps) => {
  return (
    <InfoCard title="Recent Activity" icon={<ListAlt />} iconBgColor="secondary.main">
      <List dense sx={{ px: 0 }}>
        {activities.map((activity) => (
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
    </InfoCard>
  );
};

export default RecentActivity; 