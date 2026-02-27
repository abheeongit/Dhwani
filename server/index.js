import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import trackRoutes from './routes/tracks.js';
import playlistRoutes from './routes/playlists.js';
import artistRoutes from './routes/artists.js';
import searchRoutes from './routes/search.js';
import analyticsRoutes from './routes/analytics.js';
import friendsRoutes from './routes/friends.js';
import moodRoutes from './routes/mood.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tracks', trackRoutes);
app.use('/api/playlists', playlistRoutes);
app.use('/api/artists', artistRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/friends', friendsRoutes);
app.use('/api/mood', moodRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Root route
app.get('/', (req, res) => {
  res.json({ 
    name: 'Dhwani API',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      users: '/api/users',
      tracks: '/api/tracks',
      playlists: '/api/playlists',
      artists: '/api/artists',
      search: '/api/search',
      analytics: '/api/analytics',
      friends: '/api/friends',
      mood: '/api/mood'
    }
  });
});

// Error handling
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🎵 Dhwani server running on port ${PORT}`);
});

export default app;
