import { Router } from 'express';
import prisma from '../lib/prisma.js';
import { authenticate, optionalAuth } from '../middleware/auth.js';

const router = Router();

// Get all playlists (public)
router.get('/', optionalAuth, async (req, res, next) => {
  try {
    const playlists = await prisma.playlist.findMany({
      where: { isPublic: true },
      include: {
        user: { select: { id: true, name: true, avatar: true } },
        _count: { select: { tracks: true } }
      },
      orderBy: { createdAt: 'desc' },
      take: 50
    });
    
    res.json({ playlists });
  } catch (error) {
    next(error);
  }
});

// Get featured playlists
router.get('/featured', async (req, res, next) => {
  try {
    const playlists = await prisma.playlist.findMany({
      where: { isPublic: true },
      include: {
        user: { select: { id: true, name: true } },
        _count: { select: { tracks: true, likedBy: true } }
      },
      orderBy: { likedBy: { _count: 'desc' } },
      take: 8
    });
    
    res.json({ playlists });
  } catch (error) {
    next(error);
  }
});

// Get single playlist
router.get('/:id', optionalAuth, async (req, res, next) => {
  try {
    const playlist = await prisma.playlist.findUnique({
      where: { id: req.params.id },
      include: {
        user: { select: { id: true, name: true, avatar: true } },
        tracks: {
          include: {
            track: {
              include: {
                artist: { select: { id: true, name: true } },
                album: { select: { id: true, title: true, coverImage: true } }
              }
            }
          },
          orderBy: { position: 'asc' }
        },
        _count: { select: { likedBy: true } },
        ...(req.user ? {
          likedBy: {
            where: { userId: req.user.id },
            select: { id: true }
          }
        } : {})
      }
    });

    if (!playlist) {
      return res.status(404).json({ error: 'Playlist not found' });
    }

    res.json({
      playlist: {
        ...playlist,
        tracks: playlist.tracks.map(pt => pt.track),
        isLiked: req.user ? playlist.likedBy?.length > 0 : false,
        likedBy: undefined
      }
    });
  } catch (error) {
    next(error);
  }
});

// Create playlist
router.post('/', authenticate, async (req, res, next) => {
  try {
    const { title, description, isPublic = true, coverImage } = req.body;
    
    const playlist = await prisma.playlist.create({
      data: {
        title,
        description,
        isPublic,
        coverImage,
        userId: req.user.id
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

// Update playlist
router.put('/:id', authenticate, async (req, res, next) => {
  try {
    const { title, description, isPublic, coverImage } = req.body;
    
    const playlist = await prisma.playlist.updateMany({
      where: { id: req.params.id, userId: req.user.id },
      data: { title, description, isPublic, coverImage }
    });
    
    if (playlist.count === 0) {
      return res.status(404).json({ error: 'Playlist not found or unauthorized' });
    }
    
    const updated = await prisma.playlist.findUnique({
      where: { id: req.params.id },
      include: { _count: { select: { tracks: true } } }
    });
    
    res.json({ playlist: updated });
  } catch (error) {
    next(error);
  }
});

// Delete playlist
router.delete('/:id', authenticate, async (req, res, next) => {
  try {
    await prisma.playlist.deleteMany({
      where: { id: req.params.id, userId: req.user.id }
    });
    
    res.json({ deleted: true });
  } catch (error) {
    next(error);
  }
});

// Add track to playlist
router.post('/:id/tracks', authenticate, async (req, res, next) => {
  try {
    const { trackId } = req.body;
    
    // Verify ownership
    const playlist = await prisma.playlist.findFirst({
      where: { id: req.params.id, userId: req.user.id }
    });
    
    if (!playlist) {
      return res.status(404).json({ error: 'Playlist not found' });
    }
    
    // Get max position
    const lastTrack = await prisma.playlistTrack.findFirst({
      where: { playlistId: req.params.id },
      orderBy: { position: 'desc' }
    });
    
    await prisma.playlistTrack.create({
      data: {
        playlistId: req.params.id,
        trackId,
        position: (lastTrack?.position ?? -1) + 1
      }
    });
    
    res.json({ added: true });
  } catch (error) {
    next(error);
  }
});

// Remove track from playlist
router.delete('/:id/tracks/:trackId', authenticate, async (req, res, next) => {
  try {
    const playlist = await prisma.playlist.findFirst({
      where: { id: req.params.id, userId: req.user.id }
    });
    
    if (!playlist) {
      return res.status(404).json({ error: 'Playlist not found' });
    }
    
    await prisma.playlistTrack.delete({
      where: {
        playlistId_trackId: {
          playlistId: req.params.id,
          trackId: req.params.trackId
        }
      }
    });
    
    res.json({ removed: true });
  } catch (error) {
    next(error);
  }
});

// Like playlist
router.post('/:id/like', authenticate, async (req, res, next) => {
  try {
    await prisma.likedPlaylist.create({
      data: {
        userId: req.user.id,
        playlistId: req.params.id
      }
    });
    
    res.json({ liked: true });
  } catch (error) {
    if (error.code === 'P2002') {
      return res.json({ liked: true });
    }
    next(error);
  }
});

// Unlike playlist
router.delete('/:id/like', authenticate, async (req, res, next) => {
  try {
    await prisma.likedPlaylist.delete({
      where: {
        userId_playlistId: {
          userId: req.user.id,
          playlistId: req.params.id
        }
      }
    });
    
    res.json({ liked: false });
  } catch (error) {
    next(error);
  }
});

export default router;
