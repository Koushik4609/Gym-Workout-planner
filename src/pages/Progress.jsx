import { useState, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Scale, Camera, Upload, ArrowRight, BrainCircuit } from 'lucide-react';
import { useData } from '../contexts/DataContext';

export default function Progress() {
  const { profile, weightLogs } = useData();
  const [photos, setPhotos] = useState([]);

  // AI Transformation Predictor Logic (Mathematical Regression)
  const projectionData = useMemo(() => {
    if (weightLogs.length < 2) return [];
    
    // Simple linear regression
    const n = weightLogs.length;
    let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;
    
    const startDate = new Date(weightLogs[0].date).getTime();
    
    const processed = weightLogs.map((log, i) => {
      const x = (new Date(log.date).getTime() - startDate) / (1000 * 60 * 60 * 24); // Days since start
      const y = log.weight;
      sumX += x;
      sumY += y;
      sumXY += x * y;
      sumXX += x * x;
      return { date: log.date, actual: y, projected: null };
    });

    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;

    // Last date in logs
    const lastDate = new Date(weightLogs[weightLogs.length - 1].date);
    
    // Project 3 months into the future
    const projection = [];
    for (let i = 1; i <= 3; i++) {
      const futureDate = new Date(lastDate);
      futureDate.setMonth(futureDate.getMonth() + i);
      const daysSinceStart = (futureDate.getTime() - startDate) / (1000 * 60 * 60 * 24);
      const projectedWeight = intercept + (slope * daysSinceStart);
      
      projection.push({
        date: futureDate.toISOString().split('T')[0],
        actual: null,
        projected: parseFloat(projectedWeight.toFixed(1))
      });
    }

    // Connect the actual line to the projected line smoothly
    processed[processed.length - 1].projected = processed[processed.length - 1].actual;

    return [...processed, ...projection];
  }, [weightLogs]);

  function handlePhotoUpload(e) {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPhotos([{ url, date: new Date().toLocaleDateString() }, ...photos]);
    }
  }

  return (
    <div className="animate-fadeIn page-transition">
      <div className="section-header">
        <div>
          <h2>Transformation Predictor & Tracker</h2>
          <p>Track your physical changes and see AI-driven future projections.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--space-6)', marginBottom: 'var(--space-6)' }}>
        
        {/* AI Transformation Predictor */}
        <div className="card" style={{ padding: 'var(--space-6)' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 'var(--space-4)' }}>
            <BrainCircuit size={20} color="var(--brand-primary)" /> AI Weight Projection Model
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-6)' }}>
            Based on your historical logged data, the algorithm has calculated your average rate of change and projected your weight 3 months into the future assuming diet adherence.
          </p>

          <div style={{ height: 350 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={projectionData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorProjected" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-primary)" />
                <XAxis dataKey="date" tick={{ fontSize: 12, fill: 'var(--text-tertiary)' }} axisLine={false} tickLine={false} />
                <YAxis domain={['auto', 'auto']} tick={{ fontSize: 12, fill: 'var(--text-tertiary)' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border-primary)', borderRadius: 8 }} />
                
                <Area type="monotone" dataKey="actual" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorActual)" name="Actual Weight" />
                <Area type="monotone" dataKey="projected" stroke="#f59e0b" strokeWidth={3} strokeDasharray="5 5" fillOpacity={1} fill="url(#colorProjected)" name="AI Projected" />
                
                {weightLogs && weightLogs.length > 0 && (
                  <ReferenceLine x={weightLogs[weightLogs.length - 1].date} stroke="var(--text-tertiary)" strokeDasharray="3 3" label={{ position: 'top', value: 'Today', fill: 'var(--text-tertiary)', fontSize: 12 }} />
                )}
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Current Stats */}
        <div className="card" style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}>
          <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto var(--space-4)' }}>
            <Scale size={32} color="var(--brand-primary)" />
          </div>
          <h2 style={{ fontSize: 'var(--text-4xl)', fontWeight: 800, margin: 0 }}>
            {weightLogs && weightLogs.length > 0 ? weightLogs[weightLogs.length - 1].weight : '--'} <span style={{ fontSize: 'var(--text-lg)', color: 'var(--text-tertiary)' }}>kg</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: 1, fontSize: 'var(--text-xs)', marginBottom: 'var(--space-6)' }}>Current Weight</p>
          
          <div style={{ borderTop: '1px solid var(--border-primary)', paddingTop: 'var(--space-4)', marginTop: 'var(--space-4)' }}>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', marginBottom: 8 }}>Projected Weight (90 Days)</p>
            <h3 style={{ fontSize: 'var(--text-2xl)', color: 'var(--brand-warning)', margin: 0 }}>
              {projectionData && projectionData.length > 0 ? projectionData[projectionData.length - 1].projected : '--'} <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-tertiary)' }}>kg</span>
            </h3>
          </div>
        </div>
      </div>

      {/* Physique Progress Tracker */}
      <div className="card" style={{ padding: 'var(--space-6)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Camera size={20} color="var(--brand-primary)" /> Physique Gallery</h3>
          <label className="btn btn-primary btn-sm" style={{ cursor: 'pointer' }}>
            <Upload size={14} /> Upload Photo
            <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handlePhotoUpload} />
          </label>
        </div>

        {photos.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 'var(--space-8)', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-lg)' }}>
            <Camera size={48} color="var(--text-tertiary)" style={{ margin: '0 auto var(--space-4)' }} />
            <h4 style={{ margin: '0 0 var(--space-2)' }}>No Progress Photos Yet</h4>
            <p style={{ color: 'var(--text-tertiary)', margin: 0 }}>Upload photos periodically to track your visual transformation.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 'var(--space-4)' }}>
            {photos.map((photo, i) => (
              <div key={i} style={{ position: 'relative', borderRadius: 'var(--radius-md)', overflow: 'hidden', aspectRatio: '3/4', border: '1px solid var(--border-primary)' }}>
                <img src={photo.url} alt={`Progress on ${photo.date}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 'var(--space-2)', background: 'rgba(0,0,0,0.6)', color: 'white', fontSize: 'var(--text-xs)', fontWeight: 600 }}>
                  {photo.date}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
