import { Router } from 'express';
import bcrypt from 'bcrypt';
import prisma from '../lib/prisma.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

// Get user profile
router.get('/profile', authenticate, async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        email: true,
        name: true,
        avatar: true,
        bio: true,
        plan: true,
        role: true,
        createdAt: true,
        _count: {
          select: {
            playlists: true,
            likedTracks: true,
            friends: true
          }
        }
      }
    });
    res.json({ user });
  } catch (error) {
    next(error);
  }
});

// Update profile
router.put('/profile', authenticate, async (req, res, next) => {
  try {
    const { name, bio, avatar } = req.body;
    
    const user = await prisma.user.update({
      where: { id: req.user.id },
      data: { name, bio, avatar },
      select: {
        id: true,
        email: true,
        name: true,
        avatar: true,
        bio: true,
        plan: true,
        role: true
      }
    });
    
    res.json({ user });
  } catch (error) {
    next(error);
  }
});

// Change password
router.put('/password', authenticate, async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    const valid = await bcrypt.compare(currentPassword, user.password);
    
    if (!valid) {
      return res.status(400).json({ error: 'Current password is incorrect' });
    }
    
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    await prisma.user.update({
      where: { id: req.user.id },
      data: { password: hashedPassword }
    });
    
    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    next(error);
  }
});

// Get liked songs
router.get('/liked', authenticate, async (req, res, next) => {
  try {
    const likedTracks = await prisma.likedTrack.findMany({
      where: { userId: req.user.id },
      include: {
        track: {
          include: {
            artist: { select: { id: true, name: true } },
            album: { select: { id: true, title: true, coverImage: true } }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    
    res.json({ tracks: likedTracks.map(lt => lt.track) });
  } catch (error) {
    next(error);
  }
});

// Get user library (playlists, albums, artists)
router.get('/library', authenticate, async (req, res, next) => {
  try {
    const [playlists, likedPlaylists, followedArtists] = await Promise.all([
      prisma.playlist.findMany({
        where: { userId: req.user.id },
        include: { _count: { select: { tracks: true } } },
        orderBy: { updatedAt: 'desc' }
      }),
      prisma.likedPlaylist.findMany({
        where: { userId: req.user.id },
        include: {
          playlist: {
            include: { _count: { select: { tracks: true } } }
          }
        }
      }),
      prisma.followedArtist.findMany({
        where: { userId: req.user.id },
        include: { artist: true }
      })
    ]);
    
    res.json({
      playlists,
      savedPlaylists: likedPlaylists.map(lp => lp.playlist),
      followedArtists: followedArtists.map(fa => fa.artist)
    });
  } catch (error) {
    next(error);
  }
});

// Get recently played
router.get('/recent', authenticate, async (req, res, next) => {
  try {
    const history = await prisma.listeningHistory.findMany({
      where: { userId: req.user.id },
      include: {
        track: {
          include: {
            artist: { select: { id: true, name: true } },
            album: { select: { id: true, title: true, coverImage: true } }
          }
        }
      },
      orderBy: { playedAt: 'desc' },
      take: 50,
      distinct: ['trackId']
    });
    
    res.json({ tracks: history.map(h => h.track) });
  } catch (error) {
    next(error);
  }
});

export default router;
