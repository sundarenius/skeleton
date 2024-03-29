import type { FC, ReactNode } from 'react';
import {
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { sideBarNav } from 'router/routes-data';
import { PostMessageEvents } from 'types/globals';

interface Props {
  drawerwidth,
  open,
  handleDrawerClose,
  children: ReactNode,
}

const Sidebar:FC<Props> = ({
  drawerwidth,
  open,
  handleDrawerClose,
  children,
}): JSX.Element => {
  const navTo = (path: string) => {
    window.postMessage({
      eventType: PostMessageEvents.ROUTE_NAVIGATE,
      path: `${path}${window.location.search}`,
    }, '*');
    if (window.IS_BELOW_SM) handleDrawerClose();
  };

  return (
    <Drawer
      sx={{
        width: drawerwidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerwidth,
          boxSizing: 'border-box',
        },
      }}
      variant={window.IS_BELOW_SM ? 'temporary' : 'persistent'}
      anchor="left"
      // open={window.IS_BELOW_SM ? !open : open}
      open={open}
    >
      { children }
      <Divider />
      {
        sideBarNav.map((section: any) => (
          <div key={section.name}>
            <List>
              <p>{section.name}</p>
              {
                section.navs.map((nav: any) => (
                  <ListItem key={nav.path} disablePadding onClick={() => navTo(nav.path)}>
                    <ListItemButton>
                      <ListItemIcon><nav.icon /></ListItemIcon>
                      <ListItemText primary={nav.name} />
                    </ListItemButton>
                  </ListItem>
                ))
              }
            </List>
            <Divider />
          </div>
        ))
      }
    </Drawer>
  );
};

export default Sidebar;
