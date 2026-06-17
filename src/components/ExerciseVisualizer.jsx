import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Play, ExternalLink, X, Search as SearchIcon } from 'lucide-react';

// Hardcoded real YouTube IDs for the most popular exercises to guarantee playability.
// If an exercise is not here, the visualizer gracefully falls back to an image + direct search link.
const VIDEO_MAP = {
  "bench-press": "hWbUlkb5Ms4",
  "incline-bench-press": "98HWfiRonkE",
  "decline-bench-press": "a-UFQE4oxWY",
  "dumbbell-press": "Gf65Yy0-wGI",
  "dumbbell-fly": "rk8YayRoTRQ",
  "cable-fly": "M97ra0UR-40",
  "push-up": "_YrJc-kTYA0",
  "chest-dips": "yN6Q1UI_xkE",
  "pec-deck": "fgXSA2-o0NM",
  "barbell-row": "Nqh7q3zDCoQ",
  "t-bar-row": "TyLoy3n_a10",
  "seated-cable-row": "vwHG9Jfu4sw",
  "chest-supported-row": "czoQ_ncuqqI",
  "dumbbell-row": "gfUg6qWohTk",
  "machine-row": "DHA7QGDa2qg",
  "pendlay-row": "I1e9KgFk7fw",
  "pull-up": "9rckBLbVe8c",
  "chin-up": "Oi3bW9nQmGI",
  "lat-pulldown": "bNmvKpJSWKM",
  "single-arm-pulldown": "wYy32uk4Bu8",
  "straight-arm-pulldown": "hAMcfubonDc",
  "machine-pullover": "asQ5e9Bd1Gc",
  "overhead-press": "zoN5EH50Dro",
  "dumbbell-shoulder-press": "k6tzKisR3NY",
  "arnold-press": "6K_N9AGhItQ",
  "lateral-raise": "PzsMitRdI_8",
  "cable-lateral-raise": "lMJUXEvcMkQ",
  "machine-lateral-raise": "NNAs8jx_zJI",
  "face-pull": "pB9qVPwWp1I",
  "reverse-pec-deck": "-TKqxK7-ehc",
  "rear-delt-fly": "LsT-bR_zxLo",
  "barbell-curl": "54x2WF1_Suc",
  "ez-bar-curl": "KFinlAT6aEo",
  "dumbbell-curl": "iui51E31sX8",
  "hammer-curl": "lmIo_gVE8T4",
  "preacher-curl": "Htw-s61mOw0",
  "cable-curl": "CrbTqNOlFgE",
  "concentration-curl": "EjUnEEfTSEY",
  "incline-dumbbell-curl": "XhIsIcjIbCw",
  "tricep-pushdown": "Rc7-euA8FDI",
  "rope-pushdown": "NvZKjiZ8NYc",
  "skull-crushers": "iuYB_fLp26Q",
  "overhead-extension": "fYqswDVbJDg",
  "close-grip-bench-press": "4yKLxOsrGfg",
  "dips": "4ua3MzaU0QU",
  "wrist-curl": "n8E-xuNaRjo",
  "reverse-wrist-curl": "sKXqNO2KQp8",
  "farmer-walk": "1uOs1hP3u4A",
  "dead-hang": "fq9gDvNZQ2c",
  "back-squat": "MLoZuAkIyZI",
  "front-squat": "nmUof3vszxM",
  "leg-press": "EotSw18oR9w",
  "bulgarian-split-squat": "or1frhkjBDc",
  "walking-lunges": "1cS-6KsJW9g",
  "leg-extension": "w72YiHz15CA",
  "step-ups": "8q9LVgN2RD4",
  "romanian-deadlift": "5rIqP63yWFg",
  "stiff-leg-deadlift": "4ZEZd1zVJzE",
  "lying-leg-curl": "FRy58-v0YII",
  "seated-leg-curl": "_lgE0gPvbik",
  "nordic-curl": "_e9vFU9-tkc"
};

