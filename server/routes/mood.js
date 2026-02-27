import { Router } from 'express';
import prisma from '../lib/prisma.js';
import { authenticate, optionalAuth } from '../middleware/auth.js';

const router = Router();

// Predefined moods with associated characteristics
const MOOD_PROFILES = {
  happy: {
    name: 'Happy',
    emoji: '😊',
    description: 'Upbeat and cheerful tracks',
    keywords: ['happy', 'upbeat', 'cheerful', 'joyful', 'fun']
  },
  sad: {
    name: 'Sad',
    emoji: '😢',
    description: 'Emotional and melancholic songs',
    keywords: ['sad', 'melancholic', 'emotional', 'heartbreak', 'ballad']
  },
  energetic: {
    name: 'Energetic',
    emoji: '⚡',
    description: 'High-energy workout music',
    keywords: ['energetic', 'workout', 'pump', 'gym', 'hype']
  },
  relaxed: {
    name: 'Relaxed',
    emoji: '😌',
    description: 'Calm and soothing vibes',
    keywords: ['relaxed', 'calm', 'chill', 'peaceful', 'ambient']
  },
  focused: {
    name: 'Focused',
    emoji: '🎯',
    description: 'Music for concentration',
    keywords: ['focus', 'study', 'work', 'concentration', 'instrumental']
  },
  romantic: {
    name: 'Romantic',
    emoji: '💕',
    description: 'Love songs and romantic melodies',
    keywords: ['romantic', 'love', 'romance', 'intimate', 'slow']
  },
  party: {
    name: 'Party',
    emoji: '🎉',
    description: 'Dance and party anthems',
    keywords: ['party', 'dance', 'club', 'edm', 'electronic']
  },
  sleepy: {
    name: 'Sleepy',
    emoji: '😴',
    description: 'Relaxing sleep music',
    keywords: ['sleep', 'bedtime', 'lullaby', 'ambient', 'soft']
  }
};

// Get available moods
router.get('/moods', async (req, res) => {
  const moods = Object.entries(MOOD_PROFILES).map(([key, value]) => ({
    id: key,
    ...value
  }));

  res.json({ moods });
});

// Get mood-based playlist
router.get('/:mood', optionalAuth, async (req, res, next) => {
  try {
    const { mood } = req.params;
    const { limit = 30 } = req.query;

    const moodProfile = MOOD_PROFILES[mood];
    if (!moodProfile) {
      return res.status(404).json({ message: 'Mood not found' });
    }

    // Find tracks matching mood keywords
    // In a real app, you'd have mood tags on tracks
    // Here we'll search by genre and randomize
    const tracks = await prisma.track.findMany({
      include: {
        artist: { select: { id: true, name: true, avatar: true } },
        album: { select: { id: true, title: true, coverImage: true } },
        genre: true,
        ...(req.user ? {
          likedBy: {
            where: { userId: req.user.id },
            select: { id: true }
          }
        } : {})
      },
      take: parseInt(limit) * 2
    });

    // Shuffle and limit
    const shuffled = tracks.sort(() => Math.random() - 0.5).slice(0, parseInt(limit));

    const formattedTracks = shuffled.map(t => ({
      ...t,
      isLiked: req.user ? t.likedBy?.length > 0 : false,
      likedBy: undefined
    }));

    res.json({
      mood: { id: mood, ...moodProfile },
      tracks: formattedTracks
    });
  } catch (error) {
    next(error);
  }
});

// Generate personalized mood playlist based on user history
router.get('/:mood/personalized', authenticate, async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { mood } = req.params;
    const { limit = 30 } = req.query;

    const moodProfile = MOOD_PROFILES[mood];
    if (!moodProfile) {
      return res.status(404).json({ message: 'Mood not found' });
    }

    // Get user's listening history
    const history = await prisma.listeningHistory.findMany({
      where: { userId },
      include: {
        track: {
          include: {
            artist: true,
            genre: true
          }
        }
      },
      orderBy: { playedAt: 'desc' },
      take: 100
    });

    // Get frequently listened artist IDs
    const artistCounts = {};
    history.forEach(h => {
      const artistId = h.track.artistId;
      artistCounts[artistId] = (artistCounts[artistId] || 0) + 1;
    });

    const topArtistIds = Object.entries(artistCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([id]) => id);

    // Get tracks from liked artists
    let tracks = [];
    if (topArtistIds.length > 0) {
      tracks = await prisma.track.findMany({
        where: {
          artistId: { in: topArtistIds }
        },
        include: {
          artist: { select: { id: true, name: true, avatar: true } },
          album: { select: { id: true, title: true, coverImage: true } },
          likedBy: {
            where: { userId },
            select: { id: true }
          }
        },
        take: parseInt(limit) * 2
      });
    }

    // If not enough, supplement with general tracks
    if (tracks.length < parseInt(limit)) {
      const additional = await prisma.track.findMany({
        where: {
          id: { notIn: tracks.map(t => t.id) }
        },
        include: {
          artist: { select: { id: true, name: true, avatar: true } },
          album: { select: { id: true, title: true, coverImage: true } },
          likedBy: {
            where: { userId },
            select: { id: true }
          }
        },
        take: parseInt(limit) - tracks.length
      });
      tracks = [...tracks, ...additional];
    }

    // Shuffle and format
    const shuffled = tracks.sort(() => Math.random() - 0.5).slice(0, parseInt(limit));

    const formattedTracks = shuffled.map(t => ({
      ...t,
      isLiked: t.likedBy?.length > 0,
      likedBy: undefined
    }));

    res.json({
      mood: { id: mood, ...moodProfile },
      personalized: true,
      tracks: formattedTracks
    });
  } catch (error) {
    next(error);
  }
});

// Save mood playlist
router.post('/:mood/save', authenticate, async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { mood } = req.params;
    const { trackIds } = req.body;

    const moodProfile = MOOD_PROFILES[mood];
    if (!moodProfile) {
      return res.status(404).json({ message: 'Mood not found' });
    }

    // Create playlist
    const playlist = await prisma.playlist.create({
      data: {
        title: `${moodProfile.name} ${moodProfile.emoji} Mix`,
        description: moodProfile.description,
        userId,
        isPublic: false,
        tracks: {
          create: trackIds.map((trackId, index) => ({
            trackId,
            position: index
          }))
        }
      },
      include: {
        _count: { select: { tracks: true } }
      }
    });

    res.status(201).json({ playlist });
  } catch (error) {
    next(error);
  }
});

export default router;
