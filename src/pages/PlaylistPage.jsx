import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { RiPlayFill, RiPauseFill, RiHeartLine, RiHeartFill, RiMoreLine, RiShuffleLine, RiTimeLine, RiShareLine, RiDownloadLine, RiEditLine } from 'react-icons/ri';
import { TrackRow } from '../components';
import { usePlayerStore } from '../stores/playerStore';

// Mock data
const mockPlaylist = {
  id: '1',
  title: 'Bollywood Hits 2024',
  description: 'The biggest Bollywood hits of the year, updated weekly with the hottest new tracks.',
  coverImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600',
  isPublic: true,
  isOwner: false,
  createdBy: {
    id: '1',
    name: 'Dhwani',
    avatar: null,
  },
  _count: { tracks: 30 },
  totalDuration: 7200000, // 2 hours
  tracks: [
    { id: '1', title: 'Kesariya', duration: 268, plays: 180000000, isLiked: true, artist: { id: '1', name: 'Arijit Singh' }, album: { id: '1', title: 'Brahmastra', coverImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300' } },
    { id: '2', title: 'Kala Chashma', duration: 198, plays: 200000000, isLiked: false, artist: { id: '2', name: 'Neha Kakkar' }, album: { id: '2', title: 'Party Anthems', coverImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300' } },
    { id: '3', title: 'Jai Ho', duration: 312, plays: 250000000, isLiked: true, artist: { id: '3', name: 'A.R. Rahman' }, album: { id: '3', title: 'Slumdog Millionaire', coverImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300' } },
    { id: '4', title: 'Tum Hi Ho', duration: 262, plays: 150000000, isLiked: true, artist: { id: '1', name: 'Arijit Singh' }, album: { id: '4', title: 'Aashiqui 2', coverImage: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300' } },
    { id: '5', title: 'Paani Paani', duration: 188, plays: 200000000, isLiked: false, artist: { id: '4', name: 'Badshah' }, album: { id: '5', title: 'Bass Drop', coverImage: 'https://images.unsplash.com/photo-1571266028243-e4733b0f0bb0?w=300' } },
    { id: '6', title: 'Chaiyya Chaiyya', duration: 365, plays: 120000000, isLiked: true, artist: { id: '5', name: 'Sukhwinder Singh' }, album: { id: '6', title: 'Dil Se', coverImage: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300' } },
    { id: '7', title: 'Kal Ho Naa Ho', duration: 326, plays: 180000000, isLiked: false, artist: { id: '6', name: 'Sonu Nigam' }, album: { id: '7', title: 'Kal Ho Naa Ho', coverImage: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=300' } },
    { id: '8', title: 'Rang De Basanti', duration: 321, plays: 90000000, isLiked: true, artist: { id: '3', name: 'A.R. Rahman' }, album: { id: '8', title: 'Rang De Basanti', coverImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300' } },
  ],
};

function formatDuration(ms) {
  const hours = Math.floor(ms / 3600000);
  const minutes = Math.floor((ms % 3600000) / 60000);
  if (hours > 0) {
    return `${hours} hr ${minutes} min`;
  }
  return `${minutes} min`;
}

export default function PlaylistPage() {
  const { id } = useParams();
  const { currentTrack, isPlaying, playTrack, togglePlay, setQueue } = usePlayerStore();
  const [isLiked, setIsLiked] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const playlist = mockPlaylist; // In real app, fetch by id
  const isCurrentPlaylist = playlist.tracks.some(t => t.id === currentTrack?.id);

  const handlePlayAll = () => {
    if (isCurrentPlaylist && isPlaying) {
      togglePlay();
    } else {
      playTrack(playlist.tracks[0], playlist.tracks);
    }
  };

  const handleShuffle = () => {
    const shuffled = [...playlist.tracks].sort(() => Math.random() - 0.5);
    playTrack(shuffled[0], shuffled);
  };

  // Extract dominant color from image (simplified)
  const gradientColor = 'from-purple-600';

  return (
    <div className="pb-8">
      {/* Hero Section */}
      <div className={`relative -mx-6 -mt-6 px-6 pt-6 pb-8 bg-gradient-to-b ${gradientColor} to-dhwani-bg`}>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-dhwani-bg" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative flex flex-col md:flex-row items-center md:items-end gap-6"
        >
          {/* Cover */}
          <div className="w-56 h-56 rounded-xl overflow-hidden shadow-2xl flex-shrink-0">
            <img
              src={playlist.coverImage}
              alt={playlist.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Info */}
          <div className="flex-1 text-center md:text-left">
            <p className="text-sm font-medium mb-2 uppercase tracking-wider">
              {playlist.isPublic ? 'Public Playlist' : 'Private Playlist'}
            </p>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{playlist.title}</h1>
            <p className="text-dhwani-text-secondary mb-4 max-w-2xl">{playlist.description}</p>
            <div className="flex items-center justify-center md:justify-start gap-2 text-sm text-dhwani-text-secondary">
              <span className="font-semibold text-dhwani-text">{playlist.createdBy.name}</span>
              <span>•</span>
              <span>{playlist._count.tracks} songs</span>
              <span>•</span>
              <span>{formatDuration(playlist.totalDuration)}</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between py-6">
        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePlayAll}
            className="w-14 h-14 bg-dhwani-accent rounded-full flex items-center justify-center shadow-lg shadow-dhwani-accent/30"
          >
            {isCurrentPlaylist && isPlaying ? (
              <RiPauseFill className="text-2xl text-white" />
            ) : (
              <RiPlayFill className="text-2xl text-white ml-1" />
            )}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleShuffle}
            className="w-10 h-10 rounded-full border border-dhwani-surface-light flex items-center justify-center hover:border-dhwani-text transition-colors"
          >
            <RiShuffleLine className="text-lg" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsLiked(!isLiked)}
            className="p-2"
          >
            {isLiked ? (
              <RiHeartFill className="text-2xl text-dhwani-accent" />
            ) : (
              <RiHeartLine className="text-2xl text-dhwani-muted hover:text-dhwani-text transition-colors" />
            )}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2"
          >
            <RiDownloadLine className="text-xl text-dhwani-muted hover:text-dhwani-text transition-colors" />
          </motion.button>

          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowMenu(!showMenu)}
              className="p-2"
            >
              <RiMoreLine className="text-xl text-dhwani-muted hover:text-dhwani-text transition-colors" />
            </motion.button>

            {showMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute top-full left-0 mt-2 w-48 py-2 bg-dhwani-surface rounded-xl shadow-xl z-10"
              >
                <button className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-dhwani-surface-light transition-colors">
                  <RiShareLine />
                  <span>Share</span>
                </button>
                {playlist.isOwner && (
                  <button className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-dhwani-surface-light transition-colors">
                    <RiEditLine />
                    <span>Edit playlist</span>
                  </button>
                )}
              </motion.div>
            )}
          </div>
        </div>

        <div className="hidden md:flex items-center gap-2 text-dhwani-muted">
          <RiTimeLine />
          <span className="text-sm">Duration</span>
        </div>
      </div>

      {/* Track List Header */}
      <div className="hidden md:grid grid-cols-[40px_1fr_1fr_100px] gap-4 px-4 py-2 border-b border-dhwani-surface-light text-sm text-dhwani-muted uppercase tracking-wider">
        <span>#</span>
        <span>Title</span>
        <span>Album</span>
        <span className="text-right">
          <RiTimeLine className="inline" />
        </span>
      </div>

      {/* Tracks */}
      <div className="mt-2">
        {playlist.tracks.map((track, index) => (
          <TrackRow 
            key={track.id} 
            track={track} 
            index={index} 
            showAlbum 
            isActive={currentTrack?.id === track.id}
          />
        ))}
      </div>
    </div>
  );
}
