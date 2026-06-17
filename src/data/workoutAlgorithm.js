// AI Workout Generation Algorithm
import { exercises } from './exercises';

// Muscle group split templates based on days per week
const SPLIT_TEMPLATES = {
  3: {
    'Muscle Gain': [
      { day: 'Monday', focus: ['Chest', 'Triceps'], label: 'Chest & Triceps' },
      { day: 'Wednesday', focus: ['Back', 'Biceps'], label: 'Back & Biceps' },
      { day: 'Friday', focus: ['Legs', 'Shoulders', 'Abs'], label: 'Legs, Shoulders & Abs' }
    ],
    'Fat Loss': [
      { day: 'Monday', focus: ['Chest', 'Back', 'Abs'], label: 'Upper Body + Core' },
      { day: 'Wednesday', focus: ['Legs', 'Shoulders'], label: 'Lower Body + Shoulders' },
      { day: 'Friday', focus: ['Biceps', 'Triceps', 'Abs'], label: 'Arms & Core' }
    ],
    'Strength': [
      { day: 'Monday', focus: ['Chest', 'Triceps'], label: 'Push Day' },
      { day: 'Wednesday', focus: ['Back', 'Biceps'], label: 'Pull Day' },
      { day: 'Friday', focus: ['Legs', 'Abs'], label: 'Legs & Core' }
    ],
    'Endurance': [
      { day: 'Monday', focus: ['Chest', 'Back'], label: 'Upper Push/Pull' },
      { day: 'Wednesday', focus: ['Legs', 'Abs'], label: 'Lower Body & Core' },
      { day: 'Friday', focus: ['Shoulders', 'Biceps', 'Triceps'], label: 'Shoulders & Arms' }
    ],
    'General Fitness': [
      { day: 'Monday', focus: ['Chest', 'Back'], label: 'Upper Body' },
      { day: 'Wednesday', focus: ['Legs', 'Abs'], label: 'Lower Body & Core' },
      { day: 'Friday', focus: ['Shoulders', 'Biceps', 'Triceps'], label: 'Shoulders & Arms' }
    ]
  },
  4: {
    'Muscle Gain': [
      { day: 'Monday', focus: ['Chest', 'Triceps'], label: 'Chest & Triceps' },
      { day: 'Tuesday', focus: ['Back', 'Biceps'], label: 'Back & Biceps' },
      { day: 'Thursday', focus: ['Legs', 'Abs'], label: 'Legs & Core' },
      { day: 'Friday', focus: ['Shoulders', 'Abs'], label: 'Shoulders & Core' }
    ],
    'Fat Loss': [
      { day: 'Monday', focus: ['Chest', 'Back'], label: 'Upper Push/Pull' },
      { day: 'Tuesday', focus: ['Legs', 'Abs'], label: 'Lower Body & Core' },
      { day: 'Thursday', focus: ['Shoulders', 'Biceps', 'Triceps'], label: 'Shoulders & Arms' },
      { day: 'Friday', focus: ['Legs', 'Abs'], label: 'Lower Body & Core' }
    ],
    'Strength': [
      { day: 'Monday', focus: ['Chest', 'Shoulders'], label: 'Push Heavy' },
      { day: 'Tuesday', focus: ['Back', 'Biceps'], label: 'Pull Heavy' },
      { day: 'Thursday', focus: ['Legs'], label: 'Legs Heavy' },
      { day: 'Friday', focus: ['Shoulders', 'Triceps', 'Abs'], label: 'Accessories' }
    ],
    'Endurance': [
      { day: 'Monday', focus: ['Chest', 'Back'], label: 'Upper Circuit' },
      { day: 'Tuesday', focus: ['Legs', 'Abs'], label: 'Lower Circuit' },
      { day: 'Thursday', focus: ['Shoulders', 'Biceps', 'Triceps'], label: 'Arms Circuit' },
      { day: 'Friday', focus: ['Chest', 'Back', 'Legs'], label: 'Full Body' }
    ],
    'General Fitness': [
      { day: 'Monday', focus: ['Chest', 'Triceps'], label: 'Chest & Triceps' },
      { day: 'Tuesday', focus: ['Back', 'Biceps'], label: 'Back & Biceps' },
      { day: 'Thursday', focus: ['Legs', 'Abs'], label: 'Legs & Core' },
      { day: 'Friday', focus: ['Shoulders', 'Abs'], label: 'Shoulders & Core' }
    ]
  },
  5: {
    'Muscle Gain': [
      { day: 'Monday', focus: ['Chest'], label: 'Chest Day' },
      { day: 'Tuesday', focus: ['Back'], label: 'Back Day' },
      { day: 'Wednesday', focus: ['Shoulders', 'Abs'], label: 'Shoulders & Core' },
      { day: 'Thursday', focus: ['Legs'], label: 'Leg Day' },
      { day: 'Friday', focus: ['Biceps', 'Triceps'], label: 'Arms Day' }
    ],
    'Fat Loss': [
      { day: 'Monday', focus: ['Chest', 'Triceps'], label: 'Push Day' },
      { day: 'Tuesday', focus: ['Back', 'Biceps'], label: 'Pull Day' },
      { day: 'Wednesday', focus: ['Legs'], label: 'Leg Day' },
      { day: 'Thursday', focus: ['Shoulders', 'Abs'], label: 'Shoulders & Core' },
      { day: 'Friday', focus: ['Chest', 'Back', 'Abs'], label: 'Full Upper & Core' }
    ],
    'Strength': [
      { day: 'Monday', focus: ['Chest'], label: 'Bench Day' },
      { day: 'Tuesday', focus: ['Back'], label: 'Deadlift Day' },
      { day: 'Wednesday', focus: ['Shoulders'], label: 'Press Day' },
      { day: 'Thursday', focus: ['Legs'], label: 'Squat Day' },
      { day: 'Friday', focus: ['Biceps', 'Triceps', 'Abs'], label: 'Accessories' }
    ],
    'Endurance': [
      { day: 'Monday', focus: ['Chest', 'Back'], label: 'Upper Push/Pull' },
      { day: 'Tuesday', focus: ['Legs'], label: 'Leg Endurance' },
      { day: 'Wednesday', focus: ['Shoulders', 'Abs'], label: 'Shoulders & Core' },
      { day: 'Thursday', focus: ['Chest', 'Back'], label: 'Upper Circuit' },
      { day: 'Friday', focus: ['Legs', 'Abs'], label: 'Lower Circuit' }
    ],
    'General Fitness': [
      { day: 'Monday', focus: ['Chest', 'Triceps'], label: 'Push Day' },
      { day: 'Tuesday', focus: ['Back', 'Biceps'], label: 'Pull Day' },
      { day: 'Wednesday', focus: ['Legs'], label: 'Leg Day' },
      { day: 'Thursday', focus: ['Shoulders', 'Abs'], label: 'Shoulders & Core' },
      { day: 'Friday', focus: ['Biceps', 'Triceps', 'Abs'], label: 'Arms & Core' }
    ]
  }
};
const SPLIT_BY_TYPE = {
  'PPL': {
    3: [
      { day: 'Monday', focus: ['Chest', 'Shoulders', 'Triceps'], label: 'Push Day' },
      { day: 'Wednesday', focus: ['Back', 'Biceps', 'Abs'], label: 'Pull Day' },
      { day: 'Friday', focus: ['Legs'], label: 'Legs Day' }
    ],
    4: [
      { day: 'Monday', focus: ['Chest', 'Shoulders', 'Triceps'], label: 'Push Day' },
      { day: 'Tuesday', focus: ['Back', 'Biceps', 'Abs'], label: 'Pull Day' },
      { day: 'Thursday', focus: ['Legs'], label: 'Legs Day' },
      { day: 'Friday', focus: ['Chest', 'Shoulders', 'Abs'], label: 'Push & Core' }
    ],
    5: [
      { day: 'Monday', focus: ['Chest', 'Shoulders', 'Triceps'], label: 'Push Day' },
      { day: 'Tuesday', focus: ['Back', 'Biceps', 'Abs'], label: 'Pull Day' },
      { day: 'Wednesday', focus: ['Legs'], label: 'Legs Day' },
      { day: 'Friday', focus: ['Chest', 'Shoulders', 'Triceps'], label: 'Push Day 2' },
      { day: 'Saturday', focus: ['Back', 'Biceps', 'Abs'], label: 'Pull Day 2' }
    ],
    6: [
      { day: 'Monday', focus: ['Chest', 'Shoulders', 'Triceps'], label: 'Push Day 1' },
      { day: 'Tuesday', focus: ['Back', 'Biceps'], label: 'Pull Day 1' },
      { day: 'Wednesday', focus: ['Legs', 'Abs'], label: 'Legs & Core 1' },
      { day: 'Thursday', focus: ['Chest', 'Shoulders', 'Triceps'], label: 'Push Day 2' },
      { day: 'Friday', focus: ['Back', 'Biceps'], label: 'Pull Day 2' },
      { day: 'Saturday', focus: ['Legs', 'Abs'], label: 'Legs & Core 2' }
    ]
  },
  'Arnold': {
    3: [
      { day: 'Monday', focus: ['Chest', 'Back'], label: 'Chest & Back' },
      { day: 'Wednesday', focus: ['Shoulders', 'Biceps', 'Triceps', 'Abs'], label: 'Shoulders & Arms' },
      { day: 'Friday', focus: ['Legs'], label: 'Leg Day' }
    ],
    4: [
      { day: 'Monday', focus: ['Chest', 'Back'], label: 'Chest & Back 1' },
      { day: 'Tuesday', focus: ['Shoulders', 'Biceps', 'Triceps', 'Abs'], label: 'Shoulders & Arms' },
      { day: 'Thursday', focus: ['Legs'], label: 'Leg Day' },
      { day: 'Friday', focus: ['Chest', 'Back', 'Abs'], label: 'Chest & Back 2' }
    ],
    5: [
      { day: 'Monday', focus: ['Chest', 'Back'], label: 'Chest & Back 1' },
      { day: 'Tuesday', focus: ['Shoulders', 'Biceps', 'Triceps'], label: 'Shoulders & Arms 1' },
      { day: 'Wednesday', focus: ['Legs', 'Abs'], label: 'Legs & Core' },
      { day: 'Friday', focus: ['Chest', 'Back'], label: 'Chest & Back 2' },
      { day: 'Saturday', focus: ['Shoulders', 'Biceps', 'Triceps', 'Abs'], label: 'Shoulders & Arms 2' }
    ],
    6: [
      { day: 'Monday', focus: ['Chest', 'Back'], label: 'Chest & Back 1' },
      { day: 'Tuesday', focus: ['Shoulders', 'Biceps', 'Triceps'], label: 'Shoulders & Arms 1' },
      { day: 'Wednesday', focus: ['Legs', 'Abs'], label: 'Legs & Core 1' },
      { day: 'Thursday', focus: ['Chest', 'Back'], label: 'Chest & Back 2' },
      { day: 'Friday', focus: ['Shoulders', 'Biceps', 'Triceps'], label: 'Shoulders & Arms 2' },
      { day: 'Saturday', focus: ['Legs', 'Abs'], label: 'Legs & Core 2' }
    ]
  },
  'UpperLower': {
    3: [
      { day: 'Monday', focus: ['Chest', 'Back', 'Shoulders', 'Biceps', 'Triceps'], label: 'Upper Body' },
      { day: 'Wednesday', focus: ['Legs', 'Abs'], label: 'Lower Body & Core' },
      { day: 'Friday', focus: ['Chest', 'Back', 'Shoulders', 'Biceps', 'Triceps', 'Abs'], label: 'Full Body Accessories' }
    ],
    4: [
      { day: 'Monday', focus: ['Chest', 'Back', 'Shoulders', 'Biceps', 'Triceps'], label: 'Upper Body 1' },
      { day: 'Tuesday', focus: ['Legs', 'Abs'], label: 'Lower Body & Core 1' },
      { day: 'Thursday', focus: ['Chest', 'Back', 'Shoulders', 'Biceps', 'Triceps'], label: 'Upper Body 2' },
      { day: 'Friday', focus: ['Legs', 'Abs'], label: 'Lower Body & Core 2' }
    ],
    5: [
      { day: 'Monday', focus: ['Chest', 'Back', 'Shoulders', 'Biceps', 'Triceps'], label: 'Upper Body 1' },
      { day: 'Tuesday', focus: ['Legs', 'Abs'], label: 'Lower Body & Core 1' },
      { day: 'Thursday', focus: ['Chest', 'Back', 'Shoulders', 'Biceps', 'Triceps'], label: 'Upper Body 2' },
      { day: 'Friday', focus: ['Legs', 'Abs'], label: 'Lower Body & Core 2' },
      { day: 'Saturday', focus: ['Chest', 'Back', 'Legs', 'Abs'], label: 'Full Body Conditioning' }
    ],
    6: [
      { day: 'Monday', focus: ['Chest', 'Back', 'Shoulders', 'Biceps', 'Triceps'], label: 'Upper Body 1' },
      { day: 'Tuesday', focus: ['Legs', 'Abs'], label: 'Lower Body 1' },
      { day: 'Wednesday', focus: ['Chest', 'Back', 'Shoulders', 'Biceps', 'Triceps', 'Abs'], label: 'Upper Body 2' },
      { day: 'Thursday', focus: ['Legs', 'Abs'], label: 'Lower Body 2' },
      { day: 'Friday', focus: ['Chest', 'Back', 'Shoulders', 'Biceps', 'Triceps'], label: 'Upper Body 3' },
      { day: 'Saturday', focus: ['Legs', 'Abs'], label: 'Lower Body 3' }
    ]
  },
  'FullBody': {
    3: [
      { day: 'Monday', focus: ['Chest', 'Back', 'Legs', 'Abs'], label: 'Full Body A' },
      { day: 'Wednesday', focus: ['Shoulders', 'Biceps', 'Triceps', 'Legs', 'Abs'], label: 'Full Body B' },
      { day: 'Friday', focus: ['Chest', 'Back', 'Shoulders', 'Legs', 'Abs'], label: 'Full Body C' }
    ],
    4: [
      { day: 'Monday', focus: ['Chest', 'Back', 'Legs'], label: 'Full Body - Strength' },
      { day: 'Tuesday', focus: ['Shoulders', 'Biceps', 'Triceps', 'Abs'], label: 'Arms & Core Day' },
      { day: 'Thursday', focus: ['Chest', 'Back', 'Legs', 'Abs'], label: 'Full Body - Hypertrophy' },
      { day: 'Friday', focus: ['Shoulders', 'Legs', 'Abs'], label: 'Conditioning & Core' }
    ],
    5: [
      { day: 'Monday', focus: ['Chest', 'Back', 'Legs'], label: 'Full Body A' },
      { day: 'Tuesday', focus: ['Shoulders', 'Biceps', 'Triceps', 'Abs'], label: 'Accessories A' },
      { day: 'Thursday', focus: ['Chest', 'Back', 'Legs'], label: 'Full Body B' },
      { day: 'Friday', focus: ['Shoulders', 'Biceps', 'Triceps', 'Abs'], label: 'Accessories B' },
      { day: 'Saturday', focus: ['Chest', 'Back', 'Legs', 'Shoulders', 'Abs'], label: 'Full Body C' }
    ],
    6: [
      { day: 'Monday', focus: ['Chest', 'Back', 'Legs'], label: 'Full Body A' },
      { day: 'Tuesday', focus: ['Shoulders', 'Biceps', 'Triceps', 'Abs'], label: 'Accessories A' },
      { day: 'Wednesday', focus: ['Chest', 'Back', 'Legs'], label: 'Full Body B' },
      { day: 'Thursday', focus: ['Shoulders', 'Biceps', 'Triceps', 'Abs'], label: 'Accessories B' },
      { day: 'Friday', focus: ['Chest', 'Back', 'Legs'], label: 'Full Body C' },
      { day: 'Saturday', focus: ['Shoulders', 'Biceps', 'Triceps', 'Abs'], label: 'Accessories C' }
    ]
  }
};

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

