"use client";
import React, { useState } from 'react';
import {
  Box, Typography, Avatar, List, ListItem, ListItemAvatar, ListItemText, Chip, Button, Dialog, DialogTitle, DialogContent, DialogActions, Grid, Alert,
} from '@mui/material';
import {
  Park as EcoIcon, TrendingUp as TrendingIcon, EmojiEvents as TrophyIcon, Star as StarIcon,
  Add as AddIcon, LocalShipping as DeliveryIcon, Recycling as RecyclingIcon, Lightbulb as LightbulbIcon,
  Share as ShareIcon, Close, LocalOffer,
} from '@mui/icons-material';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface User {
  id: string;
  name: string;
  points: number;
  level: number;
  avatar: string;
  recentActions: Action[];
  discounts?: string[];
}

interface Action {
  id: string;
  type: string;
  description: string;
  points: number;
  timestamp: Date;
  icon: React.ReactNode;
}

const actionTypes = {
  'chat_question': { points: 5, description: 'Asked eco-friendly question', icon: <LightbulbIcon sx={{ fontSize: 20 }} /> },
  'delivery_calculation': { points: 10, description: 'Calculated delivery impact', icon: <DeliveryIcon sx={{ fontSize: 20 }} /> },
  'diy_project': { points: 15, description: 'Shared DIY project', icon: <RecyclingIcon sx={{ fontSize: 20 }} /> },
  'eco_tip': { points: 8, description: 'Learned eco tip', icon: <EcoIcon sx={{ fontSize: 20 }} /> },
  'carbon_footprint': { points: 12, description: 'Calculated carbon footprint', icon: <TrendingIcon sx={{ fontSize: 20 }} /> }
};

const levelThresholds = [0, 25, 50, 100, 150, 200, 300, 400, 500, 750, 1000];

function getLevel(points: number): number {
  for (let i = levelThresholds.length - 1; i >= 0; i--) {
    if (points >= levelThresholds[i]) {
      return i;
    }
  }
  return 0;
}

function getLevelTitle(level: number): string {
  const titles = ['Eco Beginner', 'Green Sprout', 'Eco Explorer', 'Sustainability Seeker', 'Green Guardian', 'Eco Enthusiast', 'Sustainability Champion', 'Eco Master', 'Green Legend', 'Sustainability Hero', 'Eco Legend'];
  return titles[level] || 'Eco Legend';
}

