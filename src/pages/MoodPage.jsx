import { useState } from 'react';
import { motion } from 'framer-motion';
import { RiEmotionHappyLine, RiEmotionSadLine, RiZzzLine, RiFireLine, RiMoonLine, RiSunLine, RiHeartLine, RiMusic2Line, RiPlayFill, RiRefreshLine, RiSparklingLine } from 'react-icons/ri';
import { PlaylistCard, TrackRow } from '../components';
import { usePlayerStore } from '../stores/playerStore';

const moods = [
  { id: 'happy', name: 'Happy', icon: RiEmotionHappyLine, color: 'from-yellow-400 to-orange-500', description: 'Upbeat and cheerful vibes' },
  { id: 'sad', name: 'Sad', icon: RiEmotionSadLine, color: 'from-blue-400 to-indigo-500', description: 'Melancholic melodies' },
  { id: 'calm', name: 'Calm', icon: RiZzzLine, color: 'from-cyan-400 to-teal-500', description: 'Peaceful and relaxing' },
  { id: 'energetic', name: 'Energetic', icon: RiFireLine, color: 'from-red-400 to-pink-500', description: 'High energy beats' },
  { id: 'romantic', name: 'Romantic', icon: RiHeartLine, color: 'from-pink-400 to-rose-500', description: 'Love songs and ballads' },
  { id: 'focus', name: 'Focus', icon: RiMoonLine, color: 'from-purple-400 to-violet-500', description: 'Concentration music' },
  { id: 'party', name: 'Party', icon: RiMusic2Line, color: 'from-fuchsia-400 to-purple-500', description: 'Dance floor anthems' },
  { id: 'morning', name: 'Morning', icon: RiSunLine, color: 'from-amber-400 to-yellow-500', description: 'Start your day right' },
];

