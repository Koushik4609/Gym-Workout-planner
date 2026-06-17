// AI Coach Knowledge Base - Simulated Responses

const knowledgeBase = {
  // Workout-related
  workout: [
    {
      keywords: ['warm up', 'warmup', 'warming up'],
      response: "Great question! A proper warm-up is essential. Here's what I recommend:\n\n🔥 **Dynamic Warm-Up (5-10 min)**\n• Light cardio (walking, cycling) for 3-5 minutes\n• Arm circles and leg swings\n• Hip circles and torso twists\n• Bodyweight squats and lunges\n• Push-ups (5-10 reps)\n\nAlways warm up the specific muscles you're about to train. This reduces injury risk and improves performance!"
    },
    {
      keywords: ['how many sets', 'sets per', 'set range'],
      response: "The ideal number of sets depends on your goal:\n\n💪 **Muscle Gain**: 3-4 sets per exercise, 10-20 sets per muscle group per week\n🏋️ **Strength**: 4-6 sets per exercise, heavier weights\n🔥 **Fat Loss**: 3 sets per exercise, shorter rest periods\n🏃 **Endurance**: 2-3 sets, higher reps\n\n**Key Rule**: Total weekly volume matters more than per-session volume. Spread your sets across the week!"
    },
    {
      keywords: ['rest between sets', 'rest time', 'how long rest'],
      response: "Rest periods are crucial and goal-dependent:\n\n⏱️ **Strength (heavy lifts)**: 3-5 minutes\n💪 **Muscle Growth**: 60-90 seconds\n🔥 **Fat Loss / Endurance**: 30-45 seconds\n⚡ **Power / Explosiveness**: 2-3 minutes\n\n**Pro Tip**: Use shorter rests for isolation exercises and longer rests for compound movements like squats and deadlifts."
    },
    {
      keywords: ['split', 'workout split', 'training split', 'what days'],
      response: "Here are the most effective splits:\n\n📅 **3 Days/Week**: Full body or Push/Pull/Legs\n📅 **4 Days/Week**: Upper/Lower split\n📅 **5 Days/Week**: Push/Pull/Legs + Upper/Lower or Bro Split\n📅 **6 Days/Week**: Push/Pull/Legs (2x)\n\n**My Recommendation**: For most people, 4 days/week with Upper/Lower split is optimal. You get good frequency (each muscle 2x/week) with adequate recovery."
    },
    {
      keywords: ['overtraining', 'too much', 'overtrained'],
      response: "Signs of overtraining to watch for:\n\n⚠️ **Warning Signs**:\n• Persistent fatigue and decreased performance\n• Elevated resting heart rate\n• Mood changes, irritability\n• Frequent illness or injuries\n• Trouble sleeping\n• Loss of appetite\n\n**Solutions**:\n• Take a deload week (reduce volume by 40-50%)\n• Ensure 7-9 hours of sleep\n• Eat enough calories and protein\n• Take 1-2 full rest days per week\n\nRemember: Recovery is where growth happens!"
    },
    {
      keywords: ['progressive overload', 'increase weight', 'get stronger'],
      response: "Progressive overload is the #1 key to progress! Here's how:\n\n📈 **Methods to Progress**:\n1. **Add Weight**: Increase by 2.5-5lbs when you hit your rep target\n2. **Add Reps**: Do 1-2 more reps with the same weight\n3. **Add Sets**: Add a set to increase volume\n4. **Slow Down**: Increase time under tension\n5. **Reduce Rest**: Shorter rest between sets\n\n**Example**: If your goal is 3×10 bench press at 135lbs:\n• Week 1: 135 × 8, 8, 7\n• Week 2: 135 × 9, 8, 8\n• Week 3: 135 × 10, 10, 9\n• Week 4: 135 × 10, 10, 10 → Next week: 140lbs"
    },
    {
      keywords: ['beginner', 'just starting', 'new to gym', 'first time'],
      response: "Welcome to your fitness journey! Here's my advice for beginners:\n\n🌟 **Getting Started**:\n1. Start with 3 full-body workouts per week\n2. Focus on compound movements (squat, bench, deadlift, row, press)\n3. Use lighter weights to master form first\n4. Progress slowly — add weight only when form is perfect\n5. Rest at least 1 day between sessions\n\n**First 4 Weeks Focus**:\n• Learn the movement patterns\n• Build the habit of training consistently\n• Don't compare yourself to others\n• Track your workouts to see progress\n\nConsistency beats intensity every time! 💪"
    }
  ],

  // Form and technique
  form: [
    {
      keywords: ['squat form', 'how to squat', 'squat technique'],
      response: "Perfect squat form breakdown:\n\n🎯 **Setup**:\n• Feet shoulder-width apart, toes slightly out (15-30°)\n• Bar on upper traps (high bar) or rear delts (low bar)\n• Chest up, core braced\n\n📐 **Execution**:\n1. Break at hips and knees simultaneously\n2. Push knees out over toes\n3. Descend until hip crease is below knee\n4. Drive through mid-foot to stand\n5. Keep back flat throughout\n\n⚠️ **Common Mistakes**:\n• Knees caving in → Push them out\n• Rounding lower back → Brace harder, reduce weight\n• Heels lifting → Work on ankle mobility\n• Leaning too far forward → Strengthen upper back"
    },
    {
      keywords: ['bench press form', 'bench form', 'how to bench'],
      response: "Master the bench press:\n\n🎯 **Setup**:\n• Eyes under the bar\n• Retract & depress shoulder blades\n• Slight arch in upper back\n• Feet flat on floor\n• Grip: 1.5× shoulder width\n\n📐 **Execution**:\n1. Unrack with straight arms\n2. Lower bar to mid-chest (nipple line)\n3. Touch chest lightly — no bouncing\n4. Press up and slightly back\n5. Lock out arms at the top\n\n⚠️ **Common Mistakes**:\n• Flaring elbows 90° → Keep at 45-75°\n• Bouncing off chest → Controlled touch\n• Lifting butt → Keep glutes on bench\n• Unstable bar path → Practice with lighter weight"
    },
    {
      keywords: ['deadlift form', 'how to deadlift', 'deadlift technique'],
      response: "Deadlift form essentials:\n\n🎯 **Setup**:\n• Bar over mid-foot\n• Feet hip-width apart\n• Grip just outside knees\n• Hips higher than knees, lower than shoulders\n• Back flat, chest up\n\n📐 **Execution**:\n1. Take the slack out of the bar first\n2. Drive through heels, pushing floor away\n3. Keep bar close to body (drag up shins)\n4. Lock out hips and knees together\n5. Reverse the motion to lower\n\n⚠️ **Common Mistakes**:\n• Rounding back → Brace core, reduce weight\n• Jerking the bar → Take slack out first\n• Bar drifting forward → Keep it close\n• Hyperextending at top → Squeeze glutes to finish"
    },
    {
      keywords: ['good form', 'proper form', 'technique tips'],
      response: "General form principles for any exercise:\n\n✅ **Universal Tips**:\n1. **Control the weight** — No swinging or momentum\n2. **Full range of motion** — Don't cut reps short\n3. **Mind-muscle connection** — Feel the target muscle working\n4. **Breathe properly** — Exhale on effort, inhale on return\n5. **Brace your core** — On every exercise, not just abs\n\n📹 **Self-Check Method**:\n• Film yourself from the side\n• Compare to reference videos\n• Start lighter when learning new exercises\n• Get a form check from experienced lifters\n\nRemember: Perfect form with lighter weight > Heavy weight with bad form!"
    }
  ],

  // Nutrition
  nutrition: [
    {
      keywords: ['protein', 'how much protein', 'protein intake'],
      response: "Protein guidelines for your goals:\n\n🥩 **Daily Protein Targets**:\n• Muscle Gain: 1.8-2.2g per kg bodyweight\n• Fat Loss: 2.0-2.4g per kg (higher to preserve muscle)\n• Strength: 1.6-2.0g per kg\n• General: 1.4-1.8g per kg\n\n🍗 **Best Protein Sources**:\n• Chicken breast (31g per 100g)\n• Lean beef (26g per 100g)\n• Fish/salmon (20-25g per 100g)\n• Eggs (6g each)\n• Greek yogurt (10g per 100g)\n• Whey protein (25g per scoop)\n\n**Pro Tip**: Spread protein across 4-5 meals, aim for 25-40g per meal for optimal muscle protein synthesis."
    },
    {
      keywords: ['calories', 'how many calories', 'calorie', 'surplus', 'deficit'],
      response: "Calorie guidelines:\n\n🔢 **Determine Your Needs**:\n1. Calculate BMR (Basal Metabolic Rate)\n2. Multiply by activity factor for TDEE\n3. Adjust based on goal:\n\n📊 **Goal Adjustments**:\n• Muscle Gain: TDEE + 200-500 calories (surplus)\n• Fat Loss: TDEE - 300-500 calories (deficit)\n• Strength: TDEE + 100-300 calories\n• Maintenance: TDEE ± 0\n\n⚠️ **Important Rules**:\n• Never go below 1,200 cal (women) or 1,500 cal (men)\n• Lose no more than 0.5-1% bodyweight per week\n• Gain no more than 0.25-0.5% bodyweight per week\n• Track consistently for accurate results\n\nUse the Nutrition section in FitForge to calculate your exact needs!"
    },
    {
      keywords: ['meal prep', 'meal planning', 'what to eat'],
      response: "Meal prep like a pro:\n\n🍽️ **Meal Prep Strategy**:\n1. Pick 2-3 proteins (chicken, beef, fish)\n2. Pick 2-3 carb sources (rice, potatoes, pasta)\n3. Prep vegetables in bulk\n4. Cook on Sunday for the week\n5. Store in containers, label with dates\n\n📋 **Sample Day**:\n• Breakfast: Eggs + oats + fruit\n• Snack: Greek yogurt + nuts\n• Lunch: Chicken + rice + veggies\n• Snack: Protein shake + banana\n• Dinner: Fish + potatoes + salad\n\n💡 **Tips**:\n• Cook in bulk — it's more efficient\n• Use a food scale for accuracy\n• Prep sauces/marinades for variety\n• Freeze extra portions for busy days"
    },
    {
      keywords: ['supplement', 'supplements', 'creatine', 'pre workout'],
      response: "Evidence-based supplement guide:\n\n✅ **Worth Taking**:\n1. **Creatine Monohydrate** (5g/day) — Most researched supplement, proven for strength and muscle\n2. **Whey Protein** — Convenient protein source\n3. **Vitamin D** — If you don't get enough sun\n4. **Fish Oil** — If you don't eat fatty fish 2-3x/week\n5. **Caffeine** — Proven performance enhancer\n\n⚠️ **Save Your Money**:\n• BCAAs (if protein intake is adequate)\n• Fat burners (most are just caffeine)\n• Testosterone boosters\n• Most \"proprietary blends\"\n\n💊 **Pre-Workout**: 200-400mg caffeine 30 min before training is the most effective and cheapest option.\n\nRemember: Supplements supplement a good diet — they don't replace one!"
    },
    {
      keywords: ['bulking', 'bulk', 'how to bulk', 'mass gain'],
      response: "Bulking Guide for Muscle Gain:\n\n📈 **1. Calorie Surplus**:\nAim for a modest surplus of **200-400 calories** above your maintenance (TDEE). This supports muscle synthesis while minimizing fat gain.\n\n🥩 **2. Protein Target**:\nConsume **1.8-2.2g of protein per kg** of bodyweight daily.\n\n⚖️ **3. Rate of Gain**:\nTarget a weight gain of **0.25-0.5% of bodyweight per week**. Anything faster is likely fat accumulation.\n\n🏋️ **4. Progressive Overload**:\nFocus on lifting heavier weights or performing more reps over time to stimulate hypertrophy."
    },
    {
      keywords: ['cutting', 'cut', 'how to cut', 'fat loss diet'],
      response: "Cutting Guide for Fat Loss:\n\n📉 **1. Calorie Deficit**:\nCreate a deficit of **300-500 calories** below your maintenance (TDEE). This helps burn stored fat sustainably.\n\n🥩 **2. High Protein**:\nIncrease protein to **2.0-2.4g per kg** of bodyweight to preserve lean muscle tissue while in a deficit.\n\n🏃 **3. Active Lifestyle**:\nKeep lifting heavy weights to tell your body to keep muscle, and use cardio (NEAT steps/LISS) to augment your deficit.\n\n😴 **4. Sleep & Recovery**:\nDeficits place stress on the body; aim for **8+ hours of sleep** to balance hormones and reduce cravings."
    }
  ],

  // Recovery
  recovery: [
    {
      keywords: ['recovery', 'rest day', 'how to recover', 'muscle soreness'],
      response: "Optimize your recovery:\n\n😴 **Sleep (Most Important)**:\n• Aim for 7-9 hours per night\n• Keep a consistent schedule\n• Cool, dark room\n• No screens 30 min before bed\n\n🧘 **Active Recovery**:\n• Light walking (20-30 min)\n• Foam rolling (10-15 min)\n• Stretching / yoga\n• Swimming\n\n🍎 **Nutrition for Recovery**:\n• Eat protein within 2 hours post-workout\n• Stay hydrated (aim for 3-4L water/day)\n• Don't skip meals on rest days\n• Anti-inflammatory foods (berries, fatty fish, turmeric)\n\n💆 **Additional Methods**:\n• Contrast showers (hot/cold)\n• Massage\n• Meditation / stress management\n\n**Soreness is normal** for the first 1-2 weeks. If soreness lasts more than 72 hours, you may need more rest."
    },
    {
      keywords: ['stretching', 'flexibility', 'mobility', 'stretch'],
      response: "Mobility & stretching guide:\n\n🧘 **When to Stretch**:\n• **Before workout**: Dynamic stretching only (leg swings, arm circles)\n• **After workout**: Static stretching (hold 20-30 seconds)\n• **Rest days**: Full mobility routine\n\n📋 **Key Stretches**:\n• Hip flexor stretch (30s each side)\n• Hamstring stretch (30s each side)\n• Chest/doorway stretch (30s)\n• Cat-cow stretch (10 reps)\n• World's greatest stretch (5 each side)\n• Shoulder dislocates with band (10 reps)\n\n⏰ **Time Investment**: 10-15 minutes of daily mobility work will dramatically improve your performance and reduce injury risk.\n\n**Pro Tip**: If you sit all day, prioritize hip flexor and chest stretches — these areas get the tightest."
    },
    {
      keywords: ['injury', 'pain', 'hurt', 'injured'],
      response: "⚠️ **Important Disclaimer**: I'm an AI coach, not a medical professional. For serious pain or injury, please consult a doctor or physiotherapist.\n\n🚨 **General Injury Guidelines**:\n\n**Stop exercising if you feel**:\n• Sharp, sudden pain\n• Joint pain (not muscle soreness)\n• Numbness or tingling\n• Pain that worsens during exercise\n\n**Muscle Soreness vs. Injury**:\n• Soreness: Dull ache, affects whole muscle, improves with movement\n• Injury: Sharp pain, specific location, worsens with movement\n\n🩹 **RICE Protocol for Minor Issues**:\n• **R**est the affected area\n• **I**ce for 15-20 min every few hours\n• **C**ompress with a bandage if swollen\n• **E**levate above heart level\n\nWhen in doubt, rest and see a professional. It's better to miss a few workouts than to make an injury worse."
    },
    {
      keywords: ['water', 'hydration', 'how much water'],
      response: "Hydration is crucial for performance:\n\n💧 **Daily Water Intake**:\n• General: 2.5-3.5 liters per day\n• Training days: Add 500ml-1L more\n• Hot weather: Increase by 500ml\n\n📊 **Hydration Timeline**:\n• Wake up: 500ml water immediately\n• Before workout (2h): 500ml\n• During workout: 200-300ml every 15 min\n• After workout: 500ml minimum\n• Throughout day: Sip consistently\n\n🎯 **Signs of Dehydration**:\n• Dark yellow urine (aim for light yellow)\n• Headaches\n• Fatigue\n• Decreased performance\n• Dizziness\n\n💡 **Pro Tip**: By the time you feel thirsty, you're already dehydrated. Keep a water bottle with you at all times!"
    }
  ],

  // Motivation
  motivation: [
    {
      keywords: ['motivation', 'motivated', 'don\'t feel like', 'lazy', 'skip'],
      response: "Here's the truth about motivation:\n\n🔥 **Motivation is Temporary. Discipline is Permanent.**\n\nThe people who get results aren't always motivated — they're disciplined. Here's how to build discipline:\n\n📋 **Practical Tips**:\n1. Set a non-negotiable schedule\n2. Lay out your gym clothes the night before\n3. Go even if it's just for 20 minutes\n4. Track your workouts — seeing progress motivates\n5. Find a workout partner\n6. Remember your \"why\"\n\n💪 **Mindset Shifts**:\n• \"I don't have time\" → \"It's not a priority yet\"\n• \"I'll start Monday\" → \"I'll start now with something small\"\n• \"I'm not seeing results\" → \"Results take 8-12 weeks to show\"\n\n🏆 **Remember**: Every workout you complete is a vote for the person you want to become. Even a bad workout beats no workout!"
    }
  ],

  // General
  general: [
    {
      keywords: ['hello', 'hi', 'hey', 'help'],
      response: "Hey! 💪 I'm your FitForge AI Coach. I can help you with:\n\n🏋️ **Workout Advice** — Sets, reps, splits, progressive overload\n📐 **Form Tips** — Squat, bench, deadlift, and more\n🥗 **Nutrition** — Macros, meal planning, supplements\n🔄 **Recovery** — Sleep, stretching, injury prevention\n🔥 **Motivation** — Building habits, staying consistent\n\nJust ask me anything fitness-related! You can also use the quick suggestions below for common topics."
    }
  ]
};

