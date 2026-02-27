import { useState } from 'react'
import { motion } from 'framer-motion'
import { HiMagnifyingGlass, HiUserPlus, HiCheck, HiXMark } from 'react-icons/hi2'
import { mockFriends, mockFriendRequests, mockTracks } from '@/utils/mockData'
import { gradientFromSeed } from '@/utils/helpers'
import { usePlayerStore } from '@/store'

const tabs = ['Friends', 'Activity', 'Requests', 'Find Friends']

export default function FriendsPage() {
  const [activeTab, setActiveTab] = useState('Friends')
  const [searchQuery, setSearchQuery] = useState('')
  const setTrack = usePlayerStore((s) => s.setTrack)

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold mb-2">Friends</h1>
        <p className="text-dhwani-muted">See what your friends are listening to and discover together.</p>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-white/[0.06] pb-1">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors relative ${
              activeTab === tab
                ? 'text-white bg-white/[0.04] border-b-2 border-dhwani-accent'
                : 'text-dhwani-muted hover:text-white'
            }`}
          >
            {tab}
            {tab === 'Requests' && mockFriendRequests.length > 0 && (
              <span className="ml-2 px-1.5 py-0.5 rounded-full bg-dhwani-accent text-[10px] text-white font-bold">
                {mockFriendRequests.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Friends list */}
      {activeTab === 'Friends' && (
        <div className="space-y-3">
          {mockFriends.map((friend, i) => (
            <motion.div
              key={friend.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.03] transition-colors"
            >
              <div className="relative">
                <div
                  className="w-12 h-12 rounded-full shadow-lg"
                  style={{ background: gradientFromSeed(i + 60) }}
                />
                {friend.online && (
                  <div className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-green-400 border-2 border-dhwani-bg" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white">{friend.name}</p>
                {friend.currentlyPlaying ? (
                  <p className="text-xs text-dhwani-muted truncate">
                    Listening to <span className="text-dhwani-accent">{friend.currentlyPlaying.title}</span> by {friend.currentlyPlaying.artist}
                  </p>
                ) : (
                  <p className="text-xs text-dhwani-muted">Offline</p>
                )}
              </div>
              {friend.currentlyPlaying && (
                <button
                  onClick={() => setTrack(friend.currentlyPlaying)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white/[0.04] text-dhwani-muted hover:text-white transition-colors"
                >
                  Play
                </button>
              )}
            </motion.div>
          ))}
        </div>
      )}

      {/* Activity feed */}
      {activeTab === 'Activity' && (
        <div className="space-y-3">
          {mockFriends
            .filter((f) => f.currentlyPlaying)
            .map((friend, i) => (
              <motion.div
                key={friend.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04]"
              >
                <div
                  className="w-10 h-10 rounded-full shrink-0"
                  style={{ background: gradientFromSeed(i + 60) }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm">
                    <span className="font-semibold text-white">{friend.name}</span>
                    <span className="text-dhwani-muted"> is listening to </span>
                    <span className="font-medium text-dhwani-accent">{friend.currentlyPlaying.title}</span>
                  </p>
                  <p className="text-xs text-dhwani-muted mt-0.5">{friend.currentlyPlaying.artist} · Just now</p>
                </div>
                <div
                  className="w-10 h-10 rounded-lg shrink-0"
                  style={{ background: gradientFromSeed(friend.currentlyPlaying.coverSeed ?? i) }}
                />
              </motion.div>
            ))}
          {mockFriends.filter((f) => f.currentlyPlaying).length === 0 && (
            <div className="text-center py-12 text-dhwani-muted">No recent activity from your friends.</div>
          )}
        </div>
      )}

      {/* Friend requests */}
      {activeTab === 'Requests' && (
        <div className="space-y-3">
          {mockFriendRequests.length === 0 ? (
            <div className="text-center py-12 text-dhwani-muted">No pending requests.</div>
          ) : (
            mockFriendRequests.map((req, i) => (
              <motion.div
                key={req.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04]"
              >
                <div className="w-12 h-12 rounded-full gradient-accent shadow-lg" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-white">{req.name}</p>
                  <p className="text-xs text-dhwani-muted">Wants to connect</p>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 rounded-lg gradient-accent text-white hover-lift">
                    <HiCheck className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-lg bg-white/[0.04] text-dhwani-muted hover:text-white transition-colors">
                    <HiXMark className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      )}

      {/* Find friends */}
      {activeTab === 'Find Friends' && (
        <div className="space-y-6">
          <div className="relative max-w-md">
            <HiMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dhwani-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or email…"
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/[0.04] border border-white/[0.06] text-white placeholder-dhwani-muted focus:outline-none focus:border-dhwani-accent/40 transition-colors"
            />
          </div>

          {/* Suggestions */}
          <div>
            <h3 className="text-sm font-semibold text-dhwani-muted uppercase tracking-wider mb-3">Suggested</h3>
            <div className="space-y-3">
              {['Ava Martinez', 'Noah Sullivan', 'Zara Khan', 'Liam Foster'].map((name, i) => (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04]"
                >
                  <div
                    className="w-12 h-12 rounded-full shrink-0"
                    style={{ background: gradientFromSeed(i + 80) }}
                  />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-white">{name}</p>
                    <p className="text-xs text-dhwani-muted">{3 + i} mutual friends</p>
                  </div>
                  <button className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium bg-white/[0.04] text-dhwani-muted hover:text-white transition-colors">
                    <HiUserPlus className="w-4 h-4" /> Add
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
