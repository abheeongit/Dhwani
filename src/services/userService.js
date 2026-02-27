import api from './api'

const userService = {
  getProfile: () => api.get('/user/profile'),
  updateProfile: (data) => api.put('/user/profile', data),
  changePassword: (data) => api.put('/user/password', data),
  uploadAvatar: (file) => {
    const fd = new FormData()
    fd.append('avatar', file)
    return api.post('/user/avatar', fd, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },
  getLikedSongs: () => api.get('/user/liked'),
  getLibrary: () => api.get('/user/library'),
}

export default userService
