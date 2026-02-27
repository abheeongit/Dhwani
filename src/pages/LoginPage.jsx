import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { useUserStore } from '@/store'
import { mockUser } from '@/utils/mockData'

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const setUser = useUserStore((s) => s.setUser)

  const onSubmit = async (data) => {
    setLoading(true)
    setError('')
    // Mock login — replace with authService.login() when backend is ready
    await new Promise((r) => setTimeout(r, 800))
    if (data.email && data.password) {
      setUser(mockUser, 'mock-jwt-token')
      navigate('/home')
    } else {
      setError('Invalid credentials')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-dhwani-bg flex items-center justify-center px-4">
      {/* Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-dhwani-accent/8 blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md rounded-3xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-lg p-8 relative z-10"
      >
        {/* Logo */}
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 rounded-lg gradient-accent flex items-center justify-center text-white font-bold text-sm">D</div>
          <span className="gradient-text text-xl font-bold tracking-wide">Dhwani</span>
        </div>

        <h1 className="text-2xl font-bold text-white mb-1">Welcome back</h1>
        <p className="text-sm text-dhwani-muted mb-8">Sign in to continue listening</p>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <div>
            <label className="text-xs text-dhwani-muted uppercase tracking-wider mb-1.5 block">Email</label>
            <input
              type="email"
              {...register('email', { required: 'Email is required' })}
              className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.06] text-white text-sm placeholder-dhwani-muted focus:outline-none focus:border-dhwani-accent/40 transition-colors"
              placeholder="alex@dhwani.app"
            />
            {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="text-xs text-dhwani-muted uppercase tracking-wider mb-1.5 block">Password</label>
            <input
              type="password"
              {...register('password', { required: 'Password is required' })}
              className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.06] text-white text-sm placeholder-dhwani-muted focus:outline-none focus:border-dhwani-accent/40 transition-colors"
              placeholder="••••••••"
            />
            {errors.password && <p className="text-xs text-red-400 mt-1">{errors.password.message}</p>}
          </div>

          <div className="flex justify-end">
            <button type="button" className="text-xs text-dhwani-accent hover:underline">Forgot password?</button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl gradient-accent text-white font-semibold hover-lift disabled:opacity-60 disabled:pointer-events-none transition-opacity"
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <p className="text-sm text-dhwani-muted text-center mt-8">
          Don't have an account?{' '}
          <Link to="/register" className="text-dhwani-accent hover:underline">Sign up</Link>
        </p>
      </motion.div>
    </div>
  )
}
