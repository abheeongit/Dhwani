import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  RiPlayFill,
  RiHeadphoneLine,
  RiMusicLine,
  RiUserHeartLine,
  RiSparklingLine,
  RiArrowRightLine,
  RiSunLine,
  RiMoonLine,
} from 'react-icons/ri';
import { useUIStore } from '../stores/uiStore';

const features = [
  { icon: RiMusicLine, title: 'Premium Audio', desc: 'Crystal-clear 320kbps streaming quality' },
  { icon: RiHeadphoneLine, title: 'Mood Playlists', desc: 'AI-curated mixes that match your vibe' },
  { icon: RiUserHeartLine, title: 'Social Listening', desc: 'Share and discover music with friends' },
  { icon: RiSparklingLine, title: 'Smart Discovery', desc: 'Personalized recommendations for you' },
];

const stats = [
  { value: '50M+', label: 'Songs' },
  { value: '1M+', label: 'Artists' },
  { value: '10M+', label: 'Listeners' },
];

export default function LandingPage() {
  const { theme, toggleTheme } = useUIStore();

  return (
    <div className="min-h-screen bg-dhwani-bg transition-colors duration-300">
      {/* ── Navigation ── */}
      <nav className="sticky top-0 z-50 border-b border-dhwani-border bg-dhwani-bg/80 backdrop-blur-xl transition-colors">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#1db954] flex items-center justify-center">
              <RiMusicLine className="text-black text-base" />
            </div>
            <span className="text-lg font-bold text-dhwani-text">Dhwani</span>
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-full flex items-center justify-center text-dhwani-text-secondary hover:text-dhwani-text hover:bg-dhwani-surface-light transition-all"
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <RiSunLine className="text-lg" /> : <RiMoonLine className="text-lg" />}
            </button>
            <Link to="/login" className="text-sm font-semibold text-dhwani-text-secondary hover:text-dhwani-text transition-colors px-3 py-1.5">
              Log in
            </Link>
            <Link to="/register">
              <button className="btn-primary text-sm px-5 py-2.5">Sign up free</button>
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-24 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-dhwani-accent-soft text-[#1db954] text-xs font-semibold mb-6">
            <RiSparklingLine className="text-sm" /> Now Available in India
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight mb-6 text-dhwani-text">
            Music for{' '}
            <span className="text-[#1db954]">every</span>
            <br />moment
          </h1>
          <p className="text-base md:text-lg text-dhwani-text-secondary max-w-lg mx-auto mb-10 leading-relaxed">
            Millions of songs and podcasts at your fingertips. Free to start, no credit card needed.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Link to="/register">
            <button className="btn-primary text-base px-8 py-3.5 gap-2">
              <RiPlayFill className="text-lg" /> Get started free
            </button>
          </Link>
          <Link to="/home">
            <button className="btn-secondary text-base px-8 py-3.5 gap-2">
              Explore <RiArrowRightLine />
            </button>
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex items-center justify-center gap-12 mt-16"
        >
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-2xl md:text-3xl font-black text-[#1db954]">{s.value}</p>
              <p className="text-xs text-dhwani-muted font-medium mt-1">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ── Features ── */}
      <section className="border-t border-dhwani-border bg-dhwani-surface transition-colors">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center mb-14">
            <h2 className="text-2xl md:text-3xl font-bold text-dhwani-text mb-3">
              Why <span className="text-[#1db954]">Dhwani</span>?
            </h2>
            <p className="text-dhwani-text-secondary text-sm max-w-md mx-auto">
              Premium features, beautiful design, and technology that understands your taste.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="p-5 rounded-xl bg-dhwani-surface-light border border-dhwani-border hover:border-[#1db954]/30 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-dhwani-accent-soft flex items-center justify-center mb-3">
                  <f.icon className="text-lg text-[#1db954]" />
                </div>
                <h3 className="font-bold text-sm text-dhwani-text mb-1">{f.title}</h3>
                <p className="text-xs text-dhwani-text-secondary leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="border-t border-dhwani-border">
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-2xl md:text-3xl font-bold text-dhwani-text mb-3">
              Ready to start listening?
            </h2>
            <p className="text-dhwani-text-secondary text-sm mb-8 max-w-md mx-auto">
              Join millions of listeners. Free forever, upgrade anytime.
            </p>
            <Link to="/register">
              <button className="btn-primary text-base px-10 py-3.5">Create Free Account</button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-dhwani-border">
        <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-[#1db954] flex items-center justify-center">
              <RiMusicLine className="text-black text-xs" />
            </div>
            <span className="font-bold text-sm text-dhwani-text">Dhwani</span>
          </div>
          <p className="text-xs text-dhwani-muted">© 2025 Dhwani. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
