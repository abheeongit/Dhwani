import api from './api'

const artistService = {
  getById: (id) => api.get(`/artists/${id}`),
  getTopTracks: (id) => api.get(`/artists/${id}/top-tracks`),
  getAlbums: (id) => api.get(`/artists/${id}/albums`),
  follow: (id) => api.post(`/artists/${id}/follow`),
  unfollow: (id) => api.delete(`/artists/${id}/follow`),
}

export default artistService
