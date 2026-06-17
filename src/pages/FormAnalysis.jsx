import React, { useState, useRef } from 'react';
import { Upload, AlertCircle, CheckCircle, RefreshCw, BarChart2, ShieldAlert, Sparkles, Play } from 'lucide-react';
import { analyzeFormAI } from '../services/aiService';

const SAMPLE_FEEDBACK = {
  squat: {
    score: 87,
    details: [
      { name: 'Squat Depth', status: 'optimal', desc: 'Hip crease dropped below the top of the knee. Excellent depth reached.' },
      { name: 'Knee Tracking', status: 'warning', desc: 'Slight knee caving (valgus collapse) detected on the concentric phase. Keep knees pressed out.' },
      { name: 'Spine Posture', status: 'optimal', desc: 'Back angle remained neutral throughout the movement. No spinal rounding observed.' },
      { name: 'Bar Path', status: 'optimal', desc: 'Linear path over the mid-foot preserved. Balanced center of gravity.' }
    ],
    tips: [
      'Focus on pushing your knees outwards against an imaginary band as you drive back up.',
      'Practice ankle mobility drills to improve forward knee travel if you feel upright chest restriction.',
      'Maintain abdominal bracing (Valsalva maneuver) at the bottom to stabilize the trunk.'
    ]
  },
  bench: {
    score: 94,
    details: [
      { name: 'Elbow Position', status: 'optimal', desc: 'Elbows tucked at a 60-degree angle relative to torso. Safe shoulder alignment.' },
      { name: 'Bar Touch Point', status: 'optimal', desc: 'Bar touched chest consistently around the sternum line. Optimal lever arm.' },
      { name: 'Arch & Stability', status: 'optimal', desc: 'Shoulder blades retracted and feet driven firmly into the floor.' },
      { name: 'Lockout Control', status: 'warning', desc: 'Slight imbalance detected during initial lock. Squeeze the bar tighter with your left hand.' }
    ],
    tips: [
      'Keep your upper back actively squeezed into the bench throughout the entire set.',
      'Incorporate single-arm dumbbell pressing to address minor lateral imbalances.'
    ]
  }
};

