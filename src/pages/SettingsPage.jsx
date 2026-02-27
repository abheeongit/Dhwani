import { useState } from 'react';
import { motion } from 'framer-motion';
import { RiUserLine, RiLockLine, RiNotification3Line, RiMusicLine, RiPaletteLine, RiLogoutBoxLine, RiArrowRightSLine, RiCheckLine, RiMoonLine, RiSunLine, RiSmartphoneLine, RiGlobalLine, RiShieldLine, RiQuestionLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../stores/userStore';
import { useUIStore } from '../stores/uiStore';

const settingsSections = [
  {
    id: 'account',
    title: 'Account',
    icon: RiUserLine,
    settings: [
      { id: 'profile', label: 'Edit Profile', type: 'link' },
      { id: 'email', label: 'Email', value: 'demo@dhwani.app', type: 'display' },
      { id: 'plan', label: 'Subscription', value: 'Free', type: 'upgrade' },
    ],
  },
  {
    id: 'playback',
    title: 'Playback',
    icon: RiMusicLine,
    settings: [
      { id: 'quality', label: 'Audio Quality', value: 'High', type: 'select', options: ['Low', 'Normal', 'High', 'Very High'] },
      { id: 'crossfade', label: 'Crossfade', value: '5s', type: 'select', options: ['Off', '2s', '5s', '8s', '12s'] },
      { id: 'normalize', label: 'Normalize Volume', value: true, type: 'toggle' },
      { id: 'gapless', label: 'Gapless Playback', value: true, type: 'toggle' },
    ],
  },
  {
    id: 'appearance',
    title: 'Appearance',
    icon: RiPaletteLine,
    settings: [
      { id: 'theme', label: 'Theme', value: 'dark', type: 'theme' },
      { id: 'accent', label: 'Accent Color', value: '#1db954', type: 'color' },
    ],
  },
  {
    id: 'notifications',
    title: 'Notifications',
    icon: RiNotification3Line,
    settings: [
      { id: 'push', label: 'Push Notifications', value: true, type: 'toggle' },
      { id: 'email_notifs', label: 'Email Notifications', value: false, type: 'toggle' },
      { id: 'new_music', label: 'New Music from Artists', value: true, type: 'toggle' },
      { id: 'playlist_updates', label: 'Playlist Updates', value: true, type: 'toggle' },
    ],
  },
  {
    id: 'privacy',
    title: 'Privacy & Security',
    icon: RiShieldLine,
    settings: [
      { id: 'private_session', label: 'Private Session', value: false, type: 'toggle', description: 'Your listening activity is hidden' },
      { id: 'show_activity', label: 'Show Listening Activity', value: true, type: 'toggle' },
      { id: 'password', label: 'Change Password', type: 'link' },
      { id: 'sessions', label: 'Manage Sessions', type: 'link' },
    ],
  },
];

const accentColors = [
  { id: 'purple', color: '#9b87f5', name: 'Purple' },
  { id: 'pink', color: '#ec4899', name: 'Pink' },
  { id: 'blue', color: '#3b82f6', name: 'Blue' },
  { id: 'green', color: '#22c55e', name: 'Green' },
  { id: 'orange', color: '#f97316', name: 'Orange' },
  { id: 'red', color: '#ef4444', name: 'Red' },
];

export default function SettingsPage() {
  const navigate = useNavigate();
  const { user, logout } = useUserStore();
  const { theme: currentTheme, setTheme } = useUIStore();
  const [settings, setSettings] = useState({
    quality: 'High',
    crossfade: '5s',
    normalize: true,
    gapless: true,
    theme: currentTheme || 'dark',
    accent: '#1db954',
    push: true,
    email_notifs: false,
    new_music: true,
    playlist_updates: true,
    private_session: false,
    show_activity: true,
  });

  const handleToggle = (id) => {
    setSettings(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSelect = (id, value) => {
    setSettings(prev => ({ ...prev, [id]: value }));
    if (id === 'theme' && (value === 'dark' || value === 'light')) {
      setTheme(value);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="max-w-3xl mx-auto pb-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-dhwani-muted mt-1">Manage your preferences</p>
      </motion.div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {settingsSections.map((section, sectionIndex) => (
          <motion.section
            key={section.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: sectionIndex * 0.05 }}
            className="card overflow-hidden"
          >
            <div className="flex items-center gap-3 p-4 border-b border-dhwani-surface-light">
              <section.icon className="text-xl text-dhwani-accent" />
              <h2 className="font-semibold">{section.title}</h2>
            </div>

            <div className="divide-y divide-dhwani-surface-light">
              {section.settings.map((setting) => (
                <div
                  key={setting.id}
                  className="flex items-center justify-between p-4 hover:bg-dhwani-surface-light/50 transition-colors"
                >
                  <div className="flex-1">
                    <p className="font-medium">{setting.label}</p>
                    {setting.description && (
                      <p className="text-sm text-dhwani-muted">{setting.description}</p>
                    )}
                  </div>

                  {/* Toggle */}
                  {setting.type === 'toggle' && (
                    <button
                      onClick={() => handleToggle(setting.id)}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        settings[setting.id] ? 'bg-dhwani-accent' : 'bg-dhwani-surface-light'
                      }`}
                    >
                      <motion.div
                        animate={{ x: settings[setting.id] ? 24 : 2 }}
                        className="absolute top-1 w-4 h-4 bg-white rounded-full shadow"
                      />
                    </button>
                  )}

                  {/* Select */}
                  {setting.type === 'select' && (
                    <select
                      value={settings[setting.id]}
                      onChange={(e) => handleSelect(setting.id, e.target.value)}
                      className="px-3 py-1.5 bg-dhwani-surface border border-dhwani-surface-light rounded-lg text-sm focus:border-dhwani-accent outline-none"
                    >
                      {setting.options.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  )}

                  {/* Display */}
                  {setting.type === 'display' && (
                    <span className="text-dhwani-muted">{setting.value}</span>
                  )}

                  {/* Upgrade */}
                  {setting.type === 'upgrade' && (
                    <button className="flex items-center gap-2 px-4 py-1.5 bg-[#1db954] rounded-full text-sm font-medium text-black">
                      Upgrade
                      <RiArrowRightSLine />
                    </button>
                  )}

                  {/* Link */}
                  {setting.type === 'link' && (
                    <button className="p-1 text-dhwani-muted hover:text-dhwani-text transition-colors">
                      <RiArrowRightSLine className="text-xl" />
                    </button>
                  )}

                  {/* Theme */}
                  {setting.type === 'theme' && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleSelect('theme', 'light')}
                        className={`p-2 rounded-lg border-2 transition-colors ${
                          settings.theme === 'light'
                            ? 'border-dhwani-accent bg-dhwani-accent/10'
                            : 'border-dhwani-surface-light'
                        }`}
                      >
                        <RiSunLine className="text-lg" />
                      </button>
                      <button
                        onClick={() => handleSelect('theme', 'dark')}
                        className={`p-2 rounded-lg border-2 transition-colors ${
                          settings.theme === 'dark'
                            ? 'border-dhwani-accent bg-dhwani-accent/10'
                            : 'border-dhwani-surface-light'
                        }`}
                      >
                        <RiMoonLine className="text-lg" />
                      </button>
                      <button
                        onClick={() => handleSelect('theme', 'system')}
                        className={`p-2 rounded-lg border-2 transition-colors ${
                          settings.theme === 'system'
                            ? 'border-dhwani-accent bg-dhwani-accent/10'
                            : 'border-dhwani-surface-light'
                        }`}
                      >
                        <RiSmartphoneLine className="text-lg" />
                      </button>
                    </div>
                  )}

                  {/* Color */}
                  {setting.type === 'color' && (
                    <div className="flex gap-2">
                      {accentColors.map((color) => (
                        <button
                          key={color.id}
                          onClick={() => handleSelect('accent', color.color)}
                          className={`w-6 h-6 rounded-full flex items-center justify-center transition-transform ${
                            settings.accent === color.color ? 'scale-110 ring-2 ring-offset-2 ring-offset-dhwani-surface ring-white/50' : ''
                          }`}
                          style={{ backgroundColor: color.color }}
                        >
                          {settings.accent === color.color && (
                            <RiCheckLine className="text-white text-xs" />
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.section>
        ))}

        {/* Help & Support */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card overflow-hidden"
        >
          <div className="flex items-center gap-3 p-4 border-b border-dhwani-surface-light">
            <RiQuestionLine className="text-xl text-dhwani-accent" />
            <h2 className="font-semibold">Help & Support</h2>
          </div>
          <div className="divide-y divide-dhwani-surface-light">
            {['Help Center', 'Contact Support', 'Terms of Service', 'Privacy Policy', 'About Dhwani'].map((item) => (
              <button
                key={item}
                className="w-full flex items-center justify-between p-4 hover:bg-dhwani-surface-light/50 transition-colors"
              >
                <span>{item}</span>
                <RiArrowRightSLine className="text-dhwani-muted" />
              </button>
            ))}
          </div>
        </motion.section>

        {/* Logout */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 font-semibold hover:bg-red-500/20 transition-colors"
        >
          <RiLogoutBoxLine className="text-xl" />
          Sign Out
        </motion.button>

        {/* Version */}
        <p className="text-center text-sm text-dhwani-muted">
          Dhwani v1.0.0 • Made with ❤️ in India
        </p>
      </div>
    </div>
  );
}
