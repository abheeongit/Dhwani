import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  RiPlayFill,
  RiHeadphoneLine,
  RiMusicLine,
  RiUserHeartLine,
  RiSparklingLine,
  RiArrowRightLine,
} from 'react-icons/ri';

const features = [
  {
    icon: RiMusicLine,
    title: 'Premium Audio',
    description: 'Experience crystal-clear 320kbps audio quality',
  },
  {
    icon: RiHeadphoneLine,
    title: 'Mood-Based Mixes',
    description: 'AI-curated playlists that match your current vibe',
  },
  {
    icon: RiUserHeartLine,
    title: 'Social Listening',
    description: 'Share and discover music with friends in real-time',
  },
  {
    icon: RiSparklingLine,
    title: 'Smart Discovery',
    description: 'Find new artists based on your unique taste',
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-dhwani-bg overflow-hidden">
      {/* Hero Section */}
      <div className="relative">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-dhwani-accent/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-dhwani-accent2/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-dhwani-accent3/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        {/* Nav */}
        <nav className="relative z-10 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-dhwani-accent to-dhwani-accent2 flex items-center justify-center">
              <RiMusicLine className="text-white text-xl" />
            </div>
            <span className="text-2xl font-bold gradient-text">Dhwani</span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="text-dhwani-text-secondary hover:text-white transition-colors font-medium"
            >
              Sign In
            </Link>
            <Link to="/register">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary"
              >
                Get Started
              </motion.button>
            </Link>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-8 pt-20 pb-32">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-dhwani-accent/10 border border-dhwani-accent/30 text-dhwani-accent text-sm font-medium mb-6">
                <RiSparklingLine /> Premium Music Experience
              </span>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Music That Moves{' '}
                <span className="gradient-text">Your Soul</span>
              </h1>
              <p className="text-xl text-dhwani-text-secondary mb-10 max-w-2xl mx-auto">
                Discover, stream, and share millions of tracks with an experience designed for audiophiles. 
                Your personal DJ, powered by AI.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link to="/register">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary flex items-center gap-2 text-lg px-8 py-4"
                >
                  <RiPlayFill className="text-xl" />
                  Start Listening Free
                </motion.button>
              </Link>
              <Link to="/home">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-secondary flex items-center gap-2 text-lg px-8 py-4"
                >
                  Explore as Guest
                  <RiArrowRightLine />
                </motion.button>
              </Link>
            </motion.div>
          </div>

          {/* Floating Album Art */}
          <div className="relative mt-20 flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="relative"
            >
              <div className="w-72 h-72 rounded-3xl overflow-hidden shadow-2xl shadow-dhwani-accent/30 rotate-[-8deg] absolute -left-20 top-10 z-10">
                <img
                  src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300"
                  alt="Album"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-80 h-80 rounded-3xl overflow-hidden shadow-2xl shadow-dhwani-accent2/30 z-20 relative">
                <img
                  src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400"
                  alt="Album"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dhwani-bg/80 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-lg font-bold">Now Playing</p>
                  <p className="text-sm text-dhwani-text-secondary">The Weeknd - Blinding Lights</p>
                </div>
              </div>
              <div className="w-72 h-72 rounded-3xl overflow-hidden shadow-2xl shadow-dhwani-accent3/30 rotate-[8deg] absolute -right-20 top-10 z-10">
                <img
                  src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300"
                  alt="Album"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              Why Choose <span className="gradient-text">Dhwani</span>?
            </h2>
            <p className="text-dhwani-text-secondary max-w-2xl mx-auto">
              We built the music streaming experience we always wanted. Premium features, beautiful design, and technology that understands your taste.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="card card-hover p-6"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-dhwani-accent/20 to-dhwani-accent2/20 flex items-center justify-center mb-4">
                  <feature.icon className="text-2xl text-dhwani-accent" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-dhwani-text-secondary">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-24 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="card p-12 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-dhwani-accent/10 to-dhwani-accent2/10" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to elevate your music experience?
              </h2>
              <p className="text-dhwani-text-secondary mb-8 max-w-xl mx-auto">
                Join millions of listeners who&apos;ve discovered their new favorite artists on Dhwani.
              </p>
              <Link to="/register">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary text-lg px-10 py-4"
                >
                  Create Free Account
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-dhwani-border py-8 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-dhwani-accent to-dhwani-accent2 flex items-center justify-center">
              <RiMusicLine className="text-white text-sm" />
            </div>
            <span className="font-bold">Dhwani</span>
          </div>
          <p className="text-sm text-dhwani-muted">
            © 2024 Dhwani. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
