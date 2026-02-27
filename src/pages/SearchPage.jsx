import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { HiMagnifyingGlass } from 'react-icons/hi2'
import { TrackRow, PlaylistCard, ArtistCard } from '@/components'
import { mockTracks, mockPlaylists, mockArtists } from '@/utils/mockData'

const genres = ['All', 'Electronic', 'Indie', 'Lo-fi', 'Synthwave', 'Acoustic', 'Ambient']

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [genre, setGenre] = useState('All')

  const filteredTracks = useMemo(
    () =>
      mockTracks.filter(
        (t) =>
          (genre === 'All' || true) && // genre filtering placeholder
          (t.title.toLowerCase().includes(query.toLowerCase()) ||
            t.artist.toLowerCase().includes(query.toLowerCase())),
      ),
    [query, genre],
  )

  const filteredPlaylists = useMemo(
    () => mockPlaylists.filter((p) => p.title.toLowerCase().includes(query.toLowerCase())),
    [query],
  )

  const filteredArtists = useMemo(
    () => mockArtists.filter((a) => a.name.toLowerCase().includes(query.toLowerCase())),
    [query],
  )

  const hasResults = filteredTracks.length || filteredPlaylists.length || filteredArtists.length

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold mb-6">Search</h1>

        {/* Search bar */}
        <div className="relative max-w-xl">
          <HiMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dhwani-muted" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search songs, artists, playlists…"
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/[0.04] border border-white/[0.06] text-white placeholder-dhwani-muted focus:outline-none focus:border-dhwani-accent/40 transition-colors"
          />
        </div>

        {/* Genre chips */}
        <div className="flex gap-2 mt-5 flex-wrap">
          {genres.map((g) => (
            <button
              key={g}
              onClick={() => setGenre(g)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                genre === g
                  ? 'gradient-accent text-white'
                  : 'bg-white/[0.04] text-dhwani-muted hover:text-white hover:bg-white/[0.06]'
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Results */}
      {query && !hasResults && (
        <div className="text-center py-16">
          <p className="text-dhwani-muted text-lg">No results found for "{query}"</p>
        </div>
      )}

      {/* Artists */}
      {filteredArtists.length > 0 && (
        <section>
          <h2 className="text-lg font-bold mb-4">Artists</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {filteredArtists.map((a, i) => (
              <ArtistCard key={a.id} artist={a} index={i} />
            ))}
          </div>
        </section>
      )}

      {/* Playlists */}
      {filteredPlaylists.length > 0 && (
        <section>
          <h2 className="text-lg font-bold mb-4">Playlists</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {filteredPlaylists.map((p, i) => (
              <PlaylistCard key={p.id} playlist={p} index={i} />
            ))}
          </div>
        </section>
      )}

      {/* Tracks */}
      {filteredTracks.length > 0 && (
        <section>
          <h2 className="text-lg font-bold mb-4">Songs</h2>
          <div className="rounded-2xl bg-white/[0.01] border border-white/[0.04] overflow-hidden">
            {filteredTracks.map((t, i) => (
              <TrackRow key={t.id} track={t} index={i} />
            ))}
          </div>
        </section>
      )}

      {/* Browse when empty */}
      {!query && (
        <section>
          <h2 className="text-lg font-bold mb-5">Browse All</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {genres.slice(1).map((g, i) => (
              <motion.div
                key={g}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setGenre(g)}
                className="rounded-2xl p-6 cursor-pointer hover-lift"
                style={{ background: `linear-gradient(135deg, hsl(${220 + i * 30}, 60%, 40%), hsl(${250 + i * 30}, 50%, 25%))` }}
              >
                <h3 className="text-lg font-bold">{g}</h3>
              </motion.div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