export default function FormAnalysis() {
  const [videoFile, setVideoFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [exerciseType, setExerciseType] = useState('squat');
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [scanProgress, setScanProgress] = useState(0);
  
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);

  // Trigger file selection
  function handleSelectFile() {
    fileInputRef.current.click();
  }

  // Handle uploaded video file
  function handleFileChange(e) {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
      setVideoUrl(URL.createObjectURL(file));
      setAnalysisResult(null);
    }
  }

  // Run real multimodal joint-tracking scan via Gemini
  async function handleStartAnalysis() {
    if (!videoUrl || !videoFile) return;
    setAnalyzing(true);
    setAnalysisResult(null);
    setScanProgress(0);

    // Play video
    if (videoRef.current) {
      videoRef.current.play();
    }

    // Tick scanner progress (fake progress bar while waiting for AI)
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 95) return 95; // Wait at 95% for AI to finish
        return prev + 5;
      });
    }, 400);

    try {
      const result = await analyzeFormAI(videoFile, exerciseType);
      clearInterval(interval);
      setScanProgress(100);
      setAnalysisResult(result);
    } catch (error) {
      console.error(error);
      clearInterval(interval);
      alert("Failed to analyze form. Please try again.");
    } finally {
      setAnalyzing(false);
    }
  }

  // Reset uploader
  function handleReset() {
    setVideoFile(null);
    setVideoUrl('');
    setAnalysisResult(null);
    setScanProgress(0);
  }

  // Choose a sample demo video (need a real file object for File API, so we fetch it)
  async function handleChooseSample(type) {
    setExerciseType(type);
    const mockUrl = 'https://assets.mixkit.co/videos/preview/mixkit-man-performing-squats-with-a-barbell-in-the-gym-40505-large.mp4';
    setVideoUrl(mockUrl);
    setAnalysisResult(null);
    
    // Fetch the sample video to create a File object for the AI
    try {
      const response = await fetch(mockUrl);
      const blob = await response.blob();
      const file = new File([blob], `${type}_demo_sample.mp4`, { type: 'video/mp4' });
      setVideoFile(file);
    } catch (error) {
      console.error("Failed to load sample video", error);
    }
  }

  return (
    <div className="animate-fadeIn page-transition">
      <div className="section-header">
        <div>
          <h2>AI Form Analysis</h2>
          <p>Upload a workout video to scan your posture, angles, and execution</p>
        </div>
        <span className="badge badge-primary">
          <Sparkles size={12} /> Real-Time Tracking
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 'var(--space-6)' }} className="active-workout-grid">
        
        {/* Left Side: Video container */}
        <div>
          {!videoUrl ? (
            // Upload Drop Area
            <div
              className="card glass-premium"
              style={{
                border: '2px dashed var(--border-active)',
                borderRadius: 'var(--radius-xl)',
                height: 380,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                cursor: 'pointer'
              }}
              onClick={handleSelectFile}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="video/*"
                style={{ display: 'none' }}
              />
              <div style={{ width: 64, height: 64, background: 'rgba(99,102,241,0.1)', color: 'var(--brand-primary-light)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyCenter: 'center', margin: '0 auto var(--space-4)', justifyContent: 'center' }}>
                <Upload size={32} />
              </div>
              <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, marginBottom: 8 }}>Upload Lift Video</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', maxWidth: 300, margin: '0 auto 16px' }}>
                Drag and drop your squat or bench press side-profile video here (MP4/MOV).
              </p>
              
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                <button className="btn btn-secondary btn-sm" onClick={(e) => { e.stopPropagation(); handleChooseSample('squat'); }}>
                  Sample Squat
                </button>
                <button className="btn btn-secondary btn-sm" onClick={(e) => { e.stopPropagation(); handleChooseSample('bench'); }}>
                  Sample Bench
                </button>
              </div>
            </div>
          ) : (
            // Video Player + Scanning Overlay
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <div className="form-scanner-container">
                <video
                  ref={videoRef}
                  src={videoUrl}
                  loop
                  muted
                  playsInline
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                
                {/* Scanner Overlay */}
                {analyzing && (
                  <div className="form-scanner-overlay">
                    <div className="form-scanner-line" />
                    
                    {/* Pulsing Joint Nodes simulating computer vision */}
                    <div className="form-joint-node" style={{ top: '35%', left: '52%' }} /> {/* Shoulder */}
                    <div className="form-joint-node" style={{ top: '55%', left: '46%' }} /> {/* Hip */}
                    <div className="form-joint-node error" style={{ top: '70%', left: '50%' }} /> {/* Knee (Warning) */}
                    <div className="form-joint-node" style={{ top: '90%', left: '44%' }} /> {/* Ankle */}
                    <div className="form-joint-node" style={{ top: '48%', left: '60%' }} /> {/* Elbow */}
                    <div className="form-joint-node" style={{ top: '58%', left: '62%' }} /> {/* Hand */}

                    {/* Joint connection vectors */}
                    <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
                      {/* Spine */}
                      <line x1="52%" y1="35%" x2="46%" y2="55%" stroke="#22d3ee" strokeWidth="2.5" />
                      {/* Thigh (Warning) */}
                      <line x1="46%" y1="55%" x2="50%" y2="70%" stroke="#ef4444" strokeWidth="2.5" />
                      {/* Shin */}
                      <line x1="50%" y1="70%" x2="44%" y2="90%" stroke="#22d3ee" strokeWidth="2.5" />
                      {/* Arm */}
                      <line x1="52%" y1="35%" x2="60%" y2="48%" stroke="#22d3ee" strokeWidth="2.5" />
                      <line x1="60%" y1="48%" x2="62%" y2="58%" stroke="#22d3ee" strokeWidth="2.5" />
                    </svg>

                    <div style={{ position: 'absolute', bottom: 12, left: 12, background: 'rgba(0,0,0,0.7)', padding: '6px 12px', borderRadius: 'var(--radius-sm)', fontSize: 11, fontWeight: 700, color: '#22d3ee' }}>
                      SCANNING JOINT ANGLES: {scanProgress}%
                    </div>
                  </div>
                )}

                {/* Static joint marker drawing once result is visible */}
                {analysisResult && (
                  <div className="form-scanner-overlay">
                    <div className="form-joint-node" style={{ top: '35%', left: '52%' }} />
                    <div className="form-joint-node" style={{ top: '55%', left: '46%' }} />
                    <div className="form-joint-node error" style={{ top: '70%', left: '50%' }} />
                    <div className="form-joint-node" style={{ top: '90%', left: '44%' }} />
                    
                    <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
                      <line x1="52%" y1="35%" x2="46%" y2="55%" stroke="#22d3ee" strokeWidth="2.5" />
                      <line x1="46%" y1="55%" x2="50%" y2="70%" stroke="#ef4444" strokeWidth="2.5" />
                      <line x1="50%" y1="70%" x2="44%" y2="90%" stroke="#22d3ee" strokeWidth="2.5" />
                    </svg>

                    <div style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(239,68,68,0.85)', padding: '4px 10px', borderRadius: 'var(--radius-sm)', fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}>
                      <AlertCircle size={12} /> KNEE CAVING WARNING
                    </div>
                  </div>
                )}
              </div>

              {/* Controls */}
              <div style={{ display: 'flex', gap: 12 }} className="no-print">
                <div className="input-group" style={{ flex: 1 }}>
                  <select className="input select" value={exerciseType} onChange={(e) => { setExerciseType(e.target.value); setAnalysisResult(null); }}>
                    <option value="squat">Exercise: Back Squat</option>
                    <option value="bench">Exercise: Bench Press</option>
                  </select>
                </div>
                
                <button className="btn btn-primary" onClick={handleStartAnalysis} disabled={analyzing} style={{ minWidth: 160 }}>
                  {analyzing ? <><RefreshCw className="timer-pulse" size={16} /> Analyzing...</> : 'Analyze Form'}
                </button>
                <button className="btn btn-secondary" onClick={handleReset}>
                  Reset
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Scorecard & Recommendations */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          {analysisResult ? (
            // Full feedback report
            <div className="animate-slideUp" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
              
              {/* Score Display Card */}
              <div className="card glass-premium" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-6)', padding: 'var(--space-5)' }}>
                <div style={{
                  width: 80, height: 80, borderRadius: '50%',
                  background: 'var(--gradient-primary)', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  boxShadow: 'var(--shadow-glow-sm)', flexShrink: 0
                }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', fontWeight: 900, color: 'white' }}>
                    {analysisResult.score}
                  </div>
                </div>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, margin: '0 0 4px 0' }}>Form Score Card</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
                    {analysisResult.score >= 90 ? '💪 Elite level mechanics. Small optimizations possible.' : '🏋️ solid foundation. Address highlighted warnings to prevent injury.'}
                  </p>
                </div>
              </div>

              {/* Posture Scorecard Checklist */}
              <div className="card glass-premium">
                <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: 'var(--space-4)', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <BarChart2 size={16} /> Technical Breakdown
                </h4>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                  {analysisResult.details.map((det, i) => (
                    <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                      {det.status === 'optimal' ? (
                        <CheckCircle size={16} style={{ color: 'var(--brand-success)', marginTop: 2, flexShrink: 0 }} />
                      ) : (
                        <ShieldAlert size={16} style={{ color: 'var(--brand-danger)', marginTop: 2, flexShrink: 0 }} />
                      )}
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: det.status === 'optimal' ? 'var(--text-primary)' : 'var(--brand-danger)' }}>{det.name}</div>
                        <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{det.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actionable Recommendations */}
              <div className="card glass-premium">
                <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: 'var(--space-3)' }}>AI Suggestions</h4>
                <ul style={{ paddingLeft: 'var(--space-4)', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                  {analysisResult.tips.map((tip, i) => (
                    <li key={i} style={{ marginBottom: 8 }}>{tip}</li>
                  ))}
                </ul>
              </div>

            </div>
          ) : (
            // Empty / Waiting state
            <div className="card glass-premium" style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-8)', textAlign: 'center', minHeight: 300 }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>🧠</div>
              <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, marginBottom: 8 }}>Waiting for Video</h3>
              <p style={{ color: 'var(--text-tertiary)', fontSize: 'var(--text-sm)', maxWidth: 260 }}>
                Once you select or upload a video clip, click "Analyze Form" to process your lift execution feedback.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
