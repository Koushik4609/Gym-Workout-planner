import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import WorkoutTimer from '../WorkoutTimer';

const pageTitles = {
  '/dashboard': 'Dashboard',
  '/generator': 'AI Workout Generator',
  '/workout/active': 'Active Workout Session',
  '/schedule': 'Weekly Schedule',
  '/exercises': 'Exercise Library',
  '/analytics': 'Analytics Dashboard',
  '/form-analysis': 'AI Form Analysis',
  '/nutrition': 'Nutrition Plan',
  '/coach': 'AI Coach Pro',
  '/profile': 'My Profile'
};

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const title = pageTitles[location.pathname] || 'FitForge AI';

  return (
    <div className="app-layout">
      {/* Premium Background Orbs */}
      <div className="animated-bg-orbs">
        <div className="animated-bg-orb-1" />
        <div className="animated-bg-orb-2" />
      </div>
      
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="main-content">
        <TopBar title={title} onMenuToggle={() => setSidebarOpen(prev => !prev)} />
        <main className="page-content">
          <Outlet />
        </main>
      </div>
      <WorkoutTimer />
    </div>
  );
}
