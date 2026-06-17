import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { generateWorkoutPlan } from '../data/workoutAlgorithm';
import { exercises } from '../data/exercises';
import { Check, X, Edit2, Plus, GripVertical, Trash2, RotateCcw } from 'lucide-react';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const TODAY = DAYS[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1];

const MUSCLE_COLORS = {
  Chest: '#f87171', Back: '#60a5fa', Shoulders: '#fbbf24',
  Biceps: '#a78bfa', Triceps: '#f472b6', Legs: '#34d399', Abs: '#22d3ee'
};

export default function WeeklySchedule() {
  const [schedule, setSchedule] = useState(() => {
    const saved = localStorage.getItem('fitforge-schedule');
    if (saved) return JSON.parse(saved);
    return {};
  });

  const [editingExercise, setEditingExercise] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [addingToDay, setAddingToDay] = useState(null);
  const [selectedExerciseId, setSelectedExerciseId] = useState('');

  function handleDragEnd(result) {
    if (!result.destination) return;
    const { source, destination } = result;
    const sourceDay = source.droppableId;
    const destDay = destination.droppableId;

    const newSchedule = { ...schedule };
    const sourceExercises = [...(newSchedule[sourceDay]?.exercises || [])];
    const [moved] = sourceExercises.splice(source.index, 1);

    if (sourceDay === destDay) {
      sourceExercises.splice(destination.index, 0, moved);
      newSchedule[sourceDay] = { ...newSchedule[sourceDay], exercises: sourceExercises };
    } else {
      const destExercises = [...(newSchedule[destDay]?.exercises || [])];
      destExercises.splice(destination.index, 0, moved);
      newSchedule[sourceDay] = { ...newSchedule[sourceDay], exercises: sourceExercises, isRest: sourceExercises.length === 0 };
      newSchedule[destDay] = { ...newSchedule[destDay], exercises: destExercises, isRest: false };
    }

    setSchedule(newSchedule);
    saveSchedule(newSchedule);
  }

  function toggleComplete(day, exerciseId) {
    const newSchedule = { ...schedule };
    const exercises = newSchedule[day].exercises.map(ex =>
      ex.id === exerciseId ? { ...ex, completed: !ex.completed } : ex
    );
    newSchedule[day] = { ...newSchedule[day], exercises };
    setSchedule(newSchedule);
    saveSchedule(newSchedule);
  }

  function removeExercise(day, exerciseId) {
    const newSchedule = { ...schedule };
    const exercises = newSchedule[day].exercises.filter(ex => ex.id !== exerciseId);
    newSchedule[day] = { ...newSchedule[day], exercises, isRest: exercises.length === 0 };
    setSchedule(newSchedule);
    saveSchedule(newSchedule);
  }

  function startEdit(day, exercise) {
    setEditingExercise({ day, id: exercise.id });
    setEditForm({ sets: exercise.sets, reps: exercise.reps, rest: exercise.rest });
  }

  function saveEdit() {
    if (!editingExercise) return;
    const { day, id } = editingExercise;
    const newSchedule = { ...schedule };
    const exercises = newSchedule[day].exercises.map(ex =>
      ex.id === id ? { ...ex, ...editForm } : ex
    );
    newSchedule[day] = { ...newSchedule[day], exercises };
    setSchedule(newSchedule);
    saveSchedule(newSchedule);
    setEditingExercise(null);
  }

  function resetSchedule() {
    if (window.confirm("Are you sure you want to clear your weekly schedule?")) {
      const newSchedule = {};
      setSchedule(newSchedule);
      saveSchedule(newSchedule);
    }
  }

  function handleAddExercise(day) {
    if (!selectedExerciseId) return;
    const template = exercises.find(e => e.id === selectedExerciseId);
    if (!template) return;

    const newSchedule = { ...schedule };
    const dayData = newSchedule[day] || { exercises: [], isRest: false };
    
    const newExercise = {
      id: `manual-${Date.now()}`,
      name: template.name,
      sets: 3,
      reps: "10",
      rest: 60,
      muscle: template.primaryMuscle,
      difficulty: template.difficulty,
      completed: false
    };

    dayData.exercises.push(newExercise);
    dayData.isRest = false;
    newSchedule[day] = dayData;
    
    setSchedule(newSchedule);
    saveSchedule(newSchedule);
    setAddingToDay(null);
    setSelectedExerciseId('');
  }

  function saveSchedule(s) {
    localStorage.setItem('fitforge-schedule', JSON.stringify(s));
  }

  function getCompletionRate(day) {
    const exs = schedule[day]?.exercises || [];
    if (exs.length === 0) return 0;
    return Math.round((exs.filter(e => e.completed).length / exs.length) * 100);
  }

  return (
    <div className="animate-fadeIn">
      <div className="section-header">
        <div>
          <h2>Weekly Schedule</h2>
          <p>Drag & drop exercises between days. Click to mark as completed.</p>
        </div>
        <button className="btn btn-secondary" onClick={resetSchedule}>
          <RotateCcw size={16} /> Reset Schedule
        </button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="schedule-grid">
          {DAYS.map(day => {
            const dayData = schedule[day] || { exercises: [], isRest: true };
            const completion = getCompletionRate(day);

            return (
              <div key={day} className="card schedule-day glass-premium" style={{ padding: 0, overflow: 'hidden' }}>
                <div className={`schedule-day-header ${day === TODAY ? 'today' : ''}`}>
                  <div>{day.substring(0, 3)}</div>
                  {!dayData.isRest && dayData.exercises.length > 0 && (
                    <div style={{ fontSize: 10, color: completion === 100 ? 'var(--brand-success)' : 'var(--text-tertiary)', marginTop: 2 }}>
                      {completion}%
                    </div>
                  )}
                  {day === TODAY && (
                    <div style={{ fontSize: 9, color: 'var(--brand-primary-light)', fontWeight: 600 }}>TODAY</div>
                  )}
                </div>
                {!dayData.isRest && dayData.label && (
                  <div style={{ padding: '4px 8px', fontSize: 10, color: 'var(--text-tertiary)', textAlign: 'center', borderBottom: '1px solid var(--border-primary)' }}>
                    {dayData.label}
                  </div>
                )}

                <Droppable droppableId={day}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="schedule-day-body"
                      style={{
                        background: snapshot.isDraggingOver ? 'rgba(99,102,241,0.05)' : undefined,
                        transition: 'background 0.2s'
                      }}
                    >
                      {dayData.exercises.length === 0 && (
                        <div className="schedule-rest-day">
                          {dayData.isRest ? '😴 Rest Day' : 'Drop exercises here'}
                        </div>
                      )}
                      {dayData.exercises.map((ex, idx) => (
                        <Draggable key={ex.id} draggableId={ex.id} index={idx}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className={`schedule-exercise ${ex.completed ? 'completed' : ''}`}
                              style={{
                                ...provided.draggableProps.style,
                                borderLeft: `3px solid ${MUSCLE_COLORS[ex.muscle] || 'var(--brand-primary)'}`,
                                boxShadow: snapshot.isDragging ? 'var(--shadow-lg)' : undefined,
                              }}
                            >
                              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 4 }}>
                                <span {...provided.dragHandleProps} style={{ cursor: 'grab', color: 'var(--text-tertiary)', flexShrink: 0, marginTop: 1 }}>
                                  <GripVertical size={12} />
                                </span>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                  <div className="schedule-exercise-name" onClick={() => toggleComplete(day, ex.id)} style={{ cursor: 'pointer' }}>
                                    {ex.completed && <Check size={10} style={{ display: 'inline', marginRight: 2, color: 'var(--brand-success)' }} />}
                                    {ex.name}
                                  </div>
                                  {editingExercise?.id === ex.id ? (
                                    <div style={{ display: 'flex', gap: 4, marginTop: 4 }}>
                                      <input
                                        type="number"
                                        value={editForm.sets}
                                        onChange={e => setEditForm(f => ({ ...f, sets: parseInt(e.target.value) || 0 }))}
                                        style={{ width: 35, padding: '2px 4px', fontSize: 10, background: 'var(--bg-input)', border: '1px solid var(--border-active)', borderRadius: 4, color: 'var(--text-primary)' }}
                                      />
                                      <span style={{ fontSize: 10, color: 'var(--text-tertiary)', lineHeight: '22px' }}>×</span>
                                      <input
                                        value={editForm.reps}
                                        onChange={e => setEditForm(f => ({ ...f, reps: e.target.value }))}
                                        style={{ width: 45, padding: '2px 4px', fontSize: 10, background: 'var(--bg-input)', border: '1px solid var(--border-active)', borderRadius: 4, color: 'var(--text-primary)' }}
                                      />
                                      <button onClick={saveEdit} style={{ background: 'var(--brand-success)', border: 'none', borderRadius: 4, color: 'white', padding: '2px 6px', cursor: 'pointer' }}>
                                        <Check size={10} />
                                      </button>
                                      <button onClick={() => setEditingExercise(null)} style={{ background: 'var(--bg-tertiary)', border: 'none', borderRadius: 4, color: 'var(--text-tertiary)', padding: '2px 6px', cursor: 'pointer' }}>
                                        <X size={10} />
                                      </button>
                                    </div>
                                  ) : (
                                    <div className="schedule-exercise-detail">
                                      {ex.sets}×{ex.reps} • {ex.rest}s rest
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className="schedule-exercise-actions">
                                <button onClick={() => startEdit(day, ex)} title="Edit"><Edit2 size={10} /></button>
                                <button onClick={() => removeExercise(day, ex.id)} title="Remove"><Trash2 size={10} /></button>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                      
                      {addingToDay === day ? (
                        <div style={{ marginTop: 8, padding: 8, background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-primary)' }}>
                          <select 
                            className="input" 
                            style={{ width: '100%', marginBottom: 8, padding: 4, fontSize: 11 }}
                            value={selectedExerciseId}
                            onChange={(e) => setSelectedExerciseId(e.target.value)}
                          >
                            <option value="">Select an exercise...</option>
                            {exercises.map(ex => (
                              <option key={ex.id} value={ex.id}>{ex.name} ({ex.primaryMuscle})</option>
                            ))}
                          </select>
                          <div style={{ display: 'flex', gap: 4 }}>
                            <button className="btn btn-primary btn-sm" style={{ flex: 1 }} onClick={() => handleAddExercise(day)}>Add</button>
                            <button className="btn btn-secondary btn-sm" onClick={() => setAddingToDay(null)}>Cancel</button>
                          </div>
                        </div>
                      ) : (
                        <button 
                          className="btn btn-secondary" 
                          style={{ width: '100%', marginTop: 8, padding: '6px 0', fontSize: 11, background: 'transparent', border: '1px dashed var(--border-active)' }}
                          onClick={() => setAddingToDay(day)}
                        >
                          <Plus size={12} style={{ marginRight: 4 }} /> Add Exercise
                        </button>
                      )}
                    </div>
                  )}
                </Droppable>
              </div>
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
}
