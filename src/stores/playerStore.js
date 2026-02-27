import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const usePlayerStore = create(
  persist(
    (set, get) => ({
      // State
      currentTrack: null,
      queue: [],
      queueIndex: 0,
      isPlaying: false,
      progress: 0,
      duration: 0,
      volume: 0.8,
      isMuted: false,
      isShuffled: false,
      repeatMode: 'none', // 'none' | 'all' | 'one'

      // Actions
      playTrack: (track, trackList = []) => {
        const queue = trackList.length > 0 ? trackList : [track];
        const queueIndex = queue.findIndex((t) => t.id === track.id);
        set({
          currentTrack: track,
          queue,
          queueIndex: queueIndex >= 0 ? queueIndex : 0,
          isPlaying: true,
          progress: 0,
          duration: track.duration || 0,
        });
      },

      togglePlay: () => {
        set((state) => ({ isPlaying: !state.isPlaying }));
      },

      pause: () => set({ isPlaying: false }),

      play: () => set({ isPlaying: true }),

      next: () => {
        const { queue, queueIndex, isShuffled, repeatMode } = get();
        if (queue.length === 0) return;

        let nextIndex;
        if (isShuffled) {
          nextIndex = Math.floor(Math.random() * queue.length);
        } else if (queueIndex < queue.length - 1) {
          nextIndex = queueIndex + 1;
        } else if (repeatMode === 'all') {
          nextIndex = 0;
        } else {
          return;
        }

        set({
          currentTrack: queue[nextIndex],
          queueIndex: nextIndex,
          progress: 0,
          duration: queue[nextIndex]?.duration || 0,
          isPlaying: true,
        });
      },

      previous: () => {
        const { queue, queueIndex, progress } = get();
        if (queue.length === 0) return;

        // If more than 3 seconds in, restart the track
        if (progress > 3) {
          set({ progress: 0 });
          return;
        }

        const prevIndex = queueIndex > 0 ? queueIndex - 1 : queue.length - 1;
        set({
          currentTrack: queue[prevIndex],
          queueIndex: prevIndex,
          progress: 0,
          duration: queue[prevIndex]?.duration || 0,
          isPlaying: true,
        });
      },

      seek: (time) => set({ progress: time }),

      setProgress: (progress) => set({ progress }),

      setDuration: (duration) => set({ duration }),

      setVolume: (volume) => {
        set({ volume, isMuted: volume === 0 });
      },

      toggleMute: () => {
        set((state) => ({ isMuted: !state.isMuted }));
      },

      toggleShuffle: () => {
        set((state) => ({ isShuffled: !state.isShuffled }));
      },

      toggleRepeat: () => {
        set((state) => {
          const modes = ['none', 'all', 'one'];
          const currentIndex = modes.indexOf(state.repeatMode);
          const nextIndex = (currentIndex + 1) % modes.length;
          return { repeatMode: modes[nextIndex] };
        });
      },

      addToQueue: (track) => {
        set((state) => ({
          queue: [...state.queue, track],
        }));
      },

      removeFromQueue: (index) => {
        set((state) => ({
          queue: state.queue.filter((_, i) => i !== index),
        }));
      },

      clearQueue: () => {
        set({ queue: [], queueIndex: 0 });
      },
    }),
    {
      name: 'dhwani-player',
      partialize: (state) => ({
        volume: state.volume,
        isShuffled: state.isShuffled,
        repeatMode: state.repeatMode,
      }),
    }
  )
);
