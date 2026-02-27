import api from './api'

const playlistService = {
  getAll: () => api.get('/playlists'),
  getById: (id) => api.get(`/playlists/${id}`),
  create: (data) => api.post('/playlists', data),
  update: (id, data) => api.put(`/playlists/${id}`, data),
  delete: (id) => api.delete(`/playlists/${id}`),
  addTrack: (playlistId, trackId) =>
    api.post(`/playlists/${playlistId}/tracks`, { trackId }),
  removeTrack: (playlistId, trackId) =>
    api.delete(`/playlists/${playlistId}/tracks/${trackId}`),
  getFeatured: () => api.get('/playlists/featured'),
}

export default playlistService
