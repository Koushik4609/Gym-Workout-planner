const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

async function fetchFromGroq(messages, model, isJson = false) {
  if (!GROQ_API_KEY) {
    throw new Error("Missing VITE_GROQ_API_KEY in .env");
  }

  const payload = {
    model: model,
    messages: messages,
    temperature: 0.7,
  };

  if (isJson) {
    payload.response_format = { type: "json_object" };
  }

  const response = await fetch(GROQ_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${GROQ_API_KEY}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Groq API Error: ${response.status} - ${err}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

/**
 * Generate a workout plan using Groq Llama 3 (JSON mode).
 */
export async function generateWorkoutPlanAI(profile) {
  try {
    const prompt = `
You are an elite, highly intelligent AI fitness coach.
Generate a comprehensive, scientifically-backed weekly workout plan for the following user profile:
- Goal: ${profile.goal || 'General Fitness'}
- Experience Level: ${profile.level || 'Beginner'}
- Available Equipment: ${profile.equipment || 'Full Gym'}
- Days per Week: ${profile.daysPerWeek || 3}
- Split Type: ${profile.splitType || 'FullBody'}

You must return ONLY a JSON object. The root object MUST have a single key "workoutPlan" which is an array of objects. 
Each object in the array represents a workout day (or rest day) and must exactly match this structure:
{
  "day": "Monday",
  "label": "Full Body A",
  "isRest": false,
  "focus": ["Chest", "Back", "Legs"],
  "exercises": [
    {
      "id": "unique-id-1",
      "name": "Barbell Bench Press",
      "sets": 3,
      "reps": "8-10",
      "rest": 90,
      "muscle": "Chest",
      "difficulty": "Intermediate"
    }
  ]
}

Ensure that for each non-rest day, you provide a comprehensive list of exercises, typically 5 to 8 exercises per workout, to ensure a complete and effective session.
If it is a rest day, "isRest" must be true, and "exercises" must be an empty array.
Make sure you provide exactly 7 days of the week in the array.
Only return valid JSON. Do not include markdown formatting like \`\`\`json.
`;

    const resultText = await fetchFromGroq([
      { role: "system", content: "You are a JSON-generating AI fitness API." },
      { role: "user", content: prompt }
    ], "llama-3.3-70b-versatile", true);

    const parsed = JSON.parse(resultText);
    
    // Process into our internal schedule format (key-value by day)
    const formattedSchedule = {};
    if (parsed.workoutPlan && Array.isArray(parsed.workoutPlan)) {
      parsed.workoutPlan.forEach(day => {
        formattedSchedule[day.day] = day;
      });
    }
    
    return formattedSchedule;
  } catch (error) {
    console.error("Error generating workout plan via Groq:", error);
    throw error;
  }
}

/**
 * Chat with the AI Coach using Groq Llama 3.
 */
export async function chatWithCoachAI(messages) {
  try {
    const systemPrompt = "You are an elite, highly motivational AI personal trainer named Coach Alex. You give concise, actionable, and scientifically-sound fitness and nutrition advice. Be incredibly supportive, energetic, and professional. Keep responses relatively brief (1-3 paragraphs max).";
    
    const formattedHistory = [
      { role: "system", content: systemPrompt },
      ...messages.map(msg => ({
        role: msg.role === 'assistant' ? 'assistant' : msg.role,
        content: msg.content
      }))
    ];

    return await fetchFromGroq(formattedHistory, "llama-3.1-8b-instant", false);
  } catch (error) {
    console.error("Error chatting with coach via Groq:", error);
    throw error;
  }
}

/**
 * Generate a meal plan using Groq Llama 3 (JSON mode).
 */
export async function generateMealPlanAI(macros) {
  try {
    const prompt = `
You are an expert sports nutritionist.
Generate a 1-day sample meal plan that exactly matches these daily macronutrient targets:
- Calories: ${macros.calories} kcal
- Protein: ${macros.protein}g
- Carbs: ${macros.carbs}g
- Fat: ${macros.fat}g

You must return ONLY a JSON object. The root object MUST have a single key "meals" which is an array of objects representing meals (e.g., Breakfast, Lunch, Dinner, Snack).
Each object in the array must exactly match this structure:
{
  "name": "Breakfast",
  "totalCalories": 450,
  "totalProtein": 30,
  "carbs": 40,
  "fat": 15,
  "items": [
    { "name": "3 Whole Eggs", "calories": 210, "protein": 18 },
    { "name": "1 cup Oatmeal", "calories": 150, "protein": 5 }
  ]
}

Only return valid JSON. Do not include markdown formatting like \`\`\`json.
`;

    const resultText = await fetchFromGroq([
      { role: "system", content: "You are a JSON-generating AI nutrition API." },
      { role: "user", content: prompt }
    ], "llama-3.3-70b-versatile", true);

    const parsed = JSON.parse(resultText);
    return parsed.meals;
  } catch (error) {
    console.error("Error generating meal plan via Groq:", error);
    throw error;
  }
}

/**
 * Helper to extract the first frame of a video file as a Base64 JPEG.
 */
async function extractFirstFrameFromVideo(file) {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.preload = 'metadata';
    video.muted = true;
    video.playsInline = true;

    const fileURL = URL.createObjectURL(file);
    video.src = fileURL;

    video.onloadeddata = () => {
      video.currentTime = 0.5; // grab frame at 0.5s
    };

    video.onseeked = () => {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataURL = canvas.toDataURL('image/jpeg', 0.8);
      URL.revokeObjectURL(fileURL);
      resolve(dataURL);
    };

    video.onerror = () => {
      reject(new Error("Failed to load video file for frame extraction."));
    };
  });
}

/**
 * Analyze workout form from a video file using Groq's LLaVA vision model.
 */
export async function analyzeFormAI(videoFile, exerciseType) {
  try {
    const base64DataUrl = await extractFirstFrameFromVideo(videoFile);

    const prompt = `
You are an expert biomechanics analyst and elite powerlifting coach.
Analyze this video frame of a user performing a ${exerciseType}.
Provide a JSON object with your analysis.

It MUST exactly match this structure:
{
  "score": 85,
  "details": [
    { "name": "Squat Depth", "status": "optimal", "desc": "Great depth achieved." },
    { "name": "Knee Tracking", "status": "warning", "desc": "Slight knee cave." }
  ],
  "tips": [
    "Push knees out.",
    "Keep chest up."
  ]
}

"score" should be 0-100.
"status" can only be "optimal", "warning", or "danger".
Only return valid JSON without markdown.
`;

    // Send the vision payload to Groq
    const payload = {
      model: "llama-3.2-11b-vision-preview",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: prompt },
            { type: "image_url", image_url: { url: base64DataUrl } }
          ]
        }
      ],
      temperature: 0.2,
      response_format: { type: "json_object" }
    };

    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`Groq Vision API Error: ${response.status} - ${err}`);
    }

    const data = await response.json();
    const resultText = data.choices[0].message.content;
    
    return JSON.parse(resultText);
  } catch (error) {
    console.error("Error analyzing form via Groq:", error);
    throw error;
  }
}
