import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { motion } from 'framer-motion';
import {
  Flame, Dumbbell, Droplets, Target, Award, CheckCircle, Clock, Activity,
  Calendar, ChevronRight, Zap, TrendingUp, Moon, HeartPulse, Sparkles, MessageSquare
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  LineChart, Line
} from 'recharts';

export default function Dashboard() {
  const { currentUser } = useAuth();
  const { profile, workouts, weightLogs } = useData();
  const navigate = useNavigate();

  const firstName = currentUser?.displayName?.split(' ')[0] || 'Athlete';

  // Gamification stats
  const level = profile?.level || 12;
  const xp = profile?.xp || 11450;
  const streak = profile?.streak || 7;
  const xpInCurrentLevel = xp % 1000;
  const progressPercent = (xpInCurrentLevel / 1000) * 100;

  // Mock Data for Premium Charts
  const recentWeightData = [
    { name: '10/1', weight: 195 }, { name: '10/8', weight: 193 },
    { name: '10/15', weight: 192 }, { name: '10/22', weight: 190 },
    { name: '10/29', weight: 188 }, { name: '11/5', weight: 187 },
    { name: '11/12', weight: 185 }, { name: '11/19', weight: 184 },
  ];
  const currentWeight = 184;
  const targetWeight = 175;

  const radarData = [
    { subject: 'Chest', A: 120, fullMark: 150 },
    { subject: 'Back', A: 98, fullMark: 150 },
    { subject: 'Legs', A: 130, fullMark: 150 },
    { subject: 'Arms', A: 110, fullMark: 150 },
    { subject: 'Core', A: 85, fullMark: 150 },
    { subject: 'Shoulders', A: 105, fullMark: 150 },
  ];

  const volumeData = [
    { name: 'Mon', volume: 4000 }, { name: 'Tue', volume: 3000 },
    { name: 'Wed', volume: 5500 }, { name: 'Thu', volume: 0 },
    { name: 'Fri', volume: 4800 }, { name: 'Sat', volume: 6200 },
    { name: 'Sun', volume: 2000 },
  ];

  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div 
      className="page-transition"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}
    >
      {/* ────────────────────────────────────────────────────────────
          TOP SECTION: KPIs & WELCOME
          ──────────────────────────────────────────────────────────── */}
      <motion.div variants={itemVariants} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'var(--text-3xl)', margin: 0 }}>
            Welcome back, {firstName} <span style={{ display: 'inline-block', animation: 'wave 2s infinite', transformOrigin: '70% 70%' }}>👋</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-base)', marginTop: 4 }}>
            You're in the top 15% of athletes this week. Keep it up.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <div className="card glass-premium" style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ background: 'rgba(99, 102, 241, 0.15)', padding: 8, borderRadius: 'var(--radius-full)' }}>
              <Zap size={18} color="var(--brand-accent)" />
            </div>
            <div>
              <div style={{ fontSize: 11, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: 1 }}>Level</div>
              <div style={{ fontSize: 18, fontWeight: 800, fontFamily: 'var(--font-display)' }}>{level}</div>
            </div>
          </div>
          <div className="card glass-premium" style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ background: 'rgba(245, 158, 11, 0.15)', padding: 8, borderRadius: 'var(--radius-full)' }}>
              <Flame size={18} color="var(--brand-warning)" />
            </div>
            <div>
              <div style={{ fontSize: 11, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: 1 }}>Streak</div>
              <div style={{ fontSize: 18, fontWeight: 800, fontFamily: 'var(--font-display)' }}>{streak} Days</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ────────────────────────────────────────────────────────────
          MAIN GRID
          ──────────────────────────────────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 'var(--space-6)' }}>
        
        {/* LEFT COLUMN */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          
          {/* 1. Today's Workout Card */}
          <motion.div variants={itemVariants} className="card glass-premium" style={{ position: 'relative', overflow: 'hidden', border: '1px solid rgba(99, 102, 241, 0.3)' }}>
            <div style={{ position: 'absolute', top: -50, right: -50, width: 200, height: 200, background: 'var(--brand-accent)', filter: 'blur(80px)', opacity: 0.15, borderRadius: '50%' }} />
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', zIndex: 1 }}>
              <div>
                <span className="badge badge-primary" style={{ marginBottom: 12, display: 'inline-block' }}>Today's Plan</span>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 800, marginBottom: 4 }}>Upper Body Power</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', marginBottom: 20 }}>Chest, Shoulders, Triceps</p>
                
                <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-primary)' }}>
                    <Clock size={16} color="var(--brand-secondary)" /> <span style={{ fontWeight: 600 }}>65 min</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-primary)' }}>
                    <Dumbbell size={16} color="var(--brand-secondary)" /> <span style={{ fontWeight: 600 }}>7 exercises</span>
                  </div>
                </div>

                <button className="btn btn-primary" onClick={() => navigate('/workout/active')}>
                  Start Workout <ChevronRight size={16} />
                </button>
              </div>
              
              {/* Progress Ring */}
              <div style={{ position: 'relative', width: 100, height: 100 }}>
                <svg width="100" height="100">
                  <circle cx="50" cy="50" r="42" stroke="var(--bg-tertiary)" strokeWidth="8" fill="transparent" />
                  <circle cx="50" cy="50" r="42" stroke="var(--brand-accent)" strokeWidth="8" fill="transparent" strokeDasharray={2 * Math.PI * 42} strokeDashoffset={2 * Math.PI * 42 * 0.25} strokeLinecap="round" style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }} />
                </svg>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 800 }}>75%</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 2. AI Coach Insights */}
          <motion.div variants={itemVariants} className="card glass-premium" style={{ background: 'linear-gradient(145deg, rgba(24,24,27,0.8) 0%, rgba(9,9,11,0.9) 100%)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <Sparkles size={20} color="var(--brand-info)" />
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 700 }}>AI Coach Insights</h3>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', lineHeight: 1.6, marginBottom: 16 }}>
              "Your recovery score is high today. I recommend increasing the weight on your Bench Press by 5% to break through your plateau. Make sure to hydrate well before the session."
            </p>
            <button className="btn btn-secondary btn-sm" onClick={() => navigate('/coach')}>
              <MessageSquare size={14} /> Ask Coach
            </button>
          </motion.div>

          {/* 3. Activity Heatmap */}
          <motion.div variants={itemVariants} className="card glass-premium">
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 700, marginBottom: 16 }}>Consistency</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 4 }}>
              {Array.from({ length: 60 }).map((_, i) => {
                const intensity = Math.random();
                let bg = 'var(--bg-tertiary)';
                if (intensity > 0.8) bg = 'var(--brand-success)';
                else if (intensity > 0.5) bg = 'rgba(52, 199, 89, 0.6)';
                else if (intensity > 0.2) bg = 'rgba(52, 199, 89, 0.3)';
                return <div key={i} style={{ aspectRatio: '1/1', background: bg, borderRadius: 3 }} />
              })}
            </div>
          </motion.div>
        </div>

        {/* RIGHT COLUMN */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          
          {/* 1. Recovery Score (WHOOP Style) */}
          <motion.div variants={itemVariants} className="card glass-premium" style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
            <div style={{ position: 'relative', width: 120, height: 120 }}>
              <svg width="120" height="120">
                <circle cx="60" cy="60" r="50" stroke="var(--bg-tertiary)" strokeWidth="12" fill="transparent" />
                <circle cx="60" cy="60" r="50" stroke="var(--brand-success)" strokeWidth="12" fill="transparent" strokeDasharray={2 * Math.PI * 50} strokeDashoffset={2 * Math.PI * 50 * 0.12} strokeLinecap="round" style={{ transform: 'rotate(-90deg)', transformOrigin: 'center', filter: 'drop-shadow(0 0 8px rgba(52,199,89,0.5))' }} />
              </svg>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 900, color: 'var(--brand-success)' }}>88</span>
                <span style={{ fontSize: 10, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: 1 }}>Recovered</span>
              </div>
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}><Moon size={14} /> Sleep</span>
                <strong style={{ fontSize: 'var(--text-sm)' }}>8h 12m</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}><HeartPulse size={14} /> RHR</span>
                <strong style={{ fontSize: 'var(--text-sm)' }}>52 bpm</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}><Activity size={14} /> HRV</span>
                <strong style={{ fontSize: 'var(--text-sm)' }}>85 ms</strong>
              </div>
            </div>
          </motion.div>

          {/* 2. Weight Journey */}
          <motion.div variants={itemVariants} className="card glass-premium" style={{ display: 'flex', flexDirection: 'column', height: 260 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 700 }}>Weight Journey</h3>
                <div style={{ color: 'var(--brand-success)', fontSize: 'var(--text-sm)', fontWeight: 600 }}>-1.0 lbs this week</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 24, fontWeight: 800, fontFamily: 'var(--font-display)' }}>{currentWeight} <span style={{ fontSize: 14, color: 'var(--text-tertiary)' }}>lbs</span></div>
                <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>Target: {targetWeight} lbs</div>
              </div>
            </div>
            <div style={{ flex: 1, width: '100%', marginLeft: -10 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={recentWeightData}>
                  <defs>
                    <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--brand-accent)" stopOpacity={0.5}/>
                      <stop offset="95%" stopColor="var(--brand-accent)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Tooltip contentStyle={{ background: 'var(--bg-tertiary)', border: 'none', borderRadius: 8, boxShadow: 'var(--shadow-md)' }} itemStyle={{ color: 'var(--text-primary)' }} />
                  <Area type="monotone" dataKey="weight" stroke="var(--brand-accent)" strokeWidth={3} fillOpacity={1} fill="url(#colorWeight)" activeDot={{ r: 6, strokeWidth: 0, fill: 'var(--brand-accent)' }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* 3. Nutrition Macros */}
          <motion.div variants={itemVariants} className="card glass-premium">
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 700, marginBottom: 16 }}>Nutrition Today</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Protein</span>
                  <strong>140g / 180g</strong>
                </div>
                <div style={{ height: 6, background: 'var(--bg-tertiary)', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ width: '77%', height: '100%', background: 'var(--brand-info)', borderRadius: 3 }} />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Calories</span>
                  <strong>2100 / 2500 kcal</strong>
                </div>
                <div style={{ height: 6, background: 'var(--bg-tertiary)', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ width: '84%', height: '100%', background: 'var(--brand-warning)', borderRadius: 3 }} />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Water</span>
                  <strong>64 / 120 oz</strong>
                </div>
                <div style={{ height: 6, background: 'var(--bg-tertiary)', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ width: '53%', height: '100%', background: '#0ea5e9', borderRadius: 3 }} />
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────────
          ADVANCED ANALYTICS SECTION
          ──────────────────────────────────────────────────────────── */}
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 800, marginTop: 'var(--space-6)' }}>Analytics</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 'var(--space-6)' }}>
        
        {/* Muscle Group Radar */}
        <motion.div variants={itemVariants} className="card glass-premium" style={{ height: 300, display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 700 }}>Muscle Balance</h3>
          <div style={{ flex: 1, width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                <PolarGrid stroke="var(--border-secondary)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--text-secondary)', fontSize: 11 }} />
                <Radar name="Volume" dataKey="A" stroke="var(--brand-accent)" fill="var(--brand-accent)" fillOpacity={0.4} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Volume Trend */}
        <motion.div variants={itemVariants} className="card glass-premium" style={{ height: 300, display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 700, marginBottom: 16 }}>Volume Trend (lbs)</h3>
          <div style={{ flex: 1, width: '100%', marginLeft: -16 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={volumeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-secondary)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--text-tertiary)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--text-tertiary)" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: 'var(--bg-tertiary)', border: 'none', borderRadius: 8 }} />
                <Line type="monotone" dataKey="volume" stroke="var(--brand-primary-light)" strokeWidth={3} dot={{ r: 4, fill: 'var(--brand-primary-light)' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* ────────────────────────────────────────────────────────────
          ACHIEVEMENTS SECTION
          ──────────────────────────────────────────────────────────── */}
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 800, marginTop: 'var(--space-6)' }}>Achievements</h2>
      <motion.div variants={itemVariants} style={{ display: 'flex', gap: 16, overflowX: 'auto', paddingBottom: 16, scrollbarWidth: 'none' }}>
        {[
          { icon: '🏆', title: 'First Workout', locked: false },
          { icon: '🔥', title: '7 Day Streak', locked: false },
          { icon: '💪', title: '100kg Lift', locked: false },
          { icon: '⚡', title: 'Consistency Master', locked: true },
          { icon: '👑', title: 'Elite Athlete', locked: true },
        ].map((badge, i) => (
          <div key={i} className="card glass-premium" style={{ minWidth: 140, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, padding: 24, opacity: badge.locked ? 0.4 : 1, filter: badge.locked ? 'grayscale(100%) blur(1px)' : 'none' }}>
            <div style={{ fontSize: 40 }}>{badge.icon}</div>
            <div style={{ fontSize: 12, fontWeight: 700, textAlign: 'center' }}>{badge.title}</div>
            {badge.locked && <div style={{ fontSize: 10, color: 'var(--text-tertiary)', marginTop: -8 }}>Locked</div>}
          </div>
        ))}
      </motion.div>

    </motion.div>
  );
}
