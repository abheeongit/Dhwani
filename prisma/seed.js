import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Clear existing data
  await prisma.listeningHistory.deleteMany();
  await prisma.friendRequest.deleteMany();
  await prisma.friendship.deleteMany();
  await prisma.likedPlaylist.deleteMany();
  await prisma.likedTrack.deleteMany();
  await prisma.playlistTrack.deleteMany();
  await prisma.playlist.deleteMany();
  await prisma.followedArtist.deleteMany();
  await prisma.track.deleteMany();
  await prisma.album.deleteMany();
  await prisma.artist.deleteMany();
  await prisma.genre.deleteMany();
  await prisma.session.deleteMany();
  await prisma.user.deleteMany();

  // Create genres sequentially
  const genres = [];
  const genreData = [
    { name: 'Pop', color: '#FF6B6B' },
    { name: 'Hip Hop', color: '#4ECDC4' },
    { name: 'R&B', color: '#9B59B6' },
    { name: 'Rock', color: '#E74C3C' },
    { name: 'Electronic', color: '#00D4FF' },
    { name: 'Jazz', color: '#F39C12' },
    { name: 'Classical', color: '#8E44AD' },
    { name: 'Indie', color: '#2ECC71' },
    { name: 'Bollywood', color: '#FF9F43' },
    { name: 'Lo-Fi', color: '#74B9FF' },
  ];
  for (const g of genreData) {
    genres.push(await prisma.genre.create({ data: g }));
  }
  console.log('✅ Created genres');

  // Create artists sequentially
  const artists = [];
  const artistData = [
    {
      name: 'Arijit Singh',
      bio: 'One of the most versatile playback singers in Indian cinema',
      avatar: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300',
      coverImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200',
      verified: true,
      monthlyListeners: 45000000,
    },
    {
      name: 'Neha Kakkar',
      bio: 'Indian playback singer and television personality',
      avatar: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300',
      coverImage: 'https://images.unsplash.com/photo-1501612780327-45045538702b?w=1200',
      verified: true,
      monthlyListeners: 38000000,
    },
    {
      name: 'Pritam',
      bio: 'Award-winning music director and composer',
      avatar: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=300',
      coverImage: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=1200',
      verified: true,
      monthlyListeners: 32000000,
    },
    {
      name: 'A.R. Rahman',
      bio: 'Oscar-winning composer and music producer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300',
      coverImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200',
      verified: true,
      monthlyListeners: 42000000,
    },
    {
      name: 'Shreya Ghoshal',
      bio: 'National Award-winning playback singer',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300',
      coverImage: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1200',
      verified: true,
      monthlyListeners: 35000000,
    },
    {
      name: 'Badshah',
      bio: 'Popular rapper and music producer',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300',
      coverImage: 'https://images.unsplash.com/photo-1571266028243-e4733b0f0bb0?w=1200',
      verified: true,
      monthlyListeners: 28000000,
    },
    {
      name: 'Nucleya',
      bio: 'Electronic music producer and DJ',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300',
      coverImage: 'https://images.unsplash.com/photo-1571266028243-e4733b0f0bb0?w=1200',
      verified: true,
      monthlyListeners: 15000000,
    },
    {
      name: 'Prateek Kuhad',
      bio: 'Indie folk singer-songwriter',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300',
      coverImage: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=1200',
      verified: true,
      monthlyListeners: 12000000,
    },
  ];
  for (const a of artistData) {
    artists.push(await prisma.artist.create({ data: a }));
  }
  console.log('✅ Created artists');

  // Create albums sequentially
  const albums = [];
  const albumData = [
    { title: 'Soulful Melodies', coverImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600', releaseDate: new Date('2023-06-15'), artistId: artists[0].id },
    { title: 'Party Anthems', coverImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600', releaseDate: new Date('2023-09-20'), artistId: artists[1].id },
    { title: 'Cinematic Dreams', coverImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600', releaseDate: new Date('2023-03-01'), artistId: artists[2].id },
    { title: 'Infinite', coverImage: 'https://images.unsplash.com/photo-1501612780327-45045538702b?w=600', releaseDate: new Date('2022-11-10'), artistId: artists[3].id },
    { title: 'Timeless', coverImage: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600', releaseDate: new Date('2024-01-05'), artistId: artists[4].id },
    { title: 'Bass Drop', coverImage: 'https://images.unsplash.com/photo-1571266028243-e4733b0f0bb0?w=600', releaseDate: new Date('2023-12-12'), artistId: artists[5].id },
    { title: 'Electric Nights', coverImage: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600', releaseDate: new Date('2023-08-30'), artistId: artists[6].id },
    { title: 'Cold/Mess', coverImage: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600', releaseDate: new Date('2023-10-18'), artistId: artists[7].id },
  ];
  for (const a of albumData) {
    albums.push(await prisma.album.create({ data: a }));
  }
  console.log('✅ Created albums');

  // Create tracks
  const trackData = [
    // Arijit Singh tracks
    { title: 'Tum Hi Ho', duration: 262, artistId: artists[0].id, albumId: albums[0].id, genreId: genres[8].id, plays: 150000000, mood: 'romantic', energy: 0.5 },
    { title: 'Channa Mereya', duration: 285, artistId: artists[0].id, albumId: albums[0].id, genreId: genres[8].id, plays: 120000000, mood: 'sad', energy: 0.4 },
    { title: 'Kesariya', duration: 268, artistId: artists[0].id, albumId: albums[0].id, genreId: genres[8].id, plays: 180000000, mood: 'romantic', energy: 0.6 },
    { title: 'Apna Bana Le', duration: 254, artistId: artists[0].id, albumId: albums[0].id, genreId: genres[8].id, plays: 90000000, mood: 'romantic', energy: 0.5 },
    { title: 'Raabta', duration: 245, artistId: artists[0].id, albumId: albums[0].id, genreId: genres[8].id, plays: 75000000, mood: 'romantic', energy: 0.6 },

    // Neha Kakkar tracks
    { title: 'Kala Chashma', duration: 198, artistId: artists[1].id, albumId: albums[1].id, genreId: genres[0].id, plays: 200000000, mood: 'party', energy: 0.9 },
    { title: 'Dilbar', duration: 215, artistId: artists[1].id, albumId: albums[1].id, genreId: genres[0].id, plays: 180000000, mood: 'party', energy: 0.85 },
    { title: 'O Saki Saki', duration: 208, artistId: artists[1].id, albumId: albums[1].id, genreId: genres[0].id, plays: 150000000, mood: 'energetic', energy: 0.9 },
    { title: 'Garmi', duration: 192, artistId: artists[1].id, albumId: albums[1].id, genreId: genres[0].id, plays: 130000000, mood: 'party', energy: 0.95 },

    // Pritam tracks
    { title: 'Ae Dil Hai Mushkil', duration: 295, artistId: artists[2].id, albumId: albums[2].id, genreId: genres[8].id, plays: 140000000, mood: 'emotional', energy: 0.5 },
    { title: 'Matargashti', duration: 225, artistId: artists[2].id, albumId: albums[2].id, genreId: genres[8].id, plays: 95000000, mood: 'happy', energy: 0.7 },
    { title: 'Jee Le Zaraa', duration: 248, artistId: artists[2].id, albumId: albums[2].id, genreId: genres[8].id, plays: 80000000, mood: 'uplifting', energy: 0.75 },

    // A.R. Rahman tracks
    { title: 'Jai Ho', duration: 312, artistId: artists[3].id, albumId: albums[3].id, genreId: genres[8].id, plays: 250000000, mood: 'energetic', energy: 0.85 },
    { title: 'Kun Faya Kun', duration: 478, artistId: artists[3].id, albumId: albums[3].id, genreId: genres[8].id, plays: 180000000, mood: 'spiritual', energy: 0.4 },
    { title: 'Roja Janeman', duration: 285, artistId: artists[3].id, albumId: albums[3].id, genreId: genres[8].id, plays: 120000000, mood: 'romantic', energy: 0.5 },
    { title: 'Dil Se Re', duration: 315, artistId: artists[3].id, albumId: albums[3].id, genreId: genres[8].id, plays: 100000000, mood: 'passionate', energy: 0.7 },

    // Shreya Ghoshal tracks
    { title: 'Sun Raha Hai', duration: 292, artistId: artists[4].id, albumId: albums[4].id, genreId: genres[8].id, plays: 160000000, mood: 'emotional', energy: 0.4 },
    { title: 'Deewani Mastani', duration: 308, artistId: artists[4].id, albumId: albums[4].id, genreId: genres[8].id, plays: 130000000, mood: 'grand', energy: 0.7 },
    { title: 'Ghoomar', duration: 325, artistId: artists[4].id, albumId: albums[4].id, genreId: genres[8].id, plays: 110000000, mood: 'festive', energy: 0.8 },

    // Badshah tracks
    { title: 'Paani Paani', duration: 188, artistId: artists[5].id, albumId: albums[5].id, genreId: genres[1].id, plays: 200000000, mood: 'party', energy: 0.9 },
    { title: 'DJ Waley Babu', duration: 205, artistId: artists[5].id, albumId: albums[5].id, genreId: genres[1].id, plays: 180000000, mood: 'party', energy: 0.95 },
    { title: 'Genda Phool', duration: 212, artistId: artists[5].id, albumId: albums[5].id, genreId: genres[1].id, plays: 160000000, mood: 'dance', energy: 0.85 },
    { title: 'Jugnu', duration: 195, artistId: artists[5].id, albumId: albums[5].id, genreId: genres[1].id, plays: 140000000, mood: 'party', energy: 0.9 },

    // Nucleya tracks
    { title: 'Laung Gawacha', duration: 225, artistId: artists[6].id, albumId: albums[6].id, genreId: genres[4].id, plays: 80000000, mood: 'energetic', energy: 0.95 },
    { title: 'Bass Rani', duration: 198, artistId: artists[6].id, albumId: albums[6].id, genreId: genres[4].id, plays: 60000000, mood: 'intense', energy: 0.98 },
    { title: 'Aaja', duration: 215, artistId: artists[6].id, albumId: albums[6].id, genreId: genres[4].id, plays: 55000000, mood: 'dance', energy: 0.9 },

    // Prateek Kuhad tracks
    { title: 'cold/mess', duration: 245, artistId: artists[7].id, albumId: albums[7].id, genreId: genres[7].id, plays: 45000000, mood: 'melancholic', energy: 0.3 },
    { title: 'Kasoor', duration: 218, artistId: artists[7].id, albumId: albums[7].id, genreId: genres[7].id, plays: 38000000, mood: 'contemplative', energy: 0.4 },
    { title: 'Tune Kaha', duration: 232, artistId: artists[7].id, albumId: albums[7].id, genreId: genres[7].id, plays: 32000000, mood: 'nostalgic', energy: 0.35 },
    { title: 'Dil Beparwah', duration: 205, artistId: artists[7].id, albumId: albums[7].id, genreId: genres[7].id, plays: 28000000, mood: 'carefree', energy: 0.5 },
  ];

  // Create tracks sequentially
  const tracks = [];
  for (const track of trackData) {
    tracks.push(await prisma.track.create({
      data: {
        title: track.title,
        duration: track.duration,
        artistId: track.artistId,
        albumId: track.albumId,
        genreId: track.genreId,
        plays: track.plays,
        mood: track.mood,
        energy: track.energy,
        streamUrl: `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${Math.floor(Math.random() * 16) + 1}.mp3`,
        coverImage: `https://images.unsplash.com/photo-${1470225620780 + Math.floor(Math.random() * 10000)}-dba8ba36b745?w=300`,
      },
    }));
  }
  console.log('✅ Created tracks');

  // Create demo user
  const hashedPassword = await bcrypt.hash('password123', 10);
  const user = await prisma.user.create({
    data: {
      email: 'demo@dhwani.app',
      password: hashedPassword,
      name: 'Demo User',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
      bio: 'Music enthusiast and Dhwani lover',
      plan: 'PREMIUM',
    },
  });
  console.log('✅ Created demo user');

  // Create playlists sequentially
  const playlists = [];
  const playlistData = [
    {
      title: 'Bollywood Hits 2024',
      description: 'The hottest Bollywood tracks of the year',
      coverImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600',
      userId: user.id,
      isPublic: true,
      trackIds: [tracks[0].id, tracks[2].id, tracks[5].id, tracks[12].id, tracks[19].id],
    },
    {
      title: 'Party Starters',
      description: 'Get the party going with these bangers',
      coverImage: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600',
      userId: user.id,
      isPublic: true,
      trackIds: [tracks[5].id, tracks[6].id, tracks[7].id, tracks[19].id, tracks[20].id, tracks[23].id],
    },
    {
      title: 'Heartbreak Anthems',
      description: 'Songs for when you need a good cry',
      coverImage: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600',
      userId: user.id,
      isPublic: true,
      trackIds: [tracks[1].id, tracks[9].id, tracks[16].id, tracks[26].id],
    },
    {
      title: 'Focus Flow',
      description: 'Lo-fi and chill tracks for deep work',
      coverImage: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600',
      userId: user.id,
      isPublic: true,
      trackIds: [tracks[26].id, tracks[27].id, tracks[28].id, tracks[29].id],
    },
  ];
  
  for (const pl of playlistData) {
    const { trackIds, ...data } = pl;
    const playlist = await prisma.playlist.create({
      data: {
        ...data,
        tracks: {
          create: trackIds.map((trackId, position) => ({ trackId, position })),
        },
      },
    });
    playlists.push(playlist);
  }
  console.log('✅ Created playlists');

  // Like some tracks sequentially
  const likedTrackIds = [tracks[0].id, tracks[2].id, tracks[5].id, tracks[12].id, tracks[19].id, tracks[26].id];
  for (const trackId of likedTrackIds) {
    await prisma.likedTrack.create({ data: { userId: user.id, trackId } });
  }
  console.log('✅ Created liked tracks');

  // Follow some artists sequentially
  const followArtistIds = [artists[0].id, artists[3].id, artists[7].id];
  for (const artistId of followArtistIds) {
    await prisma.followedArtist.create({ data: { userId: user.id, artistId } });
  }
  console.log('✅ Created artist follows');

  // Create some listening history sequentially
  for (let i = 0; i < 50; i++) {
    const randomTrack = tracks[Math.floor(Math.random() * tracks.length)];
    const daysAgo = Math.floor(Math.random() * 30);
    await prisma.listeningHistory.create({
      data: {
        userId: user.id,
        trackId: randomTrack.id,
        playedAt: new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000 - Math.random() * 24 * 60 * 60 * 1000),
        listenDuration: Math.floor(randomTrack.duration * (0.5 + Math.random() * 0.5)),
      }
    });
  }
  console.log('✅ Created listening history');

  console.log('\n🎉 Seed completed successfully!');
  console.log('\n📧 Demo credentials:');
  console.log('   Email: demo@dhwani.app');
  console.log('   Password: password123');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
