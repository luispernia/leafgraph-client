import { Drawer, useTheme } from '@mui/material';
import DrawerContent from './DrawerContent';
import DrawerContentWrapper from './DrawerContentWrapper';
import { DRAWER_WIDTH } from '../utils/constants';

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
}

interface MenuItem {
  text: string;
  icon: React.ReactNode;
  page: string;
}

interface AppDrawerProps {
  open: boolean;
  isMobile: boolean;
  user: User | null;
  currentPage: string;
  menuItems: MenuItem[];
  darkMode: boolean;
  handleDrawerToggle: () => void;
  handleThemeToggle: () => void;
  navigateTo: (page: string) => void;
  getUserInitial: () => string;
}

const AppDrawer = ({
  open,
  isMobile,
  user,
  currentPage,
  menuItems,
  darkMode,
  handleDrawerToggle,
  handleThemeToggle,
  navigateTo,
  getUserInitial
}: AppDrawerProps) => {
  const theme = useTheme();

  const drawerContent = (
    <DrawerContentWrapper open={open}>
      <DrawerContent
        user={user}
        currentPage={currentPage}
        menuItems={menuItems}
        navigateTo={navigateTo}
        darkMode={darkMode}
        handleThemeToggle={handleThemeToggle}
        getUserInitial={getUserInitial}
      />
    </DrawerContentWrapper>
  );

  // Render mobile drawer
  if (isMobile) {
    return (
      <Drawer
        variant="temporary"
        open={open}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            top: '64px',
            height: 'calc(100% - 64px)',
            pt: 2,
            transition: theme => theme.transitions.create(['width', 'transform'], {
              easing: theme.transitions.easing.easeOut,
              duration: theme.transitions.duration.enteringScreen,
            }),
          },
        }}
      >
        {drawerContent}
      </Drawer>
    );
  }

  // Render desktop drawer
  return (
    <Drawer
      variant="persistent"
      open={open}
      sx={{
        width: open ? DRAWER_WIDTH : 0,
        flexShrink: 0,
        transition: theme => theme.transitions.create('width', {
          easing: theme.transitions.easing.easeInOut,
          duration: theme.transitions.duration.standard,
        }),
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
          top: '64px',
          height: 'calc(100% - 64px)',
          pt: 2,
          transform: open ? 'translateX(0)' : `translateX(-${DRAWER_WIDTH}px)`,
          visibility: open ? 'visible' : 'hidden',
          transition: theme => theme.transitions.create(['transform', 'visibility'], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.standard,
          }),
        },
      }}
    >
      {drawerContent}
    </Drawer>
  );
};

export default AppDrawer; 