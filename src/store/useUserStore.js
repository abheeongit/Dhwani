import { create } from 'zustand'

const useUserStore = create((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  setUser: (user, token) =>
    set({
      user,
      token,
      isAuthenticated: !!user,
    }),

  logout: () =>
    set({
      user: null,
      token: null,
      isAuthenticated: false,
    }),

  updateProfile: (data) =>
    set((s) => ({
      user: s.user ? { ...s.user, ...data } : null,
    })),
}))

export default useUserStore
