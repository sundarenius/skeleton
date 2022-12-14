import { styled } from '@mui/material/styles';
import type { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import MuiAppBar from '@mui/material/AppBar';
import {
  Toolbar,
  IconButton,
  Typography,
  Button,
  Box,
  Divider,
} from '@mui/material';
import {
  Menu,
  LightMode,
  DarkMode,
} from '@mui/icons-material';
import { useAppSelector, useAppDispatch } from 'redux/redux-hooks';
import { contextActions } from 'redux/actions';
import type { ThemeModes } from 'types/globals';
import MerchantDropdown from 'components/MerchantDropdown';
import AccountDropdown from 'components/AccountDropdown';

interface Props extends MuiAppBarProps {
  open?: boolean;
  drawerwidth: number
}

const AppBar = styled(MuiAppBar)<Props>(({ theme, open, drawerwidth }) => {
  const isBelowSm = window.IS_BELOW_SM;
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
      width: isBelowSm ? '100%' : `calc(100% - ${drawerwidth}px)`,
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
        {/* Persistent drawer */}
      </Typography>

      {!window.IS_BELOW_SM && (
      <>
        <Button
          className="mr-1"
          onClick={() => setThemeMode(themeMode === 'dark' ? 'light' : 'dark')}
          color="inherit"
        >
          { themeMode === 'dark' ? <LightMode /> : <DarkMode />}
        </Button>

        <Divider className="mr-3" orientation="vertical" flexItem />

        <Box className="mx-1">
          <MerchantDropdown />
        </Box>

        <AccountDropdown />
      </>
      )}

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
