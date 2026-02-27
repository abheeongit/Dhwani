import { useState } from 'react';
import { motion } from 'framer-motion';
import { RiSearchLine, RiCloseLine, RiPlayFill, RiFireLine, RiHistoryLine, RiMusicLine, RiAlbumLine, RiUserLine, RiPlayListLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { TrackRow, ArtistCard, PlaylistCard } from '../components';
import { usePlayerStore } from '../stores/playerStore';

const genres = [
  { id: '1', name: 'Bollywood', color: 'from-pink-500 to-pink-600', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400' },
  { id: '2', name: 'Indie', color: 'from-orange-500 to-yellow-500', image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400' },
  { id: '3', name: 'Hip-Hop', color: 'from-purple-500 to-purple-700', image: 'https://images.unsplash.com/photo-1571266028243-e4733b0f0bb0?w=400' },
  { id: '4', name: 'Classical', color: 'from-amber-500 to-amber-700', image: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=400' },
  { id: '5', name: 'EDM', color: 'from-cyan-400 to-blue-500', image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400' },
  { id: '6', name: 'Sufi', color: 'from-emerald-500 to-emerald-700', image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400' },
  { id: '7', name: 'Pop', color: 'from-rose-400 to-rose-600', image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400' },
  { id: '8', name: 'Rock', color: 'from-slate-600 to-slate-800', image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400' },
];

const mockTrendingSearches = ['Arijit Singh', 'Kesariya', 'Party Songs', 'Sad Songs', '90s Bollywood'];

const mockResults = {
  tracks: [
    { id: '1', title: 'Kesariya', duration: 268, plays: 180000000, artist: { id: '1', name: 'Arijit Singh' }, album: { id: '1', title: 'Brahmastra', coverImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300' } },
    { id: '2', title: 'Tum Hi Ho', duration: 262, plays: 150000000, artist: { id: '1', name: 'Arijit Singh' }, album: { id: '4', title: 'Aashiqui 2', coverImage: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300' } },
    { id: '3', title: 'Channa Mereya', duration: 289, plays: 170000000, artist: { id: '1', name: 'Arijit Singh' }, album: { id: '5', title: 'Ae Dil Hai Mushkil', coverImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300' } },
  ],
  artists: [
    { id: '1', name: 'Arijit Singh', avatar: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300', monthlyListeners: 45000000, verified: true },
  ],
  playlists: [
    { id: '1', title: 'Best of Arijit Singh', description: 'All time hits', coverImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400', _count: { tracks: 50 } },
  ],
};

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [recentSearches, setRecentSearches] = useState(['Tujhe Kitna Chahne Lage', 'Neha Kakkar']);
  const { playTrack } = usePlayerStore();

  const hasResults = query.length > 0;
  const filters = [
    { id: 'all', label: 'All', icon: RiSearchLine },
    { id: 'tracks', label: 'Songs', icon: RiMusicLine },
    { id: 'artists', label: 'Artists', icon: RiUserLine },
    { id: 'albums', label: 'Albums', icon: RiAlbumLine },
    { id: 'playlists', label: 'Playlists', icon: RiPlayListLine },
  ];

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  const clearSearch = () => {
    setQuery('');
  };

  const handleRecentClick = (term) => {
    setQuery(term);
  };

  const removeRecent = (term) => {
    setRecentSearches(prev => prev.filter(s => s !== term));
  };

  return (
    <div className="space-y-8 pb-8">
      {/* Search Header */}
      <div className="sticky top-0 z-20 bg-dhwani-bg/80 backdrop-blur-xl -mx-6 px-6 pt-2 pb-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative"
        >
          <RiSearchLine className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-dhwani-muted" />
          <input
            type="text"
            value={query}
            onChange={handleSearch}
            placeholder="What do you want to listen to?"
            className="w-full pl-12 pr-12 py-4 bg-dhwani-surface border border-dhwani-surface-light rounded-2xl text-lg focus:border-dhwani-accent focus:ring-2 focus:ring-dhwani-accent/20 outline-none transition-all"
            autoFocus
          />
          {query && (
            <button
              onClick={clearSearch}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-dhwani-surface-light rounded-full transition-colors"
            >
              <RiCloseLine className="text-xl text-dhwani-muted" />
            </button>
          )}
        </motion.div>

        {/* Filters */}
        {hasResults && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-2 mt-4 overflow-x-auto scrollbar-hide"
          >
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeFilter === filter.id
                    ? 'bg-dhwani-accent text-white'
                    : 'bg-dhwani-surface hover:bg-dhwani-surface-light'
                }`}
              >
                <filter.icon className="text-lg" />
                {filter.label}
              </button>
            ))}
          </motion.div>
        )}
      </div>

      {/* Content */}
      {!hasResults ? (
        <>
          {/* Recent Searches */}
          {recentSearches.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-4">
                <RiHistoryLine className="text-dhwani-muted" />
                <h2 className="font-semibold">Recent searches</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((term) => (
                  <div
                    key={term}
                    className="group flex items-center gap-2 px-4 py-2 bg-dhwani-surface rounded-full cursor-pointer hover:bg-dhwani-surface-light transition-colors"
                  >
                    <span onClick={() => handleRecentClick(term)}>{term}</span>
                    <button
                      onClick={() => removeRecent(term)}
                      className="opacity-0 group-hover:opacity-100 p-0.5 hover:bg-dhwani-muted/20 rounded-full transition-opacity"
                    >
                      <RiCloseLine className="text-sm" />
                    </button>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Trending Searches */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <RiFireLine className="text-dhwani-accent3" />
              <h2 className="font-semibold">Trending searches</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {mockTrendingSearches.map((term, index) => (
                <motion.button
                  key={term}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleRecentClick(term)}
                  className="px-4 py-2 bg-gradient-to-r from-dhwani-accent/10 to-dhwani-accent2/10 border border-dhwani-accent/20 rounded-full text-sm hover:bg-dhwani-accent/20 transition-colors"
                >
                  {term}
                </motion.button>
              ))}
            </div>
          </section>

          {/* Browse Genres */}
          <section>
            <h2 className="text-xl font-bold mb-6">Browse all</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {genres.map((genre, index) => (
                <motion.div
                  key={genre.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                  className={`relative aspect-[3/2] rounded-xl overflow-hidden cursor-pointer bg-gradient-to-br ${genre.color}`}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
                  <img
                    src={genre.image}
                    alt={genre.name}
                    className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50"
                  />
                  <div className="absolute bottom-0 left-0 p-4">
                    <h3 className="text-lg font-bold text-white">{genre.name}</h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </>
      ) : (
        /* Search Results */
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-8"
        >
          {/* Top Result */}
          {(activeFilter === 'all' || activeFilter === 'artists') && mockResults.artists.length > 0 && (
            <section className="grid md:grid-cols-[1fr_2fr] gap-6">
              <div>
                <h2 className="font-semibold mb-4">Top result</h2>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-5 bg-dhwani-surface rounded-xl group cursor-pointer hover:bg-dhwani-surface-light transition-all"
                >
                  <div className="relative w-24 h-24 mb-4">
                    <img
                      src={mockResults.artists[0].avatar}
                      alt={mockResults.artists[0].name}
                      className="w-full h-full rounded-full object-cover shadow-lg"
                    />
                  </div>
                  <h3 className="text-2xl font-bold mb-1">{mockResults.artists[0].name}</h3>
                  <p className="text-sm text-dhwani-muted">Artist</p>
                  <button className="absolute bottom-5 right-5 w-12 h-12 bg-dhwani-accent rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 shadow-lg shadow-dhwani-accent/30 transition-opacity">
                    <RiPlayFill className="text-xl text-white" />
                  </button>
                </motion.div>
              </div>

              {/* Songs */}
              <div>
                <h2 className="font-semibold mb-4">Songs</h2>
                <div className="card p-4">
                  {mockResults.tracks.slice(0, 4).map((track, index) => (
                    <TrackRow key={track.id} track={track} index={index} />
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* All Tracks */}
          {activeFilter === 'tracks' && (
            <section>
              <h2 className="font-semibold mb-4">Songs</h2>
              <div className="card p-4">
                {mockResults.tracks.map((track, index) => (
                  <TrackRow key={track.id} track={track} index={index} />
                ))}
              </div>
            </section>
          )}

          {/* Artists */}
          {(activeFilter === 'all' || activeFilter === 'artists') && (
            <section>
              <h2 className="font-semibold mb-4">Artists</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {mockResults.artists.map((artist, index) => (
                  <ArtistCard key={artist.id} artist={artist} index={index} />
                ))}
              </div>
            </section>
          )}

          {/* Playlists */}
          {(activeFilter === 'all' || activeFilter === 'playlists') && (
            <section>
              <h2 className="font-semibold mb-4">Playlists</h2>
              <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
                {mockResults.playlists.map((playlist, index) => (
                  <PlaylistCard key={playlist.id} playlist={playlist} index={index} />
                ))}
              </div>
            </section>
          )}
        </motion.div>
      )}
    </div>
  );
}
