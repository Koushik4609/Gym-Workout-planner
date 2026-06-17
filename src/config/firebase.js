import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAI, getGenerativeModel, GoogleAIBackend } from 'firebase/ai';

const firebaseConfig = {
  apiKey: "AIzaSyAcY7T0q1D4WduBF5B0xvXCIEZqmv-iHdM",
  authDomain: "gym-planner-71449.firebaseapp.com",
  projectId: "gym-planner-71449",
  storageBucket: "gym-planner-71449.firebasestorage.app",
  messagingSenderId: "1032778462091",
  appId: "1:1032778462091:web:80219b712e00e7f855f58e",
  measurementId: "G-89NW9J1Q5E"
};

const app = initializeApp(firebaseConfig);
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
export const auth = getAuth(app);
export const db = getFirestore(app);

// Initialize AI Logic (Gemini Developer API)
export const ai = getAI(app, { backend: new GoogleAIBackend() });

export default app;
