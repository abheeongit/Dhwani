import { Router } from 'express';
import prisma from '../lib/prisma.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.use(authenticate);

// Get user listening stats
router.get('/stats', async (req, res, next) => {
  try {
    const userId = req.user.id;

    // Total listening time
    const totalListening = await prisma.listeningHistory.aggregate({
      where: { userId },
      _sum: { listenDuration: true },
      _count: true
    });

    // Liked songs count
    const likedCount = await prisma.likedTrack.count({
      where: { userId }
    });

    // Playlists count
    const playlistCount = await prisma.playlist.count({
      where: { userId }
    });

    // Following count
    const followingCount = await prisma.followedArtist.count({
      where: { userId }
    });

    res.json({
      totalListeningTime: totalListening._sum.listenDuration || 0,
      totalPlays: totalListening._count,
      likedSongs: likedCount,
      playlists: playlistCount,
      followingArtists: followingCount
    });
  } catch (error) {
    next(error);
  }
});

// Get top genres
router.get('/top-genres', async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { period = '30d' } = req.query;

    const days = period === '7d' ? 7 : period === '30d' ? 30 : 365;
    const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

    const history = await prisma.listeningHistory.findMany({
      where: {
        userId,
        playedAt: { gte: since }
      },
      include: {
        track: {
          include: {
            genre: true
          }
        }
      }
    });

    const genreStats = {};
    history.forEach(h => {
      if (h.track.genre) {
        const genreId = h.track.genre.id;
        if (!genreStats[genreId]) {
          genreStats[genreId] = {
            genre: h.track.genre,
            plays: 0,
            duration: 0
          };
        }
        genreStats[genreId].plays++;
        genreStats[genreId].duration += h.listenDuration || 0;
      }
    });

    const topGenres = Object.values(genreStats)
      .sort((a, b) => b.plays - a.plays)
      .slice(0, 10);

    res.json({ topGenres, period });
  } catch (error) {
    next(error);
  }
});

// Get top artists
router.get('/top-artists', async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { period = '30d' } = req.query;

    const days = period === '7d' ? 7 : period === '30d' ? 30 : 365;
    const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

    const history = await prisma.listeningHistory.findMany({
      where: {
        userId,
        playedAt: { gte: since }
      },
      include: {
        track: {
          include: {
            artist: true
          }
        }
      }
    });

    const artistStats = {};
    history.forEach(h => {
      const artistId = h.track.artistId;
      if (!artistStats[artistId]) {
        artistStats[artistId] = {
          artist: h.track.artist,
          plays: 0,
          duration: 0
        };
      }
      artistStats[artistId].plays++;
      artistStats[artistId].duration += h.listenDuration || 0;
    });

    const topArtists = Object.values(artistStats)
      .sort((a, b) => b.plays - a.plays)
      .slice(0, 10);

    res.json({ topArtists, period });
  } catch (error) {
    next(error);
  }
});

// Get top tracks
router.get('/top-tracks', async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { period = '30d' } = req.query;

    const days = period === '7d' ? 7 : period === '30d' ? 30 : 365;
    const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

    const history = await prisma.listeningHistory.findMany({
      where: {
        userId,
        playedAt: { gte: since }
      },
      include: {
        track: {
          include: {
            artist: true,
            album: true
          }
        }
      }
    });

    const trackStats = {};
    history.forEach(h => {
      const trackId = h.trackId;
      if (!trackStats[trackId]) {
        trackStats[trackId] = {
          track: h.track,
          plays: 0,
          duration: 0
        };
      }
      trackStats[trackId].plays++;
      trackStats[trackId].duration += h.listenDuration || 0;
    });

    const topTracks = Object.values(trackStats)
      .sort((a, b) => b.plays - a.plays)
      .slice(0, 20);

    res.json({ topTracks, period });
  } catch (error) {
    next(error);
  }
});

// Get listening activity by day/hour
router.get('/activity', async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { period = '30d' } = req.query;

    const days = period === '7d' ? 7 : period === '30d' ? 30 : 365;
    const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

    const history = await prisma.listeningHistory.findMany({
      where: {
        userId,
        playedAt: { gte: since }
      },
      select: {
        playedAt: true,
        listenDuration: true
      },
      orderBy: { playedAt: 'asc' }
    });

    // Group by day
    const dailyActivity = {};
    history.forEach(h => {
      const day = h.playedAt.toISOString().split('T')[0];
      if (!dailyActivity[day]) {
        dailyActivity[day] = { plays: 0, duration: 0 };
      }
      dailyActivity[day].plays++;
      dailyActivity[day].duration += h.listenDuration || 0;
    });

    // Group by hour
    const hourlyActivity = Array(24).fill(null).map(() => ({ plays: 0, duration: 0 }));
    history.forEach(h => {
      const hour = h.playedAt.getHours();
      hourlyActivity[hour].plays++;
      hourlyActivity[hour].duration += h.listenDuration || 0;
    });

    res.json({
      dailyActivity: Object.entries(dailyActivity).map(([date, data]) => ({
        date,
        ...data
      })),
      hourlyActivity: hourlyActivity.map((data, hour) => ({
        hour,
        ...data
      })),
      period
    });
  } catch (error) {
    next(error);
  }
});

export default router;
