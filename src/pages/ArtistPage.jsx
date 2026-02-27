import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { TrackRow } from '@/components'
import { mockArtists, mockTracks } from '@/utils/mockData'
import { gradientFromSeed } from '@/utils/helpers'

export default function ArtistPage() {
  const { id } = useParams()
  const artist = mockArtists.find((a) => a.id === id) ?? mockArtists[0]
  const topTracks = artist.topTracks?.length ? artist.topTracks : mockTracks.slice(0, 5)

  return (
    <div className="space-y-10">
      {/* Banner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative rounded-3xl overflow-hidden h-64 flex items-end p-8"
      >
        <div
          className="absolute inset-0"
          style={{ background: gradientFromSeed(artist.coverSeed ?? 40) }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dhwani-bg/90 to-transparent" />
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold">{artist.name}</h1>
          <p className="text-dhwani-muted mt-1">{artist.followers} followers</p>
        </div>
      </motion.div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <button className="px-6 py-2.5 rounded-full gradient-accent text-white font-semibold hover-lift">
          Follow
        </button>
        <button className="px-6 py-2.5 rounded-full border border-white/10 text-white font-medium hover:bg-white/[0.04] transition-colors">
          Share
        </button>
      </div>

      {/* Popular tracks */}
      <section>
        <h2 className="text-xl font-bold mb-4">Popular</h2>
        <div className="rounded-2xl bg-white/[0.01] border border-white/[0.04] overflow-hidden">
          {topTracks.map((t, i) => (
            <TrackRow key={t.id} track={t} index={i} />
          ))}
        </div>
      </section>

      {/* Albums */}
      <section>
        <h2 className="text-xl font-bold mb-4">Albums</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
          {[1, 2, 3, 4, 5].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl bg-white/[0.02] border border-white/[0.04] p-4 hover-lift cursor-pointer"
            >
              <div
                className="aspect-square rounded-xl mb-3"
                style={{ background: `linear-gradient(135deg, hsl(${210 + i * 25}, 65%, 50%), hsl(${250 + i * 25}, 55%, 35%))` }}
              />
              <h3 className="text-sm font-semibold truncate">Album {i}</h3>
              <p className="text-xs text-dhwani-muted mt-1">2024</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* About */}
      <section className="rounded-2xl bg-white/[0.02] border border-white/[0.04] p-6">
        <h2 className="text-xl font-bold mb-3">About</h2>
        <p className="text-dhwani-muted leading-relaxed">{artist.bio}</p>
      </section>
    </div>
  )
}
