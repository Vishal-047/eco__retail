"use client";
import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Tooltip,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Park,
  Dashboard,
  Person,
  Logout,
  Login,
  HowToReg,
  Calculate,
  LocalShipping,
  Recycling,
  SmartToy,
  TrendingUp,
  Star,
  Close as CloseIcon,
} from '@mui/icons-material';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

interface SessionUser {
  id: string;
  name?: string;
  phone?: string;
  email?: string;
  isAdmin?: boolean;
}

const Navbar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<SessionUser | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    async function syncUser() {
      try {
        const res = await fetch('/api/auth/me');
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      }
    }
    syncUser();
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setUser(null);
    handleMenuClose();
    router.push('/');
    router.refresh();
  };

  const navigationItems = [
    { text: 'Products', path: '/products', icon: <Park /> },
    { text: 'CO₂ Track', path: '/calculator', icon: <Calculate /> },
    { text: 'Green Delivery', path: '/delivery', icon: <LocalShipping /> },
    { text: 'Deals', path: '/expiry-deals', icon: <Star /> },
    { text: 'Community', path: '/community', icon: <Recycling /> },
    { text: 'Eco Advisor', path: '/chatbot', icon: <SmartToy /> },
  ];

  const isActive = (path: string) => pathname === path;

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'white' }}>
      {/* Drawer header */}
      <Box sx={{ p: 2.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid', borderColor: 'var(--color-border)' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ width: 32, height: 32, borderRadius: '8px', bgcolor: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Park sx={{ color: 'white', fontSize: 18 }} />
          </Box>
          <Typography sx={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--color-text-primary)' }}>
            EcoRetail
          </Typography>
        </Box>
        <IconButton onClick={handleDrawerToggle} size="small" sx={{ color: 'var(--color-text-secondary)' }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* Nav items */}
      <List sx={{ flex: 1, p: 1.5, '& .MuiListItemButton-root': { borderRadius: '8px', mb: 0.5, px: 1.5 } }}>
        {navigationItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              onClick={() => { router.push(item.path); setMobileOpen(false); }}
              selected={isActive(item.path)}
              sx={{
                '&.Mui-selected': {
                  bgcolor: 'var(--color-primary-light)',
                  color: 'var(--color-primary)',
                  '& .MuiListItemIcon-root': { color: 'var(--color-primary)' },
                },
                '&:hover': { bgcolor: 'var(--color-border-soft)' },
              }}
            >
              <ListItemIcon sx={{ minWidth: 36, color: isActive(item.path) ? 'var(--color-primary)' : 'var(--color-text-secondary)' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{ fontWeight: isActive(item.path) ? 600 : 400, fontSize: '0.9rem' }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider sx={{ borderColor: 'var(--color-border)' }} />

      {/* Auth section */}
      {user ? (
        <List sx={{ p: 1.5, '& .MuiListItemButton-root': { borderRadius: '8px', mb: 0.5, px: 1.5 } }}>
          <ListItem disablePadding>
            <ListItemButton onClick={() => { router.push('/dashboard'); setMobileOpen(false); }}>
              <ListItemIcon sx={{ minWidth: 36, color: 'var(--color-text-secondary)' }}><Dashboard /></ListItemIcon>
              <ListItemText primary="Dashboard" primaryTypographyProps={{ fontSize: '0.9rem' }} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={handleLogout} sx={{ color: 'var(--color-error)' }}>
              <ListItemIcon sx={{ minWidth: 36, color: 'var(--color-error)' }}><Logout /></ListItemIcon>
              <ListItemText primary="Sign out" primaryTypographyProps={{ fontSize: '0.9rem', color: 'var(--color-error)' }} />
            </ListItemButton>
          </ListItem>
        </List>
      ) : (
        <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => { router.push('/login'); setMobileOpen(false); }}
            sx={{
              borderRadius: 'var(--radius-md)',
              borderColor: 'var(--color-border)',
              color: 'var(--color-text-primary)',
              fontWeight: 600,
              py: 1.2,
              '&:hover': { borderColor: 'var(--color-primary)', color: 'var(--color-primary)' },
            }}
          >
            Sign in
          </Button>
          <Button
            fullWidth
            variant="contained"
            onClick={() => { router.push('/register'); setMobileOpen(false); }}
            sx={{
              borderRadius: 'var(--radius-md)',
              bgcolor: 'var(--color-primary)',
              fontWeight: 600,
              py: 1.2,
              '&:hover': { bgcolor: 'var(--color-primary-dark)' },
            }}
          >
            Get started
          </Button>
        </Box>
      )}
    </Box>
  );

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: (mounted && scrolled) ? 'rgba(255,255,255,0.90)' : 'rgba(255,255,255,0.97)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid',
          borderColor: (mounted && scrolled) ? 'var(--color-border)' : 'transparent',
          color: 'var(--color-text-primary)',
          transition: 'all 0.25s ease',
          boxShadow: (mounted && scrolled) ? 'var(--shadow-sm)' : 'none',
        }}
      >
        <Toolbar sx={{ maxWidth: 1200, mx: 'auto', width: '100%', px: { xs: 2, md: 3 }, minHeight: '64px !important' }}>
          {/* Logo */}
          <Box
            sx={{ display: 'flex', alignItems: 'center', gap: 1.5, cursor: 'pointer', mr: 4, flexShrink: 0 }}
            onClick={() => router.push('/')}
          >
            <Box sx={{
              width: 34, height: 34, borderRadius: '9px',
              bgcolor: 'var(--color-primary)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(22,163,74,0.30)',
            }}>
              <Park sx={{ color: 'white', fontSize: 19 }} />
            </Box>
            <Typography sx={{ fontWeight: 700, fontSize: '1.05rem', letterSpacing: '-0.01em', color: 'var(--color-text-primary)' }}>
              EcoRetail
            </Typography>
          </Box>

          {/* Desktop Navigation */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 0, flexGrow: 1, alignItems: 'center' }}>
            {navigationItems.map((item) => (
              <Button
                key={item.text}
                component={Link}
                href={item.path}
                disableRipple
                sx={{
                  fontWeight: 500,
                  fontSize: '0.875rem',
                  color: isActive(item.path) ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                  px: 1.5,
                  py: 0.75,
                  borderRadius: 'var(--radius-sm)',
                  bgcolor: isActive(item.path) ? 'var(--color-primary-light)' : 'transparent',
                  '&:hover': {
                    bgcolor: isActive(item.path) ? 'var(--color-primary-light)' : 'var(--color-border-soft)',
                    color: isActive(item.path) ? 'var(--color-primary)' : 'var(--color-text-primary)',
                  },
                  transition: 'all var(--transition-fast)',
                  textTransform: 'none',
                  letterSpacing: 0,
                  minWidth: 'auto',
                }}
              >
                {item.text}
              </Button>
            ))}
          </Box>

          {/* Right side: auth controls */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, ml: 'auto' }}>
            {user ? (
              <>
                <Tooltip title="Green Points Dashboard">
                  <Box
                    onClick={() => router.push('/dashboard')}
                    sx={{
                      display: { xs: 'none', sm: 'flex' },
                      alignItems: 'center',
                      gap: 0.75,
                      cursor: 'pointer',
                      bgcolor: 'var(--color-primary-light)',
                      color: 'var(--color-primary)',
                      px: 1.5,
                      py: 0.6,
                      borderRadius: 'var(--radius-pill)',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      transition: 'all var(--transition-fast)',
                      '&:hover': { bgcolor: '#bbf7d0' },
                    }}
                  >
                    <Star sx={{ fontSize: 15 }} />
                    Points
                  </Box>
                </Tooltip>
                {user.name && (
                  <Typography sx={{ fontWeight: 600, fontSize: '0.875rem', display: { xs: 'none', sm: 'block' }, color: 'var(--color-text-secondary)' }}>
                    {user.name}
                  </Typography>
                )}
                <Tooltip title="Account settings">
                  <IconButton
                    onClick={handleProfileMenuOpen}
                    sx={{
                      p: 0.5,
                      '&:hover': { bgcolor: 'var(--color-border-soft)' },
                    }}
                  >
                    <Avatar sx={{
                      width: 34, height: 34,
                      bgcolor: 'var(--color-primary)',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      border: '2px solid var(--color-primary-light)',
                    }}>
                      {user.name?.[0]?.toUpperCase() || <Person sx={{ fontSize: 18 }} />}
                    </Avatar>
                  </IconButton>
                </Tooltip>
              </>
            ) : (
              <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 1, alignItems: 'center' }}>
                <Button
                  onClick={() => router.push('/login')}
                  sx={{
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    color: 'var(--color-text-secondary)',
                    textTransform: 'none',
                    px: 2,
                    '&:hover': { color: 'var(--color-text-primary)', bgcolor: 'var(--color-border-soft)' },
                  }}
                >
                  Sign in
                </Button>
                <Button
                  variant="contained"
                  onClick={() => router.push('/register')}
                  sx={{
                    bgcolor: 'var(--color-primary)',
                    color: 'white',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    textTransform: 'none',
                    px: 2.5,
                    py: 0.9,
                    borderRadius: 'var(--radius-md)',
                    boxShadow: 'var(--shadow-green)',
                    '&:hover': { bgcolor: 'var(--color-primary-dark)', boxShadow: '0 4px 16px rgba(22,163,74,0.30)' },
                    transition: 'all var(--transition-base)',
                  }}
                >
                  Get started
                </Button>
              </Box>
            )}
          </Box>

          {/* Mobile hamburger */}
          <IconButton
            onClick={handleDrawerToggle}
            sx={{
              ml: 1,
              display: { md: 'none' },
              color: 'var(--color-text-secondary)',
              '&:hover': { bgcolor: 'var(--color-border-soft)' },
            }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Spacer for fixed navbar */}
      <Toolbar sx={{ minHeight: '64px !important' }} />

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 280,
            border: 'none',
            boxShadow: 'var(--shadow-xl)',
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* User dropdown Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 200,
            p: 0.5,
            '& .MuiMenuItem-root': {
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.875rem',
              fontWeight: 500,
              py: 1,
              px: 1.5,
              gap: 1.5,
              '&:hover': { bgcolor: 'var(--color-border-soft)' },
            },
          },
        }}
      >
        <MenuItem onClick={() => { router.push('/dashboard'); handleMenuClose(); }}>
          <Dashboard fontSize="small" sx={{ color: 'var(--color-text-secondary)' }} />
          Dashboard
        </MenuItem>
        <MenuItem onClick={() => { router.push('/profile'); handleMenuClose(); }}>
          <Person fontSize="small" sx={{ color: 'var(--color-text-secondary)' }} />
          Profile
        </MenuItem>
        {user?.isAdmin && (
          <MenuItem onClick={() => { router.push('/admin/green-points'); handleMenuClose(); }}>
            <TrendingUp fontSize="small" sx={{ color: 'var(--color-text-secondary)' }} />
            Admin Panel
          </MenuItem>
        )}
        <Divider sx={{ my: 0.5, borderColor: 'var(--color-border)' }} />
        <MenuItem onClick={handleLogout} sx={{ color: 'var(--color-error) !important' }}>
          <Logout fontSize="small" sx={{ color: 'var(--color-error)' }} />
          Sign out
        </MenuItem>
      </Menu>
    </>
  );
};

export default Navbar;