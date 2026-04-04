"use client";
import { useState, useEffect } from 'react';
import { Container, Typography, Paper, Box, Stack, Button, CircularProgress, Alert, Avatar, IconButton } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';

export default function CommunityPage() {
  const [feed, setFeed] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch('/api/community-feed')
      .then(res => res.json())
      .then(data => {
        setFeed(data.feed || []);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load community feed');
        setLoading(false);
      });
  }, []);

  const handleShare = (post: any) => {
    const shareText = `${post.user} just achieved: ${post.achievement || post.tip}! #EcoRetail`;
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(shareText);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4, minHeight: '80vh' }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: '900', color: '#1b5e20' }}>
          Eco Community
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem' }}>
          Celebrate small wins on the path to a greener future.
        </Typography>
      </Box>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress color="success" />
        </Box>
      )}

      {error && <Alert severity="error" sx={{ borderRadius: 3 }}>{error}</Alert>}

      <Stack spacing={3} sx={{ mt: 2 }}>
        {!loading && feed.length === 0 && !error && (
          <Typography align="center" color="text.secondary" sx={{ py: 8 }}>
            No updates yet. Be the first to share!
          </Typography>
        )}
        {feed.map((post, i) => (
          <Paper key={i} elevation={0} sx={{ p: 3, display: 'flex', alignItems: 'flex-start', borderRadius: 5, border: '1px solid #f0f0f0', transition: 'all 0.2s', '&:hover': { bgcolor: '#fbfbfb', transform: 'translateY(-2px)', border: '1px solid #e0f2f1' } }}>
            <Avatar sx={{ mr: 2, bgcolor: '#1b5e20', fontWeight: 'bold', width: 48, height: 48 }}>
              {post.user[0]}
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: '800', color: '#333', mb: 0.5 }}>
                {post.user}
              </Typography>
              {post.achievement && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, my: 1, p: 1, bgcolor: '#e8f5e9', borderRadius: 2, width: 'fit-content' }}>
                   <Typography sx={{ fontSize: '1.1rem' }}>🏅</Typography>
                   <Typography variant="body2" sx={{ fontWeight: 600, color: '#2e7d32' }}>{post.achievement}</Typography>
                </Box>
              )}
              {post.tip && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, my: 1, p: 1, bgcolor: '#e3f2fd', borderRadius: 2, width: 'fit-content' }}>
                   <Typography sx={{ fontSize: '1.1rem' }}>💡</Typography>
                   <Typography variant="body2" sx={{ fontWeight: 600, color: '#1565c0' }}>{post.tip}</Typography>
                </Box>
              )}
              <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mt: 1 }}>
                {post.time}
              </Typography>
            </Box>
            <IconButton onClick={() => handleShare(post)} color="primary" sx={{ bgcolor: '#f5f5f5', '&:hover': { bgcolor: '#e0e0e0' }, ml: 1 }}>
              <ShareIcon fontSize="small" />
            </IconButton>
          </Paper>
        ))}
      </Stack>
      
      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Button variant="outlined" color="success" size="large" sx={{ borderRadius: 4, fontWeight: 'bold', px: 4 }}>
          Post Achievement
        </Button>
      </Box>
    </Container>
  );
}