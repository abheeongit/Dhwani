import { useState } from 'react';
import { motion } from 'framer-motion';
import { RiPlayFill, RiFireLine, RiTimeLine, RiArrowRightSLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { PlaylistCard, ArtistCard, TrackRow } from '../components';
import { useUserStore } from '../stores/userStore';
import { usePlayerStore } from '../stores/playerStore';

const mockTracks = [
  { id: '1', title: 'Kesariya', duration: 268, plays: 180000000, artist: { id: '1', name: 'Arijit Singh' }, album: { id: '1', title: 'Brahmastra', coverImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300' } },
  { id: '2', title: 'Kala Chashma', duration: 198, plays: 200000000, artist: { id: '2', name: 'Neha Kakkar' }, album: { id: '2', title: 'Party Anthems', coverImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300' } },
  { id: '3', title: 'Jai Ho', duration: 312, plays: 250000000, artist: { id: '3', name: 'A.R. Rahman' }, album: { id: '3', title: 'Slumdog Millionaire', coverImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300' } },
  { id: '4', title: 'Tum Hi Ho', duration: 262, plays: 150000000, artist: { id: '1', name: 'Arijit Singh' }, album: { id: '4', title: 'Aashiqui 2', coverImage: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300' } },
  { id: '5', title: 'Paani Paani', duration: 188, plays: 200000000, artist: { id: '4', name: 'Badshah' }, album: { id: '5', title: 'Bass Drop', coverImage: 'https://images.unsplash.com/photo-1571266028243-e4733b0f0bb0?w=300' } },
];

const mockPlaylists = [
  { id: '1', title: 'Bollywood Hits 2024', description: 'Top Bollywood tracks', coverImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400', _count: { tracks: 25 } },
  { id: '2', title: 'Party Starters', description: 'Get the party going', coverImage: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400', _count: { tracks: 30 } },
  { id: '3', title: 'Chill Vibes', description: 'Relax and unwind', coverImage: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400', _count: { tracks: 20 } },
  { id: '4', title: 'Workout Mix', description: 'High energy tracks', coverImage: 'https://images.unsplash.com/photo-1571266028243-e4733b0f0bb0?w=400', _count: { tracks: 35 } },
];

const mockArtists = [
  { id: '1', name: 'Arijit Singh', avatar: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300', monthlyListeners: 45000000, verified: true },
  { id: '2', name: 'Neha Kakkar', avatar: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300', monthlyListeners: 38000000, verified: true },
  { id: '3', name: 'A.R. Rahman', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300', monthlyListeners: 42000000, verified: true },
  { id: '4', name: 'Badshah', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300', monthlyListeners: 28000000, verified: true },
];

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 18) return 'Good afternoon';
  return 'Good evening';
}

export default function HomePage() {
  const { user } = useUserStore();
  const { playTrack } = usePlayerStore();
  const [greeting] = useState(getGreeting());

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold text-dhwani-text"
          >
            {greeting}{user ? `, ${user.name?.split(' ')[0]}` : ''}
          </motion.h1>
          <p className="text-sm text-dhwani-text-secondary mt-1">Discover your next favorite song</p>
        </div>
        <span className="text-xs text-dhwani-muted flex items-center gap-1">
          <RiTimeLine />
          {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
        </span>
      </div>

      {/* Quick Play Grid */}
      <section>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
          {mockPlaylists.slice(0, 6).map((pl, i) => (
            <motion.div
              key={pl.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="group flex items-center gap-3 bg-dhwani-surface-light hover:bg-dhwani-surface-elevated rounded-md overflow-hidden cursor-pointer transition-colors h-14"
            >
              <div className="w-14 h-14 flex-shrink-0">
                <img src={pl.coverImage} alt={pl.title} className="w-full h-full object-cover" />
              </div>
              <p className="font-bold text-xs truncate flex-1 pr-2 text-dhwani-text">{pl.title}</p>
              <button className="w-8 h-8 mr-2 rounded-full bg-[#1db954] flex items-center justify-center opacity-0 group-hover:opacity-100 shadow-md transition-all hover:scale-105 hover:bg-[#1ed760]">
                <RiPlayFill className="text-black text-sm" />
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trending */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <RiFireLine className="text-orange-400" />
            <h2 className="text-lg font-bold text-dhwani-text">Trending Now</h2>
          </div>
          <Link to="/search" className="text-xs text-dhwani-text-secondary hover:text-dhwani-text font-semibold flex items-center gap-0.5">
            See all <RiArrowRightSLine />
          </Link>
        </div>
        <div className="card p-2">
          {mockTracks.map((track, i) => (
            <TrackRow key={track.id} track={track} index={i} showPlays />
          ))}
        </div>
      </section>

      {/* Made For You */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-dhwani-text">Made For You</h2>
          <Link to="/library" className="text-xs text-dhwani-text-secondary hover:text-dhwani-text font-semibold flex items-center gap-0.5">
            See all <RiArrowRightSLine />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {mockPlaylists.map((pl, i) => (
            <PlaylistCard key={pl.id} playlist={pl} index={i} />
          ))}
        </div>
      </section>

      {/* Popular Artists */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-dhwani-text">Popular Artists</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {mockArtists.map((artist, i) => (
            <ArtistCard key={artist.id} artist={artist} index={i} />
          ))}
        </div>
      </section>

      {/* Recently Played */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-dhwani-text">Recently Played</h2>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {mockTracks.map((track, i) => (
            <motion.div
              key={track.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              onClick={() => playTrack(track, mockTracks)}
              className="cursor-pointer group flex-shrink-0 w-36"
            >
              <div className="relative mb-2">
                <div className="aspect-square rounded-md overflow-hidden bg-dhwani-surface-light shadow group-hover:shadow-lg transition-shadow">
                  <img src={track.album?.coverImage} alt={track.title} className="w-full h-full object-cover" />
                </div>
                <button className="absolute bottom-1.5 right-1.5 w-9 h-9 bg-[#1db954] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 shadow-lg transition-all hover:bg-[#1ed760] hover:scale-105">
                  <RiPlayFill className="text-black text-sm" />
                </button>
              </div>
              <p className="font-semibold text-xs truncate text-dhwani-text">{track.title}</p>
              <p className="text-[11px] text-dhwani-muted truncate">{track.artist.name}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