export default function GreenPoints({ initialUserData }: { initialUserData?: any }) {
  const queryClient = useQueryClient();
  const basePoints = initialUserData?.user?.points || initialUserData?.points || 0;
  
  const [currentUser, setCurrentUser] = useState<User>({
    id: initialUserData?.user?._id || 'local-id',
    name: initialUserData?.user?.name || 'You',
    points: basePoints,
    level: getLevel(basePoints),
    avatar: (initialUserData?.user?.name || 'Y')[0].toUpperCase(),
    recentActions: (initialUserData?.user?.activities || []).map((a: any) => ({
      ...a,
      id: a._id || Math.random().toString(),
      timestamp: new Date(a.date),
      icon: (actionTypes as any)[a.type]?.icon || <EcoIcon sx={{ fontSize: 20 }} />
    })).reverse()
  });

  const [openDialog, setOpenDialog] = useState(false);
  const [newAction, setNewAction] = useState({ type: 'chat_question', description: '' });
  const [addMsg, setAddMsg] = useState('');
  const [redeemLoading, setRedeemLoading] = useState(false);
  const [redeemMsg, setRedeemMsg] = useState('');

  const addActionMutation = useMutation({
    mutationFn: async (actionData: any) => {
      const res = await fetch('/api/user-rewards/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(actionData)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to add points');
      return data;
    },
    onSuccess: (data) => {
      setAddMsg('Action logged successfully!');
      setTimeout(() => setAddMsg(''), 3000);
      setOpenDialog(false);
      setCurrentUser(prev => ({
        ...prev,
        points: data.points,
        level: getLevel(data.points),
        recentActions: data.activities.map((a: any) => ({
           id: a._id || Math.random().toString(),
           type: a.type,
           description: a.description,
           points: a.points,
           timestamp: new Date(a.date),
           icon: (actionTypes as any)[a.type]?.icon || <EcoIcon sx={{ fontSize: 20 }} />
        })).reverse()
      }));
      queryClient.invalidateQueries({ queryKey: ['user-rewards'] });
    },
    onError: (err: any) => {
      setAddMsg(err.message || 'Failed to log action.');
    }
  });

  const handleAddAction = () => {
    addActionMutation.mutate(newAction);
  };

  const progressToNextLevel = currentUser.level < levelThresholds.length - 1 
    ? ((currentUser.points - levelThresholds[currentUser.level]) / (levelThresholds[currentUser.level + 1] - levelThresholds[currentUser.level])) * 100
    : 100;

  const users = [currentUser];
  const userRank = 1;

  return (
    <Box sx={{ pb: 8 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <Box sx={{ width: 48, height: 48, borderRadius: '12px', bgcolor: 'var(--color-primary-light)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <StarIcon sx={{ fontSize: 28 }} />
          </Box>
        </Box>
        <Typography variant="h1" component="h1" sx={{ fontWeight: 700, fontSize: { xs: '1.8rem', md: '2.4rem' }, letterSpacing: '-0.02em', color: 'var(--color-text-primary)', mb: 1.5 }}>
          Green Points Platform
        </Typography>
        <Typography sx={{ color: 'var(--color-text-secondary)', fontSize: '1.05rem', maxWidth: 500, mx: 'auto' }}>
          Earn points for making eco-friendly decisions. Compete on the leaderboard and unlock exclusive sustainable rewards.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Profile / Stats Card */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Box sx={{
            bgcolor: 'white',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-xl)',
            overflow: 'hidden',
          }}>
            {/* Header part with dark bg */}
            <Box sx={{
              bgcolor: 'var(--color-dark)',
              p: 4,
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              position: 'relative',
            }}>
              <Box sx={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at top, rgba(22,163,74,0.15), transparent 70%)' }} />
              
              <Box sx={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar sx={{
                  width: 80, height: 80, mb: 2,
                  bgcolor: 'transparent',
                  border: '2px solid rgba(255,255,255,0.2)',
                  fontSize: '2rem', fontWeight: 700,
                  boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                }}>
                  {currentUser.avatar}
                </Avatar>
                <Typography sx={{ fontWeight: 700, fontSize: '1.25rem', color: 'white', letterSpacing: '-0.01em', mb: 0.5 }}>
                  {currentUser.name}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, color: 'var(--color-primary-light)', bgcolor: 'rgba(22,163,74,0.2)', px: 1.5, py: 0.5, borderRadius: 'var(--radius-pill)', border: '1px solid rgba(22,163,74,0.3)' }}>
                  <TrophyIcon sx={{ fontSize: 16 }} />
                  <Typography sx={{ fontSize: '0.8rem', fontWeight: 600 }}>
                    {getLevelTitle(currentUser.level)}
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Bottom part with stats */}
            <Box sx={{ p: 4 }}>
              <Box sx={{ mb: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 1 }}>
                  <Typography sx={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', fontWeight: 600 }}>
                    Level {currentUser.level}
                  </Typography>
                  <Typography sx={{ color: 'var(--color-primary)', fontSize: '1.2rem', fontWeight: 700, lineHeight: 1 }}>
                    {currentUser.points} <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>pts</span>
                  </Typography>
                </Box>
                <Box sx={{ width: '100%', height: 6, bgcolor: 'var(--color-border-soft)', borderRadius: 'var(--radius-pill)', overflow: 'hidden' }}>
                  <Box sx={{ width: `${progressToNextLevel}%`, height: '100%', bgcolor: 'var(--color-primary)', borderRadius: 'var(--radius-pill)' }} />
                </Box>
                <Typography sx={{ textAlign: 'right', fontSize: '0.75rem', color: 'var(--color-text-muted)', mt: 0.75 }}>
                  {levelThresholds[currentUser.level + 1] - currentUser.points} points to Level {currentUser.level + 1}
                </Typography>
              </Box>

              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 4 }}>
                <Box sx={{ bgcolor: 'var(--color-bg)', p: 2, borderRadius: 'var(--radius-md)', textAlign: 'center', border: '1px solid var(--color-border)' }}>
                  <Typography sx={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', mb: 0.5 }}>Community Rank</Typography>
                  <Typography sx={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>#{userRank}</Typography>
                </Box>
                <Box sx={{ bgcolor: 'var(--color-bg)', p: 2, borderRadius: 'var(--radius-md)', textAlign: 'center', border: '1px solid var(--color-border)' }}>
                  <Typography sx={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', mb: 0.5 }}>Actions</Typography>
                  <Typography sx={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>{currentUser.recentActions.length}</Typography>
                </Box>
              </Box>

              <Button
                fullWidth
                variant="contained"
                startIcon={<AddIcon sx={{ fontSize: 18 }} />}
                onClick={() => setOpenDialog(true)}
                disabled={addActionMutation.isPending}
                sx={{
                  bgcolor: 'var(--color-primary)', color: 'white', py: 1.4, borderRadius: 'var(--radius-md)', fontWeight: 600, textTransform: 'none', boxShadow: 'none',
                  '&:hover': { bgcolor: 'var(--color-primary-dark)', boxShadow: 'none' }
                }}
              >
                {addActionMutation.isPending ? 'Logging...' : 'Log Eco Action'}
              </Button>
              {addMsg && <Alert severity={addActionMutation.isError ? "error" : "success"} sx={{ mt: 2, borderRadius: 'var(--radius-md)', '& .MuiAlert-message': { fontSize: '0.85rem' } }}>{addMsg}</Alert>}
            </Box>
          </Box>

          {/* Reward Redemption */}
          <Box sx={{ bgcolor: 'white', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)', p: 4, mt: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <LocalOffer sx={{ color: 'var(--color-accent-dark)', fontSize: 20 }} />
              <Typography sx={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--color-text-primary)' }}>Redeem Rewards</Typography>
            </Box>
            <Typography sx={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem', mb: 3 }}>
              Exchange your points for exclusive discounts and free eco-friendly shipping.
            </Typography>
            
            <Button
              fullWidth
              variant="outlined"
              disabled={currentUser.points < 100 || redeemLoading}
              onClick={async () => {
                setRedeemLoading(true); setRedeemMsg('');
                try {
                  const res = await fetch('/api/user-rewards/redeem', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ userId: currentUser.id }) });
                  const data = await res.json();
                  if (!res.ok) throw new Error(data.message || 'Redemption failed');
                  setRedeemMsg('Successfully redeemed!');
                  setCurrentUser(u => ({ ...u, points: data.points, discounts: data.discounts || [] }));
                } catch (err: any) { setRedeemMsg(err.message || 'Redemption failed'); }
                setRedeemLoading(false);
              }}
              sx={{
                borderColor: 'var(--color-primary)', color: 'var(--color-primary)', fontWeight: 600, py: 1.2, borderRadius: 'var(--radius-md)', textTransform: 'none',
                '&:hover': { borderColor: 'var(--color-primary-dark)', bgcolor: 'var(--color-primary-light)' },
                '&:disabled': { borderColor: 'var(--color-border)', color: 'var(--color-text-muted)' }
              }}
            >
              {redeemLoading ? 'Processing...' : 'Redeem 100 Points for 10% Off'}
            </Button>
            {redeemMsg && <Alert severity={redeemMsg.includes('failed') ? "error" : "success"} sx={{ mt: 2, borderRadius: 'var(--radius-md)', '& .MuiAlert-message': { fontSize: '0.85rem' } }}>{redeemMsg}</Alert>}
            
            {currentUser.discounts && currentUser.discounts.length > 0 && (
              <Box sx={{ mt: 3, pt: 3, borderTop: '1px solid var(--color-border-soft)' }}>
                <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', mb: 1.5 }}>Active Discounts</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {currentUser.discounts.map((d, i) => (
                    <Box key={i} sx={{ px: 2, py: 0.6, bgcolor: 'var(--color-primary-light)', color: 'var(--color-primary-dark)', fontSize: '0.8rem', fontWeight: 600, borderRadius: 'var(--radius-pill)', border: '1px dashed var(--color-primary)' }}>
                      {d}
                    </Box>
                  ))}
                </Box>
              </Box>
            )}
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          {/* Active Leaderboard */}
          <Box sx={{ bgcolor: 'white', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)', mb: 3 }}>
            <Box sx={{ p: 4, borderBottom: '1px solid var(--color-border-soft)' }}>
              <Typography sx={{ fontWeight: 700, fontSize: '1.15rem', color: 'var(--color-text-primary)' }}>Community Leaderboard</Typography>
            </Box>
            <List sx={{ p: 0 }}>
              {users.map((user, index) => (
                <ListItem key={user.id} sx={{
                  p: 3, borderBottom: '1px solid var(--color-border-soft)',
                  bgcolor: user.id === currentUser.id ? 'var(--color-bg)' : 'transparent',
                }}>
                  <Typography sx={{ width: 30, textAlign: 'center', fontWeight: 700, color: index < 3 ? 'var(--color-primary)' : 'var(--color-text-muted)', fontSize: '1.1rem', mr: 2 }}>
                    #{index + 1}
                  </Typography>
                  <ListItemAvatar>
                    <Avatar sx={{
                      width: 44, height: 44, fontSize: '1rem', fontWeight: 600,
                      bgcolor: index === 0 ? '#fef08a' : index === 1 ? '#e2e8f0' : index === 2 ? '#fed7aa' : 'var(--color-dark)',
                      color: index < 3 ? '#854d0e' : 'white',
                    }}>
                      {user.avatar}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={<Typography sx={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--color-text-primary)' }}>{user.id === currentUser.id ? 'You' : user.name}</Typography>}
                    secondary={<Box component="span" sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                      <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>Level {user.level}</span>
                      <span style={{ width: 3, height: 3, borderRadius: '50%', backgroundColor: 'var(--color-text-muted)' }} />
                      <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>{user.points} pts</span>
                    </Box>}
                  />
                  {index === 0 && <TrophyIcon sx={{ color: '#eab308' }} />}
                </ListItem>
              ))}
            </List>
          </Box>

          {/* Recent Actions */}
          <Box sx={{ bgcolor: 'white', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)' }}>
            <Box sx={{ p: 4, borderBottom: '1px solid var(--color-border-soft)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography sx={{ fontWeight: 700, fontSize: '1.15rem', color: 'var(--color-text-primary)' }}>Recent Activity</Typography>
            </Box>
            <List sx={{ p: 0 }}>
              {currentUser.recentActions.slice(0, 5).map((action, i, arr) => (
                <ListItem key={action.id} sx={{ p: 3, borderBottom: i === arr.length - 1 ? 'none' : '1px solid var(--color-border-soft)' }}>
                  <ListItemAvatar>
                    <Box sx={{ width: 40, height: 40, borderRadius: '10px', bgcolor: 'var(--color-bg)', color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--color-border)' }}>
                      {action.icon}
                    </Box>
                  </ListItemAvatar>
                  <ListItemText
                    primary={<Typography sx={{ fontWeight: 500, fontSize: '0.95rem', color: 'var(--color-text-primary)' }}>{action.description}</Typography>}
                    secondary={<span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{new Date(action.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>}
                    sx={{ m: 0 }}
                  />
                  <Box sx={{ bgcolor: 'var(--color-primary-light)', color: 'var(--color-primary-dark)', px: 1.5, py: 0.4, borderRadius: 'var(--radius-pill)', fontSize: '0.75rem', fontWeight: 700 }}>
                    +{action.points}
                  </Box>
                </ListItem>
              ))}
              {currentUser.recentActions.length === 0 && (
                <Box sx={{ py: 8, textAlign: 'center' }}>
                  <Box sx={{ width: 48, height: 48, borderRadius: '50%', bgcolor: 'var(--color-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 2 }}>
                    <TrendingIcon sx={{ color: 'var(--color-text-muted)' }} />
                  </Box>
                  <Typography sx={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>You haven't logged any actions yet.</Typography>
                </Box>
              )}
            </List>
          </Box>
        </Grid>
      </Grid>

      {/* Action Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={() => setOpenDialog(false)} 
        maxWidth="sm" 
        fullWidth
        PaperProps={{ sx: { p: 1 } }}
      >
        <DialogTitle sx={{ pb: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography sx={{ fontWeight: 700, fontSize: '1.2rem' }}>Log Eco Action</Typography>
          <Box onClick={() => setOpenDialog(false)} sx={{ cursor: 'pointer', color: 'var(--color-text-secondary)', display: 'flex' }}><Close fontSize="small" /></Box>
        </DialogTitle>
        <DialogContent sx={{ pb: 4 }}>
          <Typography sx={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', mb: 3 }}>
            What sustainable action did you accomplish today?
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box>
              <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-primary)', mb: 1 }}>Action Type</Typography>
              <Box component="select" value={newAction.type} onChange={(e: any) => setNewAction({ ...newAction, type: e.target.value })} sx={{
                width: '100%', p: 1.5, borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', outline: 'none', fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: 'var(--color-text-primary)', '&:focus': { borderColor: 'var(--color-primary)' }
              }}>
                {Object.entries(actionTypes).map(([key, action]) => (
                  <option key={key} value={key}>{action.description} (+{action.points} pts)</option>
                ))}
              </Box>
            </Box>
            <Box>
              <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-primary)', mb: 1 }}>Details (Optional)</Typography>
              <Box component="textarea" rows={3} placeholder="Add a note about this action..." value={newAction.description} onChange={(e: any) => setNewAction({ ...newAction, description: e.target.value })} sx={{
                width: '100%', p: 1.5, borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', outline: 'none', fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: 'var(--color-text-primary)', '&:focus': { borderColor: 'var(--color-primary)' }, resize: 'none'
              }} />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3, pt: 0 }}>
          <Button onClick={() => setOpenDialog(false)} sx={{ color: 'var(--color-text-secondary)', textTransform: 'none', fontWeight: 600 }}>Cancel</Button>
          <Button onClick={handleAddAction} disabled={addActionMutation.isPending} variant="contained" sx={{ bgcolor: 'var(--color-primary)', color: 'white', textTransform: 'none', fontWeight: 600, px: 3, borderRadius: 'var(--radius-md)', boxShadow: 'none', '&:hover': { bgcolor: 'var(--color-primary-dark)', boxShadow: 'none' } }}>
            Log Action
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}