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
      // For now, we use localStorage for persistence.
      const storedProfile = localStorage.getItem('fitforge-profile');
      const storedWorkouts = localStorage.getItem('fitforge-workouts');
      
      const defaultProfileData = { xp: 0, level: 1, streak: 0, totalWorkouts: 0, badges: [] };
      setProfile(storedProfile ? { ...defaultProfileData, ...JSON.parse(storedProfile) } : defaultProfileData);
      setWorkouts(storedWorkouts ? JSON.parse(storedWorkouts) : []);
      
      setPrs({
        bench: { current: 0, previous: 0 },
        squat: { current: 0, previous: 0 },
        deadlift: { current: 0, previous: 0 },
        ohp: { current: 0, previous: 0 }
      });
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
    setWorkouts(prev => {
      const newWorkouts = [workout, ...prev];
      localStorage.setItem('fitforge-workouts', JSON.stringify(newWorkouts));
      return newWorkouts;
    });
    // Basic Gamification: 100 XP per workout
    setProfile(prev => {
      const newXp = (prev?.xp || 0) + 100;
      const newLevel = Math.floor(newXp / 1000) + 1;
      const newProfile = { ...prev, xp: newXp, level: newLevel, totalWorkouts: (prev?.totalWorkouts || 0) + 1 };
      localStorage.setItem('fitforge-profile', JSON.stringify(newProfile));
      return newProfile;
    });
  };

  const updateProfile = (updates) => {
    setProfile(prev => {
      const newProfile = { ...prev, ...updates };
      localStorage.setItem('fitforge-profile', JSON.stringify(newProfile));
      return newProfile;
    });
  };

  const clearWorkouts = () => {
    setWorkouts([]);
    localStorage.removeItem('fitforge-workouts');
  };

  const factoryReset = () => {
    setProfile({ xp: 0, level: 1, streak: 0, totalWorkouts: 0, badges: [] });
    setWorkouts([]);
    localStorage.removeItem('fitforge-profile');
    localStorage.removeItem('fitforge-workouts');
    localStorage.removeItem('fitforge-theme-mode');
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
    updateProfile,
    clearWorkouts,
    factoryReset,
    updatePr
  };

  return (
    <DataContext.Provider value={value}>
      {!loading && children}
    </DataContext.Provider>
  );
}
