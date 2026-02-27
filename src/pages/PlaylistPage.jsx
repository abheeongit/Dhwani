import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { TrackRow } from '@/components'
import { usePlayerStore } from '@/store'
import { mockPlaylists, mockTracks } from '@/utils/mockData'
import { gradientFromSeed } from '@/utils/helpers'
import { HiPlay } from 'react-icons/hi2'

export default function PlaylistPage() {
  const { id } = useParams()
  const playlist = mockPlaylists.find((p) => p.id === id) ?? mockPlaylists[0]
  const tracks = playlist.tracks?.length ? playlist.tracks : mockTracks.slice(0, 10)
  const setTrack = usePlayerStore((s) => s.setTrack)
  const setQueue = usePlayerStore((s) => s.setQueue)

  const playAll = () => {
    if (tracks.length) {
      setTrack(tracks[0])
      setQueue(tracks.slice(1))
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row gap-8 items-start md:items-end"
      >
        <div
          className="w-52 h-52 rounded-2xl shadow-2xl shrink-0"
          style={{ background: gradientFromSeed(playlist.coverSeed ?? 0) }}
        />
        <div className="flex-1">
          <p className="text-xs text-dhwani-muted uppercase tracking-wider mb-2">Playlist</p>
          <h1 className="text-4xl font-extrabold mb-2">{playlist.title}</h1>
          <p className="text-dhwani-muted text-sm mb-4">{playlist.description}</p>
          <div className="flex items-center gap-4">
            <button
              onClick={playAll}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full gradient-accent text-white font-semibold hover-lift"
            >
              <HiPlay className="w-5 h-5" /> Play
            </button>
            <span className="text-sm text-dhwani-muted">{tracks.length} tracks</span>
          </div>
        </div>
      </motion.div>

      {/* Track list */}
      <div className="rounded-2xl bg-white/[0.01] border border-white/[0.04] overflow-hidden">
        {/* Column header */}
        <div className="flex items-center gap-4 px-4 py-2 border-b border-white/[0.04] text-xs text-dhwani-muted uppercase tracking-wider">
          <span className="w-6 text-right">#</span>
          <span className="w-10" />
          <span className="flex-1">Title</span>
          <span className="w-14 text-right">Duration</span>
          <span className="w-8" />
        </div>
        {tracks.map((t, i) => (
          <TrackRow key={t.id} track={t} index={i} />
        ))}
      </div>
    </div>
  )
}
