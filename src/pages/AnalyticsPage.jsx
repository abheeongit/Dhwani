import { useState } from 'react';
import { motion } from 'framer-motion';
import { RiBarChartBoxLine, RiTimeLine, RiMusicLine, RiUserLine, RiCalendarLine, RiPlayFill, RiArrowUpLine, RiArrowDownLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const timeRanges = [
  { id: 'week', label: 'This Week' },
  { id: 'month', label: 'This Month' },
  { id: 'year', label: 'This Year' },
  { id: 'all', label: 'All Time' },
];

const mockStats = {
  totalMinutes: 12450,
  tracksPlayed: 847,
  artistsDiscovered: 156,
  playlistsCreated: 12,
};

const mockTopTracks = [
  { id: '1', rank: 1, title: 'Kesariya', plays: 234, change: 'up', artist: 'Arijit Singh', coverImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300' },
  { id: '2', rank: 2, title: 'Tum Hi Ho', plays: 198, change: 'same', artist: 'Arijit Singh', coverImage: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300' },
  { id: '3', rank: 3, title: 'Kala Chashma', plays: 176, change: 'up', artist: 'Badshah', coverImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300' },
  { id: '4', rank: 4, title: 'Jai Ho', plays: 154, change: 'down', artist: 'A.R. Rahman', coverImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300' },
  { id: '5', rank: 5, title: 'Chaiyya Chaiyya', plays: 132, change: 'up', artist: 'Sukhwinder Singh', coverImage: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=300' },
];

const mockTopArtists = [
  { id: '1', rank: 1, name: 'Arijit Singh', plays: 432, avatar: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300' },
  { id: '2', rank: 2, name: 'Pritam', plays: 287, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300' },
  { id: '3', rank: 3, name: 'A.R. Rahman', plays: 245, avatar: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300' },
  { id: '4', rank: 4, name: 'Badshah', plays: 198, avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300' },
];

const mockTopGenres = [
  { name: 'Bollywood', percentage: 45, color: 'bg-pink-500' },
  { name: 'Pop', percentage: 25, color: 'bg-purple-500' },
  { name: 'Hip-Hop', percentage: 15, color: 'bg-blue-500' },
  { name: 'Classical', percentage: 10, color: 'bg-amber-500' },
  { name: 'Other', percentage: 5, color: 'bg-gray-500' },
];

const mockListeningActivity = [
  { day: 'Mon', minutes: 45 },
  { day: 'Tue', minutes: 78 },
  { day: 'Wed', minutes: 62 },
  { day: 'Thu', minutes: 95 },
  { day: 'Fri', minutes: 120 },
  { day: 'Sat', minutes: 145 },
  { day: 'Sun', minutes: 98 },
];

function formatMinutes(minutes) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours > 0) {
    return `${hours}h ${mins}m`;
  }
  return `${mins}m`;
}

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('month');
  const maxMinutes = Math.max(...mockListeningActivity.map(d => d.minutes));

  return (
    <div className="space-y-8 pb-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold"
          >
            Your Listening Stats
          </motion.h1>
          <p className="text-dhwani-muted mt-1">Track your music journey</p>
        </div>

        {/* Time Range Selector */}
        <div className="flex gap-2 bg-dhwani-surface rounded-xl p-1">
          {timeRanges.map((range) => (
            <button
              key={range.id}
              onClick={() => setTimeRange(range.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                timeRange === range.id
                  ? 'bg-dhwani-accent text-white'
                  : 'text-dhwani-muted hover:text-dhwani-text'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Minutes Listened', value: formatMinutes(mockStats.totalMinutes), icon: RiTimeLine, color: 'from-purple-500 to-purple-600' },
          { label: 'Tracks Played', value: mockStats.tracksPlayed.toLocaleString(), icon: RiMusicLine, color: 'from-pink-500 to-pink-600' },
          { label: 'Artists Discovered', value: mockStats.artistsDiscovered, icon: RiUserLine, color: 'from-blue-500 to-blue-600' },
          { label: 'Playlists Created', value: mockStats.playlistsCreated, icon: RiBarChartBoxLine, color: 'from-amber-500 to-amber-600' },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`card p-5 bg-gradient-to-br ${stat.color}`}
          >
            <stat.icon className="text-2xl text-white/80 mb-3" />
            <p className="text-3xl font-bold text-white">{stat.value}</p>
            <p className="text-sm text-white/70">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Listening Activity Chart */}
      <section className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Listening Activity</h2>
          <div className="flex items-center gap-2 text-sm text-dhwani-muted">
            <RiCalendarLine />
            <span>Last 7 days</span>
          </div>
        </div>
        <div className="flex items-end justify-between gap-2 h-40">
          {mockListeningActivity.map((day, index) => (
            <motion.div
              key={day.day}
              initial={{ height: 0 }}
              animate={{ height: `${(day.minutes / maxMinutes) * 100}%` }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="flex-1 flex flex-col items-center"
            >
              <div
                className="w-full bg-gradient-to-t from-dhwani-accent to-dhwani-accent2 rounded-t-lg relative group cursor-pointer"
                style={{ height: '100%' }}
              >
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-dhwani-surface rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {day.minutes} min
                </div>
              </div>
              <span className="text-xs text-dhwani-muted mt-2">{day.day}</span>
            </motion.div>
          ))}
        </div>
      </section>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Top Tracks */}
        <section className="card p-6">
          <h2 className="text-xl font-bold mb-4">Top Tracks</h2>
          <div className="space-y-3">
            {mockTopTracks.map((track, index) => (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-4 p-2 rounded-lg hover:bg-dhwani-surface-light transition-colors group cursor-pointer"
              >
                <span className="w-6 text-center font-bold text-dhwani-muted">{track.rank}</span>
                <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                  <img src={track.coverImage} alt={track.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{track.title}</p>
                  <p className="text-sm text-dhwani-muted truncate">{track.artist}</p>
                </div>
                <div className="flex items-center gap-2">
                  {track.change === 'up' && <RiArrowUpLine className="text-green-500" />}
                  {track.change === 'down' && <RiArrowDownLine className="text-red-500" />}
                  <span className="text-sm text-dhwani-muted">{track.plays} plays</span>
                </div>
                <button className="w-8 h-8 bg-dhwani-accent rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <RiPlayFill className="text-white text-sm" />
                </button>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Top Artists */}
        <section className="card p-6">
          <h2 className="text-xl font-bold mb-4">Top Artists</h2>
          <div className="space-y-3">
            {mockTopArtists.map((artist, index) => (
              <motion.div
                key={artist.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-4 p-2 rounded-lg hover:bg-dhwani-surface-light transition-colors group cursor-pointer"
              >
                <span className="w-6 text-center font-bold text-dhwani-muted">{artist.rank}</span>
                <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <img src={artist.avatar} alt={artist.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{artist.name}</p>
                  <p className="text-sm text-dhwani-muted">{artist.plays} plays</p>
                </div>
                <button className="w-8 h-8 bg-dhwani-accent rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <RiPlayFill className="text-white text-sm" />
                </button>
              </motion.div>
            ))}
          </div>
          <Link to="/artists" className="block text-center mt-4 text-sm text-dhwani-accent hover:underline">
            See all artists
          </Link>
        </section>
      </div>

      {/* Top Genres */}
      <section className="card p-6">
        <h2 className="text-xl font-bold mb-6">Top Genres</h2>
        <div className="flex gap-4 mb-6">
          {mockTopGenres.map((genre, index) => (
            <motion.div
              key={genre.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="flex-1 text-center"
            >
              <div className="relative w-24 h-24 mx-auto mb-3">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-dhwani-surface-light"
                  />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    strokeLinecap="round"
                    className={genre.color.replace('bg-', 'text-')}
                    initial={{ strokeDasharray: '0 251.2' }}
                    animate={{ strokeDasharray: `${genre.percentage * 2.512} 251.2` }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center font-bold">
                  {genre.percentage}%
                </span>
              </div>
              <p className="font-medium">{genre.name}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