function findBestMatch(input) {
  const q = input.toLowerCase();
  let bestMatch = null;
  let bestScore = 0;

  for (const category of Object.values(knowledgeBase)) {
    for (const entry of category) {
      let score = 0;
      for (const keyword of entry.keywords) {
        if (q.includes(keyword.toLowerCase())) {
          score += keyword.split(' ').length; // longer matches score higher
        }
      }
      if (score > bestScore) {
        bestScore = score;
        bestMatch = entry;
      }
    }
  }
  return bestMatch;
}

const fallbackResponses = [
  "That's a great question! While I don't have a specific answer for that, I recommend checking with a certified personal trainer for personalized advice. Is there anything else I can help with? 💪",
  "Interesting question! I'm focused on general fitness guidance. Try asking me about workouts, nutrition, form tips, or recovery! 🏋️",
  "I appreciate your curiosity! I'm best at answering questions about exercise routines, proper form, nutrition, and recovery. What would you like to know about those topics? 🎯",
  "I'm not sure about that one, but I'd love to help with something else! Try asking about workout splits, protein intake, or recovery tips! 💪"
];

export function getAIResponse(userMessage) {
  const match = findBestMatch(userMessage);
  if (match) {
    return match.response;
  }
  return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
}

export const quickSuggestions = [
  "How should I warm up?",
  "How much protein do I need?",
  "What's proper squat form?",
  "How many sets should I do?",
  "How do I recover faster?",
  "What supplements should I take?",
  "Best workout split for beginners?",
  "How much water should I drink?"
];

export const fitnessQuotes = [
  { quote: "The only bad workout is the one that didn't happen.", author: "Unknown" },
  { quote: "Strength does not come from winning. Your struggles develop your strengths.", author: "Arnold Schwarzenegger" },
  { quote: "The pain you feel today will be the strength you feel tomorrow.", author: "Unknown" },
  { quote: "Success usually comes to those who are too busy to be looking for it.", author: "Henry David Thoreau" },
  { quote: "The body achieves what the mind believes.", author: "Napoleon Hill" },
  { quote: "Take care of your body. It's the only place you have to live.", author: "Jim Rohn" },
  { quote: "No matter how slow you go, you're still lapping everybody on the couch.", author: "Unknown" },
  { quote: "The only person you are destined to become is the person you decide to be.", author: "Ralph Waldo Emerson" },
  { quote: "Don't limit your challenges. Challenge your limits.", author: "Unknown" },
  { quote: "Fitness is not about being better than someone else. It's about being better than you used to be.", author: "Khloe Kardashian" }
];

export function getRandomQuote() {
  return fitnessQuotes[Math.floor(Math.random() * fitnessQuotes.length)];
}
