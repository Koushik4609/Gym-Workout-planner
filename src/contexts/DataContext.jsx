import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
const DataContext = createContext();

export function useData() {
  return useContext(DataContext);
}

export function DataProvider({ children }) {
  const { currentUser } = useAuth();
  
  const [profile, setProfile] = useState(null);
  const [prs, setPrs] = useState(null);
  const [workouts, setWorkouts] = useState([]);
  const [weightLogs, setWeightLogs] = useState([]);
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      // For a real production app, fetch from Firestore here.
      // For now, we'll initialize empty states for real users.
      setProfile({ xp: 0, level: 1, streak: 0, totalWorkouts: 0, badges: [] });
      setPrs({
        bench: { current: 0, previous: 0 },
        squat: { current: 0, previous: 0 },
        deadlift: { current: 0, previous: 0 },
        ohp: { current: 0, previous: 0 }
      });
      setWorkouts([]);
      setWeightLogs([]);
      setLoading(false);
    } else {
      setProfile(null);
      setPrs(null);
      setWorkouts([]);
      setWeightLogs([]);
      setLoading(false);
    }
  }, [currentUser]);

  // Methods to mutate data
  const addWorkout = (workout) => {
    setWorkouts(prev => [workout, ...prev]);
    // Basic Gamification: 100 XP per workout
    setProfile(prev => {
      const newXp = prev.xp + 100;
      const newLevel = Math.floor(newXp / 1000) + 1;
      return { ...prev, xp: newXp, level: newLevel, totalWorkouts: prev.totalWorkouts + 1 };
    });
  };

  const updatePr = (lift, weight) => {
    setPrs(prev => ({
      ...prev,
      [lift]: { previous: prev[lift].current, current: weight }
    }));
  };

  const value = {
    profile,
    prs,
    workouts,
    weightLogs,
    loading,
    addWorkout,
    updatePr
  };

  return (
    <DataContext.Provider value={value}>
      {!loading && children}
    </DataContext.Provider>
  );
}
