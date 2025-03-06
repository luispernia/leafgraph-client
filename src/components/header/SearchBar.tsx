import { Box, InputBase, alpha } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

const SearchBar = () => {
  return (
    <Box 
      sx={{ 
        ml: 4, 
        flexGrow: 1, 
        maxWidth: 400, 
        borderRadius: '12px',
        bgcolor: (theme) => alpha(theme.palette.divider, 0.08),
        display: 'flex',
        alignItems: 'center',
        p: 0.5,
        px: 2,
        transition: 'all 0.3s',
        '&:hover': {
          bgcolor: (theme) => alpha(theme.palette.divider, 0.15),
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
        }
      }}
    >
      <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />
      <InputBase
        placeholder="Search databases, tables..."
        inputProps={{ 'aria-label': 'search databases' }}
        sx={{ 
          fontSize: '0.875rem',
          color: 'text.primary',
          width: '100%',
          '& .MuiInputBase-input': {
            transition: 'all 0.2s',
            '&::placeholder': {
              transition: 'all 0.2s',
              opacity: 0.7
            },
            '&:focus::placeholder': {
              opacity: 0.5
            }
          }
        }}
      />
    </Box>
  );
};

export default SearchBar; 