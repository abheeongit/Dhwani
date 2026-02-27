import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useUserStore = create(
  persist(
    (set, get) => ({
      // State
      user: null,
      token: null,
      refreshToken: null,
      isLoading: false,
      error: null,

      // Actions
      setUser: (user) => set({ user }),

      setTokens: (token, refreshToken) => set({ token, refreshToken }),

      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const response = await fetch('http://localhost:3001/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.message || 'Login failed');
          }

          set({
            user: data.user,
            token: data.token,
            refreshToken: data.refreshToken,
            isLoading: false,
          });

          return data;
        } catch (error) {
          set({ error: error.message, isLoading: false });
          throw error;
        }
      },

      register: async (name, email, password) => {
        set({ isLoading: true, error: null });
        try {
          const response = await fetch('http://localhost:3001/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password }),
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.message || 'Registration failed');
          }

          set({
            user: data.user,
            token: data.token,
            refreshToken: data.refreshToken,
            isLoading: false,
          });

          return data;
        } catch (error) {
          set({ error: error.message, isLoading: false });
          throw error;
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          refreshToken: null,
          error: null,
        });
      },

      refreshAccessToken: async () => {
        const { refreshToken } = get();
        if (!refreshToken) return null;

        try {
          const response = await fetch('http://localhost:3001/api/auth/refresh', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refreshToken }),
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.message || 'Token refresh failed');
          }

          set({ token: data.token });
          return data.token;
        } catch (error) {
          // If refresh fails, log out
          get().logout();
          return null;
        }
      },

      fetchCurrentUser: async () => {
        const { token } = get();
        if (!token) return null;

        try {
          const response = await fetch('http://localhost:3001/api/auth/me', {
            headers: { Authorization: `Bearer ${token}` },
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.message);
          }

          set({ user: data.user });
          return data.user;
        } catch (error) {
          return null;
        }
      },

      updateProfile: async (updates) => {
        const { token } = get();
        if (!token) return null;

        set({ isLoading: true, error: null });
        try {
          const response = await fetch('http://localhost:3001/api/users/profile', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(updates),
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.message || 'Update failed');
          }

          set({ user: data.user, isLoading: false });
          return data.user;
        } catch (error) {
          set({ error: error.message, isLoading: false });
          throw error;
        }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'dhwani-user',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        refreshToken: state.refreshToken,
      }),
    }
  )
);
