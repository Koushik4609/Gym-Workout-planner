import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { exercises, EQUIPMENT_TYPES, DIFFICULTY_LEVELS, MUSCLE_GROUPS } from '../data/exercises';
import { Search, Dumbbell, BarChart3, AlertCircle, Heart, BookmarkPlus, X, Plus, Folder } from 'lucide-react';
import ExerciseVisualizer from '../components/ExerciseVisualizer';

const MUSCLE_COLORS = {
  Chest: 'badge-chest', Back: 'badge-back', Lats: 'badge-back', Shoulders: 'badge-shoulders',
  Biceps: 'badge-biceps', Triceps: 'badge-triceps', Forearms: 'badge-primary',
  Quads: 'badge-legs', Hamstrings: 'badge-legs', Glutes: 'badge-legs', Calves: 'badge-legs',
  Core: 'badge-abs'
};

export default function ExerciseLibrary() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMuscle, setSelectedMuscle] = useState('All');
  const [selectedEquipment, setSelectedEquipment] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedExercise, setSelectedExercise] = useState(null); // For modal

  // Favorites & Collections State
  const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem('fitforge-favorites') || '[]'));
  const [collections, setCollections] = useState(() => JSON.parse(localStorage.getItem('fitforge-collections') || '[]'));
  const [showCollectionModalFor, setShowCollectionModalFor] = useState(null);
  const [newCollectionName, setNewCollectionName] = useState('');

  // Persist to localStorage
  useEffect(() => { localStorage.setItem('fitforge-favorites', JSON.stringify(favorites)); }, [favorites]);
  useEffect(() => { localStorage.setItem('fitforge-collections', JSON.stringify(collections)); }, [collections]);

  const toggleFavorite = (e, id) => {
    e.stopPropagation();
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(fav => fav !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const handleCreateCollection = () => {
    if (!newCollectionName.trim()) return;
    const newCollection = { id: Date.now().toString(), name: newCollectionName.trim(), exercises: [showCollectionModalFor] };
    setCollections([...collections, newCollection]);
    setNewCollectionName('');
    setShowCollectionModalFor(null);
  };

  const toggleInCollection = (collectionId, exerciseId) => {
    setCollections(collections.map(c => {
      if (c.id === collectionId) {
        const hasEx = c.exercises.includes(exerciseId);
        return { ...c, exercises: hasEx ? c.exercises.filter(id => id !== exerciseId) : [...c.exercises, exerciseId] };
      }
      return c;
    }));
  };

  // Build filter tabs: "All", "Favorites", then specific muscle groups
  const FILTER_TABS = ['All', 'Favorites', ...MUSCLE_GROUPS];

  const filtered = exercises.filter(ex => {
    // Favorites
    if (selectedMuscle === 'Favorites' && !favorites.includes(ex.id)) return false;

    // Muscle Group
    if (selectedMuscle !== 'All' && selectedMuscle !== 'Favorites' && ex.muscleGroup !== selectedMuscle) return false;

    // Search
    if (searchQuery && 
        !ex.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !ex.muscleGroup.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    
    // Equipment & Difficulty
    if (selectedEquipment !== 'All' && !ex.equipment.includes(selectedEquipment)) return false;
    if (selectedDifficulty !== 'All' && ex.difficulty !== selectedDifficulty) return false;
    
    return true;
  });

  return (
    <div className="animate-fadeIn page-transition">
      <div className="section-header">
        <div>
          <h2>Exercise Library</h2>
          <p>{filtered.length} exercises available</p>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-row">
        <div className="search-bar" style={{ flex: 1, maxWidth: 350 }}>
          <Search size={16} className="search-bar-icon" />
          <input
            className="input"
            placeholder="Search exercises..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{ paddingLeft: 42 }}
          />
        </div>

        <select className="input select" style={{ width: 'auto', minWidth: 140 }} value={selectedEquipment} onChange={e => setSelectedEquipment(e.target.value)}>
          <option value="All">All Equipment</option>
          {EQUIPMENT_TYPES.map(eq => <option key={eq}>{eq}</option>)}
        </select>

        <select className="input select" style={{ width: 'auto', minWidth: 140 }} value={selectedDifficulty} onChange={e => setSelectedDifficulty(e.target.value)}>
          <option value="All">All Levels</option>
          {DIFFICULTY_LEVELS.map(d => <option key={d}>{d}</option>)}
        </select>
      </div>

      {/* Muscle Group Tabs (Scrollable horizontally) */}
      <div className="tabs" style={{ marginBottom: 'var(--space-6)', overflowX: 'auto', whiteSpace: 'nowrap', paddingBottom: 8 }}>
        {FILTER_TABS.map(tab => (
          <button 
            key={tab} 
            className={`tab ${selectedMuscle === tab ? 'active' : ''}`} 
            onClick={() => setSelectedMuscle(tab)}
          >
            {tab === 'Favorites' ? <span style={{display: 'flex', alignItems: 'center', gap: 4}}><Heart size={14} fill="currentColor"/> Favorites</span> : tab}
          </button>
        ))}
      </div>

      {/* Exercise Grid */}
      <div className="exercise-grid">
        {filtered.map(ex => (
          <div
            key={ex.id}
            className="card exercise-card card-interactive glass-premium"
            onClick={() => setSelectedExercise(ex)}
          >
            <div className="exercise-card-header">
              <div>
                <h3 className="exercise-card-title" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>{ex.name}</h3>
              </div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <button 
                  className="btn btn-ghost btn-icon" 
                  onClick={(e) => { e.stopPropagation(); setShowCollectionModalFor(ex.id); }}
                  title="Save to Collection"
                >
                  <BookmarkPlus size={18} color="var(--text-tertiary)" />
                </button>
                <button 
                  className="btn btn-ghost btn-icon" 
                  onClick={(e) => toggleFavorite(e, ex.id)}
                  title="Toggle Favorite"
                >
                  <Heart size={18} color={favorites.includes(ex.id) ? "var(--brand-danger)" : "var(--text-tertiary)"} fill={favorites.includes(ex.id) ? "var(--brand-danger)" : "transparent"} />
                </button>
              </div>
            </div>

            <div className="exercise-card-muscles" style={{ display: 'flex', gap: 6, margin: '8px 0' }}>
              <span className={`badge ${MUSCLE_COLORS[ex.muscleGroup] || 'badge-primary'}`}>{ex.muscleGroup}</span>
              <span className="badge badge-secondary" style={{ fontSize: 10 }}>{ex.exerciseType}</span>
            </div>

            <div className="exercise-card-info" style={{ display: 'flex', gap: 12, color: 'var(--text-secondary)', fontSize: 12, marginTop: 'var(--space-4)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Dumbbell size={12} /> {ex.equipment.join(', ')}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><BarChart3 size={12} /> {ex.difficulty}</span>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="empty-state">
          <div className="empty-state-icon">🔍</div>
          <h3>No exercises found</h3>
          <p>Try adjusting your filters or search query.</p>
        </div>
      )}

      {/* FULL SCREEN EXERCISE MODAL */}
      {selectedExercise && createPortal(
        <div className="modal-overlay" onClick={() => setSelectedExercise(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(4px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-4)' }}>
          <div className="modal-content animate-slideUp" onClick={e => e.stopPropagation()} style={{ background: 'var(--bg-primary)', width: '100%', maxWidth: 500, maxHeight: '90vh', overflowY: 'auto', borderRadius: 'var(--radius-xl)', position: 'relative' }}>
            
            <div style={{ position: 'sticky', top: 0, background: 'var(--bg-primary)', zIndex: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--space-5) var(--space-6)', borderBottom: '1px solid var(--border-primary)' }}>
              <h2 style={{ margin: 0, fontFamily: 'var(--font-display)' }}>{selectedExercise.name}</h2>
              <button className="btn btn-ghost btn-icon" onClick={() => setSelectedExercise(null)}><X size={24} /></button>
            </div>

            <div style={{ padding: 'var(--space-5)' }}>
              {/* Video Player */}
              <div style={{ marginBottom: 'var(--space-6)' }}>
                <ExerciseVisualizer exerciseId={selectedExercise.id} exerciseName={selectedExercise.name} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
                <div>
                  <h4 style={{ marginBottom: 'var(--space-3)', color: 'var(--text-primary)' }}>Instructions</h4>
                  <ol style={{ paddingLeft: 'var(--space-4)', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                    {selectedExercise.instructions.map((step, i) => <li key={i} style={{ marginBottom: 8 }}>{step}</li>)}
                  </ol>

                  {selectedExercise.proTips && selectedExercise.proTips.length > 0 && (
                    <div style={{ padding: 'var(--space-3) var(--space-4)', background: 'rgba(245,158,11,0.08)', borderLeft: '3px solid var(--brand-warning)', borderRadius: '0 var(--radius-md) var(--radius-md) 0', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginTop: 'var(--space-4)' }}>
                      💡 <strong>Pro Tips:</strong>
                      <ul style={{ paddingLeft: 'var(--space-4)', margin: '8px 0 0 0' }}>
                        {selectedExercise.proTips.map((tip, i) => <li key={i}>{tip}</li>)}
                      </ul>
                    </div>
                  )}
                </div>

                <div>
                  <h4 style={{ marginBottom: 'var(--space-3)', color: 'var(--text-primary)' }}>Common Mistakes</h4>
                  <div style={{ padding: 'var(--space-3) var(--space-4)', background: 'rgba(239,68,68,0.04)', borderLeft: '3px solid var(--brand-danger)', borderRadius: '0 var(--radius-md) var(--radius-md) 0', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--brand-danger)', fontWeight: 700, marginBottom: 8 }}>
                      <AlertCircle size={14} /> Avoid these:
                    </div>
                    <ul style={{ paddingLeft: 'var(--space-4)', margin: 0 }}>
                      {selectedExercise.commonMistakes.map((m, i) => <li key={i} style={{ marginBottom: 4 }}>{m}</li>)}
                    </ul>
                  </div>

                  <h4 style={{ margin: 'var(--space-5) 0 var(--space-3) 0', color: 'var(--text-primary)' }}>Recommended Sets</h4>
                  <div className="card glass-premium" style={{ padding: 'var(--space-4)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 'var(--text-sm)' }}>
                      <span style={{ color: 'var(--text-tertiary)' }}>Muscle Gain:</span>
                      <strong>{selectedExercise.setsRecommendation?.muscleGain || '3 sets of 8-12'}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 'var(--text-sm)' }}>
                      <span style={{ color: 'var(--text-tertiary)' }}>Strength:</span>
                      <strong>{selectedExercise.setsRecommendation?.strength || '4 sets of 3-5'}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-sm)' }}>
                      <span style={{ color: 'var(--text-tertiary)' }}>Fat Loss:</span>
                      <strong>{selectedExercise.setsRecommendation?.fatLoss || '3 sets of 12-15'}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>, document.body
      )}

      {/* ADD TO COLLECTION MODAL */}
      {showCollectionModalFor && createPortal(
        <div className="modal-overlay" onClick={() => setShowCollectionModalFor(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(4px)', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="modal-content card" onClick={e => e.stopPropagation()} style={{ width: 400, padding: 'var(--space-5)' }}>
            <h3 style={{ marginTop: 0, marginBottom: 'var(--space-4)' }}>Save to Collection</h3>
            
            <div style={{ maxHeight: 300, overflowY: 'auto', marginBottom: 'var(--space-4)' }}>
              {collections.length === 0 ? (
                <p style={{ color: 'var(--text-tertiary)', fontSize: 'var(--text-sm)' }}>No collections yet.</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {collections.map(c => {
                    const inCollection = c.exercises.includes(showCollectionModalFor);
                    return (
                      <div key={c.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-3) 0', borderBottom: '1px solid var(--border-primary)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <Folder size={16} color="var(--brand-primary)" />
                          <span>{c.name}</span>
                          <span className="badge badge-secondary" style={{ fontSize: 10 }}>{c.exercises.length}</span>
                        </div>
                        <button 
                          className={`btn btn-sm ${inCollection ? 'btn-outline' : 'btn-primary'}`}
                          onClick={() => toggleInCollection(c.id, showCollectionModalFor)}
                        >
                          {inCollection ? 'Remove' : 'Add'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div style={{ display: 'flex', gap: 8 }}>
              <input 
                className="input" 
                placeholder="New collection name..." 
                value={newCollectionName}
                onChange={e => setNewCollectionName(e.target.value)}
                style={{ flex: 1 }}
              />
              <button className="btn btn-primary" onClick={handleCreateCollection} disabled={!newCollectionName.trim()}>
                <Plus size={18} /> Create
              </button>
            </div>
          </div>
        </div>, document.body
      )}

    </div>
  );
}
