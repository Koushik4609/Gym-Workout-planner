import { useState } from 'react';
import { generateWorkoutPlan, getPlanSummary } from '../data/workoutAlgorithm';
import { generateWorkoutPlanAI } from '../services/aiService';
import { Zap, RefreshCw, Save, CheckCircle, Dumbbell, Clock, BarChart3 } from 'lucide-react';

const MUSCLE_COLORS = {
  Chest: 'badge-chest', Back: 'badge-back', Shoulders: 'badge-shoulders',
  Biceps: 'badge-biceps', Triceps: 'badge-triceps', Legs: 'badge-legs', Abs: 'badge-abs'
};

export default function WorkoutGenerator() {
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('fitforge-profile');
    const defaultProfile = {
      goal: '', level: '', equipment: '', daysPerWeek: '', splitType: ''
    };
    if (saved) {
      const parsed = JSON.parse(saved);
      return { ...defaultProfile, ...parsed };
    }
    return defaultProfile;
  });
  const [schedule, setSchedule] = useState(null);
  const [generating, setGenerating] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleGenerate() {
    setGenerating(true);
    setSaved(false);
    try {
      const plan = await generateWorkoutPlanAI(profile);
      setSchedule(plan);
    } catch (error) {
      console.error(error);
      alert("Failed to generate AI workout plan. Error: " + (error?.message || error));
    } finally {
      setGenerating(false);
    }
  }

  function handleSave() {
    localStorage.setItem('fitforge-schedule', JSON.stringify(schedule));
    // Also save these preferences back to profile
    localStorage.setItem('fitforge-profile', JSON.stringify(profile));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  const summary = schedule ? getPlanSummary(schedule) : null;
  const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <div className="animate-fadeIn page-transition">
      <div className="section-header">
        <div>
          <h2>AI Workout Generator</h2>
          <p>Generate a personalized workout plan based on your profile</p>
        </div>
      </div>

      {/* Config Card */}
      <div className="card glass-premium" style={{ padding: 'var(--space-6)', marginBottom: 'var(--space-6)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 'var(--space-4)' }}>
          <div className="input-group">
            <label>Fitness Goal</label>
            <select className="input select" value={profile.goal} onChange={e => setProfile(p => ({ ...p, goal: e.target.value }))}>
              {['Muscle Gain', 'Fat Loss', 'Strength', 'Athletic Performance', 'Endurance', 'General Fitness'].map(g => (
                <option key={g}>{g}</option>
              ))}
            </select>
          </div>
          <div className="input-group">
            <label>Experience Level</label>
            <select className="input select" value={profile.level} onChange={e => setProfile(p => ({ ...p, level: e.target.value }))}>
              {['Beginner', 'Intermediate', 'Advanced'].map(l => (
                <option key={l}>{l}</option>
              ))}
            </select>
          </div>
          <div className="input-group">
            <label>Equipment</label>
            <select className="input select" value={profile.equipment} onChange={e => setProfile(p => ({ ...p, equipment: e.target.value }))}>
              {['Full Gym', 'Dumbbells Only', 'Home Workout', 'Resistance Bands'].map(eq => (
                <option key={eq}>{eq}</option>
              ))}
            </select>
          </div>
          <div className="input-group">
            <label>Days Per Week</label>
            <select className="input select" value={profile.daysPerWeek} onChange={e => setProfile(p => ({ ...p, daysPerWeek: parseInt(e.target.value) }))}>
              <option value={3}>3 days</option>
              <option value={4}>4 days</option>
              <option value={5}>5 days</option>
              <option value={6}>6 days</option>
            </select>
          </div>
          <div className="input-group">
            <label>Workout Split Split</label>
            <select className="input select" value={profile.splitType} onChange={e => setProfile(p => ({ ...p, splitType: e.target.value }))}>
              <option value="UpperLower">Upper / Lower Split</option>
              <option value="PPL">PPL Split (Push, Pull, Legs)</option>
              <option value="Arnold">Arnold Split</option>
              <option value="FullBody">Full Body Split</option>
            </select>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-5)' }}>
          <button className="btn btn-primary btn-lg" onClick={handleGenerate} disabled={generating}>
            {generating ? (
              <><span className="spinner" style={{ width: 18, height: 18, borderWidth: 2 }} /> Generating...</>
            ) : (
              <><Zap size={18} /> Generate Workout Plan</>
            )}
          </button>
          {schedule && (
            <>
              <button className="btn btn-secondary no-print" onClick={handleGenerate}>
                <RefreshCw size={16} /> Regenerate
              </button>
              <button className="btn btn-secondary no-print" onClick={() => window.print()}>
                <Save size={16} /> Export PDF
              </button>
              <button className="btn btn-secondary no-print" onClick={handleSave}>
                {saved ? <><CheckCircle size={16} /> Saved!</> : <><Save size={16} /> Save to Schedule</>}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }} className="animate-slideUp">
          <div className="card" style={{ padding: 'var(--space-4)', textAlign: 'center' }}>
            <Dumbbell size={20} style={{ color: 'var(--brand-primary-light)', marginBottom: 4 }} />
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 800 }}>{summary.totalExercises}</div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>Total Exercises</div>
          </div>
          <div className="card" style={{ padding: 'var(--space-4)', textAlign: 'center' }}>
            <BarChart3 size={20} style={{ color: 'var(--brand-success)', marginBottom: 4 }} />
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 800 }}>{summary.trainingDays}</div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>Training Days</div>
          </div>
          <div className="card" style={{ padding: 'var(--space-4)', textAlign: 'center' }}>
            <Clock size={20} style={{ color: 'var(--brand-secondary)', marginBottom: 4 }} />
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 800 }}>{summary.restDays}</div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>Rest Days</div>
          </div>
          <div className="card" style={{ padding: 'var(--space-4)', textAlign: 'center' }}>
            <Zap size={20} style={{ color: 'var(--brand-warning)', marginBottom: 4 }} />
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 800 }}>{summary.muscleGroups.length}</div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>Muscle Groups</div>
          </div>
        </div>
      )}

      {/* Generated Plan */}
      {schedule && (
        <div className="animate-slideUp">
          {DAYS.map((day, dayIdx) => {
            const dayData = schedule[day];
            if (dayData.isRest) return null;
            return (
              <div key={day} className={`animate-slideUp stagger-${dayIdx + 1}`} style={{ marginBottom: 'var(--space-6)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-3)' }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'var(--text-xl)' }}>{day}</h3>
                  <span className="badge badge-primary">{dayData.label}</span>
                </div>
                <div className="generator-output">
                  {dayData.exercises.map((ex, i) => (
                    <div key={ex.id} className="card generated-exercise card-interactive">
                      <div className="generated-exercise-header">
                        <h4>{ex.name}</h4>
                        <span className={`badge ${MUSCLE_COLORS[ex.muscle] || 'badge-primary'}`}>{ex.muscle}</span>
                      </div>
                      <div className="generated-exercise-stats">
                        <div className="generated-exercise-stat">
                          <div className="generated-exercise-stat-value">{ex.sets}</div>
                          <div className="generated-exercise-stat-label">Sets</div>
                        </div>
                        <div className="generated-exercise-stat">
                          <div className="generated-exercise-stat-value">{ex.reps}</div>
                          <div className="generated-exercise-stat-label">Reps</div>
                        </div>
                        <div className="generated-exercise-stat">
                          <div className="generated-exercise-stat-value">{ex.rest}s</div>
                          <div className="generated-exercise-stat-label">Rest</div>
                        </div>
                      </div>
                      <div className="generated-exercise-muscle">
                        <span className={`badge badge-secondary`} style={{ fontSize: 10 }}>{ex.difficulty}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Empty State */}
      {!schedule && !generating && (
        <div className="empty-state">
          <div className="empty-state-icon">🧠</div>
          <h3>Ready to Generate Your Plan?</h3>
          <p>Configure your preferences above and let our AI create a personalized workout plan tailored to your goals.</p>
        </div>
      )}

      {/* Generating Animation */}
      {generating && (
        <div className="empty-state">
          <div className="loading-dots">
            <span /><span /><span />
          </div>
          <h3 style={{ marginTop: 'var(--space-4)' }}>AI is crafting your perfect plan...</h3>
          <p>Analyzing your profile, selecting optimal exercises, and building your split.</p>
        </div>
      )}
    </div>
  );
}
