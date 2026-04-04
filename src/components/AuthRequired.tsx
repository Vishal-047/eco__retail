"use client";
import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { LockOutlined, ArrowForward, Park } from '@mui/icons-material';
import { useRouter } from 'next/navigation';

interface AuthRequiredProps {
  title?: string;
  description?: string;
}

export default function AuthRequired({
  title = "Authentication Required",
  description = "Please sign in to access your dashboard and track your environmental impact."
}: AuthRequiredProps) {
  const router = useRouter();

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      py: { xs: 8, md: 12 },
      px: 3,
      textAlign: 'center',
    }}>
      <Paper elevation={0} sx={{
        maxWidth: 500,
        width: '100%',
        p: { xs: 4, md: 6 },
        borderRadius: 'var(--radius-xl)',
        border: '1px solid var(--color-border)',
        bgcolor: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        {/* Icon container */}
        <Box sx={{
          width: 64, height: 64, borderRadius: '16px',
          bgcolor: 'var(--color-primary-light)',
          color: 'var(--color-primary)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          mb: 4,
          boxShadow: '0 4px 12px rgba(22,163,74,0.12)',
        }}>
          <LockOutlined sx={{ fontSize: 30 }} />
        </Box>

        <Typography variant="h2" sx={{
          fontWeight: 700,
          fontSize: '1.5rem',
          letterSpacing: '-0.02em',
          color: 'var(--color-text-primary)',
          mb: 1.5,
        }}>
          {title}
        </Typography>

        <Typography sx={{
          color: 'var(--color-text-secondary)',
          fontSize: '1rem',
          lineHeight: 1.6,
          mb: 5,
        }}>
          {description}
        </Typography>

        {/* Action buttons */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
          <Button
            variant="contained"
            fullWidth
            onClick={() => router.push('/login')}
            endIcon={<ArrowForward sx={{ fontSize: 18 }} />}
            sx={{
              bgcolor: 'var(--color-primary)',
              color: 'white',
              fontWeight: 600,
              py: 1.5,
              borderRadius: 'var(--radius-md)',
              textTransform: 'none',
              boxShadow: 'var(--shadow-green)',
              '&:hover': { bgcolor: 'var(--color-primary-dark)', boxShadow: '0 4px 16px rgba(22,163,74,0.30)' },
            }}
          >
            Sign in to your account
          </Button>

          <Button
            variant="text"
            fullWidth
            onClick={() => router.push('/register')}
            sx={{
              color: 'var(--color-text-secondary)',
              fontWeight: 600,
              py: 1,
              borderRadius: 'var(--radius-md)',
              textTransform: 'none',
              '&:hover': { color: 'var(--color-primary)', bgcolor: 'transparent', textDecoration: 'underline' },
            }}
          >
            Don&apos;t have an account? Sign up
          </Button>
        </Box>

        {/* Brand footer */}
        <Box sx={{ mt: 6, display: 'flex', alignItems: 'center', gap: 1, opacity: 0.5 }}>
          <Park sx={{ fontSize: 16, color: 'var(--color-primary)' }} />
          <Typography sx={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            EcoRetail Secure Auth
          </Typography>
        </Box>
      </Paper>

      <Button
        variant="text"
        onClick={() => router.push('/')}
        sx={{ mt: 4, color: 'var(--color-text-muted)', textTransform: 'none', fontSize: '0.9rem' }}
      >
        ← Back to homepage
      </Button>
    </Box>
  );
}
