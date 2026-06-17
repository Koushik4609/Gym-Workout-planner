import { motion } from 'framer-motion';

export default function Settings() {
  return (
    <motion.div 
      className="page-transition animate-fadeIn"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ padding: 'var(--space-6)', maxWidth: 800, margin: '0 auto' }}
    >
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', fontWeight: 800, marginBottom: 'var(--space-2)' }}>Settings</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-8)' }}>Manage your preferences and app configurations.</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
        
        <div className="card glass-premium">
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 700, marginBottom: 'var(--space-4)' }}>Notifications</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--space-4) 0', borderBottom: '1px solid var(--border-secondary)' }}>
            <div>
              <div style={{ fontWeight: 600 }}>Workout Reminders</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Get notified when it's time to train.</div>
            </div>
            <input type="checkbox" defaultChecked style={{ transform: 'scale(1.2)' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--space-4) 0' }}>
            <div>
              <div style={{ fontWeight: 600 }}>AI Coach Tips</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Receive daily insights from your AI Coach.</div>
            </div>
            <input type="checkbox" defaultChecked style={{ transform: 'scale(1.2)' }} />
          </div>
        </div>

        <div className="card glass-premium">
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 700, marginBottom: 'var(--space-4)' }}>Account</h3>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 'var(--space-4)' }}>Update your email and password from your Profile page. For account deletion or data exports, please contact support.</p>
          <button className="btn btn-secondary">Contact Support</button>
        </div>

      </div>
    </motion.div>
  );
}
