"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import { Park, Email, Person, Lock, ArrowForward, CheckCircle } from "@mui/icons-material";
import Link from "next/link";

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!fullName || !email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fullName,
          email,
          password
        })
      });
      const data = await res.json();
      if (data?.error) {
        setError(data.error);
      } else {
        router.replace("/login?msg=success");
      }
    } catch (err) {
      setError("Unknown error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

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

  const perks = [
    "Join a community of 5,000+ eco-shoppers",
    "Verified carbon footprint tracking",
    "Exclusive early access to green deals",
    "Personalized sustainability reports"
  ];

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', bgcolor: 'var(--color-bg)' }}>
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
        <Box sx={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 70% at -10% 20%, rgba(132,204,22,0.15) 0, transparent 70%)', zIndex: 0 }} />
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 10 }}>
            <Box sx={{ width: 40, height: 40, borderRadius: '10px', bgcolor: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 14px rgba(22,163,74,0.40)' }}>
              <Park sx={{ color: 'white', fontSize: 22 }} />
            </Box>
            <Typography sx={{ fontWeight: 700, fontSize: '1.2rem', color: 'white' }}>EcoRetail</Typography>
          </Box>
          <Typography sx={{ fontWeight: 700, fontSize: '2.2rem', lineHeight: 1.2, color: 'white', mb: 2 }}>
            The journey to zero<br />
            <Box component="span" sx={{ background: 'linear-gradient(90deg, #84cc16, #a3e635)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>starts with you.</Box>
          </Typography>
          <Typography sx={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.7, mb: 8 }}>
            Create your account today and start tracking, saving, and contributing to a greener planet with every purchase you make.
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            {perks.map((perk, i) => (
              <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <CheckCircle sx={{ color: 'var(--color-accent)', fontSize: 20 }} />
                <Typography sx={{ color: '#94a3b8', fontSize: '0.9rem' }}>{perk}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: { xs: 3, sm: 6, md: 8 } }}>
        <Box sx={{ width: '100%', maxWidth: 460 }}>
          <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', gap: 1.5, mb: 6 }}>
            <Box sx={{ width: 36, height: 36, borderRadius: '9px', bgcolor: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Park sx={{ color: 'white', fontSize: 20 }} /></Box>
            <Typography sx={{ fontWeight: 700, fontSize: '1.1rem' }}>EcoRetail</Typography>
          </Box>

          <Typography sx={{ fontWeight: 700, fontSize: '1.8rem', color: 'var(--color-text-primary)', mb: 0.75 }}>Create an account</Typography>
          <Typography sx={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', mb: 5 }}>
            Already have an account? <Box component={Link} href="/login" sx={{ color: 'var(--color-primary)', fontWeight: 600, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Sign in instead</Box>
          </Typography>

          <Box component="form" onSubmit={handleRegister} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2.5 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
                <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>Full Name</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', bgcolor: 'white', px: 2, gap: 1.5, '&:focus-within': { borderColor: 'var(--color-primary)', boxShadow: '0 0 0 3px rgba(22,163,74,0.10)' } }}>
                  <Person sx={{ fontSize: 18, color: 'var(--color-text-muted)' }} />
                  <Box component="input" placeholder="e.g. John Doe" value={fullName} onChange={e => setFullName(e.target.value)} sx={{ flex: 1, border: 'none', outline: 'none', py: 1.4, fontSize: '0.9rem', fontFamily: 'inherit' }} />
                </Box>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
                <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>Email</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', bgcolor: 'white', px: 2, gap: 1.5, '&:focus-within': { borderColor: 'var(--color-primary)', boxShadow: '0 0 0 3px rgba(22,163,74,0.10)' } }}>
                  <Email sx={{ fontSize: 18, color: 'var(--color-text-muted)' }} />
                  <Box component="input" type="email" placeholder="you@email.com" value={email} onChange={e => setEmail(e.target.value)} sx={{ flex: 1, border: 'none', outline: 'none', py: 1.4, fontSize: '0.9rem', fontFamily: 'inherit' }} />
                </Box>
              </Box>
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2.5 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
                <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>Password</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', bgcolor: 'white', px: 2, gap: 1.5, '&:focus-within': { borderColor: 'var(--color-primary)', boxShadow: '0 0 0 3px rgba(22,163,74,0.10)' } }}>
                  <Lock sx={{ fontSize: 18, color: 'var(--color-text-muted)' }} />
                  <Box component="input" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} sx={{ flex: 1, border: 'none', outline: 'none', py: 1.4, fontSize: '0.9rem', fontFamily: 'inherit' }} />
                </Box>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
                <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>Confirm Password</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', bgcolor: 'white', px: 2, gap: 1.5, '&:focus-within': { borderColor: 'var(--color-primary)', boxShadow: '0 0 0 3px rgba(22,163,74,0.10)' } }}>
                  <Lock sx={{ fontSize: 18, color: 'var(--color-text-muted)' }} />
                  <Box component="input" type="password" placeholder="••••••••" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} sx={{ flex: 1, border: 'none', outline: 'none', py: 1.4, fontSize: '0.9rem', fontFamily: 'inherit' }} />
                </Box>
              </Box>
            </Box>

            {error && <Typography sx={{ color: 'var(--color-error)', bgcolor: 'var(--color-error-bg)', p: 1.5, borderRadius: 'var(--radius-md)', fontSize: '0.85rem', border: '1px solid #fecaca' }}>{error}</Typography>}

            <Button
              type="submit"
              variant="contained"
              disabled={isLoading}
              endIcon={isLoading ? <CircularProgress size={18} color="inherit" /> : <ArrowForward />}
              sx={{
                bgcolor: 'var(--color-primary)',
                color: 'white',
                fontWeight: 600,
                py: 1.5,
                borderRadius: 'var(--radius-md)',
                textTransform: 'none',
                boxShadow: 'var(--shadow-green)',
                '&:hover': { bgcolor: 'var(--color-primary-dark)', boxShadow: '0 6px 20px rgba(22,163,74,0.35)' }
              }}
            >
              {isLoading ? "Creating account..." : "Create account"}
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
              Sign up with Google
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}