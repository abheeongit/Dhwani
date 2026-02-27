import api from './api'

const musicService = {
  getTrending: (params) => api.get('/tracks/trending', { params }),
  getTrack: (id) => api.get(`/tracks/${id}`),
  search: (q, params) => api.get('/search', { params: { q, ...params } }),
  getGenres: () => api.get('/genres'),
  getRecentlyPlayed: () => api.get('/tracks/recently-played'),
  likeTrack: (id) => api.post(`/tracks/${id}/like`),
  unlikeTrack: (id) => api.delete(`/tracks/${id}/like`),
  getStreamUrl: (id) => api.get(`/tracks/${id}/stream`),
}

export default musicService
