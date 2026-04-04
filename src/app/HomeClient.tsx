"use client";
import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Button, CircularProgress } from '@mui/material';
import {
  Park, LocalShipping, Star, Nature as NatureIcon, Inventory as InventoryIcon,
  Store as StoreIcon, TrendingUp, EmojiEvents, ArrowForward,
} from '@mui/icons-material';
import ChatbotWidget from '../components/ChatbotWidget';
import Link from 'next/link';

const AnimatedCounter = ({ end, suffix = '' }: { end: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const duration = 1800;
    const step = Math.ceil(end / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [end]);
  return <>{count.toLocaleString()}{suffix}</>;
};

export default function HomeClient() {
  const [chatOpen, setChatOpen] = useState(false);
  const [tips, setTips] = useState<string[]>([]);
  const [tipsLoading, setTipsLoading] = useState(false);
  const [tipsError, setTipsError] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetch('/api/auth/me')
      .then(res => res.ok ? res.json() : null)
      .then(data => setUser(data))
      .catch(() => setUser(null));

    setTipsLoading(true);
    setTipsError(null);
    fetch('/api/sustainability-tips')
      .then(res => res.json())
      .then(data => { setTips(data.tips || []); setTipsLoading(false); })
      .catch(() => { setTipsError('Failed to load tips'); setTipsLoading(false); });
  }, []);

  const features = [
    {
      icon: <Park sx={{ fontSize: 28 }} />,
      title: 'Carbon Emission Tracking',
      description: 'Real-time CO₂ data for every product. Make informed sustainable choices backed by verified emission reports.',
      actionText: 'Browse Products',
      href: '/products',
      color: 'var(--color-primary)',
      bgColor: 'var(--color-primary-light)',
    },
    {
      icon: <LocalShipping sx={{ fontSize: 28 }} />,
      title: 'Green Delivery Options',
      description: 'Optimize delivery routes and choose sustainable vehicles to minimize your CO₂ footprint on every order.',
      actionText: 'Route Tracker',
      href: '/delivery',
      color: '#2563eb',
      bgColor: '#eff6ff',
    },
    {
      icon: <Star sx={{ fontSize: 28 }} />,
      title: 'Green Points Rewards',
      description: 'Earn points for every eco-conscious action. Compete for badges and unlock exclusive sustainable rewards.',
      actionText: user ? 'My Dashboard' : 'Sign in to start',
      href: user ? '/dashboard' : '/login',
      color: '#d97706',
      bgColor: '#fffbeb',
    },
  ];

  const stats = [
    { icon: <TrendingUp />, value: 12400, suffix: '+', label: 'Tonnes CO₂ saved' },
    { icon: <EmojiEvents />, value: 3800, suffix: '+', label: 'Active members' },
    { icon: <Park />, value: 240, suffix: '+', label: 'Eco products' },
    { icon: <Star />, value: 98, suffix: '%', label: 'Satisfaction rate' },
  ];

  const TIP_ICONS = [
    <NatureIcon key="1" />, <InventoryIcon key="2" />, <LocalShipping key="3" />,
    <StoreIcon key="4" />, <Park key="5" />,
  ];

  return (
    <>
      {/* ── Hero Section ────────────────────────────────────────────────── */}
      <Box sx={{
        position: 'relative',
        overflow: 'hidden',
        bgcolor: 'var(--color-dark)',
        pt: { xs: 12, md: 20 },
        pb: { xs: 10, md: 18 },
      }}>
        {/* Background decoration */}
        <Box sx={{
          position: 'absolute', inset: 0, zIndex: 0,
          background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(22,163,74,0.22) 0, transparent 65%), radial-gradient(ellipse 50% 40% at 85% 95%, rgba(132,204,22,0.10) 0, transparent 65%)',
        }} />
        <Box sx={{
          position: 'absolute', top: '20%', right: '8%', width: 300, height: 300,
          borderRadius: '50%', bgcolor: 'rgba(22,163,74,0.06)',
          filter: 'blur(60px)', zIndex: 0,
        }} />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            gap: { xs: 8, md: 6 },
          }}>
            {/* Left content */}
            <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
              {/* Badge */}
              <Box sx={{
                display: 'inline-flex', alignItems: 'center', gap: 1,
                bgcolor: 'rgba(22,163,74,0.12)',
                border: '1px solid rgba(22,163,74,0.25)',
                borderRadius: 'var(--radius-pill)',
                px: 2, py: 0.75, mb: 4,
              }}>
                <Box sx={{ width: 7, height: 7, borderRadius: '50%', bgcolor: 'var(--color-primary)', flexShrink: 0 }} />
                <Typography sx={{ color: '#86efac', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.02em' }}>
                  Now live — Green Delivery Optimizer
                </Typography>
              </Box>

              <Typography
                variant="h1"
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: '2.6rem', sm: '3.4rem', md: '4rem' },
                  lineHeight: 1.1,
                  letterSpacing: '-0.03em',
                  color: 'white',
                  mb: 3,
                }}
              >
                Shop Smart,<br />
                <Box component="span" sx={{
                  background: 'linear-gradient(90deg, #4ade80, #86efac)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  Save the Planet
                </Box>
              </Typography>

              <Typography sx={{
                color: '#94a3b8',
                fontSize: { xs: '1rem', md: '1.15rem' },
                lineHeight: 1.7,
                maxWidth: 520,
                mb: 5,
                mx: { xs: 'auto', md: 0 },
              }}>
                The first comprehensive platform to track carbon footprints, choose sustainable products, and earn rewards for eco-friendly shopping.
              </Typography>

              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: { xs: 'center', md: 'flex-start' } }}>
                <Button
                  component={Link}
                  href="/products"
                  variant="contained"
                  endIcon={<ArrowForward sx={{ fontSize: 18 }} />}
                  sx={{
                    bgcolor: 'var(--color-primary)',
                    color: 'white',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    px: 3.5,
                    py: 1.4,
                    borderRadius: 'var(--radius-md)',
                    textTransform: 'none',
                    boxShadow: 'var(--shadow-green)',
                    '&:hover': {
                      bgcolor: 'var(--color-primary-dark)',
                      transform: 'translateY(-1px)',
                      boxShadow: '0 8px 24px rgba(22,163,74,0.35)',
                    },
                    transition: 'all var(--transition-base)',
                  }}
                >
                  Explore Products
                </Button>
                <Button
                  component={Link}
                  href={user ? "/calculator" : "/login"}
                  variant="outlined"
                  sx={{
                    color: 'white',
                    borderColor: 'rgba(255,255,255,0.20)',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    px: 3.5,
                    py: 1.4,
                    borderRadius: 'var(--radius-md)',
                    textTransform: 'none',
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.07)',
                      borderColor: 'rgba(255,255,255,0.40)',
                      transform: 'translateY(-1px)',
                    },
                    transition: 'all var(--transition-base)',
                  }}
                >
                  {user ? "CO₂ Calculator" : "Sign in to start"}
                </Button>
              </Box>
            </Box>

            {/* Right: Stats card */}
            <Box sx={{
              flex: { xs: 'none', md: '0 0 420px' },
              width: { xs: '100%', md: 420 },
            }}>
              <Box sx={{
                bgcolor: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 'var(--radius-xl)',
                p: { xs: 4, md: 5 },
                backdropFilter: 'blur(12px)',
              }}>
                <Typography sx={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', mb: 4 }}>
                  Platform Impact
                </Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
                  {stats.map((stat, i) => (
                    <Box key={i}>
                      <Box sx={{ color: 'var(--color-primary)', mb: 1 }}>
                        {stat.icon}
                      </Box>
                      <Typography sx={{ fontWeight: 700, fontSize: '1.8rem', color: 'white', lineHeight: 1, mb: 0.5 }}>
                        <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                      </Typography>
                      <Typography sx={{ color: '#64748b', fontSize: '0.8rem' }}>
                        {stat.label}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* ── Feature Cards ────────────────────────────────────────────────── */}
      <Box sx={{ py: { xs: 10, md: 16 }, bgcolor: 'var(--color-bg)' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: { xs: 8, md: 12 } }}>
            <Typography sx={{ color: 'var(--color-primary)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', mb: 2 }}>
              Core features
            </Typography>
            <Typography
              variant="h2"
              component="h2"
              sx={{ fontWeight: 700, fontSize: { xs: '2rem', md: '2.5rem' }, letterSpacing: '-0.02em', color: 'var(--color-text-primary)', mb: 2 }}
            >
              Smarter. Greener. Better.
            </Typography>
            <Typography sx={{ color: 'var(--color-text-secondary)', fontSize: '1.05rem', maxWidth: 560, mx: 'auto', lineHeight: 1.7 }}>
              Choose the specific tools that help your business or lifestyle move towards a sustainable future.
            </Typography>
          </Box>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' }, gap: 3 }}>
            {features.map((feature, index) => (
              <Box key={index} sx={{
                bgcolor: 'white',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                p: { xs: 4, md: 5 },
                display: 'flex',
                flexDirection: 'column',
                transition: 'all var(--transition-slow)',
                cursor: 'default',
                '&:hover': {
                  boxShadow: 'var(--shadow-lg)',
                  transform: 'translateY(-4px)',
                  borderColor: feature.color,
                },
              }}>
                {/* Icon */}
                <Box sx={{
                  width: 52, height: 52,
                  borderRadius: 'var(--radius-md)',
                  bgcolor: feature.bgColor,
                  color: feature.color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  mb: 3,
                }}>
                  {feature.icon}
                </Box>

                <Typography sx={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--color-text-primary)', mb: 1.5, letterSpacing: '-0.01em' }}>
                  {feature.title}
                </Typography>
                <Typography sx={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', lineHeight: 1.7, mb: 4, flexGrow: 1 }}>
                  {feature.description}
                </Typography>

                <Link href={feature.href || '#'} style={{ textDecoration: 'none' }}>
                  <Box sx={{
                    display: 'inline-flex', alignItems: 'center', gap: 0.75,
                    color: feature.color,
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    '&:hover': { gap: 1.5 },
                    transition: 'gap var(--transition-fast)',
                    mt: 'auto',
                  }}>
                    {feature.actionText}
                    <ArrowForward sx={{ fontSize: 16 }} />
                  </Box>
                </Link>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* ── How It Works ─────────────────────────────────────────────────── */}
      <Box sx={{ py: { xs: 10, md: 16 }, bgcolor: 'white', borderTop: '1px solid var(--color-border)' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: { xs: 8, md: 12 } }}>
            <Typography sx={{ color: 'var(--color-primary)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', mb: 2 }}>
              Getting started
            </Typography>
            <Typography
              variant="h2"
              component="h2"
              sx={{ fontWeight: 700, fontSize: { xs: '2rem', md: '2.5rem' }, letterSpacing: '-0.02em', color: 'var(--color-text-primary)' }}
            >
              How It Works
            </Typography>
          </Box>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' }, gap: { xs: 6, md: 4 }, position: 'relative' }}>
            {/* Connector line — desktop only */}
            <Box sx={{
              display: { xs: 'none', md: 'block' },
              position: 'absolute',
              top: 28, left: 'calc(16.66% + 24px)',
              width: 'calc(66.66% - 48px)',
              height: 1,
              bgcolor: 'var(--color-border)',
              zIndex: 0,
            }} />

            {[
              { num: '1', title: 'Explore', desc: 'Discover eco-friendly alternatives in our catalog, complete with verified green scores and emission reports.' },
              { num: '2', title: 'Select', desc: 'Use our green delivery optimizer to choose the best route and vehicle type to minimize CO₂ for every shipment.' },
              { num: '3', title: 'Analyze', desc: 'Earn points for every sustainable choice, track your carbon savings, and contribute to the community feed.' },
            ].map((step, i) => (
              <Box key={i} sx={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
                <Box sx={{
                  width: 56, height: 56,
                  borderRadius: 'var(--radius-md)',
                  bgcolor: 'var(--color-primary)',
                  color: 'white',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  mx: 'auto', mb: 4,
                  fontWeight: 700, fontSize: '1.25rem',
                  boxShadow: 'var(--shadow-green)',
                  border: '3px solid white',
                  outline: '1px solid var(--color-border)',
                }}>
                  {step.num}
                </Box>
                <Typography sx={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--color-text-primary)', mb: 1.5 }}>
                  {step.title}
                </Typography>
                <Typography sx={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', lineHeight: 1.7, px: 1 }}>
                  {step.desc}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* ── Eco Insights ─────────────────────────────────────────────────── */}
      <Box sx={{ py: { xs: 10, md: 16 }, bgcolor: 'var(--color-bg)', borderTop: '1px solid var(--color-border)' }}>
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center', mb: { xs: 8, md: 10 } }}>
            <Typography sx={{ color: 'var(--color-primary)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', mb: 2 }}>
              Learn daily
            </Typography>
            <Typography
              variant="h2"
              component="h2"
              sx={{ fontWeight: 700, fontSize: { xs: '2rem', md: '2.5rem' }, letterSpacing: '-0.02em', color: 'var(--color-text-primary)', mb: 2 }}
            >
              Eco Insights
            </Typography>
            <Typography sx={{ color: 'var(--color-text-secondary)', fontSize: '1rem', lineHeight: 1.7 }}>
              Expert advice to reduce your footprint and improve your ecological impact.
            </Typography>
          </Box>

          {tipsLoading && (
            <Box sx={{ py: 8, display: 'flex', justifyContent: 'center' }}>
              <CircularProgress sx={{ color: 'var(--color-primary)' }} size={40} thickness={3} />
            </Box>
          )}
          {tipsError && (
            <Box sx={{ py: 4, textAlign: 'center', color: 'var(--color-error)', fontSize: '0.9rem' }}>
              {tipsError}
            </Box>
          )}
          {!tipsLoading && !tipsError && tips.length === 0 && (
            <Box sx={{
              textAlign: 'center', py: 10,
              border: '1px dashed var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              bgcolor: 'white',
            }}>
              <Typography sx={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                No tips available right now. Check back soon.
              </Typography>
            </Box>
          )}
          {!tipsLoading && !tipsError && tips.length > 0 && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {tips.map((tip, i) => (
                <Box
                  key={i}
                  sx={{
                    display: 'flex', gap: 3, alignItems: 'flex-start',
                    p: 3, bgcolor: 'white',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-md)',
                    transition: 'all var(--transition-base)',
                    '&:hover': {
                      borderColor: 'var(--color-primary)',
                      boxShadow: 'var(--shadow-sm)',
                      transform: 'translateX(4px)',
                    },
                  }}
                >
                  <Box sx={{
                    width: 40, height: 40, flexShrink: 0,
                    borderRadius: 'var(--radius-sm)',
                    bgcolor: 'var(--color-primary-light)',
                    color: 'var(--color-primary)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {TIP_ICONS[i % TIP_ICONS.length]}
                  </Box>
                  <Typography sx={{ fontWeight: 500, lineHeight: 1.7, color: 'var(--color-text-primary)', fontSize: '0.95rem', pt: 0.5 }}>
                    {tip}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}
        </Container>
      </Box>

      {/* ── CTA Section ──────────────────────────────────────────────────── */}
      <Box sx={{ py: { xs: 10, md: 16 }, bgcolor: 'var(--color-bg)', borderTop: '1px solid var(--color-border)' }}>
        <Container maxWidth="lg">
          <Box sx={{
            bgcolor: 'var(--color-dark)',
            borderRadius: 'var(--radius-xl)',
            p: { xs: 5, md: 10 },
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* Background glow */}
            <Box sx={{
              position: 'absolute', inset: 0,
              background: 'radial-gradient(ellipse 70% 60% at 50% -10%, rgba(22,163,74,0.25) 0, transparent 65%)',
              zIndex: 0,
            }} />
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Typography sx={{ color: 'var(--color-accent)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', mb: 3 }}>
                Join thousands of shoppers
              </Typography>
              <Typography
                variant="h2"
                component="h2"
                sx={{ fontWeight: 700, fontSize: { xs: '1.8rem', md: '2.5rem' }, letterSpacing: '-0.02em', color: 'white', mb: 2 }}
              >
                Ready to Shop Sustainably?
              </Typography>
              <Typography sx={{ color: '#94a3b8', fontSize: { xs: '0.95rem', md: '1.05rem' }, maxWidth: 520, mx: 'auto', mb: 6, lineHeight: 1.7 }}>
                Join thousands of eco-conscious shoppers who are making a measurable difference for our planet every single day.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Button
                  component={Link}
                  href="/register"
                  variant="contained"
                  sx={{
                    bgcolor: 'var(--color-primary)',
                    color: 'white',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    px: 4, py: 1.5,
                    borderRadius: 'var(--radius-md)',
                    textTransform: 'none',
                    boxShadow: 'var(--shadow-green)',
                    '&:hover': {
                      bgcolor: 'var(--color-primary-dark)',
                      transform: 'translateY(-1px)',
                      boxShadow: '0 8px 24px rgba(22,163,74,0.35)',
                    },
                    transition: 'all var(--transition-base)',
                  }}
                >
                  Join the Mission
                </Button>
                <Button
                  component={Link}
                  href="/products"
                  variant="outlined"
                  sx={{
                    color: 'white',
                    borderColor: 'rgba(255,255,255,0.20)',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    px: 4, py: 1.5,
                    borderRadius: 'var(--radius-md)',
                    textTransform: 'none',
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.07)',
                      borderColor: 'rgba(255,255,255,0.40)',
                    },
                    transition: 'all var(--transition-base)',
                  }}
                >
                  Browse Catalog
                </Button>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* ── Chatbot FAB ──────────────────────────────────────────────────── */}
      <Box
        onClick={() => setChatOpen(true)}
        sx={{
          position: 'fixed', bottom: 32, right: 32, zIndex: 2000,
          width: 56, height: 56,
          bgcolor: 'var(--color-primary)',
          borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: 'var(--shadow-green)',
          transition: 'all var(--transition-base)',
          '&:hover': {
            bgcolor: 'var(--color-primary-dark)',
            transform: 'scale(1.08)',
            boxShadow: '0 8px 24px rgba(22,163,74,0.40)',
          },
        }}
        title="Chat with EcoBot"
      >
        <Park sx={{ color: 'white', fontSize: 26 }} />
      </Box>

      {/* ── Chatbot Drawer ───────────────────────────────────────────────── */}
      {chatOpen && (
        <Box sx={{
          position: 'fixed', inset: 0, zIndex: 2001,
          display: 'flex', justifyContent: 'flex-end',
        }}>
          <Box
            onClick={() => setChatOpen(false)}
            sx={{ flex: 1, bgcolor: 'rgba(0,0,0,0.40)', cursor: 'pointer' }}
          />
          <Box sx={{
            width: { xs: '100%', sm: 520 },
            maxWidth: '92vw',
            bgcolor: 'var(--color-bg)',
            height: '100%',
            boxShadow: 'var(--shadow-xl)',
            position: 'relative',
          }}>
            <Box
              onClick={() => setChatOpen(false)}
              sx={{
                position: 'absolute', top: 16, left: -20, zIndex: 10,
                width: 40, height: 40,
                bgcolor: 'white',
                border: '1px solid var(--color-border)',
                borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer',
                color: 'var(--color-text-secondary)',
                '&:hover': { bgcolor: 'var(--color-border-soft)', color: 'var(--color-text-primary)' },
                transition: 'all var(--transition-fast)',
                fontSize: '1.2rem', fontWeight: 500,
              }}
            >
              ×
            </Box>
            <Box sx={{ height: '100%' }}>
              <ChatbotWidget minimal={true} />
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
}
