import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { calculateBMI, getBMICategory } from '../data/nutritionData';
import { User, Ruler, Weight, Calendar, Target, Dumbbell, Save, CheckCircle, Upload, Eye, Activity } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const GOALS = [
  { value: 'Muscle Gain', emoji: '💪', desc: 'Build lean muscle mass' },
  { value: 'Fat Loss', emoji: '🔥', desc: 'Burn fat, stay lean' },
  { value: 'Strength', emoji: '🏋️', desc: 'Get stronger' },
  { value: 'Athletic Performance', emoji: '🏃', desc: 'Boost power & agility' },
  { value: 'General Fitness', emoji: '⚡', desc: 'Overall health' }
];

const LEVELS = [
  { value: 'Beginner', emoji: '🌱', desc: '0-6 months' },
  { value: 'Intermediate', emoji: '🌿', desc: '6-24 months' },
  { value: 'Advanced', emoji: '🌳', desc: '2+ years' }
];

const EQUIPMENT = [
  { value: 'Full Gym', emoji: '🏢', desc: 'Full equipment' },
  { value: 'Dumbbells Only', emoji: '🏠', desc: 'Dumbbells & bench' },
  { value: 'Home Workout', emoji: '🏡', desc: 'Bodyweight only' },
  { value: 'Resistance Bands', emoji: '🎗️', desc: 'Bands & accessories' }
];

const DEFAULT_AVATARS = ['🦁', '🦊', '🦅', '🦍', '🐺', '⚡'];

