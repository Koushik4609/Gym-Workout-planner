import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/Layout/Layout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import WorkoutGenerator from './pages/WorkoutGenerator';
import WeeklySchedule from './pages/WeeklySchedule';
import ExerciseLibrary from './pages/ExerciseLibrary';
import Analytics from './pages/Analytics';
import Nutrition from './pages/Nutrition';
import AICoach from './pages/AICoach';
import ActiveWorkout from './pages/ActiveWorkout';
import FormAnalysis from './pages/FormAnalysis';
import Progress from './pages/Progress';
import Achievements from './pages/Achievements';
import Settings from './pages/Settings';

function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" />;
}

function PublicRoute({ children }) {
  const { currentUser } = useAuth();
  return currentUser ? <Navigate to="/dashboard" /> : children;
}

function AppRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Routes */}
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
        <Route path="/forgot-password" element={<PublicRoute><ForgotPassword /></PublicRoute>} />

        {/* Protected Routes */}
        <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="generator" element={<WorkoutGenerator />} />
          <Route path="schedule" element={<WeeklySchedule />} />
          <Route path="exercises" element={<ExerciseLibrary />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="nutrition" element={<Nutrition />} />
          <Route path="coach" element={<AICoach />} />
          <Route path="workout/active" element={<ActiveWorkout />} />
          <Route path="form-analysis" element={<FormAnalysis />} />
          <Route path="progress" element={<Progress />} />
          <Route path="achievements" element={<Achievements />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <DataProvider>
            <AppRoutes />
          </DataProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
