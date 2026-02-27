import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { RiPlayFill, RiPauseFill, RiUserFollowLine, RiUserUnfollowLine, RiShareLine, RiMoreLine, RiVerifiedBadgeFill, RiSpotifyLine } from 'react-icons/ri';
import { TrackRow, PlaylistCard } from '../components';
import { usePlayerStore } from '../stores/playerStore';

// Mock data
const mockArtist = {
  id: '1',
  name: 'Arijit Singh',
  bio: 'Arijit Singh is an Indian playback singer who predominantly sings in Hindi and Bengali but has also performed in various other Indian languages. He is regarded as one of the most versatile and successful playback singers in Indian cinema.',
  avatar: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600',
  coverImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200',
  verified: true,
  monthlyListeners: 45000000,
  followers: 12000000,
  isFollowing: false,
  genres: ['Bollywood', 'Romantic', 'Playback'],
  topTracks: [
    { id: '1', title: 'Kesariya', duration: 268, plays: 180000000, isLiked: true, artist: { id: '1', name: 'Arijit Singh' }, album: { id: '1', title: 'Brahmastra', coverImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300' } },
    { id: '2', title: 'Tum Hi Ho', duration: 262, plays: 350000000, isLiked: true, artist: { id: '1', name: 'Arijit Singh' }, album: { id: '2', title: 'Aashiqui 2', coverImage: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300' } },
    { id: '3', title: 'Channa Mereya', duration: 289, plays: 280000000, isLiked: false, artist: { id: '1', name: 'Arijit Singh' }, album: { id: '3', title: 'Ae Dil Hai Mushkil', coverImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300' } },
    { id: '4', title: 'Agar Tum Saath Ho', duration: 341, plays: 200000000, isLiked: true, artist: { id: '1', name: 'Arijit Singh' }, album: { id: '4', title: 'Tamasha', coverImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300' } },
    { id: '5', title: 'Phir Le Aya Dil', duration: 295, plays: 150000000, isLiked: false, artist: { id: '1', name: 'Arijit Singh' }, album: { id: '5', title: 'Barfi', coverImage: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300' } },
  ],
  albums: [
    { id: '1', title: 'Aashiqui 2', year: 2013, coverImage: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400', trackCount: 12 },
    { id: '2', title: 'Ae Dil Hai Mushkil', year: 2016, coverImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400', trackCount: 8 },
    { id: '3', title: 'Brahmastra', year: 2022, coverImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400', trackCount: 6 },
    { id: '4', title: 'Tamasha', year: 2015, coverImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400', trackCount: 10 },
  ],
  relatedArtists: [
    { id: '2', name: 'Pritam', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300', monthlyListeners: 38000000, verified: true },
    { id: '3', name: 'Shreya Ghoshal', avatar: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300', monthlyListeners: 35000000, verified: true },
    { id: '4', name: 'Atif Aslam', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300', monthlyListeners: 32000000, verified: true },
  ],
  featuredPlaylists: [
    { id: '1', title: 'Best of Arijit Singh', description: 'All time hits', coverImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400', _count: { tracks: 50 } },
    { id: '2', title: 'Arijit Singh Romance', description: 'Love songs', coverImage: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400', _count: { tracks: 30 } },
  ],
};

function formatNumber(num) {
  if (num >= 1000000000) return (num / 1000000000).toFixed(1) + 'B';
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
}

export default function ArtistPage() {
  const { id } = useParams();
  const { currentTrack, isPlaying, playTrack, togglePlay } = usePlayerStore();
  const [isFollowing, setIsFollowing] = useState(mockArtist.isFollowing);
  const [showAllTracks, setShowAllTracks] = useState(false);

  const artist = mockArtist; // In real app, fetch by id
  const isCurrentArtist = artist.topTracks.some(t => t.id === currentTrack?.id);
  const displayedTracks = showAllTracks ? artist.topTracks : artist.topTracks.slice(0, 5);

  const handlePlayAll = () => {
    if (isCurrentArtist && isPlaying) {
      togglePlay();
    } else {
      playTrack(artist.topTracks[0], artist.topTracks);
    }
  };

  return (
    <div className="pb-8">
      {/* Hero Section */}
      <div className="relative -mx-6 -mt-6 h-80 md:h-96 overflow-hidden">
        <img
          src={artist.coverImage}
          alt={artist.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dhwani-bg via-dhwani-bg/50 to-transparent" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-0 left-0 right-0 p-6"
        >
          <div className="flex items-center gap-2 mb-2">
            {artist.verified && (
              <div className="flex items-center gap-1 text-blue-400">
                <RiVerifiedBadgeFill className="text-xl" />
                <span className="text-sm font-medium">Verified Artist</span>
              </div>
            )}
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-4">{artist.name}</h1>
          <p className="text-dhwani-text-secondary">
            {formatNumber(artist.monthlyListeners)} monthly listeners
          </p>
        </motion.div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 py-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePlayAll}
          className="w-14 h-14 bg-dhwani-accent rounded-full flex items-center justify-center shadow-lg shadow-dhwani-accent/30"
        >
          {isCurrentArtist && isPlaying ? (
            <RiPauseFill className="text-2xl text-white" />
          ) : (
            <RiPlayFill className="text-2xl text-white ml-1" />
          )}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsFollowing(!isFollowing)}
          className={`px-6 py-2.5 rounded-full font-semibold border-2 transition-colors ${
            isFollowing
              ? 'border-dhwani-accent text-dhwani-accent'
              : 'border-dhwani-text-secondary hover:border-dhwani-text'
          }`}
        >
          {isFollowing ? (
            <span className="flex items-center gap-2">
              <RiUserUnfollowLine />
              Following
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <RiUserFollowLine />
              Follow
            </span>
          )}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-2"
        >
          <RiShareLine className="text-xl text-dhwani-muted hover:text-dhwani-text transition-colors" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-2"
        >
          <RiMoreLine className="text-xl text-dhwani-muted hover:text-dhwani-text transition-colors" />
        </motion.button>
      </div>

      {/* Popular Tracks */}
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4">Popular</h2>
        <div className="card p-4">
          {displayedTracks.map((track, index) => (
            <TrackRow 
              key={track.id} 
              track={track} 
              index={index}
              showPlays 
              isActive={currentTrack?.id === track.id}
            />
          ))}
        </div>
        {artist.topTracks.length > 5 && (
          <button
            onClick={() => setShowAllTracks(!showAllTracks)}
            className="mt-4 text-sm font-semibold text-dhwani-muted hover:text-dhwani-text transition-colors"
          >
            {showAllTracks ? 'Show less' : 'See more'}
          </button>
        )}
      </section>

      {/* Discography */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Discography</h2>
          <button className="text-sm font-semibold text-dhwani-muted hover:text-dhwani-text transition-colors">
            Show all
          </button>
        </div>
        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
          {artist.albums.map((album, index) => (
            <motion.div
              key={album.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -5 }}
              className="cursor-pointer group w-44 flex-shrink-0"
            >
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
              <p className="text-sm text-dhwani-muted">{album.year} • Album</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Playlists */}
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4">Featuring {artist.name}</h2>
        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
          {artist.featuredPlaylists.map((playlist, index) => (
            <PlaylistCard key={playlist.id} playlist={playlist} index={index} />
          ))}
        </div>
      </section>

      {/* Fans Also Like */}
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4">Fans also like</h2>
        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
          {artist.relatedArtists.map((relatedArtist, index) => (
            <motion.div
              key={relatedArtist.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -5 }}
              className="cursor-pointer group w-40 flex-shrink-0 text-center"
            >
              <div className="relative mx-auto mb-3">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-dhwani-surface-light shadow-lg group-hover:shadow-xl transition-shadow mx-auto">
                  <img
                    src={relatedArtist.avatar}
                    alt={relatedArtist.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <button className="absolute bottom-0 right-4 w-10 h-10 bg-dhwani-accent rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 shadow-lg transition-opacity">
                  <RiPlayFill className="text-white" />
                </button>
              </div>
              <p className="font-medium truncate">{relatedArtist.name}</p>
              <p className="text-sm text-dhwani-muted">Artist</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* About */}
      <section>
        <h2 className="text-xl font-bold mb-4">About</h2>
        <div className="relative rounded-2xl overflow-hidden">
          <img
            src={artist.avatar}
            alt={artist.name}
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dhwani-bg via-dhwani-bg/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <p className="text-lg mb-4 line-clamp-3">{artist.bio}</p>
            <div className="flex items-center gap-6 text-sm">
              <div>
                <span className="font-bold">{formatNumber(artist.followers)}</span>
                <span className="text-dhwani-muted ml-1">followers</span>
              </div>
              <div>
                <span className="font-bold">{formatNumber(artist.monthlyListeners)}</span>
                <span className="text-dhwani-muted ml-1">monthly listeners</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
