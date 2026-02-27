import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { HiSparkles, HiMusicalNote, HiChartBar, HiUserGroup } from 'react-icons/hi2'

const features = [
  { icon: HiSparkles, title: 'AI Mood Playlists', desc: 'Generate playlists that match your emotional state using intelligent mood detection.' },
  { icon: HiMusicalNote, title: 'Indie Discovery', desc: 'Explore fresh, independent artists and sounds you won\'t find anywhere else.' },
  { icon: HiChartBar, title: 'Real-Time Analytics', desc: 'Understand your listening habits with beautiful, insightful dashboards.' },
  { icon: HiUserGroup, title: 'Social Listening', desc: 'See what your friends are playing, share playlists, and discover together.' },
]

const testimonials = [
  { name: 'Priya S.', text: 'Dhwani completely changed how I discover music. The AI playlists are uncanny.', role: 'Indie listener' },
  { name: 'Marcus T.', text: 'Finally a platform that treats indie artists with respect and gives real analytics.', role: 'Independent artist' },
  { name: 'Lena K.', text: 'The UI is gorgeous. It feels premium without being cluttered.', role: 'Music enthusiast' },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-dhwani-bg text-dhwani-text overflow-x-hidden">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 backdrop-blur-lg bg-dhwani-bg/60 border-b border-white/[0.04]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg gradient-accent flex items-center justify-center text-white font-bold text-sm">D</div>
          <span className="gradient-text text-xl font-bold tracking-wide">Dhwani</span>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/login" className="text-sm text-dhwani-muted hover:text-white transition-colors">Log in</Link>
          <Link to="/register" className="text-sm px-5 py-2 rounded-full gradient-accent text-white font-medium hover-lift">Sign up free</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center text-center pt-40 pb-28 px-6">
        {/* Glow orbs */}
        <div className="absolute top-20 left-1/4 w-[500px] h-[500px] rounded-full bg-dhwani-accent/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] rounded-full bg-dhwani-accent2/8 blur-[100px] pointer-events-none" />

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl md:text-7xl font-extrabold leading-tight max-w-3xl"
        >
          Feel Your <span className="gradient-text">Sound.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-6 text-lg text-dhwani-muted max-w-xl"
        >
          Dhwani is a premium indie music streaming platform with AI-powered mood playlists,
          real-time analytics, and a community that celebrates independent artists.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-10 flex gap-4"
        >
          <Link to="/register" className="px-8 py-3.5 rounded-full gradient-accent text-white font-semibold text-base hover-lift shadow-lg shadow-dhwani-accent/20">
            Start Listening
          </Link>
          <Link to="/login" className="px-8 py-3.5 rounded-full border border-white/10 text-white font-medium text-base hover:bg-white/[0.04] transition-colors">
            Log in
          </Link>
        </motion.div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <h2 className="text-3xl font-bold text-center mb-16">Why <span className="gradient-text">Dhwani</span>?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl bg-white/[0.02] border border-white/[0.04] p-6 hover-lift"
            >
              <div className="w-11 h-11 rounded-xl gradient-accent flex items-center justify-center mb-4">
                <Icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-base font-semibold mb-2">{title}</h3>
              <p className="text-sm text-dhwani-muted leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Preview mock */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="rounded-3xl overflow-hidden border border-white/[0.06] shadow-2xl shadow-dhwani-accent/5"
        >
          <div className="bg-dhwani-surface p-8 flex gap-6">
            <div className="w-48 shrink-0 hidden md:block">
              <div className="h-4 w-20 rounded bg-white/10 mb-6" />
              {[1,2,3,4,5].map(i => (
                <div key={i} className="flex items-center gap-2 mb-3">
                  <div className="w-4 h-4 rounded bg-white/10" />
                  <div className="h-3 rounded bg-white/[0.06] flex-1" />
                </div>
              ))}
            </div>
            <div className="flex-1">
              <div className="h-5 w-40 rounded bg-white/10 mb-6" />
              <div className="grid grid-cols-3 gap-4">
                {[0,1,2,3,4,5].map(i => (
                  <div key={i} className="rounded-xl overflow-hidden">
                    <div className="aspect-square rounded-xl" style={{ background: `linear-gradient(135deg, hsl(${220 + i*30}, 70%, 55%), hsl(${260 + i*30}, 70%, 45%))` }} />
                    <div className="h-3 w-3/4 rounded bg-white/10 mt-2" />
                    <div className="h-2 w-1/2 rounded bg-white/[0.06] mt-1" />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-white/[0.02] backdrop-blur-md border-t border-white/[0.04] p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg gradient-accent" />
            <div className="flex-1">
              <div className="h-3 w-24 rounded bg-white/10" />
              <div className="h-1 w-full rounded bg-white/[0.06] mt-2" />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Testimonials */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">What people are <span className="gradient-text">saying</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map(({ name, text, role }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl bg-white/[0.02] border border-white/[0.04] p-6"
            >
              <p className="text-sm text-dhwani-muted leading-relaxed mb-4">"{text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full gradient-accent" />
                <div>
                  <p className="text-sm font-semibold">{name}</p>
                  <p className="text-xs text-dhwani-muted">{role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.04] mt-12">
        <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg gradient-accent flex items-center justify-center text-white font-bold text-xs">D</div>
            <span className="gradient-text font-bold">Dhwani</span>
          </div>
          <p className="text-xs text-dhwani-muted">&copy; 2026 Dhwani. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
