import { motion } from 'framer-motion';

export default function Achievements() {
  return (
    <motion.div 
      className="page-transition animate-fadeIn"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ padding: 'var(--space-6)' }}
    >
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', fontWeight: 800, marginBottom: 'var(--space-2)' }}>Achievements</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-8)' }}>Track your milestones and unlock rewards.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 'var(--space-6)' }}>
        {[
          { icon: '🏆', title: 'First Workout', locked: false, desc: 'Complete your first session.' },
          { icon: '🔥', title: '7 Day Streak', locked: false, desc: 'Workout for 7 days straight.' },
          { icon: '💪', title: '100kg Lift', locked: false, desc: 'Lift 100kg total volume.' },
          { icon: '⚡', title: 'Consistency Master', locked: true, desc: 'Complete 30 workouts.' },
          { icon: '👑', title: 'Elite Athlete', locked: true, desc: 'Reach Level 20.' },
        ].map((badge, i) => (
          <div key={i} className="card glass-premium" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, padding: 32, opacity: badge.locked ? 0.4 : 1, filter: badge.locked ? 'grayscale(100%) blur(1px)' : 'none' }}>
            <div style={{ fontSize: 48 }}>{badge.icon}</div>
            <div style={{ fontSize: 16, fontWeight: 700, textAlign: 'center' }}>{badge.title}</div>
            <div style={{ fontSize: 12, color: 'var(--text-tertiary)', textAlign: 'center' }}>{badge.desc}</div>
            {badge.locked && <div style={{ fontSize: 10, color: 'var(--text-tertiary)', marginTop: 8, textTransform: 'uppercase', letterSpacing: 1 }}>Locked</div>}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
