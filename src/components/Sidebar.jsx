import { NavLink, useNavigate } from 'react-router-dom';
import {
  RiHomeFill,
  RiHomeLine,
  RiSearchLine,
  RiPlayListFill,
  RiPlayListLine,
  RiMusic2Fill,
  RiHeadphoneLine,
  RiUserHeartLine,
  RiBarChartLine,
  RiSettings4Line,
  RiUserLine,
  RiLogoutBoxLine,
  RiAddLine,
  RiSunLine,
  RiMoonLine,
} from 'react-icons/ri';
import { useUserStore } from '../stores/userStore';
import { useUIStore } from '../stores/uiStore';

const mainNav = [
  { path: '/home', icon: RiHomeLine, activeIcon: RiHomeFill, label: 'Home' },
  { path: '/search', icon: RiSearchLine, activeIcon: RiSearchLine, label: 'Search' },
  { path: '/library', icon: RiPlayListLine, activeIcon: RiPlayListFill, label: 'Your Library' },
];

const discoverNav = [
  { path: '/mood', icon: RiHeadphoneLine, label: 'Mood Mix' },
  { path: '/friends', icon: RiUserHeartLine, label: 'Friends' },
];

const accountNav = [
  { path: '/analytics', icon: RiBarChartLine, label: 'Stats' },
  { path: '/settings', icon: RiSettings4Line, label: 'Settings' },
];

export default function Sidebar() {
  const { user, logout } = useUserStore();
  const { theme, toggleTheme } = useUIStore();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <aside className="sidebar">
      {/* Logo + Theme toggle */}
      <div className="flex items-center justify-between mb-5 px-1">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-[#1db954] flex items-center justify-center flex-shrink-0">
            <RiMusic2Fill className="text-black text-sm" />
          </div>
          <span className="text-base font-bold text-dhwani-text">Dhwani</span>
        </div>
        <button
          onClick={toggleTheme}
          className="w-7 h-7 rounded-md flex items-center justify-center text-dhwani-muted hover:text-dhwani-text hover:bg-dhwani-surface-light transition-all"
          title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
        >
          {theme === 'dark' ? <RiSunLine className="text-sm" /> : <RiMoonLine className="text-sm" />}
        </button>
      </div>

      {/* Main Nav */}
      <nav className="flex-1 space-y-0.5">
        <div className="mb-4">
          {mainNav.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              {({ isActive }) => (
                <>
                  {isActive ? <item.activeIcon className="text-lg" /> : <item.icon className="text-lg" />}
                  <span>{item.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* Discover */}
        <div className="mb-4 p-3 bg-dhwani-surface-light rounded-lg">
          <p className="text-[10px] font-bold text-dhwani-muted uppercase tracking-wider mb-2 px-1">Discover</p>
          {discoverNav.map((item) => (
            <NavLink key={item.path} to={item.path} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <item.icon className="text-lg" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>

        {/* Playlists */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1 px-1">
            <p className="text-[10px] font-bold text-dhwani-muted uppercase tracking-wider">Playlists</p>
            <button className="w-5 h-5 rounded bg-dhwani-surface-light hover:bg-dhwani-surface-elevated flex items-center justify-center transition-colors">
              <RiAddLine className="text-xs" />
            </button>
          </div>
          <div className="space-y-0.5 max-h-32 overflow-y-auto scrollbar-hide">
            {['Liked Songs', 'Chill Vibes', 'Workout Mix'].map((name, i) => (
              <NavLink key={name} to="/library" className="nav-link text-xs py-1.5">
                <span className={`w-1.5 h-1.5 rounded-sm flex-shrink-0 ${
                  i === 0 ? 'bg-gradient-to-br from-purple-500 to-blue-500'
                  : i === 1 ? 'bg-gradient-to-br from-green-500 to-emerald-500'
                  : 'bg-gradient-to-br from-orange-500 to-red-500'
                }`} />
                <span className="truncate">{name}</span>
              </NavLink>
            ))}
          </div>
        </div>

        {/* Account */}
        <div>
          <p className="text-[10px] font-bold text-dhwani-muted uppercase tracking-wider mb-1 px-1">Account</p>
          {accountNav.map((item) => (
            <NavLink key={item.path} to={item.path} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <item.icon className="text-lg" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>

      {/* User */}
      {user ? (
        <div className="mt-auto pt-3 border-t border-dhwani-border">
          <div className="flex items-center gap-2 p-1.5 rounded-lg">
            <div className="w-7 h-7 rounded-full bg-dhwani-surface-elevated flex items-center justify-center flex-shrink-0 overflow-hidden">
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <RiUserLine className="text-xs text-dhwani-muted" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-xs truncate text-dhwani-text">{user.name}</p>
              <p className="text-[10px] text-dhwani-muted">{user.plan === 'PREMIUM' ? 'Premium' : 'Free'}</p>
            </div>
            <button onClick={handleLogout} className="p-1 rounded hover:bg-dhwani-surface-light text-dhwani-muted hover:text-red-400 transition-colors" title="Logout">
              <RiLogoutBoxLine className="text-sm" />
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-auto pt-3">
          <button onClick={() => navigate('/login')} className="w-full py-2 bg-[#1db954] hover:bg-[#1ed760] text-black font-bold rounded-full text-xs transition-all">
            Sign In
          </button>
        </div>
      )}
    </aside>
  );
}
