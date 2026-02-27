import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  RiHomeFill,
  RiSearchLine,
  RiPlayListFill,
  RiMusic2Fill,
  RiUserHeartLine,
  RiBarChartFill,
  RiSettings4Line,
  RiUserLine,
  RiLogoutBoxLine,
  RiAddLine,
  RiHeadphoneLine,
} from 'react-icons/ri';
import { useUserStore } from '../stores/userStore';

const navItems = [
  { path: '/home', icon: RiHomeFill, label: 'Home' },
  { path: '/search', icon: RiSearchLine, label: 'Search' },
  { path: '/library', icon: RiPlayListFill, label: 'Library' },
];

const discoverItems = [
  { path: '/mood', icon: RiHeadphoneLine, label: 'Mood Mix' },
  { path: '/artists', icon: RiMusic2Fill, label: 'Artists' },
  { path: '/friends', icon: RiUserHeartLine, label: 'Friends' },
];

const userItems = [
  { path: '/analytics', icon: RiBarChartFill, label: 'Stats' },
  { path: '/settings', icon: RiSettings4Line, label: 'Settings' },
];

export default function Sidebar() {
  const { user, logout } = useUserStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <aside className="sidebar flex flex-col h-screen">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-8 px-2">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-dhwani-accent to-dhwani-accent2 flex items-center justify-center">
          <RiMusic2Fill className="text-white text-xl" />
        </div>
        <span className="text-xl font-bold gradient-text">Dhwani</span>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 space-y-1">
        <div className="mb-6">
          <p className="text-xs font-semibold text-dhwani-muted uppercase tracking-wider mb-3 px-3">
            Menu
          </p>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active' : ''}`
              }
            >
              <item.icon className="text-lg" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>

        <div className="mb-6">
          <p className="text-xs font-semibold text-dhwani-muted uppercase tracking-wider mb-3 px-3">
            Discover
          </p>
          {discoverItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active' : ''}`
              }
            >
              <item.icon className="text-lg" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>

        {/* Playlists Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3 px-3">
            <p className="text-xs font-semibold text-dhwani-muted uppercase tracking-wider">
              Playlists
            </p>
            <button className="w-6 h-6 rounded-full bg-dhwani-surface-light flex items-center justify-center hover:bg-dhwani-accent transition-colors">
              <RiAddLine className="text-sm" />
            </button>
          </div>
          <div className="space-y-1 max-h-32 overflow-y-auto">
            <NavLink to="/library" className="nav-link text-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-dhwani-accent3" />
              <span>Liked Songs</span>
            </NavLink>
            <NavLink to="/library" className="nav-link text-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-dhwani-accent2" />
              <span>Party Mix</span>
            </NavLink>
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold text-dhwani-muted uppercase tracking-wider mb-3 px-3">
            Account
          </p>
          {userItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active' : ''}`
              }
            >
              <item.icon className="text-lg" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>

      {/* User Profile */}
      {user ? (
        <div className="mt-auto pt-4 border-t border-dhwani-border">
          <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-dhwani-surface-light transition-colors cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-dhwani-accent to-dhwani-accent3 flex items-center justify-center overflow-hidden">
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <RiUserLine className="text-white" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">{user.name}</p>
              <p className="text-xs text-dhwani-muted">{user.plan === 'PREMIUM' ? 'Premium' : 'Free'}</p>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 rounded-lg hover:bg-dhwani-surface-elevated transition-colors text-dhwani-muted hover:text-dhwani-error"
            >
              <RiLogoutBoxLine />
            </button>
          </div>
        </div>
      ) : (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/login')}
          className="btn-primary w-full mt-4"
        >
          Sign In
        </motion.button>
      )}
    </aside>
  );
}
