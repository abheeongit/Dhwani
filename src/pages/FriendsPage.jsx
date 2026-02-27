import { useState } from 'react';
import { motion } from 'framer-motion';
import { RiUserAddLine, RiUserFollowLine, RiCheckLine, RiCloseLine, RiSearchLine, RiMusicLine, RiPlayFill, RiMoreLine, RiChat3Line, RiShareLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const tabs = [
  { id: 'friends', label: 'Friends' },
  { id: 'requests', label: 'Requests' },
  { id: 'discover', label: 'Discover' },
];

const mockFriends = [
  { id: '1', name: 'Rahul Sharma', username: '@rahul', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300', isOnline: true, currentTrack: { title: 'Kesariya', artist: 'Arijit Singh' } },
  { id: '2', name: 'Priya Patel', username: '@priya', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300', isOnline: true, currentTrack: { title: 'Kala Chashma', artist: 'Badshah' } },
  { id: '3', name: 'Amit Kumar', username: '@amit', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300', isOnline: false, lastActive: '2h ago' },
  { id: '4', name: 'Neha Singh', username: '@neha', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300', isOnline: false, lastActive: '5h ago' },
];

const mockRequests = [
  { id: '1', name: 'Vikram Reddy', username: '@vikram', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300', mutualFriends: 3 },
  { id: '2', name: 'Anjali Desai', username: '@anjali', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300', mutualFriends: 5 },
];

const mockSuggestions = [
  { id: '1', name: 'Karan Mehta', username: '@karan', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300', mutualFriends: 8, commonArtists: ['Arijit Singh', 'Pritam'] },
  { id: '2', name: 'Sneha Roy', username: '@sneha', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300', mutualFriends: 4, commonArtists: ['A.R. Rahman', 'Shreya Ghoshal'] },
  { id: '3', name: 'Rohan Kapoor', username: '@rohan', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300', mutualFriends: 2, commonArtists: ['Badshah', 'Neha Kakkar'] },
];

const mockActivity = [
  { id: '1', user: { name: 'Rahul', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300' }, action: 'is listening to', track: { title: 'Kesariya', artist: 'Arijit Singh', coverImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300' }, time: '2m ago' },
  { id: '2', user: { name: 'Priya', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300' }, action: 'liked', track: { title: 'Tum Hi Ho', artist: 'Arijit Singh', coverImage: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300' }, time: '15m ago' },
  { id: '3', user: { name: 'Amit', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300' }, action: 'created playlist', playlist: { title: 'Weekend Vibes', trackCount: 25 }, time: '1h ago' },
];

export default function FriendsPage() {
  const [activeTab, setActiveTab] = useState('friends');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-8 pb-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold"
          >
            Friends
          </motion.h1>
          <p className="text-dhwani-muted mt-1">See what your friends are listening to</p>
        </div>

        {/* Search */}
        <div className="relative">
          <RiSearchLine className="absolute left-4 top-1/2 -translate-y-1/2 text-dhwani-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search friends..."
            className="pl-11 pr-4 py-2.5 bg-dhwani-surface border border-dhwani-surface-light rounded-xl focus:border-dhwani-accent outline-none w-full md:w-64"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-dhwani-surface-light">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 font-medium relative transition-colors ${
              activeTab === tab.id ? 'text-dhwani-accent' : 'text-dhwani-muted hover:text-dhwani-text'
            }`}
          >
            {tab.label}
            {tab.id === 'requests' && mockRequests.length > 0 && (
              <span className="ml-2 px-1.5 py-0.5 bg-dhwani-accent text-white text-xs rounded-full">
                {mockRequests.length}
              </span>
            )}
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-dhwani-accent"
              />
            )}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-6">
          {/* Friends Tab */}
          {activeTab === 'friends' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              {mockFriends.map((friend, index) => (
                <motion.div
                  key={friend.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="card p-4 flex items-center gap-4"
                >
                  <div className="relative">
                    <img
                      src={friend.avatar}
                      alt={friend.name}
                      className="w-14 h-14 rounded-full object-cover"
                    />
                    {friend.isOnline && (
                      <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-dhwani-surface" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold">{friend.name}</p>
                      <span className="text-sm text-dhwani-muted">{friend.username}</span>
                    </div>
                    {friend.isOnline && friend.currentTrack ? (
                      <div className="flex items-center gap-2 text-sm">
                        <RiMusicLine className="text-dhwani-accent animate-pulse" />
                        <span className="text-dhwani-text-secondary truncate">
                          {friend.currentTrack.title} • {friend.currentTrack.artist}
                        </span>
                      </div>
                    ) : (
                      <p className="text-sm text-dhwani-muted">Last active {friend.lastActive}</p>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {friend.isOnline && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 rounded-full bg-dhwani-surface-light hover:bg-dhwani-accent/20 transition-colors"
                      >
                        <RiPlayFill className="text-dhwani-accent" />
                      </motion.button>
                    )}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 rounded-full hover:bg-dhwani-surface-light transition-colors"
                    >
                      <RiChat3Line className="text-dhwani-muted" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 rounded-full hover:bg-dhwani-surface-light transition-colors"
                    >
                      <RiMoreLine className="text-dhwani-muted" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Requests Tab */}
          {activeTab === 'requests' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              {mockRequests.length === 0 ? (
                <div className="card p-12 text-center">
                  <RiUserAddLine className="text-4xl text-dhwani-muted mx-auto mb-4" />
                  <p className="text-dhwani-muted">No pending requests</p>
                </div>
              ) : (
                mockRequests.map((request, index) => (
                  <motion.div
                    key={request.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="card p-4 flex items-center gap-4"
                  >
                    <img
                      src={request.avatar}
                      alt={request.name}
                      className="w-14 h-14 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-semibold">{request.name}</p>
                      <p className="text-sm text-dhwani-muted">
                        {request.mutualFriends} mutual friends
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-4 py-2 bg-dhwani-accent rounded-full text-white font-medium"
                      >
                        <RiCheckLine />
                        Accept
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 rounded-full border border-dhwani-surface-light hover:bg-dhwani-surface-light transition-colors"
                      >
                        <RiCloseLine />
                      </motion.button>
                    </div>
                  </motion.div>
                ))
              )}
            </motion.div>
          )}

          {/* Discover Tab */}
          {activeTab === 'discover' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <p className="text-sm text-dhwani-muted">People you may know based on your music taste</p>
              {mockSuggestions.map((suggestion, index) => (
                <motion.div
                  key={suggestion.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="card p-4 flex items-center gap-4"
                >
                  <img
                    src={suggestion.avatar}
                    alt={suggestion.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-semibold">{suggestion.name}</p>
                    <p className="text-sm text-dhwani-muted">
                      {suggestion.mutualFriends} mutual friends
                    </p>
                    <p className="text-xs text-dhwani-accent">
                      Both like {suggestion.commonArtists.join(', ')}
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 border border-dhwani-surface-light rounded-full font-medium hover:bg-dhwani-surface-light transition-colors"
                  >
                    <RiUserAddLine />
                    Add
                  </motion.button>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>

        {/* Activity Feed */}
        <div className="space-y-4">
          <h2 className="font-semibold">Friend Activity</h2>
          <div className="card p-4 space-y-4">
            {mockActivity.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-3"
              >
                <img
                  src={activity.user.avatar}
                  alt={activity.user.name}
                  className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm">
                    <span className="font-semibold">{activity.user.name}</span>
                    <span className="text-dhwani-muted"> {activity.action}</span>
                  </p>
                  {activity.track && (
                    <div className="flex items-center gap-2 mt-1">
                      <img
                        src={activity.track.coverImage}
                        alt={activity.track.title}
                        className="w-8 h-8 rounded"
                      />
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">{activity.track.title}</p>
                        <p className="text-xs text-dhwani-muted truncate">{activity.track.artist}</p>
                      </div>
                    </div>
                  )}
                  {activity.playlist && (
                    <p className="text-sm text-dhwani-accent mt-1">
                      {activity.playlist.title} ({activity.playlist.trackCount} tracks)
                    </p>
                  )}
                  <p className="text-xs text-dhwani-muted mt-1">{activity.time}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Share Music */}
          <div className="card p-4">
            <h3 className="font-semibold mb-3">Share what youre listening to</h3>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-dhwani-accent to-dhwani-accent2 rounded-xl text-white font-medium"
            >
              <RiShareLine />
              Share Now Playing
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
