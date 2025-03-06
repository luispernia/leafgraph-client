import React from 'react';
import {
  Typography
} from '@mui/material';
import { Storage } from '@mui/icons-material';
import InfoCard from './InfoCard';

const ServerInfo = () => {
  return (
    <InfoCard title="Server Information" icon={<Storage />}>
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
    </InfoCard>
  );
};

export default ServerInfo; 