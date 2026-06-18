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
  const level = profile?.level || 1;
  const xp = profile?.xp || 0;
  const streak = profile?.streak || 0;
  const xpInCurrentLevel = xp % 1000;
  const progressPercent = (xpInCurrentLevel / 1000) * 100;

  // Actual Weight Data
  const hasWeightLogs = weightLogs && weightLogs.length > 0;
  const currentWeight = hasWeightLogs ? weightLogs[weightLogs.length - 1].weight : '--';
  const targetWeight = profile?.goalWeight || '--';

  const hasWorkouts = workouts && workouts.length > 0;

  // Compute Volume Data
  const volumeData = useMemo(() => {
    if (!hasWorkouts) return [];
    // Just a simple mapping of last 7 workouts for the chart
    return workouts.slice(-7).map(w => ({
      name: new Date(w.date).toLocaleDateString(undefined, { weekday: 'short' }),
      volume: w.volumeLifted || 0
    }));
  }, [workouts, hasWorkouts]);

  // Compute Radar Data (Simplified)
  const radarData = useMemo(() => {
    if (!hasWorkouts) return [];
    // In a real app, this would aggregate volume per muscle group
    return [
      { subject: 'Chest', A: 100, fullMark: 150 },
      { subject: 'Back', A: 100, fullMark: 150 },
      { subject: 'Legs', A: 100, fullMark: 150 },
      { subject: 'Arms', A: 100, fullMark: 150 },
      { subject: 'Core', A: 100, fullMark: 150 },
      { subject: 'Shoulders', A: 100, fullMark: 150 },
    ];
  }, [hasWorkouts]);

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
      {/* Top Section */}
      <motion.div variants={itemVariants} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'var(--text-3xl)', margin: 0 }}>
            Welcome back, {firstName} <span style={{ display: 'inline-block', animation: 'wave 2s infinite', transformOrigin: '70% 70%' }}>👋</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-base)', marginTop: 4 }}>
            {hasWorkouts ? "Keep up the great work!" : "Let's get started on your fitness journey."}
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

      {/* Main Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 'var(--space-6)' }}>
        
        {/* Left Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          
          <motion.div variants={itemVariants} className="card glass-premium" style={{ position: 'relative', overflow: 'hidden', border: '1px solid rgba(99, 102, 241, 0.3)' }}>
            <div style={{ position: 'absolute', top: -50, right: -50, width: 200, height: 200, background: 'var(--brand-accent)', filter: 'blur(80px)', opacity: 0.15, borderRadius: '50%' }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <span className="badge badge-primary" style={{ marginBottom: 12, display: 'inline-block' }}>Next Step</span>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 800, marginBottom: 4 }}>
                {hasWorkouts ? 'Ready for your next session?' : 'Start Your First Workout'}
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', marginBottom: 20 }}>
                {hasWorkouts ? 'Continue building your streak and crushing your goals.' : 'Log a workout to start tracking your progress.'}
              </p>
              <button className="btn btn-primary" onClick={() => navigate('/workout/active')}>
                {hasWorkouts ? 'Start Workout' : 'Create Workout'} <ChevronRight size={16} />
              </button>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="card glass-premium">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <Sparkles size={20} color="var(--brand-info)" />
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 700 }}>AI Coach Insights</h3>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', lineHeight: 1.6, marginBottom: 16 }}>
              {hasWorkouts 
                ? "You've been consistent lately! Make sure you are recovering properly and hitting your protein goals to maximize muscle growth." 
                : "Welcome to FitForge! Once you log some workouts and weight entries, I'll provide personalized insights here."}
            </p>
            <button className="btn btn-secondary btn-sm" onClick={() => navigate('/coach')}>
              <MessageSquare size={14} /> Ask Coach
            </button>
          </motion.div>

          <motion.div variants={itemVariants} className="card glass-premium">
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 700, marginBottom: 16 }}>Consistency</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 4 }}>
              {Array.from({ length: 60 }).map((_, i) => (
                <div key={i} style={{ aspectRatio: '1/1', background: 'var(--bg-tertiary)', borderRadius: 3 }} />
              ))}
            </div>
            {!hasWorkouts && (
               <p style={{ color: 'var(--text-tertiary)', fontSize: 'var(--text-xs)', marginTop: 8, textAlign: 'center' }}>
                 Your activity heatmap will appear here.
               </p>
            )}
          </motion.div>
        </div>

        {/* Right Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          
          <motion.div variants={itemVariants} className="card glass-premium" style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
            <div style={{ position: 'relative', width: 120, height: 120 }}>
              <svg width="120" height="120">
                <circle cx="60" cy="60" r="50" stroke="var(--bg-tertiary)" strokeWidth="12" fill="transparent" />
              </svg>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 900, color: 'var(--text-tertiary)' }}>--</span>
                <span style={{ fontSize: 10, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: 1 }}>Score</span>
              </div>
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                Connect a wearable device or log recovery data to calculate your score.
              </p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="card glass-premium" style={{ display: 'flex', flexDirection: 'column', height: 260 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 700 }}>Weight Journey</h3>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 24, fontWeight: 800, fontFamily: 'var(--font-display)' }}>{currentWeight} <span style={{ fontSize: 14, color: 'var(--text-tertiary)' }}>kg</span></div>
              </div>
            </div>
            <div style={{ flex: 1, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-tertiary)', fontSize: 'var(--text-sm)' }}>
              {hasWeightLogs ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={weightLogs}>
                    <defs>
                      <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--brand-accent)" stopOpacity={0.5}/>
                        <stop offset="95%" stopColor="var(--brand-accent)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Tooltip contentStyle={{ background: 'var(--bg-tertiary)', border: 'none', borderRadius: 8 }} />
                    <Area type="monotone" dataKey="weight" stroke="var(--brand-accent)" strokeWidth={3} fillOpacity={1} fill="url(#colorWeight)" />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                "Log your weight to see your journey."
              )}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="card glass-premium">
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 700, marginBottom: 16 }}>Nutrition Today</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, color: 'var(--text-tertiary)', fontSize: 'var(--text-sm)' }}>
              <p>Go to the Nutrition tab to set up your macro goals and track your daily intake.</p>
              <button className="btn btn-secondary btn-sm" onClick={() => navigate('/nutrition')}>
                Set up Nutrition Plan
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Analytics Section */}
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 800, marginTop: 'var(--space-6)' }}>Analytics</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 'var(--space-6)' }}>
        
        <motion.div variants={itemVariants} className="card glass-premium" style={{ height: 300, display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 700 }}>Muscle Balance</h3>
          <div style={{ flex: 1, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-tertiary)' }}>
            {hasWorkouts ? (
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                  <PolarGrid stroke="var(--border-secondary)" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--text-secondary)', fontSize: 11 }} />
                  <Radar name="Volume" dataKey="A" stroke="var(--brand-accent)" fill="var(--brand-accent)" fillOpacity={0.4} />
                </RadarChart>
              </ResponsiveContainer>
            ) : (
              <span style={{ fontSize: 'var(--text-sm)' }}>No workout data available yet.</span>
            )}
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="card glass-premium" style={{ height: 300, display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 700, marginBottom: 16 }}>Volume Trend (lbs)</h3>
          <div style={{ flex: 1, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-tertiary)' }}>
            {hasWorkouts ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={volumeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-secondary)" vertical={false} />
                  <XAxis dataKey="name" stroke="var(--text-tertiary)" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--text-tertiary)" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: 'var(--bg-tertiary)', border: 'none', borderRadius: 8 }} />
                  <Line type="monotone" dataKey="volume" stroke="var(--brand-primary-light)" strokeWidth={3} dot={{ r: 4, fill: 'var(--brand-primary-light)' }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <span style={{ fontSize: 'var(--text-sm)' }}>No workout data available yet.</span>
            )}
          </div>
        </motion.div>
      </div>

      {/* Achievements Section */}
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 800, marginTop: 'var(--space-6)' }}>Achievements</h2>
      <motion.div variants={itemVariants} style={{ display: 'flex', gap: 16, overflowX: 'auto', paddingBottom: 16, scrollbarWidth: 'none' }}>
        {profile?.badges && profile.badges.length > 0 ? (
          profile.badges.map((badge, i) => (
            <div key={i} className="card glass-premium" style={{ minWidth: 140, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, padding: 24 }}>
              <div style={{ fontSize: 40 }}>{badge.icon || '🏆'}</div>
              <div style={{ fontSize: 12, fontWeight: 700, textAlign: 'center' }}>{badge.title}</div>
            </div>
          ))
        ) : (
          <div className="card glass-premium" style={{ width: '100%', padding: 24, textAlign: 'center', color: 'var(--text-tertiary)' }}>
            <Award size={32} style={{ margin: '0 auto 12px' }} />
            <p>Complete workouts to earn your first achievement badge!</p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
