import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dumbbell, Clock, Flame, Trophy, Check, Play, Pause, RotateCcw, AlertCircle, ArrowLeft, Trash2 } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { motion, AnimatePresence } from 'framer-motion';
import { exercises as exerciseDB } from '../data/exercises';

function ConfettiOverlay({ active }) {
  if (!active) return null;
  return (
    <div className="confetti-container">
      {Array.from({ length: 60 }).map((_, i) => {
        const left = Math.random() * 100;
        const delay = Math.random() * 3;
        const duration = 2 + Math.random() * 2;
        const size = 6 + Math.random() * 10;
        const colors = ['#6366f1', '#06b6d4', '#f59e0b', '#10b981', '#ef4444', '#a855f7'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        return (
          <div
            key={i}
            className="confetti-piece"
            style={{
              left: `${left}%`,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
              width: `${size}px`,
              height: `${size}px`,
              backgroundColor: color,
              transform: `rotate(${Math.random() * 360}deg)`
            }}
          />
        );
      })}
      <style>{`
        .confetti-container { position: fixed; inset: 0; pointer-events: none; z-index: 9999; overflow: hidden; }
        .confetti-piece { position: absolute; top: -20px; border-radius: 2px; animation: fall linear infinite; }
        @keyframes fall { 0% { top: -20px; transform: translateY(0) rotate(0deg); opacity: 1; } 100% { top: 105vh; transform: translateY(100vh) rotate(720deg); opacity: 0; } }
      `}</style>
    </div>
  );
}

export default function ActiveWorkout() {
  const navigate = useNavigate();
  const { addWorkout, updatePr, prs } = useData();
  const [exercises, setExercises] = useState([]);
  const [selectedDay, setSelectedDay] = useState('Push Day Focus'); // Fallback if no plan

  // Timers
  const [workoutDuration, setWorkoutDuration] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [restTimeLeft, setRestTimeLeft] = useState(0);
  const [isResting, setIsResting] = useState(false);

  // PR & Celebration
  const [showPRAlert, setShowPRAlert] = useState(false);
  const [prExerciseName, setPrExerciseName] = useState('');
  const [prConfettiActive, setPrConfettiActive] = useState(false);

  // Summary Stats
  const [totalVolume, setTotalVolume] = useState(0);
  const [caloriesBurned, setCaloriesBurned] = useState(0);
  const [showSummary, setShowSummary] = useState(false);

  // Setup State
  const [isStarted, setIsStarted] = useState(false);
  const [isAddingExercise, setIsAddingExercise] = useState(false);
  const [selectedExerciseId, setSelectedExerciseId] = useState('');

  const timerRef = useRef(null);
  const restTimerRef = useRef(null);

  // Init plan
  useEffect(() => {
    // Start with an empty plan for the user to add exercises
    setExercises([]);
  }, []);

  // Main Timer
  useEffect(() => {
    if (isStarted && !isPaused && !showSummary) {
      timerRef.current = setInterval(() => {
        setWorkoutDuration(prev => {
          const next = prev + 1;
          setCaloriesBurned(Math.round((next / 60) * 8.5));
          return next;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [isStarted, isPaused, showSummary]);

  // Rest Timer
  useEffect(() => {
    if (isResting && restTimeLeft > 0) {
      restTimerRef.current = setInterval(() => {
        setRestTimeLeft(prev => {
          if (prev <= 1) {
            setIsResting(false);
            clearInterval(restTimerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(restTimerRef.current);
  }, [isResting, restTimeLeft]);

  function handleCompleteSet(exIndex, setIndex) {
    const updated = [...exercises];
    const exercise = updated[exIndex];
    const set = exercise.setsLogs[setIndex];
    
    if (set.completed) {
      set.completed = false;
      const wt = parseFloat(set.weight) || 0;
      const rp = parseInt(set.reps) || 0;
      setTotalVolume(prev => Math.max(0, prev - (wt * rp)));
      setExercises(updated);
      return;
    }

    const weightVal = parseFloat(set.weight) || 0;
    const repsVal = parseInt(set.reps) || 0;

    if (weightVal <= 0 || repsVal <= 0) {
      alert('Please log a valid weight and reps first.');
      return;
    }

    set.completed = true;
    setTotalVolume(prev => prev + (weightVal * repsVal));

    // Simple PR Check (e.g. Bench)
    const liftKey = exercise.name.toLowerCase().includes('bench') ? 'bench' : 
                    exercise.name.toLowerCase().includes('squat') ? 'squat' : 
                    exercise.name.toLowerCase().includes('deadlift') ? 'deadlift' : null;

    if (liftKey && prs) {
      const currentPR = prs[liftKey].current;
      if (weightVal > currentPR) {
        updatePr(liftKey, weightVal);
        set.isPR = true;
        setPrExerciseName(exercise.name);
        setShowPRAlert(true);
        setPrConfettiActive(true);
        setTimeout(() => { setShowPRAlert(false); setPrConfettiActive(false); }, 4000);
      }
    }

    // Trigger Rest Timer
    const restSecs = parseInt(exercise.rest) || 60;
    setRestTimeLeft(restSecs);
    setIsResting(true);
    setExercises(updated);
  }

  function handleInputChange(exIndex, setIndex, field, value) {
    const updated = [...exercises];
    updated[exIndex].setsLogs[setIndex][field] = value;
    setExercises(updated);
  }

  function formatTime(seconds) {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }

  function handleFinishWorkout() {
    const anySetCompleted = exercises.some(ex => ex.setsLogs.some(s => s.completed));
    if (!anySetCompleted) {
      if (!window.confirm('You have not logged any completed sets. Finish anyway?')) return;
    }

    // Add to Global DataContext
    addWorkout({
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      name: selectedDay,
      durationMinutes: Math.round(workoutDuration / 60),
      caloriesBurned,
      volumeLifted: totalVolume,
      exercisesCompleted: exercises.filter(ex => ex.setsLogs.some(s => s.completed)).length
    });

    setShowSummary(true);
    setIsResting(false);
  }

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1 } };

  if (showSummary) {
    return (
      <motion.div className="page-transition" variants={containerVariants} initial="hidden" animate="visible" style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
        <ConfettiOverlay active={true} />
        <div className="card glass-premium" style={{ padding: 'var(--space-8)' }}>
          <div style={{ width: 80, height: 80, background: 'var(--gradient-primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto var(--space-6)' }}>
            <Trophy size={40} color="white" />
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-4xl)', marginBottom: 'var(--space-2)' }}>Workout Complete!</h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-8)' }}>You absolutely crushed it.</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', marginBottom: 'var(--space-8)' }}>
            <div style={{ background: 'var(--bg-tertiary)', padding: 'var(--space-4)', borderRadius: 'var(--radius-lg)' }}>
              <Clock size={24} style={{ color: 'var(--brand-secondary)', margin: '0 auto var(--space-2)' }} />
              <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 800 }}>{Math.round(workoutDuration / 60)}</div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Minutes</div>
            </div>
            <div style={{ background: 'var(--bg-tertiary)', padding: 'var(--space-4)', borderRadius: 'var(--radius-lg)' }}>
              <Flame size={24} style={{ color: 'var(--brand-danger)', margin: '0 auto var(--space-2)' }} />
              <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 800 }}>{caloriesBurned}</div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Calories</div>
            </div>
            <div style={{ gridColumn: 'span 2', background: 'var(--bg-tertiary)', padding: 'var(--space-4)', borderRadius: 'var(--radius-lg)' }}>
              <Dumbbell size={24} style={{ color: 'var(--brand-primary)', margin: '0 auto var(--space-2)' }} />
              <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 800 }}>{totalVolume.toLocaleString()}</div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Lbs Volume Lifted</div>
            </div>
          </div>
          
          <button className="btn btn-primary btn-lg w-full" onClick={() => navigate('/dashboard')}>
            Return to Dashboard
          </button>
        </div>
      </motion.div>
    );
  }

  function handleAddExercise() {
    if (!selectedExerciseId) return;
    const template = exerciseDB.find(e => e.name === selectedExerciseId);
    if (!template) {
      alert("Please select a valid exercise from the list.");
      return;
    }

    const newEx = {
      id: `ex-${Date.now()}`,
      name: template.name,
      sets: 3,
      reps: '10',
      rest: 60,
      target: template.primaryMuscle,
      setsLogs: Array.from({ length: 3 }).map(() => ({ weight: '', reps: 10, completed: false, isPR: false }))
    };
    setExercises([...exercises, newEx]);
    setIsAddingExercise(false);
    setSelectedExerciseId('');
  }

  function handleRemoveExerciseSetup(index) {
    setExercises(exercises.filter((_, i) => i !== index));
  }

  if (!isStarted) {
    return (
      <motion.div className="page-transition" variants={containerVariants} initial="hidden" animate="visible" style={{ maxWidth: 800, margin: '0 auto', padding: 'var(--space-6)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
          <button className="btn btn-ghost" onClick={() => navigate('/dashboard')}><ArrowLeft size={20} /> Back</button>
          <h2 style={{ fontFamily: 'var(--font-display)', margin: 0 }}>Workout Setup</h2>
          <div style={{ width: 60 }}></div>
        </div>

        <div className="card" style={{ padding: 'var(--space-6)', marginBottom: 'var(--space-6)', background: 'var(--bg-secondary)' }}>
          <h3 style={{ marginBottom: 'var(--space-4)' }}>Planned Exercises</h3>
          {exercises.length === 0 ? (
            <p style={{ color: 'var(--text-tertiary)' }}>No exercises planned. Add some below!</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              {exercises.map((ex, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--space-3)', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-primary)' }}>
                  <div>
                    <div style={{ fontWeight: 600 }}>{ex.name}</div>
                    <div style={{ color: 'var(--text-tertiary)', fontSize: 'var(--text-sm)' }}>{ex.sets} sets • {ex.reps} reps</div>
                  </div>
                  <button className="btn btn-ghost btn-icon" style={{ color: 'var(--brand-danger)' }} onClick={() => handleRemoveExerciseSetup(idx)} title="Remove Exercise">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
          
          <div style={{ marginTop: 'var(--space-4)' }}>
            {isAddingExercise ? (
              <div style={{ padding: 'var(--space-4)', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-primary)' }}>
                <input 
                  list="exercise-search-list"
                  className="input" 
                  placeholder="Search and select an exercise..."
                  style={{ width: '100%', marginBottom: 'var(--space-3)' }}
                  value={selectedExerciseId}
                  onChange={(e) => setSelectedExerciseId(e.target.value)}
                />
                <datalist id="exercise-search-list">
                  {exerciseDB.map(ex => (
                    <option key={ex.id} value={ex.name}>{ex.primaryMuscle}</option>
                  ))}
                </datalist>
                <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
                  <button className="btn btn-primary flex-1" onClick={handleAddExercise}>Add to Workout</button>
                  <button className="btn btn-secondary flex-1" onClick={() => setIsAddingExercise(false)}>Cancel</button>
                </div>
              </div>
            ) : (
              <button className="btn btn-secondary w-full" onClick={() => setIsAddingExercise(true)}>
                + Add Exercise
              </button>
            )}
          </div>
        </div>

        <button 
          className="btn btn-primary btn-lg w-full" 
          onClick={() => setIsStarted(true)}
          disabled={exercises.length === 0}
          style={{ fontSize: 'var(--text-xl)', padding: 'var(--space-4)' }}
        >
          START WORKOUT <Play size={24} style={{ marginLeft: 8 }} />
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div className="page-transition" variants={containerVariants} initial="hidden" animate="visible" style={{ paddingBottom: '100px' }}>
      <ConfettiOverlay active={prConfettiActive} />
      
      {/* Sticky Header / Stopwatch */}
      <div style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(10, 10, 10, 0.8)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--border-primary)', padding: 'var(--space-4)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)', borderRadius: 'var(--radius-lg)' }}>
        <button className="btn btn-ghost btn-icon" onClick={() => navigate('/dashboard')}><ArrowLeft size={20} /></button>
        
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, fontFamily: 'var(--font-mono)', color: isPaused ? 'var(--text-tertiary)' : 'var(--text-primary)' }}>
            {formatTime(workoutDuration)}
          </div>
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: 1 }}>{selectedDay}</div>
        </div>
        
        <button className="btn btn-ghost btn-icon" onClick={() => setIsPaused(!isPaused)}>
          {isPaused ? <Play size={20} /> : <Pause size={20} />}
        </button>
      </div>

      {/* Floating Rest Timer Component */}
      <AnimatePresence>
        {isResting && (
          <motion.div 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            style={{ position: 'fixed', top: 80, left: '50%', transform: 'translateX(-50%)', background: 'var(--brand-primary)', color: 'white', padding: 'var(--space-3) var(--space-6)', borderRadius: 30, zIndex: 101, display: 'flex', alignItems: 'center', gap: 12, boxShadow: '0 10px 25px rgba(99,102,241,0.4)' }}
          >
            <Clock size={16} />
            <span style={{ fontWeight: 700, fontFamily: 'var(--font-mono)' }}>Rest: {formatTime(restTimeLeft)}</span>
            <button className="btn btn-ghost btn-icon" style={{ width: 24, height: 24, color: 'white' }} onClick={() => setIsResting(false)}><Check size={14} /></button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PR Alert Modal Overlay */}
      <AnimatePresence>
        {showPRAlert && (
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            style={{ position: 'fixed', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', background: 'rgba(20,20,30,0.95)', border: '2px solid var(--brand-warning)', padding: 'var(--space-6)', borderRadius: 'var(--radius-xl)', zIndex: 1000, textAlign: 'center', minWidth: 300 }}
          >
            <Trophy size={48} color="var(--brand-warning)" style={{ margin: '0 auto var(--space-3)' }} />
            <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--brand-warning)', marginBottom: 8 }}>NEW PR!</h2>
            <p style={{ color: 'var(--text-primary)' }}>You crushed your previous record for <br/><strong>{prExerciseName}</strong></p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Exercises List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', maxWidth: 800, margin: '0 auto' }}>
        {exercises.map((ex, exIndex) => (
          <div key={exIndex} className="card" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)' }}>
            <div style={{ padding: 'var(--space-4)', borderBottom: '1px solid var(--border-primary)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}><Dumbbell size={18} className="text-brand-primary" /> {ex.name}</h3>
              <span className="badge badge-secondary">{ex.target}</span>
            </div>
            
            <div style={{ padding: 'var(--space-4)' }}>
              {/* Table Header */}
              <div style={{ display: 'grid', gridTemplateColumns: '40px 1fr 1fr 60px', gap: 16, marginBottom: 8, fontSize: 11, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: 1, padding: '0 16px' }}>
                <div>Set</div>
                <div>Lbs</div>
                <div>Reps</div>
                <div style={{ textAlign: 'center' }}>Done</div>
              </div>

              {/* Sets */}
              {ex.setsLogs.map((set, setIndex) => (
                <div key={setIndex} style={{ display: 'grid', gridTemplateColumns: '40px 1fr 1fr 60px', gap: 16, alignItems: 'center', padding: '8px 16px', background: set.completed ? 'rgba(16, 185, 129, 0.05)' : 'transparent', borderRadius: 'var(--radius-md)', transition: 'background 0.3s' }}>
                  <div style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>{setIndex + 1}</div>
                  <div>
                    <input type="number" className="input" placeholder="0" value={set.weight} onChange={e => handleInputChange(exIndex, setIndex, 'weight', e.target.value)} disabled={set.completed} style={{ height: 36 }} />
                  </div>
                  <div>
                    <input type="number" className="input" placeholder="0" value={set.reps} onChange={e => handleInputChange(exIndex, setIndex, 'reps', e.target.value)} disabled={set.completed} style={{ height: 36 }} />
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <button 
                      onClick={() => handleCompleteSet(exIndex, setIndex)}
                      style={{ width: 36, height: 36, borderRadius: 'var(--radius-md)', border: set.completed ? 'none' : '2px solid var(--border-primary)', background: set.completed ? 'var(--brand-success)' : 'transparent', color: set.completed ? 'white' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s' }}
                    >
                      <Check size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Floating Action Bar */}
      <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 16, zIndex: 100, background: 'rgba(20,20,30,0.8)', backdropFilter: 'blur(12px)', padding: 'var(--space-3)', borderRadius: 30, border: '1px solid var(--border-primary)', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
        <button className="btn" style={{ background: 'var(--bg-tertiary)' }} onClick={() => setIsPaused(!isPaused)}>
          {isPaused ? <Play size={18} /> : <Pause size={18} />} {isPaused ? 'Resume' : 'Pause'}
        </button>
        <button className="btn btn-primary" onClick={handleFinishWorkout}>
          Finish Workout
        </button>
      </div>

    </motion.div>
  );
}