// Determine exercises per muscle group based on focus
function getExerciseCount(level, muscleGroups) {
  const counts = {
    'Beginner': { single: 3, multi: 2 },
    'Intermediate': { single: 4, multi: 3 },
    'Advanced': { single: 5, multi: 3 }
  };
  const c = counts[level] || counts['Intermediate'];
  return muscleGroups.length <= 2 ? c.single : c.multi;
}

// Filter exercises by difficulty
function filterByLevel(exs, level) {
  if (level === 'Beginner') return exs.filter(e => e.difficulty === 'Beginner');
  if (level === 'Intermediate') return exs.filter(e => e.difficulty !== 'Advanced');
  return exs; // Advanced gets everything
}

// Shuffle and pick from array
function pickRandom(arr, count) {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

/**
 * Generate a full workout plan
 * @param {Object} profile - User profile
 * @param {string} profile.goal - Fitness goal
 * @param {string} profile.level - Experience level
 * @param {string} profile.equipment - Available equipment
 * @param {number} profile.daysPerWeek - Training days (3-6)
 * @param {string} profile.splitType - Workout split layout preference
 * @returns {Object} Weekly schedule
 */
export function generateWorkoutPlan(profile) {
  const {
    goal = 'General Fitness',
    level = 'Intermediate',
    equipment = 'Full Gym',
    daysPerWeek = 4,
    splitType = 'UpperLower'
  } = profile;

  const days = Math.min(Math.max(daysPerWeek, 3), 6);
  
  // Select active split template list
  let template = null;
  if (splitType && SPLIT_BY_TYPE[splitType]) {
    template = SPLIT_BY_TYPE[splitType][days] || SPLIT_BY_TYPE[splitType][4];
  } else {
    // default mapping
    const defaultSplitMap = {
      'Muscle Gain': 'Arnold',
      'Fat Loss': 'UpperLower',
      'Strength': 'PPL',
      'Athletic Performance': 'FullBody',
      'Endurance': 'FullBody',
      'General Fitness': 'UpperLower'
    };
    const mappedSplit = defaultSplitMap[goal] || 'UpperLower';
    template = SPLIT_BY_TYPE[mappedSplit][days] || SPLIT_BY_TYPE[mappedSplit][4];
  }

  const schedule = {};

  // Initialize all days as rest
  DAYS.forEach(day => {
    schedule[day] = { exercises: [], label: 'Rest Day', isRest: true };
  });

  // Fill in training days
  template.forEach(({ day, focus, label }) => {
    const dayExercises = [];

    focus.forEach(muscle => {
      // Get all exercises for this muscle and equipment
      let available = exercises.filter(e =>
        e.muscle === muscle && e.equipment.includes(equipment)
      );

      // Filter by level
      available = filterByLevel(available, level);

      // If no exercises match strict criteria, broaden to all equipment-compatible
      if (available.length === 0) {
        available = exercises.filter(e => e.muscle === muscle);
        available = filterByLevel(available, level);
      }

      // If still empty, just get any exercises for the muscle
      if (available.length === 0) {
        available = exercises.filter(e => e.muscle === muscle);
      }

      const count = getExerciseCount(level, focus);
      const selected = pickRandom(available, count);

      selected.forEach(ex => {
        // Handle athletic performance or general fallback
        const setsVal = ex.sets[goal] || ex.sets['Strength'] || 3;
        const repsVal = ex.reps[goal] || ex.reps['Strength'] || '8-10';
        const restVal = ex.rest[goal] || ex.rest['Strength'] || 60;

        dayExercises.push({
          id: ex.id + '-' + Math.random().toString(36).substr(2, 5),
          exerciseId: ex.id,
          name: ex.name,
          muscle: ex.muscle,
          sets: setsVal,
          reps: repsVal,
          rest: restVal,
          difficulty: ex.difficulty,
          completed: false
        });
      });
    });

    schedule[day] = { exercises: dayExercises, label, isRest: false };
  });

  return schedule;
}


/**
 * Get a quick summary of the generated plan
 */
export function getPlanSummary(schedule) {
  let totalExercises = 0;
  let trainingDays = 0;
  let musclesHit = new Set();

  Object.values(schedule).forEach(day => {
    if (!day.isRest) {
      trainingDays++;
      day.exercises.forEach(ex => {
        totalExercises++;
        musclesHit.add(ex.muscle);
      });
    }
  });

  return {
    totalExercises,
    trainingDays,
    restDays: 7 - trainingDays,
    muscleGroups: Array.from(musclesHit)
  };
}
