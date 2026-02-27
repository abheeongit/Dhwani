import { Router } from 'express';
import prisma from '../lib/prisma.js';
import { optionalAuth } from '../middleware/auth.js';

const router = Router();

// Global search
router.get('/', optionalAuth, async (req, res, next) => {
  try {
    const { q, type } = req.query;
    
    if (!q || q.length < 2) {
      return res.json({ tracks: [], artists: [], playlists: [], albums: [] });
    }

    const searchTerm = q.toLowerCase();
    const results = {};

    // Search tracks
    if (!type || type === 'all' || type === 'tracks') {
      const tracks = await prisma.track.findMany({
        where: {
          OR: [
            { title: { contains: searchTerm, mode: 'insensitive' } },
            { artist: { name: { contains: searchTerm, mode: 'insensitive' } } }
          ]
        },
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
        take: 20
      });
      
      results.tracks = tracks.map(t => ({
        ...t,
        isLiked: req.user ? t.likedBy?.length > 0 : false,
        likedBy: undefined
      }));
    }

    // Search artists
    if (!type || type === 'all' || type === 'artists') {
      results.artists = await prisma.artist.findMany({
        where: {
          name: { contains: searchTerm, mode: 'insensitive' }
        },
        include: {
          _count: { select: { tracks: true, followers: true } }
        },
        take: 10
      });
    }

    // Search playlists
    if (!type || type === 'all' || type === 'playlists') {
      results.playlists = await prisma.playlist.findMany({
        where: {
          isPublic: true,
          OR: [
            { title: { contains: searchTerm, mode: 'insensitive' } },
            { description: { contains: searchTerm, mode: 'insensitive' } }
          ]
        },
        include: {
          user: { select: { id: true, name: true } },
          _count: { select: { tracks: true } }
        },
        take: 10
      });
    }

    // Search albums
    if (!type || type === 'all' || type === 'albums') {
      results.albums = await prisma.album.findMany({
        where: {
          OR: [
            { title: { contains: searchTerm, mode: 'insensitive' } },
            { artist: { name: { contains: searchTerm, mode: 'insensitive' } } }
          ]
        },
        include: {
          artist: { select: { id: true, name: true } },
          _count: { select: { tracks: true } }
        },
        take: 10
      });
    }

    res.json(results);
  } catch (error) {
    next(error);
  }
});

// Get genres
router.get('/genres', async (req, res, next) => {
  try {
    const genres = await prisma.genre.findMany({
      include: {
        _count: { select: { tracks: true } }
      },
      orderBy: { tracks: { _count: 'desc' } }
    });

    res.json({ genres });
  } catch (error) {
    next(error);
  }
});

export default router;
