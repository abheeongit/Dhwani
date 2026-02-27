import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { RiUserLine, RiMailLine, RiLockLine, RiEyeLine, RiEyeOffLine, RiMusicLine, RiCheckLine } from 'react-icons/ri';
import { useUserStore } from '../stores/userStore';

const plans = [
  {
    id: 'FREE',
    name: 'Free',
    price: '₹0',
    period: 'forever',
    features: ['Basic audio quality', 'Limited skips', 'Ads supported', 'Mobile only'],
    recommended: false,
  },
  {
    id: 'PREMIUM',
    name: 'Premium',
    price: '₹119',
    period: '/month',
    features: ['Ultra HD audio', 'Unlimited skips', 'No ads', 'All devices', 'Offline mode', 'Exclusive content'],
    recommended: true,
  },
];

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register, isLoading, error } = useUserStore();
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
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setValidationError('');
  };

  const validateStep1 = () => {
    if (!formData.name.trim()) {
      setValidationError('Please enter your name');
      return false;
    }
    if (!formData.email.trim()) {
      setValidationError('Please enter your email');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setValidationError('Please enter a valid email');
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (formData.password.length < 6) {
      setValidationError('Password must be at least 6 characters');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setValidationError('Passwords do not match');
      return false;
    }
    if (!formData.agreeTerms) {
      setValidationError('Please agree to the terms and conditions');
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep2()) return;

    const success = await register({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      plan: formData.plan,
    });
    
    if (success) {
      navigate('/home');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-dhwani-bg">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-lg"
        >
          {/* Logo */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-dhwani-accent to-dhwani-accent2 rounded-xl flex items-center justify-center">
                <RiMusicLine className="text-2xl text-white" />
              </div>
              <span className="text-2xl font-bold gradient-text">Dhwani</span>
            </Link>
            <h2 className="text-2xl font-bold mb-2">Create your account</h2>
            <p className="text-dhwani-muted">
              Already have an account?{' '}
              <Link to="/login" className="text-dhwani-accent hover:underline">
                Sign in
              </Link>
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {[1, 2].map((s) => (
              <div
                key={s}
                className={`flex items-center ${s < 2 ? 'flex-1' : ''}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                    step >= s
                      ? 'bg-dhwani-accent text-white'
                      : 'bg-dhwani-surface-light text-dhwani-muted'
                  }`}
                >
                  {step > s ? <RiCheckLine /> : s}
                </div>
                {s < 2 && (
                  <div
                    className={`flex-1 h-1 mx-2 rounded transition-colors ${
                      step > s ? 'bg-dhwani-accent' : 'bg-dhwani-surface-light'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {(error || validationError) && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-6"
            >
              <p className="text-red-400 text-sm text-center">{error || validationError}</p>
            </motion.div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Step 1 - Basic Info */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                {/* Name */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Full name</label>
                  <div className="relative">
                    <RiUserLine className="absolute left-4 top-1/2 -translate-y-1/2 text-dhwani-muted" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="w-full pl-11 pr-4 py-3 bg-dhwani-surface border border-dhwani-surface-light rounded-xl focus:border-dhwani-accent focus:ring-2 focus:ring-dhwani-accent/20 outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email address</label>
                  <div className="relative">
                    <RiMailLine className="absolute left-4 top-1/2 -translate-y-1/2 text-dhwani-muted" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@example.com"
                      className="w-full pl-11 pr-4 py-3 bg-dhwani-surface border border-dhwani-surface-light rounded-xl focus:border-dhwani-accent focus:ring-2 focus:ring-dhwani-accent/20 outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Plan Selection */}
                <div className="space-y-3">
                  <label className="text-sm font-medium">Choose your plan</label>
                  <div className="grid grid-cols-2 gap-4">
                    {plans.map((plan) => (
                      <motion.button
                        key={plan.id}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, plan: plan.id }))}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`relative p-4 rounded-xl border-2 text-left transition-all ${
                          formData.plan === plan.id
                            ? 'border-dhwani-accent bg-dhwani-accent/10'
                            : 'border-dhwani-surface-light hover:border-dhwani-muted'
                        }`}
                      >
                        {plan.recommended && (
                          <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-dhwani-accent text-white text-xs font-semibold rounded-full">
                            Best
                          </span>
                        )}
                        <p className="font-semibold">{plan.name}</p>
                        <p className="text-dhwani-accent font-bold">
                          {plan.price}
                          <span className="text-sm text-dhwani-muted font-normal">{plan.period}</span>
                        </p>
                      </motion.button>
                    ))}
                  </div>
                </div>

                <motion.button
                  type="button"
                  onClick={handleNext}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 bg-gradient-to-r from-dhwani-accent to-dhwani-accent2 rounded-xl font-semibold text-white shadow-lg shadow-dhwani-accent/30"
                >
                  Continue
                </motion.button>
              </motion.div>
            )}

            {/* Step 2 - Password & Terms */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                {/* Password */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Create password</label>
                  <div className="relative">
                    <RiLockLine className="absolute left-4 top-1/2 -translate-y-1/2 text-dhwani-muted" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Create a secure password"
                      className="w-full pl-11 pr-12 py-3 bg-dhwani-surface border border-dhwani-surface-light rounded-xl focus:border-dhwani-accent focus:ring-2 focus:ring-dhwani-accent/20 outline-none transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-dhwani-muted hover:text-dhwani-text transition-colors"
                    >
                      {showPassword ? <RiEyeOffLine /> : <RiEyeLine />}
                    </button>
                  </div>
                  <p className="text-xs text-dhwani-muted">Must be at least 6 characters</p>
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Confirm password</label>
                  <div className="relative">
                    <RiLockLine className="absolute left-4 top-1/2 -translate-y-1/2 text-dhwani-muted" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm your password"
                      className="w-full pl-11 pr-4 py-3 bg-dhwani-surface border border-dhwani-surface-light rounded-xl focus:border-dhwani-accent focus:ring-2 focus:ring-dhwani-accent/20 outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Terms */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    id="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    className="w-4 h-4 mt-1 rounded border-dhwani-surface-light bg-dhwani-surface text-dhwani-accent focus:ring-dhwani-accent focus:ring-offset-0"
                  />
                  <label htmlFor="agreeTerms" className="text-sm text-dhwani-text-secondary">
                    I agree to the{' '}
                    <Link to="/terms" className="text-dhwani-accent hover:underline">Terms of Service</Link>
                    {' '}and{' '}
                    <Link to="/privacy" className="text-dhwani-accent hover:underline">Privacy Policy</Link>
                  </label>
                </div>

                <div className="flex gap-4">
                  <motion.button
                    type="button"
                    onClick={() => setStep(1)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 py-3 border border-dhwani-surface-light rounded-xl font-semibold hover:bg-dhwani-surface-light transition-colors"
                  >
                    Back
                  </motion.button>
                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 py-3 bg-gradient-to-r from-dhwani-accent to-dhwani-accent2 rounded-xl font-semibold text-white shadow-lg shadow-dhwani-accent/30 disabled:opacity-50"
                  >
                    {isLoading ? 'Creating...' : 'Create Account'}
                  </motion.button>
                </div>
              </motion.div>
            )}
          </form>
        </motion.div>
      </div>

      {/* Right Side - Features */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-dhwani-accent2 via-dhwani-accent3 to-dhwani-accent4 p-12 items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.1),transparent_70%)]" />
        <div className="relative z-10 max-w-md">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold text-white mb-8"
          >
            Start your musical journey
          </motion.h2>
          <div className="space-y-6">
            {[
              { title: 'Millions of songs', desc: 'Access our entire library of tracks' },
              { title: 'Personalized playlists', desc: 'AI-powered recommendations just for you' },
              { title: 'High quality audio', desc: 'Crystal clear sound up to 320kbps' },
              { title: 'Offline listening', desc: 'Download and listen anywhere' },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <RiCheckLine className="text-white text-lg" />
                </div>
                <div>
                  <p className="font-semibold text-white">{feature.title}</p>
                  <p className="text-white/70 text-sm">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
