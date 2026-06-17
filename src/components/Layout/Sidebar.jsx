import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import {
  LayoutDashboard, Dumbbell, Calendar, BookOpen, TrendingUp,
  UtensilsCrossed, Bot, User, LogOut, Zap, X, Sparkles, Activity, Trophy, Settings
} from 'lucide-react';

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/generator', icon: Zap, label: 'AI Generator' },
  { to: '/workout/active', icon: Dumbbell, label: 'Active Workout' },
  { to: '/schedule', icon: Calendar, label: 'Schedule' },
  { to: '/exercises', icon: BookOpen, label: 'Exercises' },
  
  { to: '/analytics', icon: TrendingUp, label: 'Analytics' },
  { to: '/nutrition', icon: UtensilsCrossed, label: 'Nutrition' },
  { to: '/progress', icon: Activity, label: 'Progress' },
  { to: '/achievements', icon: Trophy, label: 'Achievements' },
  { to: '/coach', icon: Bot, label: 'AI Coach' },
  
  { to: '/profile', icon: User, label: 'My Profile' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

export default function Sidebar({ isOpen, onClose }) {
  const { currentUser, logout } = useAuth();
  const { profile } = useData();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();
      navigate('/login');
    } catch (err) {
      console.error('Logout error:', err);
    }
  }

  const initials = currentUser?.displayName
    ? currentUser.displayName.split(' ').map(n => n[0]).join('').toUpperCase()
    : 'U';

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose} />}
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <div className="sidebar-logo-icon">
              <Dumbbell size={22} />
            </div>
            <div>
              <div className="sidebar-logo-text">FitForge</div>
              <div className="sidebar-logo-sub">AI Workout Planner</div>
            </div>
          </div>
          <button className="sidebar-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <nav className="sidebar-nav">
          <span className="sidebar-section-label">Main Menu</span>
          {navItems.slice(0, 5).map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
              onClick={onClose}
            >
              <item.icon size={20} className="nav-item-icon" />
              {item.label}
            </NavLink>
          ))}

          <span className="sidebar-section-label">Insights & Progress</span>
          {navItems.slice(5, 10).map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
              onClick={onClose}
            >
              <item.icon size={20} className="nav-item-icon" />
              {item.label}
            </NavLink>
          ))}

          <span className="sidebar-section-label">Account</span>
          {navItems.slice(10).map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
              onClick={onClose}
            >
              <item.icon size={20} className="nav-item-icon" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-user">
            <div className="sidebar-user-avatar">{initials}</div>
            <div className="sidebar-user-info">
              <div className="sidebar-user-name">{currentUser?.displayName || 'User'}</div>
              <div className="sidebar-user-email">
                {currentUser?.email || ''} 
                {profile && <span style={{ marginLeft: 6, color: 'var(--brand-primary)', fontWeight: 600 }}>• Lvl {profile.level}</span>}
              </div>
            </div>
            <button onClick={handleLogout} className="btn btn-ghost btn-icon" title="Log out">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </aside>
      <style>{`
        .sidebar-overlay {
          display: none;
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.5);
          z-index: 199;
        }
        .sidebar-close-btn {
          display: none;
          border: none;
          background: var(--bg-tertiary);
          color: var(--text-secondary);
          width: 32px;
          height: 32px;
          border-radius: var(--radius-md);
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        @media (max-width: 768px) {
          .sidebar-overlay { display: block; }
          .sidebar-close-btn { display: flex; }
          .sidebar-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
        }
      `}</style>
    </>
  );
}
