// FitForge AI — Gamification & XP System Engine

export const BADGES = [
  { id: 'first_workout', name: 'First Forge', emoji: '🔥', description: 'Complete your first active workout.', xpAward: 100 },
  { id: 'streak_7', name: 'Consistency Novice', emoji: '⚡', description: 'Reach a 7-day workout streak.', xpAward: 150 },
  { id: 'streak_30', name: 'Iron Will', emoji: '🏆', description: 'Reach a 30-day workout streak.', xpAward: 500 },
  { id: 'workouts_100', name: 'Century Lifter', emoji: '💪', description: 'Complete 100 total workouts.', xpAward: 1000 },
  { id: 'personal_record', name: 'PR Breaker', emoji: '🏅', description: 'Break a personal record weight.', xpAward: 200 },
  { id: 'consistency_master', name: 'Perfect Week', emoji: '🌟', description: 'Complete all planned sessions in a week.', xpAward: 300 }
];

export const XP_EVENTS = {
  WORKOUT_COMPLETE: { xp: 150, description: 'Completed a workout session' },
  SET_LOGGED: { xp: 10, description: 'Logged a workout set' },
  PR_HIT: { xp: 50, description: 'Achieved a new Personal Record' },
  STREAK_BONUS: { xp: 25, description: 'Daily workout streak increment' }
};

/**
 * Calculates current level based on total XP.
 * Level 1: 0 - 99 XP
 * Level 2: 100 - 399 XP (needs 300 more)
 * Level 3: 400 - 899 XP (needs 500 more)
 * Level 4: 900 - 1599 XP (needs 700 more)
 * Level = floor(sqrt(XP / 100)) + 1
 */
export function getLevelForXP(xp) {
  if (xp < 0) return 1;
  return Math.floor(Math.sqrt(xp / 100)) + 1;
}

/**
 * Calculates XP required to reach the start of a specific level.
 */
export function getXPForLevel(level) {
  if (level <= 1) return 0;
  return Math.pow(level - 1, 2) * 100;
}

/**
 * Returns details about level progress.
 * { level, currentXP, nextLevelXP, progressPercent, xpRemaining }
 */
export function getLevelProgress(xp) {
  const currentLevel = getLevelForXP(xp);
  const currentLevelMinXP = getXPForLevel(currentLevel);
  const nextLevelMinXP = getXPForLevel(currentLevel + 1);
  
  const xpInCurrentLevel = xp - currentLevelMinXP;
  const xpRequiredForNextLevel = nextLevelMinXP - currentLevelMinXP;
  
  const progressPercent = xpRequiredForNextLevel > 0 
    ? Math.min(100, Math.round((xpInCurrentLevel / xpRequiredForNextLevel) * 100))
    : 0;
    
  return {
    level: currentLevel,
    xp,
    xpInCurrentLevel,
    xpRequiredForNextLevel,
    progressPercent,
    xpRemaining: Math.max(0, nextLevelMinXP - xp)
  };
}

/**
 * Initializes local storage for achievements and user XP.
 */
export function getGamificationState() {
  const defaultState = {
    xp: 250, // start with some default XP for signup
    level: 2,
    earnedBadges: ['first_workout'],
    streak: 12,
    totalWorkouts: 47,
  };
  
  const saved = localStorage.getItem('fitforge-gamification');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      return defaultState;
    }
  }
  
  localStorage.setItem('fitforge-gamification', JSON.stringify(defaultState));
  return defaultState;
}

/**
 * Saves the gamification state to local storage.
 */
export function saveGamificationState(state) {
  localStorage.setItem('fitforge-gamification', JSON.stringify(state));
}

/**
 * Award XP to user and check for level-ups and new badges.
 * Returns { oldLevel, newLevel, levelUp: boolean, earnedBadges: [] }
 */
export function awardXP(xpAmount, eventType = null) {
  const state = getGamificationState();
  const oldXP = state.xp;
  const newXP = oldXP + xpAmount;
  
  const oldLevel = getLevelForXP(oldXP);
  const newLevel = getLevelForXP(newXP);
  const levelUp = newLevel > oldLevel;
  
  const newBadges = [];
  
  // Update state
  state.xp = newXP;
  state.level = newLevel;
  
  // Check for badges trigger
  if (eventType === 'workout_complete') {
    state.totalWorkouts += 1;
    if (state.totalWorkouts >= 100 && !state.earnedBadges.includes('workouts_100')) {
      state.earnedBadges.push('workouts_100');
      state.xp += BADGES.find(b => b.id === 'workouts_100').xpAward;
      newBadges.push('workouts_100');
    }
  }
  
  if (eventType === 'pr_hit' && !state.earnedBadges.includes('personal_record')) {
    state.earnedBadges.push('personal_record');
    state.xp += BADGES.find(b => b.id === 'personal_record').xpAward;
    newBadges.push('personal_record');
  }

  saveGamificationState(state);
  
  return {
    oldLevel,
    newLevel,
    levelUp,
    newBadges,
    currentXP: state.xp
  };
}
