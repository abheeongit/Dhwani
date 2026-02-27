/** Mock data used across the frontend while backend is not connected */

export const mockUser = {
  id: '1',
  name: 'Alex Morgan',
  email: 'alex@dhwani.app',
  avatar: null,
  plan: 'Premium',
  role: 'user',
}

export const mockTracks = Array.from({ length: 20 }, (_, i) => ({
  id: `t${i + 1}`,
  title: [
    'Ocean Drive', 'Midnight Sun', 'Neon Rain', 'Crystal Waves',
    'Lunar Echo', 'Velvet Haze', 'Ember Glow', 'Solar Flare',
    'Arctic Bloom', 'Horizon', 'Deep Current', 'Starfall',
    'Pulse', 'Afterglow', 'Drift', 'Cascade',
    'Radiance', 'Echo Chamber', 'Silhouette', 'Reverie',
  ][i],
  artist: [
    'Neon Dreams', 'Aurora', 'Synth Collective', 'Waveshaper',
    'Lunar Tide', 'Glass Fauna', 'Ember Hearts', 'Solar Drift',
    'Frost', 'Horizon', 'Deep Current', 'Starfall',
    'Pulse', 'Afterglow', 'Drift', 'Cascade',
    'Radiance', 'Echo Chamber', 'Silhouette', 'Reverie',
  ][i],
  album: `Album ${Math.ceil((i + 1) / 4)}`,
  duration: 180 + Math.floor(Math.random() * 120),
  liked: i % 3 === 0,
  coverSeed: i,
}))

export const mockPlaylists = Array.from({ length: 8 }, (_, i) => ({
  id: `pl${i + 1}`,
  title: [
    'Chill Vibes', 'Deep Focus', 'Night Drive', 'Morning Energy',
    'Indie Discovery', 'Lo-fi Beats', 'Synthwave Mix', 'Acoustic Sessions',
  ][i],
  description: 'A curated collection of tracks for your mood.',
  trackCount: 12 + i * 3,
  coverSeed: i + 20,
  tracks: mockTracks.slice(i * 2, i * 2 + 6),
}))

export const mockArtists = Array.from({ length: 6 }, (_, i) => ({
  id: `a${i + 1}`,
  name: [
    'Neon Dreams', 'Aurora', 'Synth Collective',
    'Glass Fauna', 'Ember Hearts', 'Waveshaper',
  ][i],
  followers: (1200 + i * 800).toLocaleString(),
  bio: 'Creating immersive sonic landscapes since 2020.',
  coverSeed: i + 40,
  topTracks: mockTracks.slice(i * 3, i * 3 + 5),
}))

export const mockFriends = Array.from({ length: 5 }, (_, i) => ({
  id: `f${i + 1}`,
  name: ['Jordan Lee', 'Sam Rivera', 'Taylor Chen', 'Morgan Blake', 'Casey Patel'][i],
  avatar: null,
  currentlyPlaying: i < 3 ? mockTracks[i * 4] : null,
  online: i < 4,
}))

export const mockFriendRequests = [
  { id: 'fr1', name: 'Riley Quinn', avatar: null },
  { id: 'fr2', name: 'Devon Park', avatar: null },
]

export const mockAnalytics = {
  listeningHours: [
    { day: 'Mon', hours: 2.5 },
    { day: 'Tue', hours: 1.8 },
    { day: 'Wed', hours: 3.2 },
    { day: 'Thu', hours: 2.1 },
    { day: 'Fri', hours: 4.0 },
    { day: 'Sat', hours: 5.2 },
    { day: 'Sun', hours: 3.6 },
  ],
  topGenres: [
    { genre: 'Electronic', pct: 32 },
    { genre: 'Indie', pct: 24 },
    { genre: 'Lo-fi', pct: 18 },
    { genre: 'Synthwave', pct: 14 },
    { genre: 'Acoustic', pct: 12 },
  ],
  topArtists: mockArtists.slice(0, 5).map((a, i) => ({
    ...a,
    plays: 120 - i * 18,
  })),
  moodDistribution: [
    { mood: 'Chill', value: 35 },
    { mood: 'Energetic', value: 25 },
    { mood: 'Focus', value: 20 },
    { mood: 'Melancholic', value: 12 },
    { mood: 'Upbeat', value: 8 },
  ],
}
