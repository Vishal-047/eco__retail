"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import { Park, Email, Phone, Lock, ArrowForward, CheckCircle } from "@mui/icons-material";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!email || !password) {
      setError("All fields are required.");
      setIsLoading(false);
      return;
    }
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailOrPhone: email, password }),
      });
      const data = await res.json();
      if (data?.error) {
        setError(data.error);
      } else {
        router.replace("/");
        router.refresh();
      }
    } catch {
      setError("Unknown error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const perks = [
    "Track CO₂ emissions for every purchase",
    "Earn Green Points for eco-friendly actions",
    "Optimize delivery routes to cut emissions",
    "Access AI-powered sustainability advice",
  ];

  return (
    <Box sx={{
      minHeight: '100vh',
      display: 'flex',
      bgcolor: 'var(--color-bg)',
    }}>
      {/* ── Left Panel (branding) ── */}
      <Box sx={{
        display: { xs: 'none', md: 'flex' },
        flex: '0 0 45%',
        flexDirection: 'column',
        justifyContent: 'center',
        bgcolor: 'var(--color-dark)',
        p: { md: 8, lg: 12 },
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* bg glow */}
        <Box sx={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 80% 70% at -10% 50%, rgba(22,163,74,0.20) 0, transparent 70%)',
          zIndex: 0,
        }} />

        <Box sx={{ position: 'relative', zIndex: 1 }}>
          {/* Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 10 }}>
            <Box sx={{
              width: 40, height: 40, borderRadius: '10px',
              bgcolor: 'var(--color-primary)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 14px rgba(22,163,74,0.40)',
            }}>
              <Park sx={{ color: 'white', fontSize: 22 }} />
            </Box>
            <Typography sx={{ fontWeight: 700, fontSize: '1.2rem', color: 'white', letterSpacing: '-0.01em' }}>
              EcoRetail
            </Typography>
          </Box>

          <Typography sx={{ fontWeight: 700, fontSize: '2.2rem', lineHeight: 1.2, letterSpacing: '-0.02em', color: 'white', mb: 2 }}>
            Shop consciously.<br />
            <Box component="span" sx={{
              background: 'linear-gradient(90deg, #4ade80, #86efac)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Live sustainably.
            </Box>
          </Typography>
          <Typography sx={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.7, mb: 8 }}>
            Sign in to access your eco dashboard, track your carbon footprint, and make a real environmental impact.
          </Typography>

          {/* Perks list */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            {perks.map((perk, i) => (
              <Box key={i} sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                <CheckCircle sx={{ color: 'var(--color-primary)', fontSize: 20, mt: 0.1, flexShrink: 0 }} />
                <Typography sx={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.5 }}>
                  {perk}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      {/* ── Right Panel (form) ── */}
      <Box sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: { xs: 3, sm: 6, md: 8 },
      }}>
        <Box sx={{ width: '100%', maxWidth: 420 }}>
          {/* Mobile logo */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', gap: 1.5, mb: 8 }}>
            <Box sx={{ width: 36, height: 36, borderRadius: '9px', bgcolor: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Park sx={{ color: 'white', fontSize: 20 }} />
            </Box>
            <Typography sx={{ fontWeight: 700, fontSize: '1.1rem' }}>EcoRetail</Typography>
          </Box>

          <Typography sx={{ fontWeight: 700, fontSize: '1.8rem', letterSpacing: '-0.02em', color: 'var(--color-text-primary)', mb: 0.75 }}>
            Welcome back
          </Typography>
          <Typography sx={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', mb: 6 }}>
            Don&apos;t have an account?{' '}
            <Box component={Link} href="/register" sx={{
              color: 'var(--color-primary)',
              fontWeight: 600,
              textDecoration: 'none',
              '&:hover': { textDecoration: 'underline' },
            }}>
              Sign up for free
            </Box>
          </Typography>

          <Box component="form" onSubmit={handleLogin} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Email field */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
              <Typography component="label" htmlFor="login-identifier" sx={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-secondary)', letterSpacing: '0.02em' }}>
                Email address
              </Typography>
              <Box sx={{
                display: 'flex', alignItems: 'center',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                bgcolor: 'white',
                px: 2, gap: 1.5,
                transition: 'border-color var(--transition-fast)',
                '&:focus-within': { borderColor: 'var(--color-primary)', boxShadow: '0 0 0 3px rgba(22,163,74,0.10)' },
              }}>
                <Email sx={{ fontSize: 18, color: 'var(--color-text-muted)', flexShrink: 0 }} />
                <Box
                  component="input"
                  id="login-identifier"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                  autoComplete="email"
                  sx={{
                    flex: 1, border: 'none', outline: 'none',
                    bgcolor: 'transparent',
                    py: 1.4,
                    fontSize: '0.9rem',
                    color: 'var(--color-text-primary)',
                    '&::placeholder': { color: 'var(--color-text-muted)' },
                    fontFamily: 'var(--font-sans)',
                  }}
                />
              </Box>
            </Box>

            {/* Password field */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography component="label" htmlFor="login-password" sx={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-secondary)', letterSpacing: '0.02em' }}>
                  Password
                </Typography>
              </Box>
              <Box sx={{
                display: 'flex', alignItems: 'center',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                bgcolor: 'white',
                px: 2, gap: 1.5,
                transition: 'border-color var(--transition-fast)',
                '&:focus-within': { borderColor: 'var(--color-primary)', boxShadow: '0 0 0 3px rgba(22,163,74,0.10)' },
              }}>
                <Lock sx={{ fontSize: 18, color: 'var(--color-text-muted)', flexShrink: 0 }} />
                <Box
                  component="input"
                  id="login-password"
                  type="password"
                  placeholder="Your password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  autoComplete="current-password"
                  sx={{
                    flex: 1, border: 'none', outline: 'none',
                    bgcolor: 'transparent',
                    py: 1.4,
                    fontSize: '0.9rem',
                    color: 'var(--color-text-primary)',
                    '&::placeholder': { color: 'var(--color-text-muted)' },
                    fontFamily: 'var(--font-sans)',
                  }}
                />
              </Box>
            </Box>

            {/* Error */}
            {error && (
              <Box sx={{
                bgcolor: 'var(--color-error-bg)',
                border: '1px solid #fca5a5',
                borderRadius: 'var(--radius-md)',
                p: 2,
                display: 'flex', alignItems: 'flex-start', gap: 1.5,
              }}>
                <Box sx={{ color: 'var(--color-error)', fontSize: '1.1rem', lineHeight: 1 }}>⚠</Box>
                <Typography sx={{ color: 'var(--color-error)', fontSize: '0.875rem', lineHeight: 1.5 }}>
                  {error}
                </Typography>
              </Box>
            )}

            {/* [ADDED] Success message check */}
            {typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('msg') === 'success' && (
              <Box sx={{
                bgcolor: 'var(--color-primary-light)',
                border: '1px solid rgba(22,163,74,0.3)',
                borderRadius: 'var(--radius-md)',
                p: 2,
                display: 'flex', alignItems: 'center', gap: 1.5,
                mb: 1,
              }}>
                <CheckCircle sx={{ color: 'var(--color-primary)', fontSize: '1.2rem' }} />
                <Typography sx={{ color: 'var(--color-primary-dark)', fontSize: '0.875rem', fontWeight: 600 }}>
                  Account created successfully! Please sign in.
                </Typography>
              </Box>
            )}

            {/* Submit */}
            <Button
              type="submit"
              variant="contained"
              disabled={isLoading}
              endIcon={isLoading ? <CircularProgress size={16} sx={{ color: 'rgba(255,255,255,0.7)' }} /> : <ArrowForward sx={{ fontSize: 18 }} />}
              sx={{
                bgcolor: 'var(--color-primary)',
                color: 'white',
                fontWeight: 600,
                fontSize: '0.9rem',
                py: 1.5,
                borderRadius: 'var(--radius-md)',
                textTransform: 'none',
                boxShadow: 'var(--shadow-green)',
                '&:hover': { bgcolor: 'var(--color-primary-dark)', boxShadow: '0 6px 20px rgba(22,163,74,0.35)' },
                '&:disabled': { bgcolor: 'var(--color-primary)', opacity: 0.6 },
                transition: 'all var(--transition-base)',
              }}
            >
              {isLoading ? 'Signing in…' : 'Sign in'}
            </Button>

            <Box sx={{ display: 'flex', alignItems: 'center', my: 1 }}>
              <Box sx={{ flex: 1, height: '1px', bgcolor: 'var(--color-border)' }} />
              <Typography sx={{ px: 2, fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>or</Typography>
              <Box sx={{ flex: 1, height: '1px', bgcolor: 'var(--color-border)' }} />
            </Box>

            <Button
              fullWidth
              variant="outlined"
              onClick={handleGoogleAuth}
              startIcon={<GoogleIcon />}
              sx={{
                py: 1.4,
                borderRadius: 'var(--radius-md)',
                borderColor: 'var(--color-border)',
                color: 'var(--color-text-primary)',
                fontWeight: 600,
                textTransform: 'none',
                fontSize: '0.9rem',
                '&:hover': { bgcolor: 'rgba(0,0,0,0.02)', borderColor: 'var(--color-text-muted)' }
              }}
            >
              Sign in with Google
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

const GoogleIcon = () => (
  <Box component="svg" viewBox="0 0 24 24" sx={{ width: 18, height: 18 }}>
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </Box>
);

const handleGoogleAuth = () => {
  alert("Google authentication is being prepared and will be live soon!");
};