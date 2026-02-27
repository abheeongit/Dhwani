import { useState } from 'react'
import { motion } from 'framer-motion'
import { PlaylistCard, TrackRow } from '@/components'
import { mockPlaylists, mockTracks } from '@/utils/mockData'

const tabs = ['Playlists', 'Liked Songs', 'Recently Played', 'Albums']

export default function LibraryPage() {
  const [activeTab, setActiveTab] = useState('Playlists')

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold mb-6">Your Library</h1>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-white/[0.06] pb-1">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
                activeTab === tab
                  ? 'text-white bg-white/[0.04] border-b-2 border-dhwani-accent'
                  : 'text-dhwani-muted hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Playlists */}
      {activeTab === 'Playlists' && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {mockPlaylists.map((pl, i) => (
            <PlaylistCard key={pl.id} playlist={pl} index={i} />
          ))}
        </div>
      )}

      {/* Liked Songs */}
      {activeTab === 'Liked Songs' && (
        <div className="rounded-2xl bg-white/[0.01] border border-white/[0.04] overflow-hidden">
          {mockTracks
            .filter((t) => t.liked)
            .map((t, i) => (
              <TrackRow key={t.id} track={t} index={i} />
            ))}
        </div>
      )}

      {/* Recently Played */}
      {activeTab === 'Recently Played' && (
        <div className="rounded-2xl bg-white/[0.01] border border-white/[0.04] overflow-hidden">
          {mockTracks.slice(0, 10).map((t, i) => (
            <TrackRow key={t.id} track={t} index={i} />
          ))}
        </div>
      )}

      {/* Albums placeholder */}
      {activeTab === 'Albums' && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl bg-white/[0.02] border border-white/[0.04] p-4 hover-lift cursor-pointer"
            >
              <div
                className="aspect-square rounded-xl mb-3"
                style={{ background: `linear-gradient(135deg, hsl(${200 + i * 30}, 60%, 45%), hsl(${240 + i * 30}, 50%, 30%))` }}
              />
              <h3 className="text-sm font-semibold truncate">Album {i}</h3>
              <p className="text-xs text-dhwani-muted mt-1">Various Artists</p>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
