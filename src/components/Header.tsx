import { 
  AppBar, 
  Toolbar, 
  IconButton, 
  Box, 
  alpha, 
  useMediaQuery, 
  useTheme
} from '@mui/material';
import { 
  Menu as MenuIcon
} from '@mui/icons-material';

// Import modular components
import Logo from './header/Logo';
import SearchBar from './header/SearchBar';
import ToolbarButtons from './header/ToolbarButtons';

interface HeaderProps {
  title: string;
  onMenuToggle: () => void;
}

const Header = ({ 
  title, 
  onMenuToggle 
}: HeaderProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  return (
    <AppBar 
      position="fixed" 
      elevation={0}
      sx={{ 
        zIndex: theme => theme.zIndex.drawer + 1,
        bgcolor: theme => alpha(
          theme.palette.background.paper, 
          theme.palette.mode === 'dark' ? 0.8 : 0.95
        ),
        color: 'text.primary',
        boxShadow: theme => `0 2px 8px ${alpha(theme.palette.common.black, 0.05)}`,
        borderBottom: theme => `1px solid ${alpha(theme.palette.divider, 0.08)}`,
        backdropFilter: 'blur(8px)'
      }}
    >
      <Toolbar sx={{ height: 64 }}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={onMenuToggle}
          sx={{ 
            mr: 2,
            display: { xs: 'flex', md: 'none' },
            borderRadius: 1.5,
            '&:hover': {
              bgcolor: theme => alpha(theme.palette.primary.main, 0.1)
            }
          }}
        >
          <MenuIcon />
        </IconButton>
        
        <Logo title={title} />
        
        {!isMobile && <SearchBar />}
        
        <Box sx={{ flexGrow: 1 }} />
        
        <ToolbarButtons />
      </Toolbar>
    </AppBar>
  );
};

export default Header; 