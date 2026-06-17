import {
  doc, setDoc, getDoc, updateDoc, deleteDoc,
  collection, addDoc, getDocs, query, where, orderBy, limit
} from 'firebase/firestore';
import { db } from '../config/firebase';

// ── User Profile ──
export async function saveUserProfile(uid, profileData) {
  await setDoc(doc(db, 'users', uid), {
    ...profileData,
    updatedAt: new Date().toISOString()
  }, { merge: true });
}

export async function getUserProfile(uid) {
  const snap = await getDoc(doc(db, 'users', uid));
  return snap.exists() ? snap.data() : null;
}

// ── Workout History ──
export async function saveWorkout(uid, workoutData) {
  return addDoc(collection(db, 'users', uid, 'workouts'), {
    ...workoutData,
    createdAt: new Date().toISOString()
  });
}

export async function getWorkoutHistory(uid, limitCount = 30) {
  const q = query(
    collection(db, 'users', uid, 'workouts'),
    orderBy('createdAt', 'desc'),
    limit(limitCount)
  );
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

// ── Weekly Schedule ──
export async function saveWeeklySchedule(uid, schedule) {
  await setDoc(doc(db, 'users', uid, 'schedule', 'weekly'), {
    ...schedule,
    updatedAt: new Date().toISOString()
  });
}

export async function getWeeklySchedule(uid) {
  const snap = await getDoc(doc(db, 'users', uid, 'schedule', 'weekly'));
  return snap.exists() ? snap.data() : null;
}

// ── Progress Records ──
export async function saveProgressRecord(uid, record) {
  return addDoc(collection(db, 'users', uid, 'progress'), {
    ...record,
    date: new Date().toISOString()
  });
}

export async function getProgressRecords(uid, limitCount = 90) {
  const q = query(
    collection(db, 'users', uid, 'progress'),
    orderBy('date', 'desc'),
    limit(limitCount)
  );
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

// ── Nutrition Logs ──
export async function saveNutritionLog(uid, logData) {
  return addDoc(collection(db, 'users', uid, 'nutrition'), {
    ...logData,
    date: new Date().toISOString()
  });
}

export async function getNutritionLogs(uid, limitCount = 30) {
  const q = query(
    collection(db, 'users', uid, 'nutrition'),
    orderBy('date', 'desc'),
    limit(limitCount)
  );
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}
