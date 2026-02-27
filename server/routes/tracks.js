import { Router } from 'express';
import prisma from '../lib/prisma.js';
import { authenticate, optionalAuth } from '../middleware/auth.js';

const router = Router();

// Get all tracks (paginated)
router.get('/', optionalAuth, async (req, res, next) => {
  try {
    const { page = 1, limit = 20, genre, sort = 'plays' } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const where = genre ? { genre: { name: genre } } : {};
    
    const [tracks, total] = await Promise.all([
      prisma.track.findMany({
        where,
        include: {
          artist: { select: { id: true, name: true, avatar: true } },
          album: { select: { id: true, title: true, coverImage: true } },
          genre: { select: { id: true, name: true, color: true } },
          ...(req.user ? {
            likedBy: {
              where: { userId: req.user.id },
              select: { id: true }
            }
          } : {})
        },
        orderBy: sort === 'recent' ? { createdAt: 'desc' } : { plays: 'desc' },
        skip,
        take: parseInt(limit)
      }),
      prisma.track.count({ where })
    ]);

    res.json({
      tracks: tracks.map(t => ({
        ...t,
        isLiked: req.user ? t.likedBy?.length > 0 : false,
        likedBy: undefined
      })),
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    next(error);
  }
});

// Get trending tracks
router.get('/trending', optionalAuth, async (req, res, next) => {
  try {
    const tracks = await prisma.track.findMany({
      include: {
        artist: { select: { id: true, name: true, avatar: true } },
        album: { select: { id: true, title: true, coverImage: true } },
        ...(req.user ? {
          likedBy: {
            where: { userId: req.user.id },
            select: { id: true }
          }
        } : {})
      },
      orderBy: { plays: 'desc' },
      take: 20
    });

    res.json({
      tracks: tracks.map(t => ({
        ...t,
        isLiked: req.user ? t.likedBy?.length > 0 : false,
        likedBy: undefined
      }))
    });
  } catch (error) {
    next(error);
  }
});

// Get single track
router.get('/:id', optionalAuth, async (req, res, next) => {
  try {
    const track = await prisma.track.findUnique({
      where: { id: req.params.id },
      include: {
        artist: true,
        album: { include: { tracks: true } },
        genre: true,
        ...(req.user ? {
          likedBy: {
            where: { userId: req.user.id },
            select: { id: true }
          }
        } : {})
      }
    });

    if (!track) {
      return res.status(404).json({ error: 'Track not found' });
    }

    res.json({
      track: {
        ...track,
        isLiked: req.user ? track.likedBy?.length > 0 : false,
        likedBy: undefined
      }
    });
  } catch (error) {
    next(error);
  }
});

// Like a track
router.post('/:id/like', authenticate, async (req, res, next) => {
  try {
    const { id } = req.params;
    
    await prisma.likedTrack.create({
      data: {
        userId: req.user.id,
        trackId: id
      }
    });
    
    res.json({ liked: true });
  } catch (error) {
    if (error.code === 'P2002') {
      return res.json({ liked: true }); // Already liked
    }
    next(error);
  }
});

// Unlike a track
router.delete('/:id/like', authenticate, async (req, res, next) => {
  try {
    await prisma.likedTrack.delete({
      where: {
        userId_trackId: {
          userId: req.user.id,
          trackId: req.params.id
        }
      }
    });
    
    res.json({ liked: false });
  } catch (error) {
    next(error);
  }
});

// Record play / stream
router.post('/:id/play', authenticate, async (req, res, next) => {
  try {
    const { duration = 0 } = req.body;
    
    await Promise.all([
      prisma.track.update({
        where: { id: req.params.id },
        data: { plays: { increment: 1 } }
      }),
      prisma.listeningHistory.create({
        data: {
          userId: req.user.id,
          trackId: req.params.id,
          duration: parseInt(duration)
        }
      })
    ]);
    
    res.json({ recorded: true });
  } catch (error) {
    next(error);
  }
});

// Get stream URL
router.get('/:id/stream', authenticate, async (req, res, next) => {
  try {
    const track = await prisma.track.findUnique({
      where: { id: req.params.id },
      select: { streamUrl: true }
    });

    if (!track) {
      return res.status(404).json({ error: 'Track not found' });
    }

    res.json({ streamUrl: track.streamUrl });
  } catch (error) {
    next(error);
  }
});

export default router;
