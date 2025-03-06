import {
  Box,
  Typography,
  IconButton,
  Divider,
  useTheme as useMuiTheme,
  Grid,
  Paper
} from '@mui/material';
import {
  Brightness4,
  Brightness7
} from '@mui/icons-material';
import { useTheme } from '../../hooks/useTheme';

interface AppearanceTabProps {
  themePreferences: {
    primaryColor: string;
    accentColor: string;
    fontFamily: string;
    fontSize: string;
  };
}

const AppearanceTab = ({
  themePreferences
}: AppearanceTabProps) => {
  const muiTheme = useMuiTheme();
  const { isDarkMode, toggleTheme } = useTheme();
  
  const colorOptions = [
    { name: 'Blue', value: '#1976d2' },
    { name: 'Purple', value: '#9c27b0' },
    { name: 'Green', value: '#2e7d32' },
    { name: 'Orange', value: '#ed6c02' },
    { name: 'Red', value: '#d32f2f' }
  ];

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>Theme</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Typography sx={{ flexGrow: 1 }}>
              {isDarkMode ? "Dark Mode" : "Light Mode"}
            </Typography>
            <IconButton onClick={toggleTheme} color="primary">
              {isDarkMode ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </Box>
          
          <Divider sx={{ my: 3 }} />
          
          <Typography variant="h6" gutterBottom>Colors</Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Choose your preferred accent color
          </Typography>
          
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 4 }}>
            {colorOptions.map((color) => (
              <Paper
                key={color.name}
                elevation={0}
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  border: `2px solid ${
                    themePreferences.primaryColor === color.value 
                      ? muiTheme.palette.primary.main 
                      : 'transparent'
                  }`,
                  '&:hover': {
                    border: `2px solid ${muiTheme.palette.primary.light}`,
                  },
                  transition: 'all 0.2s'
                }}
              >
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    bgcolor: color.value,
                    mb: 1,
                    boxShadow: muiTheme.shadows[3]
                  }}
                />
                <Typography variant="caption">{color.name}</Typography>
              </Paper>
            ))}
          </Box>
          
          <Divider sx={{ my: 3 }} />
          
          <Typography variant="h6" gutterBottom>Typography</Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Select font family and size
          </Typography>
          
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            {['Roboto', 'Open Sans', 'Lato', 'Montserrat'].map((font) => (
              <Paper
                key={font}
                elevation={0}
                sx={{
                  px: 2,
                  py: 1.5,
                  borderRadius: 2,
                  cursor: 'pointer',
                  border: `2px solid ${
                    themePreferences.fontFamily === font 
                      ? muiTheme.palette.primary.main 
                      : 'transparent'
                  }`,
                  '&:hover': {
                    border: `2px solid ${muiTheme.palette.primary.light}`,
                  }
                }}
              >
                <Typography 
                  variant="body2" 
                  fontFamily={font}
                  fontWeight={themePreferences.fontFamily === font ? 'bold' : 'normal'}
                >
                  {font}
                </Typography>
              </Paper>
            ))}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default AppearanceTab; 