import React, { useState } from 'react';
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  AccountBalance as AccountBalanceIcon,
  Receipt as ReceiptIcon,
  Assessment as AssessmentIcon,
  CompareArrows as CompareArrowsIcon,
  AccountTree as AccountTreeIcon, // Added for Chart of Accounts
  Book as BookIcon, // Added for Journal Entries
  Chat as ChatIcon, // Added for AI Chat
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import SimpleFiLogo from '../assets/SimpleFiLogo.png';
import ChatBubble from './ChatBubble';

const drawerWidth = 240;

interface LayoutProps {
  children: React.ReactNode;
}

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
  { text: 'Accounts Payable', icon: <ReceiptIcon />, path: '/accounts-payable' },
  { text: 'Accounts Receivable', icon: <AccountBalanceIcon />, path: '/accounts-receivable' },
  { text: 'Bank Reconciliation', icon: <CompareArrowsIcon />, path: '/bank-reconciliation' },
  { text: 'Reports', icon: <AssessmentIcon />, path: '/reports' },
  { text: 'Chart of Accounts', icon: <AccountTreeIcon />, path: '/chart-of-accounts' }, 
  { text: 'Journal Entries', icon: <BookIcon />, path: '/journal-entries' },
  { text: 'Chat', icon: <ChatIcon />, path: '/ai-chat' },
];

export default function Layout({ children }: LayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          SimpleFi
        </Typography>
        <Box // Wrap the img tag with Box
          sx={{
            position: 'absolute', 
            top: 10, 
            left: 10, 
            width: 150, 
            height: 'auto',
            zIndex: 1, 
          }}
        >
          <img
            src={SimpleFiLogo} 
            alt="SimpleFi Logo"
            style={{ 
              maxWidth: '100%',
              height: 'auto',
              display: 'block',
            }}
            className="simplefi-logo"
          />
        </Box>
      </Toolbar>
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            selected={location.pathname === item.path}
            onClick={() => {
              navigate(item.path);
              setMobileOpen(false);
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        {children}
      </Box>
      <ChatBubble />
    </Box>
  );
} 