import api from './api'

const analyticsService = {
  getListeningHours: (range) =>
    api.get('/analytics/listening-hours', { params: { range } }),
  getTopGenres: () => api.get('/analytics/top-genres'),
  getTopArtists: () => api.get('/analytics/top-artists'),
  getMoodDistribution: () => api.get('/analytics/mood-distribution'),
  getActivityTimeline: () => api.get('/analytics/activity-timeline'),
  getSummary: () => api.get('/analytics/summary'),
}

export default analyticsService
