// Nutrition Calculations & Meal Plans

/**
 * Calculate BMR using Mifflin-St Jeor equation
 */
export function calculateBMR(weight, height, age, gender) {
  // weight in kg, height in cm
  if (gender === 'Female') {
    return 10 * weight + 6.25 * height - 5 * age - 161;
  }
  return 10 * weight + 6.25 * height - 5 * age + 5;
}

/**
 * Calculate TDEE based on activity level
 */
export function calculateTDEE(bmr, activityLevel = 'moderate') {
  const multipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    veryActive: 1.9
  };
  return Math.round(bmr * (multipliers[activityLevel] || 1.55));
}

/**
 * Calculate daily calorie target based on goal
 */
export function calculateCalorieTarget(tdee, goal) {
  const adjustments = {
    'Muscle Gain': 300,
    'Fat Loss': -500,
    'Strength': 200,
    'Endurance': 100,
    'General Fitness': 0
  };
  return Math.round(tdee + (adjustments[goal] || 0));
}

/**
 * Calculate macronutrient breakdown
 */
export function calculateMacros(calories, goal, weight) {
  const macroRatios = {
    'Muscle Gain': { proteinPerKg: 2.2, fatPercent: 0.25 },
    'Fat Loss': { proteinPerKg: 2.4, fatPercent: 0.30 },
    'Strength': { proteinPerKg: 2.0, fatPercent: 0.25 },
    'Endurance': { proteinPerKg: 1.6, fatPercent: 0.20 },
    'General Fitness': { proteinPerKg: 1.8, fatPercent: 0.25 }
  };

  const ratios = macroRatios[goal] || macroRatios['General Fitness'];
  const protein = Math.round(weight * ratios.proteinPerKg);
  const fat = Math.round((calories * ratios.fatPercent) / 9);
  const proteinCals = protein * 4;
  const fatCals = fat * 9;
  const carbCals = calories - proteinCals - fatCals;
  const carbs = Math.round(carbCals / 4);

  return { protein, carbs, fat, calories };
}

/**
 * Calculate BMI
 */
export function calculateBMI(weight, heightCm) {
  const heightM = heightCm / 100;
  return (weight / (heightM * heightM)).toFixed(1);
}

/**
 * Get BMI category
 */
export function getBMICategory(bmi) {
  if (bmi < 18.5) return { label: 'Underweight', color: '#3b82f6' };
  if (bmi < 25) return { label: 'Normal', color: '#10b981' };
  if (bmi < 30) return { label: 'Overweight', color: '#f59e0b' };
  return { label: 'Obese', color: '#ef4444' };
}