export default function Profile() {
  const { currentUser } = useAuth();
  const { profile: dataProfile, prs } = useData();
  const [saved, setSaved] = useState(false);
  
  // Profile settings state
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('fitforge-profile');
    const defaultProfile = {
      name: currentUser?.displayName || '',
      age: '',
      gender: '',
      height: '',
      weight: '',
      goal: '',
      level: '',
      equipment: '',
      daysPerWeek: '',
      avatar: '👤'
    };
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return { ...defaultProfile, ...parsed };
      } catch (e) {
        return defaultProfile;
      }
    }
    return defaultProfile;
  });

  // Body Measurements State
  const [measurements, setMeasurements] = useState({
    chest: '',
    waist: '',
    hips: '',
    arms: '',
    thighs: ''
  });
  
  const [measurementsHistory, setMeasurementsHistory] = useState([]);

  // Photos State (base64 string links)
  const [photoStart, setPhotoStart] = useState('');
  const [photoCurrent, setPhotoCurrent] = useState('');

  // Load measurements & photos history on mount
  useEffect(() => {
    const history = localStorage.getItem('fitforge-measurements-history');
    if (history) setMeasurementsHistory(JSON.parse(history));

    const pStart = localStorage.getItem('fitforge-photo-start');
    if (pStart) setPhotoStart(pStart);

    const pCurrent = localStorage.getItem('fitforge-photo-current');
    if (pCurrent) setPhotoCurrent(pCurrent);
  }, []);

  function update(field, value) {
    setProfile(prev => ({ ...prev, [field]: value }));
    setSaved(false);
  }

  function handleSave(e) {
    e.preventDefault();
    localStorage.setItem('fitforge-profile', JSON.stringify(profile));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  // Handle measurement logging
  function handleLogMeasurements() {
    const keys = Object.keys(measurements);
    const hasValues = keys.some(k => measurements[k] !== '');
    if (!hasValues) return;

    const newLog = {
      date: new Date().toLocaleDateString(),
      chest: measurements.chest || '—',
      waist: measurements.waist || '—',
      hips: measurements.hips || '—',
      arms: measurements.arms || '—',
      thighs: measurements.thighs || '—'
    };

    const updatedHistory = [newLog, ...measurementsHistory];
    setMeasurementsHistory(updatedHistory);
    localStorage.setItem('fitforge-measurements-history', JSON.stringify(updatedHistory));
    
    // Reset inputs
    setMeasurements({ chest: '', waist: '', hips: '', arms: '', thighs: '' });
  }

  // Handle Photo uploading (convert to base64)
  function handlePhotoUpload(e, type) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        if (type === 'start') {
          setPhotoStart(base64String);
          localStorage.setItem('fitforge-photo-start', base64String);
        } else {
          setPhotoCurrent(base64String);
          localStorage.setItem('fitforge-photo-current', base64String);
        }
      };
      reader.readAsDataURL(file);
    }
  }

  const bmi = calculateBMI(profile.weight, profile.height);
  const bmiCat = getBMICategory(parseFloat(bmi));

  return (
    <div className="animate-fadeIn page-transition">
      <div className="section-header">
        <div>
          <h2>My Profile</h2>
          <p>Manage your metrics, measurements history, goals, and progress photos</p>
        </div>
        <button className="btn btn-primary" onClick={handleSave}>
          {saved ? <><CheckCircle size={16} /> Saved!</> : <><Save size={16} /> Save Profile</>}
        </button>
      </div>

      {/* Avatar Section */}
      <div className="card profile-avatar-section animate-slideUp glass-premium" style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
        <div 
          className="profile-avatar" 
          style={{ 
            fontSize: 'var(--text-4xl)', display: 'flex', alignItems: 'center', 
            justifyContent: 'center', background: 'var(--gradient-primary)',
            width: 80, height: 80, borderRadius: '50%'
          }}
        >
          {profile.avatar}
        </div>
        <div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800 }}>{profile.name}</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', marginBottom: 8 }}>
            {profile.level} • {profile.goal} • {profile.equipment}
          </p>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <span style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>Choose Icon:</span>
            {DEFAULT_AVATARS.map(av => (
              <button 
                key={av} 
                className="btn btn-ghost btn-sm" 
                onClick={() => update('avatar', av)}
                style={{ padding: 4, minWidth: 32, fontSize: 16, border: profile.avatar === av ? '1px solid var(--brand-primary)' : 'none' }}
              >
                {av}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Gamification Section */}
      {dataProfile && (
        <div className="card glass-premium animate-slideUp" style={{ marginTop: 'var(--space-6)', marginBottom: 'var(--space-6)', padding: 'var(--space-5)', background: 'linear-gradient(135deg, rgba(99,102,241,0.05), rgba(168,85,247,0.05))' }}>
          <h3 style={{ marginBottom: 'var(--space-4)', display: 'flex', alignItems: 'center', gap: 8 }}><Target size={20} className="text-brand-primary" /> Fitness Journey</h3>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-6)', marginBottom: 'var(--space-5)' }}>
            <div style={{ textAlign: 'center', padding: 'var(--space-3) var(--space-5)', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-lg)' }}>
              <div style={{ fontSize: 'var(--text-3xl)', fontWeight: 800, fontFamily: 'var(--font-display)', color: 'var(--brand-primary)' }}>{dataProfile.level}</div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: 1 }}>Level</div>
            </div>
            
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 'var(--text-sm)' }}>
                <span style={{ fontWeight: 600 }}>XP Progress</span>
                <span style={{ color: 'var(--text-secondary)' }}>{dataProfile.xp.toLocaleString()} XP</span>
              </div>
              <div className="progress-bar-container" style={{ height: 8, background: 'var(--bg-tertiary)', borderRadius: 4, overflow: 'hidden' }}>
                <div className="progress-bar-fill" style={{ width: `${(dataProfile.xp % 1000) / 10}%`, height: '100%', background: 'var(--gradient-primary)', borderRadius: 4 }} />
              </div>
              <div style={{ marginTop: 6, fontSize: 11, color: 'var(--text-tertiary)', textAlign: 'right' }}>
                {1000 - (dataProfile.xp % 1000)} XP to Next Level
              </div>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, color: 'var(--brand-warning)' }}>🔥 {dataProfile.streak}</div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: 1 }}>Day Streak</div>
            </div>
          </div>
          
          <div>
            <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginBottom: 8, display: 'block' }}>Unlocked Badges ({dataProfile.badges.length})</span>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {dataProfile.badges.map((badge, idx) => (
                <div key={idx} style={{ padding: '6px 12px', background: 'rgba(245,158,11,0.1)', color: 'var(--brand-warning)', borderRadius: 20, fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
                  🎖️ {badge}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Personal Records Module */}
      {prs && (
        <div className="card glass-premium animate-slideUp stagger-1" style={{ marginBottom: 'var(--space-6)' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 700, marginBottom: 'var(--space-4)' }}>
            <Activity size={20} style={{ color: 'var(--brand-primary)' }} /> Personal Records
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--space-4)' }}>
            {Object.entries(prs).map(([lift, data]) => {
              const improvement = data.current > data.previous ? ((data.current - data.previous) / data.previous * 100).toFixed(1) : 0;
              const chartData = [
                { name: 'Prev', weight: data.previous },
                { name: 'Cur', weight: data.current }
              ];
              
              return (
                <div key={lift} style={{ background: 'var(--bg-tertiary)', padding: 'var(--space-4)', borderRadius: 'var(--radius-lg)', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                    <div>
                      <div style={{ fontSize: 11, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: 1 }}>{lift}</div>
                      <div style={{ fontSize: 28, fontWeight: 900, fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>{data.current} <span style={{ fontSize: 14, color: 'var(--text-tertiary)' }}>lbs</span></div>
                    </div>
                    {improvement > 0 && (
                      <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--brand-success)', display: 'flex', alignItems: 'center', gap: 2, background: 'rgba(16,185,129,0.1)', padding: '4px 8px', borderRadius: 12 }}>
                        ↑ {improvement}%
                      </div>
                    )}
                  </div>
                  
                  <div style={{ flex: 1, minHeight: 60, marginLeft: -10, marginBottom: -10 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={chartData}>
                        <defs>
                          <linearGradient id={`color-${lift}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="var(--brand-primary)" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="var(--brand-primary)" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <Tooltip contentStyle={{ background: 'rgba(20,20,30,0.9)', border: 'none', borderRadius: 8 }} />
                        <Area type="monotone" dataKey="weight" stroke="var(--brand-primary)" fillOpacity={1} fill={`url(#color-${lift})`} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="profile-grid" style={{ marginTop: 'var(--space-6)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-6)' }}>
        
        {/* Personal Details */}
        <div className="card profile-section animate-slideUp stagger-1 glass-premium">
          <h3 style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 700 }}><User size={20} style={{ color: 'var(--brand-primary-light)' }} /> Personal Info</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div className="input-group">
              <label>Full Name</label>
              <input className="input" value={profile.name} onChange={e => update('name', e.target.value)} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
              <div className="input-group">
                <label>Age</label>
                <input className="input" type="number" value={profile.age} onChange={e => update('age', parseInt(e.target.value) || 0)} />
              </div>
              <div className="input-group">
                <label>Gender</label>
                <select className="input select" value={profile.gender} onChange={e => update('gender', e.target.value)}>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
              <div className="input-group">
                <label>Height (cm)</label>
                <input className="input" type="number" value={profile.height} onChange={e => update('height', parseInt(e.target.value) || 0)} />
              </div>
              <div className="input-group">
                <label>Weight (kg)</label>
                <input className="input" type="number" value={profile.weight} onChange={e => update('weight', parseInt(e.target.value) || 0)} />
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 10, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Body Mass Index</div>
                <div style={{ fontWeight: 800, fontSize: 'var(--text-xl)', color: bmiCat.color }}>{bmi} <span style={{ fontSize: 11, fontWeight: 400 }}>{bmiCat.label}</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Body Measurements Log Form */}
        <div className="card profile-section animate-slideUp stagger-2 glass-premium">
          <h3 style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 700 }}><Ruler size={20} style={{ color: 'var(--brand-secondary)' }} /> Body Measurements (cm)</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 'var(--space-4)' }}>
            <div className="input-group">
              <label>Chest</label>
              <input className="input" type="number" placeholder="cm" value={measurements.chest} onChange={e => setMeasurements(m => ({ ...m, chest: e.target.value }))} />
            </div>
            <div className="input-group">
              <label>Waist</label>
              <input className="input" type="number" placeholder="cm" value={measurements.waist} onChange={e => setMeasurements(m => ({ ...m, waist: e.target.value }))} />
            </div>
            <div className="input-group">
              <label>Hips</label>
              <input className="input" type="number" placeholder="cm" value={measurements.hips} onChange={e => setMeasurements(m => ({ ...m, hips: e.target.value }))} />
            </div>
            <div className="input-group">
              <label>Arms</label>
              <input className="input" type="number" placeholder="cm" value={measurements.arms} onChange={e => setMeasurements(m => ({ ...m, arms: e.target.value }))} />
            </div>
            <div className="input-group">
              <label>Thighs</label>
              <input className="input" type="number" placeholder="cm" value={measurements.thighs} onChange={e => setMeasurements(m => ({ ...m, thighs: e.target.value }))} />
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end' }}>
              <button className="btn btn-primary w-full" onClick={handleLogMeasurements} style={{ height: 42 }}>
                Log Sizes
              </button>
            </div>
          </div>

          {/* Measurements History Table */}
          <div style={{ maxHeight: 150, overflowY: 'auto', borderTop: '1px solid var(--border-primary)', paddingTop: 12 }}>
            <h4 style={{ fontSize: 11, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: 6 }}>Log History</h4>
            {measurementsHistory.length === 0 ? (
              <p style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>No dimensions logged yet.</p>
            ) : (
              <table style={{ width: '100%', fontSize: 11, borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-secondary)', color: 'var(--text-tertiary)' }}>
                    <th style={{ padding: 4 }}>Date</th>
                    <th style={{ padding: 4 }}>Chest</th>
                    <th style={{ padding: 4 }}>Waist</th>
                    <th style={{ padding: 4 }}>Hips</th>
                    <th style={{ padding: 4 }}>Arms</th>
                    <th style={{ padding: 4 }}>Thighs</th>
                  </tr>
                </thead>
                <tbody>
                  {measurementsHistory.map((m, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid var(--border-primary)' }}>
                      <td style={{ padding: 4, fontWeight: 600 }}>{m.date}</td>
                      <td style={{ padding: 4 }}>{m.chest} cm</td>
                      <td style={{ padding: 4 }}>{m.waist} cm</td>
                      <td style={{ padding: 4 }}>{m.hips} cm</td>
                      <td style={{ padding: 4 }}>{m.arms} cm</td>
                      <td style={{ padding: 4 }}>{m.thighs} cm</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Fitness Goal Selection Card */}
        <div className="card profile-section animate-slideUp stagger-3 glass-premium" style={{ gridColumn: 'span 2' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 700 }}><Target size={20} style={{ color: 'var(--brand-success)' }} /> Fitness Target Goal</h3>
          <div className="option-grid" style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}>
            {GOALS.map(g => (
              <div
                key={g.value}
                className={`option-card ${profile.goal === g.value ? 'selected' : ''}`}
                onClick={() => update('goal', g.value)}
                style={{ cursor: 'pointer' }}
              >
                <div className="option-card-icon">{g.emoji}</div>
                <div style={{ fontWeight: 600, fontSize: 13 }}>{g.value}</div>
                <div style={{ fontSize: 10, color: 'var(--text-tertiary)', marginTop: 2 }}>{g.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Progress Photos Log */}
        <div className="card profile-section animate-slideUp stagger-4 glass-premium" style={{ gridColumn: 'span 2' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 700 }}><Calendar size={20} style={{ color: 'var(--brand-warning)' }} /> physique Progress Comparison</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: 12, marginBottom: 'var(--space-4)' }}>Compare your physique shift side-by-side between Month 1 (Start) and Month 2 (Current).</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-6)', textAlign: 'center' }}>
            
            {/* Month 1: Start Photo */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
              <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>Month 1 (Baseline)</div>
              <div style={{
                width: '100%', height: 260, background: 'var(--bg-tertiary)',
                borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-secondary)',
                overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                {photoStart ? (
                  <img src={photoStart} alt="Baseline Physique" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                ) : (
                  <div style={{ color: 'var(--text-muted)', fontSize: 12 }}>No image uploaded</div>
                )}
              </div>
              <label className="btn btn-secondary btn-sm" style={{ cursor: 'pointer' }}>
                <Upload size={12} /> Upload Photo
                <input type="file" onChange={(e) => handlePhotoUpload(e, 'start')} accept="image/*" style={{ display: 'none' }} />
              </label>
            </div>

            {/* Month 2: Current Photo */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
              <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>Month 2 (Current Status)</div>
              <div style={{
                width: '100%', height: 260, background: 'var(--bg-tertiary)',
                borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-secondary)',
                overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                {photoCurrent ? (
                  <img src={photoCurrent} alt="Current Physique" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                ) : (
                  <div style={{ color: 'var(--text-muted)', fontSize: 12 }}>No image uploaded</div>
                )}
              </div>
              <label className="btn btn-secondary btn-sm" style={{ cursor: 'pointer' }}>
                <Upload size={12} /> Upload Photo
                <input type="file" onChange={(e) => handlePhotoUpload(e, 'current')} accept="image/*" style={{ display: 'none' }} />
              </label>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
