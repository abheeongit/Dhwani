import React from 'react'

const navItems = [
  { key: 'home', label: 'Home', icon: HomeIcon },
  { key: 'search', label: 'Search', icon: SearchIcon },
  { key: 'library', label: 'Library', icon: LibraryIcon },
  { key: 'analytics', label: 'Analytics', icon: AnalyticsIcon },
  { key: 'settings', label: 'Settings', icon: SettingsIcon },
]

export default function Sidebar() {
  return (
    <aside className="sidebar" aria-label="Main navigation">
      <div className="sidebar-top">
        <div className="logo">Dhwani</div>
        <nav className="nav">
          {navItems.map((item) => (
            <a key={item.key} href="#" className={`nav-item ${item.key === 'home' ? 'active' : ''}`}>
              <item.icon />
              <span className="label">{item.label}</span>
            </a>
          ))}
        </nav>
      </div>

      <div className="sidebar-bottom">
        <div className="profile">
          <div className="avatar" />
          <div className="profile-info">
            <div className="username">Alex Morgan</div>
            <div className="muted">Premium</div>
          </div>
        </div>
      </div>
    </aside>
  )
}

function IconBase({ children }) {
  return <svg className="icon" viewBox="0 0 24 24" fill="none" dangerouslySetInnerHTML={{ __html: children }} />
}

function HomeIcon() {
  return (
    <IconBase>{`<path stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" d="M3 11.5L12 4l9 7.5v7A1.5 1.5 0 0 1 19.5 20h-15A1.5 1.5 0 0 1 3 18.5v-7z"/>`}</IconBase>
  )
}
function SearchIcon() {
  return (
    <IconBase>{`<path stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35"/><circle cx="11" cy="11" r="6" stroke="currentColor" stroke-width="1.4"/>`}</IconBase>
  )
}
function LibraryIcon() {
  return (
    <IconBase>{`<rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" stroke-width="1.4"/><path d="M7 9h10" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>`}</IconBase>
  )
}
function AnalyticsIcon() {
  return (
    <IconBase>{`<path d="M6 12v6" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M10 8v10" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M14 4v14" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M18 10v8" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>`}</IconBase>
  )
}
function SettingsIcon() {
  return (
    <IconBase>{`<path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" stroke="currentColor" stroke-width="1.2"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06A2 2 0 0 1 2.28 17.4l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82L4.21 3.28A2 2 0 0 1 7 1.45l.06.06a1.65 1.65 0 0 0 1.82.33h.01A1.65 1.65 0 0 0 10.9 1.2V1a2 2 0 1 1 4 0v.2c.28.06.55.18.79.34a1.65 1.65 0 0 0 1.82-.33l.06-.06A2 2 0 0 1 19.4 4.6l-.06.06a1.65 1.65 0 0 0-.33 1.82v.01c.16.24.27.51.33.79H21a2 2 0 1 1 0 4h-.2c-.06.28-.18.55-.34.79z" stroke="currentColor" stroke-width="0" fill="currentColor" opacity="0.6"/>`}</IconBase>
  )
}
