import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, Shield, Bell, Zap, Palette, Link as LinkIcon, Download,
  Monitor, Activity, Goal,
  Clock, Heart, AlertTriangle, CheckCircle, RefreshCw, Save
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { useTheme } from '../contexts/ThemeContext';
import './Settings.css';

// Reusable Animated Switch Component
const CustomSwitch = ({ isOn, onToggle }) => (
  <motion.div
    className={`custom-switch ${isOn ? 'on' : 'off'}`}
    onClick={onToggle}
    layout
  >
    <motion.div
      className="custom-switch-handle"
      layout
      transition={{ type: 'spring', stiffness: 700, damping: 30 }}
      style={{ marginLeft: isOn ? '20px' : '0px' }}
    />
  </motion.div>
);

export default function Settings() {
  const { currentUser, logout } = useAuth();
  const { profile, updateProfile, clearWorkouts, factoryReset } = useData();
  const { themeMode, setThemeMode } = useTheme();

  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showDangerModal, setShowDangerModal] = useState(false);
  const [dangerAction, setDangerAction] = useState(null);

  // Settings State
  const [settings, setSettings] = useState({
    // Account
    name: profile?.name || currentUser?.displayName || 'Alex Fitness',
    email: profile?.email || currentUser?.email || 'alex@example.com',
    // AI Personalization
    aiPersonality: profile?.aiPersonality || 'Motivational',
    workoutDifficulty: profile?.workoutDifficulty || 'Intermediate',
    workoutDuration: profile?.workoutDuration || 45,
    daysPerWeek: profile?.daysPerWeek || 4,
    recoverySensitivity: profile?.recoverySensitivity || 50,
    aiStrength: profile?.aiStrength || 80,
    // Notifications
    notifWorkoutReminders: profile?.notifWorkoutReminders ?? true,
    notifDailyTips: profile?.notifDailyTips ?? true,
    notifNutrition: profile?.notifNutrition ?? false,
    notifProgress: profile?.notifProgress ?? true,
    notifAchievements: profile?.notifAchievements ?? true,
    notifEmail: profile?.notifEmail ?? false,
    notifPush: profile?.notifPush ?? true,
    notifWeeklySummary: profile?.notifWeeklySummary ?? true,
    // Appearance
    theme: themeMode || 'System Theme',
    accentColor: profile?.accentColor || '#6366F1',
    compactLayout: profile?.compactLayout || false,
    reducedMotion: profile?.reducedMotion || false,
    // Privacy
    twoFactorAuth: profile?.twoFactorAuth ?? true,
    // Preferences
    weightUnit: profile?.weightUnit || 'Kg',
    heightUnit: profile?.heightUnit || 'Cm',
    waterGoal: profile?.waterGoal || 3,
    calorieGoal: profile?.calorieGoal || 2500,
    // Connected Apps
    appGoogleFit: profile?.appGoogleFit ?? true,
    appAppleHealth: profile?.appAppleHealth ?? false,
    appFitbit: profile?.appFitbit ?? false,
    appGarmin: profile?.appGarmin ?? true,
    appStrava: profile?.appStrava ?? false
  });

  // Sync back from context if needed on reload
  useEffect(() => {
    if (profile) {
      setSettings(prev => ({
        ...prev,
        ...profile,
        theme: themeMode || prev.theme
      }));
    }
  }, [profile, themeMode]);

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const handleSave = () => {
    setIsSaving(true);
    
    // Save to DataContext
    updateProfile(settings);
    
    // Save theme to ThemeContext
    if (settings.theme !== themeMode) {
      setThemeMode(settings.theme);
    }
    
    setTimeout(() => {
      setIsSaving(false);
      setHasChanges(false);
    }, 800);
  };

  const triggerDangerAction = (action) => {
    setDangerAction(action);
    setShowDangerModal(true);
  };

  const confirmDangerAction = () => {
    setShowDangerModal(false);
    if (dangerAction === 'Delete Account') {
      logout();
      // In a real app you would also delete user records from DB and Auth.
      alert('Account signed out / deleted locally.');
    } else if (dangerAction === 'Clear Workout Data') {
      clearWorkouts();
      alert('Workout data cleared.');
    } else if (dangerAction === 'Factory Reset') {
      factoryReset();
      window.location.reload();
    }
  };

  const Integrations = [
    { id: 'appGoogleFit', name: 'Google Fit', color: '#EA4335', icon: Activity },
    { id: 'appAppleHealth', name: 'Apple Health', color: '#FF2D55', icon: Heart },
    { id: 'appFitbit', name: 'Fitbit', color: '#00B0B9', icon: Activity },
    { id: 'appGarmin', name: 'Garmin', color: '#000000', icon: Clock },
    { id: 'appStrava', name: 'Strava', color: '#FC4C02', icon: Activity }
  ];

  return (
    <div className="page-transition animate-fadeIn settings-container">
      
      <div style={{ marginBottom: 'var(--space-8)' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-4xl)', fontWeight: 800, marginBottom: 'var(--space-2)' }}>
          Settings
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-lg)' }}>
          Manage your account, AI preferences, and app configurations.
        </p>

        {/* Profile Stats Header */}
        <div className="settings-header-grid">
          <div className="stat-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-2)' }}>
              <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--gradient-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: 20 }}>
                {settings.name?.charAt(0) || 'A'}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 'var(--text-lg)' }}>{settings.name}</div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>{settings.email}</div>
              </div>
            </div>
            <span className="badge" style={{ background: 'var(--gradient-accent)', color: 'white', marginTop: 'var(--space-2)', display: 'inline-block' }}>Pro Member</span>
          </div>

          <div className="stat-card">
            <div style={{ color: 'var(--brand-warning)', marginBottom: 8 }}><Zap size={24} /></div>
            <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>Workout Streak</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', fontWeight: 800 }}>{profile?.streak || 0} Days</div>
          </div>

          <div className="stat-card">
            <div style={{ color: 'var(--brand-success)', marginBottom: 8 }}><Goal size={24} /></div>
            <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>Fitness Level</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', fontWeight: 800 }}>{settings.workoutDifficulty}</div>
          </div>

          <div className="stat-card">
            <div style={{ color: 'var(--brand-info)', marginBottom: 8 }}><Activity size={24} /></div>
            <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>AI Personalization</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', fontWeight: 800 }}>{settings.aiStrength}%</div>
            <div style={{ width: '100%', height: 4, background: 'rgba(255,255,255,0.1)', borderRadius: 2, marginTop: 8 }}>
              <div style={{ width: `${settings.aiStrength}%`, height: '100%', background: 'var(--gradient-info)', borderRadius: 2 }} />
            </div>
          </div>
        </div>
      </div>

      {/* Account Settings */}
      <section className="settings-section">
        <h2 className="settings-section-title"><User size={24} color="var(--brand-primary)" /> Account Settings</h2>
        <div className="settings-card">
          <div className="settings-row">
            <div className="settings-row-info">
              <span className="settings-row-title">Full Name</span>
            </div>
            <input 
              className="settings-input" 
              value={settings.name} 
              onChange={e => updateSetting('name', e.target.value)} 
            />
          </div>
          <div className="settings-row">
            <div className="settings-row-info">
              <span className="settings-row-title">Email Address</span>
            </div>
            <input 
              className="settings-input" 
              type="email"
              value={settings.email} 
              onChange={e => updateSetting('email', e.target.value)} 
            />
          </div>
          <div className="settings-row">
            <div className="settings-row-info">
              <span className="settings-row-title">Password</span>
              <span className="settings-row-desc">Last changed 3 months ago</span>
            </div>
            <button className="btn btn-secondary">Change Password</button>
          </div>
          <div className="settings-row">
            <div className="settings-row-info">
              <span className="settings-row-title">Subscription</span>
              <span className="settings-row-desc">FitForge Pro (Billed Annually)</span>
            </div>
            <button className="btn" style={{ background: 'var(--gradient-primary)', color: 'white', border: 'none' }}>Manage Subscription</button>
          </div>
        </div>
      </section>

      {/* AI Personalization */}
      <section className="settings-section">
        <h2 className="settings-section-title"><Zap size={24} color="var(--brand-warning)" /> AI Personalization Settings</h2>
        <div className="settings-card">
          <div className="settings-row">
            <div className="settings-row-info">
              <span className="settings-row-title">AI Coach Personality</span>
              <span className="settings-row-desc">How your coach communicates with you</span>
            </div>
            <select className="settings-input settings-select" value={settings.aiPersonality} onChange={e => updateSetting('aiPersonality', e.target.value)}>
              <option>Friendly</option>
              <option>Motivational</option>
              <option>Strict</option>
              <option>Professional</option>
            </select>
          </div>
          <div className="settings-row">
            <div className="settings-row-info">
              <span className="settings-row-title">Workout Difficulty</span>
            </div>
            <select className="settings-input settings-select" value={settings.workoutDifficulty} onChange={e => updateSetting('workoutDifficulty', e.target.value)}>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
              <option>Elite</option>
            </select>
          </div>
          <div className="settings-row">
            <div className="settings-row-info">
              <span className="settings-row-title">Preferred Workout Duration</span>
              <span className="settings-row-desc">{settings.workoutDuration} minutes</span>
            </div>
            <div style={{ width: '200px', display: 'flex', alignItems: 'center' }}>
              <input type="range" className="premium-range" min="15" max="120" step="15" value={settings.workoutDuration} onChange={e => updateSetting('workoutDuration', parseInt(e.target.value))} />
            </div>
          </div>
          <div className="settings-row">
            <div className="settings-row-info">
              <span className="settings-row-title">Recovery Sensitivity</span>
              <span className="settings-row-desc">How aggressively AI adapts to fatigue ({settings.recoverySensitivity}%)</span>
            </div>
            <div style={{ width: '200px', display: 'flex', alignItems: 'center' }}>
              <input type="range" className="premium-range" min="0" max="100" value={settings.recoverySensitivity} onChange={e => updateSetting('recoverySensitivity', parseInt(e.target.value))} />
            </div>
          </div>
          <div className="settings-row">
            <div className="settings-row-info">
              <span className="settings-row-title">AI Recommendation Strength</span>
              <span className="settings-row-desc">Balance between AI suggestions and your plan ({settings.aiStrength}%)</span>
            </div>
            <div style={{ width: '200px', display: 'flex', alignItems: 'center' }}>
              <input type="range" className="premium-range" min="0" max="100" value={settings.aiStrength} onChange={e => updateSetting('aiStrength', parseInt(e.target.value))} />
            </div>
          </div>
        </div>
      </section>

      {/* Notifications */}
      <section className="settings-section">
        <h2 className="settings-section-title"><Bell size={24} color="var(--brand-info)" /> Notification Settings</h2>
        <div className="settings-card">
          {[
            { id: 'notifWorkoutReminders', label: 'Workout Reminders', desc: 'Get notified when it\'s time to train' },
            { id: 'notifDailyTips', label: 'Daily AI Tips', desc: 'Receive morning insights from your AI Coach' },
            { id: 'notifNutrition', label: 'Nutrition Reminders', desc: 'Meal and hydration tracking prompts' },
            { id: 'notifProgress', label: 'Progress Reports', desc: 'Alerts when your AI recalculates your program' },
            { id: 'notifAchievements', label: 'Achievement Notifications', desc: 'When you hit new PRs or milestones' },
            { id: 'notifEmail', label: 'Email Notifications', desc: 'Receive major updates via email' },
            { id: 'notifPush', label: 'Push Notifications', desc: 'Allow direct device notifications' },
            { id: 'notifWeeklySummary', label: 'Weekly Summary', desc: 'A detailed digest every Sunday' }
          ].map(notif => (
            <div className="settings-row" key={notif.id}>
              <div className="settings-row-info">
                <span className="settings-row-title">{notif.label}</span>
                <span className="settings-row-desc">{notif.desc}</span>
              </div>
              <CustomSwitch isOn={settings[notif.id]} onToggle={() => updateSetting(notif.id, !settings[notif.id])} />
            </div>
          ))}
        </div>
      </section>

      {/* Appearance */}
      <section className="settings-section">
        <h2 className="settings-section-title"><Palette size={24} color="#8B5CF6" /> Appearance Settings</h2>
        <div className="settings-card">
          <div className="settings-row">
            <div className="settings-row-info">
              <span className="settings-row-title">App Theme</span>
            </div>
            <select className="settings-input settings-select" value={settings.theme} onChange={e => updateSetting('theme', e.target.value)}>
              <option>Light Mode</option>
              <option>Dark Mode</option>
              <option>System Theme</option>
            </select>
          </div>
          <div className="settings-row">
            <div className="settings-row-info">
              <span className="settings-row-title">Accent Color</span>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              {['#6366F1', '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'].map(color => (
                <div 
                  key={color}
                  onClick={() => updateSetting('accentColor', color)}
                  style={{ 
                    width: 24, height: 24, borderRadius: '50%', background: color, cursor: 'pointer',
                    border: settings.accentColor === color ? '2px solid var(--text-primary)' : '2px solid transparent',
                    boxShadow: settings.accentColor === color ? `0 0 10px ${color}` : 'none'
                  }} 
                />
              ))}
            </div>
          </div>
          <div className="settings-row">
            <div className="settings-row-info">
              <span className="settings-row-title">Compact Layout</span>
              <span className="settings-row-desc">Reduce spacing for more data density</span>
            </div>
            <CustomSwitch isOn={settings.compactLayout} onToggle={() => updateSetting('compactLayout', !settings.compactLayout)} />
          </div>
          <div className="settings-row">
            <div className="settings-row-info">
              <span className="settings-row-title">Reduced Motion</span>
              <span className="settings-row-desc">Disable UI animations and transitions</span>
            </div>
            <CustomSwitch isOn={settings.reducedMotion} onToggle={() => updateSetting('reducedMotion', !settings.reducedMotion)} />
          </div>
          <div style={{ padding: 'var(--space-4) var(--space-5)', borderTop: '1px solid var(--border-primary)' }}>
            <span className="settings-row-title" style={{ fontSize: 14 }}>Live Preview</span>
            <div className="theme-preview-card" style={{ background: settings.theme === 'Light Mode' ? '#ffffff' : '#121214', border: settings.theme === 'Light Mode' ? '1px solid #e5e7eb' : '1px solid rgba(255,255,255,0.1)' }}>
              <div className="theme-preview-header" style={{ background: settings.theme === 'Light Mode' ? '#f3f4f6' : 'rgba(255,255,255,0.1)' }} />
              <div className="theme-preview-body" style={{ gap: settings.compactLayout ? '4px' : '8px' }}>
                <div className="theme-preview-element" style={{ background: settings.accentColor }} />
                <div className="theme-preview-element-alt" style={{ background: settings.theme === 'Light Mode' ? '#f9fafb' : 'rgba(255,255,255,0.05)' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy & Security */}
      <section className="settings-section">
        <h2 className="settings-section-title"><Shield size={24} color="var(--brand-success)" /> Privacy & Security</h2>
        <div className="settings-card">
          <div className="settings-row">
            <div className="settings-row-info">
              <span className="settings-row-title" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                Security Status <CheckCircle size={16} color="var(--brand-success)" />
              </span>
              <span className="settings-row-desc" style={{ color: 'var(--brand-success)' }}>Account Secure</span>
            </div>
          </div>
          <div className="settings-row">
            <div className="settings-row-info">
              <span className="settings-row-title">Two-Factor Authentication</span>
              <span className="settings-row-desc">Secure your account with an extra step</span>
            </div>
            <CustomSwitch isOn={settings.twoFactorAuth} onToggle={() => updateSetting('twoFactorAuth', !settings.twoFactorAuth)} />
          </div>
          <div className="settings-row">
            <div className="settings-row-info">
              <span className="settings-row-title">Active Sessions</span>
              <span className="settings-row-desc">Manage devices currently logged in</span>
            </div>
            <button className="btn btn-secondary"><Monitor size={16} style={{ marginRight: 6 }}/> View Devices</button>
          </div>
          <div className="settings-row">
            <div className="settings-row-info">
              <span className="settings-row-title">Export Workout History</span>
              <span className="settings-row-desc">Download your data in CSV format</span>
            </div>
            <button className="btn btn-secondary"><Download size={16} style={{ marginRight: 6 }}/> Export Data</button>
          </div>
        </div>
      </section>

      {/* Connected Apps */}
      <section className="settings-section">
        <h2 className="settings-section-title"><LinkIcon size={24} color="#00B0B9" /> Connected Apps</h2>
        <div className="settings-card" style={{ padding: 0, background: 'transparent', border: 'none', boxShadow: 'none' }}>
          <div className="apps-grid">
            {Integrations.map(app => (
              <div key={app.id} className="app-integration-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div className="app-icon-wrapper" style={{ background: `${app.color}20`, color: app.color }}>
                    <app.icon size={24} />
                  </div>
                  <CustomSwitch isOn={settings[app.id]} onToggle={() => updateSetting(app.id, !settings[app.id])} />
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 16 }}>{app.name}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                    {settings[app.id] ? 'Connected • Syncing daily' : 'Not connected'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fitness Preferences */}
      <section className="settings-section">
        <h2 className="settings-section-title"><Activity size={24} color="var(--brand-primary)" /> Fitness Preferences</h2>
        <div className="settings-card">
          <div className="settings-row">
            <div className="settings-row-info">
              <span className="settings-row-title">Weight Unit</span>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className={`btn ${settings.weightUnit === 'Kg' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => updateSetting('weightUnit', 'Kg')}>Kg</button>
              <button className={`btn ${settings.weightUnit === 'Lbs' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => updateSetting('weightUnit', 'Lbs')}>Lbs</button>
            </div>
          </div>
          <div className="settings-row">
            <div className="settings-row-info">
              <span className="settings-row-title">Height Unit</span>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className={`btn ${settings.heightUnit === 'Cm' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => updateSetting('heightUnit', 'Cm')}>Cm</button>
              <button className={`btn ${settings.heightUnit === 'Feet' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => updateSetting('heightUnit', 'Feet')}>Feet</button>
            </div>
          </div>
          <div className="settings-row">
            <div className="settings-row-info">
              <span className="settings-row-title">Daily Calorie Goal</span>
            </div>
            <input className="settings-input" type="number" value={settings.calorieGoal} onChange={e => updateSetting('calorieGoal', e.target.value)} />
          </div>
          <div className="settings-row">
            <div className="settings-row-info">
              <span className="settings-row-title">Water Intake Goal (Liters)</span>
            </div>
            <input className="settings-input" type="number" step="0.5" value={settings.waterGoal} onChange={e => updateSetting('waterGoal', e.target.value)} />
          </div>
        </div>
      </section>

      {/* Advanced Section */}
      <section className="settings-section">
        <h2 className="settings-section-title"><RefreshCw size={24} color="var(--text-secondary)" /> Advanced</h2>
        <div className="settings-card">
          <div className="settings-row">
            <div className="settings-row-info">
              <span className="settings-row-title">Clear Cache</span>
              <span className="settings-row-desc">Frees up storage space on your device</span>
            </div>
            <button className="btn btn-secondary">Clear Cache</button>
          </div>
          <div className="settings-row">
            <div className="settings-row-info">
              <span className="settings-row-title">Reset AI Learning</span>
              <span className="settings-row-desc">Clears your AI coach's memory of your preferences</span>
            </div>
            <button className="btn btn-secondary">Reset AI</button>
          </div>
        </div>
      </section>

      {/* Danger Zone */}
      <section className="settings-section">
        <h2 className="settings-section-title" style={{ color: 'var(--brand-danger)' }}><AlertTriangle size={24} /> Danger Zone</h2>
        <div className="settings-card danger-zone">
          <div className="settings-row">
            <div className="settings-row-info">
              <span className="settings-row-title">Delete Account</span>
              <span className="settings-row-desc">Permanently delete your account and all data</span>
            </div>
            <button className="btn btn-danger" onClick={() => triggerDangerAction('Delete Account')}>Delete Account</button>
          </div>
          <div className="settings-row">
            <div className="settings-row-info">
              <span className="settings-row-title">Remove All Workout Data</span>
              <span className="settings-row-desc">Clear your entire workout history without deleting account</span>
            </div>
            <button className="btn btn-danger" onClick={() => triggerDangerAction('Clear Workout Data')}>Clear Data</button>
          </div>
          <div className="settings-row">
            <div className="settings-row-info">
              <span className="settings-row-title">Factory Reset Profile</span>
              <span className="settings-row-desc">Reset all settings, goals, and AI context to default</span>
            </div>
            <button className="btn btn-danger" onClick={() => triggerDangerAction('Factory Reset')}>Factory Reset</button>
          </div>
        </div>
      </section>

      {/* Floating Save Bar */}
      <AnimatePresence>
        {hasChanges && (
          <motion.div
            className="floating-action-bar"
            initial={{ y: 100, opacity: 0, x: '-50%' }}
            animate={{ y: 0, opacity: 1, x: '-50%' }}
            exit={{ y: 100, opacity: 0, x: '-50%' }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontWeight: 600, fontSize: 14 }}>Unsaved changes</span>
              <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>You have modified your settings.</span>
            </div>
            <div style={{ display: 'flex', gap: 12, marginLeft: 24 }}>
              <button 
                className="btn btn-secondary" 
                onClick={() => {
                  // Revert settings
                  setSettings(prev => ({ ...prev, ...profile, theme: themeMode }));
                  setHasChanges(false);
                }}
                disabled={isSaving}
              >
                Cancel
              </button>
              <button 
                className="btn btn-primary" 
                style={{ background: 'var(--gradient-primary)', border: 'none', color: 'white', minWidth: 120 }}
                onClick={handleSave}
                disabled={isSaving}
              >
                {isSaving ? <RefreshCw size={16} className="spin" /> : <><Save size={16} /> Save Changes</>}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Simple Danger Modal */}
      <AnimatePresence>
        {showDangerModal && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-4)' }}>
            <motion.div 
              style={{ position: 'absolute', inset: 0, background: 'var(--bg-modal)', backdropFilter: 'blur(4px)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDangerModal(false)}
            />
            <motion.div 
              className="card glass-premium"
              style={{ position: 'relative', width: '100%', maxWidth: 400, border: '1px solid rgba(239, 68, 68, 0.3)' }}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, color: 'var(--brand-danger)' }}>
                <AlertTriangle size={24} />
                <h3 style={{ fontSize: 20, fontWeight: 700 }}>Confirm Action</h3>
              </div>
              <p style={{ color: 'var(--text-secondary)', marginBottom: 24, lineHeight: 1.5 }}>
                Are you sure you want to proceed with <strong>{dangerAction}</strong>? This action is permanent and cannot be undone.
              </p>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
                <button className="btn btn-secondary" onClick={() => setShowDangerModal(false)}>Cancel</button>
                <button className="btn btn-danger" onClick={confirmDangerAction}>Confirm</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
