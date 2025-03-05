import React from 'react';
import { SvgIcon, SvgIconProps, Box } from '@mui/material';
import { Spa as LeafIcon } from '@mui/icons-material';

interface LeafGraphLogoProps extends SvgIconProps {
  variant?: 'icon' | 'full';
  showText?: boolean;
  textColor?: string;
}

const LeafGraphLogo = ({
  variant = 'full',
  showText = true,
  textColor = 'inherit',
  ...props
}: LeafGraphLogoProps) => {
  return (
    <Box sx={{ 
      display: 'flex', 
      alignItems: 'center',
      gap: 1
    }}>
      <SvgIcon
        {...props}
        sx={{
          fontSize: props.fontSize || 28,
          color: props.color || 'primary.main',
          filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))',
          animation: 'pulse 2s infinite ease-in-out',
          '@keyframes pulse': {
            '0%': { transform: 'scale(1)' },
            '50%': { transform: 'scale(1.05)' },
            '100%': { transform: 'scale(1)' }
          },
          ...props.sx
        }}
      >
        <LeafIcon />
      </SvgIcon>
      
      {variant === 'full' && showText && (
        <Box
          component="span"
          sx={{
            fontWeight: 'bold',
            fontSize: props.fontSize ? `calc(${props.fontSize}px * 0.9)` : '1.25rem',
            color: textColor,
            fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
            letterSpacing: '0.01em',
            display: 'flex',
            alignItems: 'center',
            background: (theme) => `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          Leaf<Box component="span" sx={{ fontWeight: 800 }}>Graph</Box>
        </Box>
      )}
    </Box>
  );
};

export default LeafGraphLogo; 