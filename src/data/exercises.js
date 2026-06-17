export const MUSCLE_GROUPS = ["Chest", "Back", "Lats", "Shoulders", "Biceps", "Triceps", "Forearms", "Quads", "Hamstrings", "Glutes", "Calves", "Core"];

export const DIFFICULTY_LEVELS = ["Beginner", "Intermediate", "Advanced"];

export const EQUIPMENT_TYPES = ["Full Gym", "Dumbbells Only", "Home Workout", "Resistance Bands"];

export const exercises = [
  {
    id: 'bench-press',
    name: 'Bench Press',
    muscle: 'Chest',
    muscleGroup: 'Chest',
    secondaryMuscles: ['Core'],
    equipment: ['Full Gym'],
    difficulty: 'Beginner',
    exerciseType: 'Compound',
    instructions: [
      'Assume the correct starting position for Bench Press.',
      'Execute the movement with controlled tempo.',
      'Squeeze the Chest at the peak contraction.',
      'Return to the starting position slowly.'
    ],
    commonMistakes: [
      'Using momentum instead of muscle control.',
      'Not using a full range of motion.'
    ],
    proTips: [
      'Focus on the mind-muscle connection with the Chest.'
    ],
    setsRecommendation: {
      muscleGain: '3-4 sets of 8-12 reps',
      strength: '4-5 sets of 3-5 reps',
      fatLoss: '3 sets of 12-15 reps'
    },
    // Adding backward compatibility fields for WorkoutGenerator/Analytics
    sets: { 'Muscle Gain': 4, 'Fat Loss': 3, 'Strength': 5, 'Endurance': 3, 'General Fitness': 3 },
    reps: { 'Muscle Gain': '8-12', 'Fat Loss': '12-15', 'Strength': '3-5', 'Endurance': '15-20', 'General Fitness': '10-12' },
    rest: { 'Muscle Gain': 90, 'Fat Loss': 45, 'Strength': 180, 'Endurance': 30, 'General Fitness': 60 },
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop',
    gifUrl: ''
  },
  {
    id: 'incline-bench-press',
    name: 'Incline Bench Press',
    muscle: 'Chest',
    muscleGroup: 'Chest',
    secondaryMuscles: ['Core'],
    equipment: ['Full Gym'],
    difficulty: 'Beginner',
    exerciseType: 'Compound',
    instructions: [
      'Assume the correct starting position for Incline Bench Press.',
      'Execute the movement with controlled tempo.',
      'Squeeze the Chest at the peak contraction.',
      'Return to the starting position slowly.'
    ],
    commonMistakes: [
      'Using momentum instead of muscle control.',
      'Not using a full range of motion.'
    ],
    proTips: [
      'Focus on the mind-muscle connection with the Chest.'
    ],
    setsRecommendation: {
      muscleGain: '3-4 sets of 8-12 reps',
      strength: '4-5 sets of 3-5 reps',
      fatLoss: '3 sets of 12-15 reps'
    },
    // Adding backward compatibility fields for WorkoutGenerator/Analytics
    sets: { 'Muscle Gain': 4, 'Fat Loss': 3, 'Strength': 5, 'Endurance': 3, 'General Fitness': 3 },
    reps: { 'Muscle Gain': '8-12', 'Fat Loss': '12-15', 'Strength': '3-5', 'Endurance': '15-20', 'General Fitness': '10-12' },
    rest: { 'Muscle Gain': 90, 'Fat Loss': 45, 'Strength': 180, 'Endurance': 30, 'General Fitness': 60 },
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop',
    gifUrl: ''
  },
  {
    id: 'decline-bench-press',
    name: 'Decline Bench Press',
    muscle: 'Chest',
    muscleGroup: 'Chest',
    secondaryMuscles: ['Core'],
    equipment: ['Full Gym'],
    difficulty: 'Beginner',
    exerciseType: 'Compound',
    instructions: [
      'Assume the correct starting position for Decline Bench Press.',
      'Execute the movement with controlled tempo.',
      'Squeeze the Chest at the peak contraction.',
      'Return to the starting position slowly.'
    ],
    commonMistakes: [
      'Using momentum instead of muscle control.',
      'Not using a full range of motion.'
    ],
    proTips: [
      'Focus on the mind-muscle connection with the Chest.'
    ],
    setsRecommendation: {
      muscleGain: '3-4 sets of 8-12 reps',
      strength: '4-5 sets of 3-5 reps',
      fatLoss: '3 sets of 12-15 reps'
    },
    // Adding backward compatibility fields for WorkoutGenerator/Analytics
    sets: { 'Muscle Gain': 4, 'Fat Loss': 3, 'Strength': 5, 'Endurance': 3, 'General Fitness': 3 },
    reps: { 'Muscle Gain': '8-12', 'Fat Loss': '12-15', 'Strength': '3-5', 'Endurance': '15-20', 'General Fitness': '10-12' },
    rest: { 'Muscle Gain': 90, 'Fat Loss': 45, 'Strength': 180, 'Endurance': 30, 'General Fitness': 60 },
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop',
    gifUrl: ''
  },
  {
    id: 'dumbbell-press',
    name: 'Dumbbell Press',
    muscle: 'Chest',
    muscleGroup: 'Chest',
    secondaryMuscles: ['Core'],
    equipment: ['Full Gym'],
    difficulty: 'Intermediate',
    exerciseType: 'Compound',
    instructions: [
      'Assume the correct starting position for Dumbbell Press.',
      'Execute the movement with controlled tempo.',
      'Squeeze the Chest at the peak contraction.',
      'Return to the starting position slowly.'
    ],
    commonMistakes: [
      'Using momentum instead of muscle control.',
      'Not using a full range of motion.'
    ],
    proTips: [
      'Focus on the mind-muscle connection with the Chest.'
    ],
    setsRecommendation: {
      muscleGain: '3-4 sets of 8-12 reps',
      strength: '4-5 sets of 3-5 reps',
      fatLoss: '3 sets of 12-15 reps'
    },
    // Adding backward compatibility fields for WorkoutGenerator/Analytics
    sets: { 'Muscle Gain': 4, 'Fat Loss': 3, 'Strength': 5, 'Endurance': 3, 'General Fitness': 3 },
    reps: { 'Muscle Gain': '8-12', 'Fat Loss': '12-15', 'Strength': '3-5', 'Endurance': '15-20', 'General Fitness': '10-12' },
    rest: { 'Muscle Gain': 90, 'Fat Loss': 45, 'Strength': 180, 'Endurance': 30, 'General Fitness': 60 },
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop',
    gifUrl: ''
  },
  {
    id: 'incline-dumbbell-press',
    name: 'Incline Dumbbell Press',
    muscle: 'Chest',
    muscleGroup: 'Chest',
    secondaryMuscles: ['Core'],
    equipment: ['Full Gym'],
    difficulty: 'Intermediate',
    exerciseType: 'Compound',
    instructions: [
      'Assume the correct starting position for Incline Dumbbell Press.',
      'Execute the movement with controlled tempo.',
      'Squeeze the Chest at the peak contraction.',
      'Return to the starting position slowly.'
    ],
    commonMistakes: [
      'Using momentum instead of muscle control.',
      'Not using a full range of motion.'
    ],
    proTips: [
      'Focus on the mind-muscle connection with the Chest.'
    ],
    setsRecommendation: {
      muscleGain: '3-4 sets of 8-12 reps',
      strength: '4-5 sets of 3-5 reps',
      fatLoss: '3 sets of 12-15 reps'
    },
    // Adding backward compatibility fields for WorkoutGenerator/Analytics
    sets: { 'Muscle Gain': 4, 'Fat Loss': 3, 'Strength': 5, 'Endurance': 3, 'General Fitness': 3 },
    reps: { 'Muscle Gain': '8-12', 'Fat Loss': '12-15', 'Strength': '3-5', 'Endurance': '15-20', 'General Fitness': '10-12' },
    rest: { 'Muscle Gain': 90, 'Fat Loss': 45, 'Strength': 180, 'Endurance': 30, 'General Fitness': 60 },
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop',
    gifUrl: ''
  },
  {
    id: 'dumbbell-fly',
    name: 'Dumbbell Fly',
    muscle: 'Chest',
    muscleGroup: 'Chest',
    secondaryMuscles: ['Core'],
    equipment: ['Full Gym'],
    difficulty: 'Intermediate',
    exerciseType: 'Isolation',
    instructions: [
      'Assume the correct starting position for Dumbbell Fly.',
      'Execute the movement with controlled tempo.',
      'Squeeze the Chest at the peak contraction.',
      'Return to the starting position slowly.'
    ],
    commonMistakes: [
      'Using momentum instead of muscle control.',
      'Not using a full range of motion.'
    ],
    proTips: [
      'Focus on the mind-muscle connection with the Chest.'
    ],
    setsRecommendation: {
      muscleGain: '3-4 sets of 8-12 reps',
      strength: '4-5 sets of 3-5 reps',
      fatLoss: '3 sets of 12-15 reps'
    },
    // Adding backward compatibility fields for WorkoutGenerator/Analytics
    sets: { 'Muscle Gain': 4, 'Fat Loss': 3, 'Strength': 5, 'Endurance': 3, 'General Fitness': 3 },
    reps: { 'Muscle Gain': '8-12', 'Fat Loss': '12-15', 'Strength': '3-5', 'Endurance': '15-20', 'General Fitness': '10-12' },
    rest: { 'Muscle Gain': 90, 'Fat Loss': 45, 'Strength': 180, 'Endurance': 30, 'General Fitness': 60 },
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop',
    gifUrl: ''
  },
  {
    id: 'cable-fly',
    name: 'Cable Fly',
    muscle: 'Chest',
    muscleGroup: 'Chest',
    secondaryMuscles: ['Core'],
    equipment: ['Full Gym'],
    difficulty: 'Intermediate',
    exerciseType: 'Isolation',
    instructions: [
      'Assume the correct starting position for Cable Fly.',
      'Execute the movement with controlled tempo.',
      'Squeeze the Chest at the peak contraction.',
      'Return to the starting position slowly.'
    ],
    commonMistakes: [
      'Using momentum instead of muscle control.',
      'Not using a full range of motion.'
    ],
    proTips: [
      'Focus on the mind-muscle connection with the Chest.'
    ],
    setsRecommendation: {
      muscleGain: '3-4 sets of 8-12 reps',
      strength: '4-5 sets of 3-5 reps',
      fatLoss: '3 sets of 12-15 reps'
    },
    // Adding backward compatibility fields for WorkoutGenerator/Analytics
    sets: { 'Muscle Gain': 4, 'Fat Loss': 3, 'Strength': 5, 'Endurance': 3, 'General Fitness': 3 },
    reps: { 'Muscle Gain': '8-12', 'Fat Loss': '12-15', 'Strength': '3-5', 'Endurance': '15-20', 'General Fitness': '10-12' },
    rest: { 'Muscle Gain': 90, 'Fat Loss': 45, 'Strength': 180, 'Endurance': 30, 'General Fitness': 60 },
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop',
    gifUrl: ''
  },
  {
    id: 'push-up',
    name: 'Push Up',
    muscle: 'Chest',
    muscleGroup: 'Chest',
    secondaryMuscles: ['Core'],
    equipment: ['Full Gym'],
    difficulty: 'Beginner',
    exerciseType: 'Compound',
    instructions: [
      'Assume the correct starting position for Push Up.',
      'Execute the movement with controlled tempo.',
      'Squeeze the Chest at the peak contraction.',
      'Return to the starting position slowly.'
    ],
    commonMistakes: [
      'Using momentum instead of muscle control.',
      'Not using a full range of motion.'
    ],
    proTips: [
      'Focus on the mind-muscle connection with the Chest.'
    ],
    setsRecommendation: {
      muscleGain: '3-4 sets of 8-12 reps',
      strength: '4-5 sets of 3-5 reps',
      fatLoss: '3 sets of 12-15 reps'
    },
    // Adding backward compatibility fields for WorkoutGenerator/Analytics
    sets: { 'Muscle Gain': 4, 'Fat Loss': 3, 'Strength': 5, 'Endurance': 3, 'General Fitness': 3 },
    reps: { 'Muscle Gain': '8-12', 'Fat Loss': '12-15', 'Strength': '3-5', 'Endurance': '15-20', 'General Fitness': '10-12' },
    rest: { 'Muscle Gain': 90, 'Fat Loss': 45, 'Strength': 180, 'Endurance': 30, 'General Fitness': 60 },
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop',
    gifUrl: ''
  },
  {
    id: 'chest-dips',
    name: 'Chest Dips',
    muscle: 'Chest',
    muscleGroup: 'Chest',
    secondaryMuscles: ['Core'],
    equipment: ['Full Gym'],
    difficulty: 'Beginner',
    exerciseType: 'Compound',
    instructions: [
      'Assume the correct starting position for Chest Dips.',
      'Execute the movement with controlled tempo.',
      'Squeeze the Chest at the peak contraction.',
      'Return to the starting position slowly.'
    ],
    commonMistakes: [
      'Using momentum instead of muscle control.',
      'Not using a full range of motion.'
    ],
    proTips: [
      'Focus on the mind-muscle connection with the Chest.'
    ],
    setsRecommendation: {
      muscleGain: '3-4 sets of 8-12 reps',
      strength: '4-5 sets of 3-5 reps',
      fatLoss: '3 sets of 12-15 reps'
    },
    // Adding backward compatibility fields for WorkoutGenerator/Analytics
    sets: { 'Muscle Gain': 4, 'Fat Loss': 3, 'Strength': 5, 'Endurance': 3, 'General Fitness': 3 },
    reps: { 'Muscle Gain': '8-12', 'Fat Loss': '12-15', 'Strength': '3-5', 'Endurance': '15-20', 'General Fitness': '10-12' },
    rest: { 'Muscle Gain': 90, 'Fat Loss': 45, 'Strength': 180, 'Endurance': 30, 'General Fitness': 60 },
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop',
    gifUrl: ''
  },
  {
    id: 'pec-deck',
    name: 'Pec Deck',
    muscle: 'Chest',
    muscleGroup: 'Chest',
    secondaryMuscles: ['Core'],
    equipment: ['Full Gym'],
    difficulty: 'Beginner',
    exerciseType: 'Compound',
    instructions: [
      'Assume the correct starting position for Pec Deck.',
      'Execute the movement with controlled tempo.',
      'Squeeze the Chest at the peak contraction.',
      'Return to the starting position slowly.'
    ],
    commonMistakes: [
      'Using momentum instead of muscle control.',
      'Not using a full range of motion.'
    ],
    proTips: [
      'Focus on the mind-muscle connection with the Chest.'
    ],
    setsRecommendation: {
      muscleGain: '3-4 sets of 8-12 reps',
      strength: '4-5 sets of 3-5 reps',
      fatLoss: '3 sets of 12-15 reps'
    },
    // Adding backward compatibility fields for WorkoutGenerator/Analytics
    sets: { 'Muscle Gain': 4, 'Fat Loss': 3, 'Strength': 5, 'Endurance': 3, 'General Fitness': 3 },
    reps: { 'Muscle Gain': '8-12', 'Fat Loss': '12-15', 'Strength': '3-5', 'Endurance': '15-20', 'General Fitness': '10-12' },
    rest: { 'Muscle Gain': 90, 'Fat Loss': 45, 'Strength': 180, 'Endurance': 30, 'General Fitness': 60 },
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop',
    gifUrl: ''
  },
  {
    id: 'barbell-row',
    name: 'Barbell Row',
    muscle: 'Back',
    muscleGroup: 'Back',
    secondaryMuscles: ['Core'],
    equipment: ['Full Gym'],
    difficulty: 'Beginner',
    exerciseType: 'Compound',
    instructions: [
      'Assume the correct starting position for Barbell Row.',
      'Execute the movement with controlled tempo.',
      'Squeeze the Back at the peak contraction.',
      'Return to the starting position slowly.'
    ],
    commonMistakes: [
      'Using momentum instead of muscle control.',
      'Not using a full range of motion.'
    ],
    proTips: [
      'Focus on the mind-muscle connection with the Back.'
    ],
    setsRecommendation: {
      muscleGain: '3-4 sets of 8-12 reps',
      strength: '4-5 sets of 3-5 reps',
      fatLoss: '3 sets of 12-15 reps'
    },
    // Adding backward compatibility fields for WorkoutGenerator/Analytics
    sets: { 'Muscle Gain': 4, 'Fat Loss': 3, 'Strength': 5, 'Endurance': 3, 'General Fitness': 3 },
    reps: { 'Muscle Gain': '8-12', 'Fat Loss': '12-15', 'Strength': '3-5', 'Endurance': '15-20', 'General Fitness': '10-12' },
    rest: { 'Muscle Gain': 90, 'Fat Loss': 45, 'Strength': 180, 'Endurance': 30, 'General Fitness': 60 },
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop',
    gifUrl: ''
  },
  {
    id: 't-bar-row',
    name: 'T Bar Row',
    muscle: 'Back',
    muscleGroup: 'Back',
    secondaryMuscles: ['Core'],
    equipment: ['Full Gym'],
    difficulty: 'Beginner',
    exerciseType: 'Compound',
    instructions: [
      'Assume the correct starting position for T Bar Row.',
      'Execute the movement with controlled tempo.',
      'Squeeze the Back at the peak contraction.',
      'Return to the starting position slowly.'
    ],
    commonMistakes: [
      'Using momentum instead of muscle control.',
      'Not using a full range of motion.'
    ],
    proTips: [
      'Focus on the mind-muscle connection with the Back.'
    ],
    setsRecommendation: {
      muscleGain: '3-4 sets of 8-12 reps',
      strength: '4-5 sets of 3-5 reps',
      fatLoss: '3 sets of 12-15 reps'
    },
    // Adding backward compatibility fields for WorkoutGenerator/Analytics
    sets: { 'Muscle Gain': 4, 'Fat Loss': 3, 'Strength': 5, 'Endurance': 3, 'General Fitness': 3 },
    reps: { 'Muscle Gain': '8-12', 'Fat Loss': '12-15', 'Strength': '3-5', 'Endurance': '15-20', 'General Fitness': '10-12' },
    rest: { 'Muscle Gain': 90, 'Fat Loss': 45, 'Strength': 180, 'Endurance': 30, 'General Fitness': 60 },
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop',
    gifUrl: ''
  },
  {
    id: 'seated-cable-row',
    name: 'Seated Cable Row',
    muscle: 'Back',
    muscleGroup: 'Back',
    secondaryMuscles: ['Core'],
    equipment: ['Full Gym'],
    difficulty: 'Intermediate',
    exerciseType: 'Compound',
    instructions: [
      'Assume the correct starting position for Seated Cable Row.',
      'Execute the movement with controlled tempo.',
      'Squeeze the Back at the peak contraction.',
      'Return to the starting position slowly.'
    ],
    commonMistakes: [
      'Using momentum instead of muscle control.',
      'Not using a full range of motion.'
    ],
    proTips: [
      'Focus on the mind-muscle connection with the Back.'
    ],
    setsRecommendation: {
      muscleGain: '3-4 sets of 8-12 reps',
      strength: '4-5 sets of 3-5 reps',
      fatLoss: '3 sets of 12-15 reps'
    },
    // Adding backward compatibility fields for WorkoutGenerator/Analytics
    sets: { 'Muscle Gain': 4, 'Fat Loss': 3, 'Strength': 5, 'Endurance': 3, 'General Fitness': 3 },
    reps: { 'Muscle Gain': '8-12', 'Fat Loss': '12-15', 'Strength': '3-5', 'Endurance': '15-20', 'General Fitness': '10-12' },
    rest: { 'Muscle Gain': 90, 'Fat Loss': 45, 'Strength': 180, 'Endurance': 30, 'General Fitness': 60 },
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop',
    gifUrl: ''
  },
  {
    id: 'chest-supported-row',
    name: 'Chest Supported Row',
    muscle: 'Back',
    muscleGroup: 'Back',
    secondaryMuscles: ['Core'],
    equipment: ['Full Gym'],
    difficulty: 'Beginner',
    exerciseType: 'Compound',
    instructions: [
      'Assume the correct starting position for Chest Supported Row.',
      'Execute the movement with controlled tempo.',
      'Squeeze the Back at the peak contraction.',
      'Return to the starting position slowly.'
    ],
    commonMistakes: [
      'Using momentum instead of muscle control.',
      'Not using a full range of motion.'
    ],
    proTips: [
      'Focus on the mind-muscle connection with the Back.'
    ],
    setsRecommendation: {
      muscleGain: '3-4 sets of 8-12 reps',
      strength: '4-5 sets of 3-5 reps',
      fatLoss: '3 sets of 12-15 reps'
    },
    // Adding backward compatibility fields for WorkoutGenerator/Analytics
    sets: { 'Muscle Gain': 4, 'Fat Loss': 3, 'Strength': 5, 'Endurance': 3, 'General Fitness': 3 },
    reps: { 'Muscle Gain': '8-12', 'Fat Loss': '12-15', 'Strength': '3-5', 'Endurance': '15-20', 'General Fitness': '10-12' },
    rest: { 'Muscle Gain': 90, 'Fat Loss': 45, 'Strength': 180, 'Endurance': 30, 'General Fitness': 60 },
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop',
    gifUrl: ''
  },
  {
    id: 'dumbbell-row',
    name: 'Dumbbell Row',
    muscle: 'Back',
    muscleGroup: 'Back',
    secondaryMuscles: ['Core'],
    equipment: ['Full Gym'],
    difficulty: 'Intermediate',
    exerciseType: 'Compound',
    instructions: [
      'Assume the correct starting position for Dumbbell Row.',
      'Execute the movement with controlled tempo.',
      'Squeeze the Back at the peak contraction.',
      'Return to the starting position slowly.'
    ],
    commonMistakes: [
      'Using momentum instead of muscle control.',
      'Not using a full range of motion.'
    ],
    proTips: [
      'Focus on the mind-muscle connection with the Back.'
    ],
    setsRecommendation: {
      muscleGain: '3-4 sets of 8-12 reps',
      strength: '4-5 sets of 3-5 reps',
      fatLoss: '3 sets of 12-15 reps'
    },
    // Adding backward compatibility fields for WorkoutGenerator/Analytics
    sets: { 'Muscle Gain': 4, 'Fat Loss': 3, 'Strength': 5, 'Endurance': 3, 'General Fitness': 3 },
    reps: { 'Muscle Gain': '8-12', 'Fat Loss': '12-15', 'Strength': '3-5', 'Endurance': '15-20', 'General Fitness': '10-12' },
    rest: { 'Muscle Gain': 90, 'Fat Loss': 45, 'Strength': 180, 'Endurance': 30, 'General Fitness': 60 },
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop',
    gifUrl: ''
  },
  {
    id: 'machine-row',
    name: 'Machine Row',
    muscle: 'Back',
    muscleGroup: 'Back',
    secondaryMuscles: ['Core'],
    equipment: ['Full Gym'],
    difficulty: 'Intermediate',
    exerciseType: 'Compound',
    instructions: [
      'Assume the correct starting position for Machine Row.',
      'Execute the movement with controlled tempo.',
      'Squeeze the Back at the peak contraction.',
      'Return to the starting position slowly.'
    ],
    commonMistakes: [
      'Using momentum instead of muscle control.',
      'Not using a full range of motion.'
    ],
    proTips: [
      'Focus on the mind-muscle connection with the Back.'
    ],
    setsRecommendation: {
      muscleGain: '3-4 sets of 8-12 reps',
      strength: '4-5 sets of 3-5 reps',
      fatLoss: '3 sets of 12-15 reps'
    },
    // Adding backward compatibility fields for WorkoutGenerator/Analytics
    sets: { 'Muscle Gain': 4, 'Fat Loss': 3, 'Strength': 5, 'Endurance': 3, 'General Fitness': 3 },
    reps: { 'Muscle Gain': '8-12', 'Fat Loss': '12-15', 'Strength': '3-5', 'Endurance': '15-20', 'General Fitness': '10-12' },
    rest: { 'Muscle Gain': 90, 'Fat Loss': 45, 'Strength': 180, 'Endurance': 30, 'General Fitness': 60 },
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop',
    gifUrl: ''
  },
  {
    id: 'pendlay-row',
    name: 'Pendlay Row',
    muscle: 'Back',
    muscleGroup: 'Back',
    secondaryMuscles: ['Core'],
    equipment: ['Full Gym'],
    difficulty: 'Beginner',
    exerciseType: 'Compound',
    instructions: [
      'Assume the correct starting position for Pendlay Row.',
      'Execute the movement with controlled tempo.',
      'Squeeze the Back at the peak contraction.',
      'Return to the starting position slowly.'
    ],
    commonMistakes: [
      'Using momentum instead of muscle control.',
      'Not using a full range of motion.'
    ],
    proTips: [
      'Focus on the mind-muscle connection with the Back.'
    ],
    setsRecommendation: {
      muscleGain: '3-4 sets of 8-12 reps',
      strength: '4-5 sets of 3-5 reps',
      fatLoss: '3 sets of 12-15 reps'
    },
    // Adding backward compatibility fields for WorkoutGenerator/Analytics
    sets: { 'Muscle Gain': 4, 'Fat Loss': 3, 'Strength': 5, 'Endurance': 3, 'General Fitness': 3 },
    reps: { 'Muscle Gain': '8-12', 'Fat Loss': '12-15', 'Strength': '3-5', 'Endurance': '15-20', 'General Fitness': '10-12' },
    rest: { 'Muscle Gain': 90, 'Fat Loss': 45, 'Strength': 180, 'Endurance': 30, 'General Fitness': 60 },
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop',
    gifUrl: ''
  },
  {
    id: 'pull-up',
    name: 'Pull Up',
    muscle: 'Back',
    muscleGroup: 'Lats',
    secondaryMuscles: ['Core'],
    equipment: ['Full Gym'],
    difficulty: 'Beginner',
    exerciseType: 'Compound',
    instructions: [
      'Assume the correct starting position for Pull Up.',
      'Execute the movement with controlled tempo.',
      'Squeeze the Lats at the peak contraction.',
      'Return to the starting position slowly.'
    ],
    commonMistakes: [
      'Using momentum instead of muscle control.',
      'Not using a full range of motion.'
    ],
    proTips: [
      'Focus on the mind-muscle connection with the Lats.'
    ],
    setsRecommendation: {
      muscleGain: '3-4 sets of 8-12 reps',
      strength: '4-5 sets of 3-5 reps',
      fatLoss: '3 sets of 12-15 reps'
    },
    // Adding backward compatibility fields for WorkoutGenerator/Analytics
    sets: { 'Muscle Gain': 4, 'Fat Loss': 3, 'Strength': 5, 'Endurance': 3, 'General Fitness': 3 },
    reps: { 'Muscle Gain': '8-12', 'Fat Loss': '12-15', 'Strength': '3-5', 'Endurance': '15-20', 'General Fitness': '10-12' },
    rest: { 'Muscle Gain': 90, 'Fat Loss': 45, 'Strength': 180, 'Endurance': 30, 'General Fitness': 60 },
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop',
    gifUrl: ''
  },
  {
    id: 'chin-up',
    name: 'Chin Up',
    muscle: 'Back',
    muscleGroup: 'Lats',
    secondaryMuscles: ['Core'],
    equipment: ['Full Gym'],
    difficulty: 'Beginner',
    exerciseType: 'Compound',
    instructions: [
      'Assume the correct starting position for Chin Up.',
      'Execute the movement with controlled tempo.',
      'Squeeze the Lats at the peak contraction.',
      'Return to the starting position slowly.'
    ],
    commonMistakes: [
      'Using momentum instead of muscle control.',
      'Not using a full range of motion.'
    ],
    proTips: [
      'Focus on the mind-muscle connection with the Lats.'
    ],
    setsRecommendation: {
      muscleGain: '3-4 sets of 8-12 reps',
      strength: '4-5 sets of 3-5 reps',
      fatLoss: '3 sets of 12-15 reps'
    },
    // Adding backward compatibility fields for WorkoutGenerator/Analytics
    sets: { 'Muscle Gain': 4, 'Fat Loss': 3, 'Strength': 5, 'Endurance': 3, 'General Fitness': 3 },
    reps: { 'Muscle Gain': '8-12', 'Fat Loss': '12-15', 'Strength': '3-5', 'Endurance': '15-20', 'General Fitness': '10-12' },
    rest: { 'Muscle Gain': 90, 'Fat Loss': 45, 'Strength': 180, 'Endurance': 30, 'General Fitness': 60 },
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop',
    gifUrl: ''
  },
  {
    id: 'lat-pulldown',
    name: 'Lat Pulldown',
    muscle: 'Back',
    muscleGroup: 'Lats',
    secondaryMuscles: ['Core'],
    equipment: ['Full Gym'],
    difficulty: 'Beginner',
    exerciseType: 'Compound',
    instructions: [
      'Assume the correct starting position for Lat Pulldown.',
      'Execute the movement with controlled tempo.',
      'Squeeze the Lats at the peak contraction.',
      'Return to the starting position slowly.'
    ],
    commonMistakes: [
      'Using momentum instead of muscle control.',
      'Not using a full range of motion.'
    ],
    proTips: [
      'Focus on the mind-muscle connection with the Lats.'
    ],
    setsRecommendation: {
      muscleGain: '3-4 sets of 8-12 reps',
      strength: '4-5 sets of 3-5 reps',
      fatLoss: '3 sets of 12-15 reps'
    },
    // Adding backward compatibility fields for WorkoutGenerator/Analytics
    sets: { 'Muscle Gain': 4, 'Fat Loss': 3, 'Strength': 5, 'Endurance': 3, 'General Fitness': 3 },
    reps: { 'Muscle Gain': '8-12', 'Fat Loss': '12-15', 'Strength': '3-5', 'Endurance': '15-20', 'General Fitness': '10-12' },
    rest: { 'Muscle Gain': 90, 'Fat Loss': 45, 'Strength': 180, 'Endurance': 30, 'General Fitness': 60 },
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop',
    gifUrl: ''
  },
  {
    id: 'single-arm-pulldown',
    name: 'Single Arm Pulldown',
    muscle: 'Back',
    muscleGroup: 'Lats',
    secondaryMuscles: ['Core'],
    equipment: ['Full Gym'],
    difficulty: 'Beginner',
    exerciseType: 'Compound',
    instructions: [
      'Assume the correct starting position for Single Arm Pulldown.',
      'Execute the movement with controlled tempo.',
      'Squeeze the Lats at the peak contraction.',
      'Return to the starting position slowly.'
    ],
    commonMistakes: [
      'Using momentum instead of muscle control.',
      'Not using a full range of motion.'
    ],
    proTips: [
      'Focus on the mind-muscle connection with the Lats.'
    ],
    setsRecommendation: {
      muscleGain: '3-4 sets of 8-12 reps',
      strength: '4-5 sets of 3-5 reps',
      fatLoss: '3 sets of 12-15 reps'
    },
    // Adding backward compatibility fields for WorkoutGenerator/Analytics
    sets: { 'Muscle Gain': 4, 'Fat Loss': 3, 'Strength': 5, 'Endurance': 3, 'General Fitness': 3 },
    reps: { 'Muscle Gain': '8-12', 'Fat Loss': '12-15', 'Strength': '3-5', 'Endurance': '15-20', 'General Fitness': '10-12' },
    rest: { 'Muscle Gain': 90, 'Fat Loss': 45, 'Strength': 180, 'Endurance': 30, 'General Fitness': 60 },
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop',
    gifUrl: ''
  },
  {
    id: 'straight-arm-pulldown',
    name: 'Straight Arm Pulldown',
    muscle: 'Back',
    muscleGroup: 'Lats',
    secondaryMuscles: ['Core'],
    equipment: ['Full Gym'],
    difficulty: 'Beginner',
    exerciseType: 'Compound',
    instructions: [
      'Assume the correct starting position for Straight Arm Pulldown.',
      'Execute the movement with controlled tempo.',
      'Squeeze the Lats at the peak contraction.',
      'Return to the starting position slowly.'
    ],
    commonMistakes: [
      'Using momentum instead of muscle control.',
      'Not using a full range of motion.'
    ],
    proTips: [
      'Focus on the mind-muscle connection with the Lats.'
    ],
    setsRecommendation: {
      muscleGain: '3-4 sets of 8-12 reps',
      strength: '4-5 sets of 3-5 reps',
      fatLoss: '3 sets of 12-15 reps'
    },
    // Adding backward compatibility fields for WorkoutGenerator/Analytics
    sets: { 'Muscle Gain': 4, 'Fat Loss': 3, 'Strength': 5, 'Endurance': 3, 'General Fitness': 3 },
    reps: { 'Muscle Gain': '8-12', 'Fat Loss': '12-15', 'Strength': '3-5', 'Endurance': '15-20', 'General Fitness': '10-12' },
    rest: { 'Muscle Gain': 90, 'Fat Loss': 45, 'Strength': 180, 'Endurance': 30, 'General Fitness': 60 },
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop',
    gifUrl: ''
  },
  {
    id: 'machine-pullover',
    name: 'Machine Pullover',
    muscle: 'Back',
    muscleGroup: 'Lats',
    secondaryMuscles: ['Core'],
    equipment: ['Full Gym'],
    difficulty: 'Intermediate',
    exerciseType: 'Compound',
    instructions: [
      'Assume the correct starting position for Machine Pullover.',
      'Execute the movement with controlled tempo.',
      'Squeeze the Lats at the peak contraction.',
      'Return to the starting position slowly.'
    ],
    commonMistakes: [
      'Using momentum instead of muscle control.',
      'Not using a full range of motion.'
    ],
    proTips: [
      'Focus on the mind-muscle connection with the Lats.'
    ],
    setsRecommendation: {
      muscleGain: '3-4 sets of 8-12 reps',
      strength: '4-5 sets of 3-5 reps',
      fatLoss: '3 sets of 12-15 reps'
    },
    // Adding backward compatibility fields for WorkoutGenerator/Analytics
    sets: { 'Muscle Gain': 4, 'Fat Loss': 3, 'Strength': 5, 'Endurance': 3, 'General Fitness': 3 },
    reps: { 'Muscle Gain': '8-12', 'Fat Loss': '12-15', 'Strength': '3-5', 'Endurance': '15-20', 'General Fitness': '10-12' },
    rest: { 'Muscle Gain': 90, 'Fat Loss': 45, 'Strength': 180, 'Endurance': 30, 'General Fitness': 60 },
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop',
    gifUrl: ''
  },
  {
    id: 'overhead-press',
    name: 'Overhead Press',
    muscle: 'Shoulders',
    muscleGroup: 'Shoulders',
    secondaryMuscles: ['Core'],
    equipment: ['Full Gym'],
    difficulty: 'Beginner',
    exerciseType: 'Compound',
    instructions: [
      'Assume the correct starting position for Overhead Press.',
      'Execute the movement with controlled tempo.',
      'Squeeze the Shoulders at the peak contraction.',
      'Return to the starting position slowly.'
    ],
    commonMistakes: [
      'Using momentum instead of muscle control.',
      'Not using a full range of motion.'
    ],
    proTips: [
      'Focus on the mind-muscle connection with the Shoulders.'
    ],
    setsRecommendation: {
      muscleGain: '3-4 sets of 8-12 reps',
      strength: '4-5 sets of 3-5 reps',
      fatLoss: '3 sets of 12-15 reps'
    },
    // Adding backward compatibility fields for WorkoutGenerator/Analytics
    sets: { 'Muscle Gain': 4, 'Fat Loss': 3, 'Strength': 5, 'Endurance': 3, 'General Fitness': 3 },
    reps: { 'Muscle Gain': '8-12', 'Fat Loss': '12-15', 'Strength': '3-5', 'Endurance': '15-20', 'General Fitness': '10-12' },
    rest: { 'Muscle Gain': 90, 'Fat Loss': 45, 'Strength': 180, 'Endurance': 30, 'General Fitness': 60 },
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop',
    gifUrl: ''
  },
  {
    id: 'dumbbell-shoulder-press',
    name: 'Dumbbell Shoulder Press',
    muscle: 'Shoulders',
    muscleGroup: 'Shoulders',
    secondaryMuscles: ['Core'],
    equipment: ['Full Gym'],
    difficulty: 'Intermediate',
    exerciseType: 'Compound',
    instructions: [
      'Assume the correct starting position for Dumbbell Shoulder Press.',
      'Execute the movement with controlled tempo.',
      'Squeeze the Shoulders at the peak contraction.',
      'Return to the starting position slowly.'
    ],
    commonMistakes: [
      'Using momentum instead of muscle control.',
      'Not using a full range of motion.'
    ],
    proTips: [
      'Focus on the mind-muscle connection with the Shoulders.'
    ],
    setsRecommendation: {
      muscleGain: '3-4 sets of 8-12 reps',
      strength: '4-5 sets of 3-5 reps',
      fatLoss: '3 sets of 12-15 reps'
    },
    // Adding backward compatibility fields for WorkoutGenerator/Analytics
    sets: { 'Muscle Gain': 4, 'Fat Loss': 3, 'Strength': 5, 'Endurance': 3, 'General Fitness': 3 },
    reps: { 'Muscle Gain': '8-12', 'Fat Loss': '12-15', 'Strength': '3-5', 'Endurance': '15-20', 'General Fitness': '10-12' },
    rest: { 'Muscle Gain': 90, 'Fat Loss': 45, 'Strength': 180, 'Endurance': 30, 'General Fitness': 60 },
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop',
    gifUrl: ''
  },
  {
    id: 'arnold-press',
    name: 'Arnold Press',
    muscle: 'Shoulders',
    muscleGroup: 'Shoulders',
    secondaryMuscles: ['Core'],
    equipment: ['Full Gym'],
    difficulty: 'Beginner',
    exerciseType: 'Compound',
    instructions: [
      'Assume the correct starting position for Arnold Press.',
      'Execute the movement with controlled tempo.',
      'Squeeze the Shoulders at the peak contraction.',
      'Return to the starting position slowly.'
    ],
    commonMistakes: [
      'Using momentum instead of muscle control.',
      'Not using a full range of motion.'
    ],
    proTips: [
      'Focus on the mind-muscle connection with the Shoulders.'
    ],
    setsRecommendation: {
      muscleGain: '3-4 sets of 8-12 reps',
      strength: '4-5 sets of 3-5 reps',
      fatLoss: '3 sets of 12-15 reps'
    },
    // Adding backward compatibility fields for WorkoutGenerator/Analytics
    sets: { 'Muscle Gain': 4, 'Fat Loss': 3, 'Strength': 5, 'Endurance': 3, 'General Fitness': 3 },
    reps: { 'Muscle Gain': '8-12', 'Fat Loss': '12-15', 'Strength': '3-5', 'Endurance': '15-20', 'General Fitness': '10-12' },
    rest: { 'Muscle Gain': 90, 'Fat Loss': 45, 'Strength': 180, 'Endurance': 30, 'General Fitness': 60 },
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop',
    gifUrl: ''
  },
  {
    id: 'lateral-raise',
    name: 'Lateral Raise',
    muscle: 'Shoulders',
    muscleGroup: 'Shoulders',
    secondaryMuscles: ['Core'],
    equipment: ['Full Gym'],
    difficulty: 'Beginner',
    exerciseType: 'Isolation',
    instructions: [
      'Assume the correct starting position for Lateral Raise.',
      'Execute the movement with controlled tempo.',
      'Squeeze the Shoulders at the peak contraction.',
      'Return to the starting position slowly.'
    ],
    commonMistakes: [
      'Using momentum instead of muscle control.',
      'Not using a full range of motion.'
    ],
    proTips: [
      'Focus on the mind-muscle connection with the Shoulders.'
    ],
    setsRecommendation: {
      muscleGain: '3-4 sets of 8-12 reps',
      strength: '4-5 sets of 3-5 reps',
      fatLoss: '3 sets of 12-15 reps'
    },
    // Adding backward compatibility fields for WorkoutGenerator/Analytics
    sets: { 'Muscle Gain': 4, 'Fat Loss': 3, 'Strength': 5, 'Endurance': 3, 'General Fitness': 3 },
    reps: { 'Muscle Gain': '8-12', 'Fat Loss': '12-15', 'Strength': '3-5', 'Endurance': '15-20', 'General Fitness': '10-12' },
    rest: { 'Muscle Gain': 90, 'Fat Loss': 45, 'Strength': 180, 'Endurance': 30, 'General Fitness': 60 },
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop',
    gifUrl: ''
  },
  {
    id: 'cable-lateral-raise',
    name: 'Cable Lateral Raise',
    muscle: 'Shoulders',
    muscleGroup: 'Shoulders',
    secondaryMuscles: ['Core'],
    equipment: ['Full Gym'],
    difficulty: 'Intermediate',
    exerciseType: 'Isolation',
    instructions: [
      'Assume the correct starting position for Cable Lateral Raise.',
      'Execute the movement with controlled tempo.',
      'Squeeze the Shoulders at the peak contraction.',
      'Return to the starting position slowly.'
    ],
    commonMistakes: [
      'Using momentum instead of muscle control.',
      'Not using a full range of motion.'
    ],
    proTips: [
      'Focus on the mind-muscle connection with the Shoulders.'
    ],
    setsRecommendation: {
      muscleGain: '3-4 sets of 8-12 reps',
      strength: '4-5 sets of 3-5 reps',
      fatLoss: '3 sets of 12-15 reps'
    },
    // Adding backward compatibility fields for WorkoutGenerator/Analytics
    sets: { 'Muscle Gain': 4, 'Fat Loss': 3, 'Strength': 5, 'Endurance': 3, 'General Fitness': 3 },
    reps: { 'Muscle Gain': '8-12', 'Fat Loss': '12-15', 'Strength': '3-5', 'Endurance': '15-20', 'General Fitness': '10-12' },
    rest: { 'Muscle Gain': 90, 'Fat Loss': 45, 'Strength': 180, 'Endurance': 30, 'General Fitness': 60 },
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop',
    gifUrl: ''
  },
  {
    id: 'machine-lateral-raise',
    name: 'Machine Lateral Raise',
    muscle: 'Shoulders',
    muscleGroup: 'Shoulders',
    secondaryMuscles: ['Core'],
    equipment: ['Full Gym'],
    difficulty: 'Intermediate',
    exerciseType: 'Isolation',
    instructions: [
      'Assume the correct starting position for Machine Lateral Raise.',
      'Execute the movement with controlled tempo.',
      'Squeeze the Shoulders at the peak contraction.',
      'Return to the starting position slowly.'
    ],
    commonMistakes: [
      'Using momentum instead of muscle control.',
      'Not using a full range of motion.'
    ],
    proTips: [
      'Focus on the mind-muscle connection with the Shoulders.'
    ],
    setsRecommendation: {
      muscleGain: '3-4 sets of 8-12 reps',
      strength: '4-5 sets of 3-5 reps',
      fatLoss: '3 sets of 12-15 reps'
    },
    // Adding backward compatibility fields for WorkoutGenerator/Analytics
    sets: { 'Muscle Gain': 4, 'Fat Loss': 3, 'Strength': 5, 'Endurance': 3, 'General Fitness': 3 },
    reps: { 'Muscle Gain': '8-12', 'Fat Loss': '12-15', 'Strength': '3-5', 'Endurance': '15-20', 'General Fitness': '10-12' },
    rest: { 'Muscle Gain': 90, 'Fat Loss': 45, 'Strength': 180, 'Endurance': 30, 'General Fitness': 60 },
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop',
    gifUrl: ''
  },
  {
    id: 'face-pull',
    name: 'Face Pull',
    muscle: 'Shoulders',
    muscleGroup: 'Shoulders',
    secondaryMuscles: ['Core'],
    equipment: ['Full Gym'],
    difficulty: 'Beginner',
    exerciseType: 'Compound',
    instructions: [
      'Assume the correct starting position for Face Pull.',
      'Execute the movement with controlled tempo.',
      'Squeeze the Shoulders at the peak contraction.',
      'Return to the starting position slowly.'
    ],
    commonMistakes: [
      'Using momentum instead of muscle control.',
      'Not using a full range of motion.'
    ],
    proTips: [
      'Focus on the mind-muscle connection with the Shoulders.'
    ],
    setsRecommendation: {
      muscleGain: '3-4 sets of 8-12 reps',
      strength: '4-5 sets of 3-5 reps',
      fatLoss: '3 sets of 12-15 reps'
    },
    // Adding backward compatibility fields for WorkoutGenerator/Analytics
    sets: { 'Muscle Gain': 4, 'Fat Loss': 3, 'Strength': 5, 'Endurance': 3, 'General Fitness': 3 },
    reps: { 'Muscle Gain': '8-12', 'Fat Loss': '12-15', 'Strength': '3-5', 'Endurance': '15-20', 'General Fitness': '10-12' },
    rest: { 'Muscle Gain': 90, 'Fat Loss': 45, 'Strength': 180, 'Endurance': 30, 'General Fitness': 60 },
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop',
    gifUrl: ''
  },
  {
    id: 'reverse-pec-deck',
    name: 'Reverse Pec Deck',
    muscle: 'Shoulders',
    muscleGroup: 'Shoulders',
    secondaryMuscles: ['Core'],
    equipment: ['Full Gym'],
    difficulty: 'Beginner',
    exerciseType: 'Compound',
    instructions: [
      'Assume the correct starting position for Reverse Pec Deck.',
      'Execute the movement with controlled tempo.',
      'Squeeze the Shoulders at the peak contraction.',
      'Return to the starting position slowly.'
    ],
    commonMistakes: [
      'Using momentum instead of muscle control.',
      'Not using a full range of motion.'
    ],
    proTips: [
      'Focus on the mind-muscle connection with the Shoulders.'
    ],
    setsRecommendation: {
      muscleGain: '3-4 sets of 8-12 reps',
      strength: '4-5 sets of 3-5 reps',
      fatLoss: '3 sets of 12-15 reps'
    },
    // Adding backward compatibility fields for WorkoutGenerator/Analytics
    sets: { 'Muscle Gain': 4, 'Fat Loss': 3, 'Strength': 5, 'Endurance': 3, 'General Fitness': 3 },
    reps: { 'Muscle Gain': '8-12', 'Fat Loss': '12-15', 'Strength': '3-5', 'Endurance': '15-20', 'General Fitness': '10-12' },
    rest: { 'Muscle Gain': 90, 'Fat Loss': 45, 'Strength': 180, 'Endurance': 30, 'General Fitness': 60 },
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop',
    gifUrl: ''
  },
  {
    id: 'rear-delt-fly',
    name: 'Rear Delt Fly',
    muscle: 'Shoulders',
    muscleGroup: 'Shoulders',
    secondaryMuscles: ['Core'],
    equipment: ['Full Gym'],
    difficulty: 'Beginner',
    exerciseType: 'Isolation',
    instructions: [
      'Assume the correct starting position for Rear Delt Fly.',
      'Execute the movement with controlled tempo.',
      'Squeeze the Shoulders at the peak contraction.',
      'Return to the starting position slowly.'
    ],
    commonMistakes: [
      'Using momentum instead of muscle control.',
      'Not using a full range of motion.'
    ],
    proTips: [
      'Focus on the mind-muscle connection with the Shoulders.'
    ],
    setsRecommendation: {
      muscleGain: '3-4 sets of 8-12 reps',
      strength: '4-5 sets of 3-5 reps',
      fatLoss: '3 sets of 12-15 reps'
    },
    // Adding backward compatibility fields for WorkoutGenerator/Analytics
    sets: { 'Muscle Gain': 4, 'Fat Loss': 3, 'Strength': 5, 'Endurance': 3, 'General Fitness': 3 },
    reps: { 'Muscle Gain': '8-12', 'Fat Loss': '12-15', 'Strength': '3-5', 'Endurance': '15-20', 'General Fitness': '10-12' },
    rest: { 'Muscle Gain': 90, 'Fat Loss': 45, 'Strength': 180, 'Endurance': 30, 'General Fitness': 60 },
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop',
    gifUrl: ''
  },
  {
    id: 'barbell-curl',
    name: 'Barbell Curl',
    muscle: 'Arms',
    muscleGroup: 'Biceps',
    secondaryMuscles: ['Core'],
    equipment: ['Full Gym'],
    difficulty: 'Beginner',
    exerciseType: 'Isolation',
    instructions: [
      'Assume the correct starting position for Barbell Curl.',
      'Execute the movement with controlled tempo.',
      'Squeeze the Biceps at the peak contraction.',
      'Return to the starting position slowly.'
    ],
    commonMistakes: [
      'Using momentum instead of muscle control.',
      'Not using a full range of motion.'
    ],
    proTips: [
      'Focus on the mind-muscle connection with the Biceps.'
    ],
    setsRecommendation: {
      muscleGain: '3-4 sets of 8-12 reps',
      strength: '4-5 sets of 3-5 reps',
      fatLoss: '3 sets of 12-15 reps'
    },
    // Adding backward compatibility fields for WorkoutGenerator/Analytics
    sets: { 'Muscle Gain': 4, 'Fat Loss': 3, 'Strength': 5, 'Endurance': 3, 'General Fitness': 3 },
    reps: { 'Muscle Gain': '8-12', 'Fat Loss': '12-15', 'Strength': '3-5', 'Endurance': '15-20', 'General Fitness': '10-12' },
    rest: { 'Muscle Gain': 90, 'Fat Loss': 45, 'Strength': 180, 'Endurance': 30, 'General Fitness': 60 },
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop',
    gifUrl: ''
  },
  {
    id: 'ez-bar-curl',
    name: 'EZ Bar Curl',
    muscle: 'Arms',
    muscleGroup: 'Biceps',
    secondaryMuscles: ['Core'],
    equipment: ['Full Gym'],
    difficulty: 'Beginner',
    exerciseType: 'Isolation',
    instructions: [
      'Assume the correct starting position for EZ Bar Curl.',
      'Execute the movement with controlled tempo.',
      'Squeeze the Biceps at the peak contraction.',
      'Return to the starting position slowly.'
    ],
    commonMistakes: [
      'Using momentum instead of muscle control.',
      'Not using a full range of motion.'
    ],
    proTips: [
      'Focus on the mind-muscle connection with the Biceps.'
    ],
    setsRecommendation: {
      muscleGain: '3-4 sets of 8-12 reps',
      strength: '4-5 sets of 3-5 reps',
      fatLoss: '3 sets of 12-15 reps'
    },
    // Adding backward compatibility fields for WorkoutGenerator/Analytics
    sets: { 'Muscle Gain': 4, 'Fat Loss': 3, 'Strength': 5, 'Endurance': 3, 'General Fitness': 3 },
    reps: { 'Muscle Gain': '8-12', 'Fat Loss': '12-15', 'Strength': '3-5', 'Endurance': '15-20', 'General Fitness': '10-12' },
    rest: { 'Muscle Gain': 90, 'Fat Loss': 45, 'Strength': 180, 'Endurance': 30, 'General Fitness': 60 },
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop',
    gifUrl: ''
  },
  {
    id: 'dumbbell-curl',
    name: 'Dumbbell Curl',
    muscle: 'Arms',
    muscleGroup: 'Biceps',
    secondaryMuscles: ['Core'],
    equipment: ['Full Gym'],
    difficulty: 'Intermediate',
    exerciseType: 'Isolation',
    instructions: [
      'Assume the correct starting position for Dumbbell Curl.',
      'Execute the movement with controlled tempo.',
      'Squeeze the Biceps at the peak contraction.',
      'Return to the starting position slowly.'
    ],
    commonMistakes: [
      'Using momentum instead of muscle control.',
      'Not using a full range of motion.'
    ],
    proTips: [
      'Focus on the mind-muscle connection with the Biceps.'
    ],
    setsRecommendation: {
      muscleGain: '3-4 sets of 8-12 reps',
      strength: '4-5 sets of 3-5 reps',
      fatLoss: '3 sets of 12-15 reps'
    },
    // Adding backward compatibility fields for WorkoutGenerator/Analytics
    sets: { 'Muscle Gain': 4, 'Fat Loss': 3, 'Strength': 5, 'Endurance': 3, 'General Fitness': 3 },
    reps: { 'Muscle Gain': '8-12', 'Fat Loss': '12-15', 'Strength': '3-5', 'Endurance': '15-20', 'General Fitness': '10-12' },
    rest: { 'Muscle Gain': 90, 'Fat Loss': 45, 'Strength': 180, 'Endurance': 30, 'General Fitness': 60 },
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop',
    gifUrl: ''
  },
  {
    id: 'hammer-curl',
    name: 'Hammer Curl',
    muscle: 'Arms',
    muscleGroup: 'Biceps',
    secondaryMuscles: ['Core'],
    equipment: ['Full Gym'],
    difficulty: 'Beginner',
    exerciseType: 'Isolation',
    instructions: [
      'Assume the correct starting position for Hammer Curl.',
      'Execute the movement with controlled tempo.',
      'Squeeze the Biceps at the peak contraction.',
      'Return to the starting position slowly.'
    ],
    commonMistakes: [
      'Using momentum instead of muscle control.',
      'Not using a full range of motion.'
    ],
    proTips: [
      'Focus on the mind-muscle connection with the Biceps.'
    ],
    setsRecommendation: {
      muscleGain: '3-4 sets of 8-12 reps',
      strength: '4-5 sets of 3-5 reps',
      fatLoss: '3 sets of 12-15 reps'
    },
    // Adding backward compatibility fields for WorkoutGenerator/Analytics
    sets: { 'Muscle Gain': 4, 'Fat Loss': 3, 'Strength': 5, 'Endurance': 3, 'General Fitness': 3 },
    reps: { 'Muscle Gain': '8-12', 'Fat Loss': '12-15', 'Strength': '3-5', 'Endurance': '15-20', 'General Fitness': '10-12' },
    rest: { 'Muscle Gain': 90, 'Fat Loss': 45, 'Strength': 180, 'Endurance': 30, 'General Fitness': 60 },
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop',
    gifUrl: ''
  },
  {
    id: 'preacher-curl',
    name: 'Preacher Curl',
    muscle: 'Arms',
    muscleGroup: 'Biceps',
    secondaryMuscles: ['Core'],
    equipment: ['Full Gym'],
    difficulty: 'Beginner',
    exerciseType: 'Isolation',
    instructions: [
      'Assume the correct starting position for Preacher Curl.',
      'Execute the movement with controlled tempo.',
      'Squeeze the Biceps at the peak contraction.',
      'Return to the starting position slowly.'
    ],
    commonMistakes: [
      'Using momentum instead of muscle control.',
      'Not using a full range of motion.'
    ],
    proTips: [
      'Focus on the mind-muscle connection with the Biceps.'
    ],
    setsRecommendation: {
      muscleGain: '3-4 sets of 8-12 reps',
      strength: '4-5 sets of 3-5 reps',
      fatLoss: '3 sets of 12-15 reps'
    },
    // Adding backward compatibility fields for WorkoutGenerator/Analytics
    sets: { 'Muscle Gain': 4, 'Fat Loss': 3, 'Strength': 5, 'Endurance': 3, 'General Fitness': 3 },
    reps: { 'Muscle Gain': '8-12', 'Fat Loss': '12-15', 'Strength': '3-5', 'Endurance': '15-20', 'General Fitness': '10-12' },
    rest: { 'Muscle Gain': 90, 'Fat Loss': 45, 'Strength': 180, 'Endurance': 30, 'General Fitness': 60 },
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop',
    gifUrl: ''
  },
  {
    id: 'cable-curl',
    name: 'Cable Curl',
    muscle: 'Arms',
    muscleGroup: 'Biceps',
    secondaryMuscles: ['Core'],
    equipment: ['Full Gym'],
    difficulty: 'Intermediate',
    exerciseType: 'Isolation',
    instructions: [
      'Assume the correct starting position for Cable Curl.',
      'Execute the movement with controlled tempo.',
      'Squeeze the Biceps at the peak contraction.',
      'Return to the starting position slowly.'
    ],
    commonMistakes: [
      'Using momentum instead of muscle control.',
      'Not using a full range of motion.'
    ],
    proTips: [
      'Focus on the mind-muscle connection with the Biceps.'
    ],
    setsRecommendation: {
      muscleGain: '3-4 sets of 8-12 reps',
      strength: '4-5 sets of 3-5 reps',
      fatLoss: '3 sets of 12-15 reps'
    },
    // Adding backward compatibility fields for WorkoutGenerator/Analytics
    sets: { 'Muscle Gain': 4, 'Fat Loss': 3, 'Strength': 5, 'Endurance': 3, 'General Fitness': 3 },
    reps: { 'Muscle Gain': '8-12', 'Fat Loss': '12-15', 'Strength': '3-5', 'Endurance': '15-20', 'General Fitness': '10-12' },
    rest: { 'Muscle Gain': 90, 'Fat Loss': 45, 'Strength': 180, 'Endurance': 30, 'General Fitness': 60 },
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop',
    gifUrl: ''
  },
  {
    id: 'concentration-curl',
    name: 'Concentration Curl',
    muscle: 'Arms',
    muscleGroup: 'Biceps',
    secondaryMuscles: ['Core'],
    equipment: ['Full Gym'],
    difficulty: 'Beginner',
    exerciseType: 'Isolation',
    instructions: [
      'Assume the correct starting position for Concentration Curl.',
      'Execute the movement with controlled tempo.',
      'Squeeze the Biceps at the peak contraction.',
      'Return to the starting position slowly.'
    ],
    commonMistakes: [
      'Using momentum instead of muscle control.',
      'Not using a full range of motion.'
    ],
    proTips: [
      'Focus on the mind-muscle connection with the Biceps.'
    ],
    setsRecommendation: {
      muscleGain: '3-4 sets of 8-12 reps',
      strength: '4-5 sets of 3-5 reps',
      fatLoss: '3 sets of 12-15 reps'
    },
    // Adding backward compatibility fields for WorkoutGenerator/Analytics
    sets: { 'Muscle Gain': 4, 'Fat Loss': 3, 'Strength': 5, 'Endurance': 3, 'General Fitness': 3 },
    reps: { 'Muscle Gain': '8-12', 'Fat Loss': '12-15', 'Strength': '3-5', 'Endurance': '15-20', 'General Fitness': '10-12' },
    rest: { 'Muscle Gain': 90, 'Fat Loss': 45, 'Strength': 180, 'Endurance': 30, 'General Fitness': 60 },
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop',
    gifUrl: ''
  },
  {
    id: 'incline-dumbbell-curl',
    name: 'Incline Dumbbell Curl',
    muscle: 'Arms',
    muscleGroup: 'Biceps',
    secondaryMuscles: ['Core'],
    equipment: ['Full Gym'],
    difficulty: 'Intermediate',
    exerciseType: 'Isolation',
    instructions: [
      'Assume the correct starting position for Incline Dumbbell Curl.',
      'Execute the movement with controlled tempo.',
      'Squeeze the Biceps at the peak contraction.',
      'Return to the starting position slowly.'
    ],
    commonMistakes: [
      'Using momentum instead of muscle control.',
      'Not using a full range of motion.'
    ],
    proTips: [
      'Focus on the mind-muscle connection with the Biceps.'
    ],
    setsRecommendation: {
      muscleGain: '3-4 sets of 8-12 reps',
      strength: '4-5 sets of 3-5 reps',
      fatLoss: '3 sets of 12-15 reps'
    },
    // Adding backward compatibility fields for WorkoutGenerator/Analytics
    sets: { 'Muscle Gain': 4, 'Fat Loss': 3, 'Strength': 5, 'Endurance': 3, 'General Fitness': 3 },
    reps: { 'Muscle Gain': '8-12', 'Fat Loss': '12-15', 'Strength': '3-5', 'Endurance': '15-20', 'General Fitness': '10-12' },
    rest: { 'Muscle Gain': 90, 'Fat Loss': 45, 'Strength': 180, 'Endurance': 30, 'General Fitness': 60 },
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop',
    gifUrl: ''
  },
  {
    id: 'tricep-pushdown',
    name: 'Tricep Pushdown',
    muscle: 'Arms',
    muscleGroup: 'Triceps',
    secondaryMuscles: ['Core'],
    equipment: ['Full Gym'],
    difficulty: 'Beginner',
    exerciseType: 'Isolation',
    instructions: [
      'Assume the correct starting position for Tricep Pushdown.',
      'Execute the movement with controlled tempo.',
      'Squeeze the Triceps at the peak contraction.',
      'Return to the starting position slowly.'
    ],
    commonMistakes: [
      'Using momentum instead of muscle control.',
      'Not using a full range of motion.'
    ],
    proTips: [
      'Focus on the mind-muscle connection with the Triceps.'
    ],
    setsRecommendation: {
      muscleGain: '3-4 sets of 8-12 reps',
      strength: '4-5 sets of 3-5 reps',
      fatLoss: '3 sets of 12-15 reps'
    },
    // Adding backward compatibility fields for WorkoutGenerator/Analytics
    sets: { 'Muscle Gain': 4, 'Fat Loss': 3, 'Strength': 5, 'Endurance': 3, 'General Fitness': 3 },
    reps: { 'Muscle Gain': '8-12', 'Fat Loss': '12-15', 'Strength': '3-5', 'Endurance': '15-20', 'General Fitness': '10-12' },
    rest: { 'Muscle Gain': 90, 'Fat Loss': 45, 'Strength': 180, 'Endurance': 30, 'General Fitness': 60 },
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop',
    gifUrl: ''
  },
  {
    id: 'rope-pushdown',
    name: 'Rope Pushdown',
    muscle: 'Arms',
    muscleGroup: 'Triceps',
    secondaryMuscles: ['Core'],
    equipment: ['Full Gym'],
    difficulty: 'Beginner',
    exerciseType: 'Isolation',
    instructions: [
      'Assume the correct starting position for Rope Pushdown.',
      'Execute the movement with controlled tempo.',
      'Squeeze the Triceps at the peak contraction.',
      'Return to the starting position slowly.'
    ],
    commonMistakes: [
      'Using momentum instead of muscle control.',
      'Not using a full range of motion.'
    ],
    proTips: [
      'Focus on the mind-muscle connection with the Triceps.'
    ],
    setsRecommendation: {
      muscleGain: '3-4 sets of 8-12 reps',
      strength: '4-5 sets of 3-5 reps',
      fatLoss: '3 sets of 12-15 reps'
    },
    // Adding backward compatibility fields for WorkoutGenerator/Analytics
    sets: { 'Muscle Gain': 4, 'Fat Loss': 3, 'Strength': 5, 'Endurance': 3, 'General Fitness': 3 },
    reps: { 'Muscle Gain': '8-12', 'Fat Loss': '12-15', 'Strength': '3-5', 'Endurance': '15-20', 'General Fitness': '10-12' },
    rest: { 'Muscle Gain': 90, 'Fat Loss': 45, 'Strength': 180, 'Endurance': 30, 'General Fitness': 60 },
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop',
    gifUrl: ''
  },
  {
    id: 'skull-crushers',
    name: 'Skull Crushers',
    muscle: 'Arms',
    muscleGroup: 'Triceps',
    secondaryMuscles: ['Core'],
    equipment: ['Full Gym'],
    difficulty: 'Beginner',
    exerciseType: 'Compound',
    instructions: [
      'Assume the correct starting position for Skull Crushers.',
      'Execute the movement with controlled tempo.',
      'Squeeze the Triceps at the peak contraction.',
      'Return to the starting position slowly.'
    ],
    commonMistakes: [
      'Using momentum instead of muscle control.',
      'Not using a full range of motion.'
    ],
    proTips: [
      'Focus on the mind-muscle connection with the Triceps.'
    ],
    setsRecommendation: {
      muscleGain: '3-4 sets of 8-12 reps',
      strength: '4-5 sets of 3-5 reps',
      fatLoss: '3 sets of 12-15 reps'
    },
    // Adding backward compatibility fields for WorkoutGenerator/Analytics
    sets: { 'Muscle Gain': 4, 'Fat Loss': 3, 'Strength': 5, 'Endurance': 3, 'General Fitness': 3 },
    reps: { 'Muscle Gain': '8-12', 'Fat Loss': '12-15', 'Strength': '3-5', 'Endurance': '15-20', 'General Fitness': '10-12' },
    rest: { 'Muscle Gain': 90, 'Fat Loss': 45, 'Strength': 180, 'Endurance': 30, 'General Fitness': 60 },
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop',
    gifUrl: ''
  },
  {
    id: 'overhead-extension',
    name: 'Overhead Extension',
    muscle: 'Arms',
    muscleGroup: 'Triceps',
    secondaryMuscles: ['Core'],
    equipment: ['Full Gym'],
    difficulty: 'Beginner',
    exerciseType: 'Isolation',
    instructions: [
      'Assume the correct starting position for Overhead Extension.',
      'Execute the movement with controlled tempo.',
      'Squeeze the Triceps at the peak contraction.',
      'Return to the starting position slowly.'
    ],
    commonMistakes: [
      'Using momentum instead of muscle control.',
      'Not using a full range of motion.'
    ],
    proTips: [
      'Focus on the mind-muscle connection with the Triceps.'
    ],
    setsRecommendation: {
      muscleGain: '3-4 sets of 8-12 reps',
      strength: '4-5 sets of 3-5 reps',
      fatLoss: '3 sets of 12-15 reps'
    },
    // Adding backward compatibility fields for WorkoutGenerator/Analytics
    sets: { 'Muscle Gain': 4, 'Fat Loss': 3, 'Strength': 5, 'Endurance': 3, 'General Fitness': 3 },
    reps: { 'Muscle Gain': '8-12', 'Fat Loss': '12-15', 'Strength': '3-5', 'Endurance': '15-20', 'General Fitness': '10-12' },
    rest: { 'Muscle Gain': 90, 'Fat Loss': 45, 'Strength': 180, 'Endurance': 30, 'General Fitness': 60 },
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop',
    gifUrl: ''
  },
  {
    id: 'close-grip-bench-press',
    name: 'Close Grip Bench Press',
    muscle: 'Arms',
    muscleGroup: 'Triceps',
    secondaryMuscles: ['Core'],
    equipment: ['Full Gym'],
    difficulty: 'Beginner',
    exerciseType: 'Compound',
    instructions: [
      'Assume the correct starting position for Close Grip Bench Press.',
      'Execute the movement with controlled tempo.',
      'Squeeze the Triceps at the peak contraction.',
      'Return to the starting position slowly.'
    ],
    commonMistakes: [
      'Using momentum instead of muscle control.',
      'Not using a full range of motion.'
    ],
    proTips: [
      'Focus on the mind-muscle connection with the Triceps.'
    ],
    setsRecommendation: {
      muscleGain: '3-4 sets of 8-12 reps',
      strength: '4-5 sets of 3-5 reps',
      fatLoss: '3 sets of 12-15 reps'
    },
    // Adding backward compatibility fields for WorkoutGenerator/Analytics
    sets: { 'Muscle Gain': 4, 'Fat Loss': 3, 'Strength': 5, 'Endurance': 3, 'General Fitness': 3 },
    reps: { 'Muscle Gain': '8-12', 'Fat Loss': '12-15', 'Strength': '3-5', 'Endurance': '15-20', 'General Fitness': '10-12' },
    rest: { 'Muscle Gain': 90, 'Fat Loss': 45, 'Strength': 180, 'Endurance': 30, 'General Fitness': 60 },
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop',
    gifUrl: ''
  },
  {
    id: 'dips',
    name: 'Dips',
    muscle: 'Arms',
    muscleGroup: 'Triceps',
    secondaryMuscles: ['Core'],
    equipment: ['Full Gym'],
    difficulty: 'Beginner',
    exerciseType: 'Compound',
    instructions: [
      'Assume the correct starting position for Dips.',
      'Execute the movement with controlled tempo.',
      'Squeeze the Triceps at the peak contraction.',
      'Return to the starting position slowly.'
    ],
    commonMistakes: [
      'Using momentum instead of muscle control.',
      'Not using a full range of motion.'
    ],
    proTips: [
      'Focus on the mind-muscle connection with the Triceps.'
    ],
    setsRecommendation: {
      muscleGain: '3-4 sets of 8-12 reps',
      strength: '4-5 sets of 3-5 reps',
      fatLoss: '3 sets of 12-15 reps'
    },
    // Adding backward compatibility fields for WorkoutGenerator/Analytics
    sets: { 'Muscle Gain': 4, 'Fat Loss': 3, 'Strength': 5, 'Endurance': 3, 'General Fitness': 3 },
    reps: { 'Muscle Gain': '8-12', 'Fat Loss': '12-15', 'Strength': '3-5', 'Endurance': '15-20', 'General Fitness': '10-12' },
    rest: { 'Muscle Gain': 90, 'Fat Loss': 45, 'Strength': 180, 'Endurance': 30, 'General Fitness': 60 },
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop',
    gifUrl: ''
  },
  {
    id: 'wrist-curl',
    name: 'Wrist Curl',
    muscle: 'Arms',
    muscleGroup: 'Forearms',
    secondaryMuscles: ['Core'],
    equipment: ['Full Gym'],
    difficulty: 'Beginner',
    exerciseType: 'Isolation',
    instructions: [
      'Assume the correct starting position for Wrist Curl.',
      'Execute the movement with controlled tempo.',
      'Squeeze the Forearms at the peak contraction.',
      'Return to the starting position slowly.'
    ],
    commonMistakes: [
      'Using momentum instead of muscle control.',
      'Not using a full range of motion.'
    ],
    proTips: [
      'Focus on the mind-muscle connection with the Forearms.'
    ],
    setsRecommendation: {
      muscleGain: '3-4 sets of 8-12 reps',
      strength: '4-5 sets of 3-5 reps',
      fatLoss: '3 sets of 12-15 reps'
    },
    // Adding backward compatibility fields for WorkoutGenerator/Analytics
    sets: { 'Muscle Gain': 4, 'Fat Loss': 3, 'Strength': 5, 'Endurance': 3, 'General Fitness': 3 },
    reps: { 'Muscle Gain': '8-12', 'Fat Loss': '12-15', 'Strength': '3-5', 'Endurance': '15-20', 'General Fitness': '10-12' },
    rest: { 'Muscle Gain': 90, 'Fat Loss': 45, 'Strength': 180, 'Endurance': 30, 'General Fitness': 60 },
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop',
    gifUrl: ''
  },
  {
    id: 'reverse-wrist-curl',
    name: 'Reverse Wrist Curl',
    muscle: 'Arms',
    muscleGroup: 'Forearms',
    secondaryMuscles: ['Core'],
    equipment: ['Full Gym'],
    difficulty: 'Beginner',
    exerciseType: 'Isolation',
    instructions: [
      'Assume the correct starting position for Reverse Wrist Curl.',
      'Execute the movement with controlled tempo.',
      'Squeeze the Forearms at the peak contraction.',
      'Return to the starting position slowly.'
    ],
    commonMistakes: [
      'Using momentum instead of muscle control.',
      'Not using a full range of motion.'
    ],
    proTips: [
      'Focus on the mind-muscle connection with the Forearms.'
    ],
    setsRecommendation: {
      muscleGain: '3-4 sets of 8-12 reps',
      strength: '4-5 sets of 3-5 reps',
      fatLoss: '3 sets of 12-15 reps'
    },
    // Adding backward compatibility fields for WorkoutGenerator/Analytics
    sets: { 'Muscle Gain': 4, 'Fat Loss': 3, 'Strength': 5, 'Endurance': 3, 'General Fitness': 3 },
    reps: { 'Muscle Gain': '8-12', 'Fat Loss': '12-15', 'Strength': '3-5', 'Endurance': '15-20', 'General Fitness': '10-12' },
    rest: { 'Muscle Gain': 90, 'Fat Loss': 45, 'Strength': 180, 'Endurance': 30, 'General Fitness': 60 },
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop',
    gifUrl: ''
  },
  {
    id: 'farmer-walk',
    name: 'Farmer Walk',
    muscle: 'Arms',
    muscleGroup: 'Forearms',
    secondaryMuscles: ['Core'],
    equipment: ['Full Gym'],
    difficulty: 'Beginner',
    exerciseType: 'Compound',
    instructions: [
      'Assume the correct starting position for Farmer Walk.',
      'Execute the movement with controlled tempo.',
      'Squeeze the Forearms at the peak contraction.',
      'Return to the starting position slowly.'
    ],
    commonMistakes: [
      'Using momentum instead of muscle control.',
      'Not using a full range of motion.'
    ],
    proTips: [
      'Focus on the mind-muscle connection with the Forearms.'
    ],
    setsRecommendation: {
      muscleGain: '3-4 sets of 8-12 reps',
      strength: '4-5 sets of 3-5 reps',
      fatLoss: '3 sets of 12-15 reps'
    },
    // Adding backward compatibility fields for WorkoutGenerator/Analytics
    sets: { 'Muscle Gain': 4, 'Fat Loss': 3, 'Strength': 5, 'Endurance': 3, 'General Fitness': 3 },
    reps: { 'Muscle Gain': '8-12', 'Fat Loss': '12-15', 'Strength': '3-5', 'Endurance': '15-20', 'General Fitness': '10-12' },
    rest: { 'Muscle Gain': 90, 'Fat Loss': 45, 'Strength': 180, 'Endurance': 30, 'General Fitness': 60 },
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop',
    gifUrl: ''
  },
  {
    id: 'dead-hang',
    name: 'Dead Hang',
    muscle: 'Arms',
    muscleGroup: 'Forearms',
    secondaryMuscles: ['Core'],
    equipment: ['Full Gym'],
    difficulty: 'Beginner',
    exerciseType: 'Compound',
    instructions: [
      'Assume the correct starting position for Dead Hang.',
      'Execute the movement with controlled tempo.',
      'Squeeze the Forearms at the peak contraction.',
      'Return to the starting position slowly.'
    ],
    commonMistakes: [
      'Using momentum instead of muscle control.',
      'Not using a full range of motion.'
    ],
    proTips: [
      'Focus on the mind-muscle connection with the Forearms.'
    ],
    setsRecommendation: {
      muscleGain: '3-4 sets of 8-12 reps',
      strength: '4-5 sets of 3-5 reps',
      fatLoss: '3 sets of 12-15 reps'
    },
    // Adding backward compatibility fields for WorkoutGenerator/Analytics
    sets: { 'Muscle Gain': 4, 'Fat Loss': 3, 'Strength': 5, 'Endurance': 3, 'General Fitness': 3 },
    reps: { 'Muscle Gain': '8-12', 'Fat Loss': '12-15', 'Strength': '3-5', 'Endurance': '15-20', 'General Fitness': '10-12' },
    rest: { 'Muscle Gain': 90, 'Fat Loss': 45, 'Strength': 180, 'Endurance': 30, 'General Fitness': 60 },
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop',
    gifUrl: ''
  },
  {
    id: 'back-squat',
    name: 'Back Squat',
    muscle: 'Legs',
    muscleGroup: 'Quads',
    secondaryMuscles: ['Core'],
    equipment: ['Full Gym'],
    difficulty: 'Beginner',
    exerciseType: 'Compound',
    instructions: [
      'Assume the correct starting position for Back Squat.',
      'Execute the movement with controlled tempo.',
      'Squeeze the Quads at the peak contraction.',
      'Return to the starting position slowly.'
    ],
    commonMistakes: [
      'Using momentum instead of muscle control.',
      'Not using a full range of motion.'
    ],
    proTips: [
      'Focus on the mind-muscle connection with the Quads.'
    ],
    setsRecommendation: {
      muscleGain: '3-4 sets of 8-12 reps',
      strength: '4-5 sets of 3-5 reps',
      fatLoss: '3 sets of 12-15 reps'
    },
    // Adding backward compatibility fields for WorkoutGenerator/Analytics
    sets: { 'Muscle Gain': 4, 'Fat Loss': 3, 'Strength': 5, 'Endurance': 3, 'General Fitness': 3 },
    reps: { 'Muscle Gain': '8-12', 'Fat Loss': '12-15', 'Strength': '3-5', 'Endurance': '15-20', 'General Fitness': '10-12' },
    rest: { 'Muscle Gain': 90, 'Fat Loss': 45, 'Strength': 180, 'Endurance': 30, 'General Fitness': 60 },
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop',
    gifUrl: ''
  },
  {
    id: 'front-squat',
    name: 'Front Squat',
    muscle: 'Legs',
    muscleGroup: 'Quads',
    secondaryMuscles: ['Core'],
    equipment: ['Full Gym'],
    difficulty: 'Beginner',
    exerciseType: 'Compound',
    instructions: [
      'Assume the correct starting position for Front Squat.',
      'Execute the movement with controlled tempo.',
      'Squeeze the Quads at the peak contraction.',
      'Return to the starting position slowly.'
    ],
    commonMistakes: [
      'Using momentum instead of muscle control.',
      'Not using a full range of motion.'
    ],
    proTips: [
      'Focus on the mind-muscle connection with the Quads.'
    ],
    setsRecommendation: {
      muscleGain: '3-4 sets of 8-12 reps',
      strength: '4-5 sets of 3-5 reps',
      fatLoss: '3 sets of 12-15 reps'
    },
    // Adding backward compatibility fields for WorkoutGenerator/Analytics
    sets: { 'Muscle Gain': 4, 'Fat Loss': 3, 'Strength': 5, 'Endurance': 3, 'General Fitness': 3 },
    reps: { 'Muscle Gain': '8-12', 'Fat Loss': '12-15', 'Strength': '3-5', 'Endurance': '15-20', 'General Fitness': '10-12' },
    rest: { 'Muscle Gain': 90, 'Fat Loss': 45, 'Strength': 180, 'Endurance': 30, 'General Fitness': 60 },
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop',
    gifUrl: ''
  },
  {
    id: 'leg-press',
    name: 'Leg Press',
    muscle: 'Legs',
    muscleGroup: 'Quads',
    secondaryMuscles: ['Core'],
    equipment: ['Full Gym'],
    difficulty: 'Beginner',
    exerciseType: 'Compound',
    instructions: [
      'Assume the correct starting position for Leg Press.',
      'Execute the movement with controlled tempo.',
      'Squeeze the Quads at the peak contraction.',
      'Return to the starting position slowly.'
    ],
    commonMistakes: [
      'Using momentum instead of muscle control.',
      'Not using a full range of motion.'
    ],
    proTips: [
      'Focus on the mind-muscle connection with the Quads.'
    ],
    setsRecommendation: {
      muscleGain: '3-4 sets of 8-12 reps',
      strength: '4-5 sets of 3-5 reps',
      fatLoss: '3 sets of 12-15 reps'
    },
    // Adding backward compatibility fields for WorkoutGenerator/Analytics
    sets: { 'Muscle Gain': 4, 'Fat Loss': 3, 'Strength': 5, 'Endurance': 3, 'General Fitness': 3 },
    reps: { 'Muscle Gain': '8-12', 'Fat Loss': '12-15', 'Strength': '3-5', 'Endurance': '15-20', 'General Fitness': '10-12' },
    rest: { 'Muscle Gain': 90, 'Fat Loss': 45, 'Strength': 180, 'Endurance': 30, 'General Fitness': 60 },
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop',
    gifUrl: ''
  },
  {
    id: 'bulgarian-split-squat',
    name: 'Bulgarian Split Squat',
    muscle: 'Legs',
    muscleGroup: 'Quads',
    secondaryMuscles: ['Core'],
    equipment: ['Full Gym'],
    difficulty: 'Beginner',
    exerciseType: 'Compound',
    instructions: [
      'Assume the correct starting position for Bulgarian Split Squat.',
      'Execute the movement with controlled tempo.',
      'Squeeze the Quads at the peak contraction.',
      'Return to the starting position slowly.'
    ],
    commonMistakes: [
      'Using momentum instead of muscle control.',
      'Not using a full range of motion.'
    ],
    proTips: [
      'Focus on the mind-muscle connection with the Quads.'
    ],
    setsRecommendation: {
      muscleGain: '3-4 sets of 8-12 reps',
      strength: '4-5 sets of 3-5 reps',
      fatLoss: '3 sets of 12-15 reps'
    },
    // Adding backward compatibility fields for WorkoutGenerator/Analytics
    sets: { 'Muscle Gain': 4, 'Fat Loss': 3, 'Strength': 5, 'Endurance': 3, 'General Fitness': 3 },
    reps: { 'Muscle Gain': '8-12', 'Fat Loss': '12-15', 'Strength': '3-5', 'Endurance': '15-20', 'General Fitness': '10-12' },
    rest: { 'Muscle Gain': 90, 'Fat Loss': 45, 'Strength': 180, 'Endurance': 30, 'General Fitness': 60 },
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop',
    gifUrl: ''
  },
  {
    id: 'walking-lunges',
    name: 'Walking Lunges',
    muscle: 'Legs',
    muscleGroup: 'Quads',
    secondaryMuscles: ['Core'],
    equipment: ['Full Gym'],
    difficulty: 'Beginner',
    exerciseType: 'Compound',
    instructions: [
      'Assume the correct starting position for Walking Lunges.',
      'Execute the movement with controlled tempo.',
      'Squeeze the Quads at the peak contraction.',
      'Return to the starting position slowly.'
    ],
    commonMistakes: [
      'Using momentum instead of muscle control.',
      'Not using a full range of motion.'
    ],
    proTips: [
      'Focus on the mind-muscle connection with the Quads.'
    ],
    setsRecommendation: {
      muscleGain: '3-4 sets of 8-12 reps',
      strength: '4-5 sets of 3-5 reps',
      fatLoss: '3 sets of 12-15 reps'
    },
    // Adding backward compatibility fields for WorkoutGenerator/Analytics
    sets: { 'Muscle Gain': 4, 'Fat Loss': 3, 'Strength': 5, 'Endurance': 3, 'General Fitness': 3 },
    reps: { 'Muscle Gain': '8-12', 'Fat Loss': '12-15', 'Strength': '3-5', 'Endurance': '15-20', 'General Fitness': '10-12' },
    rest: { 'Muscle Gain': 90, 'Fat Loss': 45, 'Strength': 180, 'Endurance': 30, 'General Fitness': 60 },
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop',
    gifUrl: ''
  },
  {
    id: 'leg-extension',
    name: 'Leg Extension',
    muscle: 'Legs',
    muscleGroup: 'Quads',
    secondaryMuscles: ['Core'],
    equipment: ['Full Gym'],
    difficulty: 'Beginner',
    exerciseType: 'Isolation',
    instructions: [
      'Assume the correct starting position for Leg Extension.',
      'Execute the movement with controlled tempo.',
      'Squeeze the Quads at the peak contraction.',
      'Return to the starting position slowly.'
    ],
    commonMistakes: [
      'Using momentum instead of muscle control.',
      'Not using a full range of motion.'
    ],
    proTips: [
      'Focus on the mind-muscle connection with the Quads.'
    ],
    setsRecommendation: {
      muscleGain: '3-4 sets of 8-12 reps',
      strength: '4-5 sets of 3-5 reps',
      fatLoss: '3 sets of 12-15 reps'
    },
    // Adding backward compatibility fields for WorkoutGenerator/Analytics
    sets: { 'Muscle Gain': 4, 'Fat Loss': 3, 'Strength': 5, 'Endurance': 3, 'General Fitness': 3 },
    reps: { 'Muscle Gain': '8-12', 'Fat Loss': '12-15', 'Strength': '3-5', 'Endurance': '15-20', 'General Fitness': '10-12' },
    rest: { 'Muscle Gain': 90, 'Fat Loss': 45, 'Strength': 180, 'Endurance': 30, 'General Fitness': 60 },
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop',
    gifUrl: ''
  },
  {
    id: 'step-ups',
    name: 'Step Ups',
    muscle: 'Legs',
    muscleGroup: 'Quads',
    secondaryMuscles: ['Core'],
    equipment: ['Full Gym'],
    difficulty: 'Beginner',
    exerciseType: 'Compound',
    instructions: [
      'Assume the correct starting position for Step Ups.',
      'Execute the movement with controlled tempo.',
      'Squeeze the Quads at the peak contraction.',
      'Return to the starting position slowly.'
    ],
    commonMistakes: [
      'Using momentum instead of muscle control.',
      'Not using a full range of motion.'
    ],
    proTips: [
      'Focus on the mind-muscle connection with the Quads.'
    ],
    setsRecommendation: {
      muscleGain: '3-4 sets of 8-12 reps',
      strength: '4-5 sets of 3-5 reps',
      fatLoss: '3 sets of 12-15 reps'
    },
    // Adding backward compatibility fields for WorkoutGenerator/Analytics
    sets: { 'Muscle Gain': 4, 'Fat Loss': 3, 'Strength': 5, 'Endurance': 3, 'General Fitness': 3 },
    reps: { 'Muscle Gain': '8-12', 'Fat Loss': '12-15', 'Strength': '3-5', 'Endurance': '15-20', 'General Fitness': '10-12' },
    rest: { 'Muscle Gain': 90, 'Fat Loss': 45, 'Strength': 180, 'Endurance': 30, 'General Fitness': 60 },
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop',
    gifUrl: ''
  },
  {
    id: 'romanian-deadlift',
    name: 'Romanian Deadlift',
    muscle: 'Legs',
    muscleGroup: 'Hamstrings',
    secondaryMuscles: ['Core'],
    equipment: ['Full Gym'],
    difficulty: 'Beginner',
    exerciseType: 'Compound',
    instructions: [
      'Assume the correct starting position for Romanian Deadlift.',
      'Execute the movement with controlled tempo.',
      'Squeeze the Hamstrings at the peak contraction.',
      'Return to the starting position slowly.'
    ],
    commonMistakes: [
      'Using momentum instead of muscle control.',
      'Not using a full range of motion.'
    ],
    proTips: [
      'Focus on the mind-muscle connection with the Hamstrings.'
    ],
    setsRecommendation: {
      muscleGain: '3-4 sets of 8-12 reps',
      strength: '4-5 sets of 3-5 reps',
      fatLoss: '3 sets of 12-15 reps'
    },
    // Adding backward compatibility fields for WorkoutGenerator/Analytics
    sets: { 'Muscle Gain': 4, 'Fat Loss': 3, 'Strength': 5, 'Endurance': 3, 'General Fitness': 3 },
    reps: { 'Muscle Gain': '8-12', 'Fat Loss': '12-15', 'Strength': '3-5', 'Endurance': '15-20', 'General Fitness': '10-12' },
    rest: { 'Muscle Gain': 90, 'Fat Loss': 45, 'Strength': 180, 'Endurance': 30, 'General Fitness': 60 },
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop',
    gifUrl: ''
  },
  {
    id: 'stiff-leg-deadlift',
    name: 'Stiff Leg Deadlift',
    muscle: 'Legs',
    muscleGroup: 'Hamstrings',
    secondaryMuscles: ['Core'],
    equipment: ['Full Gym'],
    difficulty: 'Beginner',
    exerciseType: 'Compound',
    instructions: [
      'Assume the correct starting position for Stiff Leg Deadlift.',
      'Execute the movement with controlled tempo.',
      'Squeeze the Hamstrings at the peak contraction.',
      'Return to the starting position slowly.'
    ],
    commonMistakes: [
      'Using momentum instead of muscle control.',
      'Not using a full range of motion.'
    ],
    proTips: [
      'Focus on the mind-muscle connection with the Hamstrings.'
    ],
    setsRecommendation: {
      muscleGain: '3-4 sets of 8-12 reps',
      strength: '4-5 sets of 3-5 reps',
      fatLoss: '3 sets of 12-15 reps'
    },
    // Adding backward compatibility fields for WorkoutGenerator/Analytics
    sets: { 'Muscle Gain': 4, 'Fat Loss': 3, 'Strength': 5, 'Endurance': 3, 'General Fitness': 3 },
    reps: { 'Muscle Gain': '8-12', 'Fat Loss': '12-15', 'Strength': '3-5', 'Endurance': '15-20', 'General Fitness': '10-12' },
    rest: { 'Muscle Gain': 90, 'Fat Loss': 45, 'Strength': 180, 'Endurance': 30, 'General Fitness': 60 },
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop',
    gifUrl: ''
  },
  {
    id: 'lying-leg-curl',
    name: 'Lying Leg Curl',
    muscle: 'Legs',
    muscleGroup: 'Hamstrings',
    secondaryMuscles: ['Core'],
    equipment: ['Full Gym'],
    difficulty: 'Beginner',
    exerciseType: 'Isolation',
    instructions: [
      'Assume the correct starting position for Lying Leg Curl.',
      'Execute the movement with controlled tempo.',
      'Squeeze the Hamstrings at the peak contraction.',
      'Return to the starting position slowly.'
    ],
    commonMistakes: [
      'Using momentum instead of muscle control.',
      'Not using a full range of motion.'
    ],
    proTips: [
      'Focus on the mind-muscle connection with the Hamstrings.'
    ],
    setsRecommendation: {
      muscleGain: '3-4 sets of 8-12 reps',
      strength: '4-5 sets of 3-5 reps',
      fatLoss: '3 sets of 12-15 reps'
    },
    // Adding backward compatibility fields for WorkoutGenerator/Analytics
    sets: { 'Muscle Gain': 4, 'Fat Loss': 3, 'Strength': 5, 'Endurance': 3, 'General Fitness': 3 },
    reps: { 'Muscle Gain': '8-12', 'Fat Loss': '12-15', 'Strength': '3-5', 'Endurance': '15-20', 'General Fitness': '10-12' },
    rest: { 'Muscle Gain': 90, 'Fat Loss': 45, 'Strength': 180, 'Endurance': 30, 'General Fitness': 60 },
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop',
    gifUrl: ''
  },
  {
    id: 'seated-leg-curl',
    name: 'Seated Leg Curl',
    muscle: 'Legs',
    muscleGroup: 'Hamstrings',
    secondaryMuscles: ['Core'],
    equipment: ['Full Gym'],
    difficulty: 'Beginner',
    exerciseType: 'Isolation',
    instructions: [
      'Assume the correct starting position for Seated Leg Curl.',
      'Execute the movement with controlled tempo.',
      'Squeeze the Hamstrings at the peak contraction.',
      'Return to the starting position slowly.'
    ],
    commonMistakes: [
      'Using momentum instead of muscle control.',
      'Not using a full range of motion.'
    ],
    proTips: [
      'Focus on the mind-muscle connection with the Hamstrings.'
    ],
    setsRecommendation: {
      muscleGain: '3-4 sets of 8-12 reps',
      strength: '4-5 sets of 3-5 reps',
      fatLoss: '3 sets of 12-15 reps'
    },
    // Adding backward compatibility fields for WorkoutGenerator/Analytics
    sets: { 'Muscle Gain': 4, 'Fat Loss': 3, 'Strength': 5, 'Endurance': 3, 'General Fitness': 3 },
    reps: { 'Muscle Gain': '8-12', 'Fat Loss': '12-15', 'Strength': '3-5', 'Endurance': '15-20', 'General Fitness': '10-12' },
    rest: { 'Muscle Gain': 90, 'Fat Loss': 45, 'Strength': 180, 'Endurance': 30, 'General Fitness': 60 },
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop',
    gifUrl: ''
  },
  {
    id: 'nordic-curl',
    name: 'Nordic Curl',
    muscle: 'Legs',
    muscleGroup: 'Hamstrings',
    secondaryMuscles: ['Core'],
    equipment: ['Full Gym'],
    difficulty: 'Advanced',
    exerciseType: 'Isolation',
    instructions: [
      'Assume the correct starting position for Nordic Curl.',
      'Execute the movement with controlled tempo.',
      'Squeeze the Hamstrings at the peak contraction.',
      'Return to the starting position slowly.'
    ],
    commonMistakes: [
      'Using momentum instead of muscle control.',
      'Not using a full range of motion.'
    ],
    proTips: [
      'Focus on the mind-muscle connection with the Hamstrings.'
    ],
    setsRecommendation: {
      muscleGain: '3-4 sets of 8-12 reps',
      strength: '4-5 sets of 3-5 reps',
      fatLoss: '3 sets of 12-15 reps'
    },
    // Adding backward compatibility fields for WorkoutGenerator/Analytics
    sets: { 'Muscle Gain': 4, 'Fat Loss': 3, 'Strength': 5, 'Endurance': 3, 'General Fitness': 3 },
    reps: { 'Muscle Gain': '8-12', 'Fat Loss': '12-15', 'Strength': '3-5', 'Endurance': '15-20', 'General Fitness': '10-12' },
    rest: { 'Muscle Gain': 90, 'Fat Loss': 45, 'Strength': 180, 'Endurance': 30, 'General Fitness': 60 },
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop',
    gifUrl: ''
  },
  {
    id: 'good-morning',
    name: 'Good Morning',
    muscle: 'Legs',
    muscleGroup: 'Hamstrings',
    secondaryMuscles: ['Core'],
    equipment: ['Full Gym'],
    difficulty: 'Beginner',
    exerciseType: 'Compound',
    instructions: [
      'Assume the correct starting position for Good Morning.',
      'Execute the movement with controlled tempo.',
      'Squeeze the Hamstrings at the peak contraction.',
      'Return to the starting position slowly.'
    ],
    commonMistakes: [
      'Using momentum instead of muscle control.',
      'Not using a full range of motion.'
    ],
    proTips: [
      'Focus on the mind-muscle connection with the Hamstrings.'
    ],
    setsRecommendation: {
      muscleGain: '3-4 sets of 8-12 reps',
      strength: '4-5 sets of 3-5 reps',
      fatLoss: '3 sets of 12-15 reps'
    },
    // Adding backward compatibility fields for WorkoutGenerator/Analytics
    sets: { 'Muscle Gain': 4, 'Fat Loss': 3, 'Strength': 5, 'Endurance': 3, 'General Fitness': 3 },
    reps: { 'Muscle Gain': '8-12', 'Fat Loss': '12-15', 'Strength': '3-5', 'Endurance': '15-20', 'General Fitness': '10-12' },
    rest: { 'Muscle Gain': 90, 'Fat Loss': 45, 'Strength': 180, 'Endurance': 30, 'General Fitness': 60 },
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop',
    gifUrl: ''
  },
  {
    id: 'hip-thrust',
    name: 'Hip Thrust',
    muscle: 'Legs',
    muscleGroup: 'Glutes',
    secondaryMuscles: ['Core'],
    equipment: ['Full Gym'],
    difficulty: 'Beginner',
    exerciseType: 'Compound',
    instructions: [
      'Assume the correct starting position for Hip Thrust.',
      'Execute the movement with controlled tempo.',
      'Squeeze the Glutes at the peak contraction.',
      'Return to the starting position slowly.'
    ],
    commonMistakes: [
      'Using momentum instead of muscle control.',
      'Not using a full range of motion.'
    ],
    proTips: [
      'Focus on the mind-muscle connection with the Glutes.'
    ],
    setsRecommendation: {
      muscleGain: '3-4 sets of 8-12 reps',
      strength: '4-5 sets of 3-5 reps',
      fatLoss: '3 sets of 12-15 reps'
    },
    // Adding backward compatibility fields for WorkoutGenerator/Analytics
    sets: { 'Muscle Gain': 4, 'Fat Loss': 3, 'Strength': 5, 'Endurance': 3, 'General Fitness': 3 },
    reps: { 'Muscle Gain': '8-12', 'Fat Loss': '12-15', 'Strength': '3-5', 'Endurance': '15-20', 'General Fitness': '10-12' },
    rest: { 'Muscle Gain': 90, 'Fat Loss': 45, 'Strength': 180, 'Endurance': 30, 'General Fitness': 60 },
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop',
    gifUrl: ''
  },
  {
    id: 'glute-bridge',
    name: 'Glute Bridge',
    muscle: 'Legs',
    muscleGroup: 'Glutes',
    secondaryMuscles: ['Core'],
    equipment: ['Full Gym'],
    difficulty: 'Beginner',
    exerciseType: 'Compound',
    instructions: [
      'Assume the correct starting position for Glute Bridge.',
      'Execute the movement with controlled tempo.',
      'Squeeze the Glutes at the peak contraction.',
      'Return to the starting position slowly.'
    ],
    commonMistakes: [
      'Using momentum instead of muscle control.',
      'Not using a full range of motion.'
    ],
    proTips: [
      'Focus on the mind-muscle connection with the Glutes.'
    ],
    setsRecommendation: {
      muscleGain: '3-4 sets of 8-12 reps',
      strength: '4-5 sets of 3-5 reps',
      fatLoss: '3 sets of 12-15 reps'
    },
    // Adding backward compatibility fields for WorkoutGenerator/Analytics
    sets: { 'Muscle Gain': 4, 'Fat Loss': 3, 'Strength': 5, 'Endurance': 3, 'General Fitness': 3 },
    reps: { 'Muscle Gain': '8-12', 'Fat Loss': '12-15', 'Strength': '3-5', 'Endurance': '15-20', 'General Fitness': '10-12' },
    rest: { 'Muscle Gain': 90, 'Fat Loss': 45, 'Strength': 180, 'Endurance': 30, 'General Fitness': 60 },
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop',
    gifUrl: ''
  },
  {
    id: 'sumo-squat',
    name: 'Sumo Squat',
    muscle: 'Legs',
    muscleGroup: 'Glutes',
    secondaryMuscles: ['Core'],
    equipment: ['Full Gym'],
    difficulty: 'Beginner',
    exerciseType: 'Compound',
    instructions: [
      'Assume the correct starting position for Sumo Squat.',
      'Execute the movement with controlled tempo.',
      'Squeeze the Glutes at the peak contraction.',
      'Return to the starting position slowly.'
    ],
    commonMistakes: [
      'Using momentum instead of muscle control.',
      'Not using a full range of motion.'
    ],
    proTips: [
      'Focus on the mind-muscle connection with the Glutes.'
    ],
    setsRecommendation: {
      muscleGain: '3-4 sets of 8-12 reps',
      strength: '4-5 sets of 3-5 reps',
      fatLoss: '3 sets of 12-15 reps'
    },
    // Adding backward compatibility fields for WorkoutGenerator/Analytics
    sets: { 'Muscle Gain': 4, 'Fat Loss': 3, 'Strength': 5, 'Endurance': 3, 'General Fitness': 3 },
    reps: { 'Muscle Gain': '8-12', 'Fat Loss': '12-15', 'Strength': '3-5', 'Endurance': '15-20', 'General Fitness': '10-12' },
    rest: { 'Muscle Gain': 90, 'Fat Loss': 45, 'Strength': 180, 'Endurance': 30, 'General Fitness': 60 },
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop',
    gifUrl: ''
  },
  {
    id: 'cable-kickback',
    name: 'Cable Kickback',
    muscle: 'Legs',
    muscleGroup: 'Glutes',
    secondaryMuscles: ['Core'],
    equipment: ['Full Gym'],
    difficulty: 'Intermediate',
    exerciseType: 'Compound',
    instructions: [
      'Assume the correct starting position for Cable Kickback.',
      'Execute the movement with controlled tempo.',
      'Squeeze the Glutes at the peak contraction.',
      'Return to the starting position slowly.'
    ],
    commonMistakes: [
      'Using momentum instead of muscle control.',
      'Not using a full range of motion.'
    ],
    proTips: [
      'Focus on the mind-muscle connection with the Glutes.'
    ],
    setsRecommendation: {
      muscleGain: '3-4 sets of 8-12 reps',
      strength: '4-5 sets of 3-5 reps',
      fatLoss: '3 sets of 12-15 reps'
    },
    // Adding backward compatibility fields for WorkoutGenerator/Analytics
    sets: { 'Muscle Gain': 4, 'Fat Loss': 3, 'Strength': 5, 'Endurance': 3, 'General Fitness': 3 },
    reps: { 'Muscle Gain': '8-12', 'Fat Loss': '12-15', 'Strength': '3-5', 'Endurance': '15-20', 'General Fitness': '10-12' },
    rest: { 'Muscle Gain': 90, 'Fat Loss': 45, 'Strength': 180, 'Endurance': 30, 'General Fitness': 60 },
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop',
    gifUrl: ''
  },
  {
    id: 'walking-lunges-glutes',
    name: 'Walking Lunges',
    muscle: 'Legs',
    muscleGroup: 'Glutes',
    secondaryMuscles: ['Core'],
    equipment: ['Full Gym'],
    difficulty: 'Beginner',
    exerciseType: 'Compound',
    instructions: [
      'Assume the correct starting position for Walking Lunges.',
      'Execute the movement with controlled tempo.',
      'Squeeze the Glutes at the peak contraction.',
      'Return to the starting position slowly.'
    ],
    commonMistakes: [
      'Using momentum instead of muscle control.',
      'Not using a full range of motion.'
    ],
    proTips: [
      'Focus on the mind-muscle connection with the Glutes.'
    ],
    setsRecommendation: {
      muscleGain: '3-4 sets of 8-12 reps',
      strength: '4-5 sets of 3-5 reps',
      fatLoss: '3 sets of 12-15 reps'
    },
    // Adding backward compatibility fields for WorkoutGenerator/Analytics
    sets: { 'Muscle Gain': 4, 'Fat Loss': 3, 'Strength': 5, 'Endurance': 3, 'General Fitness': 3 },
    reps: { 'Muscle Gain': '8-12', 'Fat Loss': '12-15', 'Strength': '3-5', 'Endurance': '15-20', 'General Fitness': '10-12' },
    rest: { 'Muscle Gain': 90, 'Fat Loss': 45, 'Strength': 180, 'Endurance': 30, 'General Fitness': 60 },
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop',
    gifUrl: ''
  },
  {
    id: 'step-ups-glutes',
    name: 'Step Ups',
    muscle: 'Legs',
    muscleGroup: 'Glutes',
    secondaryMuscles: ['Core'],
    equipment: ['Full Gym'],
    difficulty: 'Beginner',
    exerciseType: 'Compound',
    instructions: [
      'Assume the correct starting position for Step Ups.',
      'Execute the movement with controlled tempo.',
      'Squeeze the Glutes at the peak contraction.',
      'Return to the starting position slowly.'
    ],
    commonMistakes: [
      'Using momentum instead of muscle control.',
      'Not using a full range of motion.'
    ],
    proTips: [
      'Focus on the mind-muscle connection with the Glutes.'
    ],
    setsRecommendation: {
      muscleGain: '3-4 sets of 8-12 reps',
      strength: '4-5 sets of 3-5 reps',
      fatLoss: '3 sets of 12-15 reps'
    },
    // Adding backward compatibility fields for WorkoutGenerator/Analytics
    sets: { 'Muscle Gain': 4, 'Fat Loss': 3, 'Strength': 5, 'Endurance': 3, 'General Fitness': 3 },
    reps: { 'Muscle Gain': '8-12', 'Fat Loss': '12-15', 'Strength': '3-5', 'Endurance': '15-20', 'General Fitness': '10-12' },
    rest: { 'Muscle Gain': 90, 'Fat Loss': 45, 'Strength': 180, 'Endurance': 30, 'General Fitness': 60 },
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop',
    gifUrl: ''
  },
  {
    id: 'standing-calf-raise',
    name: 'Standing Calf Raise',
    muscle: 'Legs',
    muscleGroup: 'Calves',
    secondaryMuscles: ['Core'],
    equipment: ['Full Gym'],
    difficulty: 'Beginner',
    exerciseType: 'Isolation',
    instructions: [
      'Assume the correct starting position for Standing Calf Raise.',
      'Execute the movement with controlled tempo.',
      'Squeeze the Calves at the peak contraction.',
      'Return to the starting position slowly.'
    ],
    commonMistakes: [
      'Using momentum instead of muscle control.',
      'Not using a full range of motion.'
    ],
    proTips: [
      'Focus on the mind-muscle connection with the Calves.'
    ],
    setsRecommendation: {
      muscleGain: '3-4 sets of 8-12 reps',
      strength: '4-5 sets of 3-5 reps',
      fatLoss: '3 sets of 12-15 reps'
    },
    // Adding backward compatibility fields for WorkoutGenerator/Analytics
    sets: { 'Muscle Gain': 4, 'Fat Loss': 3, 'Strength': 5, 'Endurance': 3, 'General Fitness': 3 },
    reps: { 'Muscle Gain': '8-12', 'Fat Loss': '12-15', 'Strength': '3-5', 'Endurance': '15-20', 'General Fitness': '10-12' },
    rest: { 'Muscle Gain': 90, 'Fat Loss': 45, 'Strength': 180, 'Endurance': 30, 'General Fitness': 60 },
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop',
    gifUrl: ''
  },
  {
    id: 'seated-calf-raise',
    name: 'Seated Calf Raise',
    muscle: 'Legs',
    muscleGroup: 'Calves',
    secondaryMuscles: ['Core'],
    equipment: ['Full Gym'],
    difficulty: 'Beginner',
    exerciseType: 'Isolation',
    instructions: [
      'Assume the correct starting position for Seated Calf Raise.',
      'Execute the movement with controlled tempo.',
      'Squeeze the Calves at the peak contraction.',
      'Return to the starting position slowly.'
    ],
    commonMistakes: [
      'Using momentum instead of muscle control.',
      'Not using a full range of motion.'
    ],
    proTips: [
      'Focus on the mind-muscle connection with the Calves.'
    ],
    setsRecommendation: {
      muscleGain: '3-4 sets of 8-12 reps',
      strength: '4-5 sets of 3-5 reps',
      fatLoss: '3 sets of 12-15 reps'
    },
    // Adding backward compatibility fields for WorkoutGenerator/Analytics
    sets: { 'Muscle Gain': 4, 'Fat Loss': 3, 'Strength': 5, 'Endurance': 3, 'General Fitness': 3 },
    reps: { 'Muscle Gain': '8-12', 'Fat Loss': '12-15', 'Strength': '3-5', 'Endurance': '15-20', 'General Fitness': '10-12' },
    rest: { 'Muscle Gain': 90, 'Fat Loss': 45, 'Strength': 180, 'Endurance': 30, 'General Fitness': 60 },
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop',
    gifUrl: ''
  },
  {
    id: 'leg-press-calf-raise',
    name: 'Leg Press Calf Raise',
    muscle: 'Legs',
    muscleGroup: 'Calves',
    secondaryMuscles: ['Core'],
    equipment: ['Full Gym'],
    difficulty: 'Beginner',
    exerciseType: 'Isolation',
    instructions: [
      'Assume the correct starting position for Leg Press Calf Raise.',
      'Execute the movement with controlled tempo.',
      'Squeeze the Calves at the peak contraction.',
      'Return to the starting position slowly.'
    ],
    commonMistakes: [
      'Using momentum instead of muscle control.',
      'Not using a full range of motion.'
    ],
    proTips: [
      'Focus on the mind-muscle connection with the Calves.'
    ],
    setsRecommendation: {
      muscleGain: '3-4 sets of 8-12 reps',
      strength: '4-5 sets of 3-5 reps',
      fatLoss: '3 sets of 12-15 reps'
    },
    // Adding backward compatibility fields for WorkoutGenerator/Analytics
    sets: { 'Muscle Gain': 4, 'Fat Loss': 3, 'Strength': 5, 'Endurance': 3, 'General Fitness': 3 },
    reps: { 'Muscle Gain': '8-12', 'Fat Loss': '12-15', 'Strength': '3-5', 'Endurance': '15-20', 'General Fitness': '10-12' },
    rest: { 'Muscle Gain': 90, 'Fat Loss': 45, 'Strength': 180, 'Endurance': 30, 'General Fitness': 60 },
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop',
    gifUrl: ''
  },
  {
    id: 'single-leg-calf-raise',
    name: 'Single Leg Calf Raise',
    muscle: 'Legs',
    muscleGroup: 'Calves',
    secondaryMuscles: ['Core'],
    equipment: ['Full Gym'],
    difficulty: 'Beginner',
    exerciseType: 'Isolation',
    instructions: [
      'Assume the correct starting position for Single Leg Calf Raise.',
      'Execute the movement with controlled tempo.',
      'Squeeze the Calves at the peak contraction.',
      'Return to the starting position slowly.'
    ],
    commonMistakes: [
      'Using momentum instead of muscle control.',
      'Not using a full range of motion.'
    ],
    proTips: [
      'Focus on the mind-muscle connection with the Calves.'
    ],
    setsRecommendation: {
      muscleGain: '3-4 sets of 8-12 reps',
      strength: '4-5 sets of 3-5 reps',
      fatLoss: '3 sets of 12-15 reps'
    },
    // Adding backward compatibility fields for WorkoutGenerator/Analytics
    sets: { 'Muscle Gain': 4, 'Fat Loss': 3, 'Strength': 5, 'Endurance': 3, 'General Fitness': 3 },
    reps: { 'Muscle Gain': '8-12', 'Fat Loss': '12-15', 'Strength': '3-5', 'Endurance': '15-20', 'General Fitness': '10-12' },
    rest: { 'Muscle Gain': 90, 'Fat Loss': 45, 'Strength': 180, 'Endurance': 30, 'General Fitness': 60 },
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop',
    gifUrl: ''
  },
  {
    id: 'crunch',
    name: 'Crunch',
    muscle: 'Core',
    muscleGroup: 'Core',
    secondaryMuscles: ['Core'],
    equipment: ['Full Gym'],
    difficulty: 'Beginner',
    exerciseType: 'Compound',
    instructions: [
      'Assume the correct starting position for Crunch.',
      'Execute the movement with controlled tempo.',
      'Squeeze the Core at the peak contraction.',
      'Return to the starting position slowly.'
    ],
    commonMistakes: [
      'Using momentum instead of muscle control.',
      'Not using a full range of motion.'
    ],
    proTips: [
      'Focus on the mind-muscle connection with the Core.'
    ],
    setsRecommendation: {
      muscleGain: '3-4 sets of 8-12 reps',
      strength: '4-5 sets of 3-5 reps',
      fatLoss: '3 sets of 12-15 reps'
    },
    // Adding backward compatibility fields for WorkoutGenerator/Analytics
    sets: { 'Muscle Gain': 4, 'Fat Loss': 3, 'Strength': 5, 'Endurance': 3, 'General Fitness': 3 },
    reps: { 'Muscle Gain': '8-12', 'Fat Loss': '12-15', 'Strength': '3-5', 'Endurance': '15-20', 'General Fitness': '10-12' },
    rest: { 'Muscle Gain': 90, 'Fat Loss': 45, 'Strength': 180, 'Endurance': 30, 'General Fitness': 60 },
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop',
    gifUrl: ''
  },
  {
    id: 'cable-crunch',
    name: 'Cable Crunch',
    muscle: 'Core',
    muscleGroup: 'Core',
    secondaryMuscles: ['Core'],
    equipment: ['Full Gym'],
    difficulty: 'Intermediate',
    exerciseType: 'Compound',
    instructions: [
      'Assume the correct starting position for Cable Crunch.',
      'Execute the movement with controlled tempo.',
      'Squeeze the Core at the peak contraction.',
      'Return to the starting position slowly.'
    ],
    commonMistakes: [
      'Using momentum instead of muscle control.',
      'Not using a full range of motion.'
    ],
    proTips: [
      'Focus on the mind-muscle connection with the Core.'
    ],
    setsRecommendation: {
      muscleGain: '3-4 sets of 8-12 reps',
      strength: '4-5 sets of 3-5 reps',
      fatLoss: '3 sets of 12-15 reps'
    },
    // Adding backward compatibility fields for WorkoutGenerator/Analytics
    sets: { 'Muscle Gain': 4, 'Fat Loss': 3, 'Strength': 5, 'Endurance': 3, 'General Fitness': 3 },
    reps: { 'Muscle Gain': '8-12', 'Fat Loss': '12-15', 'Strength': '3-5', 'Endurance': '15-20', 'General Fitness': '10-12' },
    rest: { 'Muscle Gain': 90, 'Fat Loss': 45, 'Strength': 180, 'Endurance': 30, 'General Fitness': 60 },
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop',
    gifUrl: ''
  },
  {
    id: 'leg-raise',
    name: 'Leg Raise',
    muscle: 'Core',
    muscleGroup: 'Core',
    secondaryMuscles: ['Core'],
    equipment: ['Full Gym'],
    difficulty: 'Beginner',
    exerciseType: 'Isolation',
    instructions: [
      'Assume the correct starting position for Leg Raise.',
      'Execute the movement with controlled tempo.',
      'Squeeze the Core at the peak contraction.',
      'Return to the starting position slowly.'
    ],
    commonMistakes: [
      'Using momentum instead of muscle control.',
      'Not using a full range of motion.'
    ],
    proTips: [
      'Focus on the mind-muscle connection with the Core.'
    ],
    setsRecommendation: {
      muscleGain: '3-4 sets of 8-12 reps',
      strength: '4-5 sets of 3-5 reps',
      fatLoss: '3 sets of 12-15 reps'
    },
    // Adding backward compatibility fields for WorkoutGenerator/Analytics
    sets: { 'Muscle Gain': 4, 'Fat Loss': 3, 'Strength': 5, 'Endurance': 3, 'General Fitness': 3 },
    reps: { 'Muscle Gain': '8-12', 'Fat Loss': '12-15', 'Strength': '3-5', 'Endurance': '15-20', 'General Fitness': '10-12' },
    rest: { 'Muscle Gain': 90, 'Fat Loss': 45, 'Strength': 180, 'Endurance': 30, 'General Fitness': 60 },
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop',
    gifUrl: ''
  },
  {
    id: 'hanging-leg-raise',
    name: 'Hanging Leg Raise',
    muscle: 'Core',
    muscleGroup: 'Core',
    secondaryMuscles: ['Core'],
    equipment: ['Full Gym'],
    difficulty: 'Beginner',
    exerciseType: 'Isolation',
    instructions: [
      'Assume the correct starting position for Hanging Leg Raise.',
      'Execute the movement with controlled tempo.',
      'Squeeze the Core at the peak contraction.',
      'Return to the starting position slowly.'
    ],
    commonMistakes: [
      'Using momentum instead of muscle control.',
      'Not using a full range of motion.'
    ],
    proTips: [
      'Focus on the mind-muscle connection with the Core.'
    ],
    setsRecommendation: {
      muscleGain: '3-4 sets of 8-12 reps',
      strength: '4-5 sets of 3-5 reps',
      fatLoss: '3 sets of 12-15 reps'
    },
    // Adding backward compatibility fields for WorkoutGenerator/Analytics
    sets: { 'Muscle Gain': 4, 'Fat Loss': 3, 'Strength': 5, 'Endurance': 3, 'General Fitness': 3 },
    reps: { 'Muscle Gain': '8-12', 'Fat Loss': '12-15', 'Strength': '3-5', 'Endurance': '15-20', 'General Fitness': '10-12' },
    rest: { 'Muscle Gain': 90, 'Fat Loss': 45, 'Strength': 180, 'Endurance': 30, 'General Fitness': 60 },
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop',
    gifUrl: ''
  },
  {
    id: 'reverse-crunch',
    name: 'Reverse Crunch',
    muscle: 'Core',
    muscleGroup: 'Core',
    secondaryMuscles: ['Core'],
    equipment: ['Full Gym'],
    difficulty: 'Beginner',
    exerciseType: 'Compound',
    instructions: [
      'Assume the correct starting position for Reverse Crunch.',
      'Execute the movement with controlled tempo.',
      'Squeeze the Core at the peak contraction.',
      'Return to the starting position slowly.'
    ],
    commonMistakes: [
      'Using momentum instead of muscle control.',
      'Not using a full range of motion.'
    ],
    proTips: [
      'Focus on the mind-muscle connection with the Core.'
    ],
    setsRecommendation: {
      muscleGain: '3-4 sets of 8-12 reps',
      strength: '4-5 sets of 3-5 reps',
      fatLoss: '3 sets of 12-15 reps'
    },
    // Adding backward compatibility fields for WorkoutGenerator/Analytics
    sets: { 'Muscle Gain': 4, 'Fat Loss': 3, 'Strength': 5, 'Endurance': 3, 'General Fitness': 3 },
    reps: { 'Muscle Gain': '8-12', 'Fat Loss': '12-15', 'Strength': '3-5', 'Endurance': '15-20', 'General Fitness': '10-12' },
    rest: { 'Muscle Gain': 90, 'Fat Loss': 45, 'Strength': 180, 'Endurance': 30, 'General Fitness': 60 },
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop',
    gifUrl: ''
  },
  {
    id: 'russian-twist',
    name: 'Russian Twist',
    muscle: 'Core',
    muscleGroup: 'Core',
    secondaryMuscles: ['Core'],
    equipment: ['Full Gym'],
    difficulty: 'Beginner',
    exerciseType: 'Compound',
    instructions: [
      'Assume the correct starting position for Russian Twist.',
      'Execute the movement with controlled tempo.',
      'Squeeze the Core at the peak contraction.',
      'Return to the starting position slowly.'
    ],
    commonMistakes: [
      'Using momentum instead of muscle control.',
      'Not using a full range of motion.'
    ],
    proTips: [
      'Focus on the mind-muscle connection with the Core.'
    ],
    setsRecommendation: {
      muscleGain: '3-4 sets of 8-12 reps',
      strength: '4-5 sets of 3-5 reps',
      fatLoss: '3 sets of 12-15 reps'
    },
    // Adding backward compatibility fields for WorkoutGenerator/Analytics
    sets: { 'Muscle Gain': 4, 'Fat Loss': 3, 'Strength': 5, 'Endurance': 3, 'General Fitness': 3 },
    reps: { 'Muscle Gain': '8-12', 'Fat Loss': '12-15', 'Strength': '3-5', 'Endurance': '15-20', 'General Fitness': '10-12' },
    rest: { 'Muscle Gain': 90, 'Fat Loss': 45, 'Strength': 180, 'Endurance': 30, 'General Fitness': 60 },
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop',
    gifUrl: ''
  },
  {
    id: 'side-plank',
    name: 'Side Plank',
    muscle: 'Core',
    muscleGroup: 'Core',
    secondaryMuscles: ['Core'],
    equipment: ['Full Gym'],
    difficulty: 'Beginner',
    exerciseType: 'Compound',
    instructions: [
      'Assume the correct starting position for Side Plank.',
      'Execute the movement with controlled tempo.',
      'Squeeze the Core at the peak contraction.',
      'Return to the starting position slowly.'
    ],
    commonMistakes: [
      'Using momentum instead of muscle control.',
      'Not using a full range of motion.'
    ],
    proTips: [
      'Focus on the mind-muscle connection with the Core.'
    ],
    setsRecommendation: {
      muscleGain: '3-4 sets of 8-12 reps',
      strength: '4-5 sets of 3-5 reps',
      fatLoss: '3 sets of 12-15 reps'
    },
    // Adding backward compatibility fields for WorkoutGenerator/Analytics
    sets: { 'Muscle Gain': 4, 'Fat Loss': 3, 'Strength': 5, 'Endurance': 3, 'General Fitness': 3 },
    reps: { 'Muscle Gain': '8-12', 'Fat Loss': '12-15', 'Strength': '3-5', 'Endurance': '15-20', 'General Fitness': '10-12' },
    rest: { 'Muscle Gain': 90, 'Fat Loss': 45, 'Strength': 180, 'Endurance': 30, 'General Fitness': 60 },
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop',
    gifUrl: ''
  },
  {
    id: 'plank',
    name: 'Plank',
    muscle: 'Core',
    muscleGroup: 'Core',
    secondaryMuscles: ['Core'],
    equipment: ['Full Gym'],
    difficulty: 'Beginner',
    exerciseType: 'Compound',
    instructions: [
      'Assume the correct starting position for Plank.',
      'Execute the movement with controlled tempo.',
      'Squeeze the Core at the peak contraction.',
      'Return to the starting position slowly.'
    ],
    commonMistakes: [
      'Using momentum instead of muscle control.',
      'Not using a full range of motion.'
    ],
    proTips: [
      'Focus on the mind-muscle connection with the Core.'
    ],
    setsRecommendation: {
      muscleGain: '3-4 sets of 8-12 reps',
      strength: '4-5 sets of 3-5 reps',
      fatLoss: '3 sets of 12-15 reps'
    },
    // Adding backward compatibility fields for WorkoutGenerator/Analytics
    sets: { 'Muscle Gain': 4, 'Fat Loss': 3, 'Strength': 5, 'Endurance': 3, 'General Fitness': 3 },
    reps: { 'Muscle Gain': '8-12', 'Fat Loss': '12-15', 'Strength': '3-5', 'Endurance': '15-20', 'General Fitness': '10-12' },
    rest: { 'Muscle Gain': 90, 'Fat Loss': 45, 'Strength': 180, 'Endurance': 30, 'General Fitness': 60 },
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop',
    gifUrl: ''
  },
  {
    id: 'ab-wheel-rollout',
    name: 'Ab Wheel Rollout',
    muscle: 'Core',
    muscleGroup: 'Core',
    secondaryMuscles: ['Core'],
    equipment: ['Full Gym'],
    difficulty: 'Beginner',
    exerciseType: 'Compound',
    instructions: [
      'Assume the correct starting position for Ab Wheel Rollout.',
      'Execute the movement with controlled tempo.',
      'Squeeze the Core at the peak contraction.',
      'Return to the starting position slowly.'
    ],
    commonMistakes: [
      'Using momentum instead of muscle control.',
      'Not using a full range of motion.'
    ],
    proTips: [
      'Focus on the mind-muscle connection with the Core.'
    ],
    setsRecommendation: {
      muscleGain: '3-4 sets of 8-12 reps',
      strength: '4-5 sets of 3-5 reps',
      fatLoss: '3 sets of 12-15 reps'
    },
    // Adding backward compatibility fields for WorkoutGenerator/Analytics
    sets: { 'Muscle Gain': 4, 'Fat Loss': 3, 'Strength': 5, 'Endurance': 3, 'General Fitness': 3 },
    reps: { 'Muscle Gain': '8-12', 'Fat Loss': '12-15', 'Strength': '3-5', 'Endurance': '15-20', 'General Fitness': '10-12' },
    rest: { 'Muscle Gain': 90, 'Fat Loss': 45, 'Strength': 180, 'Endurance': 30, 'General Fitness': 60 },
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop',
    gifUrl: ''
  },
  {
    id: 'mountain-climber',
    name: 'Mountain Climber',
    muscle: 'Core',
    muscleGroup: 'Core',
    secondaryMuscles: ['Core'],
    equipment: ['Full Gym'],
    difficulty: 'Beginner',
    exerciseType: 'Compound',
    instructions: [
      'Assume the correct starting position for Mountain Climber.',
      'Execute the movement with controlled tempo.',
      'Squeeze the Core at the peak contraction.',
      'Return to the starting position slowly.'
    ],
    commonMistakes: [
      'Using momentum instead of muscle control.',
      'Not using a full range of motion.'
    ],
    proTips: [
      'Focus on the mind-muscle connection with the Core.'
    ],
    setsRecommendation: {
      muscleGain: '3-4 sets of 8-12 reps',
      strength: '4-5 sets of 3-5 reps',
      fatLoss: '3 sets of 12-15 reps'
    },
    // Adding backward compatibility fields for WorkoutGenerator/Analytics
    sets: { 'Muscle Gain': 4, 'Fat Loss': 3, 'Strength': 5, 'Endurance': 3, 'General Fitness': 3 },
    reps: { 'Muscle Gain': '8-12', 'Fat Loss': '12-15', 'Strength': '3-5', 'Endurance': '15-20', 'General Fitness': '10-12' },
    rest: { 'Muscle Gain': 90, 'Fat Loss': 45, 'Strength': 180, 'Endurance': 30, 'General Fitness': 60 },
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop',
    gifUrl: ''
  }
];

export function getExercisesByEquipment(equipment) { return exercises.filter(e => e.equipment.includes(equipment)); }
export function getExercisesByDifficulty(difficulty) { return exercises.filter(e => e.difficulty === difficulty); }
export function getExerciseById(id) { return exercises.find(e => e.id === id); }
export function searchExercises(query) {
  const q = query.toLowerCase();
  return exercises.filter(e =>
    e.name.toLowerCase().includes(q) ||
    e.muscle.toLowerCase().includes(q) ||
    (e.muscleGroup && e.muscleGroup.toLowerCase().includes(q)) ||
    e.secondaryMuscles.some(m => m.toLowerCase().includes(q))
  );
}
