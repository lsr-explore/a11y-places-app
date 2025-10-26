import AccessibleIcon from '@mui/icons-material/Accessible';
import BlockIcon from '@mui/icons-material/Block';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import type React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SkipLink from './SkipLink';

const drawerWidth = 240;

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const drawer = (
    <Box>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          A11y Places
        </Typography>
      </Toolbar>
      <List>
        <ListItem key="Home" disablePadding>
          <ListItemButton
            onClick={() => {
              navigate('/');
              setDrawerOpen(false);
            }}
            aria-label="Navigate to Home"
          >
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <Box sx={{ px: 2, py: 1 }}>
        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 'bold' }}>
          Accessible Versions
        </Typography>
      </Box>
      <List>
        <ListItem key="Places (Accessible)" disablePadding>
          <ListItemButton
            onClick={() => {
              navigate('/places');
              setDrawerOpen(false);
            }}
            aria-label="Navigate to Places (Accessible)"
          >
            <ListItemIcon>
              <AccessibleIcon />
            </ListItemIcon>
            <ListItemText primary="Places" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <Box sx={{ px: 2, py: 1 }}>
        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 'bold' }}>
          Inaccessible Versions (For Workshop)
        </Typography>
      </Box>
      <List>
        <ListItem key="Places (Inaccessible)" disablePadding>
          <ListItemButton
            onClick={() => {
              navigate('/places-inaccessible');
              setDrawerOpen(false);
            }}
            aria-label="Navigate to Places (Inaccessible)"
          >
            <ListItemIcon>
              <BlockIcon />
            </ListItemIcon>
            <ListItemText primary="Places" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <SkipLink href="#main-content">Skip to main content</SkipLink>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="toggle navigation menu"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            A11y Places Workshop
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: '100%',
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
