import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RiPlayFill, RiFireLine, RiTimeLine, RiArrowRightSLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { PlaylistCard, ArtistCard, TrackRow } from '../components';
import { useUserStore } from '../stores/userStore';
import { usePlayerStore } from '../stores/playerStore';

// Mock data for demo
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
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

export default function HomePage() {
  const { user } = useUserStore();
  const { playTrack } = usePlayerStore();
  const [greeting] = useState(getGreeting());

  return (
    <div className="space-y-10 pb-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold"
          >
            {greeting}{user ? `, ${user.name?.split(' ')[0]}` : ''}
          </motion.h1>
          <p className="text-dhwani-text-secondary mt-1">
            Discover your next favorite song
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-dhwani-muted">
            <RiTimeLine className="inline mr-1" />
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
          </span>
        </div>
      </div>

      {/* Quick Play Cards */}
      <section>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {mockPlaylists.slice(0, 6).map((playlist, index) => (
            <motion.div
              key={playlist.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              className="group flex items-center gap-4 bg-dhwani-surface-light/50 hover:bg-dhwani-surface-light rounded-lg overflow-hidden cursor-pointer transition-colors"
            >
              <div className="w-16 h-16 flex-shrink-0">
                <img
                  src={playlist.coverImage}
                  alt={playlist.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="font-semibold truncate flex-1 pr-2">{playlist.title}</p>
              <button className="w-10 h-10 mr-3 rounded-full bg-dhwani-accent flex items-center justify-center opacity-0 group-hover:opacity-100 shadow-lg shadow-dhwani-accent/30 transition-opacity">
                <RiPlayFill className="text-white" />
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trending Now */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-dhwani-accent3/20 to-dhwani-accent4/20 flex items-center justify-center">
              <RiFireLine className="text-dhwani-accent3 text-lg" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Trending Now</h2>
              <p className="text-sm text-dhwani-muted">Whats hot right now</p>
            </div>
          </div>
          <Link to="/search" className="text-sm text-dhwani-accent hover:underline flex items-center gap-1">
            See all <RiArrowRightSLine />
          </Link>
        </div>
        <div className="card p-4">
          {mockTracks.map((track, index) => (
            <TrackRow key={track.id} track={track} index={index} showPlays />
          ))}
        </div>
      </section>

      {/* Featured Playlists */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Made For You</h2>
          <Link to="/library" className="text-sm text-dhwani-accent hover:underline flex items-center gap-1">
            See all <RiArrowRightSLine />
          </Link>
        </div>
        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
          {mockPlaylists.map((playlist, index) => (
            <PlaylistCard key={playlist.id} playlist={playlist} index={index} />
          ))}
        </div>
      </section>

      {/* Popular Artists */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Popular Artists</h2>
          <Link to="/artists" className="text-sm text-dhwani-accent hover:underline flex items-center gap-1">
            See all <RiArrowRightSLine />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {mockArtists.map((artist, index) => (
            <ArtistCard key={artist.id} artist={artist} index={index} />
          ))}
        </div>
      </section>

      {/* Recently Played */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Recently Played</h2>
          <Link to="/library" className="text-sm text-dhwani-accent hover:underline flex items-center gap-1">
            History <RiArrowRightSLine />
          </Link>
        </div>
        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
          {mockTracks.map((track, index) => (
            <motion.div
              key={track.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -5 }}
              onClick={() => playTrack(track, mockTracks)}
              className="cursor-pointer group w-40 flex-shrink-0"
            >
              <div className="relative mb-3">
                <div className="aspect-square rounded-xl overflow-hidden bg-dhwani-surface-light shadow-lg group-hover:shadow-xl transition-shadow">
                  <img
                    src={track.album?.coverImage}
                    alt={track.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <button className="absolute bottom-2 right-2 w-10 h-10 bg-dhwani-accent rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 shadow-lg transition-opacity">
                  <RiPlayFill className="text-white" />
                </button>
              </div>
              <p className="font-medium truncate">{track.title}</p>
              <p className="text-sm text-dhwani-muted truncate">{track.artist.name}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
