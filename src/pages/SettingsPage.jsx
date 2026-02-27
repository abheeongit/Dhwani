import { useState } from 'react'
import { motion } from 'framer-motion'
import { useUserStore } from '@/store'
import { mockUser } from '@/utils/mockData'

export default function SettingsPage() {
  const user = useUserStore((s) => s.user) ?? mockUser
  const logout = useUserStore((s) => s.logout)
  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const inputClass =
    'w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.06] text-white text-sm placeholder-dhwani-muted focus:outline-none focus:border-dhwani-accent/40 transition-colors'

  return (
    <div className="space-y-10 max-w-2xl">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-dhwani-muted">Manage your account and preferences.</p>
      </motion.div>

      {/* Profile */}
      <section className="rounded-2xl bg-white/[0.02] border border-white/[0.04] p-6 space-y-6">
        <h2 className="text-lg font-bold">Profile</h2>
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-full gradient-accent shadow-lg" />
          <button className="px-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm text-dhwani-muted hover:text-white transition-colors">
            Change photo
          </button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-xs text-dhwani-muted uppercase tracking-wider mb-1.5 block">Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className="text-xs text-dhwani-muted uppercase tracking-wider mb-1.5 block">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} />
          </div>
        </div>
        <button onClick={handleSave} className="px-6 py-2.5 rounded-xl gradient-accent text-white font-semibold hover-lift text-sm">
          {saved ? 'Saved ✓' : 'Save changes'}
        </button>
      </section>

      {/* Change password */}
      <section className="rounded-2xl bg-white/[0.02] border border-white/[0.04] p-6 space-y-4">
        <h2 className="text-lg font-bold">Change Password</h2>
        <div>
          <label className="text-xs text-dhwani-muted uppercase tracking-wider mb-1.5 block">Current Password</label>
          <input type="password" className={inputClass} placeholder="••••••••" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-xs text-dhwani-muted uppercase tracking-wider mb-1.5 block">New Password</label>
            <input type="password" className={inputClass} placeholder="••••••••" />
          </div>
          <div>
            <label className="text-xs text-dhwani-muted uppercase tracking-wider mb-1.5 block">Confirm New</label>
            <input type="password" className={inputClass} placeholder="••••••••" />
          </div>
        </div>
        <button className="px-6 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm text-white hover:bg-white/[0.06] transition-colors">
          Update password
        </button>
      </section>

      {/* Preferences */}
      <section className="rounded-2xl bg-white/[0.02] border border-white/[0.04] p-6 space-y-4">
        <h2 className="text-lg font-bold">Preferences</h2>
        <ToggleRow label="Dark theme" defaultOn />
        <ToggleRow label="Show listening activity" defaultOn />
        <ToggleRow label="Enable notifications" />
      </section>

      {/* Danger zone */}
      <section className="rounded-2xl border border-red-500/10 p-6">
        <h2 className="text-lg font-bold text-red-400 mb-3">Danger Zone</h2>
        <button
          onClick={() => { logout(); window.location.href = '/' }}
          className="px-6 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium hover:bg-red-500/20 transition-colors"
        >
          Log out
        </button>
      </section>
    </div>
  )
}

function ToggleRow({ label, defaultOn = false }) {
  const [on, setOn] = useState(defaultOn)
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm">{label}</span>
      <button
        onClick={() => setOn(!on)}
        className={`w-11 h-6 rounded-full transition-colors relative ${on ? 'bg-dhwani-accent' : 'bg-white/10'}`}
      >
        <div
          className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${on ? 'translate-x-5.5' : 'translate-x-0.5'}`}
        />
      </button>
    </div>
  )
}
