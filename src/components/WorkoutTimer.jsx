import { useState, useEffect, useRef, useCallback } from 'react';
import { Timer, Play, Pause, RotateCcw, X } from 'lucide-react';

const PRESETS = [
  { label: '30s', seconds: 30 },
  { label: '60s', seconds: 60 },
  { label: '90s', seconds: 90 },
  { label: '2m', seconds: 120 },
  { label: '3m', seconds: 180 },
];

export default function WorkoutTimer() {
  const [isOpen, setIsOpen] = useState(false);
  const [totalSeconds, setTotalSeconds] = useState(60);
  const [remaining, setRemaining] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState(60);
  const audioRef = useRef(null);
  const intervalRef = useRef(null);

  const stopTimer = useCallback(() => {
    setIsRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (isRunning && remaining > 0) {
      intervalRef.current = setInterval(() => {
        setRemaining(prev => {
          if (prev <= 1) {
            stopTimer();
            // Play notification sound
            try {
              const ctx = new (window.AudioContext || window.webkitAudioContext)();
              const osc = ctx.createOscillator();
              const gain = ctx.createGain();
              osc.connect(gain);
              gain.connect(ctx.destination);
              osc.frequency.value = 800;
              gain.gain.value = 0.3;
              osc.start();
              osc.stop(ctx.currentTime + 0.3);
              setTimeout(() => {
                const osc2 = ctx.createOscillator();
                const gain2 = ctx.createGain();
                osc2.connect(gain2);
                gain2.connect(ctx.destination);
                osc2.frequency.value = 1000;
                gain2.gain.value = 0.3;
                osc2.start();
                osc2.stop(ctx.currentTime + 0.4);
              }, 350);
            } catch (e) { /* audio not supported */ }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, remaining, stopTimer]);

  function selectPreset(seconds) {
    setSelectedPreset(seconds);
    setTotalSeconds(seconds);
    setRemaining(seconds);
    setIsRunning(false);
  }

  function toggleTimer() {
    if (remaining === 0) {
      setRemaining(totalSeconds);
    }
    setIsRunning(!isRunning);
  }

  function resetTimer() {
    stopTimer();
    setRemaining(totalSeconds);
  }

  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;
  const progress = totalSeconds > 0 ? (remaining / totalSeconds) : 0;
  const circumference = 2 * Math.PI * 58;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <div className="timer-widget">
      {isOpen && (
        <div className="timer-panel card glass animate-slideUp">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
            <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 700 }}>Rest Timer</h3>
            <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-tertiary)', cursor: 'pointer' }}>
              <X size={18} />
            </button>
          </div>

          <div className="timer-progress-ring">
            <svg width="140" height="140" viewBox="0 0 140 140">
              <defs>
                <linearGradient id="timer-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="50%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
              <circle className="bg" cx="70" cy="70" r="58" />
              <circle
                className="fg"
                cx="70" cy="70" r="58"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
              />
            </svg>
            <div className="timer-time-inside">
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </div>
          </div>

          <div className="timer-controls">
            <button className="btn btn-secondary btn-icon" onClick={resetTimer} title="Reset">
              <RotateCcw size={18} />
            </button>
            <button className="btn btn-primary" onClick={toggleTimer} style={{ width: 100 }}>
              {isRunning ? <><Pause size={16} /> Pause</> : <><Play size={16} /> {remaining === 0 ? 'Restart' : 'Start'}</>}
            </button>
          </div>

          <div className="timer-presets">
            {PRESETS.map(p => (
              <button
                key={p.seconds}
                className={`timer-preset ${selectedPreset === p.seconds ? 'active' : ''}`}
                onClick={() => selectPreset(p.seconds)}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      )}
      <button className="timer-fab" onClick={() => setIsOpen(!isOpen)} title="Rest Timer">
        <Timer size={24} />
      </button>
    </div>
  );
}