// Sample meal plans by goal
export const mealPlans = {
  'Muscle Gain': [
    {
      time: 'Breakfast',
      name: 'Power Protein Oats',
      items: [
        { name: 'Oats (80g)', calories: 300, protein: 10 },
        { name: 'Whey protein scoop', calories: 120, protein: 25 },
        { name: 'Banana', calories: 105, protein: 1 },
        { name: 'Peanut butter (1 tbsp)', calories: 95, protein: 4 },
        { name: 'Milk (200ml)', calories: 100, protein: 7 }
      ]
    },
    {
      time: 'Mid-Morning',
      name: 'Muscle Fuel Snack',
      items: [
        { name: 'Greek yogurt (200g)', calories: 130, protein: 20 },
        { name: 'Mixed berries', calories: 50, protein: 1 },
        { name: 'Almonds (30g)', calories: 170, protein: 6 }
      ]
    },
    {
      time: 'Lunch',
      name: 'Grilled Chicken Bowl',
      items: [
        { name: 'Chicken breast (200g)', calories: 330, protein: 62 },
        { name: 'Brown rice (150g cooked)', calories: 170, protein: 4 },
        { name: 'Mixed vegetables', calories: 80, protein: 3 },
        { name: 'Olive oil (1 tbsp)', calories: 120, protein: 0 }
      ]
    },
    {
      time: 'Pre-Workout',
      name: 'Energy Boost',
      items: [
        { name: 'Rice cakes (2)', calories: 70, protein: 2 },
        { name: 'Honey (1 tbsp)', calories: 60, protein: 0 },
        { name: 'Banana', calories: 105, protein: 1 }
      ]
    },
    {
      time: 'Post-Workout',
      name: 'Recovery Shake',
      items: [
        { name: 'Whey protein (2 scoops)', calories: 240, protein: 50 },
        { name: 'Milk (300ml)', calories: 150, protein: 10 },
        { name: 'Banana', calories: 105, protein: 1 }
      ]
    },
    {
      time: 'Dinner',
      name: 'Salmon Power Plate',
      items: [
        { name: 'Salmon fillet (200g)', calories: 400, protein: 40 },
        { name: 'Sweet potato (200g)', calories: 180, protein: 4 },
        { name: 'Steamed broccoli', calories: 55, protein: 4 },
        { name: 'Avocado (half)', calories: 120, protein: 2 }
      ]
    }
  ],
  'Fat Loss': [
    {
      time: 'Breakfast',
      name: 'Lean Protein Scramble',
      items: [
        { name: 'Egg whites (4)', calories: 68, protein: 14 },
        { name: 'Whole egg (1)', calories: 72, protein: 6 },
        { name: 'Spinach', calories: 10, protein: 1 },
        { name: 'Whole wheat toast', calories: 80, protein: 4 }
      ]
    },
    {
      time: 'Mid-Morning',
      name: 'Light & Lean',
      items: [
        { name: 'Protein shake', calories: 120, protein: 25 },
        { name: 'Apple', calories: 95, protein: 0 }
      ]
    },
    {
      time: 'Lunch',
      name: 'Turkey Salad Bowl',
      items: [
        { name: 'Turkey breast (150g)', calories: 200, protein: 40 },
        { name: 'Mixed greens', calories: 20, protein: 2 },
        { name: 'Tomatoes & cucumber', calories: 30, protein: 1 },
        { name: 'Olive oil vinaigrette', calories: 60, protein: 0 },
        { name: 'Quinoa (100g cooked)', calories: 120, protein: 4 }
      ]
    },
    {
      time: 'Afternoon',
      name: 'Smart Snack',
      items: [
        { name: 'Greek yogurt (150g, low fat)', calories: 90, protein: 15 },
        { name: 'Berries', calories: 40, protein: 1 }
      ]
    },
    {
      time: 'Dinner',
      name: 'Clean Grilled Plate',
      items: [
        { name: 'White fish (200g)', calories: 200, protein: 42 },
        { name: 'Steamed vegetables', calories: 70, protein: 3 },
        { name: 'Brown rice (100g cooked)', calories: 110, protein: 3 }
      ]
    }
  ],
  'Strength': [
    {
      time: 'Breakfast',
      name: 'Strength Builder',
      items: [
        { name: 'Eggs (3 whole)', calories: 216, protein: 18 },
        { name: 'Oats (60g)', calories: 225, protein: 8 },
        { name: 'Milk (200ml)', calories: 100, protein: 7 },
        { name: 'Banana', calories: 105, protein: 1 }
      ]
    },
    {
      time: 'Mid-Morning',
      name: 'Power Snack',
      items: [
        { name: 'Beef jerky (50g)', calories: 165, protein: 25 },
        { name: 'Mixed nuts (30g)', calories: 175, protein: 5 }
      ]
    },
    {
      time: 'Lunch',
      name: 'Steak & Carbs',
      items: [
        { name: 'Lean steak (200g)', calories: 360, protein: 52 },
        { name: 'Mashed potatoes (200g)', calories: 160, protein: 4 },
        { name: 'Green beans', calories: 35, protein: 2 }
      ]
    },
    {
      time: 'Pre-Workout',
      name: 'Fuel Up',
      items: [
        { name: 'PB&J sandwich', calories: 350, protein: 12 },
        { name: 'Coffee', calories: 5, protein: 0 }
      ]
    },
    {
      time: 'Post-Workout',
      name: 'Recovery',
      items: [
        { name: 'Whey protein (2 scoops)', calories: 240, protein: 50 },
        { name: 'Dextrose (30g)', calories: 120, protein: 0 }
      ]
    },
    {
      time: 'Dinner',
      name: 'Evening Refuel',
      items: [
        { name: 'Chicken thighs (200g)', calories: 360, protein: 40 },
        { name: 'Pasta (150g cooked)', calories: 220, protein: 8 },
        { name: 'Tomato sauce', calories: 50, protein: 2 },
        { name: 'Parmesan (20g)', calories: 80, protein: 7 }
      ]
    }
  ],
  'Endurance': [
    {
      time: 'Breakfast',
      name: 'Endurance Fuel',
      items: [
        { name: 'Granola (60g)', calories: 270, protein: 6 },
        { name: 'Greek yogurt (150g)', calories: 130, protein: 15 },
        { name: 'Honey', calories: 60, protein: 0 },
        { name: 'Mixed berries', calories: 50, protein: 1 }
      ]
    },
    {
      time: 'Mid-Morning',
      name: 'Carb Boost',
      items: [
        { name: 'Banana', calories: 105, protein: 1 },
        { name: 'Rice cakes (2)', calories: 70, protein: 2 },
        { name: 'Almond butter (1 tbsp)', calories: 100, protein: 3 }
      ]
    },
    {
      time: 'Lunch',
      name: 'Pasta Power',
      items: [
        { name: 'Whole wheat pasta (200g cooked)', calories: 260, protein: 10 },
        { name: 'Chicken breast (150g)', calories: 248, protein: 47 },
        { name: 'Vegetables & olive oil', calories: 130, protein: 3 }
      ]
    },
    {
      time: 'Afternoon',
      name: 'Energy Snack',
      items: [
        { name: 'Trail mix (40g)', calories: 200, protein: 5 },
        { name: 'Orange juice (200ml)', calories: 90, protein: 2 }
      ]
    },
    {
      time: 'Dinner',
      name: 'Recovery Dinner',
      items: [
        { name: 'Lean beef (150g)', calories: 260, protein: 38 },
        { name: 'Sweet potato (200g)', calories: 180, protein: 4 },
        { name: 'Salad with dressing', calories: 100, protein: 2 }
      ]
    }
  ],
  'General Fitness': [
    {
      time: 'Breakfast',
      name: 'Balanced Start',
      items: [
        { name: 'Eggs (2 whole)', calories: 144, protein: 12 },
        { name: 'Whole wheat toast (2)', calories: 160, protein: 8 },
        { name: 'Avocado (half)', calories: 120, protein: 2 },
        { name: 'Orange juice', calories: 90, protein: 2 }
      ]
    },
    {
      time: 'Mid-Morning',
      name: 'Healthy Snack',
      items: [
        { name: 'Greek yogurt (150g)', calories: 130, protein: 15 },
        { name: 'Granola (30g)', calories: 135, protein: 3 },
        { name: 'Berries', calories: 40, protein: 1 }
      ]
    },
    {
      time: 'Lunch',
      name: 'Balanced Bowl',
      items: [
        { name: 'Grilled chicken (150g)', calories: 248, protein: 47 },
        { name: 'Brown rice (120g cooked)', calories: 140, protein: 3 },
        { name: 'Mixed vegetables', calories: 80, protein: 3 },
        { name: 'Hummus (2 tbsp)', calories: 70, protein: 2 }
      ]
    },
    {
      time: 'Afternoon',
      name: 'Afternoon Boost',
      items: [
        { name: 'Apple', calories: 95, protein: 0 },
        { name: 'Almond butter (1 tbsp)', calories: 100, protein: 3 }
      ]
    },
    {
      time: 'Dinner',
      name: 'Wholesome Dinner',
      items: [
        { name: 'Salmon (150g)', calories: 300, protein: 30 },
        { name: 'Quinoa (120g cooked)', calories: 140, protein: 5 },
        { name: 'Roasted vegetables', calories: 100, protein: 3 }
      ]
    }
  ]
};

export function getMealPlan(goal) {
  return mealPlans[goal] || mealPlans['General Fitness'];
}

export function getMealTotals(meals) {
  return meals.reduce((totals, meal) => {
    meal.items.forEach(item => {
      totals.calories += item.calories;
      totals.protein += item.protein;
    });
    return totals;
  }, { calories: 0, protein: 0 });
}
