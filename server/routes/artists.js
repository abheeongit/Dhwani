import { Router } from 'express';
import prisma from '../lib/prisma.js';
import { authenticate, optionalAuth } from '../middleware/auth.js';

const router = Router();

// Get all artists
router.get('/', async (req, res, next) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [artists, total] = await Promise.all([
      prisma.artist.findMany({
        include: {
          _count: { select: { tracks: true, followers: true } }
        },
        orderBy: { monthlyListeners: 'desc' },
        skip,
        take: parseInt(limit)
      }),
      prisma.artist.count()
    ]);

    res.json({
      artists,
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

// Get single artist
router.get('/:id', optionalAuth, async (req, res, next) => {
  try {
    const artist = await prisma.artist.findUnique({
      where: { id: req.params.id },
      include: {
        _count: { select: { tracks: true, followers: true, albums: true } },
        ...(req.user ? {
          followers: {
            where: { userId: req.user.id },
            select: { id: true }
          }
        } : {})
      }
    });

    if (!artist) {
      return res.status(404).json({ error: 'Artist not found' });
    }

    res.json({
      artist: {
        ...artist,
        isFollowing: req.user ? artist.followers?.length > 0 : false,
        followers: undefined
      }
    });
  } catch (error) {
    next(error);
  }
});

// Get artist's top tracks
router.get('/:id/top-tracks', optionalAuth, async (req, res, next) => {
  try {
    const tracks = await prisma.track.findMany({
      where: { artistId: req.params.id },
      include: {
        artist: { select: { id: true, name: true } },
        album: { select: { id: true, title: true, coverImage: true } },
        ...(req.user ? {
          likedBy: {
            where: { userId: req.user.id },
            select: { id: true }
          }
        } : {})
      },
      orderBy: { plays: 'desc' },
      take: 10
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

// Get artist's albums
router.get('/:id/albums', async (req, res, next) => {
  try {
    const albums = await prisma.album.findMany({
      where: { artistId: req.params.id },
      include: {
        _count: { select: { tracks: true } }
      },
      orderBy: { releaseDate: 'desc' }
    });

    res.json({ albums });
  } catch (error) {
    next(error);
  }
});

// Get artist's all tracks
router.get('/:id/tracks', optionalAuth, async (req, res, next) => {
  try {
    const tracks = await prisma.track.findMany({
      where: { artistId: req.params.id },
      include: {
        artist: { select: { id: true, name: true } },
        album: { select: { id: true, title: true, coverImage: true } },
        ...(req.user ? {
          likedBy: {
            where: { userId: req.user.id },
            select: { id: true }
          }
        } : {})
      },
      orderBy: { createdAt: 'desc' }
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

// Follow artist
router.post('/:id/follow', authenticate, async (req, res, next) => {
  try {
    await prisma.followedArtist.create({
      data: {
        userId: req.user.id,
        artistId: req.params.id
      }
    });

    res.json({ following: true });
  } catch (error) {
    if (error.code === 'P2002') {
      return res.json({ following: true });
    }
    next(error);
  }
});

// Unfollow artist
router.delete('/:id/follow', authenticate, async (req, res, next) => {
  try {
    await prisma.followedArtist.delete({
      where: {
        userId_artistId: {
          userId: req.user.id,
          artistId: req.params.id
        }
      }
    });

    res.json({ following: false });
  } catch (error) {
    next(error);
  }
});

export default router;
