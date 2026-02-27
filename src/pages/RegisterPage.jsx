import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { RiUserLine, RiMailLine, RiLockLine, RiEyeLine, RiEyeOffLine, RiMusicLine, RiCheckLine, RiSunLine, RiMoonLine } from 'react-icons/ri';
import { useUserStore } from '../stores/userStore';
import { useUIStore } from '../stores/uiStore';

const plans = [
  {
    id: 'FREE',
    name: 'Free',
    price: '₹0',
    period: 'forever',
    features: ['Basic audio quality', 'Limited skips', 'Ads supported'],
  },
  {
    id: 'PREMIUM',
    name: 'Premium',
    price: '₹119',
    period: '/month',
    features: ['Ultra HD audio', 'Unlimited skips', 'No ads', 'Offline mode'],
    recommended: true,
  },
];

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register, isLoading, error } = useUserStore();
  const { theme, toggleTheme } = useUIStore();
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    plan: 'FREE',
    agreeTerms: false,
  });
  const [validationError, setValidationError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    setValidationError('');
  };

  const validateStep1 = () => {
    if (!formData.name.trim()) return setValidationError('Enter your name') || false;
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
      return setValidationError('Enter a valid email') || false;
    return true;
  };

  const validateStep2 = () => {
    if (formData.password.length < 6) return setValidationError('Min 6 characters') || false;
    if (formData.password !== formData.confirmPassword) return setValidationError('Passwords don\'t match') || false;
    if (!formData.agreeTerms) return setValidationError('Accept terms to continue') || false;
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep2()) return;
    try {
      const success = await register(formData.name, formData.email, formData.password);
      if (success) navigate('/home');
    } catch (err) {
      setValidationError(err.message || 'Registration failed');
    }
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
          <h1 className="text-2xl font-bold text-dhwani-text mb-1">Create your account</h1>
          <p className="text-sm text-dhwani-muted">
            Already have one?{' '}
            <Link to="/login" className="text-[#1db954] font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-6">
          {[1, 2].map((s) => (
            <div key={s} className="flex items-center flex-1">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                step >= s ? 'bg-[#1db954] text-black' : 'bg-dhwani-surface-elevated text-dhwani-muted'
              }`}>
                {step > s ? <RiCheckLine /> : s}
              </div>
              {s < 2 && (
                <div className={`flex-1 h-0.5 mx-2 rounded transition-colors ${
                  step > s ? 'bg-[#1db954]' : 'bg-dhwani-surface-elevated'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Error */}
        {(error || validationError) && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 mb-5">
            <p className="text-red-400 text-sm text-center">{error || validationError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {step === 1 && (
            <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-xs font-semibold text-dhwani-text-secondary mb-1.5 uppercase tracking-wide">Name</label>
                <div className="relative">
                  <RiUserLine className="absolute left-3 top-1/2 -translate-y-1/2 text-dhwani-muted" />
                  <input
                    type="text" name="name" value={formData.name} onChange={handleChange}
                    placeholder="Your full name"
                    className="w-full pl-10 pr-4 py-2.5 bg-dhwani-surface-light border border-dhwani-border rounded-lg text-sm text-dhwani-text placeholder:text-dhwani-muted focus:border-[#1db954] focus:ring-2 focus:ring-[#1db954]/20 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-dhwani-text-secondary mb-1.5 uppercase tracking-wide">Email</label>
                <div className="relative">
                  <RiMailLine className="absolute left-3 top-1/2 -translate-y-1/2 text-dhwani-muted" />
                  <input
                    type="email" name="email" value={formData.email} onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-dhwani-surface-light border border-dhwani-border rounded-lg text-sm text-dhwani-text placeholder:text-dhwani-muted focus:border-[#1db954] focus:ring-2 focus:ring-[#1db954]/20 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Plan */}
              <div>
                <label className="block text-xs font-semibold text-dhwani-text-secondary mb-2 uppercase tracking-wide">Plan</label>
                <div className="grid grid-cols-2 gap-3">
                  {plans.map((plan) => (
                    <button
                      key={plan.id}
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, plan: plan.id }))}
                      className={`relative p-3 rounded-lg border-2 text-left transition-all ${
                        formData.plan === plan.id
                          ? 'border-[#1db954] bg-[#1db954]/8'
                          : 'border-dhwani-border hover:border-dhwani-muted'
                      }`}
                    >
                      {plan.recommended && (
                        <span className="absolute -top-2 right-2 px-1.5 py-0.5 bg-[#1db954] text-black text-[10px] font-bold rounded">
                          BEST
                        </span>
                      )}
                      <p className="font-bold text-sm text-dhwani-text">{plan.name}</p>
                      <p className="text-[#1db954] font-bold text-sm">
                        {plan.price}
                        <span className="text-dhwani-muted font-normal text-xs"> {plan.period}</span>
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => validateStep1() && setStep(2)}
                className="w-full py-2.5 bg-[#1db954] hover:bg-[#1ed760] text-black font-bold rounded-full text-sm transition-all mt-2"
              >
                Continue
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
              {/* Password */}
              <div>
                <label className="block text-xs font-semibold text-dhwani-text-secondary mb-1.5 uppercase tracking-wide">Password</label>
                <div className="relative">
                  <RiLockLine className="absolute left-3 top-1/2 -translate-y-1/2 text-dhwani-muted" />
                  <input
                    type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleChange}
                    placeholder="Min 6 characters"
                    className="w-full pl-10 pr-10 py-2.5 bg-dhwani-surface-light border border-dhwani-border rounded-lg text-sm text-dhwani-text placeholder:text-dhwani-muted focus:border-[#1db954] focus:ring-2 focus:ring-[#1db954]/20 outline-none transition-all"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-dhwani-muted hover:text-dhwani-text">
                    {showPassword ? <RiEyeOffLine /> : <RiEyeLine />}
                  </button>
                </div>
              </div>

              {/* Confirm */}
              <div>
                <label className="block text-xs font-semibold text-dhwani-text-secondary mb-1.5 uppercase tracking-wide">Confirm password</label>
                <div className="relative">
                  <RiLockLine className="absolute left-3 top-1/2 -translate-y-1/2 text-dhwani-muted" />
                  <input
                    type={showPassword ? 'text' : 'password'} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange}
                    placeholder="Re-enter password"
                    className="w-full pl-10 pr-4 py-2.5 bg-dhwani-surface-light border border-dhwani-border rounded-lg text-sm text-dhwani-text placeholder:text-dhwani-muted focus:border-[#1db954] focus:ring-2 focus:ring-[#1db954]/20 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Terms */}
              <label className="flex items-start gap-2 cursor-pointer">
                <input type="checkbox" name="agreeTerms" checked={formData.agreeTerms} onChange={handleChange}
                  className="mt-0.5 w-4 h-4 rounded border-dhwani-border accent-[#1db954]"
                />
                <span className="text-xs text-dhwani-text-secondary leading-relaxed">
                  I agree to the <span className="text-[#1db954] cursor-pointer">Terms</span> and <span className="text-[#1db954] cursor-pointer">Privacy Policy</span>
                </span>
              </label>

              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 py-2.5 border border-dhwani-border rounded-full text-sm font-semibold text-dhwani-text hover:bg-dhwani-surface-light transition-colors"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 py-2.5 bg-[#1db954] hover:bg-[#1ed760] text-black font-bold rounded-full text-sm transition-all disabled:opacity-50"
                >
                  {isLoading ? 'Creating...' : 'Create Account'}
                </button>
              </div>
            </motion.div>
          )}
        </form>
      </motion.div>
    </div>
  );
}
