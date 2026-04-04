"use client";
import React, { useState } from 'react';
import {
  Box, Container, Typography, Card, CardContent,
  Button, LinearProgress, Chip,
} from '@mui/material';
import {
  Park, ShoppingCart, Verified, CheckCircle,
  InfoOutlined, FilterList, Close, TuneRounded,
} from '@mui/icons-material';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import { products as sharedProducts } from '../../data/products';

const GreenScoreBadge = ({ score }: { score: number }) => {
  const color = score >= 80 ? '#16a34a' : score >= 60 ? '#d97706' : '#dc2626';
  const bg = score >= 80 ? '#f0fdf4' : score >= 60 ? '#fffbeb' : '#fef2f2';
  return (
    <Box sx={{
      display: 'inline-flex', alignItems: 'center', gap: 0.5,
      bgcolor: bg, color, px: 1.25, py: 0.4,
      borderRadius: 'var(--radius-pill)',
      fontSize: '0.75rem', fontWeight: 700,
      border: `1px solid ${color}30`,
    }}>
      <Park sx={{ fontSize: 13 }} /> {score}
    </Box>
  );
};

const EmissionBadge = ({ level, emissions }: { level: string; emissions: number }) => {
  const color = level === 'Low' ? '#2563eb' : level === 'Moderate' ? '#d97706' : '#dc2626';
  const bg = level === 'Low' ? '#eff6ff' : level === 'Moderate' ? '#fffbeb' : '#fef2f2';
  return (
    <Box sx={{
      display: 'inline-flex', alignItems: 'center', gap: 0.5,
      bgcolor: bg, color, px: 1.25, py: 0.4,
      borderRadius: 'var(--radius-pill)',
      fontSize: '0.75rem', fontWeight: 600,
      border: `1px solid ${color}30`,
    }}>
      {emissions} kg CO₂
    </Box>
  );
};

