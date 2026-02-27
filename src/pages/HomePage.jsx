import { motion } from 'framer-motion'
import { PlaylistCard, ArtistCard, TrackRow } from '@/components'
import { mockPlaylists, mockTracks, mockArtists } from '@/utils/mockData'
import { usePlayerStore } from '@/store'

export default function HomePage() {
  const setTrack = usePlayerStore((s) => s.setTrack)
  const setQueue = usePlayerStore((s) => s.setQueue)

  const playPlaylist = (pl) => {
    if (pl.tracks.length) {
      setTrack(pl.tracks[0])
      setQueue(pl.tracks.slice(1))
    }
  }

  return (
    <div className="space-y-12">
      {/* Welcome Banner */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative rounded-3xl overflow-hidden p-8 md:p-12"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-dhwani-accent/20 via-dhwani-surface to-dhwani-bg" />
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-dhwani-accent2/10 blur-[100px]" />
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2">Good evening, Alex</h1>
          <p className="text-dhwani-muted text-base">Pick up where you left off, or explore something new.</p>
        </div>
      </motion.section>

      {/* Featured Playlists */}
      <section>
        <h2 className="text-xl font-bold mb-5">Featured Playlists</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {mockPlaylists.slice(0, 4).map((pl, i) => (
            <PlaylistCard key={pl.id} playlist={pl} index={i} />
          ))}
        </div>
      </section>

      {/* Recently Played */}
      <section>
        <h2 className="text-xl font-bold mb-5">Recently Played</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {mockTracks.slice(0, 6).map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              onClick={() => {
                setTrack(t)
                setQueue(mockTracks.filter((x) => x.id !== t.id))
              }}
              className="group cursor-pointer rounded-xl bg-white/[0.02] border border-white/[0.04] p-3 hover-lift"
            >
              <div
                className="aspect-square rounded-lg mb-2"
                style={{ background: `linear-gradient(135deg, hsl(${200 + i * 25}, 70%, 50%), hsl(${240 + i * 25}, 60%, 40%))` }}
              />
              <p className="text-sm font-medium truncate">{t.title}</p>
              <p className="text-xs text-dhwani-muted truncate">{t.artist}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trending Tracks */}
      <section>
        <h2 className="text-xl font-bold mb-5">Trending Now</h2>
        <div className="rounded-2xl bg-white/[0.01] border border-white/[0.04] overflow-hidden">
          {mockTracks.slice(0, 8).map((t, i) => (
            <TrackRow key={t.id} track={t} index={i} />
          ))}
        </div>
      </section>

      {/* Recommended Artists */}
      <section>
        <h2 className="text-xl font-bold mb-5">Recommended Artists</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
          {mockArtists.map((a, i) => (
            <ArtistCard key={a.id} artist={a} index={i} />
          ))}
        </div>
      </section>

      {/* Mood Generator CTA */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="rounded-3xl border border-white/[0.06] bg-gradient-to-r from-dhwani-accent/10 to-dhwani-accent2/5 p-8 flex flex-col md:flex-row items-center gap-6"
      >
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-2">AI Mood Playlist</h2>
          <p className="text-dhwani-muted">Describe your mood and let Dhwani generate the perfect playlist for you.</p>
        </div>
        <a href="/mood" className="px-6 py-3 rounded-full gradient-accent text-white font-semibold hover-lift shrink-0">
          Try it now
        </a>
      </motion.section>
    </div>
  )
}
