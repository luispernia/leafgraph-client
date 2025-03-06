import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  alpha,
  useTheme
} from '@mui/material';
import { SvgIconComponent } from '@mui/icons-material';

interface InfoCardProps {
  title: string;
  icon: React.ReactNode;
  iconBgColor?: string;
  children: React.ReactNode;
}

const InfoCard = ({ title, icon, iconBgColor, children }: InfoCardProps) => {
  const theme = useTheme();
  
  return (
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
        title={title}
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
          <Avatar sx={{ bgcolor: iconBgColor || 'primary.main' }}>
            {icon}
          </Avatar>
        }
      />
      <CardContent sx={{ pt: 1, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {children}
      </CardContent>
    </Card>
  );
};

export default InfoCard; 