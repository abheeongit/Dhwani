import api from './api'

const friendsService = {
  getFriends: () => api.get('/friends'),
  getRequests: () => api.get('/friends/requests'),
  sendRequest: (userId) => api.post('/friends/request', { userId }),
  acceptRequest: (requestId) => api.post(`/friends/accept/${requestId}`),
  rejectRequest: (requestId) => api.post(`/friends/reject/${requestId}`),
  removeFriend: (friendId) => api.delete(`/friends/${friendId}`),
  getFriendActivity: () => api.get('/friends/activity'),
  searchUsers: (q) => api.get('/friends/search', { params: { q } }),
}

export default friendsService