const moodPlaylists = {
  happy: [
    { id: '1', title: 'Kesariya', duration: 268, artist: { name: 'Arijit Singh' }, album: { coverImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300' } },
    { id: '2', title: 'Kar Gayi Chull', duration: 198, artist: { name: 'Badshah' }, album: { coverImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300' } },
    { id: '3', title: 'Gallan Goodiyaan', duration: 312, artist: { name: 'Various' }, album: { coverImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300' } },
  ],
  sad: [
    { id: '4', title: 'Tum Hi Ho', duration: 262, artist: { name: 'Arijit Singh' }, album: { coverImage: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300' } },
    { id: '5', title: 'Channa Mereya', duration: 289, artist: { name: 'Arijit Singh' }, album: { coverImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300' } },
    { id: '6', title: 'Agar Tum Saath Ho', duration: 341, artist: { name: 'Arijit Singh' }, album: { coverImage: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300' } },
  ],
  energetic: [
    { id: '7', title: 'Kala Chashma', duration: 198, artist: { name: 'Badshah' }, album: { coverImage: 'https://images.unsplash.com/photo-1571266028243-e4733b0f0bb0?w=300' } },
    { id: '8', title: 'Chaiyya Chaiyya', duration: 365, artist: { name: 'Sukhwinder Singh' }, album: { coverImage: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=300' } },
    { id: '9', title: 'Jai Ho', duration: 312, artist: { name: 'A.R. Rahman' }, album: { coverImage: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=300' } },
  ],
};

const recentMoodMixes = [
  { id: '1', title: 'Your Happy Mix', description: 'Based on your listening', coverImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400', _count: { tracks: 25 }, mood: 'happy' },
  { id: '2', title: 'Chill Evening', description: 'Wind down playlist', coverImage: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400', _count: { tracks: 30 }, mood: 'calm' },
  { id: '3', title: 'Workout Power', description: 'High energy tracks', coverImage: 'https://images.unsplash.com/photo-1571266028243-e4733b0f0bb0?w=400', _count: { tracks: 20 }, mood: 'energetic' },
];

export default function MoodPage() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { playTrack } = usePlayerStore();

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
    setIsGenerating(true);
    // Simulate API call
    setTimeout(() => setIsGenerating(false), 1500);
  };

  const handlePlayMix = () => {
    const tracks = moodPlaylists[selectedMood.id] || moodPlaylists.happy;
    if (tracks.length > 0) {
      playTrack(tracks[0], tracks);
    }
  };

  const handleRegenerate = () => {
    setIsGenerating(true);
    setTimeout(() => setIsGenerating(false), 1500);
  };

  return (
    <div className="space-y-10 pb-8">
      {/* Header */}
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-dhwani-accent/20 to-dhwani-accent2/20 rounded-full mb-4"
        >
          <RiSparklingLine className="text-dhwani-accent" />
          <span className="text-sm font-medium">AI-Powered</span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-4xl font-bold mb-2"
        >
          Whats your mood?
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-dhwani-muted"
        >
          Select a mood and well create the perfect playlist for you
        </motion.p>
      </div>

      {/* Mood Grid */}
      <section>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {moods.map((mood, index) => (
            <motion.button
              key={mood.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.03, y: -5 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleMoodSelect(mood)}
              className={`relative p-6 rounded-2xl bg-gradient-to-br ${mood.color} text-white text-left overflow-hidden group ${
                selectedMood?.id === mood.id ? 'ring-4 ring-white/50' : ''
              }`}
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mt-10 -mr-10 group-hover:scale-150 transition-transform duration-500" />
              <mood.icon className="text-3xl mb-3" />
              <p className="font-bold text-lg">{mood.name}</p>
              <p className="text-sm text-white/80">{mood.description}</p>
            </motion.button>
          ))}
        </div>
      </section>

      {/* Generated Mix */}
      {selectedMood && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${selectedMood.color} flex items-center justify-center`}>
                <selectedMood.icon className="text-3xl text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Your {selectedMood.name} Mix</h2>
                <p className="text-dhwani-muted">Personalized for you</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleRegenerate}
                disabled={isGenerating}
                className="p-3 rounded-full border border-dhwani-surface-light hover:bg-dhwani-surface-light transition-colors disabled:opacity-50"
              >
                <RiRefreshLine className={isGenerating ? 'animate-spin' : ''} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePlayMix}
                disabled={isGenerating}
                className="w-12 h-12 bg-dhwani-accent rounded-full flex items-center justify-center shadow-lg shadow-dhwani-accent/30 disabled:opacity-50"
              >
                <RiPlayFill className="text-xl text-white" />
              </motion.button>
            </div>
          </div>

          {isGenerating ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-16 h-16 rounded-full border-4 border-dhwani-accent/20 border-t-dhwani-accent animate-spin mb-4" />
              <p className="text-dhwani-muted">Creating your perfect mix...</p>
            </div>
          ) : (
            <div className="space-y-2">
              {(moodPlaylists[selectedMood.id] || moodPlaylists.happy).map((track, index) => (
                <TrackRow key={track.id} track={track} index={index} />
              ))}
            </div>
          )}
        </motion.section>
      )}

      {/* Recent Mood Mixes */}
      <section>
        <h2 className="text-xl font-bold mb-6">Your Recent Mood Mixes</h2>
        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
          {recentMoodMixes.map((playlist, index) => (
            <motion.div
              key={playlist.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -5 }}
              className="cursor-pointer group w-44 flex-shrink-0"
            >
              <div className="relative mb-3">
                <div className="aspect-square rounded-xl overflow-hidden bg-dhwani-surface-light shadow-lg group-hover:shadow-xl transition-shadow">
                  <img
                    src={playlist.coverImage}
                    alt={playlist.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${moods.find(m => m.id === playlist.mood)?.color || 'from-purple-500'} opacity-30`} />
                </div>
                <button className="absolute bottom-2 right-2 w-10 h-10 bg-dhwani-accent rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 shadow-lg transition-opacity">
                  <RiPlayFill className="text-white" />
                </button>
              </div>
              <p className="font-medium truncate">{playlist.title}</p>
              <p className="text-sm text-dhwani-muted truncate">{playlist.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Mood Statistics */}
      <section className="card p-6">
        <h2 className="text-xl font-bold mb-6">Your Mood Trends</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { mood: 'Happy', percentage: 35, color: 'bg-yellow-500' },
            { mood: 'Energetic', percentage: 25, color: 'bg-red-500' },
            { mood: 'Calm', percentage: 20, color: 'bg-cyan-500' },
            { mood: 'Romantic', percentage: 20, color: 'bg-pink-500' },
          ].map((stat, index) => (
            <motion.div
              key={stat.mood}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 bg-dhwani-surface-light/50 rounded-xl"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-dhwani-muted">{stat.mood}</span>
                <span className="font-bold">{stat.percentage}%</span>
              </div>
              <div className="h-2 bg-dhwani-bg rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${stat.percentage}%` }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                  className={`h-full ${stat.color} rounded-full`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
