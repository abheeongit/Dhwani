import api from './api'

const moodService = {
  generate: (params) => api.post('/mood/generate', params),
  save: (playlistId) => api.post('/mood/save', { playlistId }),
}

export default moodService
