import { Menu, Bell } from 'lucide-react';

export default function TopBar({ title, onMenuToggle }) {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="mobile-menu-toggle" onClick={onMenuToggle}>
          <Menu size={20} />
        </button>
        <h1 className="topbar-title">{title}</h1>
      </div>
      <div className="topbar-right">
        <button className="btn btn-ghost btn-icon" title="Notifications">
          <Bell size={18} />
        </button>
      </div>
    </header>
  );
}
