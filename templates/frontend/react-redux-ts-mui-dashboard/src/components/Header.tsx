import { styled } from '@mui/material/styles';
import type { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import MuiAppBar from '@mui/material/AppBar';
import {
  Toolbar,
  IconButton,
  Typography,
  Button,
} from '@mui/material';
import {
  Menu,
  LightMode,
  DarkMode,
} from '@mui/icons-material';
import { useAppSelector, useAppDispatch } from 'redux/redux-hooks';
import { contextActions } from 'redux/actions';
import { ThemeModes } from 'types/globals';

interface Props extends MuiAppBarProps {
  open?: boolean;
  drawerwidth: number
}

const AppBar = styled(MuiAppBar)<Props>(({ theme, open, drawerwidth }) => {
  const isBelowSm = window.innerWidth <= theme.breakpoints.values.sm;
  return {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundImage: 'none',
    height: isBelowSm ? '56px' : '64px',
    display: 'flex',
    justifyContent: 'center',
    padding: '0 30px',
    ...(open && {
      width: `calc(100% - ${drawerwidth}px)`,
      marginLeft: `${drawerwidth}px`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  };
});

const HeaderContent = ({
  handleDrawerOpen,
  open,
}) => {
  const dispatch = useAppDispatch();
  const themeMode = useAppSelector(({ context }) => context.themeMode);
  const setThemeMode = (mode: ThemeModes) => {
    dispatch(contextActions.setThemeMode(mode));
  };

  return (
    <Toolbar>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerOpen}
        edge="start"
        sx={{ mr: 2, ...(open && { display: 'none' }) }}
      >
        <Menu />
      </IconButton>
      <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
        Persistent drawer
      </Typography>

      <Button
        onClick={() => setThemeMode(themeMode === 'dark' ? 'light' : 'dark')}
        color="inherit"
      >
        { themeMode === 'dark' ? <LightMode /> : <DarkMode />}
      </Button>
    </Toolbar>
  );
};

export default ({
  handleDrawerOpen,
  open,
  position,
  drawerwidth,
}) => (
  <AppBar drawerwidth={drawerwidth} position={position} open={open}>
    <HeaderContent open={open} handleDrawerOpen={handleDrawerOpen} />
  </AppBar>
);