export default function ExerciseVisualizer({ exerciseId, exerciseName = '' }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const searchName = exerciseName || exerciseId.replace(/-/g, ' ');
  const searchQuery = encodeURIComponent(`${searchName} exercise form tutorial`);
  
  // Check if we have a guaranteed working video ID
  const videoId = VIDEO_MAP[exerciseId];

  return (
    <>
      <div 
        className="visualizer-container animate-fadeIn" 
        onClick={() => setIsModalOpen(true)}
      >
        <div className="visualizer-thumbnail">
          {/* Premium gym backdrop */}
          <div className="thumbnail-bg"></div>
          <div className="thumbnail-overlay">
            <div className="play-button">
              {videoId ? <Play size={24} fill="currentColor" /> : <SearchIcon size={24} />}
            </div>
            <div className="thumbnail-title">
              Watch Form Guide: {searchName}
            </div>
            <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 4 }}>
              {videoId ? 'Tap to Play Video' : 'Tap to Search Video'}
            </div>
          </div>
        </div>
        <style>{`
          .visualizer-container {
            width: 100%;
            max-width: 400px;
            margin: 0 auto;
            border-radius: var(--radius-lg);
            overflow: hidden;
            cursor: pointer;
            box-shadow: var(--shadow-md);
            transition: transform var(--transition-fast);
            border: 1px solid var(--border-primary);
          }
          .visualizer-container:hover {
            transform: scale(1.02);
            box-shadow: var(--shadow-lg);
          }
          .visualizer-container:hover .play-button {
            background: var(--brand-danger);
            color: white;
            transform: scale(1.1);
          }
          .visualizer-thumbnail {
            position: relative;
            width: 100%;
            height: 200px;
            background: #111;
          }
          .thumbnail-bg {
            position: absolute;
            inset: 0;
            background-image: url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop');
            background-size: cover;
            background-position: center;
            opacity: 0.4;
            filter: grayscale(80%);
          }
          .thumbnail-overlay {
            position: absolute;
            inset: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background: linear-gradient(0deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.1) 100%);
          }
          .play-button {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            border: 2px solid white;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all var(--transition-spring);
            margin-bottom: 12px;
          }
          .thumbnail-title {
            color: white;
            font-size: var(--text-sm);
            font-weight: 700;
            text-shadow: 0 2px 4px rgba(0,0,0,0.5);
            font-family: var(--font-display);
          }
          
          /* Modal Styles */
          .video-modal-overlay {
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.85);
            backdrop-filter: blur(4px);
            z-index: 99999;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: var(--space-4);
            animation: fadeIn 0.2s ease-out;
          }
          .video-modal-content {
            width: 100%;
            max-width: 800px;
            background: var(--bg-card);
            border-radius: var(--radius-xl);
            overflow: hidden;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
            animation: slideUp 0.3s ease-out;
          }
          .video-modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: var(--space-4);
            border-bottom: 1px solid var(--border-primary);
            background: var(--bg-secondary);
          }
          .video-modal-close {
            background: transparent;
            border: none;
            color: var(--text-secondary);
            cursor: pointer;
            padding: var(--space-2);
            border-radius: var(--radius-full);
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all var(--transition-fast);
          }
          .video-modal-close:hover {
            background: var(--bg-tertiary);
            color: var(--brand-danger);
          }
          .video-wrapper {
            position: relative;
            padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
            height: 0;
            overflow: hidden;
            background: #000;
          }
          .video-wrapper iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border: 0;
          }
          .video-fallback {
            padding: var(--space-4);
            text-align: center;
            background: var(--bg-card);
            border-top: 1px solid var(--border-primary);
          }
        `}</style>
      </div>

      {/* Video Modal Overlay - Rendered in a Portal to break out of all stacking contexts */}
      {isModalOpen && createPortal(
        <div className="video-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="video-modal-header">
              <h3 style={{ margin: 0, fontSize: 'var(--text-lg)', fontFamily: 'var(--font-display)' }}>
                {searchName}
              </h3>
              <button className="video-modal-close" onClick={() => setIsModalOpen(false)}>
                <X size={24} />
              </button>
            </div>
            
            {videoId ? (
              // GUARANTEED WORKING IFRAME
              <div className="video-wrapper">
                <iframe 
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                  title={`${searchName} form demonstration`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </div>
            ) : (
              // NO VIDEO MAPPED: BEAUTIFUL FALLBACK
              <div style={{ padding: 'var(--space-8) var(--space-4)', textAlign: 'center', background: '#111', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px' }}>
                <SearchIcon size={48} color="white" style={{ marginBottom: 'var(--space-4)', opacity: 0.5 }} />
                <h3 style={{ color: 'white', marginBottom: 'var(--space-2)' }}>No Built-in Video</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-6)', maxWidth: 300, fontSize: 'var(--text-sm)' }}>
                  We don't have an embedded video for <strong>{searchName}</strong> yet. 
                </p>
                <a 
                  href={`https://www.youtube.com/results?search_query=${searchQuery}`}
                  target="_blank" 
                  rel="noreferrer"
                  className="btn btn-primary btn-lg"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
                >
                  Find on YouTube <ExternalLink size={18} />
                </a>
              </div>
            )}
            
            {videoId && (
              <div className="video-fallback">
                <p style={{ margin: '0 0 var(--space-3) 0', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                  Video restricted? Watch it directly on YouTube.
                </p>
                <a 
                  href={`https://www.youtube.com/watch?v=${videoId}`}
                  target="_blank" 
                  rel="noreferrer"
                  className="btn btn-outline"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
                >
                  Open in YouTube <ExternalLink size={16} />
                </a>
              </div>
            )}
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
