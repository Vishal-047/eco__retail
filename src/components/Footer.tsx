import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';
import { Park } from '@mui/icons-material';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Features: [
      { label: 'Products', href: '/products' },
      { label: 'CO₂ Calculator', href: '/calculator' },
      { label: 'Green Delivery', href: '/delivery' },
      { label: 'Packaging', href: '/packaging' },
      { label: 'Smart Deals', href: '/expiry-deals' },
    ],
    Tools: [
      { label: 'Eco Advisor', href: '/chatbot' },
      { label: 'Bulk Analysis', href: '/bulk-analysis' },
      { label: 'Suppliers', href: '/suppliers' },
      { label: 'Compare', href: '/compare' },
      { label: 'Community', href: '/community' },
    ],
    Account: [
      { label: 'Sign in', href: '/login' },
      { label: 'Register', href: '/register' },
      { label: 'Dashboard', href: '/dashboard' },
    ],
  };

  const socialLinks = [
    { label: 'GitHub', href: '#', icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    )},
    { label: 'Twitter / X', href: '#', icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    )},
    { label: 'LinkedIn', href: '#', icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    )},
  ];

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'var(--color-dark)',
        color: 'white',
        pt: { xs: 8, md: 12 },
        pb: 6,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        {/* Top grid */}
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '2fr 1fr 1fr 1fr', },
          gap: { xs: 6, md: 8 },
          mb: { xs: 8, md: 12 },
        }}>
          {/* Brand column */}
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
              <Box sx={{
                width: 34, height: 34, borderRadius: '9px',
                bgcolor: 'var(--color-primary)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(22,163,74,0.40)',
              }}>
                <Park sx={{ color: 'white', fontSize: 18 }} />
              </Box>
              <Typography sx={{ fontWeight: 700, fontSize: '1.05rem', letterSpacing: '-0.01em', color: 'white' }}>
                EcoRetail
              </Typography>
            </Box>
            <Typography sx={{ color: '#94a3b8', fontSize: '0.875rem', lineHeight: 1.8, maxWidth: 280, mb: 4 }}>
              Making sustainable shopping accessible and transparent. Track carbon emissions,
              choose eco-friendly products, and make a positive impact on our planet.
            </Typography>
            {/* Social icons */}
            <Box sx={{ display: 'flex', gap: 1 }}>
              {socialLinks.map((social) => (
                <Box
                  key={social.label}
                  component="a"
                  href={social.href}
                  aria-label={social.label}
                  sx={{
                    width: 36, height: 36,
                    borderRadius: 'var(--radius-sm)',
                    bgcolor: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#94a3b8',
                    transition: 'all var(--transition-base)',
                    cursor: 'pointer',
                    '&:hover': {
                      bgcolor: 'var(--color-primary)',
                      color: 'white',
                      borderColor: 'transparent',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  {social.icon}
                </Box>
              ))}
            </Box>
          </Box>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <Box key={title}>
              <Typography sx={{ fontWeight: 600, fontSize: '0.8rem', letterSpacing: '0.06em', textTransform: 'uppercase', color: '#64748b', mb: 3 }}>
                {title}
              </Typography>
              <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, display: 'flex', flexDirection: 'column', gap: 1 }}>
                {links.map((item) => (
                  <Box component="li" key={item.href}>
                    <Link
                      href={item.href}
                      sx={{
                        color: '#94a3b8',
                        fontSize: '0.875rem',
                        textDecoration: 'none',
                        display: 'inline-block',
                        transition: 'color var(--transition-fast)',
                        '&:hover': { color: 'white' },
                      }}
                    >
                      {item.label}
                    </Link>
                  </Box>
                ))}
              </Box>
            </Box>
          ))}
        </Box>

        {/* Bottom bar */}
        <Box sx={{
          borderTop: '1px solid rgba(255,255,255,0.07)',
          pt: 5,
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
        }}>
          <Typography sx={{ color: '#475569', fontSize: '0.8rem' }}>
            © {currentYear} EcoRetail. All rights reserved.
          </Typography>
          <Typography sx={{ color: '#475569', fontSize: '0.8rem' }}>
            Made with 💚 for a sustainable future
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;