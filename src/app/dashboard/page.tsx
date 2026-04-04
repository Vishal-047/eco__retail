"use client";
import React from 'react';
import { CircularProgress, Alert, Container, Box, Button } from '@mui/material';
import Link from 'next/link';
import GreenPoints from '../../components/GreenPoints';
import AuthRequired from '../../components/AuthRequired';
import { useQuery } from '@tanstack/react-query';

export default function DashboardPage() {
  const { data: userData, isLoading, error } = useQuery({
    queryKey: ['user-rewards'],
    queryFn: async () => {
      const res = await fetch('/api/user-rewards');
      if (res.status === 401) return null;
      if (!res.ok) throw new Error('Failed to fetch user data');
      return res.json();
    }
  });

  const { data: sessionData, isLoading: sessionLoading } = useQuery({
    queryKey: ['session'],
    queryFn: async () => {
      const res = await fetch('/api/auth/me');
      if (res.status === 401) return null;
      if (!res.ok) return null;
      return res.json();
    }
  });

  const isAdmin = sessionData?.isAdmin === true;
  const isUnauthenticated = (!sessionLoading && !sessionData) || (error as any)?.status === 401;

  if (isUnauthenticated && !isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 10 } }}>
        <AuthRequired 
          title="Sign in to your Dashboard"
          description="View your green points, track your recent eco-friendly actions, and unlock exclusive rewards."
        />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 8, md: 10 } }}>
      {(isLoading || sessionLoading) && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
          <CircularProgress sx={{ color: 'var(--color-primary)' }} />
        </Box>
      )}
      {error && !isUnauthenticated && <Alert severity="error">{(error as Error).message || 'Error loading dashboard'}</Alert>}
      {!isLoading && !sessionLoading && sessionData && (
        <>
          {isAdmin && (
            <Box sx={{ mb: 4, textAlign: 'right' }}>
              <Button component={Link} href="/admin/green-points" variant="outlined" sx={{ borderColor: 'var(--color-primary)', color: 'var(--color-primary)', textTransform: 'none', fontWeight: 600, borderRadius: 'var(--radius-md)' }}>
                Admin Panel
              </Button>
            </Box>
          )}
          {userData && <GreenPoints initialUserData={userData} />}
        </>
      )}
    </Container>
  );
}