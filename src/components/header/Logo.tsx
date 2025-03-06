import { Box, Chip, useMediaQuery, useTheme } from '@mui/material';
import LeafGraphLogo from '../LeafGraphLogo';

interface LogoProps {
  title: string;
}

const Logo = ({ title }: LogoProps) => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        cursor: 'pointer',
        '&:hover': {
          '& .logo-text': {
            transform: 'translateY(-1px)'
          }
        }
      }}
    >
      <LeafGraphLogo variant="full" sx={{ fontSize: 28 }} />
      {!isSmall && (
        <Chip 
          label="BETA" 
          size="small"
          sx={{ 
            bgcolor: 'primary.main', 
            color: 'white', 
            fontWeight: 'bold',
            fontSize: '0.65rem',
            height: 20,
            ml: 1,
            '& .MuiChip-label': {
              px: 1
            }
          }}
        />
      )}
    </Box>
  );
};

export default Logo; 