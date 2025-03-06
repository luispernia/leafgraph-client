import { styled } from '@mui/material';
import { ReactNode } from 'react';
import { DRAWER_WIDTH } from '../utils/constants';

// Remove redundant DRAWER_WIDTH definition since we're importing it
// const DRAWER_WIDTH = 260;

interface MainContentProps {
  open: boolean;
  isMobile: boolean;
  children: ReactNode;
}

// Styled component for the main content
const StyledMain = styled('main', { shouldForwardProp: (prop) => prop !== 'open' && prop !== 'isMobile' })<{
  open?: boolean;
  isMobile?: boolean;
}>(({ theme, open, isMobile }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  paddingTop: theme.spacing(2),
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.standard,
  }),
  ...(isMobile ? {
    // Mobile styles - always full width
    marginLeft: 0,
    width: '100%',
  } : {
    // Desktop styles - adjust based on drawer state
    width: `calc(100%)`,
    ...(open && {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.standard,
      }),
    }),
  })
}));

const MainContent = ({ open, isMobile, children }: MainContentProps) => {
  return (
    <StyledMain open={open} isMobile={isMobile}>
      {children}
    </StyledMain>
  );
};

export default MainContent; 