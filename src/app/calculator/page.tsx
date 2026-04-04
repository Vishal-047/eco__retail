"use client";
import { useState, useEffect } from 'react';
import {
  Container, Typography, TextField, Button, Box, Paper, CircularProgress, Stack, Alert, Divider, Skeleton
} from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

// [N7 FIX] Config array for tip icons — no more brittle if/else by index
const TIP_ICONS = ['🌱', '📦', '🚚', '🏪', '♻️'];

export default function CalculatorPage() {
  const [product, setProduct] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [tips, setTips] = useState<string[]>([]);
  const [roadmap, setRoadmap] = useState<string[]>([]);
  const [tipsLoading, setTipsLoading] = useState(false);
  const [tipsError, setTipsError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResults(null);
    setTips([]);
    setRoadmap([]);
    try {
      const res = await fetch('/api/calculator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product })
      });
      if (!res.ok) throw new Error('Failed to fetch emissions');
      const data = await res.json();
      setResults(data);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!results) return;
    setTipsLoading(true);
    setTipsError(null);
    fetch(`/api/sustainability-tips?product=${encodeURIComponent(product)}`)
      .then(res => res.json())
      .then(data => {
        setTips(data.tips || []);
        setRoadmap(data.roadmap || []);
        setTipsLoading(false);
      })
      .catch(() => {
        setTipsError('Failed to load tips');
        setTipsLoading(false);
      });
  }, [results]);

  // [N2] Recharts bar chart data
  const chartData = results
    ? [
        { name: 'Manufacturing', value: results.manufacturing, color: '#2e7d32' },
        { name: 'Packaging',     value: results.packaging,     color: '#43a047' },
        { name: 'Shipping',      value: results.shipping,      color: '#66bb6a' },
      ]
    : [];

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#2e7d32' }}>
        CO₂ Calculator
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom sx={{ mb: 3 }}>
        Enter a product to estimate its CO₂ emissions for manufacturing, packaging, and shipping.
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <TextField
          label="Product Name"
          variant="outlined"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          required
          sx={{ flex: 1, minWidth: 200 }}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{ height: 56, px: 3, bgcolor: '#2e7d32', '&:hover': { bgcolor: '#1b5e20' } }}
          disabled={loading || !product.trim()}
        >
          {loading ? <CircularProgress size={22} sx={{ color: 'white' }} /> : 'Calculate'}
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      {results && (
        <>
          {/* [N2 FIX] Visual bar chart instead of plain text rows */}
          <Paper elevation={3} sx={{ p: 3, mb: 3, borderRadius: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
              Emission Breakdown
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: 'block' }}>
              kg CO₂ per unit of product
            </Typography>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={chartData} margin={{ top: 8, right: 16, left: 0, bottom: 4 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis unit=" kg" tick={{ fontSize: 11 }} />
                <Tooltip formatter={(v: any) => [`${v} kg CO₂`, '']} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <Divider sx={{ my: 2 }} />
            <Stack direction="row" justifyContent="space-between" sx={{ px: 1 }}>
              {chartData.map(row => (
                <Box key={row.name} sx={{ textAlign: 'center' }}>
                  <Typography variant="body2" color="text.secondary">{row.name}</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: row.color }}>
                    {row.value} kg
                  </Typography>
                </Box>
              ))}
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">Total</Typography>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1b5e20' }}>
                  {results.total} kg
                </Typography>
              </Box>
            </Stack>
          </Paper>

          {/* AI Tips */}
          <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>AI Sustainability Tips</Typography>
            {tipsLoading && (
              <Stack spacing={1.5}>
                {[1, 2, 3].map(i => (
                  <Skeleton key={i} variant="rounded" height={48} />
                ))}
              </Stack>
            )}
            {tipsError && <Typography color="error">{tipsError}</Typography>}
            {!tipsLoading && !tipsError && tips.length > 0 && (
              <Stack spacing={1.5} sx={{ mb: 3 }}>
                {/* [N7 FIX] Icon config array — not brittle index checks */}
                {tips.map((tip, i) => (
                  <Box
                    key={i}
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 1.5,
                      p: 1.5,
                      bgcolor: '#f1f8e9',
                      borderRadius: 2,
                    }}
                  >
                    <Typography sx={{ fontSize: 20, lineHeight: 1.4 }}>
                      {TIP_ICONS[i % TIP_ICONS.length]}
                    </Typography>
                    <Typography variant="body2" sx={{ lineHeight: 1.6 }}>{tip}</Typography>
                  </Box>
                ))}
              </Stack>
            )}

            {roadmap.length > 0 && (
              <>
                <Typography variant="h6" sx={{ mb: 1.5, fontWeight: 'bold' }}>Sustainability Roadmap</Typography>
                <Stack spacing={1}>
                  {roadmap.map((step, i) => (
                    <Box key={i} sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
                      <Box sx={{
                        width: 24, height: 24, borderRadius: '50%', bgcolor: '#2e7d32',
                        color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 12, fontWeight: 'bold', flexShrink: 0, mt: 0.2
                      }}>
                        {i + 1}
                      </Box>
                      <Typography variant="body2" sx={{ lineHeight: 1.6 }}>{step}</Typography>
                    </Box>
                  ))}
                </Stack>
              </>
            )}
          </Paper>
        </>
      )}
    </Container>
  );
}