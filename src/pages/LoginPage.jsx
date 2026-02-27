import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { RiMailLine, RiLockLine, RiEyeLine, RiEyeOffLine, RiMusicLine, RiSunLine, RiMoonLine } from 'react-icons/ri';
import { useUserStore } from '../stores/userStore';
import { useUIStore } from '../stores/uiStore';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, isLoading, error } = useUserStore();
  const { theme, toggleTheme } = useUIStore();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const success = await login(formData.email, formData.password);
      if (success) navigate('/home');
    } catch {}
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-dhwani-bg flex items-center justify-center p-4 transition-colors">
      {/* Theme toggle */}
      <button
        onClick={toggleTheme}
        className="fixed top-5 right-5 w-9 h-9 rounded-full flex items-center justify-center text-dhwani-text-secondary hover:text-dhwani-text hover:bg-dhwani-surface-light transition-all z-50"
      >
        {theme === 'dark' ? <RiSunLine className="text-lg" /> : <RiMoonLine className="text-lg" />}
      </button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#1db954] flex items-center justify-center">
              <RiMusicLine className="text-xl text-black" />
            </div>
          </Link>
          <h1 className="text-2xl font-bold text-dhwani-text mb-1">Welcome back</h1>
          <p className="text-sm text-dhwani-muted">
            New here?{' '}
            <Link to="/register" className="text-[#1db954] font-semibold hover:underline">
              Create an account
            </Link>
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 mb-5">
            <p className="text-red-400 text-sm text-center">{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-dhwani-text-secondary mb-1.5 uppercase tracking-wide">Email</label>
            <div className="relative">
              <RiMailLine className="absolute left-3 top-1/2 -translate-y-1/2 text-dhwani-muted text-base" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                className="w-full pl-10 pr-4 py-2.5 bg-dhwani-surface-light border border-dhwani-border rounded-lg text-sm text-dhwani-text placeholder:text-dhwani-muted focus:border-[#1db954] focus:ring-2 focus:ring-[#1db954]/20 outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-dhwani-text-secondary uppercase tracking-wide">Password</label>
            </div>
            <div className="relative">
              <RiLockLine className="absolute left-3 top-1/2 -translate-y-1/2 text-dhwani-muted text-base" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                className="w-full pl-10 pr-10 py-2.5 bg-dhwani-surface-light border border-dhwani-border rounded-lg text-sm text-dhwani-text placeholder:text-dhwani-muted focus:border-[#1db954] focus:ring-2 focus:ring-[#1db954]/20 outline-none transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-dhwani-muted hover:text-dhwani-text transition-colors"
              >
                {showPassword ? <RiEyeOffLine /> : <RiEyeLine />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 bg-[#1db954] hover:bg-[#1ed760] text-black font-bold rounded-full text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Signing in...
              </span>
            ) : (
              'Sign in'
            )}
          </button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="flex-1 h-px bg-dhwani-border" />
          <span className="text-xs text-dhwani-muted">or</span>
          <div className="flex-1 h-px bg-dhwani-border" />
        </div>

        <button className="w-full py-2.5 border border-dhwani-border rounded-full text-sm font-semibold text-dhwani-text hover:bg-dhwani-surface-light transition-colors">
          Continue with Google
        </button>

        <p className="mt-6 text-center text-xs text-dhwani-muted">
          By continuing, you agree to our{' '}
          <span className="text-dhwani-text-secondary hover:underline cursor-pointer">Terms</span> and{' '}
          <span className="text-dhwani-text-secondary hover:underline cursor-pointer">Privacy Policy</span>
        </p>
      </motion.div>
    </div>
  );
}
