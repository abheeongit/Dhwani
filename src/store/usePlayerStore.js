import { create } from 'zustand'

const usePlayerStore = create((set, get) => ({
  // ── Track state ──
  currentTrack: null,
  queue: [],
  history: [],

  // ── Playback state ──
  isPlaying: false,
  progress: 0,
  duration: 0,
  volume: 0.7,
  isMuted: false,
  repeatMode: 'off', // off | one | all
  shuffle: false,

  // ── Actions ──
  setTrack: (track) =>
    set((s) => ({
      currentTrack: track,
      isPlaying: true,
      progress: 0,
      history: s.currentTrack
        ? [s.currentTrack, ...s.history].slice(0, 50)
        : s.history,
    })),

  togglePlay: () => set((s) => ({ isPlaying: !s.isPlaying })),
  play: () => set({ isPlaying: true }),
  pause: () => set({ isPlaying: false }),

  setProgress: (p) => set({ progress: p }),
  setDuration: (d) => set({ duration: d }),

  setVolume: (v) => set({ volume: v, isMuted: v === 0 }),
  toggleMute: () =>
    set((s) => ({
      isMuted: !s.isMuted,
      volume: s.isMuted ? (s.volume === 0 ? 0.7 : s.volume) : 0,
    })),

  setRepeatMode: () =>
    set((s) => {
      const modes = ['off', 'all', 'one']
      const idx = modes.indexOf(s.repeatMode)
      return { repeatMode: modes[(idx + 1) % 3] }
    }),

  toggleShuffle: () => set((s) => ({ shuffle: !s.shuffle })),

  setQueue: (q) => set({ queue: q }),
  addToQueue: (track) => set((s) => ({ queue: [...s.queue, track] })),

  playNext: () => {
    const { queue, shuffle, repeatMode, currentTrack, history } = get()
    if (queue.length === 0) {
      if (repeatMode === 'one') return set({ progress: 0, isPlaying: true })
      return set({ isPlaying: false })
    }
    const idx = shuffle ? Math.floor(Math.random() * queue.length) : 0
    const next = queue[idx]
    set({
      currentTrack: next,
      queue: queue.filter((_, i) => i !== idx),
      progress: 0,
      isPlaying: true,
      history: currentTrack
        ? [currentTrack, ...history].slice(0, 50)
        : history,
    })
  },

  playPrev: () => {
    const { history, currentTrack, queue } = get()
    if (history.length === 0) return set({ progress: 0 })
    const [prev, ...rest] = history
    set({
      currentTrack: prev,
      history: rest,
      queue: currentTrack ? [currentTrack, ...queue] : queue,
      progress: 0,
      isPlaying: true,
    })
  },
}))

export default usePlayerStore