export default function ProductsClient() {
  const mockProducts = sharedProducts;
  const [compareSelection, setCompareSelection] = useState<any[]>([]);
  const [showCompare, setShowCompare] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [emissionFilter, setEmissionFilter] = useState('All');
  const [sortOption, setSortOption] = useState('emissions-asc');

  const categories = ['All', ...Array.from(new Set(mockProducts.map(p => p.category)))];
  const emissionLevels = ['All', 'Low', 'Moderate', 'High'];
  const sortOptions = [
    { value: 'emissions-asc', label: 'Lowest Emissions' },
    { value: 'emissions-desc', label: 'Highest Emissions' },
    { value: 'green-desc', label: 'Most Eco-Friendly' },
    { value: 'green-asc', label: 'Least Eco-Friendly' },
  ];

  let filteredProducts = mockProducts.filter((p) =>
    (categoryFilter === 'All' || p.category === categoryFilter) &&
    (emissionFilter === 'All' || p.emissionLevel === emissionFilter)
  );
  if (sortOption === 'emissions-asc') filteredProducts = [...filteredProducts].sort((a, b) => a.emissions - b.emissions);
  else if (sortOption === 'emissions-desc') filteredProducts = [...filteredProducts].sort((a, b) => b.emissions - a.emissions);
  else if (sortOption === 'green-desc') filteredProducts = [...filteredProducts].sort((a, b) => b.greenScore - a.greenScore);
  else if (sortOption === 'green-asc') filteredProducts = [...filteredProducts].sort((a, b) => a.greenScore - b.greenScore);

  const handleCompareClick = (product: any) => {
    if (compareSelection.length === 2) return;
    if (!compareSelection.find((p) => p.id === product.id)) {
      setCompareSelection((prev) => [...prev, product]);
    }
  };
  const handleRemoveCompare = (id: number) => setCompareSelection((prev) => prev.filter((p) => p.id !== id));
  const handleShowCompare = () => { if (compareSelection.length === 2) setShowCompare(true); };
  const handleCloseCompare = () => { setShowCompare(false); setCompareSelection([]); };

  const FilterPills = ({
    options, value, onChange, label,
  }: { options: string[]; value: string; onChange: (v: string) => void; label?: string }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
      {label && <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-muted)', mr: 0.5 }}>{label}:</Typography>}
      {options.map(opt => (
        <Box
          key={opt}
          onClick={() => onChange(opt)}
          sx={{
            px: 2, py: 0.6,
            borderRadius: 'var(--radius-pill)',
            bgcolor: value === opt ? 'var(--color-primary)' : 'white',
            color: value === opt ? 'white' : 'var(--color-text-secondary)',
            border: `1px solid ${value === opt ? 'var(--color-primary)' : 'var(--color-border)'}`,
            fontSize: '0.8rem', fontWeight: value === opt ? 600 : 400,
            cursor: 'pointer',
            transition: 'all var(--transition-fast)',
            '&:hover': {
              borderColor: 'var(--color-primary)',
              color: value === opt ? 'white' : 'var(--color-primary)',
            },
            userSelect: 'none',
          }}
        >
          {opt}
        </Box>
      ))}
    </Box>
  );

  return (
    <Box sx={{ bgcolor: 'var(--color-bg)', minHeight: '100vh' }}>
      {/* Page header */}
      <Box sx={{
        borderBottom: '1px solid var(--color-border)',
        bgcolor: 'white',
        py: { xs: 5, md: 7 },
      }}>
        <Container maxWidth="xl">
          <Typography
            variant="h1"
            sx={{ fontWeight: 700, fontSize: { xs: '1.8rem', md: '2.25rem' }, letterSpacing: '-0.02em', color: 'var(--color-text-primary)', mb: 1 }}
          >
            Sustainable Products
          </Typography>
          <Typography sx={{ color: 'var(--color-text-secondary)', fontSize: '1rem' }}>
            {filteredProducts.length} products · Discover eco-friendly alternatives with verified carbon emission data
          </Typography>
        </Container>
      </Box>

      {/* Filter bar */}
      <Box sx={{ bgcolor: 'white', borderBottom: '1px solid var(--color-border)', py: 2.5 }}>
        <Container maxWidth="xl">
          <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'var(--color-text-secondary)', flexShrink: 0 }}>
              <TuneRounded sx={{ fontSize: 18 }} />
              <Typography sx={{ fontSize: '0.875rem', fontWeight: 600 }}>Filters</Typography>
            </Box>
            <FilterPills options={categories} value={categoryFilter} onChange={setCategoryFilter} label="Category" />
            <FilterPills options={emissionLevels} value={emissionFilter} onChange={setEmissionFilter} label="Emissions" />
            <Box sx={{ ml: { md: 'auto' }, display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-muted)', flexShrink: 0 }}>Sort by:</Typography>
              <Box
                component="select"
                value={sortOption}
                onChange={(e: any) => setSortOption(e.target.value)}
                sx={{
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  bgcolor: 'white',
                  color: 'var(--color-text-primary)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.8rem',
                  fontWeight: 500,
                  px: 2, py: 0.7,
                  cursor: 'pointer',
                  outline: 'none',
                  '&:focus': { borderColor: 'var(--color-primary)' },
                }}
              >
                {sortOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Product grid */}
      <Container maxWidth="xl" sx={{ py: 5 }}>
        {filteredProducts.length === 0 ? (
          <Box sx={{
            textAlign: 'center', py: 16,
            border: '1px dashed var(--color-border)',
            borderRadius: 'var(--radius-lg)',
            bgcolor: 'white',
          }}>
            <Park sx={{ fontSize: 48, color: 'var(--color-text-muted)', mb: 2 }} />
            <Typography sx={{ fontWeight: 600, fontSize: '1.1rem', color: 'var(--color-text-primary)', mb: 1 }}>
              No products found
            </Typography>
            <Typography sx={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', mb: 3 }}>
              Try adjusting your filters to see more results.
            </Typography>
            <Button
              variant="outlined"
              onClick={() => { setCategoryFilter('All'); setEmissionFilter('All'); }}
              sx={{
                borderColor: 'var(--color-border)',
                color: 'var(--color-text-secondary)',
                textTransform: 'none',
                borderRadius: 'var(--radius-md)',
                fontWeight: 600,
                '&:hover': { borderColor: 'var(--color-primary)', color: 'var(--color-primary)' },
              }}
            >
              Clear filters
            </Button>
          </Box>
        ) : (
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr', xl: '1fr 1fr 1fr 1fr' },
            gap: 3,
          }}>
            {filteredProducts.map((product) => {
              const isSelected = compareSelection.find((p) => p.id === product.id);
              return (
                <Card
                  key={product.id}
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    bgcolor: 'white',
                    border: isSelected ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-lg)',
                    boxShadow: 'none',
                    transition: 'all var(--transition-base)',
                    '&:hover': {
                      boxShadow: 'var(--shadow-md)',
                      transform: 'translateY(-2px)',
                    },
                    overflow: 'hidden',
                  }}
                >
                  {/* Product image */}
                  <Box sx={{
                    height: 180,
                    backgroundImage: `url(${product.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'relative',
                    bgcolor: 'var(--color-border-soft)',
                  }}>
                    {product.ecoCertified && (
                      <Box sx={{
                        position: 'absolute', top: 12, right: 12,
                        bgcolor: 'white',
                        borderRadius: 'var(--radius-pill)',
                        px: 1.5, py: 0.4,
                        display: 'flex', alignItems: 'center', gap: 0.5,
                        boxShadow: 'var(--shadow-xs)',
                        border: '1px solid var(--color-primary-light)',
                      }}>
                        <Verified sx={{ fontSize: 13, color: 'var(--color-primary)' }} />
                        <Typography sx={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                          Eco-Certified
                        </Typography>
                      </Box>
                    )}
                  </Box>

                  <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 3, pt: 2.5 }}>
                    {/* Category */}
                    <Typography sx={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', mb: 0.75 }}>
                      {product.category}
                    </Typography>

                    {/* Name */}
                    <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: 'var(--color-text-primary)', mb: 0.25, lineHeight: 1.3 }}>
                      {product.name}
                    </Typography>
                    <Typography sx={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', mb: 2 }}>
                      {product.brand}
                    </Typography>

                    {/* Score badges */}
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 2, flexWrap: 'wrap' }}>
                      <GreenScoreBadge score={product.greenScore} />
                      <EmissionBadge level={product.emissionLevel} emissions={product.emissions} />
                      <Tooltip
                        title={
                          <Box sx={{ p: 0.5 }}>
                            <Typography variant="caption" sx={{ fontWeight: 700, display: 'block', mb: 1 }}>Emission Breakdown</Typography>
                            <Typography variant="caption" sx={{ display: 'block', mb: 0.5 }}>🏭 Manufacturing: {product.breakdown?.manufacturing ?? '—'} kg</Typography>
                            <Typography variant="caption" sx={{ display: 'block', mb: 0.5 }}>🚛 Transport: {product.breakdown?.transport ?? '—'} kg</Typography>
                            <Typography variant="caption" sx={{ display: 'block', mb: 0.5 }}>📦 Packaging: {product.breakdown?.packaging ?? '—'} kg</Typography>
                            <Typography variant="caption" sx={{ display: 'block', fontWeight: 700, mt: 0.5 }}>Total: {product.emissions} kg CO₂</Typography>
                          </Box>
                        }
                        arrow
                        placement="top"
                      >
                        <InfoOutlined sx={{ color: 'var(--color-text-muted)', fontSize: 17, cursor: 'pointer', '&:hover': { color: 'var(--color-primary)' } }} />
                      </Tooltip>
                    </Box>

                    {/* Eco score progress */}
                    <Box sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.75 }}>
                        <Typography sx={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Eco score</Typography>
                        <Typography sx={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>{product.greenScore}/100</Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={product.greenScore}
                        sx={{
                          height: 6,
                          borderRadius: 'var(--radius-pill)',
                          bgcolor: 'var(--color-border-soft)',
                          '& .MuiLinearProgress-bar': {
                            bgcolor: product.greenScore >= 80 ? 'var(--color-primary)' : product.greenScore >= 60 ? '#d97706' : '#dc2626',
                            borderRadius: 'var(--radius-pill)',
                          },
                        }}
                      />
                    </Box>

                    {/* Price */}
                    <Typography sx={{ fontWeight: 700, fontSize: '1.15rem', color: 'var(--color-text-primary)', mb: 2.5 }}>
                      ${product.price}
                    </Typography>

                    {/* Green alternative suggestion */}
                    {product.emissionLevel === 'High' && (() => {
                      const alts = mockProducts.filter(alt => alt.category === product.category && alt.emissionLevel !== 'High' && alt.id !== product.id);
                      if (!alts.length) return null;
                      const best = alts.reduce((prev, curr) => curr.emissions < prev.emissions ? curr : prev, alts[0]);
                      const savings = Math.round(100 * (1 - best.emissions / product.emissions));
                      return (
                        <Box sx={{
                          mb: 2.5, p: 2,
                          bgcolor: 'var(--color-primary-light)',
                          borderRadius: 'var(--radius-md)',
                          border: '1px solid #bbf7d0',
                          display: 'flex', alignItems: 'center', gap: 1.5,
                        }}>
                          <Avatar src={best.image} alt={best.name} sx={{ width: 36, height: 36, bgcolor: 'var(--color-primary)', flexShrink: 0 }}>
                            <Park sx={{ color: 'white', fontSize: 18 }} />
                          </Avatar>
                          <Box sx={{ flex: 1, minWidth: 0 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 0.5 }}>
                              <CheckCircle sx={{ color: 'var(--color-primary)', fontSize: 14, flexShrink: 0 }} />
                              <Typography sx={{ fontSize: '0.75rem', fontWeight: 600, color: '#15803d', lineHeight: 1.3 }}>
                                Try <b>{best.name}</b> · saves {savings}% emissions
                              </Typography>
                            </Box>
                            <Button
                              size="small"
                              onClick={() => {
                                let sel: any[] = [];
                                if (!compareSelection.find(p => p.id === product.id)) sel.push(product);
                                if (!compareSelection.find(p => p.id === best.id)) sel.push(best);
                                if (sel.length === 0) { setShowCompare(true); return; }
                                setCompareSelection(sel);
                                setTimeout(() => setShowCompare(true), 0);
                              }}
                              sx={{
                                fontSize: '0.7rem', fontWeight: 700,
                                color: 'var(--color-primary)',
                                textTransform: 'none',
                                p: 0,
                                minWidth: 0,
                                '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' },
                              }}
                            >
                              Compare →
                            </Button>
                          </Box>
                        </Box>
                      );
                    })()}

                    {/* CTA Buttons */}
                    <Box sx={{ mt: 'auto', display: 'flex', flexDirection: 'column', gap: 1 }}>
                      <Button
                        variant="contained"
                        startIcon={<ShoppingCart sx={{ fontSize: 18 }} />}
                        sx={{
                          bgcolor: 'var(--color-primary)',
                          color: 'white',
                          fontWeight: 600,
                          fontSize: '0.875rem',
                          py: 1.2,
                          textTransform: 'none',
                          borderRadius: 'var(--radius-md)',
                          boxShadow: 'none',
                          '&:hover': { bgcolor: 'var(--color-primary-dark)', boxShadow: 'none' },
                          transition: 'all var(--transition-fast)',
                        }}
                      >
                        Add to Cart
                      </Button>
                      <Button
                        variant="outlined"
                        disabled={compareSelection.length === 2 && !isSelected}
                        onClick={() => handleCompareClick(product)}
                        sx={{
                          borderColor: isSelected ? 'var(--color-primary)' : 'var(--color-border)',
                          color: isSelected ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                          fontWeight: 600,
                          fontSize: '0.875rem',
                          py: 1.1,
                          textTransform: 'none',
                          borderRadius: 'var(--radius-md)',
                          '&:hover': { borderColor: 'var(--color-primary)', color: 'var(--color-primary)', bgcolor: 'var(--color-primary-light)' },
                          '&:disabled': { bgcolor: 'var(--color-border-soft)', borderColor: 'var(--color-border)', color: 'var(--color-text-muted)' },
                          transition: 'all var(--transition-fast)',
                        }}
                      >
                        {isSelected ? '✓ Selected for compare' : 'Compare'}
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              );
            })}
          </Box>
        )}
      </Container>

      {/* Compare floating bar */}
      {compareSelection.length === 2 && !showCompare && (
        <Box sx={{
          position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)',
          zIndex: 1500,
          bgcolor: 'var(--color-dark)',
          color: 'white',
          borderRadius: 'var(--radius-pill)',
          px: 4, py: 1.5,
          display: 'flex', alignItems: 'center', gap: 3,
          boxShadow: 'var(--shadow-xl)',
          border: '1px solid rgba(255,255,255,0.1)',
        }}>
          <Typography sx={{ fontSize: '0.875rem', fontWeight: 500 }}>
            {compareSelection.map(p => p.name).join(' vs. ')}
          </Typography>
          <Button
            variant="contained"
            onClick={handleShowCompare}
            sx={{
              bgcolor: 'var(--color-primary)', color: 'white',
              fontWeight: 700, fontSize: '0.8rem',
              textTransform: 'none',
              borderRadius: 'var(--radius-pill)',
              py: 0.7, px: 2.5,
              '&:hover': { bgcolor: 'var(--color-primary-dark)' },
            }}
          >
            Compare now
          </Button>
        </Box>
      )}

      {/* Compare modal */}
      {showCompare && compareSelection.length === 2 && (
        <Box sx={{
          position: 'fixed', inset: 0, zIndex: 2000,
          bgcolor: 'rgba(0,0,0,0.55)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          p: 3,
        }}>
          <Box sx={{
            bgcolor: 'white',
            borderRadius: 'var(--radius-xl)',
            p: { xs: 4, md: 6 },
            maxWidth: 780, width: '100%',
            maxHeight: '90vh',
            overflow: 'auto',
            boxShadow: 'var(--shadow-xl)',
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
              <Typography sx={{ fontWeight: 700, fontSize: '1.4rem', letterSpacing: '-0.01em' }}>
                Product Comparison
              </Typography>
              <Box
                onClick={handleCloseCompare}
                sx={{
                  width: 36, height: 36, borderRadius: '50%',
                  bgcolor: 'var(--color-border-soft)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer',
                  color: 'var(--color-text-secondary)',
                  '&:hover': { bgcolor: 'var(--color-border)' },
                  transition: 'all var(--transition-fast)',
                }}
              >
                <Close fontSize="small" />
              </Box>
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
              {compareSelection.map((product) => (
                <Box key={product.id} sx={{
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                }}>
                  <Box sx={{ height: 140, backgroundImage: `url(${product.image})`, backgroundSize: 'cover', backgroundPosition: 'center', bgcolor: 'var(--color-border-soft)' }} />
                  <Box sx={{ p: 3 }}>
                    <Typography sx={{ fontWeight: 700, fontSize: '1rem', mb: 0.25 }}>{product.name}</Typography>
                    <Typography sx={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', mb: 2 }}>{product.brand}</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                      {[
                        { label: 'Category', value: product.category },
                        { label: 'Emissions', value: `${product.emissions} kg CO₂` },
                        { label: 'Emission Level', value: product.emissionLevel },
                        { label: 'Green Score', value: `${product.greenScore}/100` },
                        { label: 'Price', value: `$${product.price}` },
                      ].map(row => (
                        <Box key={row.label} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 0.75, borderBottom: '1px solid var(--color-border-soft)' }}>
                          <Typography sx={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{row.label}</Typography>
                          <Typography sx={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>{row.value}</Typography>
                        </Box>
                      ))}
                      {product.ecoCertified && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, color: 'var(--color-primary)', mt: 0.5 }}>
                          <Verified sx={{ fontSize: 16 }} />
                          <Typography sx={{ fontSize: '0.8rem', fontWeight: 600 }}>Eco-Certified</Typography>
                        </Box>
                      )}
                    </Box>
                    <Button
                      size="small"
                      onClick={() => handleRemoveCompare(product.id)}
                      sx={{
                        mt: 2.5, color: 'var(--color-error)',
                        borderColor: '#fca5a5', fontSize: '0.8rem',
                        textTransform: 'none', fontWeight: 600,
                        '&:hover': { bgcolor: 'var(--color-error-bg)' },
                      }}
                      variant="outlined"
                    >
                      Remove
                    </Button>
                  </Box>
                </Box>
              ))}
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4, pt: 3, borderTop: '1px solid var(--color-border)' }}>
              <Button
                variant="contained"
                onClick={handleCloseCompare}
                sx={{
                  bgcolor: 'var(--color-primary)', color: 'white',
                  textTransform: 'none', fontWeight: 600,
                  borderRadius: 'var(--radius-md)',
                  '&:hover': { bgcolor: 'var(--color-primary-dark)' },
                }}
              >
                Done
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}
