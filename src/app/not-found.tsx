import Link from 'next/link';
import { Box, Typography, Button, Container } from '@mui/material';
import { Park, ArrowBack } from '@mui/icons-material';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 — Page Not Found | EcoRetail',
};

// [N4] Branded 404 page — no more generic Next.js error screen
export default function NotFound() {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          gap: 3,
        }}
      >
        <Box sx={{ fontSize: 80 }}>🌿</Box>
        <Typography variant="h2" sx={{ fontWeight: 'bold', color: '#2e7d32' }}>
          404
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          This page got composted.
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 360 }}>
          The page you're looking for doesn't exist or was removed. Let's get you back on the
          sustainable path.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <Button
              variant="contained"
              startIcon={<ArrowBack />}
              sx={{ bgcolor: '#2e7d32', '&:hover': { bgcolor: '#1b5e20' } }}
            >
              Back to Home
            </Button>
          </Link>
          <Link href="/products" style={{ textDecoration: 'none' }}>
            <Button
              variant="outlined"
              startIcon={<Park />}
              sx={{ borderColor: '#2e7d32', color: '#2e7d32' }}
            >
              Browse Products
            </Button>
          </Link>
        </Box>
      </Box>
    </Container>
  );
}
