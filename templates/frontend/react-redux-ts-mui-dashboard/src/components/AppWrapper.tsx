/* eslint-disable @typescript-eslint/naming-convention */
import { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import {
  Box,
  CssBaseline,
  IconButton,
} from '@mui/material';
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from '@mui/icons-material';
import Header from './Header';
import Sidebar from 'components/Sidebar';

const drawerwidth = 240;

const MainContent = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(2.5),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: window.IS_BELOW_SM ? '0' : `-${drawerwidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const SpaceFromHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const AppWrapper = ({ children }) => {
  const theme = useTheme();
  const [open, setOpen] = useState(!window.IS_BELOW_SM);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <Header drawerwidth={drawerwidth} position="fixed" open={open} handleDrawerOpen={handleDrawerOpen} />

      <Sidebar drawerwidth={drawerwidth} open={open} handleDrawerClose={handleDrawerClose}>
        <SideBarHeader theme={theme} handleDrawerClose={handleDrawerClose} />
      </Sidebar>

      <MainContent open={open}>
        <SpaceFromHeader />
        { children }
      </MainContent>

    </Box>
  );
};

const SideBarHeader = ({ theme, handleDrawerClose }) => (
  <SpaceFromHeader>
    <div style={{
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
    }}
    >
      <p>LH price opimisation</p>
      <IconButton onClick={handleDrawerClose}>
        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      </IconButton>
    </div>
  </SpaceFromHeader>
);

export default AppWrapper;
