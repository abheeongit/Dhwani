import { Router } from 'express';
import prisma from '../lib/prisma.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.use(authenticate);

// Get friends list
router.get('/', async (req, res, next) => {
  try {
    const userId = req.user.id;

    const friendships = await prisma.friendship.findMany({
      where: {
        OR: [{ userId }, { friendId: userId }]
      },
      include: {
        user: { select: { id: true, name: true, avatar: true } },
        friend: { select: { id: true, name: true, avatar: true } }
      }
    });

    const friends = friendships.map(f => 
      f.userId === userId ? f.friend : f.user
    );

    res.json({ friends });
  } catch (error) {
    next(error);
  }
});

// Get friend requests
router.get('/requests', async (req, res, next) => {
  try {
    const userId = req.user.id;

    const received = await prisma.friendRequest.findMany({
      where: { toId: userId, status: 'PENDING' },
      include: {
        from: { select: { id: true, name: true, avatar: true } }
      },
      orderBy: { createdAt: 'desc' }
    });

    const sent = await prisma.friendRequest.findMany({
      where: { fromId: userId, status: 'PENDING' },
      include: {
        to: { select: { id: true, name: true, avatar: true } }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json({ received, sent });
  } catch (error) {
    next(error);
  }
});

// Send friend request
router.post('/requests', async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { toId } = req.body;

    if (userId === toId) {
      return res.status(400).json({ message: 'Cannot send friend request to yourself' });
    }

    // Check if already friends
    const existingFriendship = await prisma.friendship.findFirst({
      where: {
        OR: [
          { userId, friendId: toId },
          { userId: toId, friendId: userId }
        ]
      }
    });

    if (existingFriendship) {
      return res.status(400).json({ message: 'Already friends' });
    }

    // Check for existing request
    const existingRequest = await prisma.friendRequest.findFirst({
      where: {
        OR: [
          { fromId: userId, toId, status: 'PENDING' },
          { fromId: toId, toId: userId, status: 'PENDING' }
        ]
      }
    });

    if (existingRequest) {
      return res.status(400).json({ message: 'Friend request already exists' });
    }

    const request = await prisma.friendRequest.create({
      data: { fromId: userId, toId },
      include: {
        to: { select: { id: true, name: true, avatar: true } }
      }
    });

    res.status(201).json({ request });
  } catch (error) {
    next(error);
  }
});

// Accept friend request
router.post('/requests/:id/accept', async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const request = await prisma.friendRequest.findUnique({
      where: { id }
    });

    if (!request || request.toId !== userId) {
      return res.status(404).json({ message: 'Request not found' });
    }

    if (request.status !== 'PENDING') {
      return res.status(400).json({ message: 'Request already processed' });
    }

    // Update request and create friendship
    await prisma.$transaction([
      prisma.friendRequest.update({
        where: { id },
        data: { status: 'ACCEPTED' }
      }),
      prisma.friendship.create({
        data: {
          userId: request.fromId,
          friendId: request.toId
        }
      })
    ]);

    res.json({ message: 'Friend request accepted' });
  } catch (error) {
    next(error);
  }
});

// Reject friend request
router.post('/requests/:id/reject', async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const request = await prisma.friendRequest.findUnique({
      where: { id }
    });

    if (!request || request.toId !== userId) {
      return res.status(404).json({ message: 'Request not found' });
    }

    await prisma.friendRequest.update({
      where: { id },
      data: { status: 'REJECTED' }
    });

    res.json({ message: 'Friend request rejected' });
  } catch (error) {
    next(error);
  }
});

// Cancel friend request
router.delete('/requests/:id', async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const request = await prisma.friendRequest.findUnique({
      where: { id }
    });

    if (!request || request.fromId !== userId) {
      return res.status(404).json({ message: 'Request not found' });
    }

    await prisma.friendRequest.delete({ where: { id } });

    res.json({ message: 'Friend request cancelled' });
  } catch (error) {
    next(error);
  }
});

// Remove friend
router.delete('/:id', async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { id: friendId } = req.params;

    const friendship = await prisma.friendship.findFirst({
      where: {
        OR: [
          { userId, friendId },
          { userId: friendId, friendId: userId }
        ]
      }
    });

    if (!friendship) {
      return res.status(404).json({ message: 'Friendship not found' });
    }

    await prisma.friendship.delete({ where: { id: friendship.id } });

    res.json({ message: 'Friend removed' });
  } catch (error) {
    next(error);
  }
});

// Get friend activity
router.get('/activity', async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { limit = 20 } = req.query;

    // Get friend IDs
    const friendships = await prisma.friendship.findMany({
      where: {
        OR: [{ userId }, { friendId: userId }]
      }
    });

    const friendIds = friendships.map(f => 
      f.userId === userId ? f.friendId : f.userId
    );

    if (friendIds.length === 0) {
      return res.json({ activity: [] });
    }

    // Get recent listening activity
    const activity = await prisma.listeningHistory.findMany({
      where: { userId: { in: friendIds } },
      include: {
        user: { select: { id: true, name: true, avatar: true } },
        track: {
          include: {
            artist: { select: { id: true, name: true } },
            album: { select: { id: true, title: true, coverImage: true } }
          }
        }
      },
      orderBy: { playedAt: 'desc' },
      take: parseInt(limit)
    });

    res.json({ activity });
  } catch (error) {
    next(error);
  }
});

// Search users
router.get('/search', async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { q } = req.query;

    if (!q || q.length < 2) {
      return res.json({ users: [] });
    }

    const users = await prisma.user.findMany({
      where: {
        id: { not: userId },
        OR: [
          { name: { contains: q, mode: 'insensitive' } },
          { email: { contains: q, mode: 'insensitive' } }
        ]
      },
      select: { id: true, name: true, avatar: true },
      take: 20
    });

    res.json({ users });
  } catch (error) {
    next(error);
  }
});

export default router;
