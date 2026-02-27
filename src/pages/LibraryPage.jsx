import { useState } from 'react';
import { motion } from 'framer-motion';
import { RiPlayFill, RiHeartLine, RiHeartFill, RiAddLine, RiPlayListLine, RiMusicLine, RiDownloadLine, RiTimeLine, RiGridLine, RiListUnordered } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { TrackRow, PlaylistCard } from '../components';
import { usePlayerStore } from '../stores/playerStore';

const tabs = [
  { id: 'playlists', label: 'Playlists', icon: RiPlayListLine },
  { id: 'liked', label: 'Liked Songs', icon: RiHeartFill },
  { id: 'albums', label: 'Albums', icon: RiMusicLine },
  { id: 'downloads', label: 'Downloads', icon: RiDownloadLine },
];

const mockPlaylists = [
  { id: '1', title: 'My Top Hits', description: 'My favorite tracks', coverImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400', _count: { tracks: 25 }, isOwner: true },
  { id: '2', title: 'Workout Mix', description: 'High energy', coverImage: 'https://images.unsplash.com/photo-1571266028243-e4733b0f0bb0?w=400', _count: { tracks: 18 }, isOwner: true },
  { id: '3', title: 'Late Night Vibes', description: 'Chill tracks', coverImage: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400', _count: { tracks: 32 }, isOwner: true },
  { id: '4', title: 'Bollywood Hits 2024', description: 'Curated by Dhwani', coverImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400', _count: { tracks: 50 }, isOwner: false },
];

const mockLikedSongs = [
  { id: '1', title: 'Kesariya', duration: 268, isLiked: true, artist: { id: '1', name: 'Arijit Singh' }, album: { id: '1', title: 'Brahmastra', coverImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300' } },
  { id: '2', title: 'Tum Hi Ho', duration: 262, isLiked: true, artist: { id: '1', name: 'Arijit Singh' }, album: { id: '4', title: 'Aashiqui 2', coverImage: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300' } },
  { id: '3', title: 'Kal Ho Naa Ho', duration: 326, isLiked: true, artist: { id: '3', name: 'Sonu Nigam' }, album: { id: '5', title: 'Kal Ho Naa Ho', coverImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300' } },
  { id: '4', title: 'Chaiyya Chaiyya', duration: 365, isLiked: true, artist: { id: '4', name: 'Sukhwinder Singh' }, album: { id: '6', title: 'Dil Se', coverImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300' } },
  { id: '5', title: 'Ae Dil Hai Mushkil', duration: 271, isLiked: true, artist: { id: '1', name: 'Arijit Singh' }, album: { id: '7', title: 'Ae Dil Hai Mushkil', coverImage: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300' } },
];

const mockAlbums = [
  { id: '1', title: 'Brahmastra', artist: 'Pritam', coverImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400', trackCount: 8 },
  { id: '2', title: 'Aashiqui 2', artist: 'Various', coverImage: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400', trackCount: 12 },
  { id: '3', title: 'Rockstar', artist: 'A.R. Rahman', coverImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400', trackCount: 15 },
];

export default function LibraryPage() {
  const [activeTab, setActiveTab] = useState('playlists');
  const [viewMode, setViewMode] = useState('grid');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { playTrack, setQueue } = usePlayerStore();

  const handlePlayAll = () => {
    if (mockLikedSongs.length > 0) {
      playTrack(mockLikedSongs[0], mockLikedSongs);
    }
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold"
        >
          Your Library
        </motion.h1>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            className="p-2 hover:bg-dhwani-surface rounded-lg transition-colors"
          >
            {viewMode === 'grid' ? <RiListUnordered /> : <RiGridLine />}
          </button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-dhwani-accent rounded-full text-white font-medium"
          >
            <RiAddLine />
            <span>Create</span>
          </motion.button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? 'bg-dhwani-accent text-white'
                : 'bg-dhwani-surface hover:bg-dhwani-surface-light'
            }`}
          >
            <tab.icon className={activeTab === tab.id ? '' : 'text-dhwani-muted'} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === 'playlists' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          {/* User Playlists */}
          <section>
            <h2 className="font-semibold mb-4">Your Playlists</h2>
            <div className={viewMode === 'grid' 
              ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
              : "space-y-2"
            }>
              {mockPlaylists.filter(p => p.isOwner).map((playlist, index) => (
                viewMode === 'grid' ? (
                  <PlaylistCard key={playlist.id} playlist={playlist} index={index} />
                ) : (
                  <motion.div
                    key={playlist.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center gap-4 p-3 bg-dhwani-surface/50 rounded-lg hover:bg-dhwani-surface transition-colors group cursor-pointer"
                  >
                    <img
                      src={playlist.coverImage}
                      alt={playlist.title}
                      className="w-14 h-14 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{playlist.title}</p>
                      <p className="text-sm text-dhwani-muted">{playlist._count.tracks} tracks</p>
                    </div>
                    <button className="w-10 h-10 bg-dhwani-accent rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <RiPlayFill className="text-white" />
                    </button>
                  </motion.div>
                )
              ))}
            </div>
          </section>

          {/* Saved Playlists */}
          <section>
            <h2 className="font-semibold mb-4">Saved Playlists</h2>
            <div className={viewMode === 'grid' 
              ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
              : "space-y-2"
            }>
              {mockPlaylists.filter(p => !p.isOwner).map((playlist, index) => (
                viewMode === 'grid' ? (
                  <PlaylistCard key={playlist.id} playlist={playlist} index={index} />
                ) : (
                  <motion.div
                    key={playlist.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center gap-4 p-3 bg-dhwani-surface/50 rounded-lg hover:bg-dhwani-surface transition-colors group cursor-pointer"
                  >
                    <img
                      src={playlist.coverImage}
                      alt={playlist.title}
                      className="w-14 h-14 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{playlist.title}</p>
                      <p className="text-sm text-dhwani-muted">{playlist._count.tracks} tracks</p>
                    </div>
                    <button className="w-10 h-10 bg-dhwani-accent rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <RiPlayFill className="text-white" />
                    </button>
                  </motion.div>
                )
              ))}
            </div>
          </section>
        </motion.div>
      )}

      {activeTab === 'liked' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {/* Liked Songs Header */}
          <div className="flex items-end gap-6 mb-8 p-6 rounded-2xl bg-gradient-to-br from-dhwani-accent/20 to-dhwani-accent2/20">
            <div className="w-40 h-40 rounded-xl bg-gradient-to-br from-dhwani-accent to-dhwani-accent2 flex items-center justify-center shadow-2xl">
              <RiHeartFill className="text-6xl text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-dhwani-muted mb-2">Playlist</p>
              <h2 className="text-4xl font-bold mb-2">Liked Songs</h2>
              <p className="text-dhwani-text-secondary">{mockLikedSongs.length} songs</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePlayAll}
              className="w-14 h-14 bg-dhwani-accent rounded-full flex items-center justify-center shadow-lg shadow-dhwani-accent/30"
            >
              <RiPlayFill className="text-2xl text-white" />
            </motion.button>
          </div>

          {/* Tracks */}
          <div className="card p-4">
            {mockLikedSongs.map((track, index) => (
              <TrackRow key={track.id} track={track} index={index} showAlbum />
            ))}
          </div>
        </motion.div>
      )}

      {activeTab === 'albums' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={viewMode === 'grid' 
            ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
            : "space-y-2"
          }
        >
          {mockAlbums.map((album, index) => (
            <motion.div
              key={album.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -5 }}
              className={viewMode === 'grid' ? "group cursor-pointer" : "flex items-center gap-4 p-3 bg-dhwani-surface/50 rounded-lg hover:bg-dhwani-surface transition-colors group cursor-pointer"}
            >
              {viewMode === 'grid' ? (
                <>
                  <div className="relative mb-3">
                    <div className="aspect-square rounded-xl overflow-hidden bg-dhwani-surface-light shadow-lg group-hover:shadow-xl transition-shadow">
                      <img
                        src={album.coverImage}
                        alt={album.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <button className="absolute bottom-2 right-2 w-10 h-10 bg-dhwani-accent rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 shadow-lg transition-opacity">
                      <RiPlayFill className="text-white" />
                    </button>
                  </div>
                  <p className="font-medium truncate">{album.title}</p>
                  <p className="text-sm text-dhwani-muted truncate">{album.artist}</p>
                </>
              ) : (
                <>
                  <img
                    src={album.coverImage}
                    alt={album.title}
                    className="w-14 h-14 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{album.title}</p>
                    <p className="text-sm text-dhwani-muted">{album.artist} • {album.trackCount} tracks</p>
                  </div>
                  <button className="w-10 h-10 bg-dhwani-accent rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <RiPlayFill className="text-white" />
                  </button>
                </>
              )}
            </motion.div>
          ))}
        </motion.div>
      )}

      {activeTab === 'downloads' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-20"
        >
          <div className="w-20 h-20 rounded-full bg-dhwani-surface flex items-center justify-center mb-6">
            <RiDownloadLine className="text-3xl text-dhwani-muted" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No downloads yet</h3>
          <p className="text-dhwani-muted text-center max-w-sm">
            Download songs to listen offline. Tap the download icon on any track or album.
          </p>
        </motion.div>
      )}

      {/* Create Playlist Modal */}
      {showCreateModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => setShowCreateModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md p-6 bg-dhwani-surface rounded-2xl shadow-2xl"
          >
            <h3 className="text-xl font-bold mb-6">Create Playlist</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Playlist name</label>
                <input
                  type="text"
                  placeholder="My awesome playlist"
                  className="w-full mt-2 px-4 py-3 bg-dhwani-bg border border-dhwani-surface-light rounded-xl focus:border-dhwani-accent focus:ring-2 focus:ring-dhwani-accent/20 outline-none transition-all"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Description (optional)</label>
                <textarea
                  placeholder="Add a description"
                  rows={3}
                  className="w-full mt-2 px-4 py-3 bg-dhwani-bg border border-dhwani-surface-light rounded-xl focus:border-dhwani-accent focus:ring-2 focus:ring-dhwani-accent/20 outline-none transition-all resize-none"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 py-3 border border-dhwani-surface-light rounded-xl font-medium hover:bg-dhwani-surface-light transition-colors"
              >
                Cancel
              </button>
              <button className="flex-1 py-3 bg-dhwani-accent rounded-xl font-medium text-white">
                Create
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
